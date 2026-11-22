import { AsyncLocalStorage } from 'node:async_hooks';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Token accounting: every AI provider call made while handling one request is
 * collected here, then saved in ai_token_usage with the user who triggered it.
 * Failures to log never break the request.
 */
type Call = { kind: 'chat' | 'transcription'; model: string; input: number; output: number; audioSeconds: number };
type Store = { feature: string; userId: string | null; calls: Call[] };

const store = new AsyncLocalStorage<Store>();

/** Called once the user is known (access checks). */
export function setUsageUser(userId: string) {
  const s = store.getStore();
  if (s && !s.userId) s.userId = userId;
}

export function noteAiCall(call: Call) {
  store.getStore()?.calls.push(call);
}

const int = (v: unknown) => (Number.isFinite(Number(v)) ? Math.max(0, Math.round(Number(v))) : 0);

export async function withUsage<T>(feature: string, fn: () => Promise<T>, userId: string | null = null): Promise<T> {
  const s: Store = { feature, userId, calls: [] };
  try {
    return await store.run(s, fn);
  } finally {
    if (s.userId && s.calls.length) {
      try {
        const admin = createAdminClient();
        const { error } = admin
          ? await admin.from('ai_token_usage').insert(s.calls.map((c) => ({
            user_id: s.userId, feature: s.feature, kind: c.kind, model: c.model.slice(0, 80),
            input_tokens: int(c.input), output_tokens: int(c.output), audio_seconds: Math.max(0, Number(c.audioSeconds) || 0),
          })))
          : { error: null };
        if (error) console.error('AI usage log failed', error.message);
      } catch (e) {
        console.error('AI usage log failed', e);
      }
    }
  }
}
