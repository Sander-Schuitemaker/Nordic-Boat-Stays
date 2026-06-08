import { AccountDeactivationForm } from "@/components/account/account-deactivation-form";
import { SecurityPanel } from "@/components/account/security-panel";
import { requireUser } from "@/lib/auth";

export default async function SecurityPage() {
  const user = await requireUser();

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-2xl font-semibold">Beveiliging</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Beheer hoe je inlogt en controleer de beveiliging van je account.
        </p>
      </div>
      <SecurityPanel user={user} />
      <AccountDeactivationForm />
    </div>
  );
}
