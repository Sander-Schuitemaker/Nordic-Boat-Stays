import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Maak je account"
      description="Bewaar huizen, beheer boekingen en word later vanuit hetzelfde account verhuurder."
    >
      <RegisterForm />
    </AuthShell>
  );
}
