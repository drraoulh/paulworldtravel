'use client';
import { useRef, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Icon, { type IconName } from '@/components/academy/Icon';
import { signOut } from '@/app/espace/actions';
const links: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin/', label: 'Vue d’ensemble', icon: 'home' },
  { href: '/admin/apprenants/', label: 'Apprenants', icon: 'users' },
  { href: '/admin/progressions/', label: 'Progressions', icon: 'chart' },
  { href: '/admin/lecons/', label: 'Leçons et quiz', icon: 'pen' },
  { href: '/admin/inscriptions/', label: 'Inscriptions et accès', icon: 'award' },
  { href: '/admin/paiements/', label: 'Paiements', icon: 'wallet' },
  { href: '/admin/corrections/', label: 'Corrections', icon: 'check' },
  { href: '/admin/generer/', label: 'Banque d’exercices', icon: 'sparkles' },
  { href: '/admin/combinaisons/', label: 'Sujets des candidats', icon: 'mic' },
  { href: '/admin/equipe/', label: 'Équipe', icon: 'shield' },
];
export default function AdminShell({ children, isAdmin, email }: { children: ReactNode; isAdmin: boolean; email: string }) {
  const path = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  const nav = <nav aria-label="Navigation administration" className="space-y-1">{links.map((l) => { const active = l.href === '/admin/' ? path === l.href : path.startsWith(l.href); return <Link key={l.href} href={l.href} onClick={() => menu.current?.close()} aria-current={active ? 'page' : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold ${active ? 'bg-white/10 text-white ring-1 ring-white/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><Icon name={l.icon} className={`h-[18px] w-[18px] ${active ? 'text-emerald-300' : ''}`} />{l.label}</Link>; })}</nav>;
  return <div className="admin-workspace min-h-screen bg-[#f4f6fa] text-night"><a href="#admin-content" className="sr-only fixed z-[100] bg-white p-3 focus:not-sr-only">Aller au contenu</a><aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#101b30] px-5 py-6 lg:flex"><Link href="/admin/" className="mb-9 flex items-center gap-3 px-2"><Image src="/brand/symbole-nav.png" alt="" width={40} height={34} /><span className="text-sm font-extrabold text-white">Paul World Travel<span className="mt-1 block text-[10px] font-semibold uppercase tracking-[.18em] text-emerald-300">Administration</span></span></Link><p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Pilotage de la formation</p>{nav}<div className="mt-auto border-t border-white/10 pt-5"><p className="px-3 text-xs font-semibold text-white">{isAdmin ? 'Administrateur' : 'Formateur'}</p><p className="mt-1 truncate px-3 text-xs text-slate-400">{email}</p><Link href="/parcours/" className="mt-5 flex items-center gap-2 px-3 text-xs font-bold text-emerald-300">Voir l’espace apprenant <Icon name="arrow" className="h-4 w-4" /></Link></div></aside><div className="min-w-0 lg:pl-64"><header className="sticky top-0 z-30 flex h-[73px] items-center justify-between gap-3 border-b border-rule bg-white px-4 sm:px-8"><div className="flex items-center gap-3"><button onClick={() => menu.current?.showModal()} aria-label="Ouvrir le menu administrateur" className="rounded-lg border border-rule p-2 lg:hidden"><Icon name="menu" /></button><div><p className="text-sm font-bold text-night">Console de formation</p><p className="text-[11px] text-slate">{isAdmin ? 'Gestion et suivi pédagogique' : 'Suivi et corrections · accès formateur'}</p></div></div><div className="flex items-center gap-3"><Link href="/parcours/" className="hidden text-xs font-semibold text-slate hover:text-ocean sm:block">Espace apprenant</Link><form action={signOut}><button className="rounded-lg border border-rule px-3 py-2 text-xs font-semibold text-night hover:bg-paper">Déconnexion</button></form></div></header><main id="admin-content" className="min-w-0 pb-10">{children}</main></div><dialog ref={menu} aria-labelledby="admin-menu-title" className="academy-menu inset-y-0 left-0 right-auto h-dvh max-h-none w-72 max-w-[90vw] bg-[#101b30] p-5 text-white backdrop:bg-night/50"><div className="mb-6 flex items-center justify-between"><h2 id="admin-menu-title" className="font-bold">Administration</h2><button onClick={() => menu.current?.close()} aria-label="Fermer le menu administrateur" className="p-2"><Icon name="close" /></button></div>{nav}</dialog></div>;
}
