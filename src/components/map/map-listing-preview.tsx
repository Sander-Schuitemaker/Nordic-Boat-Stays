import Link from "next/link";
import type { Listing } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function MapListingPreview({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.slug}`} className="block w-56 overflow-hidden rounded-xl bg-white">
      <img src={listing.images[0]} alt={listing.title} className="h-28 w-full object-cover" />
      <div className="p-3">
        <p className="font-semibold leading-tight">{listing.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{listing.city} · {formatCurrency(listing.pricePerNight)} per nacht</p>
      </div>
    </Link>
  );
}
