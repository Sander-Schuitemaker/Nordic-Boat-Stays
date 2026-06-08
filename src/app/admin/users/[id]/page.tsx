import { ArrowLeft, Building2, History, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { UserStatusForm } from "@/components/admin/user-status-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminUser } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { canPerformAdminAction } from "@/lib/auth/authorization";

type AdminUserPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminUserPage({ params }: AdminUserPageProps) {
  const actor = await requireAdmin();
  const { id } = await params;
  const user = await getAdminUser(id);

  if (!user) {
    notFound();
  }

  const activeRoles = user.roles
    .filter((item) => !item.revoked_at)
    .map((item) => item.role);

  return (
    <div className="grid gap-7">
      <Button asChild variant="ghost" className="w-fit">
        <Link href="/admin/users">
          <ArrowLeft className="size-4" />
          Gebruikers
        </Link>
      </Button>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{user.account.full_name}</h1>
          <p className="mt-2 text-muted-foreground">{user.account.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{user.account.status}</Badge>
          {activeRoles.map((role) => (
            <Badge key={role} className="bg-accent">
              {role}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-6">
          <section className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="size-5" />
              Accountgegevens
            </div>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">E-mail geverifieerd</dt>
                <dd className="mt-1 font-semibold">
                  {user.account.email_verified ? "Ja" : "Nee"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Telefoon geverifieerd</dt>
                <dd className="mt-1 font-semibold">
                  {user.account.phone_verified ? "Ja" : "Nee"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Aangemaakt</dt>
                <dd className="mt-1 font-semibold">
                  {new Date(user.account.created_at).toLocaleString("nl-NL")}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Laatste login</dt>
                <dd className="mt-1 font-semibold">
                  {user.account.last_login_at
                    ? new Date(user.account.last_login_at).toLocaleString("nl-NL")
                    : "Nog niet geregistreerd"}
                </dd>
              </div>
            </dl>
          </section>
          {user.host ? (
            <section className="rounded-xl border border-border bg-white p-5">
              <div className="flex items-center gap-2 font-semibold">
                <Building2 className="size-5" />
                Verhuurdersprofiel
              </div>
              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Naam</dt>
                  <dd className="mt-1 font-semibold">{user.host.host_name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="mt-1 font-semibold">{user.host.status}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Verificatie</dt>
                  <dd className="mt-1 font-semibold">
                    {user.host.verification_status}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Uitbetalingen</dt>
                  <dd className="mt-1 font-semibold">
                    {user.host.payout_account_status}
                  </dd>
                </div>
              </dl>
            </section>
          ) : null}
          <section className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 font-semibold">
              <History className="size-5" />
              Auditlog
            </div>
            <div className="mt-5 grid gap-3">
              {user.audit.length ? (
                user.audit.map((entry) => (
                  <div key={entry.id} className="rounded-lg bg-muted p-3 text-sm">
                    <p className="font-semibold">{entry.action}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(entry.created_at).toLocaleString("nl-NL")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nog geen beheeracties voor dit account.
                </p>
              )}
            </div>
          </section>
        </div>
        <aside className="rounded-xl border border-border bg-white p-5">
          <h2 className="font-semibold">Account beheren</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Elke wijziging wordt met actor, reden en tijdstip vastgelegd.
          </p>
          <div className="mt-6">
            <UserStatusForm
              userId={id}
              currentStatus={user.account.status}
              currentRoles={activeRoles}
              canMutate={canPerformAdminAction(actor)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
