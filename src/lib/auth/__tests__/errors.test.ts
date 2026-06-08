import { describe, expect, it } from "vitest";

import { accountLoginErrorMessage } from "@/lib/auth/errors";

describe("accountLoginErrorMessage", () => {
  it("explains a failed verification callback", () => {
    expect(accountLoginErrorMessage("verification-failed")).toBe(
      "De verificatielink is ongeldig of verlopen. Vraag een nieuwe link aan.",
    );
  });

  it("does not expose an unknown error code", () => {
    expect(accountLoginErrorMessage("unexpected-provider-error")).toBeNull();
  });
});
