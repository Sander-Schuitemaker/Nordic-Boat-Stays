import { AlertTriangle } from "lucide-react";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/recovery-forms";
import { Button } from "@/components/ui/button";
import { SupabaseNotConfiguredError } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function RecoverySessionMissing() {
  return (
    <div className="grid gap-5">
      <span className="flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-800">
        <AlertTriangle className="size-6" />
      </span>
      <p className="rounded-xl border border-border bg-white p-4 text-sm leading-6 text-muted-foreground">
        Deze herstel-link is ongeldig, verlopen of al gebruikt. Vraag een nieuwe
        link aan om je wachtwoord veilig te wijzigen.
      </p>
      <Button asChild>
        <Link href="/forgot-password">Nieuwe herstel-link aanvragen</Link>
      </Button>
    </div>
  );
}

export default async function ResetPasswordPage() {
  let hasRecoverySession = false;

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    hasRecoverySession = Boolean(user);
  } catch (error) {
    if (!(error instanceof SupabaseNotConfiguredError)) {
      throw error;
    }
  }

  return (
    <AuthShell
      title="Kies een nieuw wachtwoord"
      description="Na het wijzigen blijven je boekingen en profielgegevens gewoon bewaard."
    >
      {hasRecoverySession ? <ResetPasswordForm /> : <RecoverySessionMissing />}
    </AuthShell>
  );
}
