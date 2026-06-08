import { z } from "zod";

type EnvInput = Record<string, unknown>;

export const STRIPE_API_VERSION = "2026-05-27.dahlia" as const;

export type PublicEnv = {
  configured: boolean;
  url: string | null;
  publishableKey: string | null;
};

export type ServerEnv = {
  appUrl: string;
  supabaseUrl: string;
  supabasePublishableKey: string;
  supabaseSecretKey: string;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  stripeConnectWebhookSecret: string;
  stripeApiVersion: typeof STRIPE_API_VERSION;
};

export type SupabaseServerEnv = {
  supabaseUrl: string;
  supabasePublishableKey: string;
  supabaseSecretKey: string;
};

export type StripeEnv = {
  appUrl: string;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  stripeConnectWebhookSecret: string;
  stripeApiVersion: typeof STRIPE_API_VERSION;
};

const publicUrlSchema = z.string().url();
const publishableKeySchema = z.string().startsWith("sb_publishable_");

const supabaseServerSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: publicUrlSchema,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: publishableKeySchema,
  SUPABASE_SECRET_KEY: z.string().startsWith("sb_secret_"),
});

const stripeSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  STRIPE_CONNECT_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  STRIPE_API_VERSION: z.literal(STRIPE_API_VERSION),
});

function present(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parsePublicEnv(input: EnvInput): PublicEnv {
  const urlPresent = present(input.NEXT_PUBLIC_SUPABASE_URL);
  const keyPresent = present(input.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  if (!urlPresent && !keyPresent) {
    return {
      configured: false,
      url: null,
      publishableKey: null,
    };
  }

  if (!urlPresent || !keyPresent) {
    throw new Error("Publieke Supabase-configuratie is onvolledig.");
  }

  const parsed = z
    .object({
      NEXT_PUBLIC_SUPABASE_URL: publicUrlSchema,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: publishableKeySchema,
    })
    .safeParse(input);

  if (!parsed.success) {
    throw new Error("Publieke Supabase-configuratie is ongeldig.");
  }

  return {
    configured: true,
    url: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: parsed.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  };
}

export function parseServerEnv(input: EnvInput): ServerEnv {
  try {
    return {
      ...parseSupabaseServerEnv(input),
      ...parseStripeEnv(input),
    };
  } catch {
    throw new Error("Serverconfiguratie is ongeldig.");
  }
}

export function parseSupabaseServerEnv(input: EnvInput): SupabaseServerEnv {
  const parsed = supabaseServerSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Supabase-serverconfiguratie is ongeldig.");
  }

  return {
    supabaseUrl: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
    supabasePublishableKey:
      parsed.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    supabaseSecretKey: parsed.data.SUPABASE_SECRET_KEY,
  };
}

export function parseStripeEnv(input: EnvInput): StripeEnv {
  const parsed = stripeSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Stripe-serverconfiguratie is ongeldig.");
  }

  const stripeKeyPrefix =
    parsed.data.NODE_ENV === "production" ? "sk_live_" : "sk_test_";

  if (!parsed.data.STRIPE_SECRET_KEY.startsWith(stripeKeyPrefix)) {
    throw new Error("Stripe-serverconfiguratie is ongeldig.");
  }

  return {
    appUrl: parsed.data.NEXT_PUBLIC_APP_URL,
    stripeSecretKey: parsed.data.STRIPE_SECRET_KEY,
    stripeWebhookSecret: parsed.data.STRIPE_WEBHOOK_SECRET,
    stripeConnectWebhookSecret:
      parsed.data.STRIPE_CONNECT_WEBHOOK_SECRET,
    stripeApiVersion: parsed.data.STRIPE_API_VERSION,
  };
}

export function getPublicEnv(): PublicEnv {
  return parsePublicEnv(process.env);
}

export function getServerEnv(): ServerEnv {
  return parseServerEnv(process.env);
}

export function getSupabaseServerEnv(): SupabaseServerEnv {
  return parseSupabaseServerEnv(process.env);
}

export function getStripeEnv(): StripeEnv {
  return parseStripeEnv(process.env);
}
