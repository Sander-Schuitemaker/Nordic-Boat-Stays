import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const root = process.cwd();
const accountRouteFiles = [
  "src/app/favorites/page.tsx",
  "src/app/messages/page.tsx",
  "src/app/bookings/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/dashboard/bookings/page.tsx",
];

describe("account-scoped marketplace routes", () => {
  it("does not use Prisma for private account data", async () => {
    for (const file of accountRouteFiles) {
      const source = await readFile(join(root, file), "utf8");
      expect(source, file).not.toContain("@/lib/db");
      expect(source, file).not.toContain("prisma.");
    }
  });

  it("derives the account identity inside the Supabase data layer", async () => {
    const source = await readFile(join(root, "src/lib/account-data.ts"), "utf8");

    expect(source).toContain("requireUser()");
    expect(source).not.toMatch(/export async function \w+\(userId:/);
  });
});
