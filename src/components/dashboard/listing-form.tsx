"use client";

import type * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Listing } from "@/lib/types";
import { listingFormSchema } from "@/lib/validation";

export function ListingForm({ listing }: { listing?: Listing }) {
  const [message, setMessage] = useState<string | null>(null);

  async function submit(formData: FormData) {
    const payload = {
      title: formData.get("title"),
      region: formData.get("region"),
      address: formData.get("address"),
      latitude: formData.get("latitude"),
      longitude: formData.get("longitude"),
      description: formData.get("description"),
      pricePerNight: formData.get("pricePerNight"),
      maxGuests: formData.get("maxGuests"),
      bedrooms: formData.get("bedrooms"),
      amenities: formData.get("amenities"),
      imageUrl: formData.get("imageUrl"),
      boatType: formData.get("boatType"),
      boatCapacity: formData.get("boatCapacity"),
      enginePowerHp: formData.get("enginePowerHp"),
      licenseRequired: formData.get("licenseRequired") === "on",
      safetyIncluded: true,
      availableFrom: formData.get("availableFrom"),
      availableUntil: formData.get("availableUntil")
    };
    const parsed = listingFormSchema.safeParse(payload);

    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Controleer het formulier.");
      return;
    }

    const response = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });
    const result = await response.json();
    setMessage(response.ok ? "Huis met boot opgeslagen in de database." : result.error || "Opslaan mislukt.");
  }

  return (
    <form action={submit} className="grid gap-6">
      <Card>
        <CardHeader><CardTitle>Woninggegevens</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Titel" name="title" defaultValue={listing?.title ?? ""} />
          <Field label="Regio" name="region" defaultValue={listing?.region ?? ""} />
          <Field label="Adres/locatie" name="address" defaultValue={listing?.address ?? ""} />
          <Field label="Foto-URL" name="imageUrl" defaultValue={listing?.images[0] ?? "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"} />
          <Field label="Latitude" name="latitude" type="number" step="0.001" defaultValue={listing?.latitude ?? 60.391} />
          <Field label="Longitude" name="longitude" type="number" step="0.001" defaultValue={listing?.longitude ?? 5.322} />
          <Field label="Prijs per nacht" name="pricePerNight" type="number" defaultValue={listing?.pricePerNight ?? 320} />
          <Field label="Aantal gasten" name="maxGuests" type="number" defaultValue={listing?.maxGuests ?? 4} />
          <Field label="Slaapkamers" name="bedrooms" type="number" defaultValue={listing?.bedrooms ?? 2} />
          <Field label="Faciliteiten" name="amenities" defaultValue={listing?.amenities.join(", ") ?? "Wifi, Keuken, Sauna"} />
          <Field label="Beschikbaar vanaf" name="availableFrom" type="date" defaultValue="2026-05-15" />
          <Field label="Beschikbaar tot" name="availableUntil" type="date" defaultValue="2026-10-01" />
          <div className="flex flex-col gap-1 md:col-span-2">
            <Label>Beschrijving</Label>
            <textarea name="description" defaultValue={listing?.description ?? ""} className="min-h-32 rounded-xl border border-border bg-white p-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Bootgegevens</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <Label>Type boot</Label>
            <Select name="boatType" defaultValue={listing?.boat.type ?? "motorboot"}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="motorboot">Motorboot</SelectItem>
                <SelectItem value="vissersboot">Vissersboot</SelectItem>
                <SelectItem value="sloep">Sloep</SelectItem>
                <SelectItem value="rib">RIB</SelectItem>
                <SelectItem value="kajuitboot">Kajuitboot</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field label="Capaciteit" name="boatCapacity" type="number" defaultValue={listing?.boat.capacity ?? 5} />
          <Field label="Motorvermogen pk" name="enginePowerHp" type="number" defaultValue={listing?.boat.enginePowerHp ?? 60} />
          <label className="flex items-center gap-3 text-sm font-medium">
            <Checkbox name="licenseRequired" defaultChecked={listing?.boat.licenseRequired ?? false} />
            Vaarbewijs nodig
          </label>
        </CardContent>
      </Card>
      <div className="flex items-center gap-4">
        <Button type="submit" size="lg">{listing ? "Wijzigingen opslaan" : "Huis met boot toevoegen"}</Button>
        {message ? <p className="text-sm font-medium text-muted-foreground">{message}</p> : null}
      </div>
    </form>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const { label, ...inputProps } = props;
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input {...inputProps} />
    </div>
  );
}
