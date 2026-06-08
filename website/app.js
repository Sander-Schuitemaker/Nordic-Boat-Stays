const listings = [
  {
    id: "lofoten-hamnoy",
    title: "Rorbu aan de baai van Hamnoy",
    city: "Hamnoy",
    region: "Lofoten",
    lat: 67.945,
    lng: 13.132,
    price: 390,
    guests: 6,
    bedrooms: 3,
    waterfront: true,
    dock: true,
    sauna: true,
    pets: false,
    rating: 4.71,
    boat: "RIB",
    booked: [
      { start: "2026-06-12", end: "2026-06-19", guest: "Eva de Vries", status: "pending" },
      { start: "2026-07-08", end: "2026-07-14", guest: "Familie Bakker", status: "accepted" }
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cabins%20%28Unsplash%29.jpg?width=1200",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cabins%20%28Unsplash%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lofoten%2C%20Norway%20%28Unsplash%20dVV1h3odR9s%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ersfjorden%2C%20Norway%20%28Unsplash%29.jpg?width=900"
    ],
    description: "Rustig vakantiehuis met groot fjordzicht, eigen steiger en een sportieve RIB voor dagtochten."
  },
  {
    id: "tromso-kvaloya",
    title: "Arctisch retreat op Kvaloya",
    city: "Kvaloya",
    region: "Tromso",
    lat: 69.702,
    lng: 18.672,
    price: 510,
    guests: 8,
    bedrooms: 4,
    waterfront: true,
    dock: true,
    sauna: true,
    pets: false,
    rating: 4.89,
    boat: "Kajuitboot",
    booked: [
      { start: "2026-07-03", end: "2026-07-10", guest: "Milan Jansen", status: "accepted" },
      { start: "2026-08-02", end: "2026-08-09", guest: "Nora Visser", status: "accepted" }
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Troms%C3%B8%2C%20Norway%20%28Unsplash%29.jpg?width=1200",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Troms%C3%B8%2C%20Norway%20%28Unsplash%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Troms%C3%B8%2C%20Norway%20%28Unsplash%20R3pUGn5YiTg%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ersfjorden%2C%20Norway%20%28Unsplash%29.jpg?width=900"
    ],
    description: "Arctische lodge met noorderlichtdeck, warme sauna en kajuitboot met veiligheidsuitrusting."
  },
  {
    id: "stavanger-lysefjord",
    title: "Luxe cabin aan de Lysefjord",
    city: "Forsand",
    region: "Stavanger",
    lat: 58.904,
    lng: 6.103,
    price: 420,
    guests: 7,
    bedrooms: 3,
    waterfront: true,
    dock: true,
    sauna: true,
    pets: true,
    rating: 4.83,
    boat: "Motorboot",
    booked: [
      { start: "2026-06-20", end: "2026-06-27", guest: "Lars Meijer", status: "accepted" }
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Picturesque%20fiord%20%28Unsplash%29.jpg?width=1200",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Picturesque%20fiord%20%28Unsplash%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Geirangerfjord%2C%20Norway%20%28Unsplash%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Oslofjord%2014.JPG?width=900"
    ],
    description: "Houten cabin aan rustig water met motorboot, hottub en korte vaarroutes richting Lysefjord."
  },
  {
    id: "bergen-austevoll",
    title: "Eilandvilla bij Austevoll",
    city: "Austevoll",
    region: "Bergen",
    lat: 60.095,
    lng: 5.225,
    price: 340,
    guests: 6,
    bedrooms: 3,
    waterfront: true,
    dock: true,
    sauna: false,
    pets: true,
    rating: 4.77,
    boat: "Motorboot",
    booked: [
      { start: "2026-07-15", end: "2026-07-22", guest: "Sophie Koster", status: "accepted" }
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bryggen%2C%20Bergen%2C%20Norway%20%28Unsplash%29.jpg?width=1200",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bryggen%2C%20Bergen%2C%20Norway%20%28Unsplash%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Picturesque%20fiord%20%28Unsplash%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Oslofjord%20%282%29.jpg?width=900"
    ],
    description: "Lichte eilandvilla vlak bij Bergen met aanlegplaats en comfortabele motorboot."
  },
  {
    id: "geiranger-waterfall",
    title: "Watervallodge aan Geirangerfjord",
    city: "Geiranger",
    region: "Geirangerfjord",
    lat: 62.101,
    lng: 7.205,
    price: 475,
    guests: 6,
    bedrooms: 3,
    waterfront: true,
    dock: false,
    sauna: true,
    pets: false,
    rating: 4.88,
    boat: "Sloep",
    booked: [
      { start: "2026-06-25", end: "2026-07-02", guest: "Tom de Lange", status: "accepted" }
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Geirangerfjord%2C%20Norway%20%28Unsplash%29.jpg?width=1200",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Geirangerfjord%2C%20Norway%20%28Unsplash%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Picturesque%20fiord%20%28Unsplash%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lofoten%2C%20Norway%20%28Unsplash%20dVV1h3odR9s%29.jpg?width=900"
    ],
    description: "Lodge aan UNESCO-water met stille sloep, bergzicht en watervallen rondom."
  },
  {
    id: "oslofjord-hvaler",
    title: "Minimalistische villa op Hvaler",
    city: "Hvaler",
    region: "Oslofjord",
    lat: 59.047,
    lng: 11.042,
    price: 330,
    guests: 6,
    bedrooms: 3,
    waterfront: true,
    dock: true,
    sauna: false,
    pets: true,
    rating: 4.74,
    boat: "Vissersboot",
    booked: [
      { start: "2026-08-10", end: "2026-08-17", guest: "Iris Mulder", status: "accepted" }
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Oslofjord%20%282%29.jpg?width=1200",
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Oslofjord%20%282%29.jpg?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Oslofjord%2014.JPG?width=900",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bryggen%2C%20Bergen%2C%20Norway%20%28Unsplash%29.jpg?width=900"
    ],
    description: "Scandinavische villa in de Oslofjord met vissersboot, zwemtrap en eilandroutes."
  }
];

const conversations = [
  {
    id: "conv-eva",
    guest: "Eva de Vries",
    guestEmail: "eva@example.com",
    hostEmail: "host@nordicboatstays.test",
    listingId: "lofoten-hamnoy",
    stay: "12 juni - 19 juni",
    status: "pending",
    messages: [
      { from: "guest", text: "Hallo, is de RIB geschikt voor een rustige tocht met twee kinderen?", time: "09:12" },
      { from: "host", text: "Ja, bij rustig weer zeker. We geven bij aankomst uitleg en zwemvesten liggen klaar.", time: "09:26" },
      { from: "guest", text: "Top. Kunnen we ook dicht bij de steiger parkeren?", time: "09:31" }
    ]
  },
  {
    id: "conv-milan",
    guest: "Milan Jansen",
    guestEmail: "milan@example.com",
    hostEmail: "host@nordicboatstays.test",
    listingId: "tromso-kvaloya",
    stay: "3 juli - 10 juli",
    status: "accepted",
    messages: [
      { from: "guest", text: "We komen rond 18:00 aan. Is dat nog goed voor de bootinstructie?", time: "14:04" },
      { from: "host", text: "Dat kan. Ik plan de instructie om 18:30 en stuur vooraf de veiligheidschecklist.", time: "14:20" }
    ]
  }
];

const demoUsers = [
  { name: "Demo Verhuurder", email: "host@nordicboatstays.test", password: "demo1234", role: "host" },
  { name: "Eva de Vries", email: "eva@example.com", password: "demo1234", role: "guest" },
  { name: "Milan Jansen", email: "milan@example.com", password: "demo1234", role: "guest" }
];

const norwayLocations = [
  { name: "Oslo", region: "Oslo", lat: 59.9139, lng: 10.7522, type: "Stad", zoom: 8, aliases: ["oslofjord"] },
  { name: "Bergen", region: "Vestland", lat: 60.3913, lng: 5.3221, type: "Stad", zoom: 8 },
  { name: "Stavanger", region: "Rogaland", lat: 58.9701, lng: 5.7333, type: "Stad", zoom: 8 },
  { name: "Trondheim", region: "Trondelag", lat: 63.4305, lng: 10.3951, type: "Stad", zoom: 8 },
  { name: "Tromso", region: "Troms", lat: 69.6492, lng: 18.9553, type: "Stad", zoom: 8, aliases: ["tromsø"] },
  { name: "Alesund", region: "More og Romsdal", lat: 62.4722, lng: 6.1495, type: "Stad", zoom: 8, aliases: ["ålesund"] },
  { name: "Kristiansand", region: "Agder", lat: 58.1599, lng: 8.0182, type: "Stad", zoom: 8 },
  { name: "Bodo", region: "Nordland", lat: 67.2804, lng: 14.4049, type: "Stad", zoom: 8, aliases: ["bodø"] },
  { name: "Narvik", region: "Nordland", lat: 68.4384, lng: 17.4272, type: "Stad", zoom: 8 },
  { name: "Alta", region: "Finnmark", lat: 69.9689, lng: 23.2716, type: "Stad", zoom: 8 },
  { name: "Hammerfest", region: "Finnmark", lat: 70.6634, lng: 23.6821, type: "Stad", zoom: 8 },
  { name: "Kirkenes", region: "Finnmark", lat: 69.7271, lng: 30.0458, type: "Stad", zoom: 8 },
  { name: "Molde", region: "More og Romsdal", lat: 62.7375, lng: 7.1591, type: "Stad", zoom: 8 },
  { name: "Kristiansund", region: "More og Romsdal", lat: 63.1103, lng: 7.7281, type: "Stad", zoom: 8 },
  { name: "Haugesund", region: "Rogaland", lat: 59.4138, lng: 5.2680, type: "Stad", zoom: 8 },
  { name: "Arendal", region: "Agder", lat: 58.4615, lng: 8.7725, type: "Stad", zoom: 8 },
  { name: "Larvik", region: "Vestfold", lat: 59.0533, lng: 10.0352, type: "Stad", zoom: 8 },
  { name: "Tonsberg", region: "Vestfold", lat: 59.2675, lng: 10.4076, type: "Stad", zoom: 8, aliases: ["tønsberg"] },
  { name: "Fredrikstad", region: "Ostfold", lat: 59.2205, lng: 10.9347, type: "Stad", zoom: 8 },
  { name: "Hamar", region: "Innlandet", lat: 60.7945, lng: 11.0679, type: "Stad", zoom: 8 },
  { name: "Lillehammer", region: "Innlandet", lat: 61.1153, lng: 10.4662, type: "Stad", zoom: 8 },
  { name: "Geilo", region: "Buskerud", lat: 60.5337, lng: 8.2076, type: "Plaats", zoom: 8 },
  { name: "Flam", region: "Vestland", lat: 60.8613, lng: 7.1136, type: "Plaats", zoom: 9, aliases: ["flåm"] },
  { name: "Aurland", region: "Vestland", lat: 60.9058, lng: 7.1870, type: "Plaats", zoom: 9 },
  { name: "Voss", region: "Vestland", lat: 60.6297, lng: 6.4147, type: "Plaats", zoom: 9 },
  { name: "Odda", region: "Vestland", lat: 60.0691, lng: 6.5457, type: "Plaats", zoom: 9 },
  { name: "Hardangerfjord", region: "Vestland", lat: 60.2797, lng: 6.2525, type: "Fjord", zoom: 8 },
  { name: "Sognefjord", region: "Vestland", lat: 61.1039, lng: 6.9128, type: "Fjord", zoom: 8 },
  { name: "Geirangerfjord", region: "More og Romsdal", lat: 62.1015, lng: 7.0941, type: "Fjord", zoom: 9 },
  { name: "Lysefjord", region: "Rogaland", lat: 58.9710, lng: 6.1390, type: "Fjord", zoom: 9 },
  { name: "Lofoten", region: "Nordland", lat: 68.2083, lng: 13.8457, type: "Regio", zoom: 7 },
  { name: "Hamnoy", region: "Lofoten", lat: 67.9450, lng: 13.1320, type: "Plaats", zoom: 10, aliases: ["hamnøy"] },
  { name: "Reine", region: "Lofoten", lat: 67.9325, lng: 13.0896, type: "Plaats", zoom: 10 },
  { name: "Svolvaer", region: "Lofoten", lat: 68.2342, lng: 14.5683, type: "Plaats", zoom: 9, aliases: ["svolvær"] },
  { name: "Senja", region: "Troms", lat: 69.2766, lng: 17.3469, type: "Eiland", zoom: 8 },
  { name: "Kvaloya", region: "Troms", lat: 69.7000, lng: 18.6900, type: "Eiland", zoom: 9, aliases: ["kvaløya"] },
  { name: "Andenes", region: "Nordland", lat: 69.3143, lng: 16.1194, type: "Plaats", zoom: 8 },
  { name: "Harstad", region: "Troms", lat: 68.7990, lng: 16.5415, type: "Stad", zoom: 8 },
  { name: "Mo i Rana", region: "Nordland", lat: 66.3128, lng: 14.1428, type: "Stad", zoom: 8 },
  { name: "Namsos", region: "Trondelag", lat: 64.4662, lng: 11.4957, type: "Stad", zoom: 8 },
  { name: "Roros", region: "Trondelag", lat: 62.5747, lng: 11.3842, type: "Plaats", zoom: 8, aliases: ["røros"] },
  { name: "Dombas", region: "Innlandet", lat: 62.0754, lng: 9.1276, type: "Plaats", zoom: 8, aliases: ["dombås"] },
  { name: "Andalsnes", region: "More og Romsdal", lat: 62.5673, lng: 7.6871, type: "Plaats", zoom: 9, aliases: ["åndalsnes"] },
  { name: "Stryn", region: "Vestland", lat: 61.9045, lng: 6.7218, type: "Plaats", zoom: 9 },
  { name: "Loen", region: "Vestland", lat: 61.8710, lng: 6.8447, type: "Plaats", zoom: 10 },
  { name: "Balestrand", region: "Vestland", lat: 61.2097, lng: 6.5356, type: "Plaats", zoom: 9 },
  { name: "Skjolden", region: "Vestland", lat: 61.4930, lng: 7.6003, type: "Plaats", zoom: 9 },
  { name: "Hvaler", region: "Oslofjord", lat: 59.0470, lng: 11.0420, type: "Eiland", zoom: 9 },
  { name: "Austevoll", region: "Vestland", lat: 60.0950, lng: 5.2250, type: "Eiland", zoom: 9 },
  { name: "Forsand", region: "Rogaland", lat: 58.9040, lng: 6.1030, type: "Plaats", zoom: 9 }
];

const norwayCounties = [
  { name: "Oslo", region: "Noorwegen", lat: 59.9139, lng: 10.7522, type: "Fylke", zoom: 8 },
  { name: "Rogaland", region: "Noorwegen", lat: 59.0400, lng: 5.9300, type: "Fylke", zoom: 7 },
  { name: "Møre og Romsdal", region: "Noorwegen", lat: 62.7500, lng: 7.3000, type: "Fylke", zoom: 7, aliases: ["more og romsdal"] },
  { name: "Nordland", region: "Noorwegen", lat: 67.2000, lng: 14.6000, type: "Fylke", zoom: 6 },
  { name: "Østfold", region: "Noorwegen", lat: 59.3000, lng: 11.1800, type: "Fylke", zoom: 8, aliases: ["ostfold"] },
  { name: "Akershus", region: "Noorwegen", lat: 60.0000, lng: 11.1500, type: "Fylke", zoom: 7 },
  { name: "Buskerud", region: "Noorwegen", lat: 60.3500, lng: 9.6000, type: "Fylke", zoom: 7 },
  { name: "Innlandet", region: "Noorwegen", lat: 61.5000, lng: 10.9000, type: "Fylke", zoom: 6 },
  { name: "Vestfold", region: "Noorwegen", lat: 59.2500, lng: 10.2200, type: "Fylke", zoom: 8 },
  { name: "Telemark", region: "Noorwegen", lat: 59.4000, lng: 8.6000, type: "Fylke", zoom: 7 },
  { name: "Agder", region: "Noorwegen", lat: 58.5200, lng: 7.8000, type: "Fylke", zoom: 7 },
  { name: "Vestland", region: "Noorwegen", lat: 61.2000, lng: 6.1000, type: "Fylke", zoom: 6 },
  { name: "Trøndelag", region: "Noorwegen", lat: 63.8000, lng: 10.9000, type: "Fylke", zoom: 6, aliases: ["trondelag"] },
  { name: "Troms", region: "Noorwegen", lat: 69.3000, lng: 18.7000, type: "Fylke", zoom: 6 },
  { name: "Finnmark", region: "Noorwegen", lat: 70.2000, lng: 25.0000, type: "Fylke", zoom: 6 }
];

function readStore(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function localUsers() {
  return readStore("nordicBoatUsers");
}

function allUsers() {
  return [...demoUsers, ...localUsers()];
}

function localListings() {
  return readStore("nordicBoatListings");
}

function allListings(options = {}) {
  const items = [...listings, ...localListings()];
  return options.localized === false ? items : items.map((listing) => localizedListing(listing));
}

function favoriteIds() {
  const session = getSession();
  if (!session?.email) return [];
  return readStore(`nordicBoatFavorites:${session.email.toLowerCase()}`);
}

function isFavorite(id) {
  return favoriteIds().includes(id);
}

function favoriteButton(listing) {
  const active = isFavorite(listing.id);
  return `
    <button class="favorite-button ${active ? "is-active" : ""}" type="button" data-favorite-listing-id="${listing.id}" onclick="toggleFavorite(event, '${listing.id}')" aria-label="${active ? "Verwijder uit favorieten" : "Bewaar als favoriet"}" aria-pressed="${active}">
      <span data-favorite-symbol>${active ? "♥" : "♡"}</span>
    </button>
  `;
}

function toggleFavorite(event, id) {
  event?.preventDefault();
  event?.stopPropagation();
  const session = getSession();
  if (!session?.email) {
    localStorage.setItem("nordicBoatRedirectAfterLogin", `${window.location.pathname.split("/").pop() || "index.html"}${window.location.search || ""}`);
    window.location.href = `login.html?next=${encodeURIComponent(localStorage.getItem("nordicBoatRedirectAfterLogin"))}`;
    return;
  }
  const current = favoriteIds();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  writeStore(`nordicBoatFavorites:${session.email.toLowerCase()}`, next);
  renderFavoriteButtons();
  renderFavoritesPage();
}

function renderFavoriteButtons() {
  const session = getSession();
  document.querySelectorAll("[data-favorite-listing-id]").forEach((button) => {
    const active = isFavorite(button.dataset.favoriteListingId);
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", session ? (active ? "Verwijder uit favorieten" : "Bewaar als favoriet") : "Log in om favorieten te bewaren");
    const label = button.querySelector("[data-favorite-label]");
    const symbol = button.querySelector("[data-favorite-symbol]");
    if (label) label.textContent = active ? "Bewaard" : "Bewaren";
    if (symbol) symbol.textContent = active ? "♥" : "♡";
  });
}

function normaliseLocationText(value = "") {
  return value
    .toLowerCase()
    .replaceAll("ø", "o")
    .replaceAll("æ", "ae")
    .replaceAll("å", "a")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function locationSearchTerms(value = "") {
  const raw = value.trim();
  const normalized = normaliseLocationText(raw);
  return [...new Set([raw, normalized].filter((term) => term.length >= 2))];
}

function levenshteinDistance(a = "", b = "", max = 2) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 0; i < a.length; i += 1) {
    const current = [i + 1];
    let rowMin = current[0];
    for (let j = 0; j < b.length; j += 1) {
      const insert = current[j] + 1;
      const remove = previous[j + 1] + 1;
      const replace = previous[j] + (a[i] === b[j] ? 0 : 1);
      current[j + 1] = Math.min(insert, remove, replace);
      rowMin = Math.min(rowMin, current[j + 1]);
    }
    if (rowMin > max) return max + 1;
    previous = current;
  }
  return previous[b.length];
}

function fuzzyLocationMatch(candidate = "", query = "") {
  if (!candidate || !query) return false;
  if (candidate.includes(query)) return true;
  return candidate
    .split(/[\s-]+/)
    .some((part) => part.length >= 3 && levenshteinDistance(part.slice(0, Math.max(query.length, 3)), query, 2) <= 2);
}

function isCountyLocation(location) {
  return normaliseLocationText(location.type).includes("fylke");
}

function locationSuggestionScore(location, query = "") {
  const normalizedQuery = normaliseLocationText(query);
  const name = normaliseLocationText(location.name);
  const region = normaliseLocationText(location.region);
  const aliases = (location.aliases || []).map(normaliseLocationText);
  const aliasMatch = aliases.some((alias) => alias.startsWith(normalizedQuery));
  const typoDistance = normalizedQuery
    ? Math.min(levenshteinDistance(name, normalizedQuery, 3), ...name.split(/[\s-]+/).map((part) => levenshteinDistance(part, normalizedQuery, 3)))
    : 0;
  let score = !normalizedQuery ? 0 : name.startsWith(normalizedQuery) ? 0 : aliasMatch ? 1 : region.startsWith(normalizedQuery) ? 2 : name.includes(normalizedQuery) ? 3 : 5 + typoDistance;
  if (isCountyLocation(location) && (name.startsWith(normalizedQuery) || name.includes(normalizedQuery) || aliasMatch)) {
    score -= 6;
  }
  return score;
}

function allNorwayLocations() {
  const listingLocations = allListings().flatMap((listing) => [
    { name: listing.city, region: listing.region, lat: listing.lat, lng: listing.lng, type: "Plaats", zoom: 9 },
    { name: listing.region, region: "Noorwegen", lat: listing.lat, lng: listing.lng, type: "Regio", zoom: 8 }
  ]);
  const seen = new Set();
  return [...norwayCounties, ...norwayLocations, ...listingLocations].filter((location) => {
    const key = normaliseLocationText(location.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function resolveNorwayLocation(value = "") {
  const query = normaliseLocationText(value);
  if (!query) return null;
  const locations = allNorwayLocations();
  return locations.find((location) => normaliseLocationText(location.name) === query)
    || locations.find((location) => (location.aliases || []).some((alias) => normaliseLocationText(alias) === query))
    || locations.find((location) => `${normaliseLocationText(location.name)} ${normaliseLocationText(location.region)}`.includes(query))
    || null;
}

function locationSuggestions(value = "", limit = 8) {
  const query = normaliseLocationText(value);
  const popular = ["Lofoten", "Vestland", "Nordland", "Rogaland", "Bergen", "Stavanger", "Tromso", "Alesund"];
  const locations = allNorwayLocations();
  const candidates = query
    ? locations.filter((location) => {
      const haystack = [
        location.name,
        location.region,
        location.type,
        ...(location.aliases || [])
      ].map(normaliseLocationText).join(" ");
      return fuzzyLocationMatch(haystack, query);
    })
    : popular.map((name) => locations.find((location) => location.name === name)).filter(Boolean);
  return candidates
    .map((location) => {
      return { ...location, score: locationSuggestionScore(location, query) };
    })
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name, "nl"))
    .slice(0, limit);
}

function mergeLocationSuggestions(primary = [], fallback = [], limit = 10, query = "") {
  const seen = new Set();
  return [...primary, ...fallback].filter((location) => {
    const key = `${normaliseLocationText(location.name)}-${normaliseLocationText(location.region)}-${normaliseLocationText(location.type)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  })
    .map((location) => ({ ...location, score: locationSuggestionScore(location, query) }))
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name, "nl"))
    .slice(0, limit);
}

function locationZoomForType(type = "") {
  const normalized = normaliseLocationText(type);
  if (normalized.includes("fylke")) return 6;
  if (normalized.includes("kommune")) return 7;
  if (normalized.includes("by") || normalized.includes("tettsted")) return 9;
  if (normalized.includes("gard") || normalized.includes("bruk") || normalized.includes("grend")) return 10;
  return 9;
}

function mapKartverketLocation(item) {
  const name = item.stedsnavn?.find((entry) => entry.navnestatus === "hovednavn")?.skrivemåte
    || item.stedsnavn?.[0]?.skrivemåte
    || "";
  const lat = Number(item.representasjonspunkt?.nord);
  const lng = Number(item.representasjonspunkt?.øst);
  if (!name || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const municipality = item.kommuner?.[0]?.kommunenavn || "";
  const county = item.fylker?.[0]?.fylkesnavn || "";
  return {
    name,
    region: municipality || county || "Noorwegen",
    lat,
    lng,
    type: item.navneobjekttype || "Plaats",
    zoom: locationZoomForType(item.navneobjekttype),
    source: "Kartverket"
  };
}

function titleCaseNorway(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/(^|[\s-])(\p{L})/gu, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
}

function mapKartverketAddress(item) {
  const point = item.representasjonspunkt || {};
  const lat = Number(point.lat ?? point.nord);
  const lng = Number(point.lon ?? point.lng ?? point.øst ?? point.ost);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const label = item.adressetekst
    || item.adressetekstutenadressetilleggsnavn
    || [item.adressenavn, item.nummer, item.bokstav].filter(Boolean).join(" ");
  if (!label) return null;
  const city = titleCaseNorway(item.poststed || item.kommunenavn || "");
  const region = titleCaseNorway(item.fylkesnavn || item.kommunenavn || "Noorwegen");
  return {
    name: label,
    address: label,
    city: city || region,
    region,
    lat,
    lng,
    type: "Adres",
    source: "Kartverket"
  };
}

async function fetchKartverketLocations(value = "", limit = 16) {
  const query = value.trim();
  if (query.length < 2 || !window.fetch) return [];
  const requests = locationSearchTerms(query).flatMap((term) => [
    { term: `${term}*`, fuzzy: "false" },
    { term, fuzzy: "true" }
  ]);
  try {
    const responses = await Promise.all(requests.map(async ({ term, fuzzy }) => {
      const endpoint = new URL("https://api.kartverket.no/stedsnavn/v1/sted");
      endpoint.searchParams.set("sok", term);
      endpoint.searchParams.set("treffPerSide", "30");
      endpoint.searchParams.set("utkoordsys", "4258");
      endpoint.searchParams.set("fuzzy", fuzzy);
      const response = await fetch(endpoint.toString(), { headers: { Accept: "application/json" } });
      return response.ok ? response.json() : { navn: [] };
    }));
    return mergeLocationSuggestions(
      responses.flatMap((data) => data.navn || [])
        .filter((item) => item.stedstatus !== "relikt")
        .map(mapKartverketLocation)
        .filter(Boolean),
      [],
      limit,
      query
    );
  } catch {
    return [];
  }
}

async function fetchKartverketAddresses(value = "", limit = 10) {
  const query = value.trim();
  if (query.length < 3 || !window.fetch) return [];
  try {
    const endpoint = new URL("https://ws.geonorge.no/adresser/v1/sok");
    endpoint.searchParams.set("sok", query);
    endpoint.searchParams.set("treffPerSide", String(Math.max(limit, 12)));
    endpoint.searchParams.set("utkoordsys", "4258");
    endpoint.searchParams.set("asciiKompatibel", "true");
    const response = await fetch(endpoint.toString(), { headers: { Accept: "application/json" } });
    if (!response.ok) return [];
    const data = await response.json();
    const seen = new Set();
    return (data.adresser || [])
      .map(mapKartverketAddress)
      .filter(Boolean)
      .filter((address) => {
        const key = `${normaliseLocationText(address.address)}-${address.lat}-${address.lng}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, limit);
  } catch {
    return [];
  }
}

function localBookings() {
  return readStore("nordicBoatBookings");
}

function bookingOverrides() {
  return readStore("nordicBoatBookingOverrides", {});
}

function writeBookingOverrides(overrides) {
  writeStore("nordicBoatBookingOverrides", overrides);
}

function localPayments() {
  return readStore("nordicBoatPayments");
}

function localConversations() {
  return readStore("nordicBoatConversations");
}

function allConversations() {
  return [...conversations, ...localConversations()];
}

function readConversationState(session = getSession()) {
  if (!session?.email) return {};
  return readStore(`nordicBoatReadConversations:${session.email.toLowerCase()}`, {});
}

function writeConversationState(state, session = getSession()) {
  if (!session?.email) return;
  writeStore(`nordicBoatReadConversations:${session.email.toLowerCase()}`, state);
}

function isIncomingConversation(conversation, session = getSession()) {
  const lastMessage = conversation.messages.at(-1);
  if (!session || !lastMessage) return false;
  if (conversation.hostEmail === session.email) return lastMessage.from === "guest";
  if (conversation.guestEmail === session.email) return lastMessage.from === "host";
  return false;
}

function isConversationUnread(conversation, session = getSession()) {
  if (!isIncomingConversation(conversation, session)) return false;
  const readState = readConversationState(session);
  return Number(readState[conversation.id] || 0) < conversation.messages.length;
}

function markConversationRead(conversation, session = getSession()) {
  if (!session?.email || !conversation) return;
  const readState = readConversationState(session);
  writeConversationState({ ...readState, [conversation.id]: conversation.messages.length }, session);
}

function money(value) {
  return new Intl.NumberFormat(activeLocale(), { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

function activeLocale() {
  try {
    return languageOptions[currentLanguage()]?.locale || "nl-NL";
  } catch (error) {
    return "nl-NL";
  }
}

function monthKey(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return String(date.getMonth() + 1).padStart(2, "0");
}

function priceForListing(listing, value = searchState().checkin) {
  const basePrice = Number(listing.price) || 0;
  const dateValue = value || "";
  const seasonalRate = (listing.seasonalRates || []).find((rate) => (
    rate.start && rate.end && dateValue >= rate.start && dateValue < rate.end && Number(rate.price)
  ));
  if (seasonalRate) return Number(seasonalRate.price);
  const monthlyPrice = listing.monthlyPrices?.[monthKey(dateValue)];
  return Number(monthlyPrice) || basePrice;
}

function params() {
  return new URLSearchParams(window.location.search);
}

function overlaps(startA, endA, startB, endB) {
  if (!startA || !endA || !startB || !endB) return false;
  return new Date(startA) < new Date(endB) && new Date(endA) > new Date(startB);
}

function bookingKeyFor(listingId, period) {
  return [
    listingId,
    period.id || "",
    period.start || "",
    period.end || "",
    period.guestEmail || period.guest || ""
  ].join("|").toLowerCase();
}

function bookingStatusLabel(status = "pending") {
  const labels = {
    pending: "In aanvraag",
    accepted: "Bevestigd",
    rejected: "Afgewezen",
    cancelled: "Geannuleerd",
    completed: "Afgerond"
  };
  return labels[status] || status;
}

function applyBookingOverride(listing, period) {
  const key = bookingKeyFor(listing.id, period);
  const override = bookingOverrides()[key];
  return {
    ...period,
    status: override?.status || period.status || "pending",
    bookingKey: key
  };
}

function bookingsForListing(listing) {
  return [
    ...(listing.booked || []),
    ...localBookings().filter((booking) => booking.listingId === listing.id)
  ].map((period) => applyBookingOverride(listing, period));
}

function blockingBookingsForListing(listing) {
  return bookingsForListing(listing).filter((period) => !["rejected", "cancelled"].includes(period.status));
}

function sortedBookingsForListing(listing) {
  return bookingsForListing(listing)
    .filter((period) => period.start && period.end)
    .sort((a, b) => new Date(a.start) - new Date(b.start));
}

function nextBookingForListing(listing) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return blockingBookingsForListing(listing)
    .filter((period) => period.start && period.end)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .find((period) => new Date(period.end) >= today);
}

function availabilityFor(listing, state = searchState()) {
  if (!state.checkin || !state.checkout) {
    return { status: "unknown", label: "Kies data voor beschikbaarheid" };
  }
  const conflict = blockingBookingsForListing(listing).find((period) => overlaps(state.checkin, state.checkout, period.start, period.end));
  if (conflict) {
    return { status: "booked", label: `${bookingStatusLabel(conflict.status)} ${formatDate(conflict.start)} - ${formatDate(conflict.end)}`, conflict };
  }
  return { status: "available", label: "Beschikbaar voor deze data" };
}

function formatDate(value) {
  return new Intl.DateTimeFormat(activeLocale(), { day: "numeric", month: "short" }).format(new Date(value));
}

function calendarWeekdays() {
  const monday = new Date(2026, 5, 1);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return new Intl.DateTimeFormat(activeLocale(), { weekday: "short" }).format(date);
  });
}

const advancedFilterKeys = [
  "roomType", "propertyType", "beds", "bathrooms",
  "washer", "wifi", "tv", "airco", "heating", "hotTub", "kitchen", "dryer", "workspace", "hairdryer", "iron",
  "pool", "parking", "evCharger", "crib", "kingBed", "gym", "bbq", "breakfast", "fireplace", "smoking",
  "beach", "smokeDetector", "coDetector", "directBooking", "selfCheckin",
  "stepFreeAccess", "accessibleParking", "wideEntrance", "stepFreeBedroom", "wideBedroom",
  "stepFreeBathroom", "wideBathroom", "toiletGrabBars", "showerGrabBars", "stepFreeShower", "showerChair", "hoist"
];

const filterLabels = {
  roomType: "Type ruimte",
  propertyType: "Woningtype",
  beds: "Bedden",
  bathrooms: "Badkamers",
  washer: "Wasmachine",
  wifi: "Wifi",
  tv: "TV",
  airco: "Airconditioning",
  heating: "Verwarming",
  hotTub: "Bubbelbad",
  kitchen: "Keuken",
  dryer: "Droger",
  workspace: "Eigen werkplek",
  hairdryer: "Haardroger",
  iron: "Strijkijzer",
  pool: "Zwembad",
  parking: "Gratis parkeren",
  evCharger: "Oplaadpunt elektrische auto",
  crib: "Wiegje",
  kingBed: "Kingsize bed",
  gym: "Fitnessruimte",
  bbq: "Barbecue/grill",
  breakfast: "Ontbijt",
  fireplace: "Open haard",
  smoking: "Roken toegestaan",
  beach: "Aan het strand",
  smokeDetector: "Rookmelder",
  coDetector: "Koolmonoxidemelder",
  directBooking: "Direct boeken",
  selfCheckin: "Zelf inchecken",
  stepFreeAccess: "Toegang zonder drempel",
  accessibleParking: "Gehandicaptenparkeerplaats",
  wideEntrance: "Brede ingang",
  stepFreeBedroom: "Drempelvrije slaapkamer",
  wideBedroom: "Brede slaapkamerdeur",
  stepFreeBathroom: "Drempelvrije badkamer",
  wideBathroom: "Brede badkamerdeur",
  toiletGrabBars: "Handgrepen toilet",
  showerGrabBars: "Handgrepen douche",
  stepFreeShower: "Drempelvrije douche",
  showerChair: "Douche- of badstoel",
  hoist: "Tillift"
};

const sortLabels = {
  priceAsc: "Laagste prijs eerst",
  priceDesc: "Hoogste prijs eerst",
  rating: "Hoogste score eerst",
  popularity: "Populairst eerst"
};

const propertyTypeLabels = {
  house: "Woning",
  apartment: "Appartement",
  guesthouse: "Gastenverblijf",
  hotel: "Hotel"
};

function priceSliderLimits() {
  const prices = allListings().flatMap((listing) => [
    Number(listing.price),
    ...Object.values(listing.monthlyPrices || {}).map(Number),
    ...(listing.seasonalRates || []).map((rate) => Number(rate.price))
  ]).filter(Number.isFinite);
  const highest = prices.length ? Math.max(...prices) : 550;
  return {
    min: 50,
    max: Math.max(600, Math.ceil((highest + 50) / 50) * 50)
  };
}

function searchState() {
  const query = params();
  const minPrice = query.get("minPrice") || "";
  const maxPrice = query.get("maxPrice") || "";
  const priceLimits = priceSliderLimits();
  const state = {
    location: query.get("location") || "",
    locationLat: query.get("locationLat") || "",
    locationLng: query.get("locationLng") || "",
    locationType: query.get("locationType") || "",
    locationRegion: query.get("locationRegion") || "",
    locationZoom: query.get("locationZoom") || "",
    checkin: query.get("checkin") || "",
    checkout: query.get("checkout") || "",
    guests: query.get("guests") || "",
    bedrooms: query.get("bedrooms") || "",
    minPrice: minPrice && Number(minPrice) > priceLimits.min ? minPrice : "",
    maxPrice: maxPrice && Number(maxPrice) < priceLimits.max ? maxPrice : "",
    sort: query.get("sort") || "",
    waterfront: query.get("waterfront") || "",
    dock: query.get("dock") || "",
    sauna: query.get("sauna") || "",
    pets: query.get("pets") || ""
  };
  advancedFilterKeys.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(state, key)) state[key] = query.get(key) || "";
  });
  if (state.checkin && state.checkout && new Date(state.checkout) <= new Date(state.checkin)) {
    const next = new Date(state.checkin);
    next.setDate(next.getDate() + 7);
    state.checkout = next.toISOString().slice(0, 10);
    state.correctedDates = true;
  }
  return state;
}

function searchStateFromForm(form) {
  const state = searchState();
  Object.keys(state).forEach((key) => {
    state[key] = "";
  });
  state.correctedDates = false;
  if (!form) return state;
  new FormData(form).forEach((value, key) => {
    state[key] = String(value);
  });
  const priceLimits = priceSliderLimits();
  if (!state.minPrice || Number(state.minPrice) <= priceLimits.min) state.minPrice = "";
  if (!state.maxPrice || Number(state.maxPrice) >= priceLimits.max) state.maxPrice = "";
  return state;
}

function resolveSearchLocation(state = searchState()) {
  const lat = Number(state.locationLat);
  const lng = Number(state.locationLng);
  if (state.location && Number.isFinite(lat) && Number.isFinite(lng)) {
    return {
      name: state.location,
      region: state.locationRegion || "Noorwegen",
      lat,
      lng,
      type: state.locationType || "Plaats",
      zoom: Number(state.locationZoom) || locationZoomForType(state.locationType)
    };
  }
  return resolveNorwayLocation(state.location);
}

function listingCard(listing) {
  const availability = availabilityFor(listing);
  return `
    <a class="card" href="listing.html?id=${listing.id}">
      <div class="card-media">
        <img src="${listing.image}" alt="${listing.title}">
        <span class="badge">${listing.boat}</span>
        ${favoriteButton(listing)}
      </div>
      <div class="card-body">
        <h3>${listing.title}</h3>
        <p>${listing.city}, ${listing.region} · ${listing.guests} gasten · ${listing.bedrooms} slaapkamers</p>
        <div class="listing-assurance"><span>Geverifieerde boot</span><span>Veilig betalen</span></div>
        <div class="availability-row"><span class="status-dot ${availability.status}"></span>${availability.label}</div>
        <div class="meta"><span>Score ${listing.rating}</span><span>${listing.boat} inbegrepen</span></div>
      </div>
    </a>
  `;
}

function detailHref(id) {
  const query = new URLSearchParams(window.location.search);
  query.set("id", id);
  return `listing.html?${query.toString()}`;
}

function cardGalleryImages(listing) {
  return [...new Set([listing.image, ...(listing.gallery || [])].filter(Boolean))];
}

function resultCardGallery(listing) {
  const images = cardGalleryImages(listing);
  return `
    <div class="card-gallery" data-card-gallery>
      <div class="card-gallery-track" data-card-gallery-track aria-label="Foto's van ${escapeHtml(listing.title)}">
        ${images.map((image, index) => `<img src="${image}" alt="${escapeHtml(listing.title)} foto ${index + 1}" data-card-gallery-slide>`).join("")}
      </div>
      ${images.length > 1 ? `
        <button class="card-gallery-nav prev" type="button" data-card-gallery-prev aria-label="Vorige foto">‹</button>
        <button class="card-gallery-nav next" type="button" data-card-gallery-next aria-label="Volgende foto">›</button>
        <span class="card-gallery-count" data-card-gallery-count>1 / ${images.length}</span>
        <div class="card-gallery-dots" aria-hidden="true">
          ${images.map((_, index) => `<span class="${index === 0 ? "is-active" : ""}" data-card-gallery-dot></span>`).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function resultCard(listing) {
  const availability = availabilityFor(listing);
  return `
    <a class="card result-card" href="${detailHref(listing.id)}" data-listing-id="${listing.id}" onmouseenter="focusListing('${listing.id}', { previewOnly: true })" onmouseleave="clearListingFocus('${listing.id}')" onfocus="focusListing('${listing.id}', { previewOnly: true })">
      <div class="card-media">
        ${resultCardGallery(listing)}
        <span class="badge">${listing.boat}</span>
        ${favoriteButton(listing)}
      </div>
      <div class="card-body">
        <div>
          <h3>${listing.title}</h3>
          <p>${listing.city}, ${listing.region} · ${listing.guests} gasten · ${listing.bedrooms} slaapkamers</p>
          <p>${listing.description}</p>
          <div class="listing-assurance"><span>Boot gecontroleerd</span><span>Directe betaling</span><span>Lokale vaartips</span></div>
          <div class="availability-row"><span class="status-dot ${availability.status}"></span>${availability.label}</div>
        </div>
        <div class="result-actions">
          <div class="meta"><span>Score ${listing.rating}</span><span class="price">${money(priceForListing(listing))} / nacht</span></div>
          <span class="button secondary">Bekijk huisje</span>
        </div>
      </div>
    </a>
  `;
}

function listingFeatureSet(listing) {
  const demoAmenityProfiles = {
    "lofoten-hamnoy": ["washer", "wifi", "tv", "heating", "hotTub", "kitchen", "hairdryer", "kingBed", "crib", "fireplace", "smokeDetector", "coDetector", "directBooking", "selfCheckin"],
    "tromso-kvaloya": ["washer", "wifi", "heating", "hotTub", "kitchen", "workspace", "hairdryer", "airco", "kingBed", "gym", "smokeDetector", "coDetector", "selfCheckin"],
    "stavanger-lysefjord": ["washer", "wifi", "tv", "airco", "heating", "hotTub", "kitchen", "iron", "pool", "parking", "kingBed", "fireplace", "smokeDetector", "coDetector", "directBooking"],
    "bergen-austevoll": ["washer", "wifi", "tv", "heating", "kitchen", "dryer", "workspace", "hairdryer", "iron", "parking", "evCharger", "crib", "breakfast", "smokeDetector", "coDetector"],
    "geiranger-waterfall": ["wifi", "heating", "hotTub", "kitchen", "kingBed", "fireplace", "smokeDetector", "coDetector", "directBooking"],
    "oslofjord-hvaler": ["washer", "wifi", "tv", "heating", "kitchen", "dryer", "hairdryer", "iron", "parking", "evCharger", "bbq", "smokeDetector", "coDetector", "directBooking", "selfCheckin"]
  };
  const fallbackAmenities = ["wifi", "heating", "kitchen", "smokeDetector", "coDetector", "directBooking", "parking"];
  const amenities = new Set(demoAmenityProfiles[listing.id] || fallbackAmenities);
  if (listing.waterfront) amenities.add("waterfront");
  if (listing.dock) amenities.add("dock");
  if (listing.sauna) amenities.add("hotTub");
  if (listing.pets) amenities.add("pets");
  (listing.amenities || []).forEach((key) => amenities.add(key));
  if (["bergen-austevoll", "oslofjord-hvaler", "stavanger-lysefjord"].includes(listing.id)) amenities.add("beach");
  if (listing.pets) amenities.add("smoking");
  if (["oslofjord-hvaler", "bergen-austevoll"].includes(listing.id)) {
    ["stepFreeAccess", "accessibleParking", "wideEntrance", "stepFreeBedroom", "wideBedroom", "stepFreeBathroom", "wideBathroom", "stepFreeShower"].forEach((key) => amenities.add(key));
  }
  if (listing.region === "Oslofjord") {
    ["toiletGrabBars", "showerGrabBars", "showerChair"].forEach((key) => amenities.add(key));
  }
  return {
    roomType: listing.roomType || "entire",
    propertyType: listing.propertyType || (listing.id === "bergen-austevoll" ? "apartment" : ["tromso-kvaloya", "geiranger-waterfall"].includes(listing.id) ? "guesthouse" : "house"),
    beds: listing.beds || Math.max(listing.bedrooms + 1, Math.ceil(listing.guests * 0.8)),
    bathrooms: listing.bathrooms || Math.max(1, Math.ceil(listing.bedrooms / 2)),
    amenities
  };
}

function renderFeatured() {
  const target = document.querySelector("[data-featured-listings]");
  if (!target) return;
  target.innerHTML = allListings().slice(0, 3).map(listingCard).join("");
}

function fillSearchDefaults() {
  const state = searchState();
  document.querySelectorAll("form[action='search.html'] [name], [data-query-field]").forEach((field) => {
    const key = field.getAttribute("name");
    if (!key || !Object.prototype.hasOwnProperty.call(state, key) || !state[key]) return;
    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = state[key] === field.value || state[key] === "true";
    } else {
      field.value = state[key];
    }
  });
  normaliseDateFields();
  initLocationAutocomplete();
  initAddressAutocomplete();
  initPhotoUploader();
  initHostAvailabilityCalendar();
  initHomeFilters();
  initPriceRangeFilters();
  initFilterSteppers();
  initSearchFilterControls();
  initSortControls();
  initDateRangePicker();
  renderDateRangePreview();
}

function escapeHtml(value = "") {
  return String(value).replace(/[<>&"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" })[char]);
}

function ensureLocationHiddenFields(form) {
  if (!form) return {};
  return ["locationLat", "locationLng", "locationType", "locationRegion", "locationZoom"].reduce((fields, name) => {
    let field = form.querySelector(`[name='${name}']`);
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      field.value = params().get(name) || "";
      form.appendChild(field);
    }
    fields[name] = field;
    return fields;
  }, {});
}

function setLocationMeta(form, location) {
  const fields = ensureLocationHiddenFields(form);
  if (!fields.locationLat || !location) return;
  fields.locationLat.value = String(location.lat || "");
  fields.locationLng.value = String(location.lng || "");
  fields.locationType.value = location.type || "";
  fields.locationRegion.value = location.region || "";
  fields.locationZoom.value = String(location.zoom || locationZoomForType(location.type));
}

function clearLocationMeta(form) {
  Object.values(ensureLocationHiddenFields(form)).forEach((field) => {
    field.value = "";
  });
}

function updateSearchPageFromForm(form) {
  if (!form?.classList.contains("compact-search") || !document.querySelector("[data-map]")) return;
  const query = new URLSearchParams();
  const priceLimits = priceSliderLimits();
  new FormData(form).forEach((value, key) => {
    if (key === "minPrice" && Number(value) <= priceLimits.min) return;
    if (key === "maxPrice" && Number(value) >= priceLimits.max) return;
    if (value) query.set(key, value);
  });
  window.history.replaceState(null, "", `search.html${query.toString() ? `?${query.toString()}` : ""}`);
  renderAppliedFilters();
  renderSearchResults();
}

function initLocationAutocomplete() {
  document.querySelectorAll("[data-location-input]").forEach((input) => {
    if (input.dataset.locationReady === "true") return;
    input.dataset.locationReady = "true";
    const form = input.closest("form");
    ensureLocationHiddenFields(form);
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");
    const field = input.closest(".field") || input.parentElement;
    field?.classList.add("location-field");
    const list = document.createElement("div");
    list.className = "location-suggestions";
    list.setAttribute("role", "listbox");
    list.hidden = true;
    field?.appendChild(list);
    let activeIndex = -1;
    let currentSuggestions = [];
    let requestId = 0;
    let debounceTimer;

    const hide = () => {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      activeIndex = -1;
    };
    const renderList = (suggestions, options = {}) => {
      currentSuggestions = suggestions;
      if (!currentSuggestions.length) {
        list.innerHTML = `
          <div class="location-suggestion-empty">
            ${options.loading ? "Zoeken in het officiële Noorse plaatsnamenregister..." : "Alleen Noorse plaatsen en fylker worden getoond. Probeer bijvoorbeeld Reine, Flåm, Vestland of Nordland."}
          </div>
        `;
        list.hidden = false;
        input.setAttribute("aria-expanded", "true");
        return;
      }
      list.innerHTML = currentSuggestions.map((location, index) => `
        <button class="location-suggestion ${index === activeIndex ? "is-active" : ""}" type="button" role="option" data-location-index="${index}">
          <span>
            <strong>${escapeHtml(location.name)}</strong>
            <small>${escapeHtml(location.type)} in ${escapeHtml(location.region)}</small>
          </span>
          <em>${location.source === "Kartverket" ? "Officieel" : "Noorwegen"}</em>
        </button>
      `).join("");
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
    };
    const render = () => {
      const local = locationSuggestions(input.value, 16);
      renderList(local, { loading: input.value.trim().length >= 2 && !local.length });
      clearTimeout(debounceTimer);
      if (input.value.trim().length < 2) return;
      const localRequestId = ++requestId;
      debounceTimer = setTimeout(async () => {
        const remote = await fetchKartverketLocations(input.value, 16);
        if (localRequestId !== requestId) return;
        renderList(mergeLocationSuggestions(remote, local, 16, input.value));
      }, 180);
    };
    const choose = (location) => {
      if (!location) return;
      input.value = location.name;
      setLocationMeta(form, location);
      input.dispatchEvent(new Event("change", { bubbles: true }));
      hide();
      updateSearchPageFromForm(form);
    };

    input.addEventListener("input", () => {
      activeIndex = -1;
      if (form) delete form.dataset.locationSubmitting;
      clearLocationMeta(form);
      render();
    });
    input.addEventListener("focus", () => render());
    input.addEventListener("keydown", (event) => {
      if (list.hidden && ["ArrowDown", "ArrowUp"].includes(event.key)) render();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        activeIndex = Math.min(currentSuggestions.length - 1, activeIndex + 1);
        renderList(currentSuggestions);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        activeIndex = Math.max(0, activeIndex - 1);
        renderList(currentSuggestions);
      }
      if (event.key === "Enter" && activeIndex >= 0) {
        event.preventDefault();
        choose(currentSuggestions[activeIndex]);
      }
      if (event.key === "Escape") hide();
    });
    list.addEventListener("mousedown", (event) => {
      const button = event.target.closest("[data-location-index]");
      if (!button) return;
      event.preventDefault();
      choose(currentSuggestions[Number(button.dataset.locationIndex)]);
    });
    form?.addEventListener("submit", async (event) => {
      if (event.defaultPrevented || form.dataset.locationSubmitting === "true") return;
      const value = input.value.trim();
      if (!value || form.querySelector("[name='locationLat']")?.value) return;
      const localLocation = resolveNorwayLocation(value);
      if (localLocation) {
        setLocationMeta(form, localLocation);
        return;
      }
      const firstMatch = currentSuggestions[0] || locationSuggestions(value, 1)[0];
      if (firstMatch) {
        choose(firstMatch);
        return;
      }
      if (value.length < 2) return;
      event.preventDefault();
      const remote = await fetchKartverketLocations(value, 1);
      if (remote[0]) choose(remote[0]);
      form.dataset.locationSubmitting = "true";
      form.requestSubmit();
    });
    document.addEventListener("click", (event) => {
      if (field?.contains(event.target)) return;
      hide();
    });
  });
}

function applyAddressToForm(form, address) {
  if (!form || !address) return;
  const addressInput = form.querySelector("[name='address']");
  const cityInput = form.querySelector("[name='city']");
  const regionInput = form.querySelector("[name='region']");
  const coordinateInput = form.querySelector("[name='coordinates']");
  if (addressInput) addressInput.value = address.address || address.name;
  if (cityInput) cityInput.value = address.city || "";
  if (regionInput) regionInput.value = address.region || "Noorwegen";
  if (coordinateInput) coordinateInput.value = `${address.lat.toFixed(6)}, ${address.lng.toFixed(6)}`;
}

async function resolveAddressForForm(form) {
  const addressInput = form?.querySelector("[name='address']");
  const coordinateInput = form?.querySelector("[name='coordinates']");
  const value = addressInput?.value.trim();
  if (!form || !value || coordinateInput?.value.trim()) return null;
  const match = (await fetchKartverketAddresses(value, 1))[0];
  if (match) applyAddressToForm(form, match);
  return match || null;
}

function initAddressAutocomplete() {
  document.querySelectorAll("[data-address-input]").forEach((input) => {
    if (input.dataset.addressReady === "true") return;
    input.dataset.addressReady = "true";
    const form = input.closest("form");
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");
    const field = input.closest(".field") || input.parentElement;
    field?.classList.add("address-field");
    const list = document.createElement("div");
    list.className = "location-suggestions address-suggestions";
    list.setAttribute("role", "listbox");
    list.hidden = true;
    field?.appendChild(list);
    let activeIndex = -1;
    let currentSuggestions = [];
    let requestId = 0;
    let debounceTimer;

    const hide = () => {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      activeIndex = -1;
    };
    const renderList = (suggestions, options = {}) => {
      currentSuggestions = suggestions;
      if (!currentSuggestions.length) {
        list.innerHTML = `
          <div class="location-suggestion-empty">
            ${options.loading ? "Adressen zoeken in het officiële Noorse adressenregister..." : "Typ straat en huisnummer, bijvoorbeeld Storgata 1 Bergen."}
          </div>
        `;
        list.hidden = false;
        input.setAttribute("aria-expanded", "true");
        return;
      }
      list.innerHTML = currentSuggestions.map((address, index) => `
        <button class="location-suggestion ${index === activeIndex ? "is-active" : ""}" type="button" role="option" data-address-index="${index}">
          <span>
            <strong>${escapeHtml(address.address || address.name)}</strong>
            <small>${escapeHtml(address.city)}, ${escapeHtml(address.region)}</small>
          </span>
          <em>Adres</em>
        </button>
      `).join("");
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
    };
    const render = () => {
      const value = input.value.trim();
      clearTimeout(debounceTimer);
      if (value.length < 3) {
        renderList([], { loading: false });
        return;
      }
      renderList([], { loading: true });
      const localRequestId = ++requestId;
      debounceTimer = setTimeout(async () => {
        const remote = await fetchKartverketAddresses(value, 12);
        if (localRequestId !== requestId) return;
        renderList(remote);
      }, 220);
    };
    const choose = (address) => {
      if (!address) return;
      applyAddressToForm(form, address);
      input.dispatchEvent(new Event("change", { bubbles: true }));
      hide();
    };

    input.addEventListener("input", () => {
      activeIndex = -1;
      const coordinateInput = form?.querySelector("[name='coordinates']");
      if (coordinateInput) coordinateInput.value = "";
      render();
    });
    input.addEventListener("focus", () => render());
    input.addEventListener("keydown", (event) => {
      if (list.hidden && ["ArrowDown", "ArrowUp"].includes(event.key)) render();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        activeIndex = Math.min(currentSuggestions.length - 1, activeIndex + 1);
        renderList(currentSuggestions);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        activeIndex = Math.max(0, activeIndex - 1);
        renderList(currentSuggestions);
      }
      if (event.key === "Enter" && activeIndex >= 0) {
        event.preventDefault();
        choose(currentSuggestions[activeIndex]);
      }
      if (event.key === "Escape") hide();
    });
    list.addEventListener("mousedown", (event) => {
      const button = event.target.closest("[data-address-index]");
      if (!button) return;
      event.preventDefault();
      choose(currentSuggestions[Number(button.dataset.addressIndex)]);
    });
    document.addEventListener("click", (event) => {
      if (field?.contains(event.target)) return;
      hide();
    });
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

function initPhotoUploader() {
  document.querySelectorAll("[data-photo-uploader]").forEach((uploader) => {
    if (uploader.dataset.photoReady === "true") return;
    uploader.dataset.photoReady = "true";
    const input = uploader.querySelector("[data-photo-input]");
    const hidden = uploader.querySelector("[data-photo-json]");
    const preview = uploader.querySelector("[data-photo-preview]");
    const pagePreview = uploader.querySelector("[data-listing-preview]");
    let photos = [];

    const write = () => {
      if (hidden) hidden.value = JSON.stringify(photos);
    };
    const render = () => {
      write();
      if (!preview) return;
      preview.innerHTML = photos.length ? photos.map((photo, index) => `
        <article class="photo-preview-item">
          <div class="photo-preview-image">
            <img src="${photo.src}" alt="${escapeHtml(photo.name || `Foto ${index + 1}`)}" style="object-fit:${photo.fit};object-position:${photo.position};">
            <span>${index + 1}</span>
          </div>
          <div class="photo-preview-controls">
            <strong>${escapeHtml(photo.name || `Foto ${index + 1}`)}</strong>
            <div>
              <button type="button" data-photo-up="${index}" ${index === 0 ? "disabled" : ""}>Omhoog</button>
              <button type="button" data-photo-down="${index}" ${index === photos.length - 1 ? "disabled" : ""}>Omlaag</button>
              <button type="button" data-photo-remove="${index}">Verwijder</button>
            </div>
            <label>Uitsnede
              <select data-photo-fit="${index}">
                <option value="cover" ${photo.fit === "cover" ? "selected" : ""}>Vullend bijsnijden</option>
                <option value="contain" ${photo.fit === "contain" ? "selected" : ""}>Volledig tonen</option>
              </select>
            </label>
            <label>Focus
              <select data-photo-position="${index}">
                <option value="center" ${photo.position === "center" ? "selected" : ""}>Midden</option>
                <option value="top" ${photo.position === "top" ? "selected" : ""}>Boven</option>
                <option value="bottom" ${photo.position === "bottom" ? "selected" : ""}>Onder</option>
                <option value="left" ${photo.position === "left" ? "selected" : ""}>Links</option>
                <option value="right" ${photo.position === "right" ? "selected" : ""}>Rechts</option>
              </select>
            </label>
          </div>
        </article>
      `).join("") : `<div class="photo-empty">Nog geen foto's gekozen. De demo gebruikt anders veilige Noorse placeholderfoto's.</div>`;
      const cover = pagePreview?.querySelector(".preview-cover");
      if (cover) {
        const first = photos[0];
        cover.style.backgroundImage = first ? `url("${first.src}")` : "";
        cover.style.backgroundSize = first?.fit || "cover";
        cover.style.backgroundPosition = first?.position || "center";
      }
    };
    input?.addEventListener("change", async () => {
      const files = [...(input.files || [])].filter((file) => file.type.startsWith("image/"));
      const nextPhotos = await Promise.all(files.map(async (file) => ({
        src: await readFileAsDataUrl(file),
        name: file.name,
        fit: "cover",
        position: "center"
      })));
      photos = [...photos, ...nextPhotos];
      input.value = "";
      render();
    });
    preview?.addEventListener("click", (event) => {
      const up = event.target.closest("[data-photo-up]");
      const down = event.target.closest("[data-photo-down]");
      const remove = event.target.closest("[data-photo-remove]");
      if (up) {
        const index = Number(up.dataset.photoUp);
        [photos[index - 1], photos[index]] = [photos[index], photos[index - 1]];
        render();
      }
      if (down) {
        const index = Number(down.dataset.photoDown);
        [photos[index], photos[index + 1]] = [photos[index + 1], photos[index]];
        render();
      }
      if (remove) {
        photos.splice(Number(remove.dataset.photoRemove), 1);
        render();
      }
    });
    preview?.addEventListener("change", (event) => {
      const fit = event.target.closest("[data-photo-fit]");
      const position = event.target.closest("[data-photo-position]");
      if (fit) photos[Number(fit.dataset.photoFit)].fit = fit.value;
      if (position) photos[Number(position.dataset.photoPosition)].position = position.value;
      render();
    });
    render();
  });
}

function groupedDateRanges(values = []) {
  const sorted = [...new Set(values)].filter(Boolean).sort();
  const ranges = [];
  let current = null;
  sorted.forEach((value) => {
    if (!current) {
      current = { start: value, end: value };
      return;
    }
    const expectedNext = new Date(current.end);
    expectedNext.setDate(expectedNext.getDate() + 1);
    if (value === toInputDate(expectedNext)) {
      current.end = value;
    } else {
      ranges.push(current);
      current = { start: value, end: value };
    }
  });
  if (current) ranges.push(current);
  return ranges.map((range) => {
    const end = new Date(range.end);
    end.setDate(end.getDate() + 1);
    return { start: range.start, end: toInputDate(end) };
  });
}

function renderHostAvailabilityMonth(monthDate, selectedDates) {
  const monthName = new Intl.DateTimeFormat(activeLocale(), { month: "long", year: "numeric" }).format(monthDate);
  const weekdays = calendarWeekdays();
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const leadingBlanks = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const blanks = Array.from({ length: leadingBlanks }, () => `<span class="calendar-empty"></span>`).join("");
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), index + 1);
    const value = toInputDate(date);
    const blocked = selectedDates.has(value);
    return `
      <button class="calendar-day host-calendar-day ${blocked ? "is-host-blocked" : ""}" type="button" data-host-date-value="${value}" aria-pressed="${blocked}">
        ${index + 1}
      </button>
    `;
  }).join("");
  return `
    <section class="calendar-month">
      <h3>${monthName}</h3>
      <div class="calendar-weekdays">${weekdays.map((day) => `<span>${day}</span>`).join("")}</div>
      <div class="calendar-grid">${blanks}${days}</div>
    </section>
  `;
}

function initHostAvailabilityCalendar() {
  document.querySelectorAll("[data-host-unavailable-calendar]").forEach((calendar) => {
    if (calendar.dataset.hostCalendarReady === "true") return;
    calendar.dataset.hostCalendarReady = "true";
    const hidden = calendar.querySelector("[data-host-unavailable-json]");
    const monthsTarget = calendar.querySelector("[data-host-calendar-months]");
    const status = calendar.querySelector("[data-host-calendar-status]");
    const base = new Date();
    calendar.dataset.hostCalendarMonth = toInputDate(new Date(base.getFullYear(), base.getMonth(), 1));
    const selectedDates = new Set();

    const write = () => {
      if (hidden) hidden.value = JSON.stringify([...selectedDates].sort());
      if (status) {
        const count = selectedDates.size;
        status.textContent = count ? `${count} ${count === 1 ? "dag" : "dagen"} niet beschikbaar` : "Geen dagen geblokkeerd";
      }
    };
    const render = () => {
      if (!monthsTarget) return;
      const month = new Date(calendar.dataset.hostCalendarMonth || toInputDate(new Date()));
      const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      monthsTarget.innerHTML = [month, nextMonth].map((date) => renderHostAvailabilityMonth(date, selectedDates)).join("");
      write();
    };
    const shift = (direction) => {
      const current = new Date(calendar.dataset.hostCalendarMonth || toInputDate(new Date()));
      current.setMonth(current.getMonth() + direction);
      calendar.dataset.hostCalendarMonth = toInputDate(new Date(current.getFullYear(), current.getMonth(), 1));
      render();
    };

    calendar.querySelector("[data-host-calendar-prev]")?.addEventListener("click", () => shift(-1));
    calendar.querySelector("[data-host-calendar-next]")?.addEventListener("click", () => shift(1));
    monthsTarget?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-host-date-value]");
      if (!button) return;
      const value = button.dataset.hostDateValue;
      if (selectedDates.has(value)) selectedDates.delete(value);
      else selectedDates.add(value);
      render();
    });
    render();
  });
}

function formsWithCustomCalendar() {
  return document.querySelectorAll("[data-custom-calendar]");
}

function normaliseDateFields() {
  const forms = document.querySelectorAll("form[action='search.html']");
  forms.forEach((form) => {
    const checkin = form.querySelector("[name='checkin']");
    const checkout = form.querySelector("[name='checkout']");

    if (form.dataset.customCalendar === "true") {
      form.addEventListener("submit", (event) => {
        const hasOnlyOneDate = Boolean(checkin?.value) !== Boolean(checkout?.value);
        const hasInvalidRange = Boolean(checkin?.value && checkout?.value && new Date(checkout.value) <= new Date(checkin.value));
        if (!checkin || !checkout || hasOnlyOneDate || hasInvalidRange) {
          event.preventDefault();
          form.dataset.dateMode = checkin?.value ? "checkout" : "checkin";
          const popover = form.querySelector("[data-calendar-popover]");
          if (popover) popover.hidden = false;
          const status = form.querySelector("[data-calendar-status]");
          if (status) status.textContent = checkin?.value ? "Kies eerst je uitcheckdatum" : "Kies eerst je incheckdatum";
          renderCalendar(form);
        }
      });
      return;
    }

    checkin?.addEventListener("change", () => {
      if (!checkout || !checkin.value) return;
      checkout.min = checkin.value;
      if (!checkout.value || new Date(checkout.value) <= new Date(checkin.value)) {
        const next = new Date(checkin.value);
        next.setDate(next.getDate() + 7);
        checkout.value = next.toISOString().slice(0, 10);
      }
      renderDateRangePreview(form);
      setTimeout(() => {
        checkout.focus();
        if (typeof checkout.showPicker === "function") checkout.showPicker();
      }, 80);
    });
    checkout?.addEventListener("change", () => renderDateRangePreview(form));
    form.querySelectorAll("[name='checkin'], [name='checkout']").forEach((field) => {
      field.addEventListener("input", () => renderDateRangePreview(form));
      field.addEventListener("focus", () => renderDateRangePreview(form));
    });

    form.addEventListener("submit", () => {
      if (!checkin || !checkout || !checkin.value) return;
      if (!checkout.value) {
        const next = new Date(checkin.value);
        next.setDate(next.getDate() + 7);
        checkout.value = next.toISOString().slice(0, 10);
      }
      const start = new Date(checkin.value);
      const end = new Date(checkout.value);
      if (end > start) return;
      const next = new Date(start);
      next.setDate(next.getDate() + 7);
      checkout.value = next.toISOString().slice(0, 10);
    });
  });
}

function renderAppliedFilters() {
  const target = document.querySelector("[data-applied-filters]");
  if (!target) return;
  const state = searchState();
  const labels = [
    ["location", "Locatie"],
    ["checkin", "Check-in"],
    ["checkout", "Check-out"],
    ["guests", "Gasten"],
    ["bedrooms", "Slaapkamers"],
    ["minPrice", "Min prijs"],
    ["maxPrice", "Max prijs"]
  ];
  const chips = labels
    .filter(([key]) => state[key])
    .map(([key, label]) => `<span class="badge">${label}: ${key === "bedrooms" ? `${state[key]}+` : key === "minPrice" || key === "maxPrice" ? money(Number(state[key])) : state[key]}</span>`);
  if (state.sort && sortLabels[state.sort]) chips.push(`<span class="badge">${sortLabels[state.sort]}</span>`);
  if (state.waterfront) chips.push(`<span class="badge">Aan het water</span>`);
  if (state.dock) chips.push(`<span class="badge">Eigen steiger</span>`);
  if (state.sauna) chips.push(`<span class="badge">Sauna/hottub</span>`);
  if (state.pets) chips.push(`<span class="badge">Huisdieren</span>`);
  if (state.beds) chips.push(`<span class="badge">Bedden: ${state.beds}+</span>`);
  if (state.bathrooms) chips.push(`<span class="badge">Badkamers: ${state.bathrooms}+</span>`);
  if (state.roomType && state.roomType !== "all") chips.push(`<span class="badge">${state.roomType === "entire" ? "Hele woning" : "Kamer"}</span>`);
  if (state.propertyType) chips.push(`<span class="badge">${filterLabels.propertyType}: ${propertyTypeLabels[state.propertyType] || state.propertyType}</span>`);
  advancedFilterKeys
    .filter((key) => !["roomType", "propertyType", "beds", "bathrooms"].includes(key) && state[key])
    .slice(0, 10)
    .forEach((key) => chips.push(`<span class="badge">${filterLabels[key] || key}</span>`));
  if (state.correctedDates) chips.push(`<span class="badge warning">Check-out automatisch gecorrigeerd</span>`);
  target.innerHTML = chips.length ? chips.join("") : `<span class="badge">Geen filters gekozen</span>`;
}

function renderSearchResults() {
  const target = document.querySelector("[data-search-results]");
  if (!target) return;
  const state = searchState();
  const locationPoint = resolveSearchLocation(state);
  const filtered = sortListings(allListings().filter((listing) => listingMatchesSearch(listing, state, { ignoreLocation: Boolean(locationPoint) })), state);
  window.currentSearchResults = filtered;
  window.currentSearchState = state;
  renderVisibleSearchList(filtered, state);
  renderMap(filtered, state);
}

function listingMatchesSearch(listing, state, options = {}) {
  const location = (state.location || "").toLowerCase();
  const guests = Number(state.guests || 0);
  const bedrooms = Number(state.bedrooms || 0);
  const beds = Number(state.beds || 0);
  const bathrooms = Number(state.bathrooms || 0);
  const minPrice = Number(state.minPrice || 0);
  const maxPrice = Number(state.maxPrice || 0);
  const features = listingFeatureSet(listing);
  const matchesLocation = options.ignoreLocation || !location || listing.region.toLowerCase().includes(location) || listing.city.toLowerCase().includes(location);
  const matchesGuests = !guests || listing.guests >= guests;
  const matchesBedrooms = !bedrooms || listing.bedrooms >= bedrooms;
  const matchesBeds = !beds || features.beds >= beds;
  const matchesBathrooms = !bathrooms || features.bathrooms >= bathrooms;
  const displayPrice = priceForListing(listing, state.checkin);
  const matchesPrice = options.ignorePrice || ((!minPrice || displayPrice >= minPrice) && (!maxPrice || displayPrice <= maxPrice));
  const matchesRoomType = !state.roomType || state.roomType === "all" || features.roomType === state.roomType;
  const matchesPropertyType = !state.propertyType || features.propertyType === state.propertyType;
  const matchesWaterfront = !state.waterfront || features.amenities.has("waterfront");
  const matchesDock = !state.dock || features.amenities.has("dock");
  const matchesSauna = !state.sauna || features.amenities.has("hotTub");
  const matchesPets = !state.pets || features.amenities.has("pets");
  const amenityKeys = advancedFilterKeys.filter((key) => !["roomType", "propertyType", "beds", "bathrooms"].includes(key));
  const matchesAmenities = amenityKeys.every((key) => !state[key] || features.amenities.has(key));
  const matchesAvailability = !(state.checkin && state.checkout) || availabilityFor(listing, state).status !== "booked";
  return matchesLocation && matchesGuests && matchesBedrooms && matchesBeds && matchesBathrooms && matchesPrice && matchesRoomType && matchesPropertyType && matchesWaterfront && matchesDock && matchesSauna && matchesPets && matchesAmenities && matchesAvailability;
}

function sortListings(items, state) {
  if (state.sort === "priceAsc") return [...items].sort((a, b) => priceForListing(a, state.checkin) - priceForListing(b, state.checkin));
  if (state.sort === "priceDesc") return [...items].sort((a, b) => priceForListing(b, state.checkin) - priceForListing(a, state.checkin));
  if (state.sort === "rating") return [...items].sort((a, b) => b.rating - a.rating);
  if (state.sort === "popularity") {
    return [...items].sort((a, b) => {
      const scoreA = (a.rating * 100) + (bookingsForListing(a).length * 8) + (a.waterfront ? 4 : 0) + (a.dock ? 4 : 0);
      const scoreB = (b.rating * 100) + (bookingsForListing(b).length * 8) + (b.waterfront ? 4 : 0) + (b.dock ? 4 : 0);
      return scoreB - scoreA;
    });
  }
  return [...items];
}

function renderVisibleSearchList(listings, state, reason = "") {
  const target = document.querySelector("[data-search-results]");
  if (!target) return;
  target.innerHTML = listings.length
    ? listings.map(resultCard).join("")
    : `<div class="panel"><h3>Geen huizen in beeld</h3><p class="lead">Verplaats of zoom de kaart, of kies ruimere filters.</p></div>`;
  initCardGalleries();
  const count = document.querySelector("[data-result-count]");
  if (count) {
    const suffix = reason ? ` ${reason}` : "";
    count.textContent = `${listings.length} huizen met boot gevonden${suffix}`;
  }
  applyStoredLanguage();
}

function renderNearbyResults(filteredListings, state, visible) {
  const section = document.querySelector("[data-nearby-section]");
  const target = document.querySelector("[data-nearby-results]");
  if (!section || !target) return;
  target.innerHTML = "";
  section.hidden = true;
}

function renderMap(filteredListings, state = searchState()) {
  const target = document.querySelector("[data-map]");
  if (!target) return;
  if (!window.L) {
    target.innerHTML = `
      <div class="static-norway-map">
        <svg viewBox="0 0 420 580" role="img" aria-label="Kaartpreview van Noorwegen">
          <path d="M244 26c31 58 23 96 57 143 29 40 60 77 50 132-8 45-45 61-47 106-2 42 22 69 4 106-21 44-78 58-121 35-35-19-35-55-16-91 19-35-5-57-25-88-28-42-11-78 14-107 32-37 24-73 30-120 5-42 20-83 54-116z" fill="#f7fbfc" stroke="#9ec8d4" stroke-width="3"/>
        </svg>
        <span class="pin named" style="left:49%;top:13%;">Lofoten</span>
        <span class="pin named" style="left:54%;top:24%;">Tromso</span>
        <span class="pin named" style="left:40%;top:58%;">Stavanger</span>
        <span class="pin named" style="left:50%;top:69%;">Bergen</span>
      </div>
    `;
    return;
  }
  if (window.nordicMap) {
    window.nordicMap.remove();
  }
  const norwayBounds = L.latLngBounds([57.4, 3.7], [71.6, 31.4]);
  const map = L.map(target, {
    scrollWheelZoom: true,
    wheelPxPerZoomLevel: 80,
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    doubleClickZoom: true,
    touchZoom: true,
    maxBounds: norwayBounds,
    maxBoundsViscosity: 1,
    minZoom: 4,
    maxZoom: 12
  }).fitBounds(norwayBounds, { padding: [10, 10] });
  map.setMaxBounds(norwayBounds.pad(0.06));
  window.nordicMap = map;
  window.nordicMarkers = new Map();
  window.nordicMapListings = new Map();
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "",
    noWrap: true,
    bounds: norwayBounds
  }).addTo(map);
  const makePinIcon = (listing, isSecondary = false) => L.divIcon({
    className: `leaflet-nordic-pin ${isSecondary ? "is-secondary" : ""}`,
    html: `<span>${money(priceForListing(listing, state.checkin))}</span>`,
    iconSize: [70, 32],
    iconAnchor: [35, 16]
  });
  const locationPoint = resolveSearchLocation(state);
  const mapListings = filteredListings;
  const bounds = [];
  mapListings.forEach((listing) => {
    const isSecondary = false;
    bounds.push([listing.lat, listing.lng]);
    const availability = availabilityFor(listing);
    const marker = L.marker([listing.lat, listing.lng], { icon: makePinIcon(listing, isSecondary), opacity: 1 })
      .addTo(map)
      .bindPopup(mapPreview(listing, isSecondary, availability), { minWidth: 280, maxWidth: 320 });
    marker.on("click", () => focusListing(listing.id, { fromMarker: true }));
    marker.on("mouseover", () => focusListing(listing.id, { previewOnly: true }));
    marker.on("mouseout", () => clearListingFocus(listing.id));
    window.nordicMarkers.set(listing.id, marker);
    window.nordicMapListings.set(listing.id, { listing, isSecondary });
  });
  if (locationPoint) {
    map.setView([locationPoint.lat, locationPoint.lng], locationPoint.zoom || 8, { animate: false });
    L.circleMarker([locationPoint.lat, locationPoint.lng], {
      radius: 8,
      color: "#111315",
      weight: 2,
      fillColor: "#b79263",
      fillOpacity: 0.95,
      interactive: false
    }).addTo(map);
  } else if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [38, 38] });
  } else if (bounds.length === 1) {
    map.setView(bounds[0], 8);
  }
  addNorwayFocusOverlay(map, norwayBounds);
  updateSecondaryMarkers(map);
  syncListWithMap(map, state);
  map.on("zoomend moveend", () => {
    updateSecondaryMarkers(map);
    syncListWithMap(map, state);
  });
}

function mapPreview(listing, isSecondary, availability) {
  const images = listing.gallery || [listing.image];
  return `
    <article class="map-preview">
      <div class="map-preview-gallery">
        ${images.map((image) => `<img src="${image}" alt="${listing.title}">`).join("")}
      </div>
      <div class="map-preview-body">
        <strong>${listing.title}</strong>
        <span>${listing.city}, ${listing.region}</span>
        <span>${money(priceForListing(listing))} per nacht · ${availability.label}</span>
        ${isSecondary ? `<span>Andere woning in Noorwegen</span>` : ""}
        <a class="button" href="${detailHref(listing.id)}">Bekijk huisje</a>
      </div>
    </article>
  `;
}

function updateSecondaryMarkers(map) {
  const showSecondary = map.getZoom() <= 5;
  window.nordicMarkers?.forEach((marker) => {
    const element = marker.getElement();
    if (!element?.classList.contains("is-secondary")) return;
    const isActive = element.classList.contains("is-active");
    marker.setOpacity(showSecondary || isActive ? 0.7 : 0);
    element.style.pointerEvents = showSecondary || isActive ? "auto" : "none";
  });
  const count = document.querySelector("[data-map-count]");
  if (count) {
    count.textContent = showSecondary
      ? "Uitgezoomd: extra huizen zichtbaar"
      : "Scroll om uit te zoomen · klik een prijs";
  }
}

function syncListWithMap(map, state = searchState()) {
  const bounds = map.getBounds();
  const showSecondary = map.getZoom() <= 5;
  const visible = [];
  window.nordicMapListings?.forEach(({ listing, isSecondary }, id) => {
    if (isSecondary && !showSecondary) return;
    if (!bounds.contains([listing.lat, listing.lng])) return;
    const marker = window.nordicMarkers?.get(id);
    if (marker?.options.opacity === 0) return;
    visible.push(listing);
  });
  renderVisibleSearchList(sortListings(visible, state), state, "op de kaart");
}

function addNorwayFocusOverlay(map, norwayBounds) {
  L.rectangle(norwayBounds, {
    color: "#111315",
    weight: 1,
    opacity: 0.22,
    fillOpacity: 0,
    interactive: false
  }).addTo(map);
  const south = L.latLngBounds([-85, -180], [57.4, 180]);
  const west = L.latLngBounds([57.4, -180], [71.6, 3.7]);
  const east = L.latLngBounds([57.4, 31.4], [71.6, 180]);
  const north = L.latLngBounds([71.6, -180], [85, 180]);
  [south, west, east, north].forEach((bounds) => {
    L.rectangle(bounds, {
      stroke: false,
      fillColor: "#f4f4f1",
      fillOpacity: 0.72,
      interactive: false
    }).addTo(map);
  });
}

function focusListing(id, options = {}) {
  const listing = allListings().find((item) => item.id === id);
  if (!listing || !window.nordicMap) return;
  if (!options.previewOnly) {
    window.nordicMap.setView([listing.lat, listing.lng], 9, { animate: true });
  }
  const marker = window.nordicMarkers?.get(id);
  if (marker && !options.previewOnly) marker.openPopup();
  document.querySelectorAll("[data-listing-id]").forEach((card) => {
    card.classList.toggle("is-active", card.getAttribute("data-listing-id") === id);
  });
  window.nordicMarkers?.forEach((itemMarker, markerId) => {
    itemMarker.getElement()?.classList.toggle("is-active", markerId === id);
  });
  if (!options.fromMarker && window.innerWidth < 980) {
    document.querySelector(".map-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function clearListingFocus(id) {
  document.querySelector(`[data-listing-id="${id}"]`)?.classList.remove("is-active");
  window.nordicMarkers?.get(id)?.getElement()?.classList.remove("is-active");
}

function listingGalleryImages(listing) {
  return [...new Set([
    listing.image,
    ...(listing.gallery || []),
    "https://commons.wikimedia.org/wiki/Special:FilePath/Lofoten%2C%20Norway%20%28Unsplash%20dVV1h3odR9s%29.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Ersfjorden%2C%20Norway%20%28Unsplash%29.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Oslofjord%2014.JPG?width=1200"
  ].filter(Boolean))];
}

function renderListingGallery(listing) {
  const images = listingGalleryImages(listing);
  return `
    <section class="listing-gallery" data-listing-gallery>
      <button class="gallery-main" type="button" data-gallery-open aria-label="Open fotogalerij">
        <img src="${images[0]}" alt="${listing.title}" data-gallery-main-image>
        <span class="gallery-counter" data-gallery-counter>1 / ${images.length}</span>
      </button>
      <button class="gallery-nav gallery-prev" type="button" data-gallery-prev aria-label="Vorige foto">‹</button>
      <button class="gallery-nav gallery-next" type="button" data-gallery-next aria-label="Volgende foto">›</button>
      <div class="gallery-strip" data-gallery-strip aria-label="Foto's van ${escapeHtml(listing.title)}">
        ${images.map((image, index) => `
          <button class="gallery-thumb ${index === 0 ? "is-active" : ""}" type="button" data-gallery-index="${index}" data-gallery-image-url="${image}">
            <img src="${image}" alt="${escapeHtml(listing.title)} foto ${index + 1}">
          </button>
        `).join("")}
      </div>
      <div class="gallery-lightbox" data-gallery-lightbox hidden>
        <button class="gallery-close" type="button" data-gallery-close aria-label="Sluit fotogalerij">Sluit</button>
        <button class="gallery-lightbox-nav gallery-prev" type="button" data-gallery-prev aria-label="Vorige foto">‹</button>
        <img src="${images[0]}" alt="${escapeHtml(listing.title)} groot" data-gallery-lightbox-image>
        <button class="gallery-lightbox-nav gallery-next" type="button" data-gallery-next aria-label="Volgende foto">›</button>
        <span class="gallery-lightbox-counter" data-gallery-lightbox-counter>1 / ${images.length}</span>
      </div>
    </section>
  `;
}

function renderListingDetail() {
  const root = document.querySelector("[data-listing-detail]");
  if (!root) return;
  const availableListings = allListings();
  const id = params().get("id") || availableListings[0].id;
  const listing = availableListings.find((item) => item.id === id) || availableListings[0];
  const state = searchState();
  let checkin = state.checkin || "2026-06-20";
  let checkout = state.checkout || "2026-06-27";
  const paymentConfirmed = params().get("paid") === "1";
  const initialAvailability = availabilityFor(listing, { checkin, checkout });
  if (!paymentConfirmed && initialAvailability.status === "booked" && initialAvailability.conflict) {
    const next = new Date(initialAvailability.conflict.end);
    checkin = next.toISOString().slice(0, 10);
    next.setDate(next.getDate() + 7);
    checkout = next.toISOString().slice(0, 10);
  }
  const guests = state.guests || "4";
  const nights = Math.max(1, Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000));
  root.innerHTML = `
    ${renderListingGallery(listing)}
    ${paymentConfirmed ? `
      <section class="panel payment-confirmation">
        <h2>Betaling bevestigd</h2>
        <p class="lead">${formatLongDate(checkin)} tot ${formatLongDate(checkout)} staat nu als bezet in de agenda.</p>
        <a class="button secondary" href="bookings.html" style="margin-top:16px;">Bekijk mijn boekingen</a>
      </section>
    ` : ""}
    <div class="detail-layout">
      <section>
        <h1>${listing.title}</h1>
        <p class="lead">${listing.city}, ${listing.region} · Score ${listing.rating} · ${listing.guests} gasten</p>
        <p class="lead">${listing.description} De huur is inclusief basisinstructie, zwemvesten en lokale tips voor veilige vaarroutes.</p>
        <div class="trust-grid detail-trust">
          <div><strong>Boot vooraf gecontroleerd</strong><span>Elke verhuurder vult bootgegevens, veiligheidsuitrusting en ligplaats in.</span></div>
          <div><strong>Betaling blokkeert de data</strong><span>Pas na betaling wordt de periode definitief bezet in de agenda.</span></div>
          <div><strong>Contact met verhuurder</strong><span>Na boeken ontstaat automatisch een berichtenlijn voor aankomst en bootinstructie.</span></div>
        </div>
        <div class="panel" style="margin-top:22px;">
          <h2>Bootinformatie</h2>
          <div class="boat-grid" style="margin-top:18px;">
            <div><strong>Type boot</strong><br>${listing.boat}</div>
            <div><strong>Capaciteit</strong><br>${listing.boatCapacity || `${Math.min(listing.guests, 6)} personen`}</div>
            <div><strong>Motorvermogen</strong><br>${listing.enginePower || "75 pk"}</div>
            <div><strong>Vaarbewijs nodig</strong><br>${listing.licenseRequired || (listing.boat === "RIB" ? "Ja" : "Nee")}</div>
            <div><strong>Veiligheid</strong><br>${listing.safety || "Inbegrepen"}</div>
            <div><strong>Ligplaats</strong><br>Eigen steiger</div>
          </div>
        </div>
        <div class="panel listing-location-panel" style="margin-top:22px;">
          <div class="section-head compact-head">
            <div>
              <h2>Locatie</h2>
              <p class="lead">${listing.city}, ${listing.region}. Bekijk waar het huis met boot precies ligt.</p>
            </div>
            <span class="badge">${money(priceForListing(listing, checkin))} / nacht</span>
          </div>
          <div class="listing-location-map" data-listing-map aria-label="Kaart met locatie van ${escapeHtml(listing.title)}"></div>
        </div>
        <div class="panel review-panel" style="margin-top:22px;">
          <h2>Reviews</h2>
          <div class="review-list">
            <article><strong>“Heel helder geregeld”</strong><p>De bootinstructie stond klaar bij aankomst en de kalender klopte exact.</p><span>Marit · ${listing.region}</span></article>
            <article><strong>“Voelde betrouwbaar”</strong><p>Fijn dat prijs, boot en beschikbaarheid op één plek duidelijk waren.</p><span>Jeroen · geverifieerde gast</span></article>
          </div>
        </div>
      </section>
      <aside class="panel sticky-panel">
        <button class="save-listing-button" type="button" data-favorite-listing-id="${listing.id}" onclick="toggleFavorite(event, '${listing.id}')" aria-pressed="${isFavorite(listing.id)}">
          <span data-favorite-symbol>${isFavorite(listing.id) ? "♥" : "♡"}</span>
          <span data-favorite-label>${isFavorite(listing.id) ? "Bewaard" : "Bewaren"}</span>
        </button>
        <h2>${money(priceForListing(listing, checkin))} <span style="font-size:14px;color:var(--muted);font-weight:500;">per nacht</span></h2>
        <form class="booking-form-with-calendar" style="margin-top:18px;" onsubmit="startCheckoutPayment(event, '${listing.id}')" data-custom-calendar="true" data-calendar-listing-id="${listing.id}">
          <div class="booking-date-row">
            <div class="date-field" data-date-field="checkin">
              <input name="checkin" type="hidden" value="${checkin}">
              <button class="date-trigger" type="button" data-date-trigger="checkin">
                <span>Check-in</span>
                <strong data-date-label="checkin">${formatLongDate(checkin)}</strong>
              </button>
            </div>
            <div class="date-field" data-date-field="checkout">
              <input name="checkout" type="hidden" value="${checkout}">
              <button class="date-trigger" type="button" data-date-trigger="checkout">
                <span>Check-out</span>
                <strong data-date-label="checkout">${formatLongDate(checkout)}</strong>
              </button>
            </div>
          </div>
          <div class="calendar-popover detail-calendar-popover" data-calendar-popover hidden>
            <div class="calendar-topbar">
              <button class="calendar-arrow" type="button" data-calendar-prev aria-label="Vorige maand">‹</button>
              <div class="calendar-status" data-calendar-status>Kies je check-in</div>
              <button class="calendar-arrow" type="button" data-calendar-next aria-label="Volgende maand">›</button>
            </div>
            <div class="calendar-months" data-calendar-months></div>
            <p class="calendar-legend"><span></span> Doorgestreepte dagen zijn bezet of in aanvraag.</p>
          </div>
          <div class="field booking-guests"><label>Gasten</label><input name="guests" type="number" value="${guests}" min="1" max="${listing.guests}"></div>
          <div class="booking-total" data-booking-total>${nights} nachten: ${money(bookingSubtotal(listing, checkin, checkout))}<br>Servicekosten: ${money(95)}<br><strong>Totaal: ${money(paymentTotal(listing, checkin, checkout))}</strong></div>
          <button class="button" type="submit">Ga naar betaling</button>
          <div class="booking-guarantees"><span>Geen verborgen kosten</span><span>Data direct geblokkeerd na betaling</span><span>Bootinformatie vooraf zichtbaar</span></div>
          <p class="lead" data-booking-message></p>
        </form>
      </aside>
    </div>
  `;
  initListingGallery();
  initDateRangePicker();
  renderListingLocationMap(listing);
  renderFavoriteButtons();
  document.querySelectorAll("[data-calendar-listing-id]").forEach((form) => updateBookingSummary(form));
}

function renderListingLocationMap(listing) {
  const target = document.querySelector("[data-listing-map]");
  if (!target) return;
  if (!window.L) {
    target.innerHTML = `
      <div class="static-detail-map">
        <strong>${listing.city}</strong>
        <span>${listing.region} · ${listing.lat.toFixed(3)}, ${listing.lng.toFixed(3)}</span>
      </div>
    `;
    return;
  }
  if (window.nordicDetailMap) {
    window.nordicDetailMap.remove();
  }
  const norwayBounds = L.latLngBounds([57.4, 3.7], [71.6, 31.4]);
  const map = L.map(target, {
    scrollWheelZoom: true,
    wheelPxPerZoomLevel: 80,
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    doubleClickZoom: true,
    touchZoom: true,
    maxBounds: norwayBounds,
    maxBoundsViscosity: 1,
    minZoom: 4,
    maxZoom: 13
  }).setView([listing.lat, listing.lng], 10);
  window.nordicDetailMap = map;
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "",
    noWrap: true,
    bounds: norwayBounds
  }).addTo(map);
  const icon = L.divIcon({
    className: "leaflet-nordic-pin detail-map-pin is-active",
    html: `<span>${money(priceForListing(listing))}</span>`,
    iconSize: [78, 34],
    iconAnchor: [39, 17]
  });
  L.marker([listing.lat, listing.lng], { icon })
    .addTo(map)
    .bindPopup(`
      <article class="map-preview compact-map-preview">
        <div class="map-preview-body">
          <strong>${listing.title}</strong>
          <span>${listing.city}, ${listing.region}</span>
          <span>${listing.boat} inbegrepen</span>
        </div>
      </article>
    `, { minWidth: 250, maxWidth: 290 })
    .openPopup();
  L.circle([listing.lat, listing.lng], {
    radius: 1400,
    color: "#111315",
    weight: 1,
    fillColor: "#b79263",
    fillOpacity: 0.12,
    interactive: false
  }).addTo(map);
  setTimeout(() => map.invalidateSize(), 80);
}

function renderFavoritesPage() {
  const root = document.querySelector("[data-favorites-page]");
  if (!root) return;
  const session = getSession();
  if (!session?.email) {
    root.innerHTML = `
      <section class="panel empty-state">
        <h1>Log in om je favorieten te zien</h1>
        <p class="lead">Favorieten horen bij je eigen account. Zo ziet iedere huurder alleen zijn eigen shortlist.</p>
        <a class="button" href="login.html?next=favorites.html">Inloggen of account maken</a>
      </section>
    `;
    return;
  }
  const favorites = favoriteIds();
  const items = allListings().filter((listing) => favorites.includes(listing.id));
  root.innerHTML = `
    <div class="section-head">
      <div>
        <h1>Favorieten</h1>
        <p class="lead">${items.length ? "Je bewaarde huizen met boot, klaar om later te vergelijken." : "Bewaar huizen vanaf de zoekpagina of detailpagina om ze hier terug te vinden."}</p>
      </div>
      <a class="button secondary" href="search.html">Verder zoeken</a>
    </div>
    ${items.length ? `
      <section class="listing-grid">${items.map(listingCard).join("")}</section>
      <section class="panel comparison-panel">
        <h2>Vergelijken</h2>
        <div class="comparison-row">
          ${items.slice(0, 3).map((listing) => `<div><strong>${listing.title}</strong><span>${money(priceForListing(listing))} / nacht · ${listing.boat} · ${listing.guests} gasten</span></div>`).join("")}
        </div>
      </section>
    ` : `
      <section class="panel empty-state">
        <h2>Nog geen favorieten</h2>
        <p class="lead">Klik op het hartje bij een huisje om je shortlist op te bouwen.</p>
        <a class="button" href="search.html">Bekijk huizen</a>
      </section>
    `}
  `;
  renderFavoriteButtons();
}

function setStoredBookingStatus(listingId, bookingKey, status) {
  const local = localBookings();
  let updatedLocal = false;
  const nextLocal = local.map((booking) => {
    if (booking.listingId === listingId && bookingKeyFor(listingId, booking) === bookingKey) {
      updatedLocal = true;
      return { ...booking, status };
    }
    return booking;
  });
  if (updatedLocal) {
    writeStore("nordicBoatBookings", nextLocal);
    return;
  }
  writeBookingOverrides({
    ...bookingOverrides(),
    [bookingKey]: { status, updatedAt: new Date().toISOString() }
  });
}

function changeBookingStatus(event, listingId, encodedKey, status) {
  event?.preventDefault();
  const key = decodeURIComponent(encodedKey);
  setStoredBookingStatus(listingId, key, status);
  renderHostStats();
  renderDashboardListings();
  renderHostBookings();
  renderHostAvailability();
  renderTripsPage();
  renderSearchResults();
}

function bookingActionButtons(listing, period, actor = "host") {
  const key = encodeURIComponent(period.bookingKey || bookingKeyFor(listing.id, period));
  if (actor === "guest") {
    if (!["pending", "accepted"].includes(period.status)) return "";
    return `<button class="button secondary trip-cancel" type="button" onclick="changeBookingStatus(event, '${listing.id}', '${key}', 'cancelled')">Annuleren</button>`;
  }
  if (period.status === "pending") {
    return `
      <button class="booking-action accept" type="button" onclick="changeBookingStatus(event, '${listing.id}', '${key}', 'accepted')">Accepteer</button>
      <button class="booking-action reject" type="button" onclick="changeBookingStatus(event, '${listing.id}', '${key}', 'rejected')">Wijs af</button>
    `;
  }
  if (period.status === "accepted") {
    return `<button class="booking-action cancel" type="button" onclick="changeBookingStatus(event, '${listing.id}', '${key}', 'cancelled')">Annuleer</button>`;
  }
  return "";
}

function bookingsForSession(session = getSession()) {
  if (!session) return [];
  return allListings()
    .flatMap((listing) => bookingsForListing(listing).map((period) => ({ listing, period })))
    .filter(({ period }) => (
      period.guestEmail === session.email ||
      normaliseLocationText(period.guest || "") === normaliseLocationText(session.name || "")
    ))
    .sort((a, b) => new Date(a.period.start) - new Date(b.period.start));
}

function renderTripsPage() {
  const root = document.querySelector("[data-trips-page]");
  if (!root) return;
  const session = getSession();
  if (!session) {
    root.innerHTML = authRequiredPanel(
      "Log in om je boekingen te zien",
      "Boekingen, betalingen en berichten horen bij je eigen account."
    );
    return;
  }
  const items = bookingsForSession(session);
  const upcoming = items.filter(({ period }) => new Date(period.end) >= new Date());
  const past = items.filter(({ period }) => new Date(period.end) < new Date());
  const renderTrip = ({ listing, period }) => `
    <article class="panel trip-card ${period.status}">
      <img src="${listing.image}" alt="${listing.title}">
      <div class="trip-card-body">
        <div class="trip-topline">
          <span class="booking-status ${period.status}">${bookingStatusLabel(period.status)}</span>
          <strong>${money(paymentTotal(listing, period.start, period.end))}</strong>
        </div>
        <h3>${listing.title}</h3>
        <p class="lead">${listing.city}, ${listing.region} · ${formatLongDate(period.start)} tot ${formatLongDate(period.end)} · ${listing.boat} inbegrepen</p>
        <div class="trip-actions">
          <a class="button secondary" href="listing.html?id=${listing.id}&checkin=${period.start}&checkout=${period.end}">Bekijk verblijf</a>
          <a class="button secondary" href="messages.html">Bericht verhuurder</a>
          ${bookingActionButtons(listing, period, "guest")}
        </div>
      </div>
    </article>
  `;
  root.innerHTML = `
    <div class="section-head dashboard-head">
      <div>
        <h1>Mijn boekingen</h1>
        <p class="lead">${items.length ? "Alle verblijven, betaalstatus en contact met verhuurders op één plek." : "Je hebt nog geen boekingen. Zoek een huis met boot en rond de betaling af om hier je verblijf te zien."}</p>
      </div>
      <a class="button" href="search.html">Nieuw verblijf zoeken</a>
    </div>
    ${items.length ? `
      <section class="trip-summary-grid">
        <div class="panel stat">Aankomende verblijven<strong>${upcoming.length}</strong></div>
        <div class="panel stat">Bevestigd<strong>${items.filter(({ period }) => period.status === "accepted").length}</strong></div>
        <div class="panel stat">Berichten<strong>${unreadMessages(session)}</strong></div>
      </section>
      <section class="dashboard-section">
        <h2>Aankomend</h2>
        <div class="trip-grid">${upcoming.length ? upcoming.map(renderTrip).join("") : `<div class="panel empty-state"><h3>Geen aankomende boekingen</h3><p class="lead">Je afgeronde of geannuleerde verblijven staan hieronder.</p></div>`}</div>
      </section>
      ${past.length ? `<section class="dashboard-section"><h2>Eerdere verblijven</h2><div class="trip-grid">${past.map(renderTrip).join("")}</div></section>` : ""}
    ` : `
      <section class="panel empty-state">
        <h2>Nog geen boekingen</h2>
        <p class="lead">Na betaling wordt je gekozen periode geblokkeerd en verschijnt de boeking hier.</p>
        <a class="button" href="search.html">Bekijk huizen</a>
      </section>
    `}
  `;
}

function initCardGalleries() {
  document.querySelectorAll("[data-card-gallery]").forEach((gallery) => {
    if (gallery.dataset.galleryReady === "true") return;
    gallery.dataset.galleryReady = "true";
    const track = gallery.querySelector("[data-card-gallery-track]");
    const slides = [...gallery.querySelectorAll("[data-card-gallery-slide]")];
    const dots = [...gallery.querySelectorAll("[data-card-gallery-dot]")];
    const count = gallery.querySelector("[data-card-gallery-count]");
    if (!track || slides.length <= 1) return;
    let index = 0;
    let startX = 0;
    let didDrag = false;
    let scrollTimer;

    const update = (nextIndex) => {
      index = Math.max(0, Math.min(slides.length - 1, nextIndex));
      dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === index));
      if (count) count.textContent = `${index + 1} / ${slides.length}`;
    };
    const goTo = (nextIndex) => {
      update((nextIndex + slides.length) % slides.length);
      track.scrollTo({ left: slides[index].offsetLeft, behavior: "smooth" });
    };
    const currentFromScroll = () => {
      const width = track.clientWidth || 1;
      update(Math.round(track.scrollLeft / width));
    };
    const stopCardNavigation = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    gallery.querySelector("[data-card-gallery-prev]")?.addEventListener("click", (event) => {
      stopCardNavigation(event);
      goTo(index - 1);
    });
    gallery.querySelector("[data-card-gallery-next]")?.addEventListener("click", (event) => {
      stopCardNavigation(event);
      goTo(index + 1);
    });
    track.addEventListener("scroll", () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(currentFromScroll, 80);
    });
    track.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
      didDrag = false;
    });
    track.addEventListener("pointermove", (event) => {
      if (Math.abs(event.clientX - startX) > 8) didDrag = true;
    });
    track.addEventListener("click", (event) => {
      if (!didDrag) return;
      stopCardNavigation(event);
      didDrag = false;
    });
    update(0);
  });
}

function initListingGallery() {
  document.querySelectorAll("[data-listing-gallery]").forEach((gallery) => {
    if (gallery.dataset.galleryReady === "true") return;
    gallery.dataset.galleryReady = "true";
    const thumbs = [...gallery.querySelectorAll("[data-gallery-index]")];
    const images = thumbs.map((thumb) => thumb.dataset.galleryImageUrl);
    const mainImage = gallery.querySelector("[data-gallery-main-image]");
    const lightbox = gallery.querySelector("[data-gallery-lightbox]");
    const lightboxImage = gallery.querySelector("[data-gallery-lightbox-image]");
    const counter = gallery.querySelector("[data-gallery-counter]");
    const lightboxCounter = gallery.querySelector("[data-gallery-lightbox-counter]");
    let index = 0;

    const setIndex = (nextIndex) => {
      index = (nextIndex + images.length) % images.length;
      if (mainImage) mainImage.src = images[index];
      if (lightboxImage) lightboxImage.src = images[index];
      if (counter) counter.textContent = `${index + 1} / ${images.length}`;
      if (lightboxCounter) lightboxCounter.textContent = `${index + 1} / ${images.length}`;
      thumbs.forEach((thumb, thumbIndex) => {
        thumb.classList.toggle("is-active", thumbIndex === index);
        if (thumbIndex === index) thumb.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      });
    };
    const next = () => setIndex(index + 1);
    const previous = () => setIndex(index - 1);
    const open = () => {
      if (!lightbox) return;
      lightbox.hidden = false;
      document.body.classList.add("has-gallery-lightbox");
    };
    const close = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.classList.remove("has-gallery-lightbox");
    };
    thumbs.forEach((thumb, thumbIndex) => thumb.addEventListener("click", () => setIndex(thumbIndex)));
    gallery.querySelector("[data-gallery-open]")?.addEventListener("click", open);
    gallery.querySelectorAll("[data-gallery-next]").forEach((button) => button.addEventListener("click", next));
    gallery.querySelectorAll("[data-gallery-prev]").forEach((button) => button.addEventListener("click", previous));
    gallery.querySelector("[data-gallery-close]")?.addEventListener("click", close);
    lightbox?.addEventListener("click", (event) => {
      if (event.target === lightbox) close();
    });
    document.addEventListener("keydown", (event) => {
      if (!lightbox || lightbox.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    });
    [gallery.querySelector("[data-gallery-open]"), lightboxImage].forEach((surface) => {
      if (!surface) return;
      let startX = 0;
      surface.addEventListener("pointerdown", (event) => {
        startX = event.clientX;
      });
      surface.addEventListener("pointerup", (event) => {
        const delta = event.clientX - startX;
        if (Math.abs(delta) < 42) return;
        delta < 0 ? next() : previous();
      });
    });
    setIndex(0);
  });
}

function normaliseBookingDates() {
  document.querySelectorAll("form[onsubmit^='submitBooking']").forEach((form) => {
    const checkin = form.querySelector("[name='checkin']");
    const checkout = form.querySelector("[name='checkout']");
    checkin?.addEventListener("change", () => {
      if (!checkout || !checkin.value) return;
      checkout.min = checkin.value;
      if (!checkout.value || new Date(checkout.value) <= new Date(checkin.value)) {
        const next = new Date(checkin.value);
        next.setDate(next.getDate() + 7);
        checkout.value = next.toISOString().slice(0, 10);
      }
      checkout.focus();
    });
  });
}

function startCheckoutPayment(event, listingId) {
  event.preventDefault();
  const form = event.currentTarget;
  const listing = allListings().find((item) => item.id === listingId);
  const message = form.querySelector("[data-booking-message]");
  if (!listing || !message) return;
  const session = getSession();
  if (!session) {
    message.textContent = "Log eerst in of maak een account aan om door te gaan naar betalen.";
    message.classList.add("form-warning");
    return;
  }
  const state = {
    checkin: form.querySelector("[name='checkin']").value,
    checkout: form.querySelector("[name='checkout']").value
  };
  if (!state.checkin || !state.checkout || new Date(state.checkout) <= new Date(state.checkin)) {
    message.textContent = "Kies eerst een geldige check-in en check-out datum.";
    message.classList.add("form-warning");
    form.dataset.dateMode = state.checkin ? "checkout" : "checkin";
    const popover = form.querySelector("[data-calendar-popover]");
    if (popover) popover.hidden = false;
    renderCalendar(form);
    return;
  }
  const availability = availabilityFor(listing, state);
  if (availability.status === "booked") {
    message.textContent = "Deze periode is bezet. Kies andere data voordat je betaalt.";
    message.classList.add("form-warning");
    return;
  }
  message.classList.remove("form-warning");
  const query = new URLSearchParams({
    listingId,
    checkin: state.checkin,
    checkout: state.checkout,
    guests: form.querySelector("[name='guests']")?.value || "1"
  });
  window.location.href = `payment.html?${query.toString()}`;
}

function submitBooking(event, listingId) {
  event.preventDefault();
  startCheckoutPayment(event, listingId);
}

function completeMockPayment(event, listingId) {
  event.preventDefault();
  const form = event.currentTarget;
  const listing = allListings().find((item) => item.id === listingId);
  const message = form.querySelector("[data-payment-message]");
  if (!listing || !message) return;
  const session = getSession();
  if (!session) {
    message.textContent = "Log eerst in om de betaling af te ronden.";
    message.classList.add("form-warning");
    return;
  }
  const state = {
    checkin: form.querySelector("[name='checkin']")?.value || "",
    checkout: form.querySelector("[name='checkout']")?.value || ""
  };
  const availability = availabilityFor(listing, state);
  if (!state.checkin || !state.checkout || availability.status === "booked") {
    message.textContent = "Deze periode is inmiddels niet meer beschikbaar. Kies andere data.";
    message.classList.add("form-warning");
    return;
  }
  const booking = {
    id: `booking-${Date.now()}`,
    listingId,
    start: state.checkin,
    end: state.checkout,
    guest: session.name,
    guestEmail: session.email,
    status: "accepted"
  };
  writeStore("nordicBoatBookings", [...localBookings(), booking]);
  writeStore("nordicBoatPayments", [
    ...localPayments(),
    {
      id: `payment-${Date.now()}`,
      bookingId: booking.id,
      listingId,
      amount: paymentTotal(listing, state.checkin, state.checkout),
      status: "paid",
      paidAt: new Date().toISOString()
    }
  ]);
  ensureBookingConversation(listing, booking, session);
  message.classList.remove("form-warning");
  message.textContent = "Betaling gelukt. De gekozen periode is nu geblokkeerd in de agenda.";
  form.querySelector("button[type='submit']")?.setAttribute("disabled", "");
  setTimeout(() => {
    window.location.href = `listing.html?id=${listingId}&checkin=${state.checkin}&checkout=${state.checkout}&paid=1`;
  }, 900);
}

function ensureBookingConversation(listing, booking, session) {
  const hostEmail = listingHostEmail(listing);
  const existing = allConversations().find((conversation) => (
    conversation.listingId === listing.id &&
    conversation.guestEmail === session.email
  ));
  if (existing) return;
  const conversation = {
    id: `conv-${Date.now()}`,
    guest: session.name,
    guestEmail: session.email,
    hostEmail,
    listingId: listing.id,
    stay: `${formatDate(booking.start)} - ${formatDate(booking.end)}`,
    status: booking.status,
    messages: [
      { from: "guest", text: booking.status === "accepted" ? "Hallo, ik heb betaald en de boeking is bevestigd." : "Hallo, ik heb net een boekingsaanvraag verstuurd. Is deze periode beschikbaar?", time: new Date().toLocaleTimeString(activeLocale(), { hour: "2-digit", minute: "2-digit" }) }
    ]
  };
  writeStore("nordicBoatConversations", [...localConversations(), conversation]);
}

function renderPaymentPage() {
  const root = document.querySelector("[data-payment-page]");
  if (!root) return;
  const query = params();
  const listingId = query.get("listingId") || query.get("id") || allListings()[0].id;
  const listing = allListings().find((item) => item.id === listingId);
  if (!listing) {
    root.innerHTML = `<section class="panel"><h1>Huisje niet gevonden</h1><p class="lead">Ga terug naar zoeken en kies opnieuw.</p></section>`;
    return;
  }
  const session = getSession();
  if (!session) {
    root.innerHTML = authRequiredPanel(
      "Log in om te betalen",
      "Je betaling en boeking worden gekoppeld aan je eigen account."
    );
    return;
  }
  const checkin = query.get("checkin") || "";
  const checkout = query.get("checkout") || "";
  const guests = query.get("guests") || "1";
  const nights = nightsBetween(checkin, checkout);
  const availability = availabilityFor(listing, { checkin, checkout });
  if (!checkin || !checkout || availability.status === "booked") {
    root.innerHTML = `
      <section class="panel auth-required">
        <h1>Deze periode is niet beschikbaar</h1>
        <p class="lead">Kies andere data op de huispagina. Pas na een geslaagde betaling wordt een periode geblokkeerd.</p>
        <div class="auth-actions"><a class="button" href="listing.html?id=${listing.id}">Andere data kiezen</a></div>
      </section>
    `;
    return;
  }
  root.innerHTML = `
    <section class="payment-layout">
      <article class="panel payment-card">
        <span class="badge">Veilige mock-betaling</span>
        <h1>Rond je boeking af</h1>
        <p class="lead">Na betaling wordt ${listing.title} direct geblokkeerd voor jouw gekozen data.</p>
        <div class="payment-steps" aria-label="Boekingsstappen">
          <span class="is-complete">Data gekozen</span>
          <span class="is-active">Betaling</span>
          <span>Bevestiging</span>
        </div>
        <form class="payment-form" onsubmit="completeMockPayment(event, '${listing.id}')">
          <input name="checkin" type="hidden" value="${checkin}">
          <input name="checkout" type="hidden" value="${checkout}">
          <div class="field"><label>Naam op kaart</label><input value="${session.name}" autocomplete="cc-name"></div>
          <div class="field"><label>Kaartnummer</label><input value="4242 4242 4242 4242" inputmode="numeric" autocomplete="cc-number"></div>
          <div class="payment-fields">
            <div class="field"><label>Vervaldatum</label><input value="12/30" autocomplete="cc-exp"></div>
            <div class="field"><label>CVC</label><input value="123" inputmode="numeric" autocomplete="cc-csc"></div>
          </div>
          <button class="button" type="submit">Betaal ${money(paymentTotal(listing, checkin, checkout))}</button>
          <p class="lead" data-payment-message></p>
        </form>
        <div class="payment-assurance-grid">
          <div><strong>Data blokkeren pas na betaling</strong><span>Zo blijft zoeken eerlijk en voorkom je dubbele reserveringen.</span></div>
          <div><strong>Berichtlijn wordt aangemaakt</strong><span>Na betaling kun je direct afstemmen over aankomst en bootinstructie.</span></div>
        </div>
      </article>
      <aside class="panel payment-summary">
        <img src="${listing.image}" alt="${listing.title}">
        <h2>${listing.title}</h2>
        <p class="lead">${listing.city}, ${listing.region} · ${guests} gasten</p>
        <div class="booking-total">
          ${formatLongDate(checkin)} tot ${formatLongDate(checkout)}<br>
          ${nights} nachten: ${money(bookingSubtotal(listing, checkin, checkout))}<br>
          Servicekosten: ${money(95)}<br>
          <strong>Totaal: ${money(paymentTotal(listing, checkin, checkout))}</strong>
        </div>
        <div class="cancellation-note">
          <strong>Annuleren</strong>
          <span>In deze MVP kun je je boeking terugvinden onder Mijn boekingen en daar annuleren. De datum komt dan weer vrij.</span>
        </div>
      </aside>
    </section>
  `;
}

function listingHostEmail(listing) {
  if (listing.hostEmail) return listing.hostEmail;
  return ["lofoten-hamnoy", "tromso-kvaloya"].includes(listing.id)
    ? "host@nordicboatstays.test"
    : "partner@nordicboatstays.test";
}

function hostListingsForSession(session = getSession()) {
  if (!session || session.role !== "host") return [];
  return allListings().filter((listing) => listingHostEmail(listing) === session.email);
}

function authRequiredPanel(title, text) {
  const current = `${window.location.pathname.split("/").pop() || "index.html"}${window.location.search || ""}`;
  return `
    <section class="panel auth-required">
      <h1>${title}</h1>
      <p class="lead">${text}</p>
      <div class="auth-actions">
        <a class="button" href="login.html?next=${encodeURIComponent(current)}">Inloggen</a>
        <a class="button secondary" href="index.html">Terug naar zoeken</a>
      </div>
    </section>
  `;
}

function protectHostDashboard() {
  const root = document.querySelector(".dashboard-layout");
  if (!root) return true;
  const session = getSession();
  if (!session) {
    root.innerHTML = authRequiredPanel(
      "Log in als verhuurder",
      "Je verhuurde huizen, boekingsaanvragen en beschikbaarheid zijn alleen zichtbaar voor het account dat erbij hoort."
    );
    return false;
  }
  if (session.role !== "host") {
    root.innerHTML = authRequiredPanel(
      "Geen verhuurdersaccount",
      "Dit account heeft geen verhuurde huizen. Log in met een verhuurdersaccount om het dashboard te openen."
    );
    return false;
  }
  return true;
}

function renderDashboardListings() {
  const target = document.querySelector("[data-host-listings]");
  if (!target) return;
  const hostListings = hostListingsForSession();
  target.innerHTML = hostListings.length ? `
    <div class="host-listing-grid">
      ${hostListings.map((listing) => {
        const nextBooking = nextBookingForListing(listing);
        return `
          <article class="panel host-listing-card">
            <img src="${listing.image}" alt="${listing.title}">
            <div class="host-listing-body">
              <div class="host-listing-topline"><span class="badge">Live op website</span><span>Vanaf ${money(listing.price)} / nacht</span></div>
              <h3>${listing.title}</h3>
              <p class="lead">${listing.city}, ${listing.region} · ${listing.guests} gasten · ${listing.bedrooms} slaapkamers · ${listing.boat}</p>
              <div class="host-next-booking">
                <strong>Eerstvolgende boeking</strong>
                <span>${nextBooking ? `${formatDate(nextBooking.start)} tot ${formatDate(nextBooking.end)} · ${nextBooking.guest || "Gast"} · ${nextBooking.status}` : "Geen komende boeking"}</span>
              </div>
              <div class="host-card-actions">
                <a class="button secondary" href="listing.html?id=${listing.id}">Bekijk pagina</a>
                <a class="button secondary" href="rent.html#boekingen">Boekingen bekijken</a>
              </div>
            </div>
          </article>
        `;
      }).join("")}
    </div>
  ` : `<div class="panel empty-state"><h3>Geen huizen gevonden</h3><p class="lead">Voeg je eerste vakantiehuis met boot toe om zichtbaar te worden op de website.</p><a class="button" href="new-listing.html">Huis toevoegen</a></div>`;
}

function renderHostStats() {
  const target = document.querySelector("[data-host-stats]");
  if (!target) return;
  const hostListings = hostListingsForSession();
  const bookings = hostListings.flatMap((listing) => bookingsForListing(listing));
  const pending = bookings.filter((period) => period.status === "pending").length;
  const accepted = bookings.filter((period) => period.status === "accepted").length;
  const active = bookings.filter((period) => !["rejected", "cancelled"].includes(period.status)).length;
  target.innerHTML = `
    <div class="panel stat">Jouw huizen<strong>${hostListings.length}</strong></div>
    <div class="panel stat">Pending aanvragen<strong>${pending}</strong></div>
    <div class="panel stat">Actieve boekingen<strong>${active || accepted}</strong></div>
  `;
}

function renderHostBookings() {
  const target = document.querySelector("[data-host-bookings]");
  if (!target) return;
  const hostListings = hostListingsForSession();
  const listingsWithBookings = hostListings
    .map((listing) => ({ listing, bookings: sortedBookingsForListing(listing) }))
    .filter(({ bookings }) => bookings.length);
  target.innerHTML = listingsWithBookings.length ? listingsWithBookings.map(({ listing, bookings }) => `
    <article class="host-booking-group">
      <div class="host-booking-group-head">
        <div>
          <strong>${listing.title}</strong>
          <p class="lead">${listing.city}, ${listing.region}</p>
        </div>
        <span class="badge">${bookings.length} ${bookings.length === 1 ? "boeking" : "boekingen"}</span>
      </div>
      <div class="host-booking-timeline">
        ${bookings.map((period) => `
          <div class="host-booking-row ${period.status}">
            <time>${formatDate(period.start)} - ${formatDate(period.end)}</time>
            <span>${period.guest || "Gast"}</span>
            <strong>${bookingStatusLabel(period.status)}</strong>
            <div class="booking-actions">${bookingActionButtons(listing, period, "host")}</div>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("") : `<div class="panel" style="box-shadow:none;background:var(--ice);"><strong>Geen boekingen</strong><p class="lead" style="margin-top:4px;">Voor dit account staan nog geen boekingen of aanvragen open.</p></div>`;
}

function availabilityPanel(listing) {
  const state = searchState();
  const availability = availabilityFor(listing, state);
  return `
    <div class="panel availability-panel">
      <div>
        <h2>Beschikbaarheid</h2>
        <p class="lead">${availability.label}</p>
      </div>
      <div class="availability-calendar">
        ${sortedBookingsForListing(listing).map((period) => `
          <div class="calendar-block">
            <span>${formatDate(period.start)} - ${formatDate(period.end)}</span>
            <strong>${period.status === "accepted" ? "Bezet" : "In aanvraag"}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderHostAvailability() {
  const target = document.querySelector("[data-host-availability]");
  if (!target) return;
  const hostListings = hostListingsForSession();
  target.innerHTML = hostListings.length ? hostListings.map((listing) => `
    <div class="availability-listing">
      <div>
        <strong>${listing.title}</strong>
        <p class="lead">${listing.region} · eerstvolgende bezette periodes</p>
      </div>
      <div class="availability-calendar compact">
        ${blockingBookingsForListing(listing).sort((a, b) => new Date(a.start) - new Date(b.start)).map((period) => `
          <div class="calendar-block ${period.status}">
            <span>${formatDate(period.start)} - ${formatDate(period.end)}</span>
            <strong>${bookingStatusLabel(period.status)}</strong>
          </div>
        `).join("") || `<div class="calendar-block muted"><span>Geen blokkades</span><strong>Vrij</strong></div>`}
      </div>
    </div>
  `).join("") : `<p class="lead">Geen beschikbaarheid om te tonen voor dit account.</p>`;
}

function hostListingFormFromEvent(event) {
  return event?.currentTarget?.closest?.("form") || event?.target?.closest?.("form") || event?.currentTarget;
}

function setHostPreviewState(form, ready) {
  if (!form) return;
  form.dataset.previewReady = ready ? "true" : "false";
  const publishButton = form.querySelector("[data-publish-after-preview]");
  if (publishButton) {
    publishButton.hidden = !ready;
    publishButton.disabled = !ready;
  }
}

function invalidateHostListingPreview(form) {
  if (!form || form.dataset.previewReady !== "true") return;
  setHostPreviewState(form, false);
  const preview = form.querySelector("[data-host-page-preview]");
  if (preview) {
    preview.hidden = true;
    preview.innerHTML = "";
  }
  const message = form.querySelector("[data-save-message]");
  if (message) message.textContent = "Je hebt iets aangepast. Bekijk eerst opnieuw het voorbeeld voordat je publiceert.";
}

function initHostListingPreviewGuards() {
  document.querySelectorAll("[data-host-listing-form]").forEach((form) => {
    if (form.dataset.previewGuardReady === "true") return;
    form.dataset.previewGuardReady = "true";
    ["input", "change"].forEach((eventName) => {
      form.addEventListener(eventName, (event) => {
        if (event.target.closest("[data-host-page-preview], [data-publish-after-preview]")) return;
        invalidateHostListingPreview(form);
      });
    });
  });
}

async function hostListingDraftFromForm(form, id = `local-${Date.now()}`) {
  const session = getSession();
  const message = form.querySelector("[data-save-message]");
  if (!session || session.role !== "host") {
    if (message) message.textContent = "Log eerst in als verhuurder om een huis toe te voegen.";
    return null;
  }
  await resolveAddressForForm(form);
  const coordinateValue = form.querySelector("[name='coordinates']")?.value.trim();
  if (!coordinateValue) {
    if (message) message.textContent = "Kies eerst een officieel adres uit de lijst, zodat plaats, regio en coördinaten kloppen.";
    return null;
  }
  const [latRaw, lngRaw] = coordinateValue.split(",");
  const sourceLanguage = currentLanguage();
  const title = form.querySelector("[name='title']")?.value.trim() || "Nieuw fjordhuis met boot";
  const description = form.querySelector("[name='description']")?.value || "Vakantiehuis aan het water met boot inbegrepen.";
  const boatSelect = form.querySelector("[name='boat']");
  const licenseSelect = form.querySelector("[name='licenseRequired']");
  const boat = boatSelect?.selectedOptions?.[0]?.textContent.trim() || boatSelect?.value || "Motorboot";
  const boatCapacity = form.querySelector("[name='boatCapacity']")?.value || "";
  const enginePower = form.querySelector("[name='enginePower']")?.value || "";
  const licenseRequired = licenseSelect?.selectedOptions?.[0]?.textContent.trim() || (licenseSelect?.value === "ja" ? "Ja" : "Nee");
  const safety = form.querySelector("[name='safety']")?.value || "Veiligheidsuitrusting inbegrepen";
  const translatedFields = { title, description, boat, boatCapacity, enginePower, licenseRequired, safety };
  let photoItems = [];
  try {
    photoItems = JSON.parse(form.querySelector("[name='photosJson']")?.value || "[]");
  } catch {
    photoItems = [];
  }
  const photos = photoItems.map((photo) => photo.src).filter(Boolean);
  const fallbackPhotos = [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Picturesque%20fiord%20%28Unsplash%29.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Lofoten%2C%20Norway%20%28Unsplash%20dVV1h3odR9s%29.jpg?width=900",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Oslofjord%2014.JPG?width=900"
  ];
  const imageSet = photos.length ? photos : fallbackPhotos;
  const amenities = [...form.querySelectorAll("[data-amenity]:checked")].map((input) => input.name);
  const monthlyPrices = {};
  for (let month = 1; month <= 12; month += 1) {
    const key = String(month).padStart(2, "0");
    const value = Number(form.querySelector(`[name='priceMonth${key}']`)?.value);
    if (value) monthlyPrices[key] = value;
  }
  let unavailableDates = [];
  try {
    unavailableDates = JSON.parse(form.querySelector("[name='unavailableDatesJson']")?.value || "[]");
  } catch {
    unavailableDates = [];
  }
  const blockedRanges = groupedDateRanges(unavailableDates).map((range) => ({
    ...range,
    guest: "Eigen blokkade",
    status: "accepted"
  }));
  return {
    id,
    hostEmail: session.email,
    title,
    city: (form.querySelector("[name='city']")?.value || "Noorwegen").replace(", Noorwegen", ""),
    region: form.querySelector("[name='region']")?.value || "Noorwegen",
    lat: Number(latRaw.trim()) || 60.39,
    lng: Number(lngRaw?.trim()) || 5.32,
    price: Number(form.querySelector("[name='price']")?.value) || 350,
    guests: Number(form.querySelector("[name='guests']")?.value) || 4,
    bedrooms: Number(form.querySelector("[name='bedrooms']")?.value) || 2,
    bathrooms: Number(form.querySelector("[name='bathrooms']")?.value) || undefined,
    beds: Number(form.querySelector("[name='beds']")?.value) || undefined,
    roomType: form.querySelector("[name='roomType']")?.value || "entire",
    propertyType: form.querySelector("[name='propertyType']")?.value || "house",
    waterfront: amenities.includes("waterfront"),
    dock: amenities.includes("dock"),
    sauna: amenities.includes("hotTub"),
    pets: amenities.includes("pets"),
    amenities,
    monthlyPrices,
    rating: 4.72,
    sourceLanguage,
    translations: buildListingTranslations(translatedFields, sourceLanguage),
    boat,
    boatCapacity,
    enginePower,
    licenseRequired,
    safety,
    booked: blockedRanges,
    image: imageSet[0],
    gallery: imageSet.slice(1),
    photoSettings: photoItems,
    description
  };
}

function renderHostPublishPreview(form, listing) {
  const target = form.querySelector("[data-host-page-preview]");
  if (!target) return;
  const images = cardGalleryImages(listing);
  const amenities = (listing.amenities || []).map((key) => filterLabels[key] || key).slice(0, 14);
  const monthlyPrices = Object.entries(listing.monthlyPrices || {});
  target.hidden = false;
  target.innerHTML = `
    <div class="host-preview-heading">
      <div>
        <span class="badge">Voorbeeld</span>
        <h2>Zo ziet je huispagina eruit voor huurders</h2>
        <p class="lead">Controleer foto's, tekst, prijs, bootinformatie en beschikbaarheid voordat je het huis live zet.</p>
      </div>
      <a class="button secondary" href="#nieuw-huis">Gegevens aanpassen</a>
    </div>
    <article class="host-page-browser">
      <div class="host-page-gallery" data-host-preview-gallery>
        <div class="host-preview-gallery-track" data-host-preview-gallery-track aria-label="Foto's van ${escapeHtml(listing.title)}">
          ${images.map((image, index) => `
            <figure class="host-preview-gallery-slide" data-host-preview-slide>
              <img src="${escapeHtml(image)}" alt="${escapeHtml(listing.title)} foto ${index + 1}">
            </figure>
          `).join("")}
        </div>
        ${images.length > 1 ? `
          <button class="host-preview-gallery-nav prev" type="button" data-host-preview-prev aria-label="Vorige foto">‹</button>
          <button class="host-preview-gallery-nav next" type="button" data-host-preview-next aria-label="Volgende foto">›</button>
          <span class="host-preview-gallery-count" data-host-preview-count>1 / ${images.length}</span>
          <div class="host-preview-gallery-dots" aria-hidden="true">
            ${images.map((_, index) => `<span class="${index === 0 ? "is-active" : ""}" data-host-preview-dot></span>`).join("")}
          </div>
        ` : ""}
      </div>
      <div class="host-page-content">
        <section>
          <h1>${escapeHtml(listing.title)}</h1>
          <p class="lead">${escapeHtml(listing.city)}, ${escapeHtml(listing.region)} · Score ${listing.rating} · ${listing.guests} gasten</p>
          <p class="lead">${escapeHtml(listing.description)}</p>
          <div class="listing-assurance host-preview-assurance">
            <span>Boot gecontroleerd</span>
            <span>Directe betaling</span>
            <span>Lokale vaartips</span>
          </div>
        </section>
        <aside class="host-page-summary">
          <strong>${money(priceForListing(listing))}</strong>
          <span>per nacht</span>
          <span>${listing.guests} gasten · ${listing.bedrooms} slaapkamers · ${listing.beds || listing.bedrooms + 1} bedden</span>
        </aside>
      </div>
      <div class="host-preview-grid">
        <section>
          <h3>Bootinformatie</h3>
          <div class="boat-grid">
            <div><strong>Type boot</strong><br>${escapeHtml(listing.boat)}</div>
            <div><strong>Capaciteit</strong><br>${escapeHtml(listing.boatCapacity || `${Math.min(listing.guests, 6)} personen`)}</div>
            <div><strong>Motorvermogen</strong><br>${escapeHtml(listing.enginePower || "75 pk")}</div>
            <div><strong>Vaarbewijs nodig</strong><br>${escapeHtml(listing.licenseRequired || "Nee")}</div>
            <div><strong>Veiligheid</strong><br>${escapeHtml(listing.safety || "Inbegrepen")}</div>
            <div><strong>Ligplaats</strong><br>${listing.dock ? "Eigen steiger" : "Bij het huis"}</div>
          </div>
        </section>
        <section>
          <h3>Voorzieningen</h3>
          <div class="host-preview-tags">
            ${amenities.length ? amenities.map((label) => `<span>${escapeHtml(label)}</span>`).join("") : "<span>Nog geen voorzieningen gekozen</span>"}
          </div>
          <h3>Prijzen</h3>
          <div class="host-preview-prices">
            ${monthlyPrices.length ? monthlyPrices.map(([month, price]) => `<span>${month}/${new Date().getFullYear()} ${money(price)}</span>`).join("") : `<span>Basisprijs ${money(listing.price)} per nacht</span>`}
          </div>
        </section>
      </div>
    </article>
  `;
  initHostPreviewGalleries();
}

function initHostPreviewGalleries() {
  document.querySelectorAll("[data-host-preview-gallery]").forEach((gallery) => {
    if (gallery.dataset.hostPreviewGalleryReady === "true") return;
    gallery.dataset.hostPreviewGalleryReady = "true";
    const track = gallery.querySelector("[data-host-preview-gallery-track]");
    const slides = [...gallery.querySelectorAll("[data-host-preview-slide]")];
    const dots = [...gallery.querySelectorAll("[data-host-preview-dot]")];
    const count = gallery.querySelector("[data-host-preview-count]");
    if (!track || !slides.length) return;
    let activeIndex = 0;
    let animationFrame = 0;

    const update = () => {
      const trackLeft = track.scrollLeft;
      activeIndex = slides.reduce((closestIndex, slide, index) => (
        Math.abs(slide.offsetLeft - trackLeft) < Math.abs(slides[closestIndex].offsetLeft - trackLeft) ? index : closestIndex
      ), 0);
      dots.forEach((dot, index) => dot.classList.toggle("is-active", index === activeIndex));
      if (count) count.textContent = `${activeIndex + 1} / ${slides.length}`;
    };

    const scrollToIndex = (index) => {
      const nextIndex = (index + slides.length) % slides.length;
      track.scrollTo({ left: slides[nextIndex].offsetLeft, behavior: "smooth" });
    };

    gallery.querySelector("[data-host-preview-prev]")?.addEventListener("click", () => scrollToIndex(activeIndex - 1));
    gallery.querySelector("[data-host-preview-next]")?.addEventListener("click", () => scrollToIndex(activeIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => scrollToIndex(index)));
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    }, { passive: true });
    update();
  });
}

async function previewHostListing(event) {
  event.preventDefault();
  const form = hostListingFormFromEvent(event);
  const message = form.querySelector("[data-save-message]");
  const listing = await hostListingDraftFromForm(form, `preview-${Date.now()}`);
  if (!listing) {
    setHostPreviewState(form, false);
    return;
  }
  renderHostPublishPreview(form, localizedListing(listing));
  setHostPreviewState(form, true);
  if (message) message.textContent = "Controleer het voorbeeld. Als alles klopt kun je het huis nu publiceren.";
  applyStoredLanguage();
  form.querySelector("[data-host-page-preview]")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function saveHostListing(event) {
  event.preventDefault();
  const form = hostListingFormFromEvent(event);
  const message = form.querySelector("[data-save-message]");
  if (form.dataset.previewReady !== "true") {
    if (message) message.textContent = "Bekijk eerst het voorbeeld van je huispagina voordat je publiceert.";
    await previewHostListing(event);
    return;
  }
  const listing = await hostListingDraftFromForm(form, `local-${Date.now()}`);
  if (!listing) return;
  writeStore("nordicBoatListings", [...localListings(), listing]);
  if (message) message.textContent = `${listing.title} is gepubliceerd en zichtbaar in je dashboard.`;
  renderHostStats();
  renderDashboardListings();
  renderHostBookings();
  renderHostAvailability();
  applyStoredLanguage();
  if (form.dataset.redirectAfterSave === "true") {
    setTimeout(() => {
      window.location.href = "rent.html";
    }, 750);
  }
}

function renderMessages() {
  const root = document.querySelector("[data-messages]");
  if (!root) return;
  const session = getSession();
  if (!session) {
    root.innerHTML = authRequiredPanel(
      "Log in voor berichten",
      "Berichten tussen huurder en verhuurder zijn privé en worden alleen getoond aan de juiste gebruiker."
    );
    return;
  }
  const visibleConversations = allConversations().filter((conversation) => (
    conversation.hostEmail === session.email || conversation.guestEmail === session.email
  ));
  if (!visibleConversations.length) {
    root.innerHTML = `
      <section class="panel auth-required">
        <h1>Geen berichten</h1>
        <p class="lead">Er zijn geen gesprekken gekoppeld aan ${session.email}.</p>
        <div class="auth-actions"><a class="button secondary" href="index.html">Terug naar zoeken</a></div>
      </section>
    `;
    return;
  }
  const activeId = params().get("conversation") || visibleConversations[0].id;
  const active = visibleConversations.find((conversation) => conversation.id === activeId) || visibleConversations[0];
  const listing = allListings().find((item) => item.id === active.listingId) || allListings()[0];
  markConversationRead(active, session);
  root.innerHTML = `
    <aside class="panel conversation-list">
      ${visibleConversations.map((conversation) => {
        const item = allListings().find((listingItem) => listingItem.id === conversation.listingId) || allListings()[0];
        const unread = isConversationUnread(conversation, session);
        return `
          <a class="conversation-card ${conversation.id === active.id ? "is-active" : ""}" href="messages.html?conversation=${conversation.id}">
            <strong>${conversation.guest}${unread ? ` <span class="nav-unread inline-unread">Nieuw</span>` : ""}</strong>
            <p class="lead" style="margin-top:4px;">${item.title}</p>
            <span class="badge">${conversation.status}</span>
          </a>
        `;
      }).join("")}
    </aside>
    <section class="panel chat-panel">
      <div class="chat-header">
        <h2>${active.guest}</h2>
        <p class="lead">${listing.title} · ${active.stay} · ${listing.boat} inbegrepen</p>
      </div>
      <div class="message-list" data-message-list>
        ${active.messages.map((message) => `
          <div class="message ${message.from === "host" ? "host" : "guest"}">
            ${message.text}
            <small>${message.from === "host" ? "Verhuurder" : active.guest} · ${message.time}</small>
          </div>
        `).join("")}
      </div>
      <form class="message-form" onsubmit="sendHostMessage(event)" data-conversation-id="${active.id}">
        <div class="field"><textarea name="message" placeholder="Typ een bericht..."></textarea></div>
        <button class="button" type="submit">Verstuur</button>
      </form>
    </section>
  `;
  renderSessionState();
}

function sendHostMessage(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const input = form.querySelector("[name='message']");
  const value = input.value.trim();
  if (!value) return;
  const list = document.querySelector("[data-message-list]");
  const session = getSession();
  const from = session?.role === "host" ? "host" : "guest";
  const sender = from === "host" ? "Verhuurder" : session?.name || "Huurder";
  const now = new Date();
  const time = now.toLocaleTimeString(activeLocale(), { hour: "2-digit", minute: "2-digit" });
  list.insertAdjacentHTML("beforeend", `
    <div class="message ${from}">
      ${value.replace(/[<>&]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[char])}
      <small>${sender} · ${time}</small>
    </div>
  `);
  input.value = "";
  list.scrollTop = list.scrollHeight;
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem("nordicBoatSession") || "null");
  } catch {
    return null;
  }
}

function unreadMessages(session = getSession()) {
  if (!session) return 0;
  return allConversations().filter((conversation) => (
    (conversation.hostEmail === session.email || conversation.guestEmail === session.email) &&
    isConversationUnread(conversation, session)
  )).length;
}

const languageOptions = {
  nl: { code: "NL", flag: "🇳🇱", label: "Nederlands", locale: "nl-NL", htmlLang: "nl" },
  no: { code: "NO", flag: "🇳🇴", label: "Norsk", locale: "nb-NO", htmlLang: "no" },
  sv: { code: "SV", flag: "🇸🇪", label: "Svenska", locale: "sv-SE", htmlLang: "sv" },
  da: { code: "DA", flag: "🇩🇰", label: "Dansk", locale: "da-DK", htmlLang: "da" },
  de: { code: "DE", flag: "🇩🇪", label: "Deutsch", locale: "de-DE", htmlLang: "de" },
  en: { code: "EN", flag: "🇬🇧", label: "English", locale: "en-GB", htmlLang: "en" },
  es: { code: "ES", flag: "🇪🇸", label: "Español", locale: "es-ES", htmlLang: "es" },
  fr: { code: "FR", flag: "🇫🇷", label: "Français", locale: "fr-FR", htmlLang: "fr" }
};

const listingTranslationFields = [
  "title",
  "description",
  "boat",
  "boatCapacity",
  "enginePower",
  "licenseRequired",
  "safety"
];

const commonTranslationLabels = {
  no: { "Ja": "Ja", "Nee": "Nei", "Motorboot": "Motorbåt", "Vissersboot": "Fiskebåt", "Kajuitboot": "Kabinbåt", "Vorige foto": "Forrige bilde", "Volgende foto": "Neste bilde", "per nacht": "per natt", "Taal": "Språk", "Uitbetalingen": "Utbetalinger", "Veilig via Stripe": "Sikkert via Stripe", "Nog niet gekoppeld": "Ikke tilkoblet ennå", "Ontvang inkomsten veilig op je eigen bankrekening.": "Motta inntekter trygt på din egen bankkonto.", "Identiteits- en bankgegevens worden later rechtstreeks door Stripe gecontroleerd. Nordic Boat Stays slaat deze gevoelige gegevens niet zelf op.": "Identitets- og bankopplysninger kontrolleres senere direkte av Stripe. Nordic Boat Stays lagrer ikke disse sensitive opplysningene.", "Stripe koppelen - binnenkort": "Koble til Stripe - kommer snart" },
  sv: { "Ja": "Ja", "Nee": "Nej", "Motorboot": "Motorbåt", "Vissersboot": "Fiskebåt", "Kajuitboot": "Kabinbåt", "Vorige foto": "Föregående foto", "Volgende foto": "Nästa foto", "per nacht": "per natt", "Taal": "Språk", "Uitbetalingen": "Utbetalningar", "Veilig via Stripe": "Säkert via Stripe", "Nog niet gekoppeld": "Inte anslutet ännu", "Ontvang inkomsten veilig op je eigen bankrekening.": "Ta emot intäkter säkert på ditt eget bankkonto.", "Identiteits- en bankgegevens worden later rechtstreeks door Stripe gecontroleerd. Nordic Boat Stays slaat deze gevoelige gegevens niet zelf op.": "Identitets- och bankuppgifter kontrolleras senare direkt av Stripe. Nordic Boat Stays lagrar inte dessa känsliga uppgifter.", "Stripe koppelen - binnenkort": "Anslut Stripe - kommer snart" },
  da: { "Ja": "Ja", "Nee": "Nej", "Motorboot": "Motorbåd", "Vissersboot": "Fiskerbåd", "Kajuitboot": "Kabinebåd", "Vorige foto": "Forrige foto", "Volgende foto": "Næste foto", "per nacht": "per nat", "Taal": "Sprog", "Uitbetalingen": "Udbetalinger", "Veilig via Stripe": "Sikkert via Stripe", "Nog niet gekoppeld": "Ikke tilknyttet endnu", "Ontvang inkomsten veilig op je eigen bankrekening.": "Modtag indtægter sikkert på din egen bankkonto.", "Identiteits- en bankgegevens worden later rechtstreeks door Stripe gecontroleerd. Nordic Boat Stays slaat deze gevoelige gegevens niet zelf op.": "Identitets- og bankoplysninger kontrolleres senere direkte af Stripe. Nordic Boat Stays gemmer ikke selv disse følsomme oplysninger.", "Stripe koppelen - binnenkort": "Tilknyt Stripe - kommer snart" },
  de: { "Ja": "Ja", "Nee": "Nein", "Motorboot": "Motorboot", "Vissersboot": "Fischerboot", "Kajuitboot": "Kajütboot", "Vorige foto": "Vorheriges Foto", "Volgende foto": "Nächstes Foto", "per nacht": "pro Nacht", "Taal": "Sprache", "Uitbetalingen": "Auszahlungen", "Veilig via Stripe": "Sicher über Stripe", "Nog niet gekoppeld": "Noch nicht verbunden", "Ontvang inkomsten veilig op je eigen bankrekening.": "Erhalte Einnahmen sicher auf dein eigenes Bankkonto.", "Identiteits- en bankgegevens worden later rechtstreeks door Stripe gecontroleerd. Nordic Boat Stays slaat deze gevoelige gegevens niet zelf op.": "Identitäts- und Bankdaten werden später direkt von Stripe geprüft. Nordic Boat Stays speichert diese sensiblen Daten nicht selbst.", "Stripe koppelen - binnenkort": "Stripe verbinden - demnächst" },
  en: { "Ja": "Yes", "Nee": "No", "Motorboot": "Motorboat", "Vissersboot": "Fishing boat", "Kajuitboot": "Cabin boat", "Vorige foto": "Previous photo", "Volgende foto": "Next photo", "per nacht": "per night", "Taal": "Language", "Uitbetalingen": "Payouts", "Veilig via Stripe": "Secure through Stripe", "Nog niet gekoppeld": "Not connected yet", "Ontvang inkomsten veilig op je eigen bankrekening.": "Receive earnings securely in your own bank account.", "Identiteits- en bankgegevens worden later rechtstreeks door Stripe gecontroleerd. Nordic Boat Stays slaat deze gevoelige gegevens niet zelf op.": "Identity and bank details will later be verified directly by Stripe. Nordic Boat Stays does not store this sensitive information.", "Stripe koppelen - binnenkort": "Connect Stripe - coming soon" },
  es: { "Ja": "Sí", "Nee": "No", "Motorboot": "Lancha motora", "Vissersboot": "Barco de pesca", "Kajuitboot": "Barco cabinado", "Vorige foto": "Foto anterior", "Volgende foto": "Foto siguiente", "per nacht": "por noche", "Taal": "Idioma", "Uitbetalingen": "Pagos", "Veilig via Stripe": "Seguro mediante Stripe", "Nog niet gekoppeld": "Aún no conectado", "Ontvang inkomsten veilig op je eigen bankrekening.": "Recibe tus ingresos de forma segura en tu propia cuenta bancaria.", "Identiteits- en bankgegevens worden later rechtstreeks door Stripe gecontroleerd. Nordic Boat Stays slaat deze gevoelige gegevens niet zelf op.": "Los datos de identidad y bancarios serán verificados más adelante directamente por Stripe. Nordic Boat Stays no almacena esta información sensible.", "Stripe koppelen - binnenkort": "Conectar Stripe - próximamente" },
  fr: { "Ja": "Oui", "Nee": "Non", "Motorboot": "Bateau à moteur", "Vissersboot": "Bateau de pêche", "Kajuitboot": "Bateau à cabine", "Vorige foto": "Photo précédente", "Volgende foto": "Photo suivante", "per nacht": "par nuit", "Taal": "Langue", "Uitbetalingen": "Versements", "Veilig via Stripe": "Sécurisé via Stripe", "Nog niet gekoppeld": "Pas encore connecté", "Ontvang inkomsten veilig op je eigen bankrekening.": "Recevez vos revenus en toute sécurité sur votre propre compte bancaire.", "Identiteits- en bankgegevens worden later rechtstreeks door Stripe gecontroleerd. Nordic Boat Stays slaat deze gevoelige gegevens niet zelf op.": "Les données d'identité et bancaires seront vérifiées ultérieurement directement par Stripe. Nordic Boat Stays ne stocke pas ces informations sensibles.", "Stripe koppelen - binnenkort": "Connecter Stripe - bientôt" }
};

const workflowTranslations = {
  no: {
    "Voorbeeld": "Forhåndsvisning",
    "Voorbeeld bekijken": "Se forhåndsvisning",
    "Huis publiceren": "Publiser hus",
    "Gegevens aanpassen": "Endre opplysninger",
    "Zo ziet je huispagina eruit voor huurders": "Slik ser hussiden din ut for leietakere",
    "Controleer foto's, tekst, prijs, bootinformatie en beschikbaarheid voordat je het huis live zet.": "Kontroller bilder, tekst, pris, båtinformasjon og tilgjengelighet før huset publiseres.",
    "Controleer het voorbeeld. Als alles klopt kun je het huis nu publiceren.": "Kontroller forhåndsvisningen. Hvis alt stemmer, kan du publisere huset nå.",
    "Je hebt iets aangepast. Bekijk eerst opnieuw het voorbeeld voordat je publiceert.": "Du har endret noe. Se forhåndsvisningen på nytt før du publiserer.",
    "Bekijk eerst het voorbeeld van je huispagina voordat je publiceert.": "Se først forhåndsvisningen av hussiden før du publiserer.",
    "Nog geen voorzieningen gekozen": "Ingen fasiliteter valgt ennå",
    "Basisprijs": "Grunnpris",
    "Bij het huis": "Ved huset",
    "Prijzen": "Priser"
  },
  sv: {
    "Voorbeeld": "Förhandsvisning",
    "Voorbeeld bekijken": "Visa förhandsvisning",
    "Huis publiceren": "Publicera huset",
    "Gegevens aanpassen": "Ändra uppgifter",
    "Zo ziet je huispagina eruit voor huurders": "Så här ser din hussida ut för gäster",
    "Controleer foto's, tekst, prijs, bootinformatie en beschikbaarheid voordat je het huis live zet.": "Kontrollera bilder, text, pris, båtinformation och tillgänglighet innan huset publiceras.",
    "Controleer het voorbeeld. Als alles klopt kun je het huis nu publiceren.": "Kontrollera förhandsvisningen. Om allt stämmer kan du publicera huset nu.",
    "Je hebt iets aangepast. Bekijk eerst opnieuw het voorbeeld voordat je publiceert.": "Du har ändrat något. Visa förhandsvisningen igen innan du publicerar.",
    "Bekijk eerst het voorbeeld van je huispagina voordat je publiceert.": "Visa först förhandsvisningen av hussidan innan du publicerar.",
    "Nog geen voorzieningen gekozen": "Inga bekvämligheter valda än",
    "Basisprijs": "Grundpris",
    "Bij het huis": "Vid huset",
    "Prijzen": "Priser"
  },
  da: {
    "Voorbeeld": "Forhåndsvisning",
    "Voorbeeld bekijken": "Se forhåndsvisning",
    "Huis publiceren": "Udgiv hus",
    "Gegevens aanpassen": "Rediger oplysninger",
    "Zo ziet je huispagina eruit voor huurders": "Sådan ser din husside ud for lejere",
    "Controleer foto's, tekst, prijs, bootinformatie en beschikbaarheid voordat je het huis live zet.": "Kontroller billeder, tekst, pris, bådoplysninger og tilgængelighed, før huset udgives.",
    "Controleer het voorbeeld. Als alles klopt kun je het huis nu publiceren.": "Kontroller forhåndsvisningen. Hvis alt stemmer, kan du udgive huset nu.",
    "Je hebt iets aangepast. Bekijk eerst opnieuw het voorbeeld voordat je publiceert.": "Du har ændret noget. Se forhåndsvisningen igen, før du udgiver.",
    "Bekijk eerst het voorbeeld van je huispagina voordat je publiceert.": "Se først forhåndsvisningen af hussiden, før du udgiver.",
    "Nog geen voorzieningen gekozen": "Ingen faciliteter valgt endnu",
    "Basisprijs": "Basispris",
    "Bij het huis": "Ved huset",
    "Prijzen": "Priser"
  },
  de: {
    "Voorbeeld": "Vorschau",
    "Voorbeeld bekijken": "Vorschau ansehen",
    "Huis publiceren": "Haus veröffentlichen",
    "Gegevens aanpassen": "Angaben bearbeiten",
    "Zo ziet je huispagina eruit voor huurders": "So sieht deine Hausseite für Gäste aus",
    "Controleer foto's, tekst, prijs, bootinformatie en beschikbaarheid voordat je het huis live zet.": "Prüfe Fotos, Text, Preis, Bootsinformationen und Verfügbarkeit, bevor du das Haus veröffentlichst.",
    "Controleer het voorbeeld. Als alles klopt kun je het huis nu publiceren.": "Prüfe die Vorschau. Wenn alles stimmt, kannst du das Haus jetzt veröffentlichen.",
    "Je hebt iets aangepast. Bekijk eerst opnieuw het voorbeeld voordat je publiceert.": "Du hast etwas geändert. Sieh dir vor dem Veröffentlichen zuerst erneut die Vorschau an.",
    "Bekijk eerst het voorbeeld van je huispagina voordat je publiceert.": "Sieh dir zuerst die Vorschau deiner Hausseite an, bevor du veröffentlichst.",
    "Nog geen voorzieningen gekozen": "Noch keine Ausstattung gewählt",
    "Basisprijs": "Grundpreis",
    "Bij het huis": "Beim Haus",
    "Prijzen": "Preise"
  },
  en: {
    "Voorbeeld": "Preview",
    "Voorbeeld bekijken": "View preview",
    "Huis publiceren": "Publish home",
    "Gegevens aanpassen": "Edit details",
    "Zo ziet je huispagina eruit voor huurders": "This is how your home page looks to guests",
    "Controleer foto's, tekst, prijs, bootinformatie en beschikbaarheid voordat je het huis live zet.": "Check photos, text, price, boat information and availability before publishing the home.",
    "Controleer het voorbeeld. Als alles klopt kun je het huis nu publiceren.": "Check the preview. If everything looks right, you can publish the home now.",
    "Je hebt iets aangepast. Bekijk eerst opnieuw het voorbeeld voordat je publiceert.": "You changed something. View the preview again before publishing.",
    "Bekijk eerst het voorbeeld van je huispagina voordat je publiceert.": "View the preview of your home page before publishing.",
    "Nog geen voorzieningen gekozen": "No amenities selected yet",
    "Basisprijs": "Base price",
    "Bij het huis": "At the home",
    "Prijzen": "Prices"
  },
  es: {
    "Voorbeeld": "Vista previa",
    "Voorbeeld bekijken": "Ver vista previa",
    "Huis publiceren": "Publicar casa",
    "Gegevens aanpassen": "Editar datos",
    "Zo ziet je huispagina eruit voor huurders": "Así ven los huéspedes la página de tu casa",
    "Controleer foto's, tekst, prijs, bootinformatie en beschikbaarheid voordat je het huis live zet.": "Comprueba fotos, texto, precio, información del barco y disponibilidad antes de publicar la casa.",
    "Controleer het voorbeeld. Als alles klopt kun je het huis nu publiceren.": "Revisa la vista previa. Si todo está bien, puedes publicar la casa ahora.",
    "Je hebt iets aangepast. Bekijk eerst opnieuw het voorbeeld voordat je publiceert.": "Has cambiado algo. Vuelve a ver la vista previa antes de publicar.",
    "Bekijk eerst het voorbeeld van je huispagina voordat je publiceert.": "Primero revisa la vista previa de la página de tu casa antes de publicar.",
    "Nog geen voorzieningen gekozen": "Aún no hay servicios seleccionados",
    "Basisprijs": "Precio base",
    "Bij het huis": "En la casa",
    "Prijzen": "Precios"
  },
  fr: {
    "Voorbeeld": "Aperçu",
    "Voorbeeld bekijken": "Voir l'aperçu",
    "Huis publiceren": "Publier le logement",
    "Gegevens aanpassen": "Modifier les informations",
    "Zo ziet je huispagina eruit voor huurders": "Voici à quoi ressemble votre page pour les voyageurs",
    "Controleer foto's, tekst, prijs, bootinformatie en beschikbaarheid voordat je het huis live zet.": "Vérifiez les photos, le texte, le prix, les informations du bateau et les disponibilités avant de publier le logement.",
    "Controleer het voorbeeld. Als alles klopt kun je het huis nu publiceren.": "Vérifiez l'aperçu. Si tout est correct, vous pouvez publier le logement.",
    "Je hebt iets aangepast. Bekijk eerst opnieuw het voorbeeld voordat je publiceert.": "Vous avez modifié quelque chose. Revoyez l'aperçu avant de publier.",
    "Bekijk eerst het voorbeeld van je huispagina voordat je publiceert.": "Consultez d'abord l'aperçu de votre page avant de publier.",
    "Nog geen voorzieningen gekozen": "Aucun équipement sélectionné",
    "Basisprijs": "Prix de base",
    "Bij het huis": "Au logement",
    "Prijzen": "Prix"
  }
};

const translations = {
  no: {
    "Home": "Hjem", "Zoeken": "Søk", "Verhuren": "Lei ut", "Berichten": "Meldinger", "Boekingen": "Bestillinger", "Favorieten": "Favoritter", "Contact": "Kontakt", "Inloggen": "Logg inn", "Uitloggen": "Logg ut", "Dashboard": "Kontrollpanel",
    "Vakantiehuizen": "Feriehus", "Verhuurders": "Utleiere", "Waar wil je naartoe?": "Hvor vil du dra?", "Incheckdatum": "Innsjekkingsdato", "Uitcheckdatum": "Utsjekkingsdato", "Check-in": "Innsjekking", "Check-out": "Utsjekking", "Gasten": "Gjester", "Filters": "Filtre", "Zoek": "Søk", "Zoek opnieuw": "Søk på nytt", "Wis": "Nullstill", "Wis filters": "Nullstill filtre", "Filters toepassen": "Bruk filtre",
    "Kies incheckdatum": "Velg innsjekking", "Kies uitcheckdatum": "Velg utsjekking", "Kies je incheckdatum": "Velg innsjekkingsdato", "Kies nu je uitcheckdatum": "Velg nå utsjekkingsdato", "Exacte datums": "Eksakte datoer",
    "Sorteren": "Sorter", "Aanbevolen": "Anbefalt", "Laagste prijs eerst": "Laveste pris først", "Hoogste prijs eerst": "Høyeste pris først", "Hoogste score eerst": "Høyeste vurdering først", "Populairst eerst": "Mest populære først",
    "Type ruimte": "Romtype", "Alle": "Alle", "Kamer": "Rom", "Hele woning": "Hele boligen", "Prijsbereik": "Prisområde", "Kamers en bedden": "Rom og senger", "Slaapkamers": "Soverom", "Bedden": "Senger", "Badkamers": "Bad", "Voorzieningen": "Fasiliteter", "Populair": "Populært", "Basics": "Grunnleggende", "Extra's": "Ekstra", "Locatie": "Sted", "Veiligheid": "Sikkerhet", "Boekingsopties": "Bestillingsvalg", "Woningtype": "Boligtype",
    "Bekijk huisje": "Se huset", "Beschikbaar voor deze data": "Tilgjengelig for disse datoene", "Kies data voor beschikbaarheid": "Velg datoer for tilgjengelighet", "Boot gecontroleerd": "Båt kontrollert", "Directe betaling": "Direkte betaling", "Lokale vaartips": "Lokale båttips", "Bewaren": "Lagre", "Bewaard": "Lagret",
    "Mijn boekingen": "Mine bestillinger", "Nieuw verblijf zoeken": "Søk etter nytt opphold", "Ga naar betaling": "Gå til betaling", "Rond je boeking af": "Fullfør bestillingen", "Betaling": "Betaling", "Bevestiging": "Bekreftelse", "Annuleren": "Avbryt", "Verstuur": "Send", "Typ een bericht...": "Skriv en melding..."
  },
  sv: {
    "Home": "Hem", "Zoeken": "Sök", "Verhuren": "Hyr ut", "Berichten": "Meddelanden", "Boekingen": "Bokningar", "Favorieten": "Favoriter", "Contact": "Kontakt", "Inloggen": "Logga in", "Uitloggen": "Logga ut", "Dashboard": "Kontrollpanel",
    "Vakantiehuizen": "Semesterhus", "Verhuurders": "Uthyrare", "Waar wil je naartoe?": "Vart vill du åka?", "Incheckdatum": "Incheckningsdatum", "Uitcheckdatum": "Utcheckningsdatum", "Check-in": "Incheckning", "Check-out": "Utcheckning", "Gasten": "Gäster", "Filters": "Filter", "Zoek": "Sök", "Zoek opnieuw": "Sök igen", "Wis": "Rensa", "Wis filters": "Rensa filter", "Filters toepassen": "Använd filter",
    "Kies incheckdatum": "Välj incheckning", "Kies uitcheckdatum": "Välj utcheckning", "Kies je incheckdatum": "Välj incheckningsdatum", "Kies nu je uitcheckdatum": "Välj nu utcheckningsdatum", "Exacte datums": "Exakta datum",
    "Sorteren": "Sortera", "Aanbevolen": "Rekommenderat", "Laagste prijs eerst": "Lägsta pris först", "Hoogste prijs eerst": "Högsta pris först", "Hoogste score eerst": "Högsta betyg först", "Populairst eerst": "Mest populära först",
    "Type ruimte": "Typ av boende", "Alle": "Alla", "Kamer": "Rum", "Hele woning": "Hela boendet", "Prijsbereik": "Prisintervall", "Kamers en bedden": "Rum och sängar", "Slaapkamers": "Sovrum", "Bedden": "Sängar", "Badkamers": "Badrum", "Voorzieningen": "Bekvämligheter", "Populair": "Populärt", "Basics": "Grunder", "Extra's": "Extra", "Locatie": "Plats", "Veiligheid": "Säkerhet", "Boekingsopties": "Bokningsalternativ", "Woningtype": "Boendetyp",
    "Bekijk huisje": "Visa huset", "Beschikbaar voor deze data": "Tillgängligt för dessa datum", "Kies data voor beschikbaarheid": "Välj datum för tillgänglighet", "Boot gecontroleerd": "Båten kontrollerad", "Directe betaling": "Direkt betalning", "Lokale vaartips": "Lokala båttips", "Bewaren": "Spara", "Bewaard": "Sparad",
    "Mijn boekingen": "Mina bokningar", "Nieuw verblijf zoeken": "Sök nytt boende", "Ga naar betaling": "Gå till betalning", "Rond je boeking af": "Slutför bokningen", "Betaling": "Betalning", "Bevestiging": "Bekräftelse", "Annuleren": "Avboka", "Verstuur": "Skicka", "Typ een bericht...": "Skriv ett meddelande..."
  },
  da: {
    "Home": "Hjem", "Zoeken": "Søg", "Verhuren": "Udlej", "Berichten": "Beskeder", "Boekingen": "Bookinger", "Favorieten": "Favoritter", "Contact": "Kontakt", "Inloggen": "Log ind", "Uitloggen": "Log ud", "Dashboard": "Dashboard",
    "Vakantiehuizen": "Feriehuse", "Verhuurders": "Udlejere", "Waar wil je naartoe?": "Hvor vil du hen?", "Incheckdatum": "Indtjekningsdato", "Uitcheckdatum": "Udtjekningsdato", "Check-in": "Indtjekning", "Check-out": "Udtjekning", "Gasten": "Gæster", "Filters": "Filtre", "Zoek": "Søg", "Zoek opnieuw": "Søg igen", "Wis": "Ryd", "Wis filters": "Ryd filtre", "Filters toepassen": "Anvend filtre",
    "Kies incheckdatum": "Vælg indtjekning", "Kies uitcheckdatum": "Vælg udtjekning", "Kies je incheckdatum": "Vælg din indtjekningsdato", "Kies nu je uitcheckdatum": "Vælg nu din udtjekningsdato", "Exacte datums": "Præcise datoer",
    "Sorteren": "Sorter", "Aanbevolen": "Anbefalet", "Laagste prijs eerst": "Laveste pris først", "Hoogste prijs eerst": "Højeste pris først", "Hoogste score eerst": "Højeste vurdering først", "Populairst eerst": "Mest populære først",
    "Type ruimte": "Rumtype", "Alle": "Alle", "Kamer": "Værelse", "Hele woning": "Hele boligen", "Prijsbereik": "Prisinterval", "Kamers en bedden": "Værelser og senge", "Slaapkamers": "Soveværelser", "Bedden": "Senge", "Badkamers": "Badeværelser", "Voorzieningen": "Faciliteter", "Populair": "Populært", "Basics": "Basis", "Extra's": "Ekstra", "Locatie": "Beliggenhed", "Veiligheid": "Sikkerhed", "Boekingsopties": "Bookingmuligheder", "Woningtype": "Boligtype",
    "Bekijk huisje": "Se huset", "Beschikbaar voor deze data": "Ledigt på disse datoer", "Kies data voor beschikbaarheid": "Vælg datoer for tilgængelighed", "Boot gecontroleerd": "Båd kontrolleret", "Directe betaling": "Direkte betaling", "Lokale vaartips": "Lokale sejltips", "Bewaren": "Gem", "Bewaard": "Gemt",
    "Mijn boekingen": "Mine bookinger", "Nieuw verblijf zoeken": "Søg nyt ophold", "Ga naar betaling": "Gå til betaling", "Rond je boeking af": "Afslut din booking", "Betaling": "Betaling", "Bevestiging": "Bekræftelse", "Annuleren": "Annuller", "Verstuur": "Send", "Typ een bericht...": "Skriv en besked..."
  },
  de: {
    "Home": "Start", "Zoeken": "Suchen", "Verhuren": "Vermieten", "Berichten": "Nachrichten", "Boekingen": "Buchungen", "Favorieten": "Favoriten", "Contact": "Kontakt", "Inloggen": "Einloggen", "Uitloggen": "Ausloggen", "Dashboard": "Dashboard",
    "Vakantiehuizen": "Ferienhäuser", "Verhuurders": "Vermieter", "Waar wil je naartoe?": "Wohin möchtest du?", "Incheckdatum": "Anreisedatum", "Uitcheckdatum": "Abreisedatum", "Check-in": "Anreise", "Check-out": "Abreise", "Gasten": "Gäste", "Filters": "Filter", "Zoek": "Suchen", "Zoek opnieuw": "Erneut suchen", "Wis": "Löschen", "Wis filters": "Filter löschen", "Filters toepassen": "Filter anwenden",
    "Kies incheckdatum": "Anreise wählen", "Kies uitcheckdatum": "Abreise wählen", "Kies je incheckdatum": "Wähle dein Anreisedatum", "Kies nu je uitcheckdatum": "Wähle jetzt dein Abreisedatum", "Exacte datums": "Exakte Daten",
    "Sorteren": "Sortieren", "Aanbevolen": "Empfohlen", "Laagste prijs eerst": "Niedrigster Preis zuerst", "Hoogste prijs eerst": "Höchster Preis zuerst", "Hoogste score eerst": "Beste Bewertung zuerst", "Populairst eerst": "Beliebteste zuerst",
    "Type ruimte": "Unterkunftsart", "Alle": "Alle", "Kamer": "Zimmer", "Hele woning": "Ganze Unterkunft", "Prijsbereik": "Preisbereich", "Kamers en bedden": "Zimmer und Betten", "Slaapkamers": "Schlafzimmer", "Bedden": "Betten", "Badkamers": "Badezimmer", "Voorzieningen": "Ausstattung", "Populair": "Beliebt", "Basics": "Grundlagen", "Extra's": "Extras", "Locatie": "Lage", "Veiligheid": "Sicherheit", "Boekingsopties": "Buchungsoptionen", "Woningtype": "Unterkunftstyp",
    "Bekijk huisje": "Haus ansehen", "Beschikbaar voor deze data": "Für diese Daten verfügbar", "Kies data voor beschikbaarheid": "Daten für Verfügbarkeit wählen", "Boot gecontroleerd": "Boot geprüft", "Directe betaling": "Direkte Zahlung", "Lokale vaartips": "Lokale Bootstipps", "Bewaren": "Speichern", "Bewaard": "Gespeichert",
    "Mijn boekingen": "Meine Buchungen", "Nieuw verblijf zoeken": "Neuen Aufenthalt suchen", "Ga naar betaling": "Zur Zahlung", "Rond je boeking af": "Buchung abschließen", "Betaling": "Zahlung", "Bevestiging": "Bestätigung", "Annuleren": "Stornieren", "Verstuur": "Senden", "Typ een bericht...": "Nachricht schreiben..."
  },
  en: {
    "Home": "Home", "Zoeken": "Search", "Verhuren": "Host", "Berichten": "Messages", "Boekingen": "Bookings", "Favorieten": "Favourites", "Contact": "Contact", "Inloggen": "Log in", "Uitloggen": "Log out", "Dashboard": "Dashboard",
    "Vakantiehuizen": "Holiday homes", "Verhuurders": "Hosts", "Waar wil je naartoe?": "Where are you going?", "Incheckdatum": "Check-in date", "Uitcheckdatum": "Check-out date", "Check-in": "Check-in", "Check-out": "Check-out", "Gasten": "Guests", "Filters": "Filters", "Zoek": "Search", "Zoek opnieuw": "Search again", "Wis": "Clear", "Wis filters": "Clear filters", "Filters toepassen": "Apply filters",
    "Kies incheckdatum": "Choose check-in", "Kies uitcheckdatum": "Choose check-out", "Kies je incheckdatum": "Choose your check-in date", "Kies nu je uitcheckdatum": "Now choose your check-out date", "Exacte datums": "Exact dates",
    "Sorteren": "Sort", "Aanbevolen": "Recommended", "Laagste prijs eerst": "Lowest price first", "Hoogste prijs eerst": "Highest price first", "Hoogste score eerst": "Highest rating first", "Populairst eerst": "Most popular first",
    "Type ruimte": "Type of place", "Alle": "All", "Kamer": "Room", "Hele woning": "Entire home", "Prijsbereik": "Price range", "Kamers en bedden": "Rooms and beds", "Slaapkamers": "Bedrooms", "Bedden": "Beds", "Badkamers": "Bathrooms", "Voorzieningen": "Amenities", "Populair": "Popular", "Basics": "Basics", "Extra's": "Extras", "Locatie": "Location", "Veiligheid": "Safety", "Boekingsopties": "Booking options", "Woningtype": "Property type",
    "Bekijk huisje": "View home", "Beschikbaar voor deze data": "Available for these dates", "Kies data voor beschikbaarheid": "Choose dates for availability", "Boot gecontroleerd": "Boat checked", "Directe betaling": "Direct payment", "Lokale vaartips": "Local boating tips", "Bewaren": "Save", "Bewaard": "Saved",
    "Mijn boekingen": "My bookings", "Nieuw verblijf zoeken": "Find a new stay", "Ga naar betaling": "Go to payment", "Rond je boeking af": "Complete your booking", "Betaling": "Payment", "Bevestiging": "Confirmation", "Annuleren": "Cancel", "Verstuur": "Send", "Typ een bericht...": "Type a message..."
  },
  es: {
    "Home": "Inicio", "Zoeken": "Buscar", "Verhuren": "Alquilar", "Berichten": "Mensajes", "Boekingen": "Reservas", "Favorieten": "Favoritos", "Contact": "Contacto", "Inloggen": "Iniciar sesión", "Uitloggen": "Cerrar sesión", "Dashboard": "Panel",
    "Vakantiehuizen": "Casas de vacaciones", "Verhuurders": "Anfitriones", "Waar wil je naartoe?": "¿A dónde quieres ir?", "Incheckdatum": "Fecha de entrada", "Uitcheckdatum": "Fecha de salida", "Check-in": "Entrada", "Check-out": "Salida", "Gasten": "Huéspedes", "Filters": "Filtros", "Zoek": "Buscar", "Zoek opnieuw": "Buscar de nuevo", "Wis": "Borrar", "Wis filters": "Borrar filtros", "Filters toepassen": "Aplicar filtros",
    "Kies incheckdatum": "Elige entrada", "Kies uitcheckdatum": "Elige salida", "Kies je incheckdatum": "Elige tu fecha de entrada", "Kies nu je uitcheckdatum": "Ahora elige la fecha de salida", "Exacte datums": "Fechas exactas",
    "Sorteren": "Ordenar", "Aanbevolen": "Recomendado", "Laagste prijs eerst": "Precio más bajo primero", "Hoogste prijs eerst": "Precio más alto primero", "Hoogste score eerst": "Mejor valoración primero", "Populairst eerst": "Más populares primero",
    "Type ruimte": "Tipo de espacio", "Alle": "Todos", "Kamer": "Habitación", "Hele woning": "Alojamiento entero", "Prijsbereik": "Rango de precios", "Kamers en bedden": "Habitaciones y camas", "Slaapkamers": "Dormitorios", "Bedden": "Camas", "Badkamers": "Baños", "Voorzieningen": "Servicios", "Populair": "Popular", "Basics": "Básicos", "Extra's": "Extras", "Locatie": "Ubicación", "Veiligheid": "Seguridad", "Boekingsopties": "Opciones de reserva", "Woningtype": "Tipo de alojamiento",
    "Bekijk huisje": "Ver casa", "Beschikbaar voor deze data": "Disponible para estas fechas", "Kies data voor beschikbaarheid": "Elige fechas para ver disponibilidad", "Boot gecontroleerd": "Barco verificado", "Directe betaling": "Pago directo", "Lokale vaartips": "Consejos locales de navegación", "Bewaren": "Guardar", "Bewaard": "Guardado",
    "Mijn boekingen": "Mis reservas", "Nieuw verblijf zoeken": "Buscar nueva estancia", "Ga naar betaling": "Ir al pago", "Rond je boeking af": "Completa tu reserva", "Betaling": "Pago", "Bevestiging": "Confirmación", "Annuleren": "Cancelar", "Verstuur": "Enviar", "Typ een bericht...": "Escribe un mensaje..."
  },
  fr: {
    "Home": "Accueil", "Zoeken": "Rechercher", "Verhuren": "Louer", "Berichten": "Messages", "Boekingen": "Réservations", "Favorieten": "Favoris", "Contact": "Contact", "Inloggen": "Connexion", "Uitloggen": "Déconnexion", "Dashboard": "Tableau de bord",
    "Vakantiehuizen": "Maisons de vacances", "Verhuurders": "Hôtes", "Waar wil je naartoe?": "Où voulez-vous aller ?", "Incheckdatum": "Date d'arrivée", "Uitcheckdatum": "Date de départ", "Check-in": "Arrivée", "Check-out": "Départ", "Gasten": "Voyageurs", "Filters": "Filtres", "Zoek": "Rechercher", "Zoek opnieuw": "Relancer la recherche", "Wis": "Effacer", "Wis filters": "Effacer les filtres", "Filters toepassen": "Appliquer les filtres",
    "Kies incheckdatum": "Choisir l'arrivée", "Kies uitcheckdatum": "Choisir le départ", "Kies je incheckdatum": "Choisissez votre date d'arrivée", "Kies nu je uitcheckdatum": "Choisissez maintenant votre date de départ", "Exacte datums": "Dates exactes",
    "Sorteren": "Trier", "Aanbevolen": "Recommandé", "Laagste prijs eerst": "Prix le plus bas d'abord", "Hoogste prijs eerst": "Prix le plus élevé d'abord", "Hoogste score eerst": "Meilleure note d'abord", "Populairst eerst": "Les plus populaires d'abord",
    "Type ruimte": "Type de logement", "Alle": "Tous", "Kamer": "Chambre", "Hele woning": "Logement entier", "Prijsbereik": "Fourchette de prix", "Kamers en bedden": "Chambres et lits", "Slaapkamers": "Chambres", "Bedden": "Lits", "Badkamers": "Salles de bain", "Voorzieningen": "Équipements", "Populair": "Populaire", "Basics": "Essentiels", "Extra's": "Extras", "Locatie": "Emplacement", "Veiligheid": "Sécurité", "Boekingsopties": "Options de réservation", "Woningtype": "Type de bien",
    "Bekijk huisje": "Voir le logement", "Beschikbaar voor deze data": "Disponible à ces dates", "Kies data voor beschikbaarheid": "Choisissez des dates pour voir les disponibilités", "Boot gecontroleerd": "Bateau vérifié", "Directe betaling": "Paiement direct", "Lokale vaartips": "Conseils locaux de navigation", "Bewaren": "Enregistrer", "Bewaard": "Enregistré",
    "Mijn boekingen": "Mes réservations", "Nieuw verblijf zoeken": "Rechercher un nouveau séjour", "Ga naar betaling": "Passer au paiement", "Rond je boeking af": "Finalisez votre réservation", "Betaling": "Paiement", "Bevestiging": "Confirmation", "Annuleren": "Annuler", "Verstuur": "Envoyer", "Typ een bericht...": "Écrivez un message..."
  }
};

const contentTranslations = {
  no: {
    "Rorbu aan de baai van Hamnoy": "Rorbu ved Hamnoy-bukta",
    "Rustig vakantiehuis met groot fjordzicht, eigen steiger en een sportieve RIB voor dagtochten.": "Rolig feriehus med bred fjordutsikt, egen brygge og en sporty RIB for dagsturer.",
    "Arctisch retreat op Kvaloya": "Arktisk retreat på Kvaloya",
    "Arctische lodge met noorderlichtdeck, warme sauna en kajuitboot met veiligheidsuitrusting.": "Arktisk lodge med nordlysdekk, varm badstue og cabincruiser med sikkerhetsutstyr.",
    "Luxe cabin aan de Lysefjord": "Luksushytte ved Lysefjorden",
    "Houten cabin aan rustig water met motorboot, hottub en korte vaarroutes richting Lysefjord.": "Trehytte ved rolig vann med motorbåt, boblebad og korte båtruter mot Lysefjorden.",
    "Eilandvilla bij Austevoll": "Øyvilla ved Austevoll",
    "Lichte eilandvilla vlak bij Bergen met aanlegplaats en comfortabele motorboot.": "Lys øyvilla nær Bergen med båtplass og komfortabel motorbåt.",
    "Watervallodge aan Geirangerfjord": "Fosse-lodge ved Geirangerfjorden",
    "Lodge aan UNESCO-water met stille sloep, bergzicht en watervallen rondom.": "Lodge ved UNESCO-farvann med stille snekke, fjellutsikt og fosser rundt.",
    "Minimalistische villa op Hvaler": "Minimalistisk villa på Hvaler",
    "Scandinavische villa in de Oslofjord met vissersboot, zwemtrap en eilandroutes.": "Skandinavisk villa i Oslofjorden med fiskebåt, badetrapp og øyruter."
  },
  sv: {
    "Rorbu aan de baai van Hamnoy": "Rorbu vid Hamnoybukten",
    "Rustig vakantiehuis met groot fjordzicht, eigen steiger en een sportieve RIB voor dagtochten.": "Lugnt semesterhus med vid fjordutsikt, egen brygga och en sportig RIB för dagsutflykter.",
    "Arctisch retreat op Kvaloya": "Arktiskt retreat på Kvaloya",
    "Arctische lodge met noorderlichtdeck, warme sauna en kajuitboot met veiligheidsuitrusting.": "Arktisk lodge med norrskensdäck, varm bastu och kabinbåt med säkerhetsutrustning.",
    "Luxe cabin aan de Lysefjord": "Lyxig stuga vid Lysefjorden",
    "Houten cabin aan rustig water met motorboot, hottub en korte vaarroutes richting Lysefjord.": "Trästuga vid lugnt vatten med motorbåt, bubbelbad och korta båtrutter mot Lysefjorden.",
    "Eilandvilla bij Austevoll": "Övilla vid Austevoll",
    "Lichte eilandvilla vlak bij Bergen met aanlegplaats en comfortabele motorboot.": "Ljus övilla nära Bergen med båtplats och bekväm motorbåt.",
    "Watervallodge aan Geirangerfjord": "Vattenfallslodge vid Geirangerfjorden",
    "Lodge aan UNESCO-water met stille sloep, bergzicht en watervallen rondom.": "Lodge vid UNESCO-vatten med stilla snipa, fjällutsikt och vattenfall runtom.",
    "Minimalistische villa op Hvaler": "Minimalistisk villa på Hvaler",
    "Scandinavische villa in de Oslofjord met vissersboot, zwemtrap en eilandroutes.": "Skandinavisk villa i Oslofjorden med fiskebåt, badstege och örutter."
  },
  da: {
    "Rorbu aan de baai van Hamnoy": "Rorbu ved Hamnoy-bugten",
    "Rustig vakantiehuis met groot fjordzicht, eigen steiger en een sportieve RIB voor dagtochten.": "Roligt feriehus med bred fjordudsigt, egen bro og en sporty RIB til dagsture.",
    "Arctisch retreat op Kvaloya": "Arktisk retreat på Kvaloya",
    "Arctische lodge met noorderlichtdeck, warme sauna en kajuitboot met veiligheidsuitrusting.": "Arktisk lodge med nordlysdæk, varm sauna og kabinebåd med sikkerhedsudstyr.",
    "Luxe cabin aan de Lysefjord": "Luksushytte ved Lysefjorden",
    "Houten cabin aan rustig water met motorboot, hottub en korte vaarroutes richting Lysefjord.": "Træhytte ved roligt vand med motorbåd, spabad og korte sejlruter mod Lysefjorden.",
    "Eilandvilla bij Austevoll": "Øvilla ved Austevoll",
    "Lichte eilandvilla vlak bij Bergen met aanlegplaats en comfortabele motorboot.": "Lys øvilla tæt på Bergen med bådplads og komfortabel motorbåd.",
    "Watervallodge aan Geirangerfjord": "Vandfaldslodge ved Geirangerfjorden",
    "Lodge aan UNESCO-water met stille sloep, bergzicht en watervallen rondom.": "Lodge ved UNESCO-vand med stille jolle, bjergudsigt og vandfald omkring.",
    "Minimalistische villa op Hvaler": "Minimalistisk villa på Hvaler",
    "Scandinavische villa in de Oslofjord met vissersboot, zwemtrap en eilandroutes.": "Skandinavisk villa i Oslofjorden med fiskerbåd, badestige og ø-ruter."
  },
  de: {
    "Rorbu aan de baai van Hamnoy": "Rorbu an der Bucht von Hamnoy",
    "Rustig vakantiehuis met groot fjordzicht, eigen steiger en een sportieve RIB voor dagtochten.": "Ruhiges Ferienhaus mit weitem Fjordblick, eigenem Steg und sportlichem RIB für Tagesausflüge.",
    "Arctisch retreat op Kvaloya": "Arktisches Retreat auf Kvaloya",
    "Arctische lodge met noorderlichtdeck, warme sauna en kajuitboot met veiligheidsuitrusting.": "Arktische Lodge mit Nordlichtdeck, warmer Sauna und Kajütboot mit Sicherheitsausrüstung.",
    "Luxe cabin aan de Lysefjord": "Luxus-Cabin am Lysefjord",
    "Houten cabin aan rustig water met motorboot, hottub en korte vaarroutes richting Lysefjord.": "Holz-Cabin an ruhigem Wasser mit Motorboot, Hot Tub und kurzen Bootsrouten Richtung Lysefjord.",
    "Eilandvilla bij Austevoll": "Inselvilla bei Austevoll",
    "Lichte eilandvilla vlak bij Bergen met aanlegplaats en comfortabele motorboot.": "Helle Inselvilla nahe Bergen mit Liegeplatz und komfortablem Motorboot.",
    "Watervallodge aan Geirangerfjord": "Wasserfall-Lodge am Geirangerfjord",
    "Lodge aan UNESCO-water met stille sloep, bergzicht en watervallen rondom.": "Lodge an UNESCO-Gewässern mit ruhigem Beiboot, Bergblick und Wasserfällen ringsum.",
    "Minimalistische villa op Hvaler": "Minimalistische Villa auf Hvaler",
    "Scandinavische villa in de Oslofjord met vissersboot, zwemtrap en eilandroutes.": "Skandinavische Villa im Oslofjord mit Fischerboot, Badeleiter und Inselrouten."
  },
  en: {
    "Rorbu aan de baai van Hamnoy": "Rorbu on Hamnoy bay",
    "Rustig vakantiehuis met groot fjordzicht, eigen steiger en een sportieve RIB voor dagtochten.": "Quiet holiday home with wide fjord views, private dock and a sporty RIB for day trips.",
    "Arctisch retreat op Kvaloya": "Arctic retreat on Kvaloya",
    "Arctische lodge met noorderlichtdeck, warme sauna en kajuitboot met veiligheidsuitrusting.": "Arctic lodge with northern lights deck, warm sauna and cabin boat with safety equipment.",
    "Luxe cabin aan de Lysefjord": "Luxury cabin on the Lysefjord",
    "Houten cabin aan rustig water met motorboot, hottub en korte vaarroutes richting Lysefjord.": "Wooden cabin by quiet water with motorboat, hot tub and short boating routes toward Lysefjord.",
    "Eilandvilla bij Austevoll": "Island villa near Austevoll",
    "Lichte eilandvilla vlak bij Bergen met aanlegplaats en comfortabele motorboot.": "Bright island villa near Bergen with mooring and comfortable motorboat.",
    "Watervallodge aan Geirangerfjord": "Waterfall lodge on Geirangerfjord",
    "Lodge aan UNESCO-water met stille sloep, bergzicht en watervallen rondom.": "Lodge on UNESCO waters with quiet dinghy, mountain views and waterfalls all around.",
    "Minimalistische villa op Hvaler": "Minimalist villa on Hvaler",
    "Scandinavische villa in de Oslofjord met vissersboot, zwemtrap en eilandroutes.": "Scandinavian villa in the Oslofjord with fishing boat, swim ladder and island routes."
  },
  es: {
    "Rorbu aan de baai van Hamnoy": "Rorbu en la bahía de Hamnoy",
    "Rustig vakantiehuis met groot fjordzicht, eigen steiger en een sportieve RIB voor dagtochten.": "Casa de vacaciones tranquila con amplias vistas al fiordo, muelle privado y una RIB deportiva para excursiones de un día.",
    "Arctisch retreat op Kvaloya": "Retiro ártico en Kvaloya",
    "Arctische lodge met noorderlichtdeck, warme sauna en kajuitboot met veiligheidsuitrusting.": "Lodge ártico con terraza para auroras boreales, sauna cálida y barco cabinado con equipo de seguridad.",
    "Luxe cabin aan de Lysefjord": "Cabaña de lujo en el Lysefjord",
    "Houten cabin aan rustig water met motorboot, hottub en korte vaarroutes richting Lysefjord.": "Cabaña de madera junto a aguas tranquilas con lancha, bañera de hidromasaje y rutas cortas hacia Lysefjord.",
    "Eilandvilla bij Austevoll": "Villa isleña cerca de Austevoll",
    "Lichte eilandvilla vlak bij Bergen met aanlegplaats en comfortabele motorboot.": "Villa isleña luminosa cerca de Bergen con amarre y una cómoda lancha.",
    "Watervallodge aan Geirangerfjord": "Lodge de cascadas en Geirangerfjord",
    "Lodge aan UNESCO-water met stille sloep, bergzicht en watervallen rondom.": "Lodge en aguas UNESCO con bote tranquilo, vistas a la montaña y cascadas alrededor.",
    "Minimalistische villa op Hvaler": "Villa minimalista en Hvaler",
    "Scandinavische villa in de Oslofjord met vissersboot, zwemtrap en eilandroutes.": "Villa escandinava en el Oslofjord con barco de pesca, escalera de baño y rutas entre islas."
  },
  fr: {
    "Rorbu aan de baai van Hamnoy": "Rorbu dans la baie de Hamnoy",
    "Rustig vakantiehuis met groot fjordzicht, eigen steiger en een sportieve RIB voor dagtochten.": "Maison de vacances calme avec large vue sur le fjord, ponton privé et RIB sportif pour les excursions.",
    "Arctisch retreat op Kvaloya": "Retraite arctique sur Kvaloya",
    "Arctische lodge met noorderlichtdeck, warme sauna en kajuitboot met veiligheidsuitrusting.": "Lodge arctique avec terrasse pour aurores boréales, sauna chaud et bateau à cabine avec équipement de sécurité.",
    "Luxe cabin aan de Lysefjord": "Cabane de luxe sur le Lysefjord",
    "Houten cabin aan rustig water met motorboot, hottub en korte vaarroutes richting Lysefjord.": "Cabane en bois au bord d'une eau calme avec bateau à moteur, bain à remous et courtes routes vers le Lysefjord.",
    "Eilandvilla bij Austevoll": "Villa insulaire près d'Austevoll",
    "Lichte eilandvilla vlak bij Bergen met aanlegplaats en comfortabele motorboot.": "Villa insulaire lumineuse près de Bergen avec mouillage et bateau à moteur confortable.",
    "Watervallodge aan Geirangerfjord": "Lodge des cascades sur le Geirangerfjord",
    "Lodge aan UNESCO-water met stille sloep, bergzicht en watervallen rondom.": "Lodge sur des eaux UNESCO avec annexe silencieuse, vue montagne et cascades tout autour.",
    "Minimalistische villa op Hvaler": "Villa minimaliste sur Hvaler",
    "Scandinavische villa in de Oslofjord met vissersboot, zwemtrap en eilandroutes.": "Villa scandinave dans l'Oslofjord avec bateau de pêche, échelle de bain et routes entre îles."
  }
};

const translationPatterns = {
  no: [[/^(\d+) huizen met boot gevonden(.*)$/i, "$1 hus med båt funnet$2"], [/^Score (.+)$/i, "Vurdering $1"], [/^(.+) \/ nacht$/i, "$1 / natt"]],
  sv: [[/^(\d+) huizen met boot gevonden(.*)$/i, "$1 hus med båt hittades$2"], [/^Score (.+)$/i, "Betyg $1"], [/^(.+) \/ nacht$/i, "$1 / natt"]],
  da: [[/^(\d+) huizen met boot gevonden(.*)$/i, "$1 huse med båd fundet$2"], [/^Score (.+)$/i, "Vurdering $1"], [/^(.+) \/ nacht$/i, "$1 / nat"]],
  de: [[/^(\d+) huizen met boot gevonden(.*)$/i, "$1 Häuser mit Boot gefunden$2"], [/^Score (.+)$/i, "Bewertung $1"], [/^(.+) \/ nacht$/i, "$1 / Nacht"]],
  en: [[/^(\d+) huizen met boot gevonden(.*)$/i, "$1 homes with boat found$2"], [/^Score (.+)$/i, "Rating $1"], [/^(.+) \/ nacht$/i, "$1 / night"]],
  es: [[/^(\d+) huizen met boot gevonden(.*)$/i, "$1 casas con barco encontradas$2"], [/^Score (.+)$/i, "Puntuación $1"], [/^(.+) \/ nacht$/i, "$1 / noche"]],
  fr: [[/^(\d+) huizen met boot gevonden(.*)$/i, "$1 logements avec bateau trouvés$2"], [/^Score (.+)$/i, "Note $1"], [/^(.+) \/ nacht$/i, "$1 / nuit"]]
};

const freeTextDictionary = {
  no: {
    "vakantiehuizen": "feriehus", "vakantiehuis": "feriehus", "huisjes": "hytter", "huisje": "hytte", "huis": "hus", "boot": "båt", "fjordhuis": "fjordhus", "fjord": "fjord", "met": "med", "aan het water": "ved vannet", "eigen steiger": "egen brygge", "steiger": "brygge", "rustig": "rolig", "luxe": "luksuriøs", "noorse": "norsk", "noorwegen": "Norge", "beschrijving": "beskrivelse", "veiligheidsuitrusting": "sikkerhetsutstyr", "inbegrepen": "inkludert", "gasten": "gjester", "slaapkamers": "soverom", "personen": "personer", "nacht": "natt"
  },
  sv: {
    "vakantiehuizen": "semesterhus", "vakantiehuis": "semesterhus", "huisjes": "stugor", "huisje": "stuga", "huis": "hus", "boot": "båt", "fjordhuis": "fjordhus", "fjord": "fjord", "met": "med", "aan het water": "vid vattnet", "eigen steiger": "egen brygga", "steiger": "brygga", "rustig": "lugnt", "luxe": "lyxigt", "noorse": "norsk", "noorwegen": "Norge", "beschrijving": "beskrivning", "veiligheidsuitrusting": "säkerhetsutrustning", "inbegrepen": "ingår", "gasten": "gäster", "slaapkamers": "sovrum", "personen": "personer", "nacht": "natt"
  },
  da: {
    "vakantiehuizen": "feriehuse", "vakantiehuis": "feriehus", "huisjes": "hytter", "huisje": "hytte", "huis": "hus", "boot": "båd", "fjordhuis": "fjordhus", "fjord": "fjord", "met": "med", "aan het water": "ved vandet", "eigen steiger": "egen bro", "steiger": "bro", "rustig": "roligt", "luxe": "luksus", "noorse": "norsk", "noorwegen": "Norge", "beschrijving": "beskrivelse", "veiligheidsuitrusting": "sikkerhedsudstyr", "inbegrepen": "inkluderet", "gasten": "gæster", "slaapkamers": "soveværelser", "personen": "personer", "nacht": "nat"
  },
  de: {
    "vakantiehuizen": "Ferienhäuser", "vakantiehuis": "Ferienhaus", "huisjes": "Häuser", "huisje": "Haus", "huis": "Haus", "boot": "Boot", "fjordhuis": "Fjordhaus", "fjord": "Fjord", "met": "mit", "aan het water": "am Wasser", "eigen steiger": "eigener Steg", "steiger": "Steg", "rustig": "ruhig", "luxe": "luxuriös", "noorse": "norwegisch", "noorwegen": "Norwegen", "beschrijving": "Beschreibung", "veiligheidsuitrusting": "Sicherheitsausrüstung", "inbegrepen": "inbegriffen", "gasten": "Gäste", "slaapkamers": "Schlafzimmer", "personen": "Personen", "nacht": "Nacht"
  },
  en: {
    "vakantiehuizen": "holiday homes", "vakantiehuis": "holiday home", "huisjes": "homes", "huisje": "home", "huis": "house", "boot": "boat", "fjordhuis": "fjord house", "fjord": "fjord", "met": "with", "aan het water": "on the water", "eigen steiger": "private dock", "steiger": "dock", "rustig": "quiet", "luxe": "luxury", "noorse": "Norwegian", "noorwegen": "Norway", "beschrijving": "description", "veiligheidsuitrusting": "safety equipment", "inbegrepen": "included", "gasten": "guests", "slaapkamers": "bedrooms", "personen": "people", "nacht": "night"
  },
  es: {
    "vakantiehuizen": "casas de vacaciones", "vakantiehuis": "casa de vacaciones", "huisjes": "casas", "huisje": "casa", "huis": "casa", "boot": "barco", "fjordhuis": "casa del fiordo", "fjord": "fiordo", "met": "con", "aan het water": "junto al agua", "eigen steiger": "muelle privado", "steiger": "muelle", "rustig": "tranquilo", "luxe": "lujo", "noorse": "noruego", "noorwegen": "Noruega", "beschrijving": "descripción", "veiligheidsuitrusting": "equipo de seguridad", "inbegrepen": "incluido", "gasten": "huéspedes", "slaapkamers": "dormitorios", "personen": "personas", "nacht": "noche"
  },
  fr: {
    "vakantiehuizen": "maisons de vacances", "vakantiehuis": "maison de vacances", "huisjes": "logements", "huisje": "logement", "huis": "maison", "boot": "bateau", "fjordhuis": "maison du fjord", "fjord": "fjord", "met": "avec", "aan het water": "au bord de l'eau", "eigen steiger": "pont privé", "steiger": "pont", "rustig": "calme", "luxe": "luxe", "noorse": "norvégien", "noorwegen": "Norvège", "beschrijving": "description", "veiligheidsuitrusting": "équipement de sécurité", "inbegrepen": "inclus", "gasten": "voyageurs", "slaapkamers": "chambres", "personen": "personnes", "nacht": "nuit"
  }
};

const i18nOriginalText = new WeakMap();
const i18nOriginalAttributes = new WeakMap();
const i18nOriginalValues = new WeakMap();
let i18nOriginalDocumentTitle = "";

const interfacePhraseDictionary = {
  no: {
    "noorse vakantiehuizen met boot inbegrepen": "norske feriehus med båt inkludert",
    "zoek fjordhuizen, eilandvilla’s en cabins aan het water. altijd met duidelijke bootinformatie en beschikbaarheid.": "søk etter fjordhus, øyvillaer og hytter ved vannet. alltid med tydelig båtinformasjon og tilgjengelighet.",
    "log in of meld je aan": "logg inn eller registrer deg",
    "welkom terug": "velkommen tilbake",
    "gemiste berichten": "uleste meldinger",
    "gebouwd voor zorgeloos boeken": "bygget for bekymringsfri bestilling",
    "een goede bookingsite laat je vóór betaling precies zien waar je aan toe bent. daarom combineren we woning, boot, beschikbaarheid en contact in één flow.": "en god bookingnettside viser nøyaktig hva du får før betaling. derfor samler vi bolig, båt, tilgjengelighet og kontakt i én flyt.",
    "geverifieerde bootgegevens": "verifiserte båtopplysninger",
    "type boot, capaciteit, motorvermogen en veiligheidsuitrusting staan zichtbaar bij elk huis.": "båttype, kapasitet, motorkraft og sikkerhetsutstyr vises ved hvert hus.",
    "beschikbaarheid klopt mee": "tilgjengeligheten følger med",
    "betaalde boekingen blokkeren direct de gekozen data in agenda en zoekresultaten.": "betalte bestillinger blokkerer valgte datoer direkte i kalender og søkeresultater.",
    "shortlist met favorieten": "favorittliste",
    "bewaar huizen met boot en vergelijk prijs, regio en capaciteit later rustig.": "lagre hus med båt og sammenlign pris, region og kapasitet senere.",
    "populaire huizen": "populære hus",
    "een eerste selectie aan het water. meer huizen verschijnen op de resultatenpagina zodra je zoekt.": "et første utvalg ved vannet. flere hus vises på resultatsiden når du søker.",
    "bekijk alles": "se alt",
    "uitgelichte regio's": "utvalgte regioner",
    "noorwegen blijft overzichtelijk met zorgvuldig gekozen regio's voor water, natuur en boottochten.": "Norge blir oversiktlig med nøye valgte regioner for vann, natur og båtturer.",
    "dramatische bergen, vissersdorpen en middernachtzon.": "dramatiske fjell, fiskevær og midnattssol.",
    "fjordstad met houten kades en eilandroutes.": "fjordby med trebrygger og øyruter.",
    "watervallen, bergwanden en stille inhammen.": "fosser, fjellvegger og stille viker.",
    "vakantiehuizen in noorwegen, altijd met boot.": "feriehus i Norge, alltid med båt.",
    "vragen over huizen, bootveiligheid of verhuurderschap? stuur ons een bericht.": "spørsmål om hus, båtsikkerhet eller utleie? send oss en melding.",
    "waar kunnen we mee helpen?": "hva kan vi hjelpe med?",
    "bericht versturen": "send melding",
    "log in met je eigen lokale account of gebruik het demo-verhuurdersaccount.": "logg inn med din lokale konto eller bruk demo-utleierkontoen.",
    "nieuw account": "ny konto",
    "maak een lokaal mvp-account aan. je account, huizen, boekingen en berichten blijven in deze browser bewaard.": "opprett en lokal MVP-konto. konto, hus, bestillinger og meldinger lagres i denne nettleseren.",
    "account aanmaken": "opprett konto",
    "huurders": "leietakere",
    "huurder": "leietaker",
    "verhuurder": "utleier",
    "verhuurders": "utleiere",
    "huis toevoegen": "legg til hus",
    "nieuw vakantiehuis maken": "opprett nytt feriehus",
    "vul hier alle informatie in die een huurder nodig heeft: locatie, filters, foto's, bootgegevens en beschikbaarheid.": "fyll inn all informasjon en leietaker trenger: sted, filtre, bilder, båtopplysninger og tilgjengelighet.",
    "terug naar dashboard": "tilbake til kontrollpanel",
    "basisinformatie": "grunninformasjon",
    "deze informatie vormt de bovenkant van je huisjespagina.": "denne informasjonen danner toppen av hussiden din.",
    "titel": "tittel",
    "woonadres": "boligadresse",
    "straat, huisnummer en plaats in noorwegen": "gate, husnummer og sted i Norge",
    "begin met typen en kies een officieel noors adres. plaats, regio en coördinaten worden automatisch ingevuld.": "begynn å skrive og velg en offisiell norsk adresse. sted, region og koordinater fylles ut automatisk.",
    "plaats": "sted",
    "regio/fylke": "region/fylke",
    "coördinaten": "koordinater",
    "prijs per nacht": "pris per natt",
    "max. gasten": "maks. gjester",
    "maandprijzen": "månedspriser",
    "alle prijzen staan nu in eur (€). nok voegen we later toe op basis van het land waaruit geboekt wordt.": "alle priser vises nå i EUR (€). NOK legger vi til senere basert på landet det bestilles fra.",
    "valuta": "valuta",
    "filters en voorzieningen": "filtre og fasiliteter",
    "deze opties zijn gekoppeld aan dezelfde filters die huurders op de zoekpagina gebruiken.": "disse valgene er koblet til de samme filtrene leietakere bruker på søkesiden.",
    "foto's": "bilder",
    "foto's kiezen": "velg bilder",
    "kies meerdere bestanden, bepaal de volgorde en kies per foto hoe de uitsnede op de huispagina moet vallen.": "velg flere filer, bestem rekkefølgen og velg utsnitt for hvert bilde på hussiden.",
    "meerdere jpg/png-bestanden tegelijk. sleep de volgorde met de knoppen omhoog/omlaag.": "flere JPG/PNG-filer samtidig. endre rekkefølgen med opp/ned-knappene.",
    "voorbeeld van je huispagina": "forhåndsvisning av hussiden",
    "na het kiezen van foto's zie je hier de hoofdfoto en volgorde zoals huurders die gaan zien.": "etter at du har valgt bilder, ser du hovedbildet og rekkefølgen slik leietakere ser den.",
    "bootgegevens": "båtopplysninger",
    "de boot hoort bij het huis, dus deze gegevens komen duidelijk op de huisjespagina.": "båten hører til huset, så disse opplysningene vises tydelig på hussiden.",
    "capaciteit boot": "båtkapasitet",
    "motorvermogen": "motorkraft",
    "vaarbewijs nodig": "båtførerbevis kreves",
    "veiligheidsuitrusting": "sikkerhetsutstyr",
    "beschikbaarheid": "tilgjengelighet",
    "klik dagen in de agenda aan waarop het huis niet beschikbaar is. nogmaals klikken maakt de dag weer beschikbaar.": "klikk på dager i kalenderen der huset ikke er tilgjengelig. klikk igjen for å gjøre dagen tilgjengelig.",
    "geen dagen geblokkeerd": "ingen dager blokkert",
    "donkere dagen zijn niet beschikbaar voor huurders.": "mørke dager er ikke tilgjengelige for leietakere.",
    "huis publiceren": "publiser hus"
  },
  en: {
    "noorse vakantiehuizen met boot inbegrepen": "Norwegian holiday homes with boat included",
    "zoek fjordhuizen, eilandvilla’s en cabins aan het water. altijd met duidelijke bootinformatie en beschikbaarheid.": "Search fjord homes, island villas and waterfront cabins. Always with clear boat information and availability.",
    "log in of meld je aan": "Log in or sign up",
    "welkom terug": "Welcome back",
    "gemiste berichten": "missed messages",
    "gebouwd voor zorgeloos boeken": "Built for worry-free booking",
    "een goede bookingsite laat je vóór betaling precies zien waar je aan toe bent. daarom combineren we woning, boot, beschikbaarheid en contact in één flow.": "A good booking site shows exactly what to expect before payment. That is why we combine home, boat, availability and contact in one flow.",
    "geverifieerde bootgegevens": "Verified boat details",
    "type boot, capaciteit, motorvermogen en veiligheidsuitrusting staan zichtbaar bij elk huis.": "Boat type, capacity, engine power and safety equipment are visible for every home.",
    "beschikbaarheid klopt mee": "Availability stays in sync",
    "betaalde boekingen blokkeren direct de gekozen data in agenda en zoekresultaten.": "Paid bookings immediately block the selected dates in calendar and search results.",
    "shortlist met favorieten": "Favourite shortlist",
    "bewaar huizen met boot en vergelijk prijs, regio en capaciteit later rustig.": "Save homes with a boat and compare price, region and capacity later.",
    "populaire huizen": "Popular homes",
    "een eerste selectie aan het water. meer huizen verschijnen op de resultatenpagina zodra je zoekt.": "A first waterfront selection. More homes appear on the results page once you search.",
    "bekijk alles": "View all",
    "uitgelichte regio's": "Featured regions",
    "noorwegen blijft overzichtelijk met zorgvuldig gekozen regio's voor water, natuur en boottochten.": "Norway stays easy to browse with carefully chosen regions for water, nature and boat trips.",
    "dramatische bergen, vissersdorpen en middernachtzon.": "Dramatic mountains, fishing villages and midnight sun.",
    "fjordstad met houten kades en eilandroutes.": "Fjord city with wooden quays and island routes.",
    "watervallen, bergwanden en stille inhammen.": "Waterfalls, mountain walls and quiet coves.",
    "vakantiehuizen in noorwegen, altijd met boot.": "Holiday homes in Norway, always with a boat.",
    "vragen over huizen, bootveiligheid of verhuurderschap? stuur ons een bericht.": "Questions about homes, boat safety or hosting? Send us a message.",
    "waar kunnen we mee helpen?": "How can we help?",
    "bericht versturen": "Send message",
    "log in met je eigen lokale account of gebruik het demo-verhuurdersaccount.": "Log in with your own local account or use the demo host account.",
    "nieuw account": "New account",
    "maak een lokaal mvp-account aan. je account, huizen, boekingen en berichten blijven in deze browser bewaard.": "Create a local MVP account. Your account, homes, bookings and messages stay saved in this browser.",
    "account aanmaken": "Create account",
    "huurders": "guests",
    "huurder": "guest",
    "verhuurder": "host",
    "verhuurders": "hosts",
    "huis toevoegen": "Add home",
    "nieuw vakantiehuis maken": "Create a new holiday home",
    "vul hier alle informatie in die een huurder nodig heeft: locatie, filters, foto's, bootgegevens en beschikbaarheid.": "Fill in all information a guest needs: location, filters, photos, boat details and availability.",
    "terug naar dashboard": "Back to dashboard",
    "basisinformatie": "Basic information",
    "deze informatie vormt de bovenkant van je huisjespagina.": "This information forms the top of your home page.",
    "titel": "Title",
    "woonadres": "Home address",
    "straat, huisnummer en plaats in noorwegen": "Street, house number and place in Norway",
    "begin met typen en kies een officieel noors adres. plaats, regio en coördinaten worden automatisch ingevuld.": "Start typing and choose an official Norwegian address. Place, region and coordinates are filled in automatically.",
    "plaats": "Place",
    "regio/fylke": "Region/fylke",
    "coördinaten": "Coordinates",
    "prijs per nacht": "Price per night",
    "max. gasten": "Max. guests",
    "maandprijzen": "Monthly prices",
    "alle prijzen staan nu in eur (€). nok voegen we later toe op basis van het land waaruit geboekt wordt.": "All prices are now in EUR (€). We will add NOK later based on the country the booking comes from.",
    "valuta": "Currency",
    "filters en voorzieningen": "Filters and amenities",
    "deze opties zijn gekoppeld aan dezelfde filters die huurders op de zoekpagina gebruiken.": "These options are linked to the same filters guests use on the search page.",
    "foto's": "Photos",
    "foto's kiezen": "Choose photos",
    "kies meerdere bestanden, bepaal de volgorde en kies per foto hoe de uitsnede op de huispagina moet vallen.": "Choose multiple files, set the order and choose the crop for each photo on the home page.",
    "meerdere jpg/png-bestanden tegelijk. sleep de volgorde met de knoppen omhoog/omlaag.": "Multiple JPG/PNG files at once. Change the order with the up/down buttons.",
    "voorbeeld van je huispagina": "Preview of your home page",
    "na het kiezen van foto's zie je hier de hoofdfoto en volgorde zoals huurders die gaan zien.": "After choosing photos, you see the main photo and order as guests will see them.",
    "bootgegevens": "Boat details",
    "de boot hoort bij het huis, dus deze gegevens komen duidelijk op de huisjespagina.": "The boat belongs to the home, so these details appear clearly on the home page.",
    "capaciteit boot": "Boat capacity",
    "motorvermogen": "Engine power",
    "vaarbewijs nodig": "Boating licence required",
    "veiligheidsuitrusting": "Safety equipment",
    "beschikbaarheid": "Availability",
    "klik dagen in de agenda aan waarop het huis niet beschikbaar is. nogmaals klikken maakt de dag weer beschikbaar.": "Click days in the calendar when the home is unavailable. Click again to make the day available.",
    "geen dagen geblokkeerd": "No days blocked",
    "donkere dagen zijn niet beschikbaar voor huurders.": "Dark days are unavailable for guests.",
    "huis publiceren": "Publish home"
  },
  de: {
    "noorse vakantiehuizen met boot inbegrepen": "Norwegische Ferienhäuser mit Boot inklusive",
    "zoek fjordhuizen, eilandvilla’s en cabins aan het water. altijd met duidelijke bootinformatie en beschikbaarheid.": "Suche Fjordhäuser, Inselvillen und Hütten am Wasser. Immer mit klaren Bootsinformationen und Verfügbarkeit.",
    "log in of meld je aan": "Einloggen oder registrieren",
    "welkom terug": "Willkommen zurück",
    "gemiste berichten": "verpasste Nachrichten",
    "gebouwd voor zorgeloos boeken": "Für sorgenfreies Buchen gebaut",
    "een goede bookingsite laat je vóór betaling precies zien waar je aan toe bent. daarom combineren we woning, boot, beschikbaarheid en contact in één flow.": "Eine gute Buchungsseite zeigt vor der Zahlung genau, was dich erwartet. Deshalb kombinieren wir Unterkunft, Boot, Verfügbarkeit und Kontakt in einem Ablauf.",
    "geverifieerde bootgegevens": "Verifizierte Bootsdaten",
    "type boot, capaciteit, motorvermogen en veiligheidsuitrusting staan zichtbaar bij elk huis.": "Bootstyp, Kapazität, Motorleistung und Sicherheitsausrüstung sind bei jedem Haus sichtbar.",
    "beschikbaarheid klopt mee": "Verfügbarkeit bleibt synchron",
    "betaalde boekingen blokkeren direct de gekozen data in agenda en zoekresultaten.": "Bezahlte Buchungen blockieren die gewählten Daten direkt im Kalender und in den Suchergebnissen.",
    "shortlist met favorieten": "Favoritenliste",
    "bewaar huizen met boot en vergelijk prijs, regio en capaciteit later rustig.": "Speichere Häuser mit Boot und vergleiche später Preis, Region und Kapazität.",
    "populaire huizen": "Beliebte Häuser",
    "een eerste selectie aan het water. meer huizen verschijnen op de resultatenpagina zodra je zoekt.": "Eine erste Auswahl am Wasser. Weitere Häuser erscheinen auf der Ergebnisseite, sobald du suchst.",
    "bekijk alles": "Alles ansehen",
    "uitgelichte regio's": "Ausgewählte Regionen",
    "noorwegen blijft overzichtelijk met zorgvuldig gekozen regio's voor water, natuur en boottochten.": "Norwegen bleibt übersichtlich mit sorgfältig gewählten Regionen für Wasser, Natur und Bootstouren.",
    "vragen over huizen, bootveiligheid of verhuurderschap? stuur ons een bericht.": "Fragen zu Häusern, Bootssicherheit oder Vermietung? Schreib uns eine Nachricht.",
    "bericht versturen": "Nachricht senden",
    "nieuw account": "Neues Konto",
    "account aanmaken": "Konto erstellen",
    "huis toevoegen": "Haus hinzufügen",
    "nieuw vakantiehuis maken": "Neues Ferienhaus erstellen",
    "terug naar dashboard": "Zurück zum Dashboard",
    "basisinformatie": "Basisinformationen",
    "titel": "Titel",
    "woonadres": "Wohnadresse",
    "plaats": "Ort",
    "coördinaten": "Koordinaten",
    "max. gasten": "Max. Gäste",
    "maandprijzen": "Monatspreise",
    "valuta": "Währung",
    "filters en voorzieningen": "Filter und Ausstattung",
    "foto's": "Fotos",
    "foto's kiezen": "Fotos auswählen",
    "bootgegevens": "Bootsdaten",
    "capaciteit boot": "Bootskapazität",
    "motorvermogen": "Motorleistung",
    "vaarbewijs nodig": "Bootsführerschein erforderlich",
    "huis publiceren": "Haus veröffentlichen"
  },
  fr: {
    "noorse vakantiehuizen met boot inbegrepen": "Maisons de vacances norvégiennes avec bateau inclus",
    "zoek fjordhuizen, eilandvilla’s en cabins aan het water. altijd met duidelijke bootinformatie en beschikbaarheid.": "Recherchez des maisons de fjord, des villas insulaires et des cabanes au bord de l'eau. Toujours avec des informations claires sur le bateau et les disponibilités.",
    "log in of meld je aan": "Connectez-vous ou inscrivez-vous",
    "welkom terug": "Bon retour",
    "gemiste berichten": "messages manqués",
    "gebouwd voor zorgeloos boeken": "Conçu pour réserver sereinement",
    "een goede bookingsite laat je vóór betaling precies zien waar je aan toe bent. daarom combineren we woning, boot, beschikbaarheid en contact in één flow.": "Un bon site de réservation vous montre exactement à quoi vous attendre avant le paiement. C'est pourquoi nous réunissons logement, bateau, disponibilité et contact dans un seul parcours.",
    "geverifieerde bootgegevens": "Informations bateau vérifiées",
    "type boot, capaciteit, motorvermogen en veiligheidsuitrusting staan zichtbaar bij elk huis.": "Le type de bateau, la capacité, la puissance moteur et l'équipement de sécurité sont visibles pour chaque logement.",
    "beschikbaarheid klopt mee": "La disponibilité reste synchronisée",
    "betaalde boekingen blokkeren direct de gekozen data in agenda en zoekresultaten.": "Les réservations payées bloquent immédiatement les dates choisies dans le calendrier et les résultats.",
    "shortlist met favorieten": "Liste de favoris",
    "bewaar huizen met boot en vergelijk prijs, regio en capaciteit later rustig.": "Enregistrez les logements avec bateau et comparez plus tard le prix, la région et la capacité.",
    "populaire huizen": "Logements populaires",
    "een eerste selectie aan het water. meer huizen verschijnen op de resultatenpagina zodra je zoekt.": "Une première sélection au bord de l'eau. Plus de logements apparaissent dans les résultats dès que vous recherchez.",
    "bekijk alles": "Tout voir",
    "uitgelichte regio's": "Régions mises en avant",
    "noorwegen blijft overzichtelijk met zorgvuldig gekozen regio's voor water, natuur en boottochten.": "La Norvège reste facile à parcourir grâce à des régions choisies pour l'eau, la nature et les sorties en bateau.",
    "vragen over huizen, bootveiligheid of verhuurderschap? stuur ons een bericht.": "Des questions sur les logements, la sécurité du bateau ou l'accueil ? Envoyez-nous un message.",
    "bericht versturen": "Envoyer le message",
    "nieuw account": "Nouveau compte",
    "account aanmaken": "Créer un compte",
    "huis toevoegen": "Ajouter un logement",
    "nieuw vakantiehuis maken": "Créer une nouvelle maison de vacances",
    "terug naar dashboard": "Retour au tableau de bord",
    "basisinformatie": "Informations de base",
    "titel": "Titre",
    "woonadres": "Adresse du logement",
    "plaats": "Lieu",
    "coördinaten": "Coordonnées",
    "max. gasten": "Voyageurs max.",
    "maandprijzen": "Prix mensuels",
    "valuta": "Devise",
    "filters en voorzieningen": "Filtres et équipements",
    "foto's": "Photos",
    "foto's kiezen": "Choisir des photos",
    "bootgegevens": "Informations bateau",
    "capaciteit boot": "Capacité du bateau",
    "motorvermogen": "Puissance moteur",
    "vaarbewijs nodig": "Permis bateau requis",
    "huis publiceren": "Publier le logement"
  }
};

function currentLanguage() {
  const stored = localStorage.getItem("nordicBoatLanguage") || "nl";
  return languageOptions[stored] ? stored : "nl";
}

function translateText(value = "", language = currentLanguage()) {
  if (language === "nl") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  const normalizedKey = normaliseLocationText(trimmed);
  const phraseTranslation = interfacePhraseDictionary[language]?.[normalizedKey];
  if (phraseTranslation) return value.replace(trimmed, phraseTranslation);
  const contentTranslation = contentTranslations[language]?.[trimmed];
  if (contentTranslation) return value.replace(trimmed, contentTranslation);
  const workflowTranslation = workflowTranslations[language]?.[trimmed];
  if (workflowTranslation) return value.replace(trimmed, workflowTranslation);
  const commonTranslation = commonTranslationLabels[language]?.[trimmed];
  if (commonTranslation) return value.replace(trimmed, commonTranslation);
  const translated = translations[language]?.[trimmed];
  if (translated) return value.replace(trimmed, translated);
  const pattern = translationPatterns[language]?.find(([regex]) => regex.test(trimmed));
  if (pattern) return value.replace(trimmed, trimmed.replace(pattern[0], pattern[1]));
  return translateFreeText(value, language);
}

function preserveCaseReplacement(source, replacement) {
  if (source === source.toUpperCase()) return replacement.toUpperCase();
  if (source[0] === source[0]?.toUpperCase()) return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  return replacement;
}

function translateFreeText(value = "", language = currentLanguage()) {
  const dictionary = freeTextDictionary[language];
  if (!dictionary) return value;
  return Object.entries(dictionary)
    .sort((a, b) => b[0].length - a[0].length)
    .reduce((text, [from, to]) => {
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(new RegExp(`\\b${escaped}\\b`, "gi"), (match) => preserveCaseReplacement(match, to));
    }, value);
}

function reverseTranslationPairs(language) {
  const commonPairs = Object.entries(commonTranslationLabels[language] || {}).map(([from, to]) => [to, from]);
  const workflowPairs = Object.entries(workflowTranslations[language] || {}).map(([from, to]) => [to, from]);
  const contentPairs = Object.entries(contentTranslations[language] || {}).map(([from, to]) => [to, from]);
  const exactPairs = Object.entries(translations[language] || {}).map(([from, to]) => [to, from]);
  const phrasePairs = Object.entries(interfacePhraseDictionary[language] || {}).map(([from, to]) => [to, from]);
  const wordPairs = Object.entries(freeTextDictionary[language] || {}).map(([from, to]) => [to, from]);
  return [...commonPairs, ...workflowPairs, ...contentPairs, ...exactPairs, ...phrasePairs, ...wordPairs]
    .filter(([from, to]) => from && to)
    .sort((a, b) => b[0].length - a[0].length);
}

function translateToDutch(value = "", sourceLanguage = "nl") {
  if (!value || sourceLanguage === "nl") return value;
  const trimmed = value.trim();
  const exact = reverseTranslationPairs(sourceLanguage).find(([from]) => normaliseLocationText(from) === normaliseLocationText(trimmed));
  if (exact) return value.replace(trimmed, exact[1]);
  return reverseTranslationPairs(sourceLanguage).reduce((text, [from, to]) => {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(new RegExp(`\\b${escaped}\\b`, "gi"), (match) => preserveCaseReplacement(match, to));
  }, value);
}

function translateListingText(value = "", targetLanguage = currentLanguage(), sourceLanguage = "nl") {
  if (!value || /^[\d\s.,:/+-]+$/.test(value)) return value;
  if (targetLanguage === sourceLanguage) return value;
  const dutchSource = sourceLanguage === "nl" ? value : translateToDutch(value, sourceLanguage);
  return targetLanguage === "nl" ? dutchSource : translateText(dutchSource, targetLanguage);
}

function buildListingTranslations(fields, sourceLanguage = currentLanguage()) {
  return Object.keys(languageOptions).reduce((acc, language) => {
    acc[language] = Object.fromEntries(
      listingTranslationFields.map((field) => [field, translateListingText(fields[field] || "", language, sourceLanguage)])
    );
    return acc;
  }, {});
}

function localizedListing(listing, language = currentLanguage()) {
  const sourceLanguage = listing.sourceLanguage || "nl";
  const storedTranslation = listing.translations?.[language] || {};
  return listingTranslationFields.reduce((localized, field) => {
    const originalValue = listing[field] || "";
    const translatedValue = storedTranslation[field] || translateListingText(originalValue, language, sourceLanguage);
    return translatedValue ? { ...localized, [field]: translatedValue } : localized;
  }, { ...listing });
}

function shouldTranslateNode(node) {
  const parent = node.parentElement;
  if (!parent) return false;
  if (parent.closest("[data-language-menu], [data-no-translate], script, style, svg, input, textarea")) return false;
  return true;
}

function isTranslatableValueElement(element) {
  if (!element || element.closest("[data-language-menu], [data-no-translate]")) return false;
  if (element.tagName === "OPTION") return true;
  if (element.tagName === "TEXTAREA") return true;
  if (element.tagName !== "INPUT") return false;
  const type = (element.getAttribute("type") || "text").toLowerCase();
  return ["text", "search"].includes(type) && !element.matches("[data-location-input], [data-address-input], [readonly]");
}

function applyStoredLanguage() {
  applyLanguage(currentLanguage(), { persist: false });
}

let isRefreshingLanguageViews = false;

function refreshLanguageSensitiveViews() {
  if (isRefreshingLanguageViews) return;
  isRefreshingLanguageViews = true;
  try {
    renderFeatured();
    renderAppliedFilters();
    renderSearchResults();
    renderListingDetail();
    renderPaymentPage();
    renderFavoritesPage();
    renderTripsPage();
    renderHostStats();
    renderDashboardListings();
    renderHostBookings();
    renderHostAvailability();
    renderMessages();
    initCardGalleries();
  } finally {
    isRefreshingLanguageViews = false;
  }
}

function applyLanguage(language = "nl", options = {}) {
  const meta = languageOptions[language] || languageOptions.nl;
  if (options.persist !== false) localStorage.setItem("nordicBoatLanguage", language);
  if (!document.body || typeof NodeFilter === "undefined") return;
  if (options.refreshViews) refreshLanguageSensitiveViews();
  document.documentElement.lang = meta.htmlLang;
  if (!i18nOriginalDocumentTitle) i18nOriginalDocumentTitle = document.title;
  document.title = translateText(i18nOriginalDocumentTitle, language);
  const languageLabel = commonTranslationLabels[language]?.Taal || "Taal";
  document.querySelectorAll("[data-language-flag]").forEach((item) => { item.textContent = meta.flag; });
  document.querySelectorAll("[data-language-code]").forEach((item) => { item.textContent = meta.code; });
  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.setAttribute("aria-label", `${languageLabel}: ${meta.label}`);
    button.setAttribute("title", `${languageLabel}: ${meta.label}`);
  });
  document.querySelectorAll("[data-language-option]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.languageOption === language);
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!shouldTranslateNode(node)) continue;
    if (!i18nOriginalText.has(node)) i18nOriginalText.set(node, node.nodeValue);
    node.nodeValue = translateText(i18nOriginalText.get(node), language);
  }

  document.querySelectorAll("[placeholder], [title], [aria-label], [alt]").forEach((element) => {
    if (element.closest("[data-language-menu], [data-no-translate]")) return;
    const original = i18nOriginalAttributes.get(element) || {};
    ["placeholder", "title", "aria-label", "alt"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      if (!original[attribute]) original[attribute] = element.getAttribute(attribute);
      element.setAttribute(attribute, translateText(original[attribute], language));
    });
    i18nOriginalAttributes.set(element, original);
  });

  document.querySelectorAll("input, textarea, option").forEach((element) => {
    if (!isTranslatableValueElement(element)) return;
    if (element.tagName === "OPTION") {
      if (!element.hasAttribute("value")) element.setAttribute("value", element.value || element.textContent);
      if (!i18nOriginalValues.has(element)) i18nOriginalValues.set(element, element.textContent);
      const originalLabel = i18nOriginalValues.get(element);
      if (originalLabel) element.textContent = translateText(originalLabel, language);
      return;
    }
    if (!i18nOriginalValues.has(element)) i18nOriginalValues.set(element, element.value);
    const originalValue = i18nOriginalValues.get(element);
    if (!originalValue || /^[\d\s.,:/+-]+$/.test(originalValue)) return;
    element.value = translateText(originalValue, language);
  });
}

function languageButtonMarkup() {
  const language = currentLanguage();
  const meta = languageOptions[language] || languageOptions.nl;
  const languageLabel = commonTranslationLabels[language]?.Taal || "Taal";
  return `
    <div class="language-menu" data-language-menu>
      <button class="language-switch" type="button" data-language-toggle aria-label="${languageLabel}: ${meta.label}" title="${languageLabel}: ${meta.label}" aria-expanded="false">
        <span class="language-flag" data-language-flag aria-hidden="true">${meta.flag}</span>
        <span data-language-code>${meta.code}</span>
      </button>
      <div class="language-options" data-language-options hidden>
        ${Object.entries(languageOptions).map(([code, option]) => `
          <button class="language-option ${code === language ? "is-active" : ""}" type="button" data-language-option="${code}">
            <span aria-hidden="true">${option.flag}</span>
            <strong>${option.label}</strong>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function initLanguageSwitcher() {
  document.querySelectorAll(".language-switch:not([data-language-toggle])").forEach((button) => {
    button.outerHTML = languageButtonMarkup();
  });
  document.querySelectorAll(".nav-actions").forEach((actions) => {
    const hasDirectLanguage = [...actions.children].some((child) => child.matches("[data-language-menu]"));
    if (!hasDirectLanguage) actions.insertAdjacentHTML("afterbegin", languageButtonMarkup());
    actions.querySelectorAll(".user-menu [data-language-menu]").forEach((menu) => menu.remove());
  });
  document.querySelectorAll("[data-language-menu]").forEach((menu) => {
    if (menu.dataset.languageReady === "true") return;
    menu.dataset.languageReady = "true";
    const toggle = menu.querySelector("[data-language-toggle]");
    const options = menu.querySelector("[data-language-options]");
    toggle?.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = options.hidden;
      options.hidden = !willOpen;
      toggle.setAttribute("aria-expanded", String(willOpen));
    });
    menu.querySelectorAll("[data-language-option]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        applyLanguage(button.dataset.languageOption || "nl", { refreshViews: true });
        options.hidden = true;
        toggle?.setAttribute("aria-expanded", "false");
      });
    });
  });
  if (document.body.dataset.languageCloseReady !== "true") {
    document.body.dataset.languageCloseReady = "true";
    document.addEventListener("click", (event) => {
      document.querySelectorAll("[data-language-options]").forEach((menu) => {
        if (menu.closest("[data-language-menu]")?.contains(event.target)) return;
        menu.hidden = true;
        menu.closest("[data-language-menu]")?.querySelector("[data-language-toggle]")?.setAttribute("aria-expanded", "false");
      });
    });
  }
}

function decorateMessageNavLinks() {
  document.querySelectorAll('.nav-links a[href="messages.html"]').forEach((link) => {
    link.classList.add("messages-link");
    if (!link.querySelector("[data-unread-count]")) {
      link.insertAdjacentHTML("beforeend", ' <span class="nav-unread" data-unread-count hidden>0</span>');
    }
  });
}

function renderSessionState() {
  const session = getSession();
  const isLoggedIn = Boolean(session);
  const unread = unreadMessages(session);
  decorateMessageNavLinks();
  document.querySelectorAll("[data-logged-out]").forEach((element) => {
    element.hidden = isLoggedIn;
  });
  document.querySelectorAll("[data-logged-in]").forEach((element) => {
    element.hidden = !isLoggedIn;
  });
  document.querySelectorAll("[data-user-name]").forEach((element) => {
    element.textContent = session?.name || "Sander";
  });
  document.querySelectorAll(".user-chip").forEach((chip) => {
    if (!session) return;
    chip.href = session.role === "host" ? "rent.html" : "bookings.html";
  });
  document.querySelectorAll("[data-unread-count]").forEach((element) => {
    element.textContent = String(unread);
    element.hidden = !isLoggedIn || unread === 0;
  });
  document.querySelectorAll(".nav-actions").forEach((actions) => {
    if (actions.querySelector("[data-logged-in], [data-logged-out]")) return;
    if (!isLoggedIn) return;
    actions.innerHTML = `
      ${languageButtonMarkup()}
      <a class="user-chip" href="${session.role === "host" ? "rent.html" : "bookings.html"}"><span class="avatar">${(session.name || "S").charAt(0).toUpperCase()}</span><span>${session.name || "Sander"}</span></a>
      <button class="button secondary compact-button" type="button" onclick="mockLogout()">Uitloggen</button>
    `;
  });
  document.body.classList.toggle("is-logged-in", isLoggedIn);
  initLanguageSwitcher();
  applyStoredLanguage();
}

function mockLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const email = (form.querySelector("[name='email']")?.value || "host@nordicboatstays.test").toLowerCase();
  const password = form.querySelector("[name='password']")?.value || "";
  const message = form.querySelector("[data-login-message]");
  const user = allUsers().find((item) => item.email === email);
  if (!user || user.password !== password) {
    if (message) message.textContent = "Geen account gevonden of wachtwoord klopt niet. Maak hieronder een nieuw account aan.";
    return;
  }
  localStorage.setItem("nordicBoatSession", JSON.stringify({ name: user.name, email: user.email, role: user.role }));
  if (message) message.textContent = "Je bent ingelogd. Je gaat nu terug naar de juiste pagina.";
  renderSessionState();
  setTimeout(() => {
    window.location.href = loginRedirectTarget();
  }, 650);
}

function mockRegister(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector("[name='name']")?.value.trim() || "Nieuwe gebruiker";
  const email = form.querySelector("[name='email']")?.value.trim().toLowerCase();
  const password = form.querySelector("[name='password']")?.value || "";
  const role = form.querySelector("[name='role']")?.value || "guest";
  const message = form.querySelector("[data-register-message]");
  if (!email || password.length < 4) {
    if (message) message.textContent = "Vul een geldig e-mailadres en een wachtwoord van minimaal 4 tekens in.";
    return;
  }
  if (allUsers().some((user) => user.email === email)) {
    if (message) message.textContent = "Er bestaat al een account met dit e-mailadres.";
    return;
  }
  const user = { name, email, password, role };
  writeStore("nordicBoatUsers", [...localUsers(), user]);
  localStorage.setItem("nordicBoatSession", JSON.stringify({ name, email, role }));
  if (message) message.textContent = "Account aangemaakt. Je gaat nu naar de juiste pagina.";
  renderSessionState();
  setTimeout(() => {
    window.location.href = loginRedirectTarget();
  }, 650);
}

function loginRedirectTarget() {
  const next = params().get("next") || localStorage.getItem("nordicBoatRedirectAfterLogin") || "index.html";
  localStorage.removeItem("nordicBoatRedirectAfterLogin");
  if (/^https?:\/\//i.test(next) || next.startsWith("//")) return "index.html";
  return next || "index.html";
}

function mockLogout() {
  localStorage.removeItem("nordicBoatSession");
  window.location.reload();
}

function initHomeFilters() {
  document.querySelectorAll("[data-filter-toggle]").forEach((button) => {
    if (button.dataset.ready === "true") return;
    button.dataset.ready = "true";
    const form = button.closest("form");
    const popover = form?.querySelector("[data-filter-popover]");
    if (!popover) return;
    button.addEventListener("click", () => {
      const willOpen = popover.hidden;
      popover.hidden = !willOpen;
      button.setAttribute("aria-expanded", String(willOpen));
      button.classList.toggle("is-active", willOpen);
      const calendar = form.querySelector("[data-calendar-popover]");
      if (calendar) calendar.hidden = true;
      if (willOpen) form.dispatchEvent(new Event("change", { bubbles: true }));
    });
    document.addEventListener("click", (event) => {
      if (popover.hidden || form.contains(event.target)) return;
      popover.hidden = true;
      button.setAttribute("aria-expanded", "false");
      button.classList.remove("is-active");
    });
  });
}

function initPriceRangeFilters() {
  document.querySelectorAll("[data-price-range]").forEach((control) => {
    if (control.dataset.ready === "true") return;
    control.dataset.ready = "true";
    const minInput = control.querySelector("[data-price-min]");
    const maxInput = control.querySelector("[data-price-max]");
    const minLabel = control.querySelector("[data-min-price-label]");
    const maxLabel = control.querySelector("[data-max-price-label]");
    const histogram = control.querySelector("[data-price-histogram]");
    const summary = control.querySelector("[data-price-histogram-summary]");
    if (!minInput || !maxInput) return;
    const form = control.closest("form");
    const priceLimits = priceSliderLimits();
    const sliderStep = Number(minInput.step || 50);
    minInput.min = String(priceLimits.min);
    minInput.max = String(priceLimits.max);
    minInput.value = String(Math.min(priceLimits.max - sliderStep, Math.max(priceLimits.min, Number(minInput.value || priceLimits.min))));
    maxInput.min = String(priceLimits.min);
    maxInput.max = String(priceLimits.max);
    maxInput.value = String(Math.max(priceLimits.min + sliderStep, Math.min(priceLimits.max, Number(maxInput.value || priceLimits.max))));
    if (!params().has("minPrice")) minInput.value = String(priceLimits.min);
    if (!params().has("maxPrice")) maxInput.value = String(priceLimits.max);
    const renderHistogram = () => {
      if (!histogram) return;
      const state = searchStateFromForm(form);
      const histogramState = { ...state, minPrice: "", maxPrice: "" };
      const locationPoint = resolveSearchLocation(histogramState);
      const items = allListings().filter((listing) => listingMatchesSearch(listing, histogramState, { ignoreLocation: Boolean(locationPoint), ignorePrice: true }));
      const step = 50;
      const binCount = Math.max(1, Math.ceil((priceLimits.max - priceLimits.min) / step));
      const counts = Array.from({ length: binCount }, () => 0);
      items.forEach((listing) => {
        const index = Math.max(0, Math.min(binCount - 1, Math.floor((priceForListing(listing, state.checkin) - priceLimits.min) / step)));
        counts[index] += 1;
      });
      const highestCount = Math.max(1, ...counts);
      const selectedMin = Number(minInput.value || priceLimits.min);
      const selectedMax = Number(maxInput.value || priceLimits.max);
      histogram.innerHTML = counts.map((count, index) => {
        const from = priceLimits.min + index * step;
        const to = Math.min(priceLimits.max, from + step);
        const height = count ? Math.max(18, Math.round((count / highestCount) * 100)) : 5;
        const outside = to <= selectedMin || from >= selectedMax;
        return `<span class="${count ? "" : "is-empty"} ${outside ? "is-outside" : ""}" style="height:${height}%" data-count="${count}" title="${money(from)} - ${money(to)}: ${count} huisjes"></span>`;
      }).join("");
      if (summary) {
        summary.textContent = `${items.length} ${items.length === 1 ? "huisje" : "huisjes"} verdeeld over prijsklassen van ${money(priceLimits.min)} tot ${money(priceLimits.max)}.`;
      }
    };
    const update = (changedInput) => {
      const minLimit = Number(minInput.min);
      const maxLimit = Number(maxInput.max);
      const step = Number(minInput.step || 25);
      let minValue = Math.max(minLimit, Math.min(maxLimit - step, Number(minInput.value)));
      let maxValue = Math.max(minLimit + step, Math.min(maxLimit, Number(maxInput.value)));
      if (minValue > maxValue - step) {
        if (changedInput === minInput) {
          minValue = maxValue - step;
          minInput.value = String(minValue);
        } else {
          maxValue = minValue + step;
          maxInput.value = String(maxValue);
        }
      }
      minInput.value = String(minValue);
      maxInput.value = String(maxValue);
      const left = ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
      const right = ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;
      control.style.setProperty("--range-left", `${left}%`);
      control.style.setProperty("--range-right", `${100 - right}%`);
      if (minLabel) minLabel.textContent = money(minValue);
      if (maxLabel) maxLabel.textContent = money(maxValue);
      renderHistogram();
    };
    minInput?.addEventListener("input", () => update(minInput));
    maxInput?.addEventListener("input", () => update(maxInput));
    form?.addEventListener("input", (event) => {
      if (event.target === minInput || event.target === maxInput) return;
      renderHistogram();
    });
    form?.addEventListener("change", (event) => {
      if (event.target === minInput || event.target === maxInput) return;
      renderHistogram();
    });
    form?.addEventListener("submit", () => {
      const disabled = [];
      if (Number(minInput.value) <= priceLimits.min) disabled.push(minInput);
      if (Number(maxInput.value) >= priceLimits.max) disabled.push(maxInput);
      disabled.forEach((input) => {
        input.disabled = true;
      });
      window.setTimeout(() => disabled.forEach((input) => {
        input.disabled = false;
      }), 0);
    });
    update();
  });
}

function initFilterSteppers() {
  document.querySelectorAll("[data-stepper-filter]").forEach((control) => {
    if (control.dataset.ready === "true") return;
    control.dataset.ready = "true";
    const input = control.querySelector("input[type='hidden']");
    const output = control.querySelector("output");
    const update = () => {
      const value = Number(input.value || 0);
      if (output) output.textContent = value > 0 ? `${value}+` : "Alles";
      control.querySelector("[data-step='-1']")?.toggleAttribute("disabled", value <= 0);
    };
    control.querySelectorAll("[data-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = Math.max(0, Math.min(12, Number(input.value || 0) + Number(button.dataset.step)));
        input.value = next ? String(next) : "";
        input.dispatchEvent(new Event("change", { bubbles: true }));
        update();
      });
    });
    update();
  });
}

function initSearchFilterControls() {
  document.querySelectorAll(".compact-search").forEach((form) => {
    if (form.dataset.filterCountReady === "true") return;
    form.dataset.filterCountReady = "true";
    const count = form.querySelector("[data-filter-count]");
    let liveFilterTimer;
    const update = () => {
      const data = new FormData(form);
      const priceLimits = priceSliderLimits();
      const ignored = new Set(["location", "locationLat", "locationLng", "locationType", "locationRegion", "locationZoom", "checkin", "checkout", "guests", "sort"]);
      let active = 0;
      [...new Set([...data.keys()])].forEach((key) => {
        if (ignored.has(key)) return;
        const value = data.get(key);
        if (!value || value === "all") return;
        if (key === "minPrice" && Number(value) <= priceLimits.min) return;
        if (key === "maxPrice" && Number(value) >= priceLimits.max) return;
        active += 1;
      });
      if (count) {
        count.textContent = String(active);
        count.hidden = active === 0;
      }
    };
    const applyLiveFilters = (event) => {
      if (!document.querySelector("[data-map]") || !event.target.closest("[data-filter-popover]")) return;
      window.clearTimeout(liveFilterTimer);
      liveFilterTimer = window.setTimeout(() => {
        updateSearchPageFromForm(form);
      }, event.target.type === "range" ? 80 : 0);
    };
    form.addEventListener("input", (event) => {
      update();
      applyLiveFilters(event);
    });
    form.addEventListener("change", (event) => {
      update();
      applyLiveFilters(event);
    });
    update();
  });
}

function initSortControls() {
  document.querySelectorAll("[data-sort-select]").forEach((select) => {
    if (select.dataset.ready === "true") return;
    select.dataset.ready = "true";
    select.value = searchState().sort || "";
    select.addEventListener("change", () => {
      const query = params();
      if (select.value) query.set("sort", select.value);
      else query.delete("sort");
      document.querySelectorAll("[name='sort']").forEach((field) => {
        field.value = select.value;
      });
      window.history.replaceState(null, "", `search.html${query.toString() ? `?${query.toString()}` : ""}`);
      renderAppliedFilters();
      renderSearchResults();
    });
  });
}

function toInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatLongDate(value) {
  if (!value) return "Kies datum";
  return new Intl.DateTimeFormat(activeLocale(), { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function initDateRangePicker() {
  formsWithCustomCalendar().forEach(initCalendarForm);
}

function initCalendarForm(form) {
  const popover = form.querySelector("[data-calendar-popover]");
  if (!popover || form.dataset.calendarReady === "true") return;
  form.dataset.calendarReady = "true";
  const checkin = form.querySelector("[name='checkin']");
  const checkout = form.querySelector("[name='checkout']");
  if (!checkin || !checkout) return;

  const base = checkin.value ? new Date(checkin.value) : new Date();
  form.dataset.calendarMonth = toInputDate(new Date(base.getFullYear(), base.getMonth(), 1));
  form.dataset.dateMode = "checkin";

  form.querySelectorAll("[data-date-trigger]").forEach((button) => {
    button.addEventListener("click", () => {
      form.dataset.dateMode = button.dataset.dateTrigger || "checkin";
      form.querySelector("[data-filter-popover]")?.setAttribute("hidden", "");
      form.querySelector("[data-filter-toggle]")?.classList.remove("is-active");
      form.querySelector("[data-filter-toggle]")?.setAttribute("aria-expanded", "false");
      popover.hidden = false;
      button.setAttribute("aria-expanded", "true");
      renderCalendar(form);
    });
  });

  form.querySelector("[data-calendar-prev]")?.addEventListener("click", () => shiftCalendarMonth(form, -1));
  form.querySelector("[data-calendar-next]")?.addEventListener("click", () => shiftCalendarMonth(form, 1));
  const months = form.querySelector("[data-calendar-months]");
  months?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-date-value]");
    if (!button || button.disabled) return;
    selectCalendarDate(form, button.dataset.dateValue);
  });
  months?.addEventListener("pointerover", (event) => {
    const button = event.target.closest("[data-date-value]");
    if (!button || button.disabled) return;
    applyCalendarHoverPreview(form, button.dataset.dateValue);
  });
  months?.addEventListener("pointerleave", () => {
    clearCalendarHoverPreview(form);
    renderCalendarStatus(form);
  });
  form.querySelectorAll("[data-flex-days]").forEach((button) => {
    button.addEventListener("click", () => {
      form.querySelectorAll("[data-flex-days]").forEach((item) => item.classList.toggle("is-active", item === button));
    });
  });
  document.addEventListener("click", (event) => {
    if (popover.hidden || form.contains(event.target)) return;
    popover.hidden = true;
    updateDateTriggerLabels(form);
  });
  form.addEventListener("submit", (event) => {
    if (event.defaultPrevented) return;
    const hasOnlyOneDate = Boolean(checkin?.value) !== Boolean(checkout?.value);
    const hasInvalidRange = Boolean(checkin?.value && checkout?.value && new Date(checkout.value) <= new Date(checkin.value));
    if (hasOnlyOneDate || hasInvalidRange) {
      event.preventDefault();
      form.dataset.dateMode = checkin?.value ? "checkout" : "checkin";
      popover.hidden = false;
      renderCalendar(form);
    }
  });
  updateDateTriggerLabels(form);
  renderCalendar(form);
}

function shiftCalendarMonth(form, direction) {
  const current = new Date(form.dataset.calendarMonth || toInputDate(new Date()));
  current.setMonth(current.getMonth() + direction);
  form.dataset.calendarMonth = toInputDate(new Date(current.getFullYear(), current.getMonth(), 1));
  renderCalendar(form);
}

function selectCalendarDate(form, value) {
  const checkin = form.querySelector("[name='checkin']");
  const checkout = form.querySelector("[name='checkout']");
  if (!checkin || !checkout || !value) return;
  const mode = form.dataset.dateMode || "checkin";
  const selected = new Date(value);
  const start = checkin.value ? new Date(checkin.value) : null;
  delete form.dataset.previewCheckout;
  clearCalendarHoverPreview(form);

  if (mode === "checkout" && start && selected > start) {
    const listing = calendarListing(form);
    if (listing && rangeHasUnavailableDates(listing, checkin.value, value)) {
      const status = form.querySelector("[data-calendar-status]");
      if (status) status.textContent = "Deze periode bevat bezette dagen. Kies een andere uitcheckdatum.";
      form.dataset.dateMode = "checkout";
      renderCalendar(form);
      return;
    }
    checkout.value = value;
    form.dataset.dateMode = "checkin";
    const popover = form.querySelector("[data-calendar-popover]");
    if (popover) popover.hidden = true;
  } else {
    checkin.value = value;
    checkout.value = "";
    form.dataset.dateMode = "checkout";
    const checkoutTrigger = form.querySelector("[data-date-trigger='checkout']");
    checkoutTrigger?.focus();
  }
  updateDateTriggerLabels(form);
  renderCalendar(form);
  updateBookingSummary(form);
}

function updateDateTriggerLabels(form) {
  const checkin = form.querySelector("[name='checkin']")?.value || "";
  const checkout = form.querySelector("[name='checkout']")?.value || "";
  const checkinLabel = form.querySelector("[data-date-label='checkin']");
  const checkoutLabel = form.querySelector("[data-date-label='checkout']");
  if (checkinLabel) checkinLabel.textContent = checkin ? formatLongDate(checkin) : "Kies incheckdatum";
  if (checkoutLabel) checkoutLabel.textContent = checkout ? formatLongDate(checkout) : "Kies uitcheckdatum";
  form.querySelectorAll("[data-date-field]").forEach((field) => {
    field.classList.toggle("is-active", field.dataset.dateField === form.dataset.dateMode);
  });
  const isOpen = !form.querySelector("[data-calendar-popover]")?.hidden;
  form.querySelectorAll("[data-date-trigger]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", String(isOpen && trigger.dataset.dateTrigger === form.dataset.dateMode));
  });
}

function renderCalendar(form) {
  const target = form.querySelector("[data-calendar-months]");
  const checkin = form.querySelector("[name='checkin']")?.value || "";
  const checkout = form.querySelector("[name='checkout']")?.value || "";
  const previewCheckout = "";
  const visibleCheckout = previewCheckout || checkout;
  if (!target) return;
  const month = new Date(form.dataset.calendarMonth || toInputDate(new Date()));
  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const listing = calendarListing(form);
  target.innerHTML = [month, nextMonth].map((date) => renderCalendarMonth(date, checkin, visibleCheckout, previewCheckout, listing)).join("");
  renderCalendarStatus(form);
  updateDateTriggerLabels(form);
}

function renderCalendarStatus(form, override = "") {
  const status = form.querySelector("[data-calendar-status]");
  if (!status) return;
  if (override) {
    status.textContent = override;
    return;
  }
  const checkin = form.querySelector("[name='checkin']")?.value || "";
  const checkout = form.querySelector("[name='checkout']")?.value || "";
  if (checkin && checkout) {
    const nights = Math.max(1, Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000));
    status.textContent = `${formatLongDate(checkin)} tot ${formatLongDate(checkout)} · ${nights} nachten`;
  } else {
    status.textContent = form.dataset.dateMode === "checkout" ? "Kies nu je uitcheckdatum" : "Kies je incheckdatum";
  }
}

function clearCalendarHoverPreview(form) {
  form.querySelectorAll(".calendar-day.is-hover-range, .calendar-day.is-hover-end").forEach((day) => {
    day.classList.remove("is-hover-range", "is-hover-end");
  });
}

function applyCalendarHoverPreview(form, hoverValue) {
  clearCalendarHoverPreview(form);
  const checkin = form.querySelector("[name='checkin']")?.value || "";
  if (form.dataset.dateMode !== "checkout" || !checkin || !hoverValue || hoverValue <= checkin) {
    renderCalendarStatus(form);
    return;
  }
  const listing = calendarListing(form);
  const blocked = listing ? rangeHasUnavailableDates(listing, checkin, hoverValue) : false;
  form.querySelectorAll("[data-date-value]").forEach((day) => {
    const value = day.dataset.dateValue;
    if (!value || value <= checkin || value > hoverValue || day.classList.contains("is-unavailable")) return;
    day.classList.toggle("is-hover-range", value < hoverValue);
    day.classList.toggle("is-hover-end", value === hoverValue && !blocked);
  });
  if (blocked) {
    renderCalendarStatus(form, "Deze periode bevat bezette dagen.");
    return;
  }
  const nights = Math.max(1, Math.ceil((new Date(hoverValue).getTime() - new Date(checkin).getTime()) / 86400000));
  renderCalendarStatus(form, `${formatLongDate(checkin)} tot ${formatLongDate(hoverValue)} · ${nights} nachten bekijken`);
}

function renderCalendarMonth(monthDate, checkin, checkout, previewCheckout = "", listing) {
  const monthName = new Intl.DateTimeFormat(activeLocale(), { month: "long", year: "numeric" }).format(monthDate);
  const weekdays = calendarWeekdays();
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const leadingBlanks = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const blanks = Array.from({ length: leadingBlanks }, () => `<span class="calendar-empty"></span>`).join("");
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), index + 1);
    const value = toInputDate(date);
    const inRange = checkin && checkout && value > checkin && value < checkout;
    const isStart = value === checkin;
    const isEnd = value === checkout;
    const isPreviewEnd = value === previewCheckout;
    const unavailable = listing ? isDateUnavailable(listing, value) : false;
    return `
      <button class="calendar-day ${inRange ? "is-in-range" : ""} ${isStart ? "is-start" : ""} ${isEnd ? "is-end" : ""} ${isPreviewEnd ? "is-preview-end" : ""} ${unavailable ? "is-unavailable" : ""}" type="button" data-date-value="${value}" ${unavailable ? "disabled" : ""}>
        ${index + 1}
      </button>
    `;
  }).join("");
  return `
    <section class="calendar-month">
      <h3>${monthName}</h3>
      <div class="calendar-weekdays">${weekdays.map((day) => `<span>${day}</span>`).join("")}</div>
      <div class="calendar-grid">${blanks}${days}</div>
    </section>
  `;
}

function calendarListing(form) {
  const id = form.dataset.calendarListingId;
  return id ? allListings().find((listing) => listing.id === id) : null;
}

function isDateUnavailable(listing, value) {
  return blockingBookingsForListing(listing).some((period) => value >= period.start && value < period.end);
}

function rangeHasUnavailableDates(listing, start, end) {
  return blockingBookingsForListing(listing).some((period) => overlaps(start, end, period.start, period.end));
}

function nightsBetween(checkin, checkout) {
  if (!checkin || !checkout) return 0;
  return Math.max(1, Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000));
}

function paymentTotal(listing, checkin, checkout) {
  return bookingSubtotal(listing, checkin, checkout) + 95;
}

function bookingSubtotal(listing, checkin, checkout) {
  const nights = nightsBetween(checkin, checkout);
  if (!checkin || !checkout || !nights) return 0;
  let subtotal = 0;
  const current = new Date(checkin);
  for (let index = 0; index < nights; index += 1) {
    const value = current.toISOString().slice(0, 10);
    subtotal += priceForListing(listing, value);
    current.setDate(current.getDate() + 1);
  }
  return subtotal;
}

function updateBookingSummary(form) {
  const listing = calendarListing(form);
  const target = form.querySelector("[data-booking-total]");
  if (!listing || !target) return;
  const checkin = form.querySelector("[name='checkin']")?.value;
  const checkout = form.querySelector("[name='checkout']")?.value;
  if (!checkin || !checkout || new Date(checkout) <= new Date(checkin)) {
    target.innerHTML = "Kies een geldige periode om de prijs te berekenen.";
    return;
  }
  const nights = nightsBetween(checkin, checkout);
  target.innerHTML = `${nights} nachten: ${money(bookingSubtotal(listing, checkin, checkout))}<br>Servicekosten: ${money(95)}<br><strong>Totaal: ${money(paymentTotal(listing, checkin, checkout))}</strong>`;
}

function renderDateRangePreview(sourceForm) {
  const preview = document.querySelector("[data-date-range-preview]");
  if (!preview) return;
  const form = sourceForm || document.querySelector("#home-search");
  const checkin = form?.querySelector("[name='checkin']");
  const checkout = form?.querySelector("[name='checkout']");
  const copy = preview.querySelector("[data-date-range-copy]");
  const fill = preview.querySelector("[data-date-range-fill]");
  const daysTarget = preview.querySelector("[data-date-range-days]");
  if (!form || !checkin || !checkout || !copy || !fill || !daysTarget) return;

  const startValue = checkin.value;
  const endValue = checkout.value;
  if (!startValue) {
    copy.textContent = "Kies je incheckdatum en zie meteen welke dagen je verblijf bevat.";
    fill.style.width = "18%";
    preview.classList.add("is-pending");
    daysTarget.innerHTML = "";
    return;
  }

  const start = new Date(startValue);
  const end = endValue ? new Date(endValue) : new Date(start);
  if (!endValue) end.setDate(end.getDate() + 7);
  const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
  const formatter = new Intl.DateTimeFormat(activeLocale(), { weekday: "short", day: "numeric", month: "short" });
  const days = [];
  for (let index = 0; index < Math.min(nights, 8); index += 1) {
    const date = new Date(start);
    date.setDate(date.getDate() + index);
    days.push(`<span>${formatter.format(date)}</span>`);
  }
  if (nights > 8) days.push(`<span>+${nights - 8} dagen</span>`);
  copy.textContent = `${formatDate(startValue)} tot ${formatDate(end.toISOString().slice(0, 10))} · ${nights} nachten`;
  fill.style.width = endValue ? "100%" : "46%";
  preview.classList.toggle("is-pending", !endValue);
  daysTarget.innerHTML = days.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSessionState();
  const dashboardAllowed = protectHostDashboard();
  renderFeatured();
  fillSearchDefaults();
  renderAppliedFilters();
  renderSearchResults();
  renderListingDetail();
  renderPaymentPage();
  renderFavoritesPage();
  renderTripsPage();
  if (dashboardAllowed) {
    renderHostStats();
    renderDashboardListings();
    renderHostBookings();
    renderHostAvailability();
  }
  renderMessages();
  initHostListingPreviewGuards();
  initCardGalleries();
  initLanguageSwitcher();
  applyStoredLanguage();
  setTimeout(() => {
    if (document.querySelector("[data-map]") && window.currentSearchResults) {
      renderMap(window.currentSearchResults);
      applyStoredLanguage();
    }
  }, 600);
});
