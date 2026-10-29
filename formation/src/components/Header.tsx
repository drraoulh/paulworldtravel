'use client';

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { epreuves } from '@/content/tcf';
import { epreuveById } from '@/lib/epreuves';
import { getSupabase } from '@/lib/supabase/client';
import { Container } from './ui';

/** One line per épreuve for the menu, in the order of the exam day. */
const TAGLINES: Record<string, string> = {
  co: 'Conversations, annonces et interviews, une seule écoute.',
  ce: 'Documents du quotidien, articles et textes argumentés.',
  ee: 'Un message, un récit, puis un texte argumenté.',
  eo: 'Se présenter, s’informer, défendre un point de vue.',
};

const menuEpreuves = epreuves.map((e) => ({
  id: e.id,
  name: e.name,
  href: `/epreuve/${epreuveById(e.id).slug}/`,
  tagline: TAGLINES[e.id],
  facts: `${e.minutes} minutes, ${e.format.charAt(0).toLowerCase()}${e.format.slice(1)}`,
}));

const asides = [
  { href: '/tcf-canada/', label: 'Le TCF Canada en bref', text: 'Format, scores et équivalences NCLC' },
  { href: '/test-de-niveau/', label: 'Test de niveau gratuit', text: 'Quinze questions, une dizaine de minutes' },
];

/** Signed-in state, read from the Supabase session in the browser. null while checking. */
function useSession(pathname: string) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return setSignedIn(false);
    // Checked again on each navigation: signing out happens on the server.
    supabase.auth.getSession().then((res: { data: { session: unknown } }) => setSignedIn(Boolean(res.data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event: string, session: unknown) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, [pathname]);
  return signedIn;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}>
      <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true" className="h-[1.15rem] w-[1.15rem]">
      <circle cx="12" cy="8" r="3.6" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname() ?? '/';
  const signedIn = useSession(pathname);
  const [menu, setMenu] = useState(false);     // Épreuves panel, large screens
  const [drawer, setDrawer] = useState(false); // Menu drawer, small screens
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawerButton = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const drawerId = useId();

  const isActive = (href: string) => pathname.startsWith(href);
  const epreuvesActive = pathname.startsWith('/epreuve/');

  // Close everything on navigation.
  useEffect(() => { setMenu(false); setDrawer(false); }, [pathname]);

  // Épreuves panel: close on Escape (focus back on its button) or on a click outside the header.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } };
    const onPointer = (e: PointerEvent) => { if (!headerRef.current?.contains(e.target as Node)) setMenu(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, [menu]);

  const closeDrawer = useCallback(() => { setDrawer(false); drawerButton.current?.focus(); }, []);

  // Drawer: lock the page behind it, move focus inside, Escape closes.
  useEffect(() => {
    if (!drawer) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', onKey);
    return () => { root.style.overflow = previous; document.removeEventListener('keydown', onKey); };
  }, [drawer, closeDrawer]);

  // Keep Tab inside the open drawer.
  const trapFocus = (e: ReactKeyboardEvent) => {
    if (e.key !== 'Tab' || !drawerRef.current) return;
    const items = drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const navLink = (active: boolean) =>
    `relative inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.95rem] font-semibold transition-colors ${active ? 'text-night' : 'text-slate hover:bg-paper hover:text-night'}`;
  const label = (text: string, active: boolean) => <span className={active ? 'marked' : ''}>{text}</span>;

  return (
    <>
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-rule bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 print:hidden">
      <Container className="flex h-16 items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3 rounded-lg" aria-label="Paul World Travel Formation, accueil">
          <Image src="/brand/symbole-nav.png" alt="" width={160} height={131} priority className="h-9 w-auto" />
          <span className="leading-tight">
            <span className="heading block whitespace-nowrap text-[1.05rem] text-night">Paul World Travel</span>
            <span className="block whitespace-nowrap text-[0.8rem] text-slate">Formation TCF Canada</span>
          </span>
        </Link>

        {/* Main sections, large screens */}
        <nav aria-label="Navigation principale" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link href="/parcours/" aria-current={isActive('/parcours/') ? 'page' : undefined} className={navLink(isActive('/parcours/'))}>
                {label('Parcours', isActive('/parcours/'))}
              </Link>
            </li>
            <li>
              <button
                ref={menuButton}
                type="button"
                aria-expanded={menu}
                aria-controls={panelId}
                onClick={() => setMenu(!menu)}
                className={`${navLink(epreuvesActive)} ${menu ? 'bg-paper text-night' : ''}`}
              >
                {label('Épreuves', epreuvesActive)}
                <Chevron open={menu} />
              </button>
            </li>
            <li>
              <Link href="/examen-blanc/" aria-current={isActive('/examen-blanc/') ? 'page' : undefined} className={navLink(isActive('/examen-blanc/'))}>
                {label('Examen blanc', isActive('/examen-blanc/'))}
              </Link>
            </li>
            <li>
              <Link href="/formules/" aria-current={isActive('/formules/') ? 'page' : undefined} className={navLink(isActive('/formules/'))}>
                {label('Formules', isActive('/formules/'))}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Account, large screens */}
        <div className={`ml-auto hidden items-center gap-2 transition-opacity lg:flex ${signedIn === null ? 'opacity-0' : 'opacity-100'}`}>
          {signedIn ? (
            <Link href="/espace/" aria-current={isActive('/espace/') ? 'page' : undefined}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-night pl-3.5 pr-5 text-sm font-bold text-white transition-colors hover:bg-ocean">
              <PersonIcon />Mon espace
            </Link>
          ) : (
            <>
              <Link href="/connexion/" aria-current={isActive('/connexion/') ? 'page' : undefined} className={navLink(isActive('/connexion/'))}>
                <PersonIcon />{label('Connexion', isActive('/connexion/'))}
              </Link>
              <Link href="/inscription/" className="inline-flex h-10 items-center rounded-full bg-night px-5 text-sm font-bold text-white transition-colors hover:bg-ocean">
                S’inscrire
              </Link>
            </>
          )}
        </div>

        <button
          ref={drawerButton}
          type="button"
          onClick={() => setDrawer(true)}
          aria-expanded={drawer}
          aria-controls={drawerId}
          className="-mr-2 ml-auto inline-flex h-11 items-center gap-2 rounded-full px-3 font-semibold text-night hover:bg-paper lg:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
          Menu
        </button>
      </Container>

      {/* Épreuves panel */}
      {menu && (
      <div id={panelId} className="absolute inset-x-0 top-full hidden border-b border-rule bg-white shadow-[0_24px_48px_-24px_rgba(20,33,61,0.35)] lg:block">
        <Container className="grid grid-cols-[1fr_18rem] gap-8 py-7">
          <ol className="grid grid-cols-2 gap-2">
            {menuEpreuves.map((e, i) => {
              const active = pathname.startsWith(e.href);
              return (
                <li key={e.id}>
                  <Link href={e.href} aria-current={active ? 'page' : undefined}
                    className={`group flex h-full gap-4 rounded-2xl p-4 transition-colors ${active ? 'bg-paper' : 'hover:bg-paper'}`}>
                    <span aria-hidden="true" className="display flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule bg-white text-xl text-night transition-colors group-hover:border-container group-hover:bg-container">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="heading block text-lg text-night group-hover:text-ocean">{e.name}</span>
                      <span className="mt-0.5 block text-[0.95rem] text-ink">{e.tagline}</span>
                      <span className="mt-1 block text-sm text-slate">{e.facts}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="flex flex-col gap-1 rounded-2xl bg-paper p-3">
            <p className="px-3 pb-1 pt-2 text-sm text-slate">Avant de commencer</p>
            {asides.map((a) => (
              <Link key={a.href} href={a.href} className="rounded-xl px-3 py-3 transition-colors hover:bg-white">
                <span className="block font-bold text-night">{a.label}</span>
                <span className="block text-sm text-slate">{a.text}</span>
              </Link>
            ))}
          </div>
        </Container>
      </div>
      )}
    </header>

      {/* Menu drawer, small screens. Outside the header: its backdrop blur would trap a fixed child. */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="drawer-fade absolute inset-0 bg-night/50" onClick={closeDrawer} aria-hidden="true" />
          <div
            id={drawerId}
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onKeyDown={trapFocus}
            className="drawer-in absolute inset-y-0 right-0 flex w-full max-w-[24rem] flex-col bg-white shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-rule px-4">
              <p className="heading text-lg text-night">Menu</p>
              <button type="button" onClick={closeDrawer} data-autofocus className="-mr-1 inline-flex h-11 items-center gap-1.5 rounded-full px-3 font-semibold text-night hover:bg-paper">
                Fermer
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <nav aria-label="Navigation principale" className="flex-1 overflow-y-auto px-4 py-4">
              <Link href="/parcours/" aria-current={isActive('/parcours/') ? 'page' : undefined} className="heading block rounded-xl px-3 py-3 text-xl text-night hover:bg-paper">
                {label('Parcours', isActive('/parcours/'))}
              </Link>

              <p className="mt-3 px-3 text-sm text-slate">Les épreuves, dans l’ordre de l’examen</p>
              <ol className="mt-1">
                {menuEpreuves.map((e, i) => {
                  const active = pathname.startsWith(e.href);
                  return (
                    <li key={e.id}>
                      <Link href={e.href} aria-current={active ? 'page' : undefined} className={`flex gap-3 rounded-xl px-3 py-2.5 ${active ? 'bg-paper' : 'hover:bg-paper'}`}>
                        <span aria-hidden="true" className="display mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule text-base text-night">{i + 1}</span>
                        <span className="min-w-0">
                          <span className="block font-bold text-night">{label(e.name, active)}</span>
                          <span className="block text-sm text-slate">{e.tagline}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-3 border-t border-rule pt-3">
                {[{ href: '/examen-blanc/', text: 'Examen blanc' }, { href: '/formules/', text: 'Formules' }].map((l) => (
                  <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined} className="heading block rounded-xl px-3 py-3 text-xl text-night hover:bg-paper">
                    {label(l.text, isActive(l.href))}
                  </Link>
                ))}
              </div>

              <div className="mt-3 border-t border-rule pt-3">
                {asides.map((a) => (
                  <Link key={a.href} href={a.href} className="block rounded-xl px-3 py-2.5 hover:bg-paper">
                    <span className="block font-semibold text-night">{a.label}</span>
                    <span className="block text-sm text-slate">{a.text}</span>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="shrink-0 border-t border-rule p-4">
              {signedIn ? (
                <Link href="/espace/" className="flex h-12 items-center justify-center gap-2 rounded-full bg-night font-bold text-white hover:bg-ocean"><PersonIcon />Mon espace</Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/connexion/" className="flex h-12 items-center justify-center rounded-full border border-night font-bold text-night hover:bg-paper">Connexion</Link>
                  <Link href="/inscription/" className="flex h-12 items-center justify-center rounded-full bg-night font-bold text-white hover:bg-ocean">S’inscrire</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
