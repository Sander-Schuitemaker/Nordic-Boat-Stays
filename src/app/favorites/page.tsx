import { ListingGrid } from "@/components/listings/listing-grid";
import { requireUser } from "@/lib/auth";
import { getFavoriteListings } from "@/lib/listing-service";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const user = await requireUser();
  const listings = await getFavoriteListings(user.id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Favorieten</h1>
      <p className="mt-2 text-muted-foreground">Je bewaarde vakantiehuizen met boot.</p>
      {listings.length ? <ListingGrid listings={listings} /> : <div className="mt-6 rounded-2xl bg-white p-6 text-muted-foreground ring-1 ring-border">Je hebt nog geen favorieten.</div>}
    </main>
  );
}
