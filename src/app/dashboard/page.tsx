import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireHost } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireHost();
  const [hostListings, bookings] = await Promise.all([
    prisma.listing.findMany({
      where: { hostId: user.id },
      include: { boat: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.booking.findMany({
      where: { listing: { hostId: user.id } },
      include: { listing: true, user: true },
      orderBy: { createdAt: "desc" }
    })
  ]);
  const revenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Verhuurdersdashboard</h1>
          <p className="mt-2 text-muted-foreground">Beheer je eigen huizen, boten en boekingsaanvragen.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/listings/new">Huis toevoegen</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Jouw huizen</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{hostListings.length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Open aanvragen</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{bookings.filter((item) => item.status === "pending").length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Mock omzet</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{formatCurrency(revenue)}</CardContent></Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Mijn accommodaties</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {hostListings.length ? hostListings.map((listing) => (
            <div key={listing.id} className="flex flex-col gap-3 rounded-xl bg-muted p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{listing.title}</p>
                <p className="text-sm text-muted-foreground">{listing.city} · {formatCurrency(listing.pricePerNight)} per nacht · {listing.boat?.type ?? "boot"}</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/dashboard/listings/${listing.slug}/edit`}>Bewerken</Link>
              </Button>
            </div>
          )) : (
            <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">Je hebt nog geen huizen toegevoegd.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
