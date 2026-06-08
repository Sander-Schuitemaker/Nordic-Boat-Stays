import { redirect } from "next/navigation";

import { HostApplicationForm } from "@/components/host/host-application-form";
import { requireUser } from "@/lib/auth";

export default async function HostApplyPage() {
  const user = await requireUser();

  if (user.roles.includes("host")) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Verhuren</p>
      <h1 className="mt-2 text-3xl font-semibold">
        Word verhuurder bij Nordic Boat Stays
      </h1>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Je huidige account blijft ook als gast werken. Na de aanvraag kun je je
        dashboard voorbereiden terwijl de verificatie wordt afgerond.
      </p>
      <section className="mt-8 rounded-xl border border-border bg-white p-5 sm:p-7">
        <HostApplicationForm defaultName={user.fullName} />
      </section>
    </main>
  );
}
