type CreatePaymentInput = {
  bookingId: string;
  amount: number;
  currency?: "EUR" | "NOK";
};

export async function createMockPayment(input: CreatePaymentInput) {
  return {
    id: `pay_mock_${input.bookingId}`,
    bookingId: input.bookingId,
    provider: "mock",
    providerRef: `mock_${Date.now()}`,
    amount: input.amount,
    currency: input.currency ?? "EUR",
    status: "authorized" as const
  };
}

export async function refundMockPayment(paymentId: string) {
  return {
    id: paymentId,
    status: "refunded" as const
  };
}
