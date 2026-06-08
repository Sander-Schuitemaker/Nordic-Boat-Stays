import Link from "next/link";
import { Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireHost } from "@/lib/auth";
import { canPublishListing } from "@/lib/auth/authorization";
import { getMyHostBookings, getMyHostListings } from "@/lib/account-data";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireHost();
  const canManageListings = canPublishListing(user);
  const [hostListings, bookings] = await Promise.all([
    getMyHostListings(),
    getMyHostBookings(),
  ]);
  const revenue = bookings.reduce((sum, booking) => sum + booking.totalCents, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Verhuurdersdashboard</h1>
          <p className="mt-2 text-muted-foreground">Beheer je eigen huizen, boten en boekingsaanvragen.</p>
        </div>
        {canManageListings ? (
          <Button asChild>
            <Link href="/dashboard/listings/new">Huis toevoegen</Link>
          </Button>
        ) : (
          <Button type="button" disabled>
            Huis toevoegen na verificatie
          </Button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Jouw huizen</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{hostListings.length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Open boekingen</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{bookings.filter((item) => ["pending_payment", "confirmed", "checked_in"].includes(item.status)).length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Boekingswaarde</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{formatCurrency(revenue / 100)}</CardContent></Card>
      </div>
      <Card>
        <CardHeader className="gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
              <Landmark className="size-5" aria-hidden="true" />
            </span>
            <div>
              <CardTitle>Uitbetalingen</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Ontvang inkomsten veilig op je eigen bankrekening.</p>
            </div>
          </div>
          <Badge>Nog niet gekoppeld</Badge>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="flex gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden="true" />
            <p>
              Identiteits- en bankgegevens worden later rechtstreeks door Stripe gecontroleerd.
              Nordic Boat Stays slaat deze gevoelige gegevens niet zelf op.
            </p>
          </div>
          <Button type="button" variant="outline" disabled>
            Stripe koppelen - binnenkort
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mijn accommodaties</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {hostListings.length ? hostListings.map((listing) => (
            <div key={listing.id} className="flex flex-col gap-3 rounded-xl bg-muted p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{listing.title}</p>
                <p className="text-sm text-muted-foreground">{listing.city} · {formatCurrency(listing.priceCents / 100)} per nacht · {listing.status}</p>
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
