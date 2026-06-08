import "server-only";

import { createHmac } from "node:crypto";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const WINDOW_MINUTES = 15;
const MAX_EMAIL_FAILURES = 5;
const MAX_IP_FAILURES = 20;

export function authAttemptAllowed(input: {
  emailFailures: number;
  ipFailures: number;
}): boolean {
  return (
    input.emailFailures < MAX_EMAIL_FAILURES &&
    input.ipFailures < MAX_IP_FAILURES
  );
}

export function hashAuthIdentifier(value: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function rateLimitSecret(): string {
  const secret = process.env.AUTH_RATE_LIMIT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_RATE_LIMIT_SECRET is niet veilig geconfigureerd.");
  }
  return secret;
}

export class AuthRateLimitError extends Error {
  constructor() {
    super("Te veel pogingen. Wacht 15 minuten en probeer het opnieuw.");
    this.name = "AuthRateLimitError";
  }
}

export async function enforceAuthRateLimit(input: {
  email: string;
  ipAddress: string | null;
}) {
  const supabase = createAdminSupabaseClient();
  const emailHash = hashAuthIdentifier(input.email, rateLimitSecret());
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
  const [emailResult, ipResult] = await Promise.all([
    supabase
      .from("login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("email_hash", emailHash)
      .eq("success", false)
      .gte("created_at", since),
    input.ipAddress
      ? supabase
          .from("login_attempts")
          .select("id", { count: "exact", head: true })
          .eq("ip_address", input.ipAddress)
          .eq("success", false)
          .gte("created_at", since)
      : Promise.resolve({ count: 0, error: null }),
  ]);

  if (emailResult.error || ipResult.error) {
    throw new Error("Inlogbeveiliging kon niet worden gecontroleerd.");
  }

  if (
    !authAttemptAllowed({
      emailFailures: emailResult.count ?? 0,
      ipFailures: ipResult.count ?? 0,
    })
  ) {
    throw new AuthRateLimitError();
  }
}

export async function recordAuthAttempt(input: {
  email: string;
  ipAddress: string | null;
  success: boolean;
  failureReason?: string;
}) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("login_attempts").insert({
    email_hash: hashAuthIdentifier(input.email, rateLimitSecret()),
    ip_address: input.ipAddress,
    success: input.success,
    failure_reason: input.success
      ? null
      : (input.failureReason ?? "authentication_failed").slice(0, 120),
  });

  if (error) {
    throw new Error("Inlogpoging kon niet veilig worden geregistreerd.");
  }
}
