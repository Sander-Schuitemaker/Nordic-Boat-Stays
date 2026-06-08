import { ListingForm } from "@/components/dashboard/listing-form";
import { requireVerifiedHost } from "@/lib/auth";

export default async function NewListingPage() {
  await requireVerifiedHost();

  return (
    <div>
      <h1 className="text-3xl font-semibold">Nieuw vakantiehuis</h1>
      <p className="mt-2 text-muted-foreground">Voeg een Noors vakantiehuis toe met bootgegevens en beschikbaarheid.</p>
      <div className="mt-6">
        <ListingForm />
      </div>
    </div>
  );
}
