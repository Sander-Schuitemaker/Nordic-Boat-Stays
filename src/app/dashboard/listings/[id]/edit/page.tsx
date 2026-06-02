import { notFound } from "next/navigation";
import { ListingForm } from "@/components/dashboard/listing-form";
import { getListingBySlugOrId } from "@/lib/listing-service";

export const dynamic = "force-dynamic";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingBySlugOrId(id);
  if (!listing) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">Accommodatie bewerken</h1>
      <p className="mt-2 text-muted-foreground">{listing.title}</p>
      <div className="mt-6">
        <ListingForm listing={listing} />
      </div>
    </div>
  );
}
