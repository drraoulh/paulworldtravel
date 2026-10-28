import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured } from '@/lib/supabase/config';

// Keeps the Supabase session fresh and sends signed-out visitors to the login page.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const path = request.nextUrl.pathname;
  const protectedRoute = /^\/(espace|admin)(\/|$)/.test(path) || path === '/auth/nouveau-mot-de-passe' || path === '/auth/nouveau-mot-de-passe/';
  const redirectToLogin = () => {
    const url = request.nextUrl.clone();
    url.pathname = '/connexion/';
    url.search = '';
    url.searchParams.set('suite', path + request.nextUrl.search);
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    redirect.headers.set('Cache-Control', 'private, no-store');
    return redirect;
  };
  if (!supabaseConfigured) return protectedRoute ? redirectToLogin() : response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list, headers) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value));
      },
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser();
  if (protectedRoute && (error || !user)) return redirectToLogin();
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp3|wav|ogg|webm|mp4|woff|woff2|ttf)$).*)'],
};
