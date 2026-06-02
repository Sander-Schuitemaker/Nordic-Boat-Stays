import { Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function ListingCard({ listing, onHover }: { listing: Listing; onHover?: (id: string | null) => void }) {
  return (
    <article onMouseEnter={() => onHover?.(listing.id)} onMouseLeave={() => onHover?.(null)} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/listings/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={listing.images[0]} alt={listing.title} className="size-full object-cover transition duration-500 group-hover:scale-105" />
          <Button type="button" variant="ghost" size="icon" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
          </Button>
          <Badge className="absolute bottom-3 left-3 bg-white text-primary">{listing.boat.type}</Badge>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold leading-tight">{listing.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {listing.city}, {listing.region}
              </p>
            </div>
            <p className="flex items-center gap-1 text-sm font-semibold">
              <Star className="size-4 fill-accent text-accent" />
              {listing.rating}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{listing.maxGuests} gasten · {listing.bedrooms} slaapkamers</span>
            <span className="font-semibold text-foreground">{formatCurrency(listing.pricePerNight)} / nacht</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
