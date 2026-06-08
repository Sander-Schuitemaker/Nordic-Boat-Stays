import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const migrationPath = path.resolve(
  process.cwd(),
  "supabase/migrations/202606090001_user_accounts.sql",
);

describe("user accounts migration", () => {
  it("creates normalized account tables and indexes", async () => {
    const sql = await readFile(migrationPath, "utf8");

    expect(sql).toContain("create table public.user_profiles");
    expect(sql).toContain("create table public.user_roles");
    expect(sql).toContain("create table public.user_sessions");
    expect(sql).toContain("create table public.user_verifications");
    expect(sql).toContain("create table public.login_attempts");
    expect(sql).toContain("user_roles_active_unique");
    expect(sql).toContain("login_attempts_email_created_idx");
    expect(sql).toContain("user_sessions_user_active_idx");
  });

  it("does not store raw login e-mail addresses", async () => {
    const sql = await readFile(migrationPath, "utf8");

    expect(sql).toContain("email_hash text not null");
    expect(sql).not.toMatch(/create table public\.login_attempts[\s\S]*\n\s+email\s+/);
  });
});
