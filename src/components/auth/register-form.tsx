"use client";

import Link from "next/link";
import { useActionState } from "react";

import { registerAction, type AuthActionState } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {};

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, initialState);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="register-name">Volledige naam</Label>
        <Input
          id="register-name"
          name="fullName"
          autoComplete="name"
          placeholder="Je volledige naam"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email">E-mailadres</Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="naam@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password">Wachtwoord</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          placeholder="Minimaal 12 tekens"
          required
        />
        <p className="text-xs leading-5 text-muted-foreground">
          Gebruik minimaal 12 tekens en geen wachtwoord dat je elders gebruikt.
        </p>
      </div>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          name="acceptTerms"
          type="checkbox"
          className="mt-1 size-4 accent-[var(--primary)]"
          required
        />
        <span>
          Ik ga akkoord met de voorwaarden en het privacybeleid van Nordic Boat Stays.
        </span>
      </label>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Account aanmaken..." : "Account aanmaken"}
      </Button>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}
      <p className="text-center text-sm text-muted-foreground">
        Al een account?{" "}
        <Link href="/login" className="font-semibold text-foreground hover:underline">
          Inloggen
        </Link>
      </p>
    </form>
  );
}
