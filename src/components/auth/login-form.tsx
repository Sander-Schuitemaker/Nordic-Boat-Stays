"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction, type AuthActionState } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {};

export function LoginForm({ nextPath }: { nextPath?: string }) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="login-email">E-mailadres</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="naam@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="login-password">Wachtwoord</Label>
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Wachtwoord vergeten?
          </Link>
        </div>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Beveiligd inloggen..." : "Inloggen"}
      </Button>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}
      <p className="text-center text-sm text-muted-foreground">
        Nog geen account?{" "}
        <Link href="/register" className="font-semibold text-foreground hover:underline">
          Registreren
        </Link>
      </p>
    </form>
  );
}
