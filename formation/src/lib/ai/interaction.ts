import { createHmac, timingSafeEqual } from 'node:crypto';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { AccessError } from './access';
import type { Turn } from './prompts';

/*
 * An interaction (speaking task 2) costs one speaking correction, charged when it
 * starts. The signed ticket then lets the same candidate exchange turns and get the
 * correction for a limited time, without another charge.
 */
const TTL_MS = 20 * 60 * 1000;
export const MAX_TURNS = 40;

const secret = () => {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) throw new AccessError(503, 'Cette fonction n’est pas encore activée.');
  return `${key}:interaction`;
};
const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url');

export function issueTicket(userId: string, taskId: string) {
  const payload = Buffer.from(JSON.stringify({ u: userId, t: taskId, e: Date.now() + TTL_MS })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

/** Checks the ticket against the signed-in user. Throws AccessError. */
export async function verifyTicket(ticket: unknown, taskId: string) {
  const [payload, mac] = String(ticket ?? '').split('.');
  const expected = payload ? sign(payload) : '';
  if (!payload || !mac || mac.length !== expected.length || !timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) {
    throw new AccessError(403, 'Échange invalide. Recommencez la tâche.');
  }
  const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { u: string; t: string; e: number };
  if (data.t !== taskId) throw new AccessError(403, 'Échange invalide. Recommencez la tâche.');
  if (Date.now() > data.e) throw new AccessError(410, 'Cet échange a expiré. Recommencez la tâche.');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.id !== data.u) throw new AccessError(401, 'Connectez-vous pour utiliser cette fonction.');
  const admin = createAdminClient();
  if (!admin) throw new AccessError(503, 'Cette fonction n’est pas encore activée.');
  return { user, admin };
}

/** Validates the dialogue sent back by the browser. */
export function parseTurns(value: unknown): Turn[] {
  const raw = typeof value === 'string' ? JSON.parse(value || '[]') : value;
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, MAX_TURNS).flatMap((t) => {
    const who = t?.who === 'candidate' ? 'candidate' : t?.who === 'partner' ? 'partner' : null;
    const text = String(t?.text ?? '').trim().slice(0, 800);
    return who && text ? [{ who, text } as Turn] : [];
  });
}
