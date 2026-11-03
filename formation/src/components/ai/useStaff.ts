'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';

/** True when the signed-in account is an admin or a trainer (shows the admin link). */
export function useStaff(signedIn: boolean | null) {
  const [staff, setStaff] = useState(false);
  useEffect(() => {
    const supabase = getSupabase();
    if (!signedIn || !supabase) return setStaff(false);
    let active = true;
    supabase.auth.getUser().then(async ({ data }: { data: { user: { id: string } | null } }) => {
      if (!data.user) return;
      const { data: me } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
      if (active) setStaff(me?.role === 'admin' || me?.role === 'trainer');
    });
    return () => { active = false; };
  }, [signedIn]);
  return staff;
}
