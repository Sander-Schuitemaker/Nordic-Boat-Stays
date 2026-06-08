import {
  PaymentProviderNotConfiguredError,
  type PaymentProvider,
} from "@/lib/payments/types";

function unavailable(): never {
  throw new PaymentProviderNotConfiguredError();
}

export class UnavailablePaymentProvider implements PaymentProvider {
  readonly kind = "unavailable" as const;

  async createHostAccount() {
    return unavailable();
  }

  async createHostOnboardingLink() {
    return unavailable();
  }

  async createCheckout() {
    return unavailable();
  }

  async refund() {
    return unavailable();
  }

  async transferToHost() {
    return unavailable();
  }
}
