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
- `src/lib`: auth, database, listings, payments
- `prisma/schema.prisma`: database structuur
- `prisma/seed.ts`: voorbeelddata

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
4. PostgreSQL database koppelen.
5. Login en accounts server-side maken.
6. Huizen toevoegen server-side maken.
7. Boekingen server-side maken.
8. Berichten server-side maken.
9. Foto-upload koppelen.
10. Stripe toevoegen.

## Belangrijk

Vraag AI na elke grotere wijziging om:

- te testen
- responsive gedrag te checken
- vertaling mee te nemen
- geen bestaande flow stuk te maken

