import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("password recovery pages", () => {
  it("uses server actions for both recovery forms", async () => {
    const source = await readFile(
      join(root, "src/components/auth/recovery-forms.tsx"),
      "utf8",
    );

    expect(source).toContain("requestPasswordResetAction");
    expect(source).toContain("resetPasswordAction");
    expect(source).not.toContain("localStorage");
  });

  it("checks the recovery session before rendering the reset form", async () => {
    const source = await readFile(
      join(root, "src/app/reset-password/page.tsx"),
      "utf8",
    );

    expect(source).toContain("auth.getUser()");
    expect(source).toContain("RecoverySessionMissing");
  });
});
