"use client";

import { useActionState } from "react";

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
  updateProfileAction,
  type AuthActionState,
} from "@/lib/auth-actions";

const initialState: AuthActionState = {};

export type ProfileFormValues = {
  fullName: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  language: string;
  bio: string;
  preferredCurrency: string;
};

export function ProfileForm({ values }: { values: ProfileFormValues }) {
  const [state, action, pending] = useActionState(
    updateProfileAction,
    initialState,
  );

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="profile-name">Volledige naam</Label>
          <Input
            id="profile-name"
            name="fullName"
            defaultValue={values.fullName}
            autoComplete="name"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profile-phone">Telefoonnummer</Label>
          <Input
            id="profile-phone"
            name="phone"
            type="tel"
            defaultValue={values.phone}
            autoComplete="tel"
            placeholder="+31 6 12345678"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profile-birth-date">Geboortedatum</Label>
          <Input
            id="profile-birth-date"
            name="dateOfBirth"
            type="date"
            defaultValue={values.dateOfBirth}
            autoComplete="bday"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profile-country">Landcode</Label>
          <Input
            id="profile-country"
            name="country"
            defaultValue={values.country}
            maxLength={2}
            placeholder="NL"
            autoComplete="country"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profile-language">Voorkeurstaal</Label>
          <Select name="language" defaultValue={values.language || "nl"}>
            <SelectTrigger id="profile-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nl">Nederlands</SelectItem>
              <SelectItem value="no">Noors</SelectItem>
              <SelectItem value="sv">Zweeds</SelectItem>
              <SelectItem value="da">Deens</SelectItem>
              <SelectItem value="de">Duits</SelectItem>
              <SelectItem value="en">Engels</SelectItem>
              <SelectItem value="es">Spaans</SelectItem>
              <SelectItem value="fr">Frans</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profile-currency">Voorkeursvaluta</Label>
          <Select
            name="preferredCurrency"
            defaultValue={values.preferredCurrency || "EUR"}
          >
            <SelectTrigger id="profile-currency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR - euro</SelectItem>
              <SelectItem value="NOK">NOK - Noorse kroon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="profile-bio">Over jou</Label>
          <textarea
            id="profile-bio"
            name="bio"
            defaultValue={values.bio}
            maxLength={2000}
            rows={5}
            className="w-full resize-y rounded-xl border border-border bg-white px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            placeholder="Vertel kort iets over jezelf als gast of verhuurder."
          />
        </div>
      </div>
      <Button type="submit" className="w-fit" disabled={pending}>
        {pending ? "Profiel opslaan..." : "Profiel opslaan"}
      </Button>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
