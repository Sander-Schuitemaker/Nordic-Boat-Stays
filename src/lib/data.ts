import type { Booking, Listing, Region } from "@/lib/types";

export const regions: Region[] = [
  {
    id: "lofoten",
    name: "Lofoten",
    slug: "lofoten",
    description: "Dramatische bergen, vissersdorpen en middernachtzon boven helder water.",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "bergen",
    name: "Bergen",
    slug: "bergen",
    description: "Fjordstad met houten kades, eilandroutes en toegang tot Hardangerfjord.",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "stavanger",
    name: "Stavanger",
    slug: "stavanger",
    description: "Zachte kust, diepe fjorden en boottochten richting Lysefjord.",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "tromso",
    name: "Tromsø",
    slug: "tromso",
    description: "Arctische natuur, walviswateren en noorderlicht vanaf de steiger.",
    imageUrl: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "oslofjord",
    name: "Oslofjord",
    slug: "oslofjord",
    description: "Eilanden, rustige baaien en stijlvolle huizen dicht bij Oslo.",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "geirangerfjord",
    name: "Geirangerfjord",
    slug: "geirangerfjord",
    description: "UNESCO-landschap met watervallen, steile bergwanden en stille inhammen.",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
  }
];

const imageSet = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
];

export const listings: Listing[] = [
  ["lofoten-hamnoy-rorbu", "Rorbu aan de baai van Hamnøy", "Hamnøy", "Lofoten", 67.945, 13.132, 390, 6, 3, "rib", 6, 115, true],
  ["lofoten-reine-pier", "Designhuis met eigen pier in Reine", "Reine", "Lofoten", 67.933, 13.089, 460, 8, 4, "vissersboot", 5, 75, false],
  ["bergen-austevoll-hideaway", "Eilandvilla bij Austevoll", "Austevoll", "Bergen", 60.095, 5.225, 340, 6, 3, "motorboot", 6, 90, false],
  ["bergen-hardanger-view", "Fjordlodge met Hardangerzicht", "Norheimsund", "Bergen", 60.371, 6.145, 310, 5, 2, "sloep", 5, 35, false],
  ["stavanger-lysefjord-cabin", "Luxe cabin aan de Lysefjord", "Forsand", "Stavanger", 58.904, 6.103, 420, 7, 3, "rib", 6, 150, true],
  ["stavanger-hafrsfjord-house", "Houten huis aan Hafrsfjord", "Stavanger", "Stavanger", 58.952, 5.642, 285, 4, 2, "motorboot", 4, 60, false],
  ["tromso-kvaloya-retreat", "Arctisch retreat op Kvaløya", "Kvaløya", "Tromsø", 69.702, 18.672, 510, 8, 4, "kajuitboot", 7, 130, true],
  ["tromso-ersfjord-cove", "Erfjord huis met noorderlichtdeck", "Ersfjordbotn", "Tromsø", 69.691, 18.626, 365, 5, 2, "vissersboot", 5, 70, false],
  ["geiranger-waterfall-lodge", "Watervallodge aan Geirangerfjord", "Geiranger", "Geirangerfjord", 62.101, 7.205, 475, 6, 3, "sloep", 5, 40, false],
  ["oslofjord-hvaler-villa", "Minimalistische villa op Hvaler", "Hvaler", "Oslofjord", 59.047, 11.042, 330, 6, 3, "motorboot", 6, 80, false],
  ["trondheim-hitra-seahouse", "Seahouse bij Hitra met visboot", "Hitra", "Trondheim", 63.601, 8.971, 295, 7, 3, "vissersboot", 6, 65, false],
  ["alesund-giske-boathouse", "Boathouse suite op Giske", "Giske", "Ålesund", 62.501, 6.073, 355, 4, 2, "rib", 5, 100, true]
].map((row, index) => {
  const [slug, title, city, region, latitude, longitude, pricePerNight, maxGuests, bedrooms, type, capacity, enginePowerHp, licenseRequired] = row as [
    string,
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    number,
    Listing["boat"]["type"],
    number,
    number,
    boolean
  ];

  return {
    id: `listing-${index + 1}`,
    slug,
    title,
    city,
    region,
    address: `${city}, Noorwegen`,
    description:
      "Een rustig vakantiehuis met groot uitzicht over fjord en water. De huur is inclusief boot, basisinstructie en veiligheidsuitrusting. Ideaal voor gezinnen en reizigers die Noorwegen vanaf het water willen beleven.",
    latitude,
    longitude,
    pricePerNight,
    maxGuests,
    bedrooms,
    bathrooms: bedrooms > 2 ? 2 : 1,
    rating: Number((4.65 + (index % 5) * 0.06).toFixed(2)),
    reviewCount: 18 + index * 4,
    popularity: 90 - index * 3,
    petsAllowed: index % 3 === 0,
    waterfront: true,
    privateDock: index % 2 === 0,
    saunaHotTub: index % 4 !== 1,
    amenities: ["Wifi", "Keuken", "Parkeren", "Beddengoed", index % 2 === 0 ? "Sauna" : "Hottub"],
    images: imageSet.map((image, imageIndex) => `${image}&sig=${index}-${imageIndex}`),
    boat: {
      type,
      capacity,
      enginePowerHp,
      licenseRequired,
      safetyIncluded: true,
      description: `${type} voor ${capacity} personen, klaargemaakt aan de steiger.`
    }
  };
});

export const bookings: Booking[] = [
  {
    id: "booking-1",
    listingId: "listing-1",
    listingTitle: "Rorbu aan de baai van Hamnøy",
    guestName: "Eva de Vries",
    checkIn: "2026-06-12",
    checkOut: "2026-06-19",
    guests: 4,
    status: "pending",
    totalPrice: 2730
  },
  {
    id: "booking-2",
    listingId: "listing-7",
    listingTitle: "Arctisch retreat op Kvaløya",
    guestName: "Milan Jansen",
    checkIn: "2026-07-03",
    checkOut: "2026-07-10",
    guests: 6,
    status: "accepted",
    totalPrice: 3570
  }
];
