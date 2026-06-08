import { CheckCircle2, Search, XCircle } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminUsers } from "@/lib/admin-data";
import type { AccountStatus, AppRole } from "@/lib/auth/authorization";

type AdminUsersPageProps = {
  searchParams: Promise<{
    q?: string;
    role?: string;
    status?: string;
    page?: string;
  }>;
};

const roles: AppRole[] = ["guest", "host", "admin"];
const statuses: AccountStatus[] = [
  "pending_email_verification",
  "active",
  "suspended",
  "deactivated",
  "deleted",
];

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const params = await searchParams;
  const role = roles.includes(params.role as AppRole)
    ? (params.role as AppRole)
    : undefined;
  const status = statuses.includes(params.status as AccountStatus)
    ? (params.status as AccountStatus)
    : undefined;
  const result = await getAdminUsers({
    q: params.q,
    role,
    status,
    page: Number(params.page) || 1,
  });
  const pageCount = Math.max(1, Math.ceil(result.total / result.pageSize));

  return (
    <div className="grid gap-7">
      <div>
        <h1 className="text-3xl font-semibold">Gebruikers</h1>
        <p className="mt-2 text-muted-foreground">
          Zoek accounts en beheer rollen, status en hostverificatie.
        </p>
      </div>
      <form className="grid gap-3 rounded-xl border border-border bg-white p-4 md:grid-cols-[minmax(240px,1fr)_180px_220px_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={params.q}
            placeholder="Naam of e-mailadres"
            className="pl-10"
          />
        </div>
        <select
          name="role"
          defaultValue={role ?? ""}
          className="h-11 rounded-xl border border-border bg-white px-3 text-sm"
        >
          <option value="">Alle rollen</option>
          <option value="guest">Gast</option>
          <option value="host">Verhuurder</option>
          <option value="admin">Beheerder</option>
        </select>
        <select
          name="status"
          defaultValue={status ?? ""}
          className="h-11 rounded-xl border border-border bg-white px-3 text-sm"
        >
          <option value="">Alle statussen</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Button type="submit">Filteren</Button>
      </form>
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[840px] text-left text-sm">
          <thead className="border-b border-border bg-muted/60 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Gebruiker</th>
              <th className="px-4 py-3">Rollen</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Aangemaakt</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {result.users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-4">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">{user.status}</td>
                <td className="px-4 py-4">
                  {user.emailVerified ? (
                    <CheckCircle2 className="size-5 text-emerald-700" />
                  ) : (
                    <XCircle className="size-5 text-amber-700" />
                  )}
                </td>
                <td className="px-4 py-4">
                  {new Date(user.createdAt).toLocaleDateString("nl-NL")}
                </td>
                <td className="px-4 py-4 text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/users/${user.id}`}>Beheren</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!result.users.length ? (
          <p className="p-6 text-sm text-muted-foreground">
            Geen gebruikers gevonden met deze filters.
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Pagina {result.page} van {pageCount} · {result.total} accounts
        </p>
        <div className="flex gap-2">
          <Button
            asChild={result.page > 1}
            variant="outline"
            disabled={result.page <= 1}
          >
            {result.page > 1 ? (
              <Link href={`?page=${result.page - 1}`}>Vorige</Link>
            ) : (
              <span>Vorige</span>
            )}
          </Button>
          <Button
            asChild={result.page < pageCount}
            variant="outline"
            disabled={result.page >= pageCount}
          >
            {result.page < pageCount ? (
              <Link href={`?page=${result.page + 1}`}>Volgende</Link>
            ) : (
              <span>Volgende</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
