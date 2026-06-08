import { CheckCircle2, KeyRound, MailCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { AppUser } from "@/lib/auth";

export function SecurityPanel({ user }: { user: AppUser }) {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-xl border border-border bg-white p-5">
        <div className="flex items-start gap-3">
          <MailCheck className="mt-0.5 size-5 text-emerald-700" />
          <div>
            <h2 className="font-semibold">E-mailadres</h2>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
          {user.emailVerified ? (
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="size-4" />
              Geverifieerd
            </span>
          ) : null}
        </div>
      </section>
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-white p-5 sm:flex-row sm:items-center">
        <KeyRound className="size-5" />
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold">Wachtwoord</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Vraag per e-mail een beveiligde link aan om je wachtwoord te wijzigen.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/forgot-password">Wachtwoord wijzigen</Link>
        </Button>
      </section>
      <section className="flex gap-3 rounded-xl border border-border bg-white p-5">
        <ShieldCheck className="mt-0.5 size-5" />
        <div>
          <h2 className="font-semibold">Extra beveiliging</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Gevoelige beheerdersacties vereisen een sessie met tweestapsverificatie.
            Het koppelen van een authenticator wordt beschikbaar bij de productie-inrichting.
          </p>
        </div>
      </section>
    </div>
  );
}
