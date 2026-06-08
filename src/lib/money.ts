export const DEFAULT_GUEST_FEE_BPS = 800;
export const DEFAULT_HOST_FEE_BPS = 500;

type FeeOptions = {
  guestFeeBps?: number;
  hostFeeBps?: number;
};

export type FeeCalculation = {
  bookingSubtotalCents: number;
  guestServiceFeeCents: number;
  hostCommissionCents: number;
  guestTotalCents: number;
  hostNetCents: number;
};

function assertNonNegativeInteger(value: number, message: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(message);
  }
}

function applyBasisPoints(amountCents: number, basisPoints: number): number {
  assertNonNegativeInteger(basisPoints, "Ongeldig commissiepercentage.");

  if (basisPoints > 10_000) {
    throw new Error("Ongeldig commissiepercentage.");
  }

  const rounded =
    (BigInt(amountCents) * BigInt(basisPoints) + BigInt(5_000)) /
    BigInt(10_000);
  const result = Number(rounded);

  if (!Number.isSafeInteger(result)) {
    throw new Error("Geldbedrag is te groot.");
  }

  return result;
}

export function calculateFees(
  bookingSubtotalCents: number,
  options: FeeOptions = {},
): FeeCalculation {
  assertNonNegativeInteger(bookingSubtotalCents, "Ongeldig geldbedrag.");

  const guestServiceFeeCents = applyBasisPoints(
    bookingSubtotalCents,
    options.guestFeeBps ?? DEFAULT_GUEST_FEE_BPS,
  );
  const hostCommissionCents = applyBasisPoints(
    bookingSubtotalCents,
    options.hostFeeBps ?? DEFAULT_HOST_FEE_BPS,
  );

  return {
    bookingSubtotalCents,
    guestServiceFeeCents,
    hostCommissionCents,
    guestTotalCents: bookingSubtotalCents + guestServiceFeeCents,
    hostNetCents: bookingSubtotalCents - hostCommissionCents,
  };
}
