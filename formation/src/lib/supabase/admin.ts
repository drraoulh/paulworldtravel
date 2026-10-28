import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL } from './config';

/**
 * Server-only client with the project's secret key: bypasses row level security.
 * Used only for writes the candidate must not be able to forge (AI scores, usage).
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!SUPABASE_URL || !key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
