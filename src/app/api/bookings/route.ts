import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Log in om direct te boeken." },
      { status: 401 },
    );
  }

  const parsed = bookingSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Controleer je boekingsgegevens.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      error:
        "Veilig betalen wordt geactiveerd zodra Stripe Checkout en de webhooks zijn gekoppeld.",
      code: "CHECKOUT_NOT_ACTIVE",
    },
    { status: 503 },
  );
}
