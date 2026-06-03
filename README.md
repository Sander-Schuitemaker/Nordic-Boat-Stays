# Nordic Boat Stays

MVP voor een vakantiehuis-verhuurplatform in Noorwegen waarbij elk vakantiehuis een boot inbegrepen heeft.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui-achtige lokale componenten
- Prisma
- PostgreSQL
- Leaflet / React Leaflet
- Zod-validatie
- Backend-login met HTTP-only sessiecookie
- Mock-payments

## Installatie

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Open daarna `http://localhost:3000`.

## Snel online zetten

Voor een snelle publieke demo kun je de huidige statische site in `website/` deployen met Netlify. De root bevat hiervoor `netlify.toml`; Netlify gebruikt `website/` als base directory en publiceert daaruit de statische bestanden.

Lees de volledige uitleg in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
Voor blijven aanpassen met AI staat er een aparte werkwijze in [`docs/AI_WORKFLOW.md`](docs/AI_WORKFLOW.md).

## Database

Zet `DATABASE_URL` in `.env` naar je PostgreSQL database:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nordic_boat_stays?schema=public"
AUTH_SECRET="change-me-to-a-long-random-production-secret"
```

De seed voegt minimaal 12 huizen toe in onder andere Lofoten, Bergen, Stavanger, Tromsø, Geirangerfjord, Oslofjord, Trondheim en Ålesund. Elk huis heeft coördinaten, prijs, foto-placeholder, bootinformatie, amenities en rating.

Demo-login na seed:

- Verhuurder: `host@nordicboatstays.test` / `demo1234`
- Huurder: `gast@nordicboatstays.test` / `demo1234`

## Pagina's

- `/`
- `/search`
- `/listings/[id]`
- `/dashboard`
- `/dashboard/listings/new`
- `/dashboard/listings/[id]/edit`
- `/dashboard/bookings`
- `/login`
- `/messages`
- `/favorites`
- `/about`
- `/contact`

## Uitbreiding

- `src/lib/auth.ts` gebruikt nu gehashte wachtwoorden, Prisma users en een signed HTTP-only cookie. NextAuth of Clerk kan later alsnog.
- Vervang `src/lib/payment-service.ts` door Stripe Checkout of PaymentIntents.
- Breid berichten uit met threaded replies en read receipts.
- De statische prototype-site in `website/` heeft een taalwisselaar voor Nederlands, Noors, Zweeds, Deens, Duits, Engels, Spaans en Frans. Nieuwe verhuurdershuizen bewaren `sourceLanguage` plus vertaalvelden per taal; in productie kan dezelfde laag worden aangesloten op DeepL, Google Translate of een eigen vertaalservice.
