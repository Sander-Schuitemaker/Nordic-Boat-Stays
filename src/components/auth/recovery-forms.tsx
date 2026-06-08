"use client";

import { CheckCircle2, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  requestPasswordResetAction,
  resetPasswordAction,
  type AuthActionState,
} from "@/lib/auth-actions";

const initialState: AuthActionState = {};

function ActionMessage({ state }: { state: AuthActionState }) {
  if (state.error) {
    return (
      <p
        role="alert"
        className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700"
      >
        {state.error}
      </p>
    );
  }

  if (state.message) {
    return (
      <p
        role="status"
        className="flex gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
      >
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
        {state.message}
      </p>
    );
  }

  return null;
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(
    requestPasswordResetAction,
    initialState,
  );

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="recovery-email">E-mailadres</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="recovery-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="naam@example.com"
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Herstelmail aanvragen..." : "Stuur herstelmail"}
      </Button>
      <ActionMessage state={state} />
      <Button asChild variant="ghost">
        <Link href="/login">Terug naar inloggen</Link>
      </Button>
    </form>
  );
}

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="new-password">Nieuw wachtwoord</Label>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="new-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={12}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Herhaal nieuw wachtwoord</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
        />
        <p className="text-xs leading-5 text-muted-foreground">
          Gebruik minimaal 12 tekens en een uniek wachtwoord.
        </p>
      </div>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Wachtwoord beveiligen..." : "Wachtwoord wijzigen"}
      </Button>
      <ActionMessage state={state} />
      {state.message ? (
        <Button asChild variant="outline">
          <Link href="/account/security">Naar accountbeveiliging</Link>
        </Button>
      ) : null}
    </form>
  );
}
