import { getPublicEnv } from "@/lib/env";

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super("Supabase is nog niet geconfigureerd.");
    this.name = "SupabaseNotConfiguredError";
  }
}

export function requirePublicSupabaseConfig() {
  const config = getPublicEnv();

  if (!config.configured || !config.url || !config.publishableKey) {
    throw new SupabaseNotConfiguredError();
  }

  return {
    url: config.url,
    publishableKey: config.publishableKey,
  };
}
