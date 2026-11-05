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
  remaining?: { writing: number; speaking: number; tutor: number };
}

const REFRESH = 'pwt-access-refresh';

/** Ask the access banners and gates to reload (after an AI correction, for example). */
export const refreshAccess = () => window.dispatchEvent(new Event(REFRESH));

/** null while loading. Reloads on sign-in, sign-out and after each AI use. */
export function useAccess() {
  const [access, setAccess] = useState<Access | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () => fetch('/api/access/', { cache: 'no-store' })
      .then((r) => r.json())
      .then((a: Access) => { if (alive) setAccess(a); })
      .catch(() => { if (alive) setAccess({ signedIn: false }); });
    load();
    window.addEventListener(REFRESH, load);
    window.addEventListener(PROGRESS_EVENT, load);
    const supabase = getSupabase();
    const sub = supabase?.auth.onAuthStateChange((e: AuthChangeEvent) => { if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') load(); });
    return () => {
      alive = false;
      window.removeEventListener(REFRESH, load);
      window.removeEventListener(PROGRESS_EVENT, load);
      sub?.data.subscription.unsubscribe();
    };
  }, []);
  return access;
}

export const hasPack = (a: Access | null) => a?.plan === 'active' || a?.plan === 'staff';
