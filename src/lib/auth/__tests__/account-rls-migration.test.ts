import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const migrationPath = path.resolve(
  process.cwd(),
  "supabase/migrations/202606090003_user_account_rls.sql",
);

describe("user account RLS migration", () => {
  it("enables RLS for every private account table", async () => {
    const sql = await readFile(migrationPath, "utf8");

    for (const table of [
      "user_profiles",
      "user_roles",
      "user_sessions",
      "user_verifications",
      "login_attempts",
    ]) {
      expect(sql).toContain(
        `alter table public.${table} enable row level security`,
      );
    }
  });

  it("does not grant browser writes to roles or login attempts", async () => {
    const sql = await readFile(migrationPath, "utf8");

    expect(sql).toContain(
      "revoke all on public.user_roles from anon, authenticated",
    );
    expect(sql).toContain(
      "revoke all on public.login_attempts from anon, authenticated",
    );
  });

  it("stores avatars in a private account-scoped bucket", async () => {
    const sql = await readFile(migrationPath, "utf8");

    expect(sql).toContain("'avatars'");
    expect(sql).toContain("(storage.foldername(name))[1] = (select auth.uid())::text");
  });
});
