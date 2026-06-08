export type PaymentCurrency = "EUR";

export type CreateHostAccountInput = {
  hostId: string;
  email: string;
  displayName: string;
  countryCode: string;
  entityType: "individual" | "company";
  idempotencyKey: string;
};

export type CreateHostOnboardingLinkInput = {
  accountId: string;
  refreshUrl: string;
  returnUrl: string;
  idempotencyKey: string;
};

export type CreateCheckoutInput = {
  bookingId: string;
  paymentId: string;
  reference: string;
  amountCents: number;
  currency: PaymentCurrency;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  idempotencyKey: string;
};

export type RefundPaymentInput = {
  paymentIntentId: string;
  amountCents: number;
  reason: string;
  idempotencyKey: string;
};

export type TransferToHostInput = {
  bookingId: string;
  connectedAccountId: string;
  amountCents: number;
  currency: PaymentCurrency;
  transferGroup: string;
  idempotencyKey: string;
};

export interface PaymentProvider {
  readonly kind: "stripe" | "unavailable";
  createHostAccount(
    input: CreateHostAccountInput,
  ): Promise<{ accountId: string }>;
  createHostOnboardingLink(
    input: CreateHostOnboardingLinkInput,
  ): Promise<{ url: string; expiresAt: number }>;
  createCheckout(
    input: CreateCheckoutInput,
  ): Promise<{ providerSessionId: string; url: string }>;
  refund(
    input: RefundPaymentInput,
  ): Promise<{ providerRefundId: string; status: string }>;
  transferToHost(
    input: TransferToHostInput,
  ): Promise<{ providerTransferId: string }>;
}

export class PaymentProviderNotConfiguredError extends Error {
  constructor() {
    super("De betaalprovider is nog niet geconfigureerd.");
    this.name = "PaymentProviderNotConfiguredError";
  }
}

export class PaymentOperationNotImplementedError extends Error {
  constructor(operation: string) {
    super(`Betaalbewerking '${operation}' wordt in de checkoutfase geactiveerd.`);
    this.name = "PaymentOperationNotImplementedError";
  }
}
