'use client';

import { useEffect, useState } from 'react';
import type { AuthChangeEvent } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase/client';
import { PROGRESS_EVENT } from '@/components/parcours/useCourse';

export interface Access {
  signedIn: boolean;
  aiAllowed?: boolean;
  exams?: { remaining: number; limit: number; days: number };
  plan?: 'trial' | 'active' | 'staff';
  pack?: string | null;
  endsAt?: string | null;
  firstName?: string | null;
  remaining?: { writing: number; speaking: number; tutor: number };
}

const REFRESH = 'pwt-access-refresh';

/** Ask the access banners and gates to reload (after an AI correction, for example). */
export const refreshAccess = () => window.dispatchEvent(new Event(REFRESH));

/*
 * One request for the whole page: every component that needs the access shares
 * the same answer, reloaded on sign-in, sign-out and after each AI use.
 */
let current: Access | null = null;
let loading = false;
const listeners = new Set<(a: Access) => void>();

function reload() {
  loading = true;
  fetch('/api/access/', { cache: 'no-store' })
    .then((r) => r.json())
    .catch(() => ({ signedIn: false }))
    .then((a: Access) => {
      current = a;
      listeners.forEach((set) => set(a));
    })
    .finally(() => { loading = false; });
}

let wired = false;
function wire() {
  if (wired) return;
  wired = true;
  window.addEventListener(REFRESH, reload);
  window.addEventListener(PROGRESS_EVENT, reload);
  getSupabase()?.auth.onAuthStateChange((e: AuthChangeEvent) => { if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') reload(); });
}

/** null while loading. */
export function useAccess() {
  const [access, setAccess] = useState<Access | null>(null);
  useEffect(() => {
    wire();
    listeners.add(setAccess);
    if (current) setAccess(current);
    else if (!loading) reload();
    return () => { listeners.delete(setAccess); };
  }, []);
  return access;
}

export const hasPack = (a: Access | null) => a?.plan === 'active' || a?.plan === 'staff';

/** Who is reading: not signed in, free account, or an active pack (staff counts as a pack). */
export type Audience = 'visitor' | 'free' | 'pack';
export const audienceOf = (a: Access | null): Audience | null =>
  a === null ? null : !a.signedIn ? 'visitor' : hasPack(a) ? 'pack' : 'free';

export function useAudience() {
  const access = useAccess();
  return { access, audience: audienceOf(access) };
}
