import type { ReactNode } from "react";

import { AccountNav } from "@/components/account/account-nav";
import { requireUser } from "@/lib/auth";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireUser();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-accent">Mijn Nordic Boat Stays</p>
        <h1 className="mt-2 text-3xl font-semibold">Account en instellingen</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <AccountNav />
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
