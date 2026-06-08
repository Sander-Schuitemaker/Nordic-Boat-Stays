import { describe, expect, it } from "vitest";

import {
  authAttemptAllowed,
  hashAuthIdentifier,
} from "@/lib/auth/rate-limit";

describe("authentication rate limiting", () => {
  it("blocks repeated account or IP failures", () => {
    expect(authAttemptAllowed({ emailFailures: 4, ipFailures: 19 })).toBe(true);
    expect(authAttemptAllowed({ emailFailures: 5, ipFailures: 0 })).toBe(false);
    expect(authAttemptAllowed({ emailFailures: 0, ipFailures: 20 })).toBe(false);
  });

  it("hashes normalized identifiers without retaining the raw email", () => {
    const hash = hashAuthIdentifier(
      " SANDER@EXAMPLE.COM ",
      "a-production-secret-with-at-least-32-bytes",
    );

    expect(hash).toHaveLength(64);
    expect(hash).toBe(
      hashAuthIdentifier(
        "sander@example.com",
        "a-production-secret-with-at-least-32-bytes",
      ),
    );
    expect(hash).not.toContain("sander");
  });
});
