# Nordic Boat Stays deployen

## Aanbevolen omgevingen

Gebruik drie gescheiden omgevingen:

1. lokaal voor ontwikkeling;
2. Netlify Deploy Previews met een Supabase-stagingproject en Stripe-testmodus;
3. productie met een eigen Supabase-project, SMTP-provider en Stripe-liveconfiguratie.

De map `website/` is een gearchiveerde demo. Netlify publiceert uitsluitend de Next.js-app uit de repositoryroot.

## Netlify koppelen

1. Importeer de GitHub-repository in Netlify.
2. Netlify leest `netlify.toml` automatisch.
3. Controleer:

```text
Base directory: leeg
Build command: npm run build
Publish directory: .next
Node.js: 22
```

4. Voeg de environmentvariabelen toe via Netlify, nooit via Git:

```text
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
AUTH_RATE_LIMIT_SECRET
DATABASE_URL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_CONNECT_WEBHOOK_SECRET
STRIPE_API_VERSION
```

Voor een Deploy Preview moet `NEXT_PUBLIC_APP_URL` overeenkomen met de gebruikte vaste staging-URL. Voeg dezelfde callback-URL toe aan de Supabase-allowlist.

## Supabase staging

```bash
npx supabase login
npx supabase link --project-ref JOUW_STAGING_PROJECT_REF
npx supabase db push
npx supabase gen types typescript --linked > src/lib/database.types.ts
```

Controleer in het Supabase-dashboard:

- e-mailbevestiging staat aan;
- een echte SMTP-provider is gekoppeld;
- Site URL en `/auth/callback`-redirects kloppen;
- gelekte-wachtwoordcontrole en Supabase Auth-rate-limits staan aan;
- RLS staat aan op alle publieke account- en marketplacetabellen;
- buckets `avatars`, `listing-images` en `private-documents` bestaan;
- er staat geen secret key in browsercode of een `NEXT_PUBLIC_` variabele.

Redirects:

```text
http://localhost:3000/auth/callback
https://staging.jouwdomein.nl/auth/callback
https://jouwdomein.nl/auth/callback
```

## E-mailflows testen

Test op staging:

1. registreren;
2. verificatiemail openen;
3. callback en login;
4. verificatiemail opnieuw versturen;
5. wachtwoord vergeten;
6. resetlink openen;
7. nieuw wachtwoord instellen;
8. oude sessies controleren.

Controleer SPF, DKIM en DMARC bij de gekozen SMTP-provider voordat productie open gaat.

## Eerste beheerder

Maak eerst een normaal, geverifieerd account. Voer daarna eenmalig uit in de Supabase SQL Editor:

```sql
insert into public.user_roles(user_id, role)
select id, 'admin'::public.user_role
from public.users
where email = 'jouw-email@example.com'
on conflict (user_id, role) where revoked_at is null do nothing;
```

Adminmutaties vereisen AAL2. Richt daarom in Supabase Auth minimaal één TOTP-factor in voor beheerders voordat status- of rolwijzigingen worden gebruikt.

## Stripe en hostuitbetalingen

Gebruik eerst Stripe-testmodus:

1. activeer Connect voor het platform;
2. maak platform- en Connect-webhookendpoints;
3. zet webhook secrets alleen in Netlify;
4. laat hosts hun identiteit en bankrekening rechtstreeks bij Stripe koppelen;
5. test iDEAL, kaarten, refunds, chargebacks en mislukte payouts.

Nordic Boat Stays hoort geen bankrekening- of identiteitsdocumenten zelf op te slaan. De host krijgt later via een Stripe-hosted onboardinglink toegang tot de bankkoppeling.

## Voor iedere deploy

```bash
npm test
npm run typecheck
npm run build
npm audit --omit=dev
```

Met een lokale Docker-runtime:

```bash
npm run supabase:reset
npx supabase test db
```

Promoveer staging pas nadat registratie, herstel, profielen, hostaanvraag, RLS-isolatie, adminrechten en accountdeactivatie met echte Supabase-e-mails zijn getest.
