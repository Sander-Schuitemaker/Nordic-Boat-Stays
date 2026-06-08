"use client";

import { useActionState } from "react";

import {
  resendVerificationAction,
  type AuthActionState,
} from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {};

export function VerificationForm({ email }: { email?: string }) {
  const [state, action, pending] = useActionState(
    resendVerificationAction,
    initialState,
  );

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="verification-email">E-mailadres</Label>
        <Input
          id="verification-email"
          name="email"
          type="email"
          defaultValue={email}
          autoComplete="email"
          required
        />
      </div>
      <Button type="submit" variant="outline" disabled={pending}>
        {pending ? "Versturen..." : "Nieuwe verificatiemail sturen"}
      </Button>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
