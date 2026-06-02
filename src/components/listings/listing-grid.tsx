import { ListingCard } from "@/components/listings/listing-card";
import type { Listing } from "@/lib/types";

export function ListingGrid({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-border bg-white p-10 text-center">
        <h3 className="text-lg font-semibold">Geen huizen gevonden</h3>
        <p className="mt-2 text-muted-foreground">Pas je filters aan of kies een andere regio in Noorwegen.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
