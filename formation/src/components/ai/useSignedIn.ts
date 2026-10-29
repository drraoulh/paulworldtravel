'use client';

import { useEffect, useState } from 'react';
import type { AuthChangeEvent } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase/client';

/** null while checking, then true/false. Follows sign-in and sign-out. */
export function useSignedIn() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return setSignedIn(false);
    let active = true;
    supabase.auth.getUser().then((res: { data: { user: unknown } }) => { if (active) setSignedIn(Boolean(res.data.user)); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === 'SIGNED_IN') setSignedIn(true);
      if (event === 'SIGNED_OUT') setSignedIn(false);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  return signedIn;
}
