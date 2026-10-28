'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured } from './config';

let client: ReturnType<typeof createBrowserClient> | null = null;

/** Browser client, or null while Supabase is not configured. */
export function getSupabase() {
  if (!supabaseConfigured) return null;
  client ??= createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
  return client;
}
