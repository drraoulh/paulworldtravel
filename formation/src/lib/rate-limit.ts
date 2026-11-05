import 'server-only';
import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';

/*
 * Limits repeated attempts (sign-up emails, payment pages, pack requests) with a
 * counter in the database (table rate_hits, function rate_limit_hit). If the
 * counter is unavailable, the request goes through: a database problem must not
 * block real candidates.
 */

export const TOO_MANY = 'Trop de tentatives. Réessayez dans un moment ou écrivez-nous sur WhatsApp.';

/** The visitor's address, hashed: we count attempts without storing the IP itself. */
export async function visitorKey() {
  const h = await headers();
  const ip = h.get('x-real-ip') ?? h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  return createHash('sha256').update(`pwt:${ip}`).digest('hex').slice(0, 32);
}

/** true if allowed. `key` names the action and who does it, e.g. `inscription:ip:<hash>`. */
export async function allow(key: string, limit: number, windowSeconds: number) {
  const admin = createAdminClient();
  if (!admin) return true;
  try {
    const { data, error } = await admin.rpc('rate_limit_hit', { p_key: key, p_limit: limit, p_window_seconds: windowSeconds });
    if (error) {
      console.warn('Rate limit unavailable', error.message);
      return true;
    }
    return data !== false;
  } catch (e) {
    console.warn('Rate limit unavailable', e);
    return true;
  }
}

const HOUR = 3600;
const DAY = 86_400;

/** Public sign-up form: 5 per hour per address, 3 per day per email. */
export async function allowSignup(email: string) {
  const ip = await visitorKey();
  const mail = createHash('sha256').update(email.toLowerCase()).digest('hex').slice(0, 32);
  return (await allow(`inscription:ip:${ip}`, 5, HOUR)) && (await allow(`inscription:mail:${mail}`, 3, DAY));
}

/** Signed-in actions: `limit` per hour per account. */
export const allowUser = (action: string, userId: string, limit: number) => allow(`${action}:user:${userId}`, limit, HOUR);
