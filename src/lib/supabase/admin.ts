import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/database.types";
import { getSupabaseServerEnv } from "@/lib/env";

export function createAdminSupabaseClient() {
  const config = getSupabaseServerEnv();

  return createClient<Database>(config.supabaseUrl, config.supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
