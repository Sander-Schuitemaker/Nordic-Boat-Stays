"use client";

import { useActionState } from "react";
import type { InputHTMLAttributes } from "react";
import type { AuthActionState } from "@/lib/auth-actions";
import { loginAction, registerAction } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialState: AuthActionState = {};

export function LoginForm({ nextPath }: { nextPath?: string }) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inloggen</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <Field
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="naam@example.com"
            required
          />
          <Field
            label="Wachtwoord"
            name="password"
            type="password"
            autoComplete="current-password"
            minLength={10}
            required
          />
          {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
          <Button type="submit" size="lg" disabled={pending}>{pending ? "Inloggen..." : "Inloggen"}</Button>
          {state.error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{state.error}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nieuw account</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <Field label="Naam" name="name" autoComplete="name" placeholder="Je volledige naam" required />
          <Field label="E-mail" name="email" type="email" autoComplete="email" placeholder="naam@example.com" required />
          <Field
            label="Wachtwoord"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={10}
            placeholder="Minimaal 10 tekens"
            required
          />
          <div className="grid gap-1">
            <Label>Accounttype</Label>
            <Select name="role" defaultValue="guest">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="guest">Huurder</SelectItem>
                <SelectItem value="host">Verhuurder</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" size="lg" variant="secondary" disabled={pending}>{pending ? "Aanmaken..." : "Account aanmaken"}</Button>
          {state.error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{state.error}</p> : null}
          {state.message ? <p className="rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">{state.message}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}

function Field(props: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const { label, ...inputProps } = props;
  return (
    <div className="grid gap-1">
      <Label htmlFor={inputProps.id ?? props.name}>{label}</Label>
      <Input id={inputProps.id ?? props.name} {...inputProps} />
    </div>
  );
}
