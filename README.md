# Nordic Boat Stays

Boekingsplatform voor vakantiehuizen in Noorwegen waarbij altijd een boot is inbegrepen.

## Huidige status

De repository bevat tijdelijk twee applicaties:

- `website/`: de huidige publieke statische demo op Netlify.
- `src/`: de nieuwe productie-app met Next.js, Supabase en Stripe.

De productie-app heeft nu een beveiligde technische basis voor accounts, rollen, databasebeleid, boekingsholds, hostonboarding en betalingen. Stripe Checkout en de volledige migratie van listings volgen in de volgende fases. De oude demo blijft daardoor online terwijl de echte app gecontroleerd wordt opgebouwd.

## Stack

- Next.js 15 en React 19
- TypeScript en Tailwind CSS
- Supabase Auth, PostgreSQL, Row Level Security en Storage
- Stripe Connect Accounts v2
- Prisma als tijdelijke compatibiliteitslaag voor bestaande listingpagina's
- Vitest

## Vereisten

- Node.js 22
- Docker Desktop, OrbStack, Colima of een andere Docker-compatibele runtime
- Een Supabase-project voor staging/productie
- Een Stripe-account met testmodus en Connect

## Lokaal starten

```bash
npm install
npx supabase start
npm run supabase:reset
cp .env.example .env.local
npm run supabase:types
npm run dev
```

`npx supabase start` toont de lokale project-URL, publishable key en secret key. Zet die waarden in `.env.local`. Open daarna [http://localhost:3000](http://localhost:3000).

Zonder Docker kun je de Next.js-app, unit tests en typecheck draaien, maar de SQL-migrations en RLS-smoketests niet lokaal uitvoeren.

## Environmentvariabelen

Publiek, veilig voor de browser:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_replace_me"
```

Alleen server-side:

```env
SUPABASE_SECRET_KEY="sb_secret_replace_me"
STRIPE_SECRET_KEY="sk_test_replace_me"
STRIPE_WEBHOOK_SECRET="whsec_replace_me"
STRIPE_CONNECT_WEBHOOK_SECRET="whsec_replace_me"
STRIPE_API_VERSION="2026-05-27.dahlia"
```

Tijdelijk, zolang oude Prisma-listingreads nog bestaan:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
```

Zet echte sleutels alleen in `.env.local`, Supabase, Netlify of Stripe. Commit nooit secrets.

## Controles

```bash
npm test
npm run typecheck
npm run build
```

Voor databasecontroles:

```bash
npm run supabase:reset
npm run supabase:types
```

## Databaseveiligheid

De migrations in `supabase/migrations/` bevatten:

- marketplace-tabellen en statusflows;
- een PostgreSQL exclusion constraint tegen dubbele boekingen;
- een atomische `create_booking_hold` RPC;
- RLS voor gasten, hosts en publieke listingdata;
- afgeschermde financiële, document- en auditgegevens;
- storagebeleid voor goedgekeurde listingfoto's.

## Deploy

De bestaande `netlify.toml` publiceert uitsluitend `website/`. Wijzig die nog niet voor de huidige live demo. Maak voor de Next.js-app een aparte staging-site en voeg daar de Supabase- en Stripe-testvariabelen toe.

Lees [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) voor de deployscheiding en [docs/AI_WORKFLOW.md](docs/AI_WORKFLOW.md) voor latere AI-aanpassingen.
