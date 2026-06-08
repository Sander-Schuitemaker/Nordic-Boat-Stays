import "server-only";

import Stripe from "stripe";

import {
  getStripeEnv,
  type StripeEnv,
} from "@/lib/env";
import {
  PaymentOperationNotImplementedError,
  type CreateCheckoutInput,
  type CreateHostAccountInput,
  type CreateHostOnboardingLinkInput,
  type PaymentProvider,
  type RefundPaymentInput,
  type TransferToHostInput,
} from "@/lib/payments/types";

let stripeClient: Stripe | null = null;

export function createStripeClient(config: StripeEnv): Stripe {
  return new Stripe(config.stripeSecretKey, {
    apiVersion: config.stripeApiVersion,
    appInfo: {
      name: "Nordic Boat Stays",
      version: "0.1.0",
    },
    maxNetworkRetries: 2,
  });
}

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    stripeClient = createStripeClient(getStripeEnv());
  }

  return stripeClient;
}

export class StripePaymentProvider implements PaymentProvider {
  readonly kind = "stripe" as const;

  constructor(private readonly stripe: Stripe) {}

  async createHostAccount(input: CreateHostAccountInput) {
    const account = await this.stripe.v2.core.accounts.create(
      {
        contact_email: input.email,
        display_name: input.displayName,
        dashboard: "none",
        defaults: {
          currency: "eur",
          locales: ["nl-NL"],
          responsibilities: {
            fees_collector: "application",
            losses_collector: "application",
          },
        },
        identity: {
          country: input.countryCode.toLowerCase(),
          entity_type: input.entityType,
        },
        configuration: {
          recipient: {
            capabilities: {
              stripe_balance: {
                stripe_transfers: {
                  requested: true,
                },
              },
            },
          },
        },
        metadata: {
          host_id: input.hostId,
        },
      },
      {
        idempotencyKey: input.idempotencyKey,
      },
    );

    return { accountId: account.id };
  }

  async createHostOnboardingLink(input: CreateHostOnboardingLinkInput) {
    const link = await this.stripe.v2.core.accountLinks.create(
      {
        account: input.accountId,
        use_case: {
          type: "account_onboarding",
          account_onboarding: {
            configurations: ["recipient"],
            collection_options: {
              fields: "eventually_due",
              future_requirements: "include",
            },
            refresh_url: input.refreshUrl,
            return_url: input.returnUrl,
          },
        },
      },
      {
        idempotencyKey: input.idempotencyKey,
      },
    );

    return {
      url: link.url,
      expiresAt: Math.floor(Date.parse(link.expires_at) / 1000),
    };
  }

  async createCheckout(
    _input: CreateCheckoutInput,
  ): Promise<{ providerSessionId: string; url: string }> {
    throw new PaymentOperationNotImplementedError("createCheckout");
  }

  async refund(
    _input: RefundPaymentInput,
  ): Promise<{ providerRefundId: string; status: string }> {
    throw new PaymentOperationNotImplementedError("refund");
  }

  async transferToHost(
    _input: TransferToHostInput,
  ): Promise<{ providerTransferId: string }> {
    throw new PaymentOperationNotImplementedError("transferToHost");
  }
}
