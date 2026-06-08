import type { z } from "zod";

import { profileSchema, registerSchema } from "@/lib/auth/schemas";

export type SignUpRequest = {
  email: string;
  password: string;
  emailRedirectTo: string;
  metadata: {
    full_name: string;
    language: string;
  };
};

export type SignUpResult = {
  userId: string | null;
  hasSession: boolean;
  errorMessage?: string;
};

export type AuthGateway = {
  signUp(request: SignUpRequest): Promise<SignUpResult>;
};

export async function registerUser(
  gateway: AuthGateway,
  input: z.input<typeof registerSchema>,
  appUrl: string,
): Promise<SignUpResult> {
  const parsed = registerSchema.parse(input);
  const baseUrl = appUrl.replace(/\/+$/, "");

  return gateway.signUp({
    email: parsed.email,
    password: parsed.password,
    emailRedirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent("/account")}`,
    metadata: {
      full_name: parsed.fullName,
      language: "nl",
    },
  });
}

export function publicPasswordResetResult() {
  return {
    message: "Als dit e-mailadres bestaat, ontvang je zo een herstelmail.",
  };
}

export function toProfileUpdates(
  input: z.input<typeof profileSchema>,
) {
  const parsed = profileSchema.parse(input);

  return {
    user: {
      full_name: parsed.fullName,
      phone: parsed.phone ?? null,
      locale: parsed.language,
    },
    profile: {
      date_of_birth: parsed.dateOfBirth ?? null,
      country: parsed.country ?? null,
      language: parsed.language,
      bio: parsed.bio ?? null,
      preferred_currency: parsed.preferredCurrency,
    },
  };
}
