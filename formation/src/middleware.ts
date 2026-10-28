import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured } from '@/lib/supabase/config';

// Keeps the Supabase session fresh and sends signed-out visitors to the login page.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!supabaseConfigured) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;
  if (!user && (path.startsWith('/espace') || path.startsWith('/admin'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/connexion/';
    url.searchParams.set('suite', path);
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ['/espace/:path*', '/admin/:path*', '/connexion/:path*', '/auth/:path*'],
};
