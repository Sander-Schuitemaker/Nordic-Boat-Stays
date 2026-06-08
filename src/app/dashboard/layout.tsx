import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { requireHost } from "@/lib/auth";
import { canPublishListing } from "@/lib/auth/authorization";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireHost();
  const canManageListings = canPublishListing(user);
  const statusContent = {
    pending_verification: {
      icon: AlertTriangle,
      title: "Verificatie wordt beoordeeld",
      text: "Je kunt het dashboard bekijken. Publiceren en uitbetalingen worden vrijgegeven na goedkeuring.",
      tone: "border-amber-200 bg-amber-50 text-amber-950",
    },
    rejected: {
      icon: ShieldAlert,
      title: "Verificatie niet goedgekeurd",
      text: "Controleer je gegevens of neem contact op met support voor een nieuwe beoordeling.",
      tone: "border-red-200 bg-red-50 text-red-950",
    },
    restricted: {
      icon: ShieldAlert,
      title: "Verhuurdersaccount beperkt",
      text: "Publiceren en uitbetalen zijn tijdelijk gepauzeerd. Neem contact op met support.",
      tone: "border-red-200 bg-red-50 text-red-950",
    },
    suspended: {
      icon: ShieldAlert,
      title: "Verhuurdersaccount geschorst",
      text: "Nieuwe verhuuractiviteiten zijn geblokkeerd. Neem contact op met support.",
      tone: "border-red-200 bg-red-50 text-red-950",
    },
    not_started: {
      icon: AlertTriangle,
      title: "Verificatie nog niet gestart",
      text: "Rond je verhuurdersprofiel af om accommodaties te kunnen publiceren.",
      tone: "border-amber-200 bg-amber-50 text-amber-950",
    },
    verified: {
      icon: CheckCircle2,
      title: "Verhuurder geverifieerd",
      text: "Je kunt accommodaties publiceren en de uitbetalingskoppeling afronden.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
    },
  } as const;
  const status = statusContent[user.hostStatus ?? "not_started"];
  const StatusIcon = status.icon;

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8">
      <DashboardNav canManageListings={canManageListings} />
      <div className="min-w-0">
        {!canManageListings ? (
          <div className={`mb-6 flex gap-3 rounded-xl border p-4 ${status.tone}`}>
            <StatusIcon className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-semibold">{status.title}</p>
              <p className="mt-1 text-sm leading-6 opacity-80">{status.text}</p>
            </div>
          </div>
        ) : null}
        {children}
      </div>
    </main>
  );
}
