"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/database.types";
import { requirePublicSupabaseConfig } from "@/lib/supabase/config";

export function createBrowserSupabaseClient() {
  const config = requirePublicSupabaseConfig();

  return createBrowserClient<Database>(config.url, config.publishableKey);
}
