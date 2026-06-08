import { MailCheck } from "lucide-react";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { VerificationForm } from "@/components/auth/verification-form";
import { Button } from "@/components/ui/button";

type VerifyEmailPageProps = {
  searchParams: Promise<{ email?: string; created?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams;

  return (
    <AuthShell
      title="Bevestig je e-mailadres"
      description="Open de e-mail van Nordic Boat Stays om je account te activeren."
    >
      <div className="grid gap-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary">
          <MailCheck className="size-6" />
        </span>
        <div className="rounded-xl border border-border bg-white p-4 text-sm leading-6 text-muted-foreground">
          {params.created === "1"
            ? "Je account is aangemaakt. De verificatielink kan enkele minuten onderweg zijn."
            : "Je account moet eerst worden bevestigd voordat je kunt inloggen."}
        </div>
        <VerificationForm email={params.email} />
        <Button asChild variant="ghost">
          <Link href="/login">Terug naar inloggen</Link>
        </Button>
      </div>
    </AuthShell>
  );
}
