"use server";

import { redirect } from "next/navigation";

import { destroySession } from "@/lib/auth";
import {
  publicPasswordResetResult,
  registerUser,
} from "@/lib/auth/account-service";
import { safeInternalPath } from "@/lib/auth/redirects";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/auth/schemas";
import { SupabaseNotConfiguredError } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  message?: string;
};

function appUrl(): string {
  const value = process.env.NEXT_PUBLIC_APP_URL;
  if (!value) {
    throw new Error("NEXT_PUBLIC_APP_URL ontbreekt.");
  }
  return new URL(value).origin;
}

function authErrorMessage(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("email not confirmed")) {
    return "Bevestig eerst je e-mailadres via de link in je inbox.";
  }

  if (
    normalized.includes("invalid login credentials") ||
    normalized.includes("invalid credentials")
  ) {
    return "E-mailadres of wachtwoord klopt niet.";
  }

  if (normalized.includes("password")) {
    return "Kies een sterker wachtwoord van minimaal 12 tekens.";
  }

  return "Deze actie is nu niet gelukt. Probeer het straks opnieuw.";
}

async function getConfiguredClient() {
  try {
    return await createServerSupabaseClient();
  } catch (error) {
    if (error instanceof SupabaseNotConfiguredError) {
      return null;
    }
    throw error;
  }
}

export async function loginAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") || undefined,
  });

  if (!parsed.success) {
    return { error: "Vul een geldig e-mailadres en wachtwoord in." };
  }

  const supabase = await getConfiguredClient();
  if (!supabase) {
    return {
      error: "Inloggen wordt beschikbaar zodra Supabase is gekoppeld.",
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { error: authErrorMessage(error?.message ?? "") };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("status, email_verified")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile?.email_verified || profile.status === "pending_email_verification") {
    await supabase.auth.signOut();
    return { error: "Bevestig eerst je e-mailadres via de link in je inbox." };
  }

  if (profile.status !== "active") {
    await supabase.auth.signOut();
    return { error: "Dit account is niet actief. Neem contact op met support." };
  }

  redirect(safeInternalPath(parsed.data.next) ?? "/account");
}

export async function registerAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    acceptTerms: formData.get("acceptTerms") === "on",
  });

  if (!parsed.success) {
    return {
      error:
        "Controleer je naam, e-mailadres, wachtwoord en akkoord met de voorwaarden.",
    };
  }

  const supabase = await getConfiguredClient();
  if (!supabase) {
    return {
      error: "Registreren wordt beschikbaar zodra Supabase is gekoppeld.",
    };
  }

  let result;
  try {
    result = await registerUser(
      {
        async signUp(request) {
          const { data, error } = await supabase.auth.signUp({
            email: request.email,
            password: request.password,
            options: {
              emailRedirectTo: request.emailRedirectTo,
              data: request.metadata,
            },
          });

          return {
            userId: data.user?.id ?? null,
            hasSession: Boolean(data.session),
            errorMessage: error?.message,
          };
        },
      },
      parsed.data,
      appUrl(),
    );
  } catch {
    return { error: "De accountgegevens konden niet worden verwerkt." };
  }

  if (result.errorMessage && !result.errorMessage.toLowerCase().includes("registered")) {
    return { error: authErrorMessage(result.errorMessage) };
  }

  if (result.hasSession) {
    redirect("/account");
  }

  redirect(
    `/verify-email?email=${encodeURIComponent(parsed.data.email)}&created=1`,
  );
}

export async function resendVerificationAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: "Vul een geldig e-mailadres in." };
  }

  const supabase = await getConfiguredClient();
  if (supabase) {
    await supabase.auth.resend({
      type: "signup",
      email: parsed.data.email,
      options: {
        emailRedirectTo: `${appUrl()}/auth/callback?next=${encodeURIComponent("/account")}`,
      },
    });
  }

  return {
    message:
      "Als het account nog verificatie nodig heeft, ontvang je een nieuwe e-mail.",
  };
}

export async function requestPasswordResetAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: "Vul een geldig e-mailadres in." };
  }

  const supabase = await getConfiguredClient();
  if (supabase) {
    await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${appUrl()}/auth/callback?next=${encodeURIComponent("/reset-password")}`,
    });
  }

  return publicPasswordResetResult();
}

export async function resetPasswordAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: "Gebruik twee gelijke wachtwoorden van minimaal 12 tekens." };
  }

  const supabase = await getConfiguredClient();
  if (!supabase) {
    return { error: "Wachtwoord wijzigen is nog niet beschikbaar." };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: authErrorMessage(error.message) };
  }

  await supabase.auth.signOut({ scope: "others" });
  return { message: "Je wachtwoord is gewijzigd. Je kunt nu verder." };
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
