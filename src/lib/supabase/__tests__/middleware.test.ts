import { describe, expect, it } from "vitest";

import { isProtectedPath } from "@/lib/supabase/middleware";

describe("isProtectedPath", () => {
  it.each([
    "/dashboard",
    "/dashboard/listings/new",
    "/favorites",
    "/messages",
    "/bookings",
  ])("protects %s", (pathname) => {
    expect(isProtectedPath(pathname)).toBe(true);
  });

  it.each(["/", "/search", "/login", "/listings/example"])(
    "keeps %s public",
    (pathname) => {
      expect(isProtectedPath(pathname)).toBe(false);
    },
  );
});
