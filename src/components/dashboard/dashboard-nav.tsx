import { CalendarDays, Home, LayoutDashboard, MessageSquare, PlusCircle } from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/dashboard", label: "Overzicht", icon: LayoutDashboard },
  { href: "/dashboard/listings/new", label: "Nieuw huis", icon: PlusCircle },
  { href: "/dashboard/bookings", label: "Boekingen", icon: CalendarDays },
  { href: "/messages", label: "Berichten", icon: MessageSquare },
  { href: "/", label: "Website", icon: Home }
];

export function DashboardNav() {
  return (
    <nav className="rounded-2xl border border-border bg-white p-3">
      <div className="flex gap-2 overflow-x-auto lg:flex-col">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
