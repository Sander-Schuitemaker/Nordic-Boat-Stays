import { SearchResults } from "@/components/search/search-results";
import { SearchBar } from "@/components/search/search-bar";
import { getListings } from "@/lib/listing-service";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const listings = await getListings();
  const location = typeof params.location === "string" ? params.location.toLowerCase() : "";
  const guests = typeof params.guests === "string" ? Number(params.guests) : 0;
  const boatType = typeof params.boatType === "string" ? params.boatType : "";

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      <SearchBar
        compact
        defaults={{
          location: typeof params.location === "string" ? params.location : "",
          checkIn: typeof params.checkIn === "string" ? params.checkIn : "",
          checkOut: typeof params.checkOut === "string" ? params.checkOut : "",
          guests: typeof params.guests === "string" ? params.guests : "2",
          boatType: typeof params.boatType === "string" ? params.boatType : "alle"
        }}
      />
      <SearchResults listings={listings} values={{ location, guests, boatType }} />
    </main>
  );
}
