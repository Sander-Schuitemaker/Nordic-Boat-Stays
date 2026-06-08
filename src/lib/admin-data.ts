import { requireAdmin } from "@/lib/auth";
import type {
  AccountStatus,
  AppRole,
  HostAccountStatus,
} from "@/lib/auth/authorization";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AdminUserListItem = {
  id: string;
  email: string;
  fullName: string;
  status: AccountStatus;
  roles: AppRole[];
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string | null;
};

export async function getAdminSummary() {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const [
    { count: users },
    { count: hosts },
    { count: pendingHosts },
    { count: suspendedUsers },
  ] = await Promise.all([
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .eq("is_host", true),
    supabase
      .from("host_profiles")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending_verification"),
    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .eq("status", "suspended"),
  ]);

  return {
    users: users ?? 0,
    hosts: hosts ?? 0,
    pendingHosts: pendingHosts ?? 0,
    suspendedUsers: suspendedUsers ?? 0,
  };
}

export async function getAdminUsers(filters: {
  q?: string;
  role?: AppRole;
  status?: AccountStatus;
  page?: number;
}) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = 25;
  let query = supabase
    .from("users")
    .select(
      "id, email, full_name, status, is_guest, is_host, is_admin, email_verified, created_at, last_login_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const search = filters.q?.trim().replace(/[%(),]/g, "");
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.role === "guest") {
    query = query.eq("is_guest", true);
  }
  if (filters.role === "host") {
    query = query.eq("is_host", true);
  }
  if (filters.role === "admin") {
    query = query.eq("is_admin", true);
  }

  const { data, count, error } = await query;
  if (error) {
    throw new Error("Gebruikers konden niet worden geladen.");
  }

  return {
    users: (data ?? []).map((item): AdminUserListItem => ({
      id: item.id,
      email: item.email,
      fullName: item.full_name,
      status: item.status as AccountStatus,
      roles: [
        ...(item.is_guest ? (["guest"] as AppRole[]) : []),
        ...(item.is_host ? (["host"] as AppRole[]) : []),
        ...(item.is_admin ? (["admin"] as AppRole[]) : []),
      ],
      emailVerified: item.email_verified,
      createdAt: item.created_at,
      lastLoginAt: item.last_login_at,
    })),
    page,
    pageSize,
    total: count ?? 0,
  };
}

export async function getAdminUser(userId: string) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const [{ data: account }, { data: roles }, { data: host }, { data: audit }] =
    await Promise.all([
      supabase.from("users").select("*").eq("id", userId).maybeSingle(),
      supabase
        .from("user_roles")
        .select("role, created_at, revoked_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      supabase
        .from("host_profiles")
        .select(
          "host_name, host_type, business_name, country_code, status, verification_status, payout_account_status, created_at",
        )
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("audit_logs")
        .select("id, actor_user_id, action, metadata, created_at")
        .eq("target_user_id", userId)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

  if (!account) {
    return null;
  }

  return {
    account,
    roles: (roles ?? []) as Array<{
      role: AppRole;
      created_at: string;
      revoked_at: string | null;
    }>,
    host: host
      ? {
          ...host,
          status: host.status as HostAccountStatus,
        }
      : null,
    audit: (audit ?? []) as Array<{
      id: string;
      actor_user_id: string | null;
      action: string;
      metadata: unknown;
      created_at: string;
    }>,
  };
}
