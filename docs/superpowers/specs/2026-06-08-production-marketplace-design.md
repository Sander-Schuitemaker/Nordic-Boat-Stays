# Nordic Boat Stays Production Marketplace Design

Datum: 8 juni 2026  
Status: ontwerp ter definitieve goedkeuring  
Doelmarkt MVP: vakantiehuizen in Noorwegen, gasten uit Nederland en Europa, betalingen in EUR

## 1. Besluiten

- Frontend en backend worden samengebracht in Next.js 15 App Router.
- De bestaande visuele demo in `website/` blijft tijdens de verbouwing online en dient als ontwerpbron.
- Supabase levert Auth, PostgreSQL, Storage, Realtime en databasebeveiliging.
- Stripe Connect is de primaire betaalprovider.
- Nieuwe Stripe Connect-accounts gebruiken Accounts v2 en Stripe-hosted onboarding.
- De standaardflow is direct boeken: een geslaagde betaling bevestigt de boeking.
- Gastservicekosten zijn 8% van het boekingssubtotaal.
- Hostcommissie is 5% van het boekingssubtotaal.
- Schoonmaakkosten vallen in de MVP onder het boekingssubtotaal en zijn dus onderdeel van beide commissieberekeningen.
- Borg, toeristenbelasting en refunds vallen niet onder de commissie.
- Het hostbedrag wordt pas 24 uur na de geplande check-in vrijgegeven.
- Een geschil, chargeback, niet-geverifieerde host of adminblokkade pauzeert de uitbetaling.
- De borg voor de boot wordt vlak voor aankomst op een kaart geautoriseerd; iDEAL wordt niet voor de borg gebruikt.
- Een host kan pas publiceren na KYC en goedkeuring van de listing.
- Een vereist vaarbewijs moet voor check-in zijn bevestigd en gecontroleerd.
- Alle bedragen worden opgeslagen in gehele eurocenten; percentages in basispunten.
- Alle tijdstippen worden in UTC opgeslagen. Verblijfsdatums zijn lokale `date`-waarden in `Europe/Oslo`.

## 2. Architectuuroverzicht

```text
Browser / mobiel
      |
      v
Next.js 15 op Netlify
  - Server Components
  - Route Handlers
  - Server Actions
  - Zod-validatie
  - next-intl
      |
      +----------------------+
      |                      |
      v                      v
Supabase                 Stripe Connect
  - Auth                   - Accounts v2
  - PostgreSQL             - Hosted onboarding
  - RLS                    - Checkout Sessions
  - Storage                - iDEAL / kaarten / wallets
  - Realtime               - Refunds / disputes
  - Cron / database RPC    - Transfers / payouts
```

### Verantwoordelijkheden

**Next.js**

- Rendert alle bestaande pagina's in de huidige Scandinavische stijl.
- Controleert sessies en rollen server-side.
- Valideert invoer met Zod.
- Berekent nooit prijzen op basis van waarden uit de browser.
- Maakt Stripe-objecten en verwerkt webhooks.
- Roept beveiligde PostgreSQL-functies aan voor atomaire mutaties.

**Supabase**

- Beheert accounts en sessies via cookie-based SSR-authenticatie.
- Is de bron van waarheid voor listings, beschikbaarheid, boekingen en geldstatussen.
- Dwingt toegangsregels af met Row Level Security.
- Slaat foto's en private documenten in gescheiden buckets op.
- Voorkomt dubbele boekingen met een PostgreSQL exclusion constraint.
- Voert geplande database- en outboxjobs uit.

**Geplande uitvoering**

- Supabase Cron voert database-eigen taken uit, zoals verlopen holds vrijgeven en geplande statustransities klaarzetten.
- Een Netlify Scheduled Function verwerkt outboxjobs die externe diensten aanroepen, zoals Stripe, e-mail en vertaling.
- Workers claimen jobs transactioneel met `FOR UPDATE SKIP LOCKED` en een unieke deduplicatiesleutel.

**Stripe Connect**

- Verwerkt KYC en host-onboarding.
- Accepteert iDEAL, EER-kaarten en geschikte wallets via dynamische betaalmethodes.
- Ontvangt de betaling op het platformaccount.
- Houdt het hostdeel in het Stripe-platformsaldo totdat Nordic Boat Stays een transfer vrijgeeft.
- Verwerkt refunds, chargebacks en payouts.

Dit is geen juridisch escrowproduct. Voor livegang moet Stripe schriftelijk bevestigen dat de voorgestelde delayed-transferflow past bij de verwachte boekingstermijnen en het reis-/verhuurmodel.

## 3. Stripe Connect-geldstroom

De aanbevolen Connect-vorm is **separate charges and transfers**:

1. De Checkout Session en betaling worden op het Nordic Boat Stays-platformaccount aangemaakt.
2. De betaling krijgt een `transfer_group` met de booking-ID.
3. Het hostdeel wordt nog niet naar het connected account gestuurd.
4. Na check-in + 24 uur maakt het platform een Transfer naar het connected account.
5. Daarna wordt een bankpayout uitgevoerd of volgens het gecontroleerde payoutschema verwerkt.

Nordic Boat Stays is bij deze flow verantwoordelijk voor Stripe-kosten, refunds, chargebacks en negatieve saldi. Daarvoor is een financiële reserve nodig.

### Connect-accountconfiguratie

- Account API: Stripe Accounts v2.
- Requirement collection: Stripe-hosted onboarding.
- Dashboardtoegang: beperkt Stripe-hosted dashboard.
- Benodigde capability: transfers ontvangen.
- Platform betaalt providerkosten en is verantwoordelijk voor negatieve betalingssaldi.
- Bankgegevens worden uitsluitend door Stripe verzameld.

## 4. Boekings- en betaalflow

```text
Gast kiest listing, datums en gasten
        |
        v
Server berekent quote en controleert huis + boot
        |
        v
PostgreSQL-transactie:
  booking = pending_payment
  tijdelijke availability-hold
  prijsregels als momentopname
        |
        v
Stripe Checkout Session
        |
        +---- betaling mislukt/verloopt ----> hold vrijgeven
        |
        v
Ondertekende Stripe-webhook
        |
        v
Idempotente database-transactie:
  payment = held
  booking = confirmed
  hold = confirmed_booking
        |
        v
Check-in; borg en vaarbewijs gecontroleerd
        |
        v
Check-in + 24 uur, geen geschil
        |
        v
Transfer + payout naar host
```

### Tijdelijke betaalhold

- Een boeking krijgt voor Checkout een actieve hold van 30 minuten.
- Na `checkout.session.completed` met een nog verwerkende betaalmethode wordt de hold verlengd tot de provider een definitieve uitkomst geeft, met een absolute maximumtermijn.
- `checkout.session.expired` of een mislukte betaling geeft de datums vrij.
- Als een late succesvolle betaling binnenkomt nadat de hold door een fout al is vrijgegeven, probeert de webhook opnieuw een definitieve blokkade te maken.
- Als dat door een andere boeking niet meer kan, wordt de late betaling automatisch volledig gerefund en gemarkeerd als `payment_conflict`.

## 5. Prijsberekening

```text
nightly_subtotal = som van prijs per nacht na pricing rules
booking_subtotal = nightly_subtotal
                 + cleaning_fee
                 + mandatory_boat_fee

guest_service_fee = round(booking_subtotal * 0.08)
host_commission    = round(booking_subtotal * 0.05)

guest_total = booking_subtotal
            + guest_service_fee
            + taxes

host_net = booking_subtotal
         - host_commission
         - host_chargeable_adjustments
```

Alle componenten en gebruikte percentages worden op de boeking opgeslagen. Een latere wijziging van tarieven verandert bestaande boekingen niet.

### Voorbeeld

```text
Boekingssubtotaal:        EUR 1.000,00
Gastservicekosten 8%:     EUR    80,00
Gast betaalt:             EUR 1.080,00

Hostcommissie 5%:         EUR    50,00
Host ontvangt bruto:      EUR   950,00
Bruto platforminkomsten:  EUR   130,00
```

Providerkosten, refunds, chargebacks, btw en operationele kosten gaan van de platforminkomsten af.

## 6. Statusmodellen

### Booking

```text
draft
  -> pending_payment
  -> confirmed
  -> checked_in
  -> completed
```

- `pending_payment` en `confirmed` kunnen naar `cancelled`.
- `confirmed`, `checked_in` en `completed` kunnen naar `disputed`.
- Een opgelost geschil eindigt in `completed` of `cancelled`, met een afzonderlijke dispute-uitkomst.

### Payment

```text
requires_payment
  -> processing
  -> paid
  -> held
  -> released
```

Zijtakken:

- `processing -> failed`
- `paid|held|released -> partially_refunded`
- `paid|held|released|partially_refunded -> refunded`
- `paid|held|released|partially_refunded -> chargeback`

`released` is toegevoegd aan de aangevraagde statussen omdat een succesvolle overdracht anders geen sluitende betaalstatus heeft. De payoutstatus blijft de bron voor de bankuitbetaling.

### Payout

```text
not_ready -> scheduled -> pending -> paid
```

- `scheduled|pending -> failed`
- `not_ready|scheduled|pending|failed -> paused`
- `failed|paused -> scheduled` na herstel en controle.

### Refund

```text
requested -> approved -> processing -> completed
                    \-> rejected
```

### Host verification

```text
not_started -> pending -> verified
                     \-> restricted
                     \-> rejected
verified -> restricted
restricted -> pending
```

### Listing

```text
draft -> pending_review -> published
                    \-> rejected
published -> paused -> published
published|paused -> archived
```

## 7. PostgreSQL-databaseontwerp

### Algemene conventies

- Primary keys: `uuid default gen_random_uuid()`.
- Tijdstippen: `timestamptz`.
- Verblijfsdatums: `date`.
- Geld: `bigint` in centen met suffix `_cents`.
- Percentages: `integer` in basispunten met suffix `_bps`.
- Valuta: `char(3)`, MVP altijd `EUR`.
- Landcodes: `char(2)`.
- E-mail: `citext`.
- Flexibele providerspecifieke gegevens: `jsonb`, maar geen primaire bedrijfslogica.
- Soft delete waar geschiedenis nodig is: `archived_at` of status.
- Iedere tabel heeft waar passend `created_at` en `updated_at`.

### `users`

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK, FK `auth.users(id)` cascade |
| email | citext | unique, not null |
| full_name | text | not null |
| avatar_path | text | nullable |
| role | user_role | `guest`, `host`, `admin` |
| status | user_status | `active`, `restricted`, `blocked`, `deleted` |
| locale | varchar(5) | default `nl` |
| phone_e164 | text | nullable |
| last_login_at | timestamptz | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Indexes: unique email; `(role, status)`; partial index op actieve hosts/admins.  
Relaties: een user kan gastboekingen, favorieten, reviews en berichten hebben; hostrechten ontstaan met `host_profiles`.

Een host behoudt alle gastmogelijkheden en kan dus ook zelf een verblijf boeken.

### `host_profiles`

| Kolom | Type | Regels |
|---|---|---|
| user_id | uuid | PK, FK `users(id)` cascade |
| display_name | text | not null |
| legal_entity_type | text | individual/company |
| business_name | text | nullable |
| country_code | char(2) | EER-land |
| verification_status | host_verification_status | not null |
| platform_approved | boolean | default false |
| approved_by | uuid | FK `users(id)` |
| approved_at | timestamptz | nullable |
| restriction_reason | text | nullable |
| terms_version | text | not null |
| terms_accepted_at | timestamptz | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Indexes: `(verification_status, platform_approved)`.  
Publiceerregel: alleen `verified AND platform_approved`.

### `payout_accounts`

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK |
| host_id | uuid | unique FK `host_profiles(user_id)` |
| provider | text | `stripe` |
| provider_account_id | text | unique, not null |
| onboarding_complete | boolean | default false |
| transfers_capability | text | inactive/pending/active |
| payouts_enabled | boolean | default false |
| payout_schedule | text | default `manual` |
| requirements_due | jsonb | providerstatus, restricted |
| last_synced_at | timestamptz | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Er worden geen IBANs of identiteitsdocumenten opgeslagen.

### `listings`

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK |
| host_id | uuid | FK `users(id)` |
| slug | text | unique |
| status | listing_status | not null |
| title | text | not null |
| description | text | not null |
| region | text | not null |
| county | text | not null |
| municipality | text | not null |
| city | text | not null |
| public_location | geography(Point,4326) | globale kaartlocatie |
| timezone | text | default `Europe/Oslo` |
| currency | char(3) | default `EUR` |
| base_price_cents | bigint | non-negative |
| cleaning_fee_cents | bigint | non-negative |
| mandatory_boat_fee_cents | bigint | default 0 |
| max_guests | smallint | positive |
| bedrooms | smallint | non-negative |
| bathrooms | numeric(3,1) | non-negative |
| check_in_time | time | lokale tijd |
| check_out_time | time | lokale tijd |
| pets_allowed | boolean | default false |
| waterfront | boolean | default true |
| private_dock | boolean | default false |
| sauna_hot_tub | boolean | default false |
| direct_booking | boolean | default true |
| house_rules | text | not null |
| cancellation_policy_version | text | not null |
| approved_by | uuid | FK `users(id)` |
| approved_at | timestamptz | nullable |
| published_at | timestamptz | nullable |
| archived_at | timestamptz | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Indexes:

- unique slug;
- `(status, published_at desc)`;
- `(host_id, status)`;
- `(region, status)`;
- `(base_price_cents)` voor gepubliceerde listings;
- GiST op `public_location`.

### `listing_private_locations`

| Kolom | Type | Regels |
|---|---|---|
| listing_id | uuid | PK, FK `listings(id)` cascade |
| address_line_1 | text | not null |
| address_line_2 | text | nullable |
| postal_code | text | not null |
| exact_location | geography(Point,4326) | not null |
| access_instructions | text | nullable |

Alleen host, admin en gasten met een bevestigde relevante boeking krijgen toegang.

### `listing_images`

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK |
| listing_id | uuid | FK `listings(id)` cascade |
| storage_path | text | unique |
| alt_text | text | not null |
| sort_order | integer | not null |
| width | integer | nullable |
| height | integer | nullable |
| crop | jsonb | nullable |
| moderation_status | text | pending/approved/rejected |
| created_at | timestamptz | not null |

Indexes: unique `(listing_id, sort_order)`; `(listing_id, moderation_status)`.

### `boat_details`

| Kolom | Type | Regels |
|---|---|---|
| listing_id | uuid | PK, FK `listings(id)` cascade |
| boat_type | boat_type | not null |
| make | text | nullable |
| model | text | nullable |
| build_year | smallint | nullable |
| capacity | smallint | positive |
| engine_power_hp | integer | non-negative |
| license_required | boolean | not null |
| license_category | text | nullable |
| safety_equipment | text[] | not null |
| deposit_cents | bigint | non-negative |
| rules | text | not null |
| insurance_status | text | pending/verified/expired/rejected |
| insurance_expires_on | date | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Index: `(license_required, boat_type, capacity)`.

### `listing_documents`

Private tabel voor bootverzekering, registratie en veiligheidscertificaten:

- `id uuid PK`
- `listing_id uuid FK`
- `document_type text`
- `storage_path text unique`
- `verification_status text`
- `expires_on date`
- `verified_by uuid FK users`
- `verified_at timestamptz`

### `amenities` en `listing_amenities`

`amenities`: `id uuid PK`, `slug text unique`, `category text`, `labels jsonb`, `icon text`.  
`listing_amenities`: composite PK `(listing_id, amenity_id)` met beide foreign keys.  
Index op `(amenity_id, listing_id)` voor zoeken.

### `availability`

Dit is een blokkerende kalender. Zonder actieve blokkade is een listing beschikbaar.

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK |
| listing_id | uuid | FK `listings(id)` cascade |
| booking_id | uuid | nullable FK `bookings(id)` |
| date_range | daterange | `[check_in, check_out)` |
| block_type | availability_type | payment_hold, confirmed_booking, host_block, boat_block, maintenance |
| status | availability_status | active, released, expired |
| expires_at | timestamptz | alleen voor payment_hold |
| created_by | uuid | nullable FK `users(id)` |
| note | text | private |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Cruciale constraint:

```sql
create extension if not exists btree_gist;

alter table availability
add constraint availability_no_overlap
exclude using gist (
  listing_id with =,
  date_range with &&
)
where (status = 'active');
```

Hierdoor kan zelfs gelijktijdige serverbelasting geen dubbele boeking maken.

Indexes: GiST `(listing_id, date_range)`; `(status, expires_at)`; `(booking_id)`.

### `pricing_rules`

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK |
| listing_id | uuid | FK `listings(id)` cascade |
| name | text | not null |
| date_range | daterange | not null |
| weekdays | smallint[] | 1-7, nullable betekent alle dagen |
| nightly_price_cents | bigint | non-negative |
| cleaning_fee_override_cents | bigint | nullable |
| min_nights | smallint | default 1 |
| max_nights | smallint | nullable |
| priority | integer | default 0 |
| active | boolean | default true |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Indexes: GiST `(listing_id, date_range)`; `(listing_id, active, priority desc)`.

### `bookings`

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK |
| reference | text | unique, menselijk boekingsnummer |
| listing_id | uuid | FK `listings(id)` |
| guest_id | uuid | FK `users(id)` |
| status | booking_status | not null |
| check_in | date | not null |
| check_out | date | not null, groter dan check_in |
| stay_range | daterange | generated `[check_in, check_out)` |
| guests | smallint | positive |
| currency | char(3) | `EUR` |
| nightly_subtotal_cents | bigint | snapshot |
| cleaning_fee_cents | bigint | snapshot |
| boat_fee_cents | bigint | snapshot |
| guest_service_fee_cents | bigint | snapshot |
| host_commission_cents | bigint | snapshot |
| tax_cents | bigint | snapshot |
| total_cents | bigint | snapshot |
| host_net_cents | bigint | snapshot |
| guest_fee_bps | integer | default snapshot 800 |
| host_fee_bps | integer | default snapshot 500 |
| cancellation_policy_version | text | snapshot |
| pricing_version | text | not null |
| license_required | boolean | snapshot |
| license_confirmed_at | timestamptz | nullable |
| payment_expires_at | timestamptz | nullable |
| confirmed_at | timestamptz | nullable |
| checked_in_at | timestamptz | nullable |
| completed_at | timestamptz | nullable |
| cancelled_at | timestamptz | nullable |
| cancellation_reason | text | nullable |
| payout_release_at | timestamptz | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Indexes:

- unique reference;
- `(guest_id, created_at desc)`;
- `(listing_id, check_in, check_out)`;
- `(status, payout_release_at)`;
- partial index voor actieve boekingen.

### `booking_price_items`

| Kolom | Type |
|---|---|
| id | uuid PK |
| booking_id | uuid FK |
| item_type | text |
| label | text |
| quantity | numeric |
| unit_amount_cents | bigint |
| total_amount_cents | bigint |
| taxable | boolean |
| metadata | jsonb |

Index: `(booking_id, item_type)`.

### `payments`

Meerdere betaalpogingen per booking zijn toegestaan.

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK |
| booking_id | uuid | FK `bookings(id)` |
| attempt_number | smallint | positive |
| provider | text | `stripe` |
| status | payment_status | not null |
| amount_cents | bigint | not null |
| currency | char(3) | `EUR` |
| checkout_session_id | text | unique nullable |
| payment_intent_id | text | unique nullable |
| charge_id | text | unique nullable |
| transfer_group | text | alle betaalpogingen van dezelfde booking delen deze waarde |
| payment_method_type | text | nullable |
| idempotency_key | text | unique |
| failure_code | text | nullable |
| failure_message | text | nullable, veilig voor gebruiker |
| paid_at | timestamptz | nullable |
| held_at | timestamptz | nullable |
| released_at | timestamptz | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Indexes: unique `(booking_id, attempt_number)`; `(booking_id, status)`; `(transfer_group)`; provider-ID's uniek.

### `platform_fees`

| Kolom | Type |
|---|---|
| id | uuid PK |
| booking_id | uuid FK |
| payment_id | uuid FK |
| fee_type | guest_service, host_commission, provider_cost, tax_adjustment |
| rate_bps | integer nullable |
| amount_cents | bigint |
| currency | char(3) |
| status | accrued, realized, reversed |
| created_at | timestamptz |

Indexes: `(booking_id, fee_type)`; `(status, created_at)`.

### `payouts`

| Kolom | Type | Regels |
|---|---|---|
| id | uuid | PK |
| booking_id | uuid | unique FK |
| host_id | uuid | FK `users(id)` |
| payout_account_id | uuid | FK `payout_accounts(id)` |
| status | payout_status | not null |
| gross_host_cents | bigint | snapshot |
| adjustment_cents | bigint | default 0 |
| amount_cents | bigint | final |
| currency | char(3) | `EUR` |
| scheduled_for | timestamptz | not null |
| provider_transfer_id | text | unique nullable |
| provider_payout_id | text | unique nullable |
| idempotency_key | text | unique |
| retry_count | integer | default 0 |
| failure_code | text | nullable |
| failure_message | text | nullable |
| paid_at | timestamptz | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Indexes: `(status, scheduled_for)`; `(host_id, created_at desc)`.

### `refunds`

| Kolom | Type |
|---|---|
| id | uuid PK |
| booking_id | uuid FK |
| payment_id | uuid FK |
| requested_by | uuid FK users |
| approved_by | uuid nullable FK users |
| status | refund_status |
| reason | text |
| policy_result | jsonb |
| amount_cents | bigint |
| currency | char(3) |
| provider_refund_id | text unique nullable |
| idempotency_key | text unique |
| requested_at | timestamptz |
| approved_at | timestamptz nullable |
| completed_at | timestamptz nullable |
| failure_message | text nullable |

Indexes: `(booking_id, status)`; `(status, requested_at)`.

### `disputes`

| Kolom | Type |
|---|---|
| id | uuid PK |
| booking_id | uuid FK |
| payment_id | uuid FK |
| source | guest_claim, host_claim, damage_claim, chargeback |
| status | open, evidence_required, under_review, won, lost, resolved |
| provider_dispute_id | text unique nullable |
| amount_cents | bigint |
| currency | char(3) |
| reason | text |
| evidence_due_at | timestamptz nullable |
| payout_paused | boolean default true |
| assigned_admin_id | uuid nullable FK users |
| resolution | text nullable |
| opened_at | timestamptz |
| resolved_at | timestamptz nullable |

Indexes: `(status, evidence_due_at)`; `(booking_id)`; `(assigned_admin_id, status)`.

### `security_deposits`

| Kolom | Type |
|---|---|
| id | uuid PK |
| booking_id | uuid unique FK |
| status | not_requested, requires_method, authorized, released, capture_requested, captured, failed |
| amount_cents | bigint |
| currency | char(3) |
| provider_setup_intent_id | text unique nullable |
| provider_payment_intent_id | text unique nullable |
| card_brand | text nullable |
| card_last4 | char(4) nullable |
| authorization_expires_at | timestamptz nullable |
| claim_amount_cents | bigint nullable |
| authorized_at | timestamptz nullable |
| released_at | timestamptz nullable |
| captured_at | timestamptz nullable |

### `booking_documents`

| Kolom | Type |
|---|---|
| id | uuid PK |
| booking_id | uuid FK |
| user_id | uuid FK |
| document_type | boating_license, identity_verification |
| provider_reference | text nullable |
| storage_path | text nullable |
| status | requested, pending, verified, rejected, expired |
| expires_on | date nullable |
| verified_by | uuid nullable FK users |
| verified_at | timestamptz nullable |

Private Storage-bucket; signed URLs met korte geldigheid.

### `conversations`

| Kolom | Type |
|---|---|
| id | uuid PK |
| listing_id | uuid FK |
| booking_id | uuid nullable FK |
| guest_id | uuid FK |
| host_id | uuid FK |
| status | open, archived, blocked |
| last_message_at | timestamptz |
| created_at | timestamptz |

Indexes: `(guest_id, last_message_at desc)`; `(host_id, last_message_at desc)`; unique booking conversation waar booking_id niet null is.

### `messages`

| Kolom | Type |
|---|---|
| id | uuid PK |
| conversation_id | uuid FK |
| sender_id | uuid FK users |
| body | text |
| attachments | jsonb |
| system_message | boolean default false |
| read_at | timestamptz nullable |
| created_at | timestamptz |

Indexes: `(conversation_id, created_at)`; partial unread index.

### `favorites`

- `user_id uuid FK`
- `listing_id uuid FK`
- `created_at timestamptz`
- composite PK `(user_id, listing_id)`
- index `(listing_id)`

### `reviews`

| Kolom | Type |
|---|---|
| id | uuid PK |
| booking_id | uuid unique FK |
| listing_id | uuid FK |
| reviewer_id | uuid FK users |
| rating | smallint check 1-5 |
| cleanliness_rating | smallint check 1-5 |
| boat_rating | smallint check 1-5 |
| comment | text |
| host_response | text nullable |
| status | pending, published, hidden |
| published_at | timestamptz nullable |
| created_at | timestamptz |

Alleen mogelijk na `completed`.

### `webhook_events`

| Kolom | Type |
|---|---|
| id | uuid PK |
| provider | text |
| provider_event_id | text unique |
| event_type | text |
| provider_account_id | text nullable |
| livemode | boolean |
| payload | jsonb |
| status | received, processing, processed, failed, ignored |
| attempt_count | integer |
| received_at | timestamptz |
| processed_at | timestamptz nullable |
| last_error | text nullable |

Payloadtoegang is alleen server/admin en krijgt een bewaartermijn.

### `audit_logs`

Append-only:

- `id uuid PK`
- `actor_user_id uuid nullable`
- `actor_role text`
- `action text`
- `entity_type text`
- `entity_id uuid nullable`
- `request_id text`
- `before_data jsonb` met redactieregels
- `after_data jsonb` met redactieregels
- `ip_address inet nullable`
- `user_agent text nullable`
- `created_at timestamptz`

Indexes: `(entity_type, entity_id, created_at desc)`; `(actor_user_id, created_at desc)`; `(action, created_at desc)`.

### Ondersteunende tabellen

**`platform_settings`**

- versiebeheer voor `guest_fee_bps`, `host_fee_bps`, annuleringsbeleid, payoutvertraging en refunddrempels;
- `effective_from`, `effective_until`, `updated_by`;
- bestaande boekingen gebruiken altijd hun snapshot.

**`outbox_jobs`**

- betrouwbare verwerking van e-mail, verlopen holds, payouts en retrybare provideracties;
- unieke `dedupe_key`;
- worker claimt rijen met `FOR UPDATE SKIP LOCKED`.

**`listing_translations`**

- unieke `(listing_id, locale)`;
- titel, beschrijving, bootregels en huisregels;
- automatische vertaling wordt opgeslagen en kan door host/admin worden gecorrigeerd.

## 8. Row Level Security

RLS staat aan op iedere tabel in het publieke schema. De secret/service key komt nooit in de browser.

### Bezoeker

- Mag alleen `published` listings lezen via een publieke view.
- Krijgt alleen globale locatie, geen exact adres.
- Mag goedgekeurde foto's, openbare voorzieningen en gepubliceerde reviews lezen.
- Krijgt alleen geaggregeerde beschikbaarheid, geen gastgegevens of blokkeerredenen.

### Gast

- Mag het eigen profiel lezen en beperkte velden wijzigen.
- Mag alleen eigen boekingen, betalingen, refunds, borgstatus en documenten lezen.
- Mag eigen favorieten beheren.
- Mag alleen gesprekken lezen waarin de user gast of host is.
- Mag geen financiële status, prijsvelden of bookingstatus direct schrijven.

### Host

- Mag eigen conceptlistings en listingcontent beheren.
- Mag niet zelf `published`, `approved_by` of verificatiestatus zetten.
- Mag eigen kalenderblokkades beheren zolang die niet met een bevestigde boeking conflicteren.
- Mag boekingen bij eigen listings lezen, met minimale relevante gastgegevens.
- Mag eigen payoutoverzicht lezen, maar geen providerbedragen of status direct wijzigen.

### Admin

- Adminrechten worden server-side gecontroleerd via een private databasefunctie en de `users.role`.
- Adminmutaties lopen via beschermde Route Handlers, niet rechtstreeks vanuit de browser.
- Iedere mutatie vereist een reden en schrijft een auditlog.
- Productieversie: refunds of payouts boven een instelbare drempel vereisen een tweede admin.

### Tabellen zonder client writes

`payments`, `payouts`, `platform_fees`, `webhook_events`, `audit_logs` en financiële velden van `bookings` zijn alleen schrijfbaar door vertrouwde serverprocessen.

## 9. API-endpoints

Alle muterende endpoints gebruiken:

- Supabase SSR-sessie;
- rolcontrole;
- Zod-schema;
- CSRF-bescherming waar cookies worden gebruikt;
- rate limiting;
- request-ID;
- idempotency key voor retrybare acties;
- veilige foutcodes zonder providersecrets.

### Publiek en zoeken

| Methode | Endpoint | Doel |
|---|---|---|
| GET | `/api/listings` | zoeken, filters, kaartgrenzen en sortering |
| GET | `/api/listings/:id` | gepubliceerde detaildata |
| POST | `/api/availability/check` | huis + boot controleren |
| POST | `/api/bookings/quote` | server-side prijsopgave |

### Auth en profiel

Supabase Auth verwerkt signup, login, e-mailverificatie, password reset en OAuth.  
Applicatieroutes: `GET/PATCH /api/me`, `POST /api/me/become-host`.

### Boekingen

| Methode | Endpoint | Doel |
|---|---|---|
| POST | `/api/bookings` | pending booking + tijdelijke hold |
| GET | `/api/bookings/:id` | gescopeerde boekingsdata |
| POST | `/api/bookings/:id/checkout` | Stripe Checkout Session |
| POST | `/api/bookings/:id/cancel` | policyberekening en annulering |
| POST | `/api/bookings/:id/refund-request` | refund aanvragen |
| POST | `/api/bookings/:id/check-in` | check-in na borg/documentcontrole |
| POST | `/api/bookings/:id/review` | review na voltooiing |
| POST | `/api/bookings/:id/deposit-session` | borgkaart bevestigen |

### Host

| Methode | Endpoint | Doel |
|---|---|---|
| POST | `/api/host/onboarding` | connected account en onboardinglink |
| GET | `/api/host/status` | KYC/capabilities |
| GET/POST | `/api/host/listings` | lijst en concept maken |
| GET/PATCH | `/api/host/listings/:id` | eigen listing beheren |
| POST | `/api/host/listings/:id/submit` | naar pending_review |
| PUT | `/api/host/listings/:id/availability` | blokken beheren |
| PUT | `/api/host/listings/:id/pricing` | prijsregels beheren |
| GET | `/api/host/bookings` | chronologisch per listing |
| GET | `/api/host/payouts` | inkomsten en payouts |

### Berichten

| Methode | Endpoint |
|---|---|
| GET/POST | `/api/conversations` |
| GET | `/api/conversations/:id` |
| POST | `/api/conversations/:id/messages` |
| PATCH | `/api/messages/:id/read` |

### Admin

| Methode | Endpoint |
|---|---|
| GET/PATCH | `/api/admin/users/:id` |
| GET/PATCH | `/api/admin/hosts/:id` |
| GET/PATCH | `/api/admin/listings/:id` |
| GET | `/api/admin/bookings` |
| GET | `/api/admin/payments` |
| POST | `/api/admin/refunds/:id/approve` |
| POST | `/api/admin/refunds/:id/reject` |
| POST | `/api/admin/disputes/:id/resolve` |
| POST | `/api/admin/payouts/:id/pause` |
| POST | `/api/admin/payouts/:id/release` |
| GET/PATCH | `/api/admin/settings/fees` |
| GET | `/api/admin/audit-logs` |

### Webhooks en interne jobs

| Methode | Endpoint |
|---|---|
| POST | `/api/webhooks/stripe/platform` |
| POST | `/api/webhooks/stripe/connect` |
| POST | `/api/internal/jobs/process-outbox` |

Interne jobs vereisen een serversecret en zijn niet beschikbaar voor browsers.

## 10. Webhookflow

1. Lees de ongewijzigde requestbody.
2. Controleer `Stripe-Signature` met het endpointsecret.
3. Controleer `livemode` en het juiste platform/connected account.
4. Insert `webhook_events` met unieke `provider_event_id`.
5. Bestaat het event al, retourneer direct 200.
6. Sla de job op en retourneer snel 200.
7. Een worker verwerkt het event transactioneel.
8. Statuswijzigingen schrijven een auditlog.
9. Retrybare fouten blijven in de outbox; permanente fouten gaan naar admin-alerting.

### Belangrijkste events

- `checkout.session.completed`
- `checkout.session.expired`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `refund.created`
- `refund.updated`
- `refund.failed`
- `charge.dispute.created`
- `charge.dispute.closed`
- `account.updated`
- `payout.paid`
- `payout.failed`

Een geplande statusjob zet een bevestigde booking op de lokale check-intijd naar `checked_in` als de booking niet is geannuleerd en borg- en vaarbewijsvereisten zijn voldaan. Bij ontbrekende vereisten blijft de status bevestigd en ontstaat een admin/host-alert.

## 11. Pseudocode

### `createBooking`

```text
function createBooking(userId, input, idempotencyKey):
  validate input with Zod
  assert user is active

  if booking exists for idempotencyKey:
    return existing booking

  begin database transaction
    listing = select published listing for update
    assert host is verified and listing is bookable
    assert guests <= listing.max_guests
    assert checkOut > checkIn

    quote = calculatePriceFromDatabaseRules(listing, dates)
    assert quoted currency == EUR

    booking = insert bookings(
      status = pending_payment,
      all price and policy snapshots,
      payment_expires_at = now + 30 minutes
    )

    insert booking_price_items(quote.lines)

    insert availability(
      listing_id,
      booking_id,
      date_range,
      block_type = payment_hold,
      status = active,
      expires_at = payment_expires_at
    )
    // exclusion constraint is the final double-booking protection

    insert payment(status = requires_payment, attempt = 1)
    insert payout(status = not_ready, scheduled_for = checkIn + 24 hours)
    insert audit_log
  commit

  try:
    session = stripe.checkout.sessions.create(
      amount from payment row,
      currency EUR,
      transfer_group = booking.id,
      metadata booking/payment IDs,
      dynamic payment methods,
      idempotency key
    )
    update payment with checkout_session_id
    return booking + session.url
  catch:
    transactionally mark payment failed and release availability hold
    throw safe checkout error
```

### `confirmPayment`

```text
function confirmPayment(stripeEvent):
  verify webhook signature

  if webhook_events already contains event.id:
    return success

  store event and enqueue processing

worker:
  begin transaction
    payment = select by provider ID for update
    booking = select booking for update

    if payment already handled:
      mark webhook processed
      commit and return

    assert provider amount, currency and metadata equal snapshots

    if payment succeeded:
      try:
        reactivate or convert availability hold to confirmed_booking
      catch overlap:
        mark booking cancelled with payment_conflict
        enqueue full refund
        commit and return

      payment.status = held
      payment.paid_at = provider paid time
      booking.status = confirmed
      booking.confirmed_at = now
      booking.payout_release_at = local check-in time + 24 hours
      payout.status = scheduled
      insert audit log

    if payment failed or session expired:
      payment.status = failed
      booking.status = cancelled
      release availability hold

    mark webhook processed
  commit
```

### `cancelBooking`

```text
function cancelBooking(actor, bookingId, reason):
  begin transaction
    booking = select for update
    authorize guest, host or admin
    assert booking is cancellable

    if actor is host:
      refundable = full guest total
      host payout = paused
      add host cancellation incident
    else:
      days = calendar days until check-in in Europe/Oslo
      if days > 30:
        refundable lodging = 100%
      else if days >= 7:
        refundable lodging = 50%
      else:
        refundable lodging = 0%

      cleaning fee = 100% refundable before stay
      guest service fee refund follows refundable booking subtotal proportionally

    booking.status = cancelled
    release availability
    insert refund(status = approved or requested based on permissions)
    insert audit log
  commit

  call refundBooking(refund.id)
```

### `refundBooking`

```text
function refundBooking(refundId):
  begin transaction
    refund = select for update
    payment = select for update
    assert refund.status == approved
    assert sum(completed + processing refunds) + amount <= captured amount
    refund.status = processing
  commit

  result = stripe.refunds.create(
    payment_intent or charge,
    amount,
    metadata,
    idempotency key
  )

  save provider_refund_id
  // final completed/failed state comes from signed webhook
```

### `releasePayout`

```text
function releasePayout(payoutId):
  begin transaction
    payout = select for update
    booking, host, account = select related rows

    assert payout is due and not already transferred
    assert booking status is checked_in or completed
    assert now >= booking.payout_release_at
    assert host verification == verified
    assert transfers capability active
    assert no open dispute, chargeback or payout pause
    assert refundable amount and adjustments are finalized

    payout.status = pending
    reserve idempotency key
  commit

  transfer = stripe.transfers.create(
    destination connected account,
    amount payout.amount_cents,
    transfer_group booking.id,
    idempotency key
  )

  save provider_transfer_id

  when connected balance is available:
    create or schedule provider payout
    final status follows payout.paid or payout.failed webhook
```

## 12. Annulering en refunds

### Gast annuleert

- Meer dan 30 dagen voor check-in: 100% boekingssubtotaal en schoonmaak terug.
- 7 tot en met 30 dagen: 50% van verblijf/bootcomponenten en 100% schoonmaak terug.
- Minder dan 7 dagen: alleen schoonmaak terug.
- De gastservicekosten worden evenredig terugbetaald met het terugbetaalde boekingssubtotaal.
- Eventuele wettelijke uitzonderingen of goedgekeurde bijzondere omstandigheden overschrijven de standaardpolicy.

### Host annuleert

- Volledige refund inclusief gastservicekosten en schoonmaak.
- Payout wordt gepauzeerd of geannuleerd.
- Incident wordt op hostprofiel geregistreerd.
- Admin kan listing of host beperken bij herhaling.

### Chargeback

- Payment wordt `chargeback`.
- Booking/dispute wordt `disputed`.
- Nog niet vrijgegeven payout wordt `paused`.
- Bij al uitbetaalde bedragen wordt een negatieve hostcorrectie geregistreerd, voor zover juridisch en contractueel toegestaan.
- Nordic Boat Stays houdt een reserve voor chargebacks en refunds.

## 13. Borgflow

1. Zeven dagen voor check-in krijgt de gast een verzoek.
2. De gast bevestigt een kaart via een SetupIntent of geschikte Checkout-flow.
3. Kort voor aankomst wordt de borg geautoriseerd met manual capture.
4. Het systeem bewaart `capture_before`; het vertrouwt niet op een vaste termijn.
5. Als `capture_before` voor de geplande uitcheck ligt, vraagt het systeem tijdig om een nieuwe autorisatie. Er wordt niet stilzwijgend buiten de geldige termijn gecaptured.
6. Zonder geldige borgautorisatie blijft check-in geblokkeerd.
7. Na correcte uitcheck wordt de autorisatie geannuleerd/vrijgegeven.
8. Bij schade dient host een claim met bewijs in.
9. Admin beoordeelt het bedrag.
10. Alleen na goedkeuring wordt geheel of gedeeltelijk gecaptured.

iDEAL ondersteunt deze autorisatie/capture-flow niet en is daarom alleen voor de hoofdboeking beschikbaar.

## 14. Securityregels

- Supabase publishable key mag client-side; secret key uitsluitend server-side.
- Stripe secret en webhooksecrets uitsluitend als Netlify environment secrets.
- Geen prijs, commissie, payoutbedrag of bookingstatus uit clientinput vertrouwen.
- Stripe-webhooks gebruiken raw body, signature verification en event-idempotency.
- Alle Stripe create/update requests gebruiken een idempotency key.
- Rate limits op login, zoeken, berichten, boekingen, checkout en adminacties.
- MFA verplicht voor admins; aanbevolen voor hosts.
- E-mailverificatie verplicht voor boeking en publicatie.
- Private documenten in private buckets met korte signed URLs.
- Exact adres pas na bevestigde boeking.
- PII wordt geminimaliseerd en krijgt verwijder-/bewaarbeleid volgens AVG.
- Auditlogs zijn append-only en bevatten geen volledige betaal- of documentgegevens.
- Security headers, CSP, secure cookies, SameSite en HTTPS zijn verplicht.
- Dependency- en secretscans draaien in CI.
- Backups en restore-oefeningen zijn onderdeel van productiebeheer.

## 15. Edge cases

| Scenario | Gedrag |
|---|---|
| Twee gasten boeken dezelfde datums | PostgreSQL weigert tweede actieve range; nette beschikbaarheidsfout |
| Betaling mislukt | payment failed, booking cancelled, hold vrij |
| Gast sluit Checkout | hold blijft tot expiry; daarna automatisch vrij |
| Dubbele webhook | unieke provider_event_id maakt verwerking no-op |
| Host niet geverifieerd | listing niet publiceerbaar; payout not_ready/paused |
| Payout faalt | payout failed, host/admin melding, bankaccount opnieuw verifiëren, retry |
| Gast annuleert tijdig | policyberekening, availability vrij, refund |
| Gast annuleert laat | schoonmaak terug; overige refund volgens policy |
| Host annuleert | volledige refund en hostincident |
| Chargeback | dispute openen, payout pauzeren, evidenceworkflow |
| Geschil na check-in | payout direct pauzeren zolang mogelijk |
| Boot niet beschikbaar | boat_block maakt hele listing onbeschikbaar |
| Vaarbewijs ontbreekt | booking blijft bestaan, boot check-in geblokkeerd |
| Late succesvolle betaling | bevestigen indien range nog vrij; anders automatische full refund |
| Refund na payout | transfer reversal/hostcorrectie waar mogelijk; platformreserve dekt verschil |
| Pricing rule wijzigt tijdens Checkout | booking snapshot blijft geldig tot payment expiry |
| Webhook tijdelijk niet bereikbaar | Stripe retryt; outbox en idempotency voorkomen verlies/dubbel werk |

## 16. Provideradvies

### Stripe Connect - aanbevolen

Voordelen:

- sterke Next.js/TypeScript-tooling;
- iDEAL, kaarten en wallets via Checkout;
- hosted onboarding en KYC;
- separate charges and transfers;
- uitgebreide webhooks, refunds en disputes;
- geschikt om vanuit MVP door te groeien.

Aandachtspunten:

- platform draagt providerkosten, refunds en chargebackrisico bij deze flow;
- Connectkosten en payoutkosten;
- Stripe moet delayed transfers voor dit specifieke model goedkeuren;
- dit is geen escrow.

### Mollie Connect - goede Europese tweede keuze

Voordelen:

- zeer sterk in iDEAL en Europese betaalmethoden;
- delayed routing en marketplace splits;
- vertrouwde Nederlandse partij.

Nadelen:

- marketplace/delayed routing moet apart worden geactiveerd;
- delayed routing kent een termijn van 90 dagen, problematisch voor vroeg geboekte verblijven;
- minder passend voor de gekozen lange boeking-tot-check-inflow zonder aangepast betaalmodel.

### Adyen for Platforms - later bij grotere schaal

Voordelen:

- zeer krachtige marketplace-, balans- en payoutinfrastructuur;
- brede internationale betaalmethodes en enterprise reporting.

Nadelen:

- zwaardere commerciële onboarding;
- hogere implementatie- en operationele complexiteit;
- te zwaar voor de eerste MVP.

Conclusie: begin met Stripe Connect, maar maak de interne payment service provider-onafhankelijk zodat later Mollie of Adyen kan worden toegevoegd.

## 17. MVP-versie

### In scope

- Supabase e-mail/password-auth en password reset.
- Gast-, host- en adminrollen.
- Host KYC via Stripe-hosted onboarding.
- Listing maken, foto's uploaden, bootdetails en kalender.
- Admin listinggoedkeuring.
- Zoeken, kaart, filters en server-side beschikbaarheid.
- Direct boeken in EUR.
- 8% gastkosten en 5% hostcommissie.
- Stripe Checkout met iDEAL, geschikte kaarten en wallets.
- Webhookgestuurde bevestiging.
- Dubbele-boekingbescherming.
- Gast- en hostboekingenoverzicht.
- Basisberichten per booking/listing.
- Standaardannulering en refunds.
- Borgflow voor kaart.
- Vaarbewijsstatus.
- Payout na check-in + 24 uur.
- Basisadmin voor users, listings, bookings, refunds, disputes en payouts.
- Auditlogs en basisalerting.
- Nederlands plus bestaande ondersteunde interfacevertalingen via `next-intl`.

### Niet in eerste MVP

- NOK en automatische valutaconversie.
- Gespreid betalen.
- Complexe coupons en loyaliteitsprogramma's.
- Meerdere boten per listing.
- Instant payouts.
- Geautomatiseerde verzekeringclaims.
- Geavanceerde fraudemodellen.
- Mobiele apps.
- Volledig geautomatiseerde belastingaangifte.
- Dynamische platformcommissie per land/segment.

## 18. Productieklare versie

Aanvullend op MVP:

- aparte development-, staging- en productionomgevingen;
- formele Stripe marketplace-goedkeuring;
- juridische voorwaarden voor gast, host, bootgebruik, schade en annulering;
- privacybeleid, verwerkersovereenkomsten en bewaartermijnen;
- professionele e-mailprovider en transactionele templates;
- monitoring, error tracking en financiële reconciliatie;
- dagelijkse backups en periodieke restoretest;
- admin-MFA en vier-ogenbeleid voor hoge refunds/payouts;
- frauderegels en handmatige reviewqueue;
- incidentrespons, supportworkflow en SLA's;
- belasting- en btwconfiguratie op advies van boekhouder/fiscalist;
- vertaalkwaliteitscontrole en server-side vertaling van hostcontent;
- load-, concurrency-, RLS- en webhookchaostests;
- reservering voor refunds en chargebacks;
- maandelijkse provider/database/auditreconciliatie.

## 19. Concrete verbouwing van de bestaande site

### Fase 0: niets live breken

1. Houd de huidige statische Netlify-site online.
2. Maak een aparte stagingdeploy voor de Next.js-productieapp.
3. Gebruik aparte Supabase- en Stripe-sandboxomgevingen.
4. Schakel de huidige `NETLIFY_NEXT_PLUGIN_SKIP` en statische base directory pas uit bij de uiteindelijke omschakeling.

### Fase 1: technische fundering

1. Installeer Supabase SSR, Supabase JS, Stripe en next-intl.
2. Vervang mock-auth door Supabase Auth.
3. Vervang Prisma-schema als primaire bron door versioned Supabase SQL-migraties.
4. Genereer TypeScript-databasetypes.
5. Maak server/client Supabase-clients en authmiddleware.
6. Maak RLS-policies en private Storage-buckets.
7. Voeg environmentvalidatie toe zonder hardcoded secrets.

### Fase 2: ontwerp migreren

1. Splits de grote `website/app.js` op in TypeScript-services en Reactcomponenten.
2. Breng de goedgekeurde grijs/zwarte stijl met bronzen accenten naar `src/app/globals.css`.
3. Migreer homepage, search, listing, login, favorites, messages en dashboards.
4. Gebruik `next-intl`-sleutels in plaats van DOM-woordvervanging.
5. Sla automatisch vertaalde listingcontent per locale op.

### Fase 3: listings en zoekfunctie

1. Bouw listing CRUD, foto-upload, volgorde en preview.
2. Bouw adresgeocoding en gescheiden private/publieke locatie.
3. Bouw pricing rules en blokkalender.
4. Bouw server-side zoekfilters, kaartgrenzen en PostGIS-query's.
5. Toon alleen listings die voor de gekozen datums huis en boot vrij hebben.

### Fase 4: booking en betalingen

1. Bouw server-side quote-engine.
2. Bouw atomaire booking hold.
3. Integreer Stripe Checkout.
4. Bouw platform- en Connect-webhooks.
5. Bouw cancellation/refundservice.
6. Bouw borg en vaarbewijscheck.
7. Bouw payoutworker en reconciliatie.

### Fase 5: host en admin

1. Stripe-hosted onboarding en hoststatus.
2. Listing reviewqueue.
3. Chronologisch hostboekingenoverzicht per huis.
4. Inkomsten- en payoutschermen.
5. Admin users/listings/bookings/payments/refunds/disputes/payouts.
6. Instelbare feeversies en auditlogs.

### Fase 6: kwaliteit en livegang

1. Unit tests voor pricing, policies en statemachines.
2. PostgreSQL-concurrencytest voor dubbele boekingen.
3. RLS-tests per rol.
4. Stripe webhook- en idempotencytests.
5. Playwright E2E voor signup, host onboarding, listing, booking, annulering en payout.
6. Securityscan, accessibilitytest en performancecheck.
7. Staging-acceptatie door eigenaar.
8. Productiesecrets, live webhooks en gecontroleerde domeinomschakeling.

## 20. Teststrategie

- **Unit:** prijsberekening, annuleringsbedragen, statusovergangen, payouteligibility.
- **Database:** exclusion constraint, transacties, RLS, generated ranges en indexes.
- **Integration:** Stripe testmode, webhooks, refunds, account updates en payout failures.
- **Concurrency:** twee gelijktijdige boekingen voor dezelfde listing/datums.
- **E2E:** volledige gast-, host- en adminflows.
- **Security:** autorisatie, IDOR, bestandstoegang, webhookspoofing, rate limits en secret leaks.
- **Recovery:** dubbele events, timeouts, retries, gedeeltelijke providerstoringen en database restore.

## 21. Launch gates

De live betaalfunctie gaat pas aan als:

1. Stripe het marketplace- en delayed-transfermodel heeft goedgekeurd.
2. Juridische voorwaarden en privacydocumenten zijn beoordeeld.
3. Boekhouder/fiscalist de btw- en facturatiestroom heeft vastgesteld.
4. Hosts KYC en contractacceptatie kunnen afronden.
5. Stripe de benodigde borgautorisatie of een goedgekeurd alternatief voor langere verblijven ondersteunt.
6. Refund-, chargeback- en payoutreserve beschikbaar is.
7. RLS-, concurrency-, webhook- en E2E-tests slagen.
8. Monitoring, backups en incidentmeldingen actief zijn.
9. De eigenaar de stagingversie expliciet heeft goedgekeurd.

## 22. Bronnen

- Stripe Connect Accounts v2: https://docs.stripe.com/connect/accounts-v2
- Stripe separate charges and transfers: https://docs.stripe.com/connect/charges-transfers
- Stripe Connect pricing NL: https://stripe.com/nl/connect/pricing
- Stripe Payments pricing NL: https://stripe.com/nl/pricing
- Stripe webhook security: https://docs.stripe.com/webhooks
- Stripe authorization/capture: https://docs.stripe.com/payments/place-a-hold-on-a-payment-method
- Supabase Auth with Next.js: https://supabase.com/docs/guides/auth/quickstarts/nextjs
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Cron: https://supabase.com/docs/guides/cron
- PostgreSQL range constraints: https://www.postgresql.org/docs/current/rangetypes.html
- Mollie delayed routing: https://docs.mollie.com/docs/connect-marketplaces-split-payments-with-delayed-routing
- Adyen for Platforms payouts: https://docs.adyen.com/platforms/quickstart-guide/payouts
