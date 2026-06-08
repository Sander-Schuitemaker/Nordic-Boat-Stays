"use client";

import { ShieldAlert, UserCog } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MutationState = {
  pending: boolean;
  error: string | null;
  message: string | null;
};

const initialState: MutationState = {
  pending: false,
  error: null,
  message: null,
};

export function UserStatusForm({
  userId,
  currentStatus,
  currentRoles,
  canMutate,
}: {
  userId: string;
  currentStatus: string;
  currentRoles: string[];
  canMutate: boolean;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [role, setRole] = useState("host");
  const [roleEnabled, setRoleEnabled] = useState(true);
  const [reason, setReason] = useState("");
  const [state, setState] = useState(initialState);

  async function mutate(path: "status" | "role", payload: object) {
    setState({ pending: true, error: null, message: null });
    const response = await fetch(`/api/admin/users/${userId}/${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as {
      error?: string;
      message?: string;
    };
    setState({
      pending: false,
      error: response.ok ? null : result.error ?? "Wijziging mislukt.",
      message: response.ok ? result.message ?? "Wijziging opgeslagen." : null,
    });
  }

  return (
    <div className="grid gap-6">
      {!canMutate ? (
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" />
          <p>
            Voor rol- en statuswijzigingen is een adminsessie met
            tweestapsverificatie vereist.
          </p>
        </div>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="admin-reason">Reden voor de wijziging</Label>
        <textarea
          id="admin-reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={3}
          minLength={10}
          maxLength={1000}
          className="w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Deze reden wordt in de auditlog opgeslagen."
        />
      </div>
      <section className="grid gap-4 rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="size-4" />
          Accountstatus
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending_email_verification">
              E-mailverificatie open
            </SelectItem>
            <SelectItem value="active">Actief</SelectItem>
            <SelectItem value="suspended">Geschorst</SelectItem>
            <SelectItem value="deactivated">Gedeactiveerd</SelectItem>
            <SelectItem value="deleted">Verwijderd</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          disabled={!canMutate || state.pending || reason.trim().length < 10}
          onClick={() => void mutate("status", { status, reason })}
        >
          Status wijzigen
        </Button>
      </section>
      <section className="grid gap-4 rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 font-semibold">
          <UserCog className="size-4" />
          Rollen
        </div>
        <p className="text-sm text-muted-foreground">
          Huidig: {currentRoles.join(", ") || "geen"}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="guest">Gast</SelectItem>
              <SelectItem value="host">Verhuurder</SelectItem>
              <SelectItem value="admin">Beheerder</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={roleEnabled ? "enable" : "disable"}
            onValueChange={(value) => setRoleEnabled(value === "enable")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="enable">Rol toevoegen</SelectItem>
              <SelectItem value="disable">Rol intrekken</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={!canMutate || state.pending || reason.trim().length < 10}
          onClick={() =>
            void mutate("role", {
              role,
              enabled: roleEnabled,
              reason,
            })
          }
        >
          Rol wijzigen
        </Button>
      </section>
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
    </div>
  );
}
