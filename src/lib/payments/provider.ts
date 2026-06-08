import { parseStripeEnv } from "@/lib/env";
import { StripePaymentProvider, createStripeClient } from "@/lib/payments/stripe";
import type { PaymentProvider } from "@/lib/payments/types";
import { UnavailablePaymentProvider } from "@/lib/payments/unavailable-provider";

type Environment = Record<string, unknown>;

export function getPaymentProvider(
  environment: Environment = process.env,
): PaymentProvider {
  const secret = environment.STRIPE_SECRET_KEY;

  if (typeof secret !== "string" || secret.trim().length === 0) {
    return new UnavailablePaymentProvider();
  }

  const config = parseStripeEnv(environment);
  return new StripePaymentProvider(createStripeClient(config));
}
