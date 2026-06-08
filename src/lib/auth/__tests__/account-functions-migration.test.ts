import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const migrationPath = path.resolve(
  process.cwd(),
  "supabase/migrations/202606090002_user_account_functions.sql",
);

describe("user account database functions", () => {
  it("creates guest-only accounts and ignores requested roles", async () => {
    const sql = await readFile(migrationPath, "utf8");

    expect(sql).toContain("private.handle_new_user()");
    expect(sql).toContain("'guest'::public.user_role");
    expect(sql).not.toContain("requested_role");
  });

  it("defines secured host, admin and deactivation operations", async () => {
    const sql = await readFile(migrationPath, "utf8");

    expect(sql).toContain("public.apply_as_host");
    expect(sql).toContain("public.admin_set_user_status");
    expect(sql).toContain("public.admin_set_user_role");
    expect(sql).toContain("public.deactivate_my_account");
    expect(sql).toContain("private.require_admin_aal2");
  });

  it("audits sensitive account changes", async () => {
    const sql = await readFile(migrationPath, "utf8");

    expect(sql).toContain("insert into public.audit_logs");
    expect(sql).toContain("target_user_id");
  });
});
