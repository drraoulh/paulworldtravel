'use client';

import { useEffect } from 'react';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase/client';
import { compactProgress, mergeProgress, normalizeProgress, type Progress } from '@/lib/progress-merge';
import { PROGRESS_EVENT } from './useCourse';

/*
 * Keeps the course progress of a signed-in student in their account (table learner_progress),
 * so it follows them across devices. Signed out, nothing happens: progress stays in this browser.
 * Never in the auth user metadata: it is copied into the session token and cookie, which grew
 * with every series until the site refused the request (494 REQUEST_HEADER_TOO_LARGE).
 */
const DONE = 'pwt-parcours-done';
const META = 'pwt-parcours-meta';
const RESULTS = 'pwt-results';
// The account whose progress this browser holds, so a shared device does not mix two students.
const OWNER = 'pwt-progress-owner';
const REMOTE_KEY = 'pwt_progress';
const DEBOUNCE_MS = 2000;

function get(key: string): unknown {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { return null; }
}

function set(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* storage is optional */ }
}

export function readLocalProgress(): Progress {
  return normalizeProgress({ done: get(DONE), meta: get(META), results: get(RESULTS) });
}

function readOwner(): string | null {
  try { return localStorage.getItem(OWNER); } catch { return null; }
}

let applying = false;

function writeLocalProgress(p: Progress) {
  set(DONE, JSON.stringify(p.done));
  set(META, JSON.stringify(p.meta));
  set(RESULTS, JSON.stringify(p.results));
  // Listeners run synchronously, so the flag marks this change as coming from the account.
  applying = true;
  try { window.dispatchEvent(new Event(PROGRESS_EVENT)); } finally { applying = false; }
}

export default function ProgressSync() {
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let userId: string | null = null;
    let lastPushed = '';
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let generation = 0;
    let legacyInSession = false;

    const push = async (p: Progress) => {
      const json = JSON.stringify(p);
      if (!userId || json === lastPushed) return;
      const ownerId = userId;
      const previous = lastPushed;
      lastPushed = json;
      try {
        const { error } = await supabase.from('learner_progress').upsert({ user_id: ownerId, snapshot: p }, { onConflict: 'user_id' });
        if (cancelled || userId !== ownerId) return;
        if (error) { lastPushed = previous; return; } // retried on the next change
        // Older versions also kept the progress in the account metadata: removed once it is saved in the table.
        if (legacyInSession) {
          const { error: cleanError } = await supabase.auth.updateUser({ data: { [REMOTE_KEY]: null } });
          if (!cleanError) legacyInSession = false;
        }
      } catch { if (userId === ownerId) lastPushed = previous; }
    };

    const onChange = () => {
      if (applying || !userId) return;
      clearTimeout(timer);
      timer = setTimeout(() => { void push(compactProgress(readLocalProgress())); }, DEBOUNCE_MS);
    };

    const start = async () => {
      const startedAt = generation;
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled || startedAt !== generation || !user || user.id === userId) return;
      const { data: saved } = await supabase.from('learner_progress').select('snapshot').eq('user_id', user.id).maybeSingle();
      if (cancelled || startedAt !== generation || user.id === userId) return;
      legacyInSession = Boolean(user.user_metadata?.[REMOTE_KEY]);
      const metadata = legacyInSession ? normalizeProgress(user.user_metadata[REMOTE_KEY]) : normalizeProgress(null);
      const remote = mergeProgress(metadata, saved?.snapshot ? normalizeProgress(saved.snapshot) : null);
      const owner = readOwner();
      // Local progress left by another account is replaced, not merged.
      const local = owner && owner !== user.id ? normalizeProgress(null) : readLocalProgress();
      const merged = mergeProgress(local, remote);
      userId = user.id;
      set(OWNER, user.id);
      lastPushed = ''; // mirror an existing account snapshot on first connection too
      writeLocalProgress(merged);
      await push(merged);
    };

    const stop = () => { generation++; userId = null; lastPushed = ''; clearTimeout(timer); };

    window.addEventListener(PROGRESS_EVENT, onChange);
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      // Deferred: Supabase calls must not run inside this callback.
      if (event === 'SIGNED_OUT' || !session) { stop(); return; }
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') setTimeout(() => { void start().catch(() => {}); }, 0);
    });

    return () => {
      cancelled = true;
      stop();
      subscription.unsubscribe();
      window.removeEventListener(PROGRESS_EVENT, onChange);
    };
  }, []);

  return null;
}
