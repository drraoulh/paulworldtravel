import { NextResponse, type NextRequest } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

// Landing point of the links Supabase emails (account confirmation, password reset).
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;
  const wanted = url.searchParams.get('suite') ?? '/espace/';
  const next = wanted.startsWith('/') && !wanted.startsWith('//') ? wanted : '/espace/';

  const supabase = await createClient();
  let ok = false;
  if (code) ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  else if (tokenHash && type) ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error;

  if (ok) return NextResponse.redirect(new URL(type === 'recovery' ? '/auth/nouveau-mot-de-passe/' : next, url.origin));
  // The email is usually confirmed even when the session cannot be opened here
  // (link opened on another device): ask the candidate to sign in.
  return NextResponse.redirect(new URL('/connexion/?confirme=1', url.origin));
}
