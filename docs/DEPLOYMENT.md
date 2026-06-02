# Nordic Boat Stays online zetten

Dit project heeft twee routes:

1. **Snelle online demo**: publiceer de statische site in `website/`.
2. **Echte boekingssite**: bouw door op de Next.js-app in `src/` met Prisma, PostgreSQL, echte login, uploads en betalingen.

## Route 1: snelste online demo met Netlify

Deze route zet de huidige visuele site online zoals je hem nu in de browser ziet.

Wat werkt:

- homepage, zoeken, detailpagina, verhuurderspagina, berichten, favorieten en vertalen
- demo-login en demo-data in de browser
- publicatie-preview voor nieuwe huizen

Wat nog demo blijft:

- accounts worden lokaal in de browser bewaard
- toegevoegde huizen zijn niet gedeeld met andere bezoekers
- betalingen zijn mock
- foto-upload is browser-local en nog geen echte serveropslag

### Stappen

1. Zet dit project in een GitHub repository.
2. Ga naar Netlify.
3. Kies **Add new site** > **Import an existing project**.
4. Koppel je GitHub repository.
5. Netlify leest automatisch `netlify.toml`.
6. Controleer deze instellingen:

```txt
Build command: leeg
Publish directory: website
```

7. Klik **Deploy site**.

Daarna krijg je een publieke Netlify-link. Als je later een domein koopt, koppel je die in Netlify onder **Domain management**.

## Route 2: echte productieversie met Next.js

Deze route is nodig als echte gebruikers accounts, boekingen, berichten, betalingen en uploads moeten delen.

Aanbevolen setup:

- Hosting: Vercel of Netlify
- Database: Neon, Supabase of Railway PostgreSQL
- Auth: huidige backend-login uitbreiden of later NextAuth/Clerk
- Foto-opslag: Cloudinary, Supabase Storage of S3
- Payments: Stripe Checkout
- Vertalen: DeepL/Google Translate API of handmatige CMS-vertalingen

### Productiestappen

1. Zet `DATABASE_URL` en `AUTH_SECRET` in de hosting environment.
2. Draai database migrations:

```bash
npx prisma migrate deploy
```

3. Seed demo-data als dat nodig is:

```bash
npm run prisma:seed
```

4. Build de app:

```bash
npm run build
```

5. Start productie:

```bash
npm run start
```

## AI-aanpassingen blijven makkelijk

De handigste workflow:

1. Jij vraagt AI om een wijziging.
2. AI past lokaal de code aan.
3. We testen de site.
4. De wijziging gaat naar GitHub.
5. Netlify/Vercel maakt automatisch een nieuwe deploy.

Voor kleine visuele aanpassingen aan de demo werken we vooral in:

- `website/index.html`
- `website/search.html`
- `website/listing.html`
- `website/new-listing.html`
- `website/app.js`
- `website/styles.css`

Voor echte backend-functionaliteit werken we vooral in:

- `src/app`
- `src/components`
- `src/lib`
- `prisma/schema.prisma`
- `prisma/seed.ts`

## Belangrijke keuze

Gebruik de statische demo om snel publiek te tonen wat je bedoelt. Gebruik de Next.js-app zodra mensen echt moeten registreren, betalen, berichten sturen en huizen beheren met gedeelde data.

