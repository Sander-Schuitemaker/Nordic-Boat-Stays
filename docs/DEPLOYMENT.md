# Nordic Boat Stays deployen

## Twee gescheiden sites

Gebruik voorlopig twee Netlify-sites:

1. **Publieke demo**: bouwt `website/` via de bestaande `netlify.toml`.
2. **Productie-app staging**: bouwt de Next.js-app vanuit de repositoryroot.

Zo blijft de zichtbare demo beschikbaar terwijl accounts, database en betalingen worden getest.

## Publieke demo

De huidige Netlify-site gebruikt:

```txt
Base directory: website
Build command: echo 'Deploying static Nordic Boat Stays demo'
Publish directory: .
```

Laat op deze site voorlopig ook staan:

```txt
NETLIFY_NEXT_PLUGIN_SKIP=true
```

Deze site bevat browserdata en is geen echte boekingsbackend.

## Aparte Next.js-staging

Maak pas een tweede Netlify-site wanneer er een Supabase-stagingproject en Stripe-testsleutels zijn.

De staging-build gebruikt:

```txt
Base directory: leeg
Build command: npm run build
Publish directory: .next
Node.js: 22
```

Netlify detecteert Next.js en installeert de Next-runtime automatisch. SSR, API-routes en `middleware.ts` worden door die runtime vertaald.

Omdat de huidige root-`netlify.toml` bewust naar `website/` wijst, moet de staging-site een aparte stagingbranch of een eigen Netlify-configuratie krijgen voordat deze wordt gekoppeld. Verwijder de demo-instellingen pas bij de definitieve omschakeling.

## Vereiste stagingvariabelen

Publiek:

```txt
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Server-only:

```txt
SUPABASE_SECRET_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_CONNECT_WEBHOOK_SECRET
STRIPE_API_VERSION
DATABASE_URL
```

Gebruik in staging alleen Supabase-staginggegevens en Stripe `sk_test_...` sleutels. De secret key en webhook secrets mogen nooit in GitHub of een `NEXT_PUBLIC_` variabele staan.

## Supabase klaarzetten

Lokaal:

```bash
npx supabase start
npm run supabase:reset
npm run supabase:types
```

Voor het gehoste stagingproject:

```bash
npx supabase login
npx supabase link --project-ref JOUW_PROJECT_REF
npx supabase db push
npx supabase gen types typescript --linked > src/lib/database.types.ts
```

Controleer daarna in Supabase:

- e-mailbevestiging staat aan;
- de juiste Site URL en redirect URLs zijn ingesteld;
- gelekte wachtwoordcontrole en rate limits staan aan;
- `listing-images` en `private-documents` bestaan;
- RLS staat aan op alle publieke tabellen.

## Stripe klaarzetten

Gebruik Stripe testmodus:

1. Activeer Connect voor het platform.
2. Maak platform- en Connect-webhookendpoints.
3. Gebruik dezelfde API-versie als `STRIPE_API_VERSION`.
4. Zet webhook secrets apart in Netlify.
5. Gebruik nooit live sleutels voordat checkout, refunds, payouts en geschillen end-to-end zijn getest.

De huidige fase maakt Accounts v2-hostonboarding mogelijk. Checkout, refunds en transfers geven bewust een gecontroleerde fout totdat de webhookgestuurde betaalflow is geïmplementeerd.

## Voor iedere deploy

```bash
npm test
npm run typecheck
npm run build
```

Met Docker:

```bash
npm run supabase:reset
```

Promoveer staging pas naar productie nadat ook iDEAL, kaartbetalingen, dubbele webhooks, refunds, payout failures en dubbele boekingspogingen zijn getest.
