import type { Prisma } from "@prisma/client";
import type { Listing } from "@/lib/types";
import { prisma } from "@/lib/db";

const listingInclude = {
  region: true,
  boat: true,
  images: { orderBy: { sortOrder: "asc" as const } },
  amenities: true
};

type DbListing = Prisma.ListingGetPayload<{ include: typeof listingInclude }>;

export function mapListing(listing: DbListing): Listing {
  return {
    id: listing.id,
    slug: listing.slug,
    title: listing.title,
    city: listing.city,
    region: listing.region.name,
    address: listing.address,
    description: listing.description,
    latitude: listing.latitude,
    longitude: listing.longitude,
    pricePerNight: listing.pricePerNight,
    maxGuests: listing.maxGuests,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    rating: listing.rating,
    reviewCount: listing.reviewCount,
    popularity: listing.popularity,
    petsAllowed: listing.petsAllowed,
    waterfront: listing.waterfront,
    privateDock: listing.privateDock,
    saunaHotTub: listing.saunaHotTub,
    amenities: listing.amenities.map((amenity) => amenity.name),
    images: listing.images.map((image) => image.url),
    boat: {
      type: listing.boat?.type ?? "motorboot",
      capacity: listing.boat?.capacity ?? 4,
      enginePowerHp: listing.boat?.enginePowerHp ?? 60,
      licenseRequired: listing.boat?.licenseRequired ?? false,
      safetyIncluded: listing.boat?.safetyIncluded ?? true,
      description: listing.boat?.description ?? "Boot inbegrepen bij het verblijf."
    }
  };
}

export async function getListings() {
  const listings = await prisma.listing.findMany({
    include: listingInclude,
    orderBy: { createdAt: "desc" }
  });
  return listings.map(mapListing);
}

export async function getListingBySlugOrId(id: string) {
  const listing = await prisma.listing.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: listingInclude
  });
  return listing ? mapListing(listing) : null;
}

export async function getRegions() {
  return prisma.region.findMany({ orderBy: { name: "asc" } });
}

export async function getFavoriteListings(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { listing: { include: listingInclude } },
    orderBy: { createdAt: "desc" }
  });

  return favorites.map((favorite) => mapListing(favorite.listing));
}
