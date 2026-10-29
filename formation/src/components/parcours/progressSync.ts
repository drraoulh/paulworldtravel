'use client';

import { useEffect } from 'react';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase/client';
import { compactProgress, mergeProgress, normalizeProgress, type Progress } from '@/lib/progress-merge';
import { PROGRESS_EVENT } from './useCourse';

/*
 * Keeps the course progress of a signed-in student in their account (auth user metadata),
 * so it follows them across devices. Signed out, nothing happens: progress stays in this browser.
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

    const push = async (p: Progress) => {
      const json = JSON.stringify(p);
      if (!userId || json === lastPushed) return;
      const previous = lastPushed;
      lastPushed = json;
      try {
        const { error } = await supabase.auth.updateUser({ data: { [REMOTE_KEY]: p } });
        if (error) lastPushed = previous; // retried on the next change
      } catch { lastPushed = previous; }
    };

    const onChange = () => {
      if (applying || !userId) return;
      clearTimeout(timer);
      timer = setTimeout(() => { void push(compactProgress(readLocalProgress())); }, DEBOUNCE_MS);
    };

    const start = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled || !user || user.id === userId) return;
      const remote = user.user_metadata?.[REMOTE_KEY] ? normalizeProgress(user.user_metadata[REMOTE_KEY]) : null;
      const owner = readOwner();
      // Local progress left by another account is replaced, not merged.
      const local = owner && owner !== user.id ? normalizeProgress(null) : readLocalProgress();
      const merged = mergeProgress(local, remote);
      userId = user.id;
      set(OWNER, user.id);
      lastPushed = remote ? JSON.stringify(remote) : '';
      writeLocalProgress(merged);
      await push(merged);
    };

    const stop = () => { userId = null; lastPushed = ''; clearTimeout(timer); };

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
