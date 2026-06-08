import { LayoutDashboard, UsersRound } from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/admin", label: "Overzicht", icon: LayoutDashboard },
  { href: "/admin/users", label: "Gebruikers", icon: UsersRound },
];

export function AdminNav() {
  return (
    <nav className="border-b border-white/10 bg-[#202326] text-white">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-w-fit items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
