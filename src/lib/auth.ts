import { redirect } from "next/navigation";

import {
  canAccessAdminRoute,
  canAccessHost,
  canPerformAdminAction,
  isUsableAccount,
} from "@/lib/auth/authorization";
import { getCurrentUser } from "@/lib/auth/user";
import { SupabaseNotConfiguredError } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export { getCurrentUser };
export type { AppUser, AppUserRole, AppUserStatus } from "@/lib/auth/user";

export async function destroySession() {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  } catch (error) {
    if (!(error instanceof SupabaseNotConfiguredError)) {
      throw error;
    }
  }
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!isUsableAccount(user.status)) {
    if (user.status === "pending_email_verification") {
      redirect("/verify-email");
    }

    redirect(`/login?error=account-${user.status}`);
  }

  return user;
}

export async function requireHost() {
  const user = await requireUser();

  if (!canAccessHost(user)) {
    redirect("/host/apply");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (!canAccessAdminRoute(user)) {
    redirect("/");
  }

  return user;
}

export async function requireAdminAction() {
  const user = await requireAdmin();

  if (!canPerformAdminAction(user)) {
    redirect("/account/security?mfa=required");
  }

  return user;
}
