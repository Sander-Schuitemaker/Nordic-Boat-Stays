"use client";

import { Building2, CircleUserRound, ShieldCheck } from "lucide-react";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  applyAsHostAction,
  type AuthActionState,
} from "@/lib/auth-actions";

const initialState: AuthActionState = {};

export function HostApplicationForm({
  defaultName,
}: {
  defaultName: string;
}) {
  const [state, action, pending] = useActionState(
    applyAsHostAction,
    initialState,
  );
  const [hostType, setHostType] = useState("individual");

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="host-name">Naam voor gasten</Label>
          <Input
            id="host-name"
            name="hostName"
            defaultValue={defaultName}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="host-type">Type verhuurder</Label>
          <Select
            name="hostType"
            value={hostType}
            onValueChange={setHostType}
          >
            <SelectTrigger id="host-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">
                <span className="inline-flex items-center gap-2">
                  <CircleUserRound className="size-4" />
                  Particulier
                </span>
              </SelectItem>
              <SelectItem value="company">
                <span className="inline-flex items-center gap-2">
                  <Building2 className="size-4" />
                  Bedrijf
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="host-country">Landcode</Label>
          <Input
            id="host-country"
            name="countryCode"
            defaultValue="NL"
            maxLength={2}
            required
          />
        </div>
        {hostType === "company" ? (
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="company-name">Bedrijfsnaam</Label>
            <Input id="company-name" name="companyName" required />
          </div>
        ) : (
          <input type="hidden" name="companyName" value="" />
        )}
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-6">
        <input
          name="acceptHostTerms"
          type="checkbox"
          className="mt-1 size-4 accent-[var(--primary)]"
          required
        />
        <span>
          Ik accepteer de verhuurdersvoorwaarden en bevestig dat woning-,
          boot- en veiligheidsinformatie volledig en juist wordt aangeleverd.
        </span>
      </label>
      <div className="flex gap-3 rounded-xl bg-[#202326] p-4 text-sm leading-6 text-white/80">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#d4a761]" />
        <p>
          Identiteits- en bankcontrole verloopt later rechtstreeks via de
          betaalprovider. Nordic Boat Stays bewaart geen bankgegevens.
        </p>
      </div>
      <Button type="submit" size="lg" className="w-fit" disabled={pending}>
        {pending ? "Aanvraag indienen..." : "Verhuurdersprofiel aanmaken"}
      </Button>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
