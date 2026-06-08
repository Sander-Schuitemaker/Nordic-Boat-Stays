import { describe, expect, it } from "vitest";

import {
  parsePublicEnv,
  parseServerEnv,
  parseStripeEnv,
  parseSupabaseServerEnv,
} from "@/lib/env";

describe("parsePublicEnv", () => {
  it("allows the compatibility app to run without Supabase configuration", () => {
    expect(parsePublicEnv({})).toEqual({
      configured: false,
      url: null,
      publishableKey: null,
    });
  });

  it("rejects partially configured public credentials", () => {
    expect(() =>
      parsePublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
      }),
    ).toThrow("Publieke Supabase-configuratie is onvolledig.");
  });

  it("never exposes server secrets", () => {
    const parsed = parsePublicEnv({
      NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
      SUPABASE_SECRET_KEY: "sb_secret_never_public",
      STRIPE_SECRET_KEY: "sk_test_never_public",
    });

    expect(parsed).toEqual({
      configured: true,
      url: "https://project.supabase.co",
      publishableKey: "sb_publishable_test",
    });
    expect(JSON.stringify(parsed)).not.toContain("never_public");
  });
});

describe("parseServerEnv", () => {
  const validDevelopmentEnv = {
    NODE_ENV: "development",
    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
    SUPABASE_SECRET_KEY: "sb_secret_test",
    STRIPE_SECRET_KEY: "sk_test_example",
    STRIPE_WEBHOOK_SECRET: "whsec_platform",
    STRIPE_CONNECT_WEBHOOK_SECRET: "whsec_connect",
    STRIPE_API_VERSION: "2026-05-27.dahlia",
  };

  it("parses complete sandbox configuration", () => {
    const parsed = parseServerEnv(validDevelopmentEnv);

    expect(parsed.stripeSecretKey).toBe("sk_test_example");
    expect(parsed.appUrl).toBe("http://localhost:3000");
  });

  it("requires all server-only values", () => {
    expect(() =>
      parseServerEnv({
        ...validDevelopmentEnv,
        SUPABASE_SECRET_KEY: "",
      }),
    ).toThrow("Serverconfiguratie is ongeldig.");
  });

  it("rejects Stripe test keys in production", () => {
    expect(() =>
      parseServerEnv({
        ...validDevelopmentEnv,
        NODE_ENV: "production",
      }),
    ).toThrow("Serverconfiguratie is ongeldig.");
  });

  it("does not include secret values in validation errors", () => {
    const invalidSecret = "definitely-not-a-real-secret";

    try {
      parseServerEnv({
        ...validDevelopmentEnv,
        STRIPE_SECRET_KEY: invalidSecret,
      });
      throw new Error("Expected parseServerEnv to throw.");
    } catch (error) {
      expect(String(error)).not.toContain(invalidSecret);
    }
  });

  it("rejects an API version that does not match the installed Stripe SDK", () => {
    expect(() =>
      parseStripeEnv({
        ...validDevelopmentEnv,
        STRIPE_API_VERSION: "2026-02-25.clover",
      }),
    ).toThrow("Stripe-serverconfiguratie is ongeldig.");
  });
});

describe("integration-specific server configuration", () => {
  it("parses Supabase without requiring Stripe", () => {
    expect(
      parseSupabaseServerEnv({
        NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
        SUPABASE_SECRET_KEY: "sb_secret_test",
      }),
    ).toEqual({
      supabaseUrl: "https://project.supabase.co",
      supabasePublishableKey: "sb_publishable_test",
      supabaseSecretKey: "sb_secret_test",
    });
  });

  it("parses Stripe without requiring Supabase", () => {
    expect(
      parseStripeEnv({
        NODE_ENV: "development",
        NEXT_PUBLIC_APP_URL: "http://localhost:3000",
        STRIPE_SECRET_KEY: "sk_test_example",
        STRIPE_WEBHOOK_SECRET: "whsec_platform",
        STRIPE_CONNECT_WEBHOOK_SECRET: "whsec_connect",
        STRIPE_API_VERSION: "2026-05-27.dahlia",
      }),
    ).toEqual({
      appUrl: "http://localhost:3000",
      stripeSecretKey: "sk_test_example",
      stripeWebhookSecret: "whsec_platform",
      stripeConnectWebhookSecret: "whsec_connect",
      stripeApiVersion: "2026-05-27.dahlia",
    });
  });
});
