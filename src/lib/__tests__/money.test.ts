import { describe, expect, it } from "vitest";

import { calculateFees } from "@/lib/money";

describe("calculateFees", () => {
  it("applies the approved 8% guest fee and 5% host commission", () => {
    expect(calculateFees(100_000)).toEqual({
      bookingSubtotalCents: 100_000,
      guestServiceFeeCents: 8_000,
      hostCommissionCents: 5_000,
      guestTotalCents: 108_000,
      hostNetCents: 95_000,
    });
  });

  it("rounds half cents away from zero using integer arithmetic", () => {
    expect(
      calculateFees(1, {
        guestFeeBps: 5_000,
        hostFeeBps: 5_000,
      }),
    ).toMatchObject({
      guestServiceFeeCents: 1,
      hostCommissionCents: 1,
    });
  });

  it("supports custom basis-point snapshots", () => {
    expect(
      calculateFees(12_345, {
        guestFeeBps: 750,
        hostFeeBps: 425,
      }),
    ).toEqual({
      bookingSubtotalCents: 12_345,
      guestServiceFeeCents: 926,
      hostCommissionCents: 525,
      guestTotalCents: 13_271,
      hostNetCents: 11_820,
    });
  });

  it.each([-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects invalid cent amount %s",
    (amount) => {
      expect(() => calculateFees(amount)).toThrow("Ongeldig geldbedrag.");
    },
  );
});
