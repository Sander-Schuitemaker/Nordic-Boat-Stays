import { LoginForm, RegisterForm } from "@/components/auth/auth-forms";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

const accountErrorMessages: Record<string, string> = {
  "account-blocked": "Dit account is geblokkeerd. Neem contact op met support.",
  "account-restricted": "Dit account is tijdelijk beperkt. Neem contact op met support.",
  "account-deleted": "Dit account is niet meer actief.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="lg:col-span-2">
        <h1 className="text-4xl font-semibold">Account</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Log in of maak een account aan voor boekingen, favorieten, berichten en verhuur.
        </p>
        {params.error && accountErrorMessages[params.error] ? (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
            {accountErrorMessages[params.error]}
          </p>
        ) : null}
      </section>
      <LoginForm nextPath={params.next} />
      <RegisterForm />
    </main>
  );
}
