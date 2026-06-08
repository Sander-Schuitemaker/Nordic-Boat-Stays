import {
  Clock3,
  ShieldAlert,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

import { getAdminSummary } from "@/lib/admin-data";

export default async function AdminPage() {
  const summary = await getAdminSummary();
  const cards = [
    { label: "Gebruikers", value: summary.users, icon: UsersRound },
    { label: "Verhuurders", value: summary.hosts, icon: UserRoundCheck },
    { label: "Hosts te beoordelen", value: summary.pendingHosts, icon: Clock3 },
    {
      label: "Geschorste accounts",
      value: summary.suspendedUsers,
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-semibold text-accent">Platformbeheer</p>
        <h1 className="mt-2 text-3xl font-semibold">Admin dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Accounts, hostverificaties en beveiligingsacties.
        </p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href="/admin/users"
            className="rounded-xl border border-border bg-white p-5 transition hover:border-foreground/25 hover:shadow-lg"
          >
            <card.icon className="size-5" />
            <p className="mt-6 text-3xl font-semibold">{card.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
