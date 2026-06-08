import {
  CalendarDays,
  Heart,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { logoutAction } from "@/lib/auth-actions";
import type { AppUser } from "@/lib/auth";

export function AccountMenu({ user }: { user: AppUser }) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-3 text-sm font-semibold shadow-sm transition hover:border-foreground/30">
        <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-primary text-xs text-primary-foreground">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            user.fullName
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()
          )}
        </span>
        <span className="hidden max-w-36 truncate sm:block">{user.fullName}</span>
      </summary>
      <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-border bg-white p-2 shadow-xl">
        <div className="border-b border-border px-3 py-3">
          <p className="truncate text-sm font-semibold">{user.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        {[
          { href: "/account", label: "Account", icon: Settings },
          { href: "/bookings", label: "Mijn boekingen", icon: CalendarDays },
          { href: "/favorites", label: "Favorieten", icon: Heart },
          { href: "/messages", label: "Berichten", icon: MessageSquare },
          ...(user.roles.includes("host")
            ? [
                {
                  href: "/dashboard",
                  label: "Verhuurdersdashboard",
                  icon: LayoutDashboard,
                },
              ]
            : []),
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
        <form action={logoutAction} className="border-t border-border pt-2">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium hover:bg-muted"
          >
            <LogOut className="size-4" />
            Uitloggen
          </button>
        </form>
      </div>
    </details>
  );
}
