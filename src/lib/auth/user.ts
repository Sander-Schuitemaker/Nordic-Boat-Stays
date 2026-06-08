import { SupabaseNotConfiguredError } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  AccountStatus,
  AppRole,
  AssuranceLevel,
  HostAccountStatus,
} from "@/lib/auth/authorization";

export type AppUserRole = AppRole;
export type AppUserStatus = AccountStatus;

export type AppUser = {
  id: string;
  email: string;
  fullName: string;
  role: AppUserRole;
  roles: AppUserRole[];
  status: AppUserStatus;
  hostStatus: HostAccountStatus | null;
  emailVerified: boolean;
  avatarUrl: string | null;
  assuranceLevel: AssuranceLevel;
};

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

  const [profileResult, roleResult, hostResult, assuranceResult] =
    await Promise.all([
      supabase
        .from("users")
        .select(
          "id, email, full_name, role, status, email_verified, avatar_url",
        )
        .eq("id", authUser.id)
        .maybeSingle(),
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authUser.id)
        .is("revoked_at", null),
      supabase
        .from("host_profiles")
        .select("status")
        .eq("user_id", authUser.id)
        .maybeSingle(),
      supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    ]);

  const profile = profileResult.data;

  if (profileResult.error || !profile) {
    return null;
  }

  const roles =
    roleResult.data?.map((item) => item.role as AppUserRole) ?? [
      profile.role as AppUserRole,
    ];
  let avatarUrl: string | null = null;

  if (profile.avatar_url) {
    const { data } = await supabase.storage
      .from("avatars")
      .createSignedUrl(profile.avatar_url, 60 * 60);
    avatarUrl = data?.signedUrl ?? null;
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role as AppUserRole,
    roles,
    status: profile.status as AppUserStatus,
    hostStatus:
      (hostResult.data?.status as HostAccountStatus | undefined) ?? null,
    emailVerified: profile.email_verified,
    avatarUrl,
    assuranceLevel:
      assuranceResult.data?.currentLevel === "aal2" ? "aal2" : "aal1",
  };
}
