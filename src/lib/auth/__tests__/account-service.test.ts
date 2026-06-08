import { describe, expect, it } from "vitest";

import {
  applyAsHost,
  deactivateAccount,
  publicPasswordResetResult,
  registerUser,
  setUserRole,
  setUserStatus,
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

describe("admin account mutations", () => {
  it("rejects an admin status change at aal1", async () => {
    await expect(
      setUserStatus(
        {
          async setStatus() {
            throw new Error("gateway should not be called");
          },
        },
        {
          id: "9a39d5c9-ab63-4c04-81e2-2cb35e95bd83",
          status: "active",
          roles: ["guest", "admin"],
          assuranceLevel: "aal1",
        },
        {
          targetUserId: "2648cbcf-e8f1-4854-a6e8-ef558b294a43",
          status: "suspended",
          reason: "Verdachte accountactiviteit onderzocht.",
        },
      ),
    ).rejects.toThrow("Extra beveiligingscontrole vereist.");
  });

  it("prevents an admin from removing their own admin role", async () => {
    const actor = {
      id: "9a39d5c9-ab63-4c04-81e2-2cb35e95bd83",
      status: "active" as const,
      roles: ["guest", "admin"] as const,
      assuranceLevel: "aal2" as const,
    };

    await expect(
      setUserRole(
        {
          async setRole() {
            throw new Error("gateway should not be called");
          },
        },
        actor,
        {
          targetUserId: actor.id,
          role: "admin",
          enabled: false,
          reason: "Eigen beheerrol verwijderen.",
        },
      ),
    ).rejects.toThrow("Je kunt je eigen beheerrol niet verwijderen.");
  });
});

describe("account deactivation", () => {
  it("requires the exact Dutch confirmation phrase", async () => {
    await expect(
      deactivateAccount(
        {
          async deactivate() {
            throw new Error("gateway should not be called");
          },
        },
        "verwijder mij",
      ),
    ).rejects.toThrow("Typ exact VERWIJDER MI");
  });
});
