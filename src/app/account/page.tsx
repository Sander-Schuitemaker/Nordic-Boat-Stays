import {
  CalendarDays,
  Heart,
  Home,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

const quickLinks = [
  {
    href: "/bookings",
    label: "Mijn boekingen",
    description: "Bekijk aankomende en eerdere verblijven.",
    icon: CalendarDays,
  },
  {
    href: "/favorites",
    label: "Favorieten",
    description: "Vind opgeslagen vakantiehuizen terug.",
    icon: Heart,
  },
  {
    href: "/messages",
    label: "Berichten",
    description: "Praat privé met gasten en verhuurders.",
    icon: MessageSquare,
  },
];

export default async function AccountPage() {
  const user = await requireUser();
  const isHost = user.roles.includes("host");

  return (
    <div className="grid gap-8">
      <section className="overflow-hidden rounded-xl bg-[#202326] p-6 text-white sm:p-8">
        <p className="text-sm text-white/65">Welkom terug</p>
        <h2 className="mt-2 text-2xl font-semibold">{user.fullName}</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {user.roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold"
            >
              {role === "guest"
                ? "Gast"
                : role === "host"
                  ? "Verhuurder"
                  : "Beheerder"}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 rounded-full border border-[#d4a761]/30 bg-[#d4a761]/15 px-3 py-1 text-xs font-semibold text-[#f3d29c]">
            <ShieldCheck className="size-3.5" />
            E-mail geverifieerd
          </span>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lg"
          >
            <item.icon className="size-5" />
            <h2 className="mt-6 font-semibold">{item.label}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </Link>
        ))}
      </section>
      <section className="flex flex-col gap-5 rounded-xl border border-border bg-white p-6 sm:flex-row sm:items-center">
        <Home className="size-6" />
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold">
            {isHost ? "Beheer je vakantiehuizen" : "Wil je een huis met boot verhuren?"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {isHost
              ? "Bekijk woningen, boekingen, berichten en uitbetalingen in het verhuurdersdashboard."
              : "Maak vanuit dit account een verhuurdersprofiel aan. Je gastaccount blijft behouden."}
          </p>
        </div>
        <Button asChild>
          <Link href={isHost ? "/dashboard" : "/host/apply"}>
            {isHost ? "Naar dashboard" : "Verhuurder worden"}
          </Link>
        </Button>
      </section>
    </div>
  );
}
