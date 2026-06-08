import { describe, expect, it } from "vitest";

import {
  canAccessHost,
  canPerformAdminAction,
  canPublishListing,
  hasRole,
  isUsableAccount,
} from "@/lib/auth/authorization";

describe("application authorization", () => {
  it("allows one active account to be both guest and host", () => {
    expect(
      canAccessHost({
        status: "active",
        roles: ["guest", "host"],
        hostStatus: "pending_verification",
      }),
    ).toBe(true);
  });

  it("does not allow guest-only accounts into the host dashboard", () => {
    expect(
      canAccessHost({
        status: "active",
        roles: ["guest"],
        hostStatus: null,
      }),
    ).toBe(false);
  });

  it("requires a verified host before publishing", () => {
    expect(
      canPublishListing({
        status: "active",
        roles: ["guest", "host"],
        hostStatus: "pending_verification",
      }),
    ).toBe(false);
    expect(
      canPublishListing({
        status: "active",
        roles: ["guest", "host"],
        hostStatus: "verified",
      }),
    ).toBe(true);
  });

  it("requires an active admin and aal2 for sensitive actions", () => {
    expect(
      canPerformAdminAction({
        status: "active",
        roles: ["guest", "admin"],
        assuranceLevel: "aal1",
      }),
    ).toBe(false);
    expect(
      canPerformAdminAction({
        status: "active",
        roles: ["guest", "admin"],
        assuranceLevel: "aal2",
      }),
    ).toBe(true);
  });

  it("treats only active accounts as usable", () => {
    expect(isUsableAccount("active")).toBe(true);
    expect(isUsableAccount("pending_email_verification")).toBe(false);
    expect(isUsableAccount("suspended")).toBe(false);
    expect(isUsableAccount("deactivated")).toBe(false);
  });

  it("checks normalized roles", () => {
    expect(hasRole(["guest", "host"], "host")).toBe(true);
    expect(hasRole(["guest"], "admin")).toBe(false);
  });
});
