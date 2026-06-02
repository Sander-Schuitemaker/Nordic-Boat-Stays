import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireHost } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardBookingsPage() {
  const user = await requireHost();
  const bookings = await prisma.booking.findMany({
    where: { listing: { hostId: user.id } },
    include: { listing: true, user: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold">Boekingen beheren</h1>
      <p className="mt-2 text-muted-foreground">Alleen aanvragen voor jouw accommodaties worden hier getoond.</p>
      <Card className="mt-6">
        <CardHeader><CardTitle>Aanvragen</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          {bookings.length ? bookings.map((booking) => (
            <div key={booking.id} className="grid gap-3 rounded-xl bg-muted p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-semibold">{booking.listing.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {booking.user.name} · {booking.checkIn.toLocaleDateString("nl-NL")} tot {booking.checkOut.toLocaleDateString("nl-NL")} · {booking.guests} gasten
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge>{booking.status}</Badge>
                <span className="font-semibold">{formatCurrency(booking.totalPrice)}</span>
              </div>
            </div>
          )) : (
            <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">Er zijn nog geen boekingsaanvragen voor jouw huizen.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
