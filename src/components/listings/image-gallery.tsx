import type { Listing } from "@/lib/types";

export function ImageGallery({ listing }: { listing: Listing }) {
  return (
    <div className="grid gap-3 overflow-hidden rounded-3xl md:grid-cols-4 md:grid-rows-2">
      <img src={listing.images[0]} alt={listing.title} className="h-80 w-full object-cover md:col-span-2 md:row-span-2 md:h-full" />
      {listing.images.slice(1, 5).map((image, index) => (
        <img key={image} src={image} alt={`${listing.title} ${index + 2}`} className="hidden h-48 w-full object-cover md:block" />
      ))}
    </div>
  );
}
