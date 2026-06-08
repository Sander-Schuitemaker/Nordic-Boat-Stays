export type AppRole = "guest" | "host" | "admin";
export type AccountStatus =
  | "pending_email_verification"
  | "active"
  | "suspended"
  | "deactivated"
  | "deleted"
  | "restricted"
  | "blocked";
export type HostAccountStatus =
  | "not_started"
  | "pending_verification"
  | "verified"
  | "rejected"
  | "restricted"
  | "suspended";
export type AssuranceLevel = "aal1" | "aal2";

export function hasRole(roles: AppRole[], role: AppRole): boolean {
  return roles.includes(role);
}

export function isUsableAccount(status: AccountStatus): boolean {
  return status === "active";
}

export function canAccessHost(user: {
  status: AccountStatus;
  roles: AppRole[];
  hostStatus: HostAccountStatus | null;
}): boolean {
  return isUsableAccount(user.status) && hasRole(user.roles, "host");
}

export function canPublishListing(user: {
  status: AccountStatus;
  roles: AppRole[];
  hostStatus: HostAccountStatus | null;
}): boolean {
  return canAccessHost(user) && user.hostStatus === "verified";
}

export function canAccessAdminRoute(user: {
  status: AccountStatus;
  roles: AppRole[];
}): boolean {
  return isUsableAccount(user.status) && hasRole(user.roles, "admin");
}

export function canPerformAdminAction(user: {
  status: AccountStatus;
  roles: AppRole[];
  assuranceLevel: AssuranceLevel;
}): boolean {
  return canAccessAdminRoute(user) && user.assuranceLevel === "aal2";
}
