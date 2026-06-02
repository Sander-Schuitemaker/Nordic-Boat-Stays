import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Log in om een boeking aan te vragen." }, { status: 401 });
  }
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Controleer je aanvraag." }, { status: 400 });
  }

  const listing = await prisma.listing.findUnique({
    where: { id: parsed.data.listingId },
    include: { host: true }
  });

  if (!listing) {
    return NextResponse.json({ error: "Deze accommodatie bestaat niet." }, { status: 404 });
  }

  const conflict = await prisma.booking.findFirst({
    where: {
      listingId: listing.id,
      status: { in: ["pending", "accepted"] },
      checkIn: { lt: new Date(parsed.data.checkOut) },
      checkOut: { gt: new Date(parsed.data.checkIn) }
    }
  });

  if (conflict) {
    return NextResponse.json({ error: "Deze periode is al bezet of in aanvraag." }, { status: 409 });
  }

  const nights = Math.max(1, Math.ceil((new Date(parsed.data.checkOut).getTime() - new Date(parsed.data.checkIn).getTime()) / 86400000));
  const booking = await prisma.booking.create({
    data: {
      listingId: listing.id,
      userId: user.id,
      checkIn: new Date(parsed.data.checkIn),
      checkOut: new Date(parsed.data.checkOut),
      guests: parsed.data.guests,
      status: "pending",
      totalPrice: nights * listing.pricePerNight + 95,
      message: parsed.data.message,
      payment: {
        create: {
          provider: "mock",
          amount: nights * listing.pricePerNight + 95,
          status: "pending"
        }
      }
    }
  });

  await prisma.message.create({
    data: {
      senderId: user.id,
      recipientId: listing.hostId,
      listingId: listing.id,
      bookingId: booking.id,
      body: parsed.data.message || "Ik heb een boekingsaanvraag verstuurd."
    }
  });

  return NextResponse.json({ id: booking.id, status: booking.status });
}
