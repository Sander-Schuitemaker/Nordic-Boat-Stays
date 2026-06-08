"use client";

import {
  Bell,
  CircleUserRound,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const items = [
  { href: "/account", label: "Overzicht", icon: LayoutDashboard },
  { href: "/account/profile", label: "Profiel", icon: CircleUserRound },
  { href: "/account/security", label: "Beveiliging", icon: ShieldCheck },
  { href: "/account/notifications", label: "Meldingen", icon: Bell },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Accountinstellingen"
      className="border-b border-border lg:border-b-0 lg:border-r"
    >
      <div className="flex gap-2 overflow-x-auto pb-4 lg:flex-col lg:pr-6">
        {items.map((item) => {
          const active =
            item.href === "/account"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-w-fit items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
