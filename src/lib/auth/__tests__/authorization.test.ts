import { describe, expect, it } from "vitest";

import {
  canAccessAdmin,
  canAccessDashboard,
  isActiveUser,
} from "@/lib/auth/user";

describe("application authorization", () => {
  it("allows active hosts into the dashboard", () => {
    expect(canAccessDashboard({ role: "host", status: "active" })).toBe(true);
  });

  it("does not allow guests into the host dashboard", () => {
    expect(canAccessDashboard({ role: "guest", status: "active" })).toBe(false);
  });

  it("blocks restricted or blocked privileged users", () => {
    expect(canAccessDashboard({ role: "admin", status: "blocked" })).toBe(false);
    expect(canAccessAdmin({ role: "admin", status: "restricted" })).toBe(false);
  });

  it("allows only active admins into admin routes", () => {
    expect(canAccessAdmin({ role: "admin", status: "active" })).toBe(true);
    expect(canAccessAdmin({ role: "host", status: "active" })).toBe(false);
  });

  it("treats only active accounts as usable", () => {
    expect(isActiveUser({ status: "active" })).toBe(true);
    expect(isActiveUser({ status: "deleted" })).toBe(false);
  });
});
