import { describe, expect, it } from "vitest";

import { safeInternalPath } from "@/lib/auth/redirects";

describe("safeInternalPath", () => {
  it("allows internal paths with a query string", () => {
    expect(safeInternalPath("/favorites?view=grid")).toBe(
      "/favorites?view=grid",
    );
  });

  it("rejects external, protocol-relative and backslash paths", () => {
    expect(safeInternalPath("https://evil.example")).toBeNull();
    expect(safeInternalPath("//evil.example")).toBeNull();
    expect(safeInternalPath("/\\evil.example")).toBeNull();
  });

  it("returns null for a missing path", () => {
    expect(safeInternalPath(undefined)).toBeNull();
  });
});
