"use client";

import { createBrowserClient } from "@supabase/ssr";

import { requirePublicSupabaseConfig } from "@/lib/supabase/config";

export function createBrowserSupabaseClient() {
  const config = requirePublicSupabaseConfig();

  return createBrowserClient(config.url, config.publishableKey);
}
