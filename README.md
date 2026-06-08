# Nordic Boat Stays

Boekingsplatform voor vakantiehuizen in Noorwegen waarbij altijd een boot is inbegrepen.

## Status

De productie-app staat in `src/` en gebruikt Next.js, Supabase Auth/PostgreSQL en Stripe. De map `website/` is alleen nog een gearchiveerde visuele demo en wordt niet door Netlify gepubliceerd.

Het accountsysteem ondersteunt:

- registreren, e-mailverificatie, inloggen en veilig wachtwoordherstel;
- gast-, verhuurder- en beheerderrollen op hetzelfde account;
- persoonlijke profielen, privéavatars en meldingsvoorkeuren;
- accountgebonden boekingen, favorieten en gesprekken via Row Level Security;
- hostaanvragen en verificatiestatussen;
- AAL2-beveiligd adminbeheer met auditlogs;
- AVG-vriendelijke accountdeactivatie;
- databasegestuurde bescherming tegen brute-force-inlogpogingen.

## Stack

- Next.js 15, React 19, TypeScript en Tailwind CSS
- Supabase Auth, PostgreSQL, Row Level Security en Storage
- Stripe Connect
- Prisma alleen voor nog niet gemigreerde publieke listingpagina's
- Vitest

## Lokaal starten

Vereisten: Node.js 22 en bij voorkeur Docker Desktop, OrbStack of Colima.

```bash
npm install
cp .env.example .env.local
npx supabase start
npm run supabase:reset
npm run dev
```

Neem de lokale Supabase-URL en keys uit de uitvoer van `npx supabase start` over in `.env.local`. Open daarna [http://localhost:3000](http://localhost:3000).

Zonder Docker kun je de Next.js-app, unit tests, typecheck en build draaien. De SQL-migrations en RLS-tests moeten dan tegen een apart Supabase-stagingproject worden uitgevoerd.

## Environmentvariabelen

Publiek:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
```

Alleen server-side:

```env
SUPABASE_SECRET_KEY="sb_secret_..."
AUTH_RATE_LIMIT_SECRET="minimaal-32-willekeurige-bytes"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_CONNECT_WEBHOOK_SECRET="whsec_..."
STRIPE_API_VERSION="2026-05-27.dahlia"
DATABASE_URL="postgresql://..."
```

Genereer het rate-limit-secret bijvoorbeeld met:

```bash
openssl rand -hex 32
```

Commit nooit `.env.local` of echte sleutels.

## Supabase Auth instellen

1. Maak een Supabase-project.
2. Koppel de repository:

```bash
npx supabase login
npx supabase link --project-ref JOUW_PROJECT_REF
npx supabase db push
```

3. Zet in **Authentication > Providers > Email** e-mail/wachtwoord en e-mailbevestiging aan.
4. Configureer in **Authentication > SMTP Settings** een echte SMTP-provider. Gebruik voor productie niet de beperkte standaardmailer.
5. Stel in **Authentication > URL Configuration** de Site URL en redirects in:

```text
http://localhost:3000/auth/callback
https://jouw-staging-domein.nl/auth/callback
https://jouw-productiedomein.nl/auth/callback
```

6. Controleer dat de migrations de privébucket `avatars` hebben aangemaakt.
7. Registreer eerst normaal een account. Maak dit account daarna eenmalig admin via de Supabase SQL Editor:

```sql
insert into public.user_roles(user_id, role)
select id, 'admin'::public.user_role
from public.users
where email = 'jouw-email@example.com'
on conflict (user_id, role) where revoked_at is null do nothing;
```

De roltrigger werkt daarna automatisch `users.is_admin` en de samenvattende rol bij.

## Controles

```bash
npm test
npm run typecheck
npm run build
```

Met Docker:

```bash
npm run supabase:reset
npx supabase test db
```

## Netlify

`netlify.toml` bouwt nu de Next.js-app vanuit de repositoryroot:

```text
Build command: npm run build
Publish directory: .next
Node.js: 22
```

Netlify detecteert Next.js automatisch en zet SSR, API-routes en middleware om naar de juiste runtime. Voeg alle environmentvariabelen uit `.env.example` toe in **Site configuration > Environment variables**.

Lees [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) voor de volledige staging- en productieroute en [docs/AI_WORKFLOW.md](docs/AI_WORKFLOW.md) voor latere AI-aanpassingen.
