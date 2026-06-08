import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { accountLoginErrorMessage } from "@/lib/auth/errors";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const errorMessage = accountLoginErrorMessage(params.error);

  return (
    <AuthShell
      title="Welkom terug"
      description="Log veilig in voor je boekingen, favorieten, berichten en verhuurdersdashboard."
    >
      <div className="grid gap-5">
        {errorMessage ? (
          <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        ) : null}
        <LoginForm nextPath={params.next} />
      </div>
    </AuthShell>
  );
}
