import { describe, expect, it } from "vitest";

import {
  isAuthOnlyPath,
  isProtectedPath,
} from "@/lib/supabase/middleware";

describe("isProtectedPath", () => {
  it.each([
    "/dashboard",
    "/dashboard/listings/new",
    "/favorites",
    "/messages",
    "/bookings",
    "/account",
    "/account/security",
    "/host/apply",
    "/admin",
    "/admin/users",
  ])("protects %s", (pathname) => {
    expect(isProtectedPath(pathname)).toBe(true);
  });

  it.each(["/", "/search", "/login", "/listings/example"])(
    "keeps %s public",
    (pathname) => {
      expect(isProtectedPath(pathname)).toBe(false);
    },
  );

  it.each(["/login", "/register", "/forgot-password"])(
    "marks %s as auth-only",
    (pathname) => {
      expect(isAuthOnlyPath(pathname)).toBe(true);
    },
  );
});
