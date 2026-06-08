"use client";

import { Trash2 } from "lucide-react";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deactivateAccountAction,
  type AuthActionState,
} from "@/lib/auth-actions";

const initialState: AuthActionState = {};

export function AccountDeactivationForm() {
  const [state, action, pending] = useActionState(
    deactivateAccountAction,
    initialState,
  );
  const [confirmation, setConfirmation] = useState("");

  return (
    <section className="rounded-xl border border-red-200 bg-red-50/60 p-5">
      <div className="flex gap-3">
        <Trash2 className="mt-0.5 size-5 shrink-0 text-red-800" />
        <div>
          <h2 className="font-semibold text-red-950">Account deactiveren</h2>
          <p className="mt-2 text-sm leading-6 text-red-900/75">
            Je account wordt direct uitgeschakeld. Actieve boekingen en open
            uitbetalingen blokkeren deze actie. Persoonsgegevens worden na de
            bewaartermijn geanonimiseerd; wettelijk verplichte boekings- en
            betaaladministratie blijft bewaard.
          </p>
        </div>
      </div>
      <form action={action} className="mt-5 grid gap-3">
        <Label htmlFor="deactivate-confirmation">
          Typ <strong>VERWIJDER MI</strong> om te bevestigen
        </Label>
        <Input
          id="deactivate-confirmation"
          name="confirmation"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          autoComplete="off"
        />
        <Button
          type="submit"
          variant="outline"
          className="w-fit border-red-300 text-red-900 hover:bg-red-100"
          disabled={pending || confirmation !== "VERWIJDER MI"}
        >
          <Trash2 className="size-4" />
          {pending ? "Account deactiveren..." : "Account definitief deactiveren"}
        </Button>
        {state.error ? (
          <p role="alert" className="text-sm font-medium text-red-800">
            {state.error}
          </p>
        ) : null}
      </form>
    </section>
  );
}
