import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { requireHost } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireHost();

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8">
      <DashboardNav />
      <div>{children}</div>
    </main>
  );
}
