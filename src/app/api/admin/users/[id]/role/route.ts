import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { setUserRole } from "@/lib/auth/account-service";
import { canPerformAdminAction } from "@/lib/auth/authorization";
import { adminRoleMutationSchema } from "@/lib/auth/schemas";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const actor = await getCurrentUser();
  if (!actor || !canPerformAdminAction(actor)) {
    return NextResponse.json(
      { error: "Extra beveiligingscontrole vereist." },
      { status: 403 },
    );
  }

  const parsed = adminRoleMutationSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Controleer de rol en geef een duidelijke reden." },
      { status: 400 },
    );
  }

  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();

  try {
    await setUserRole(
      {
        async setRole(input) {
          const { error } = await supabase.rpc("admin_set_user_role", {
            p_target_user_id: input.targetUserId,
            p_role: input.role,
            p_enabled: input.enabled,
            p_reason: input.reason,
          });
          if (error) {
            throw error;
          }
        },
      },
      actor,
      {
        targetUserId: id,
        ...parsed.data,
      },
    );
  } catch {
    return NextResponse.json(
      { error: "De accountrol kon niet worden gewijzigd." },
      { status: 400 },
    );
  }

  return NextResponse.json({ message: "Accountrol gewijzigd." });
}
