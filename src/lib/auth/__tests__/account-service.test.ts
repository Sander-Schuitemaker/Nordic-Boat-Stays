import { describe, expect, it } from "vitest";

import {
  applyAsHost,
  publicPasswordResetResult,
  registerUser,
  toProfileUpdates,
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

describe("profile updates", () => {
  it("only emits user-editable profile columns", () => {
    const updates = toProfileUpdates({
      fullName: "Sander Schuit",
      phone: "+31 6 12345678",
      dateOfBirth: "1990-04-18",
      country: "nl",
      language: "nl",
      bio: "Liefhebber van Noorse fjorden.",
      preferredCurrency: "EUR",
    });

    expect(updates).toEqual({
      user: {
        full_name: "Sander Schuit",
        phone: "+31 6 12345678",
        locale: "nl",
      },
      profile: {
        date_of_birth: "1990-04-18",
        country: "NL",
        language: "nl",
        bio: "Liefhebber van Noorse fjorden.",
        preferred_currency: "EUR",
      },
    });
    expect(updates.user).not.toHaveProperty("status");
    expect(updates.user).not.toHaveProperty("is_admin");
    expect(updates.user).not.toHaveProperty("role");
  });
});

describe("host application", () => {
  it("adds host access without removing guest access", async () => {
    const result = await applyAsHost(
      {
        async apply() {
          return { hostStatus: "pending_verification" as const };
        },
      },
      { roles: ["guest"] },
      {
        hostName: "Sander Schuit",
        hostType: "individual",
        companyName: "",
        countryCode: "nl",
        acceptHostTerms: true,
      },
    );

    expect(result.roles).toEqual(["guest", "host"]);
    expect(result.hostStatus).toBe("pending_verification");
  });
});
