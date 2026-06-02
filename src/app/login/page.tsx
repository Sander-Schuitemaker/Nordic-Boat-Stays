import { LoginForm, RegisterForm } from "@/components/auth/auth-forms";

export default function LoginPage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="lg:col-span-2">
        <h1 className="text-4xl font-semibold">Account</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Log in of maak een account aan. Accounts, verhuurde huizen, boekingen en berichten worden via de backend en database gekoppeld.
        </p>
      </section>
      <LoginForm />
      <RegisterForm />
    </main>
  );
}
