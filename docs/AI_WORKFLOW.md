# AI-workflow voor Nordic Boat Stays

Gebruik deze werkwijze als je de website online hebt staan en daarna makkelijk dingen met AI wilt aanpassen.

## Basis

1. De code staat in GitHub.
2. Netlify of Vercel is gekoppeld aan die GitHub repository.
3. Elke wijziging die naar GitHub gaat, krijgt automatisch een nieuwe deploy.
4. AI kan lokaal aanpassingen doen, testen en daarna kun je die wijziging pushen.

## Simpele aanpassingen aan de huidige demo

Voor visuele wijzigingen aan de demo:

- `website/index.html`: homepage
- `website/search.html`: zoekpagina
- `website/listing.html`: huisdetail
- `website/new-listing.html`: verhuurdersformulier
- `website/app.js`: interactie, filters, kaart, vertaling, login-demo
- `website/styles.css`: styling

Voorbeelden van goede AI-opdrachten:

- “Maak de zoekbalk op mobiel compacter.”
- “Voeg een filter toe voor elektrische boot.”
- “Maak de verhuurderspreview professioneler.”
- “Vertaal deze knop ook naar Duits en Noors.”
- “Zorg dat favorieten beter zichtbaar zijn.”

## Aanpassingen aan de echte backend-versie

Voor echte online functionaliteit met gedeelde data:

- `src/app`: pagina's en routes
- `src/components`: herbruikbare UI
- `src/lib`: auth, database, listings en payments
- `supabase/migrations`: database, boekingsregels en RLS
- `supabase/seed.sql`: vaste platforminstellingen en voorzieningen
- `prisma/`: alleen tijdelijke compatibiliteit tijdens de listingmigratie

Voorbeelden van goede AI-opdrachten:

- “Zet de statische zoekpagina om naar de Next.js zoekpagina.”
- “Maak favorieten server-side met Prisma.”
- “Voeg Stripe Checkout toe.”
- “Maak foto-upload met Cloudinary.”
- “Zorg dat verhuurders hun eigen huizen kunnen beheren.”

## Aanbevolen volgorde naar echte productie

1. Demo online zetten via Netlify.
2. GitHub repository koppelen.
3. Design uit `website/` stap voor stap overzetten naar `src/`.
4. Supabase staging koppelen en migrations testen.
5. Listing- en zoekdata naar Supabase migreren.
6. Stripe Checkout en webhooks activeren.
7. Berichten en favorieten naar Supabase migreren.
8. Foto-upload via Supabase Storage activeren.
9. Hostpayouts, refunds en geschillen testen.
10. De Next.js-staging gecontroleerd promoveren.

## Belangrijk

Vraag AI na elke grotere wijziging om:

- te testen
- responsive gedrag te checken
- vertaling mee te nemen
- geen bestaande flow stuk te maken
