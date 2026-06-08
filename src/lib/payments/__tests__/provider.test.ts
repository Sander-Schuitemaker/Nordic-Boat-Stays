import { describe, expect, it } from "vitest";

import { getPaymentProvider } from "@/lib/payments/provider";
import { PaymentProviderNotConfiguredError } from "@/lib/payments/types";

describe("getPaymentProvider", () => {
  it("returns an explicit unavailable provider without Stripe secrets", async () => {
    const provider = getPaymentProvider({});

    expect(provider.kind).toBe("unavailable");
    await expect(
      provider.createCheckout({
        bookingId: "booking-1",
        paymentId: "payment-1",
        reference: "NBS-TEST",
        amountCents: 10_800,
        currency: "EUR",
        customerEmail: "gast@example.com",
        successUrl: "https://example.com/bookings/success",
        cancelUrl: "https://example.com/bookings/cancel",
        idempotencyKey: "checkout-1",
      }),
    ).rejects.toBeInstanceOf(PaymentProviderNotConfiguredError);
  });

  it("selects Stripe only when its complete sandbox configuration is valid", () => {
    const provider = getPaymentProvider({
      NODE_ENV: "development",
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      STRIPE_SECRET_KEY: "sk_test_example",
      STRIPE_WEBHOOK_SECRET: "whsec_platform",
      STRIPE_CONNECT_WEBHOOK_SECRET: "whsec_connect",
      STRIPE_API_VERSION: "2026-05-27.dahlia",
    });

    expect(provider.kind).toBe("stripe");
  });
});
