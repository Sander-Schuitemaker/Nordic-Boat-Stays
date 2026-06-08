# Nordic Boat Stays User Accounts Design

Datum: 9 juni 2026  
Status: goedgekeurde oplossingsrichting, gereed voor implementatieplanning  
Scope: echte accounts, profielen, rollen, hostaanvragen en adminbeheer

## 1. Besluiten

- De Next.js 15-app wordt de enige productieapplicatie.
- De losse HTML-demo in `website/` blijft alleen tijdelijk als visuele referentie en wordt niet gebruikt voor echte accounts.
- Supabase Auth beheert wachtwoorden, e-mailverificatie, herstelmails, MFA en refresh tokens.
- PostgreSQL/Supabase is de bron van waarheid voor profielen, rollen, statussen, hostaanvragen en auditgegevens.
- Supabase SSR gebruikt beveiligde cookies; tokens worden niet in `localStorage` opgeslagen.
- Iedere nieuwe gebruiker start als gast.
- Een gebruiker kan later host worden zonder een tweede account.
- Rollen worden genormaliseerd in `user_roles`. Velden op `users` zijn een beveiligde, gesynchroniseerde samenvatting voor snelle navigatie.
- Een gebruiker kan tegelijk `guest` en `host` zijn. Admin is een aanvullende, sterk beveiligde rol.
- Adminrechten kunnen alleen door een bestaande admin via een server-side actie worden toegekend.
- Hosttoegang vereist een hostprofiel. Publiceren en uitbetalingen vereisen daarnaast verificatie.
- Stripe verzamelt later bank- en identiteitsgegevens rechtstreeks; Nordic Boat Stays bewaart geen IBAN, kaartgegevens of identiteitsdocumenten.
- Accountverwijdering is eerst deactivatie. Wettelijk verplichte boekings- en betaalgegevens worden bewaard en persoonsgegevens worden later geanonimiseerd.
- Alle mutaties gebruiken Zod-validatie, server actions of route handlers en database-RLS.

## 2. Systeemoverzicht

```text
Browser
  |
  | HTTPS + HttpOnly/SameSite cookies
  v
Next.js 15
  - Server Components
  - Server Actions
  - Route Handlers
  - Zod-validatie
  - route guards
  |
  +------------------------+
  |                        |
  v                        v
Supabase Auth          Supabase PostgreSQL
  - registratie          - users / profiles
  - login                - rollen en hoststatus
  - e-mailverificatie    - RLS
  - resetmails           - audit logs
  - MFA                  - boekingen/berichten
  - sessies              - accountdeactivatie
  |
  v
E-mailprovider
  - verificatie
  - wachtwoordherstel
  - beveiligingsmeldingen
```

### Verantwoordelijkheden

**Supabase Auth**

- Wachtwoorden hashen en controleren.
- E-mailadressen bevestigen.
- Access- en refreshsessies beheren.
- Wachtwoordherstel en optionele social login.
- MFA/AAL2 voor admins en later voor hosts.

**Next.js**

- Formulieren en toegankelijke foutmeldingen tonen.
- Alle invoer server-side valideren.
- Gebruikers naar de juiste pagina doorsturen.
- Gevoelige admin- en accountacties uitvoeren.
- Rate limiting, auditcontext en veilige redirects toepassen.

**PostgreSQL**

- Profielen, rollen en accountstatussen bewaren.
- RLS afdwingen, ook wanneer frontendcode fouten bevat.
- Host- en adminrechten controleren.
- Auditlogs append-only bewaren.
- Accountdeactivatie en anonimisering transactioneel uitvoeren.

## 3. Rollen en toegang

### Rollen

```text
guest
  - zoeken, favorieten, boeken, berichten, reviews

host
  - alle gastmogelijkheden
  - hostprofiel, listings, beschikbaarheid, hostboekingen, payouts

admin
  - platformbeheer via beveiligde adminroutes
  - gevoelige acties vereisen MFA/AAL2
```

Een account krijgt standaard de rol `guest`. Bij een hostaanvraag wordt `host` toegevoegd aan `user_roles`, maar publicatie- en payoutrechten blijven afhankelijk van `host_profiles.status`.

### Statussen

```text
user_status:
pending_email_verification
active
suspended
deactivated
deleted

host_status:
not_started
pending_verification
verified
rejected
restricted
suspended

verification_status:
not_started
pending
approved
failed
expired
```

`suspended`, `deactivated` en `deleted` kunnen geen normale sessie gebruiken. Een geschorste gebruiker krijgt een neutrale supportmelding; geen interne reden wordt in de browser gelekt.

## 4. Databaseontwerp

Supabase Auth blijft eigenaar van `auth.users`. De tabellen hieronder bevatten alleen applicatiegegevens. UUID's verwijzen naar `auth.users.id`.

### 4.1 `users`

| Kolom | Type | Regels |
|---|---|---|
| `id` | `uuid` | PK, FK `auth.users(id)`, cascade |
| `email` | `citext` | uniek, niet leeg |
| `full_name` | `text` | 2-100 tekens |
| `phone` | `text` | nullable, E.164-formaat |
| `avatar_url` | `text` | nullable; feitelijk storagepad |
| `role` | `user_role` | standaard actieve UI-context |
| `is_guest` | `boolean` | door rol-synctrigger beheerd |
| `is_host` | `boolean` | door rol-synctrigger beheerd |
| `is_admin` | `boolean` | door rol-synctrigger beheerd |
| `email_verified` | `boolean` | afgeleid van Auth-bevestiging |
| `phone_verified` | `boolean` | standaard false |
| `status` | `user_status` | standaard `pending_email_verification` |
| `last_login_at` | `timestamptz` | nullable |
| `deletion_requested_at` | `timestamptz` | nullable |
| `anonymized_at` | `timestamptz` | nullable |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | update-trigger |

Constraints:

- `role` moet voorkomen in actieve `user_roles`.
- Een actief account moet e-mailgeverifieerd zijn.
- Gebruikers mogen `status`, rolvelden en verificatievelden niet zelf wijzigen.

Indexes:

- unique index op `email`
- `(status, created_at desc)`
- partial index op `(is_host)` waar `is_host`
- partial index op `(is_admin)` waar `is_admin`

### 4.2 `user_profiles`

| Kolom | Type | Regels |
|---|---|---|
| `user_id` | `uuid` | PK, FK `users(id)` cascade |
| `date_of_birth` | `date` | nullable, moet in verleden liggen |
| `country` | `char(2)` | ISO 3166-1 alpha-2 |
| `language` | `varchar(5)` | default `nl` |
| `bio` | `text` | max. 2.000 tekens |
| `emergency_contact` | `jsonb` | versleuteld/afgeschermd toepassingsveld |
| `preferred_currency` | `char(3)` | MVP `EUR`, later `NOK` |
| `notification_preferences` | `jsonb` | gevalideerd schema |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | update-trigger |

Geen openbaar profiel wordt rechtstreeks uit deze tabel gelezen. Publieke hostinformatie komt uit een beperkte view.

### 4.3 `host_profiles`

| Kolom | Type | Regels |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `user_id` | `uuid` | unique FK `users(id)` cascade |
| `host_name` | `text` | 2-100 tekens |
| `host_type` | `text` | `individual` of `company` |
| `company_name` | `text` | verplicht bij company |
| `tax_number` | `text` | nullable, alleen server/admin |
| `status` | `host_status` | default `not_started` |
| `verification_status` | `verification_status` | default `not_started` |
| `payout_account_status` | `text` | `not_started/pending/active/restricted` |
| `response_rate` | `numeric(5,2)` | 0-100 |
| `response_time_minutes` | `integer` | nullable, >= 0 |
| `restriction_reason` | `text` | alleen admin/server |
| `terms_version` | `text` | niet leeg |
| `terms_accepted_at` | `timestamptz` | niet null na aanvraag |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | update-trigger |

Indexes:

- unique `user_id`
- `(status, verification_status, created_at)`
- partial index voor open controles waar status `pending_verification`

### 4.4 `user_sessions`

Dit is een sessie-audit- en intrekkingsregister. Supabase Auth blijft eigenaar van echte refresh tokens.

| Kolom | Type | Regels |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK `users(id)` cascade |
| `auth_session_id` | `uuid` | unique, verwijzing naar Auth sessie-id |
| `ip_address` | `inet` | server-only |
| `user_agent` | `text` | server-only |
| `last_seen_at` | `timestamptz` | default `now()` |
| `created_at` | `timestamptz` | default `now()` |
| `expires_at` | `timestamptz` | niet null |
| `revoked_at` | `timestamptz` | nullable |

Indexes:

- `(user_id, revoked_at, expires_at desc)`
- unique `auth_session_id`
- periodieke verwijdering na retentieperiode

### 4.5 `user_verifications`

| Kolom | Type | Regels |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK `users(id)` cascade |
| `verification_type` | `text` | email/phone/identity/payout |
| `provider` | `text` | supabase/stripe/manual |
| `provider_reference` | `text` | nullable, unique per provider |
| `status` | `verification_status` | default `not_started` |
| `failure_reason` | `text` | server/admin-only |
| `verified_at` | `timestamptz` | nullable |
| `expires_at` | `timestamptz` | nullable |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | update-trigger |

Index: `(user_id, verification_type, status)`.

### 4.6 `user_roles`

| Kolom | Type | Regels |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK `users(id)` cascade |
| `role` | `user_role` | guest/host/admin |
| `granted_by` | `uuid` | nullable FK `users(id)` |
| `created_at` | `timestamptz` | default `now()` |
| `revoked_at` | `timestamptz` | nullable |

Constraints:

- unique actieve `(user_id, role)` via partial unique index.
- `guest` ontstaat automatisch bij registratie.
- `host` ontstaat via de beveiligde hostaanvraagfunctie.
- `admin` uitsluitend via admin-RPC met AAL2 en auditlog.

### 4.7 `audit_logs`

| Kolom | Type | Regels |
|---|---|---|
| `id` | `uuid` | PK |
| `actor_user_id` | `uuid` | nullable FK `users(id)` |
| `target_user_id` | `uuid` | nullable FK `users(id)` |
| `action` | `text` | niet leeg |
| `entity_type` | `text` | niet leeg |
| `entity_id` | `uuid` | nullable |
| `metadata` | `jsonb` | geschoonde metadata |
| `ip_address` | `inet` | nullable |
| `user_agent` | `text` | nullable |
| `created_at` | `timestamptz` | default `now()` |

Append-only. Geen update/delete voor browserrollen. Indexen op actor, target, action en created_at.

### 4.8 `login_attempts`

| Kolom | Type | Regels |
|---|---|---|
| `id` | `bigint generated always as identity` | PK |
| `email_hash` | `text` | HMAC van genormaliseerd e-mailadres |
| `ip_address` | `inet` | server-only |
| `success` | `boolean` | niet null |
| `failure_reason` | `text` | generieke code, geen wachtwoorddata |
| `created_at` | `timestamptz` | default `now()` |

Het ruwe e-mailadres wordt niet bewaard. Indexen:

- `(email_hash, created_at desc)`
- `(ip_address, created_at desc)`
- partial index op mislukte pogingen

Retentie: maximaal 90 dagen, tenzij een beveiligingsincident langer bewaren vereist.

### Aanvullende bestaande tabellen

- `payout_accounts`: alleen provider-ID, capabilities en status.
- `favorites`: unique `(user_id, listing_id)`.
- `bookings`: gast-ID en listing/hostrelatie.
- `conversations` en `messages`: alleen deelnemers.
- `reviews`: uitsluitend na voltooide boeking.

## 5. Auth-flows

### 5.1 Registratie

```text
Naam + e-mail + sterk wachtwoord
  -> rate-limitcontrole
  -> Supabase Auth signUp
  -> trigger maakt users + user_profiles + guest user_role
  -> status pending_email_verification
  -> verificatiemail
  -> /auth/callback wisselt code om voor sessie
  -> trigger markeert email_verified + active
  -> gebruiker naar /account
```

Bij een bestaand e-mailadres toont de UI altijd een neutrale melding om account-enumeratie te beperken.

### 5.2 Login

```text
E-mail + wachtwoord
  -> IP/e-mail rate limit
  -> Supabase signInWithPassword
  -> statuscontrole
  -> sessieregistratie + last_login_at
  -> veilige redirect naar oorspronkelijke pagina
```

Redirect:

- expliciete veilige `next`-route
- anders `/admin` voor admin in actieve admincontext
- anders `/dashboard` voor actieve hostcontext
- anders `/account`

### 5.3 Host worden

```text
Ingelogde gast klikt Verhuren
  -> hostprofiel invullen + voorwaarden accepteren
  -> hostrol toevoegen
  -> hoststatus pending_verification
  -> Stripe Connect onboarding starten
  -> providerwebhook werkt payoutstatus bij
  -> admin/provider controle
  -> hoststatus verified
  -> publiceren en payouts toegestaan
```

Een pending host mag conceptlistings maken, maar niet publiceren of uitbetaald worden.

### 5.4 Admin

```text
/admin
  -> requireAuth
  -> actieve adminrol
  -> MFA assurance level AAL2
  -> server-side adminactie
  -> databasefunctie valideert opnieuw
  -> auditlog in dezelfde transactie
```

Admins kunnen hun eigen laatste adminrol niet verwijderen. Het initiële adminaccount wordt handmatig via een beveiligde migratie of Supabase CLI aangemaakt.

### 5.5 Wachtwoord vergeten

```text
E-mailadres
  -> rate limit
  -> altijd dezelfde succesmelding
  -> Supabase resetmail
  -> /auth/callback?next=/reset-password
  -> nieuwe wachtwoordcontrole
  -> updateUser(password)
  -> overige sessies intrekken
  -> beveiligingsmail
```

### 5.6 Account verwijderen

```text
Gebruiker bevestigt wachtwoord/MFA
  -> controle actieve/toekomstige boekingen, refunds en geschillen
  -> bij blokkade: uitleg + supportpad
  -> status deactivated
  -> alle sessies intrekken
  -> geplande anonimisering na wettelijke/operationele wachttijd
  -> persoonsgegevens wissen
  -> financiële records bewaren met pseudonieme referentie
```

## 6. Routes en endpoints

### Publieke pagina's

- `GET /register`
- `GET /login`
- `GET /forgot-password`
- `GET /reset-password`
- `GET /verify-email`
- `GET /auth/callback`

### Accountpagina's

- `GET /account`
- `GET /account/profile`
- `GET /account/security`
- `GET /account/notifications`
- `GET /bookings`
- `GET /favorites`
- `GET /messages`

### Hostpagina's

- `GET /host/apply`
- `GET /dashboard`
- `GET /dashboard/listings`
- `GET /dashboard/bookings`
- `GET /dashboard/payouts`

### Adminpagina's

- `GET /admin`
- `GET /admin/users`
- `GET /admin/users/[id]`
- `GET /admin/hosts`
- `GET /admin/audit`

### Route handlers

| Endpoint | Functie |
|---|---|
| `POST /auth/register` | registreren en verificatiemail starten |
| `POST /auth/login` | login, rate limit en sessieregistratie |
| `POST /auth/logout` | huidige sessie beëindigen |
| `POST /auth/forgot-password` | resetmail aanvragen |
| `POST /auth/reset-password` | wachtwoord bijwerken en sessies intrekken |
| `GET /me` | eigen accountcontext |
| `PATCH /me/profile` | eigen profiel bijwerken |
| `POST /me/avatar` | avatar valideren en uploaden |
| `DELETE /me/account` | deactivatie aanvragen |
| `POST /host/apply` | hostprofiel en hostrol aanmaken |
| `GET /host/profile` | eigen hostprofiel |
| `PATCH /host/profile` | toegestane hostvelden wijzigen |
| `GET /admin/users` | zoeken/filteren met paginering |
| `PATCH /admin/users/:id/role` | rol toekennen/intrekken |
| `PATCH /admin/users/:id/status` | schorsen/deblokkeren/deactiveren |

Alle schrijfendpoints:

- controleren `Origin`/same-site gebruik;
- gebruiken Zod;
- retourneren geen providerfouten of secrets;
- schrijven auditlogs voor gevoelige acties;
- gebruiken idempotency waar herhaling schade kan veroorzaken.

## 7. Row Level Security

### Gebruikers en profielen

```sql
create policy users_select_self
on public.users for select to authenticated
using (id = (select auth.uid()) or (select private.is_admin()));

create policy profiles_select_self
on public.user_profiles for select to authenticated
using (user_id = (select auth.uid()) or (select private.is_admin()));

create policy profiles_update_self
on public.user_profiles for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));
```

Kolomprivileges voorkomen dat gebruikers eigen rollen, status of verificatievelden wijzigen.

### Rollen

Browserrollen krijgen geen directe insert/update/delete op `user_roles`. Alleen beveiligde databasefuncties en service-role handlers muteren rollen.

### Listings

```sql
using (
  host_id = (select auth.uid())
  or (select private.is_admin())
)
```

Schrijfbeleid controleert daarnaast actieve hostrol en toegestane listingstatus.

### Boekingen

Gasten zien boekingen waar `guest_id = auth.uid()`. Hosts zien boekingen waarvan de listing van hen is. Admins zien alles. Financiële mutaties blijven server-only.

### Berichten

Alleen deelnemers aan de conversation mogen conversation en messages lezen. Een bericht mag alleen worden ingevoegd door een deelnemer en `sender_id` moet `auth.uid()` zijn.

### Favorieten

Alleen de eigenaar kan lezen, toevoegen en verwijderen. Insert controleert `user_id = auth.uid()`.

### Admin

Adminselecties kunnen via `private.is_admin()` lopen. Gevoelige writes gebruiken security-definer functies met:

- `set search_path = ''`;
- expliciete objectnamen;
- AAL2-check;
- actor- en targetvalidatie;
- auditlog in dezelfde transactie.

Alle RLS-kolommen krijgen passende indexen.

## 8. Frontendcomponenten

- `AuthShell`: consistente rustige accountlayout.
- `RegisterForm`: naam, e-mail, wachtwoordsterkte, voorwaarden.
- `LoginForm`: login en wachtwoord vergeten.
- `ForgotPasswordForm`.
- `ResetPasswordForm`.
- `EmailVerificationStatus`.
- `AccountMenu`: ingelogde naam, avatar, gemiste berichten en uitloggen.
- `ProfileForm`: naam, telefoon, geboortedatum, land, taal en bio.
- `AvatarUploader`: type-, formaat- en dimensiecontrole met preview.
- `SecuritySettings`: wachtwoord wijzigen, sessies bekijken/intrekken, MFA.
- `NotificationSettings`.
- `RoleSwitcher`: schakelt tussen reizen en verhuren; kent geen rechten toe.
- `HostApplicationForm`.
- `HostVerificationBanner`.
- `AdminUserTable`: server-side zoek/filter/paginering.
- `AdminUserDetail`: rollen, status, verificaties en auditgeschiedenis.
- `ProtectedRouteState`: loading, niet-ingelogd, niet-gemachtigd en geschorst.

Mobiel:

- formulieren één kolom;
- minimaal 44px interactieve hoogte;
- foutmelding direct bij veld en samenvatting bovenaan;
- avatarupload en adminacties zonder horizontale overflow.

## 9. Pseudocode

```text
registerUser(input, request):
  validate input
  enforce rate limit by IP + email hash
  auth.signUp(email, password, full_name metadata)
  record login attempt outcome
  return neutral verification message
```

```text
loginUser(input, request):
  validate input and safe next path
  reject when rate limited
  auth.signInWithPassword
  load users status and roles
  reject + sign out when not active
  upsert session audit and last_login_at
  redirect safely
```

```text
logoutUser(scope):
  require auth
  auth.signOut(scope current or global)
  mark matching user_sessions revoked
```

```text
verifyEmail(code):
  exchange code for session
  database trigger sees email_confirmed_at
  set email_verified true and status active
  audit verification
```

```text
requestPasswordReset(email, request):
  apply rate limit
  always return same public response
  auth.resetPasswordForEmail
```

```text
resetPassword(password):
  require recovery session
  validate strength
  auth.updateUser(password)
  revoke other sessions
  audit password reset
```

```text
updateProfile(user, input):
  require active auth
  validate fields
  update only user-editable columns
  audit sensitive field changes
```

```text
becomeHost(user, input):
  require active verified user
  validate host terms and profile
  transaction:
    create/update host profile pending_verification
    grant host role through secure function
    create audit log
  create Stripe onboarding link later
```

```text
checkUserRole(userId, role):
  query active user_roles with indexed user_id + role
  also require active user status
```

```text
requireAuth(request):
  refresh Supabase SSR session
  get verified auth user
  load application user
  reject non-active status
```

```text
requireAdmin(request):
  user = requireAuth
  require active admin role
  require AAL2
  never trust role from form, cookie metadata or URL
```

```text
deactivateAccount(user):
  require recent authentication
  transaction:
    lock user row
    reject if active bookings/refunds/disputes exist
    set status deactivated and deletion_requested_at
    schedule anonymization job
    audit action
  revoke all auth sessions
```

## 10. Securitychecklist

- [ ] E-mailbevestiging verplicht.
- [ ] Minimaal 12 tekens en wachtwoordsterktecontrole.
- [ ] Gelekte-wachtwoordcontrole inschakelen waar Supabase-plan dit ondersteunt.
- [ ] Neutrale meldingen tegen account-enumeratie.
- [ ] Rate limiting op registratie, login en herstelmail.
- [ ] Tijdelijke blokkade bij herhaalde mislukte logins.
- [ ] HttpOnly, Secure en passende SameSite-cookies.
- [ ] Veilige `next`-redirects, nooit externe redirects.
- [ ] CSRF/Origin-controle op cookie-geauthenticeerde writes.
- [ ] RLS op iedere private tabel en storagebucket.
- [ ] Geen service-role key in clientbundel.
- [ ] Geen rollen vertrouwen uit user-editable metadata.
- [ ] MFA/AAL2 verplicht voor admins.
- [ ] Auditlog voor rollen, schorsingen, verificatie en accountverwijdering.
- [ ] Stripe-webhooks met signature, timestamp en idempotency.
- [ ] Avatarbestanden op MIME, grootte en extensie controleren.
- [ ] Persoonsgegevens niet loggen.
- [ ] IP/loginretentie documenteren en automatisch opschonen.
- [ ] AVG-export, correctie, deactivatie en anonimisering ondersteunen.
- [ ] Actieve boekingen blokkeren accountverwijdering.
- [ ] Beveiligingsheaders en CSP voor productie.

## 11. Edge cases

- Bestaand e-mailadres: neutrale reactie en eventueel opnieuw verificatiemail.
- Verlopen verificatielink: knop voor nieuwe verificatiemail.
- Verlopen herstelcode: terug naar herstelmail aanvragen.
- Hostdashboard zonder hostprofiel: redirect naar `/host/apply`.
- Pending host: dashboard zichtbaar, publiceren/payouts uitgeschakeld.
- Niet-admin op `/admin`: 404/forbidden zonder admininformatie.
- Geschorst account: sessie beëindigen en supportmelding.
- Actieve boeking bij verwijdering: deactivatie uitstellen.
- Dubbele sessies: sessieoverzicht en “log overal uit”.
- Onbekende locatie: beveiligingsmail; later step-up authentication.
- Te veel loginpogingen: tijdelijke cooldown per IP en e-mailhash.
- Avatarupload mislukt: oude avatar behouden en nieuwe upload opruimen.
- Dubbele callback: idempotente profieltrigger en verification-upsert.
- Verwijderde gebruiker met financiële historie: pseudoniem behouden.

## 12. MVP en productiefase

### Accounts-MVP

- E-mail/wachtwoordregistratie.
- E-mailverificatie.
- Login/logout.
- Wachtwoord vergeten/reset.
- Eigen profiel en avatar.
- Gast- en hostrol op één account.
- Hostaanvraag met pendingstatus.
- Accountmenu en beschermde routes.
- Eigen favorieten, boekingen en berichten via RLS.
- Basisadmin: gebruikers zoeken, schorsen en hoststatus beheren.
- Accountdeactivatie met boekingscontrole.

### Productieklaar

- Admin-MFA/AAL2.
- Sessieoverzicht en globale logout.
- Volwaardige rate limiter en verdachte-loginmeldingen.
- Telefoonverificatie.
- Stripe KYC/Connect-status.
- AVG-export en geautomatiseerde anonimisering.
- Supportacties met reden en vier-ogencontrole voor kritieke wijzigingen.
- Monitoring, alerts, back-ups en restoretest.
- Pentest en formele securityreview.

## 13. Concrete implementatievolgorde

1. Nieuwe auth- en profielmigraties bovenop de bestaande marketplacebasis.
2. Auth-trigger voor gebruikersprofiel, guestrol en e-mailstatus.
3. RLS, kolomprivileges en security-definer functies.
4. Supabase Auth-instellingen, redirect-URL's en mailtemplates.
5. Registratie, login, callback, verificatie en herstelpagina's.
6. Accountlayout, profiel, avatar, security en notifications.
7. Navigatie en routeguards op rollen/statussen.
8. Hostaanvraag en hoststatussen.
9. Favorieten, boekingen en berichten migreren van Prisma/mock naar Supabase.
10. Adminlayout, gebruikersbeheer en auditweergave.
11. Accountdeactivatie, sessie-intrekking en retentiejobs.
12. Testen: unit, RLS, integratie, browser, mobiel en productiebuild.
13. Netlify/Supabase staging configureren.
14. Statische demo uit productie verwijderen nadat functionele gelijkwaardigheid is gecontroleerd.

## 14. Acceptatiecriteria

- Een nieuwe gebruiker kan registreren, e-mail bevestigen, inloggen en uitloggen.
- Een ingelogde gebruiker ziet alleen eigen profiel, favorieten, boekingen en gesprekken.
- Een account kan tegelijk gast en host zijn.
- Hostdashboard zonder hostprofiel leidt naar een hostaanvraag.
- Pending hosts kunnen niet publiceren of uitbetalingen ontvangen.
- Niet-admins kunnen geen adminroute of adminactie gebruiken.
- Rol- en statuswijzigingen zijn server-only en geaudit.
- Wachtwoordherstel werkt zonder account-enumeratie.
- Accountdeactivatie trekt sessies in en respecteert actieve boekingen.
- Geen authtokens, wachtwoorden, IBAN's of identiteitsdocumenten staan in localStorage of frontendlogs.
- De Next.js-productiebuild, auth-tests en RLS-tests slagen.
