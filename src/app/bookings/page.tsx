import { CalendarDays, CreditCard, MapPin } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyBookings } from "@/lib/account-data";
import { formatCurrency } from "@/lib/utils";

const statusLabels: Record<string, string> = {
  draft: "Concept",
  pending_payment: "Wacht op betaling",
  confirmed: "Bevestigd",
  checked_in: "Ingecheckt",
  completed: "Voltooid",
  cancelled: "Geannuleerd",
  disputed: "In behandeling",
};

const paymentLabels: Record<string, string> = {
  requires_payment: "Betaling nodig",
  processing: "Wordt verwerkt",
  paid: "Betaald",
  held: "Veilig vastgehouden",
  partially_refunded: "Deels terugbetaald",
  refunded: "Terugbetaald",
  failed: "Mislukt",
  chargeback: "Betwisting",
};

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await getMyBookings();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Mijn boekingen</h1>
      <p className="mt-2 text-muted-foreground">
        Verblijven, betaalstatussen en eerdere reizen op één plek.
      </p>
      <div className="mt-7 grid gap-4">
        {bookings.length ? (
          bookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-xl border border-border bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    {booking.reference}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold">{booking.listingTitle}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4" />
                    {new Date(`${booking.checkIn}T12:00:00`).toLocaleDateString("nl-NL")} tot{" "}
                    {new Date(`${booking.checkOut}T12:00:00`).toLocaleDateString("nl-NL")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{statusLabels[booking.status] ?? booking.status}</Badge>
                  {booking.paymentStatus ? (
                    <Badge className="border border-border bg-white text-foreground">
                      {paymentLabels[booking.paymentStatus] ?? booking.paymentStatus}
                    </Badge>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span>{booking.guests} gasten</span>
                  <span className="inline-flex items-center gap-1">
                    <CreditCard className="size-4" />
                    {formatCurrency(booking.totalCents / 100)}
                  </span>
                </div>
                <Button asChild variant="outline">
                  <Link href={`/listings/${booking.listingId}`}>
                    <MapPin className="size-4" />
                    Bekijk verblijf
                  </Link>
                </Button>
              </div>
            </article>
          ))
        ) : (
          <div className="grid justify-items-start gap-4 rounded-xl border border-border bg-white p-7 text-muted-foreground">
            <CalendarDays className="size-6" />
            <p>Je hebt nog geen boekingen.</p>
            <Button asChild>
              <Link href="/search">Zoek een vakantiehuis</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
