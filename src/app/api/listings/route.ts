import { NextResponse } from "next/server";
import type { BoatType } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { listingFormSchema } from "@/lib/validation";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "host" && user.role !== "admin")) {
    return NextResponse.json({ error: "Log in als verhuurder om een huis toe te voegen." }, { status: 401 });
  }
  const body = await request.json();
  const parsed = listingFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Controleer het formulier." }, { status: 400 });
  }

  const data = parsed.data;
  const region = await prisma.region.upsert({
    where: { slug: slugify(data.region) },
    update: {},
    create: {
      name: data.region,
      slug: slugify(data.region),
      description: `Vakantiehuizen met boot in ${data.region}.`,
      imageUrl: data.imageUrl
    }
  });

  const amenities = String(data.amenities)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const created = await prisma.listing.create({
    data: {
      hostId: user.id,
      regionId: region.id,
      title: data.title,
      slug: `${slugify(data.title)}-${Date.now()}`,
      address: data.address,
      city: data.address.split(",")[0] || data.region,
      description: data.description,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      pricePerNight: Number(data.pricePerNight),
      maxGuests: Number(data.maxGuests),
      bedrooms: Number(data.bedrooms),
      bathrooms: 1,
      waterfront: true,
      privateDock: true,
      saunaHotTub: amenities.some((item) => /sauna|hottub/i.test(item)),
      images: {
        create: [{ url: data.imageUrl, alt: data.title, sortOrder: 0 }]
      },
      boat: {
        create: {
          type: data.boatType as BoatType,
          capacity: Number(data.boatCapacity),
          enginePowerHp: Number(data.enginePowerHp),
          licenseRequired: Boolean(data.licenseRequired),
          safetyIncluded: true,
          description: `${data.boatType} inbegrepen bij het verblijf.`
        }
      },
      amenities: {
        connectOrCreate: amenities.map((name) => ({
          where: { name },
          create: { name }
        }))
      },
      availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
      availableUntil: data.availableUntil ? new Date(data.availableUntil) : null
    }
  });

  return NextResponse.json({ id: created.id, slug: created.slug });
}
