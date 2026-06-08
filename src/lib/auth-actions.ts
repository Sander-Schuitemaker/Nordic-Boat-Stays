"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { destroySession } from "@/lib/auth";
import { SupabaseNotConfiguredError } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(10),
  next: z.string().optional(),
});

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  password: z.string().min(10).max(128),
  role: z.enum(["guest", "host"]),
});

export type AuthActionState = {
  error?: string;
  message?: string;
};

function safeRedirectPath(value: string | undefined): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  return value;
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

  if (
    normalized.includes("already registered") ||
    normalized.includes("already exists")
  ) {
    return "Er bestaat al een account met dit e-mailadres.";
  }

  if (normalized.includes("password")) {
    return "Kies een sterker wachtwoord van minimaal 10 tekens.";
  }

  return "Inloggen of registreren is nu niet gelukt. Probeer het opnieuw.";
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
    return {
      error: "Vul een geldig e-mailadres en een wachtwoord van minimaal 10 tekens in.",
    };
  }

  const supabase = await getConfiguredClient();
  if (!supabase) {
    return {
      error: "Inloggen wordt beschikbaar zodra de beveiligde backend is gekoppeld.",
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { error: authErrorMessage(error?.message ?? "") };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role, status")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile || profile.status !== "active") {
    await supabase.auth.signOut();
    return { error: "Dit account is niet actief. Neem contact op met support." };
  }

  const requestedPath = safeRedirectPath(parsed.data.next);
  redirect(
    requestedPath ??
      (profile.role === "host" || profile.role === "admin"
        ? "/dashboard"
        : "/"),
  );
}

export async function registerAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: String(formData.get("email") || "").toLowerCase(),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      error:
        "Controleer je naam, e-mailadres, accounttype en wachtwoord van minimaal 10 tekens.",
    };
  }

  const supabase = await getConfiguredClient();
  if (!supabase) {
    return {
      error: "Registreren wordt beschikbaar zodra de beveiligde backend is gekoppeld.",
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.name,
        requested_role: parsed.data.role,
      },
    },
  });

  if (error) {
    return { error: authErrorMessage(error.message) };
  }

  if (!data.session) {
    return {
      message:
        "Je account is aangemaakt. Bevestig je e-mailadres via de link in je inbox.",
    };
  }

  redirect(parsed.data.role === "host" ? "/dashboard" : "/");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
