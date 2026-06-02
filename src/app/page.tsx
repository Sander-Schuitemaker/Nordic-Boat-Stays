import { HeroCarousel } from "@/components/home/hero-carousel";
import { RegionCard } from "@/components/home/region-card";
import { ListingGrid } from "@/components/listings/listing-grid";
import { SearchBar } from "@/components/search/search-bar";
import { getListings, getRegions } from "@/lib/listing-service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [listings, regions] = await Promise.all([getListings(), getRegions()]);

  return (
    <main>
      <section className="relative min-h-[760px] overflow-hidden">
        <HeroCarousel />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/15 to-background" />
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl flex-col justify-end px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-semibold leading-tight sm:text-7xl">Nordic Boat Stays</h1>
            <p className="mt-5 max-w-2xl text-xl text-white/90">Vakantiehuizen in Noorwegen, altijd met boot.</p>
          </div>
          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Uitgelichte regio's</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Van arctische eilanden tot zachte fjorden bij Oslo.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Uitgelichte accommodaties</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">Huizen aan het water met boot, steiger en lokale ondersteuning.</p>
            </div>
          </div>
          <ListingGrid listings={listings.slice(0, 6)} />
        </div>
      </section>
    </main>
  );
}
