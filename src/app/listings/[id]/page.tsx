import { notFound } from "next/navigation";
import { BoatInfoCard } from "@/components/listings/boat-info-card";
import { ImageGallery } from "@/components/listings/image-gallery";
import { DynamicNorwayMap } from "@/components/map/dynamic-norway-map";
import { BookingWidget } from "@/components/booking/booking-widget";
import { Badge } from "@/components/ui/badge";
import { getListingBySlugOrId } from "@/lib/listing-service";

export const dynamic = "force-dynamic";

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingBySlugOrId(id);
  if (!listing) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ImageGallery listing={listing} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-semibold">{listing.title}</h1>
            <p className="mt-2 text-muted-foreground">{listing.city}, {listing.region} · {listing.rating} rating · {listing.reviewCount} reviews</p>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">{listing.description}</p>
          <div className="flex flex-wrap gap-2">
            {listing.amenities.map((amenity) => <Badge key={amenity}>{amenity}</Badge>)}
            {listing.privateDock ? <Badge>Eigen steiger</Badge> : null}
            {listing.saunaHotTub ? <Badge>Sauna/hottub</Badge> : null}
            {listing.petsAllowed ? <Badge>Huisdieren toegestaan</Badge> : null}
          </div>
          <BoatInfoCard boat={listing.boat} />
          <section>
            <h2 className="text-2xl font-semibold">Locatie</h2>
            <DynamicNorwayMap listings={[listing]} className="mt-4 h-[420px]" />
          </section>
          <section className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {["Alles voelde premium en rustig.", "De boot lag klaar met duidelijke uitleg."].map((review) => (
                <blockquote key={review} className="rounded-xl bg-muted p-4 text-sm leading-6 text-muted-foreground">{review}</blockquote>
              ))}
            </div>
          </section>
        </section>
        <BookingWidget listing={listing} />
      </div>
    </main>
  );
}
