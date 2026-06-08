import { describe, expect, it } from "vitest";

import {
  loginSchema,
  messageSchema,
  notificationPreferencesSchema,
  profileSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/auth/schemas";

describe("registerSchema", () => {
  it("requires a strong password and accepted terms", () => {
    expect(
      registerSchema.safeParse({
        fullName: "Sander Schuit",
        email: "sander@example.com",
        password: "kort",
        acceptTerms: false,
      }).success,
    ).toBe(false);
  });

  it("normalizes a valid email address", () => {
    const result = registerSchema.parse({
      fullName: "Sander Schuit",
      email: " SANDER@EXAMPLE.COM ",
      password: "veilig-wachtwoord-2026",
      acceptTerms: true,
    });

    expect(result.email).toBe("sander@example.com");
  });
});

describe("loginSchema", () => {
  it("accepts an existing password without applying new-password strength rules", () => {
    expect(
      loginSchema.safeParse({
        email: "gast@example.com",
        password: "bestaand",
      }).success,
    ).toBe(true);
  });
});

describe("profileSchema", () => {
  it("rejects future birth dates", () => {
    expect(
      profileSchema.safeParse({
        fullName: "Sander Schuit",
        dateOfBirth: "2999-01-01",
        language: "nl",
        preferredCurrency: "EUR",
      }).success,
    ).toBe(false);
  });

  it("accepts an empty optional phone number", () => {
    expect(
      profileSchema.safeParse({
        fullName: "Sander Schuit",
        phone: "",
        language: "nl",
        preferredCurrency: "EUR",
      }).success,
    ).toBe(true);
  });
});

describe("resetPasswordSchema", () => {
  it("requires matching passwords", () => {
    expect(
      resetPasswordSchema.safeParse({
        password: "veilig-wachtwoord-2026",
        confirmPassword: "ander-wachtwoord-2026",
      }).success,
    ).toBe(false);
  });
});

describe("notificationPreferencesSchema", () => {
  it("only accepts explicit notification channels", () => {
    expect(
      notificationPreferencesSchema.parse({
        booking: true,
        messages: false,
        marketing: false,
      }),
    ).toEqual({
      booking: true,
      messages: false,
      marketing: false,
    });

    expect(
      notificationPreferencesSchema.safeParse({
        booking: true,
        messages: true,
        marketing: false,
        isAdmin: true,
      }).success,
    ).toBe(false);
  });
});

describe("messageSchema", () => {
  it("rejects empty messages and invalid conversation identifiers", () => {
    expect(
      messageSchema.safeParse({
        conversationId: "geen-uuid",
        body: " ",
      }).success,
    ).toBe(false);
  });
});
