"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  updateNotificationPreferencesAction,
  type AuthActionState,
} from "@/lib/auth-actions";

const initialState: AuthActionState = {};

type Preferences = {
  booking: boolean;
  messages: boolean;
  marketing: boolean;
};

const options = [
  {
    name: "booking" as const,
    label: "Boekingen en betalingen",
    description: "Bevestigingen, wijzigingen, annuleringen en betaalupdates.",
  },
  {
    name: "messages" as const,
    label: "Nieuwe berichten",
    description: "Een melding wanneer een gast of verhuurder je schrijft.",
  },
  {
    name: "marketing" as const,
    label: "Inspiratie en aanbiedingen",
    description: "Af en toe nieuws over regio's en bijzondere verblijven.",
  },
];

export function NotificationPreferencesForm({
  preferences,
}: {
  preferences: Preferences;
}) {
  const [state, action, pending] = useActionState(
    updateNotificationPreferencesAction,
    initialState,
  );

  return (
    <form action={action} className="grid gap-6">
      <div className="divide-y divide-border rounded-xl border border-border bg-white">
        {options.map((option) => (
          <label
            key={option.name}
            className="flex cursor-pointer items-start gap-4 p-5"
          >
            <Checkbox
              name={option.name}
              defaultChecked={preferences[option.name]}
              className="mt-0.5"
            />
            <span>
              <span className="block font-semibold">{option.label}</span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                {option.description}
              </span>
            </span>
          </label>
        ))}
      </div>
      <Button type="submit" className="w-fit" disabled={pending}>
        {pending ? "Voorkeuren opslaan..." : "Voorkeuren opslaan"}
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
