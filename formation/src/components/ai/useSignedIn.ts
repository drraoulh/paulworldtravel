'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';

/** null while checking, then true/false. */
export function useSignedIn() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return setSignedIn(false);
    supabase.auth.getUser().then((res: { data: { user: unknown } }) => setSignedIn(Boolean(res.data.user)));
  }, []);
  return signedIn;
}
