import { Heart, MapPin, Ship, Star } from "lucide-react";
import Link from "next/link";

import { getMyFavoriteListings } from "@/lib/account-data";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const listings = await getMyFavoriteListings();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Favorieten</h1>
      <p className="mt-2 text-muted-foreground">Je bewaarde vakantiehuizen met boot.</p>
      {listings.length ? (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-white transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted">
                {listing.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Ship className="size-8 text-muted-foreground" />
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-semibold">{listing.title}</h2>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    <Star className="size-4 fill-accent text-accent" />
                    {listing.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {listing.city}, {listing.region}
                </p>
                <div className="mt-5 flex items-end justify-between gap-3">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    Boot inbegrepen
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(listing.priceCents / 100)} / nacht
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid justify-items-start gap-4 rounded-xl border border-border bg-white p-7 text-muted-foreground">
          <Heart className="size-6" />
          <p>Je hebt nog geen vakantiehuizen opgeslagen.</p>
          <Link href="/search" className="font-semibold text-foreground hover:underline">
            Ontdek huizen met boot
          </Link>
        </div>
      )}
    </main>
  );
}
