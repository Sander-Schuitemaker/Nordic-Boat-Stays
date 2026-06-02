"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Listing } from "@/lib/types";
import { formatCurrency, nightsBetween } from "@/lib/utils";
import { bookingSchema } from "@/lib/validation";

export function BookingWidget({ listing }: { listing: Listing }) {
  const [checkIn, setCheckIn] = useState("2026-06-12");
  const [checkOut, setCheckOut] = useState("2026-06-19");
  const [guests, setGuests] = useState(2);
  const [status, setStatus] = useState<string | null>(null);
  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const total = nights * listing.pricePerNight + 95;

  async function submit() {
    const parsed = bookingSchema.safeParse({ listingId: listing.id, checkIn, checkOut, guests });
    if (!parsed.success) {
      setStatus(parsed.error.issues[0]?.message ?? "Controleer je aanvraag.");
      return;
    }
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });
    const result = await response.json();
    setStatus(response.ok ? "Boekingsaanvraag verzonden. Status: pending." : result.error || "Log in om te boeken.");
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>{formatCurrency(listing.pricePerNight)} <span className="text-sm font-normal text-muted-foreground">per nacht</span></CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <Label>Check-in</Label>
            <Input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Check-out</Label>
            <Input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Gasten</Label>
          <Input type="number" min="1" max={listing.maxGuests} value={guests} onChange={(event) => setGuests(Number(event.target.value))} />
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm">
          <div className="flex justify-between"><span>{nights} nachten</span><span>{formatCurrency(nights * listing.pricePerNight)}</span></div>
          <div className="mt-2 flex justify-between"><span>Servicekosten</span><span>{formatCurrency(95)}</span></div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold"><span>Totaal</span><span>{formatCurrency(total)}</span></div>
        </div>
        <Button onClick={submit} size="lg">Boeking aanvragen</Button>
        {status ? <p className="rounded-xl bg-secondary p-3 text-sm font-medium text-secondary-foreground">{status}</p> : null}
      </CardContent>
    </Card>
  );
}
