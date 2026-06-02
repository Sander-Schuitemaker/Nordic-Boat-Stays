"use client";

import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const booleanFilters = ["Huisdieren toegestaan", "Aan het water", "Eigen steiger", "Sauna/hottub"];

export function FilterSidebar() {
  return (
    <aside className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="size-5" />
        <h2 className="font-semibold">Filters</h2>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label>Prijs per nacht</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Min" type="number" />
            <Input placeholder="Max" type="number" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Slaapkamers</Label>
          <Input type="number" min="1" placeholder="Minimaal" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Sorteren</Label>
          <Select defaultValue="populariteit">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="populariteit">Populariteit</SelectItem>
              <SelectItem value="prijs">Prijs</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          {booleanFilters.map((filter) => (
            <label key={filter} className="flex items-center gap-3 text-sm">
              <Checkbox />
              {filter}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
