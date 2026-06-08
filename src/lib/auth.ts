import { redirect } from "next/navigation";

import {
  canAccessAdmin,
  canAccessDashboard,
  getCurrentUser,
  isActiveUser,
} from "@/lib/auth/user";
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

  if (!isActiveUser(user)) {
    redirect(`/login?error=account-${user.status}`);
  }

  return user;
}

export async function requireHost() {
  const user = await requireUser();

  if (!canAccessDashboard(user)) {
    redirect("/");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (!canAccessAdmin(user)) {
    redirect("/");
  }

  return user;
}
