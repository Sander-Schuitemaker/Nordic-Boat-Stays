import { SupabaseNotConfiguredError } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AppUserRole = "guest" | "host" | "admin";
export type AppUserStatus = "active" | "restricted" | "blocked" | "deleted";

export type AppUser = {
  id: string;
  email: string;
  fullName: string;
  role: AppUserRole;
  status: AppUserStatus;
};

type AuthorizationUser = Pick<AppUser, "role" | "status">;

export function isActiveUser(user: Pick<AppUser, "status">): boolean {
  return user.status === "active";
}

export function canAccessDashboard(user: AuthorizationUser): boolean {
  return (
    isActiveUser(user) && (user.role === "host" || user.role === "admin")
  );
}

export function canAccessAdmin(user: AuthorizationUser): boolean {
  return isActiveUser(user) && user.role === "admin";
}

export async function getCurrentUser(): Promise<AppUser | null> {
  let supabase;

  try {
    supabase = await createServerSupabaseClient();
  } catch (error) {
    if (error instanceof SupabaseNotConfiguredError) {
      return null;
    }

    throw error;
  }

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("id, email, full_name, role, status")
    .eq("id", authUser.id)
    .maybeSingle();

  if (error || !profile) {
    return null;
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role,
    status: profile.status,
  };
}
