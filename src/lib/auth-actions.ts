"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { destroySession, requireUser } from "@/lib/auth";
import {
  publicPasswordResetResult,
  registerUser,
  toProfileUpdates,
} from "@/lib/auth/account-service";
import { safeInternalPath } from "@/lib/auth/redirects";
import {
  forgotPasswordSchema,
  loginSchema,
  notificationPreferencesSchema,
  profileSchema,
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

export async function updateProfileAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone") || undefined,
    dateOfBirth: formData.get("dateOfBirth") || undefined,
    country: formData.get("country") || undefined,
    language: formData.get("language"),
    bio: formData.get("bio") || undefined,
    preferredCurrency: formData.get("preferredCurrency"),
  });

  if (!parsed.success) {
    return { error: "Controleer de profielgegevens en probeer het opnieuw." };
  }

  const user = await requireUser();
  const supabase = await getConfiguredClient();
  if (!supabase) {
    return { error: "Profielbeheer is nog niet beschikbaar." };
  }

  const updates = toProfileUpdates(parsed.data);
  const { error: userError } = await supabase
    .from("users")
    .update(updates.user)
    .eq("id", user.id);

  if (userError) {
    return { error: "Je profiel kon niet worden opgeslagen." };
  }

  const { error: profileError } = await supabase
    .from("user_profiles")
    .upsert({
      user_id: user.id,
      ...updates.profile,
    });

  if (profileError) {
    return { error: "Je aanvullende profielgegevens konden niet worden opgeslagen." };
  }

  revalidatePath("/account");
  revalidatePath("/account/profile");
  return { message: "Je profiel is bijgewerkt." };
}

export async function updateNotificationPreferencesAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = notificationPreferencesSchema.safeParse({
    booking: formData.get("booking") === "on",
    messages: formData.get("messages") === "on",
    marketing: formData.get("marketing") === "on",
  });

  if (!parsed.success) {
    return { error: "De meldingsvoorkeuren konden niet worden verwerkt." };
  }

  const user = await requireUser();
  const supabase = await getConfiguredClient();
  if (!supabase) {
    return { error: "Meldingen beheren is nog niet beschikbaar." };
  }

  const { error } = await supabase
    .from("user_profiles")
    .update({ notification_preferences: parsed.data })
    .eq("user_id", user.id);

  if (error) {
    return { error: "De meldingsvoorkeuren konden niet worden opgeslagen." };
  }

  revalidatePath("/account/notifications");
  return { message: "Je meldingsvoorkeuren zijn opgeslagen." };
}

const avatarMimeExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function uploadAvatarAction(
  _: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const file = formData.get("avatar");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Kies een afbeelding om te uploaden." };
  }

  const extension = avatarMimeExtensions[file.type];
  if (!extension || file.size > 5 * 1024 * 1024) {
    return {
      error: "Gebruik een JPG-, PNG- of WebP-afbeelding van maximaal 5 MB.",
    };
  }

  const user = await requireUser();
  const supabase = await getConfiguredClient();
  if (!supabase) {
    return { error: "Profielfoto's zijn nog niet beschikbaar." };
  }

  const { data: currentProfile } = await supabase
    .from("users")
    .select("avatar_url")
    .eq("id", user.id)
    .maybeSingle();
  const path = `${user.id}/avatar-${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, await file.arrayBuffer(), {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return { error: "De profielfoto kon niet worden geüpload." };
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ avatar_url: path })
    .eq("id", user.id);

  if (updateError) {
    await supabase.storage.from("avatars").remove([path]);
    return { error: "De profielfoto kon niet aan je account worden gekoppeld." };
  }

  if (
    currentProfile?.avatar_url &&
    currentProfile.avatar_url.startsWith(`${user.id}/`)
  ) {
    await supabase.storage.from("avatars").remove([currentProfile.avatar_url]);
  }

  revalidatePath("/account");
  revalidatePath("/account/profile");
  return { message: "Je profielfoto is bijgewerkt." };
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
