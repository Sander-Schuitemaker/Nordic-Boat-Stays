import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/recovery-forms";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Wachtwoord herstellen"
      description="Vul je e-mailadres in. Als er een account bestaat, sturen we een veilige herstel-link."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
