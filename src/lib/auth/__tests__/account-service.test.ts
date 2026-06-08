import { describe, expect, it } from "vitest";

import {
  publicPasswordResetResult,
  registerUser,
  type AuthGateway,
  type SignUpRequest,
} from "@/lib/auth/account-service";

class RecordingAuthGateway implements AuthGateway {
  lastSignUp: SignUpRequest | null = null;

  async signUp(request: SignUpRequest) {
    this.lastSignUp = request;
    return { userId: "user-1", hasSession: false };
  }
}

describe("registerUser", () => {
  it("never sends a requested role during sign-up", async () => {
    const auth = new RecordingAuthGateway();

    await registerUser(
      auth,
      {
        fullName: "Nieuwe Gast",
        email: "gast@example.com",
        password: "veilig-wachtwoord-2026",
        acceptTerms: true,
      },
      "https://example.com",
    );

    expect(auth.lastSignUp).toEqual({
      email: "gast@example.com",
      password: "veilig-wachtwoord-2026",
      emailRedirectTo: "https://example.com/auth/callback?next=%2Faccount",
      metadata: {
        full_name: "Nieuwe Gast",
        language: "nl",
      },
    });
    expect(auth.lastSignUp?.metadata).not.toHaveProperty("requested_role");
  });

  it("normalizes the application URL", async () => {
    const auth = new RecordingAuthGateway();

    await registerUser(
      auth,
      {
        fullName: "Nieuwe Gast",
        email: "gast@example.com",
        password: "veilig-wachtwoord-2026",
        acceptTerms: true,
      },
      "https://example.com/",
    );

    expect(auth.lastSignUp?.emailRedirectTo).toBe(
      "https://example.com/auth/callback?next=%2Faccount",
    );
  });
});

describe("password reset privacy", () => {
  it("returns the same public result for every reset request", () => {
    expect(publicPasswordResetResult()).toEqual({
      message: "Als dit e-mailadres bestaat, ontvang je zo een herstelmail.",
    });
  });
});
