"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "@/components/listings/listing-card";
import { DynamicNorwayMap } from "@/components/map/dynamic-norway-map";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import type { Listing } from "@/lib/types";

type SearchValues = {
  location: string;
  guests: number;
  boatType: string;
};

export function SearchResults({ listings, values }: { listings: Listing[]; values: SearchValues }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return listings
      .filter((listing) => !values.location || listing.region.toLowerCase().includes(values.location) || listing.city.toLowerCase().includes(values.location))
      .filter((listing) => !values.guests || listing.maxGuests >= values.guests)
      .filter((listing) => !values.boatType || listing.boat.type === values.boatType)
      .sort((a, b) => b.popularity - a.popularity);
  }, [listings, values.boatType, values.guests, values.location]);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_minmax(420px,0.95fr)]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <FilterSidebar />
      </div>
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{filtered.length} huizen met boot gevonden</h1>
            <p className="mt-1 text-sm text-muted-foreground">Resultaten verspreid over Noorwegen.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-5">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center">
              <h2 className="font-semibold">Geen resultaten</h2>
              <p className="mt-2 text-sm text-muted-foreground">Probeer een ruimere regio, meer datums of minder gasten.</p>
            </div>
          ) : (
            filtered.map((listing) => <ListingCard key={listing.id} listing={listing} onHover={setActiveId} />)
          )}
        </div>
      </section>
      <div className="min-h-[540px] lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
        <DynamicNorwayMap listings={filtered} activeId={activeId} className="h-full" />
      </div>
    </div>
  );
}
