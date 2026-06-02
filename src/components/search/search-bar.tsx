"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SearchBarDefaults = {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  boatType?: string;
};

export function SearchBar({ compact = false, defaults = {} }: { compact?: boolean; defaults?: SearchBarDefaults }) {
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = new URLSearchParams();

    for (const key of ["location", "checkIn", "checkOut", "guests", "boatType"]) {
      const value = form.get(key);
      if (value && value !== "alle") {
        next.set(key, String(value));
      }
    }

    router.push(`/search?${next.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 rounded-3xl bg-white p-3 shadow-2xl ring-1 ring-border ${compact ? "lg:grid-cols-6" : "lg:grid-cols-[1.2fr_1fr_1fr_.8fr_1fr_auto]"}`}>
      <div className="flex flex-col gap-1 px-2">
        <Label htmlFor="location">Locatie in Noorwegen</Label>
        <Input id="location" name="location" placeholder="Lofoten, Bergen..." defaultValue={defaults.location ?? ""} />
      </div>
      <div className="flex flex-col gap-1 px-2">
        <Label htmlFor="checkIn">Check-in</Label>
        <Input id="checkIn" name="checkIn" type="date" defaultValue={defaults.checkIn ?? ""} />
      </div>
      <div className="flex flex-col gap-1 px-2">
        <Label htmlFor="checkOut">Check-out</Label>
        <Input id="checkOut" name="checkOut" type="date" defaultValue={defaults.checkOut ?? ""} />
      </div>
      <div className="flex flex-col gap-1 px-2">
        <Label htmlFor="guests">Gasten</Label>
        <Input id="guests" name="guests" type="number" min="1" defaultValue={defaults.guests ?? "2"} />
      </div>
      <div className="flex flex-col gap-1 px-2">
        <Label>Type boot</Label>
        <Select name="boatType" defaultValue={defaults.boatType ?? "alle"}>
          <SelectTrigger>
            <SelectValue placeholder="Alle boten" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle boten</SelectItem>
            <SelectItem value="motorboot">Motorboot</SelectItem>
            <SelectItem value="vissersboot">Vissersboot</SelectItem>
            <SelectItem value="sloep">Sloep</SelectItem>
            <SelectItem value="rib">RIB</SelectItem>
            <SelectItem value="kajuitboot">Kajuitboot</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" size="lg" className="h-full min-h-12 self-end">
        <Search className="size-5" />
        Zoek
      </Button>
    </form>
  );
}
