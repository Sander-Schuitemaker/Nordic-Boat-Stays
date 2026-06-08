import { PrismaClient } from "@prisma/client";
import { listings, regions } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.message.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.boat.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.region.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const host = await prisma.user.create({
    data: {
      email: "host@nordicboatstays.test",
      name: "Nordic Boat Stays Host",
      passwordHash: "supabase-managed",
      role: "HOST",
      profile: {
        create: {
          phone: "+47 900 00 000",
          bio: "Lokale verhuurder met focus op huizen aan het water."
        }
      }
    }
  });

  const guest = await prisma.user.create({
    data: {
      email: "gast@nordicboatstays.test",
      name: "Demo Gast",
      passwordHash: "supabase-managed",
      role: "GUEST"
    }
  });

  const regionRecords = new Map<string, string>();
  for (const region of regions) {
    const created = await prisma.region.create({
      data: region
    });
    regionRecords.set(region.name, created.id);
  }

  const extraRegions = [
    ["Trondheim", "trondheim", "Ruige eilandkust en rustige visserswateren rond Trøndelag."],
    ["Ålesund", "alesund", "Art-nouveau stad, eilanden en toegang tot Sunnmøre-fjorden."]
  ];

  for (const [name, slug, description] of extraRegions) {
    const created = await prisma.region.create({
      data: {
        name,
        slug,
        description,
        imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
      }
    });
    regionRecords.set(name, created.id);
  }

  const amenities = new Map<string, string>();
  for (const name of [...new Set(listings.flatMap((listing) => listing.amenities))]) {
    const amenity = await prisma.amenity.create({
      data: { name }
    });
    amenities.set(name, amenity.id);
  }

  const createdListingIds: string[] = [];

  for (const listing of listings) {
    const createdListing = await prisma.listing.create({
      data: {
        id: listing.id,
        hostId: host.id,
        regionId: regionRecords.get(listing.region)!,
        title: listing.title,
        slug: listing.slug,
        address: listing.address,
        city: listing.city,
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
        images: {
          create: listing.images.map((url, index) => ({
            url,
            alt: `${listing.title} foto ${index + 1}`,
            sortOrder: index
          }))
        },
        boat: {
          create: listing.boat
        },
        amenities: {
          connect: listing.amenities.map((name) => ({ id: amenities.get(name)! }))
        },
        reviews: {
          create: [
            {
              userId: guest.id,
              rating: Math.round(listing.rating),
              comment: "Prachtige plek, duidelijke bootinstructie en alles voelde heel verzorgd."
            }
          ]
        }
      }
    });
    createdListingIds.push(createdListing.id);
  }

  const booking = await prisma.booking.create({
    data: {
      listingId: createdListingIds[0],
      userId: guest.id,
      checkIn: new Date("2026-06-12"),
      checkOut: new Date("2026-06-19"),
      guests: 4,
      status: "pending",
      totalPrice: 2730,
      message: "Is de boot geschikt voor een rustige tocht met twee kinderen?",
      payment: {
        create: {
          provider: "mock",
          amount: 2730,
          status: "pending"
        }
      }
    }
  });

  await prisma.message.create({
    data: {
      senderId: guest.id,
      recipientId: host.id,
      listingId: createdListingIds[0],
      bookingId: booking.id,
      body: "Hallo, is de boot geschikt voor een rustige tocht met twee kinderen?"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
