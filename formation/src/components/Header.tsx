'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSignedIn } from '@/components/ai/useSignedIn';
import { AcademyNav } from './academy/Sidebar';
import Icon from './academy/Icon';
type SearchItem = { title: string; module: string; href: string };
export default function Header({ lessons = [] }: { lessons?: SearchItem[] }) {
  const signedIn = useSignedIn();
  const search = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const found = lessons.filter((l) => normalize(`${l.title} ${l.module}`).includes(normalize(query))).slice(0, 12);
  return <>
    <a href="#main-content" className="sr-only z-[100] bg-white p-3 focus:not-sr-only focus:fixed">Aller au contenu</a>
    <header className="sticky top-0 z-40 flex h-[73px] items-center gap-4 border-b border-rule bg-white px-4 sm:px-7 print:hidden">
      <button onClick={() => menu.current?.showModal()} aria-label="Ouvrir le menu" className="rounded-lg p-2 text-night lg:hidden"><Icon name="menu" /></button>
      <Link href="/" aria-label="Paul World Travel Formation, accueil" className="flex shrink-0 items-center gap-2 lg:w-[189px]"><Image src="/brand/symbole-nav.png" alt="" width={42} height={35} className="h-9 w-auto" /><span className="text-sm font-extrabold leading-tight text-night">Paul World Travel<span className="block text-[10px] font-semibold uppercase tracking-[.17em] text-ocean">Formation TCF Canada</span></span></Link>
      <button onClick={() => search.current?.showModal()} className="ml-auto flex items-center gap-3 rounded-full border border-rule bg-paper/60 p-2.5 text-sm text-slate sm:ml-4 sm:w-full sm:max-w-md sm:px-4" aria-label="Rechercher un cours"><Icon name="search" /><span className="hidden sm:block">Que voulez-vous apprendre ?</span></button>
      <div className="ml-auto hidden shrink-0 items-center gap-5 md:flex"><Link href="/packs/" className="text-sm font-semibold text-night hover:text-ocean">Voir les packs</Link><Link href={signedIn ? '/espace/' : '/connexion/'} className="rounded-full border border-rule px-4 py-2 text-sm font-bold text-night hover:border-ocean">{signedIn ? 'Mon espace' : 'Connexion'}</Link></div>
    </header>
    <dialog ref={menu} aria-labelledby="menu-title" className="academy-dialog academy-menu inset-y-0 left-0 right-auto m-0 h-dvh max-h-none w-80 max-w-[90vw] border-0 bg-white p-5 shadow-2xl backdrop:bg-night/40" onClick={(e) => { if (e.target === e.currentTarget) menu.current?.close(); }}><div className="mb-6 flex items-center justify-between"><h2 id="menu-title" className="font-bold">Votre formation</h2><button aria-label="Fermer le menu" onClick={() => menu.current?.close()} className="p-2"><Icon name="close" /></button></div><AcademyNav onNavigate={() => menu.current?.close()} /><Link href={signedIn ? '/espace/' : '/connexion/'} onClick={() => menu.current?.close()} className="mt-6 block rounded-lg bg-ocean p-3 text-center font-bold text-white">{signedIn ? 'Mon espace' : 'Connexion'}</Link></dialog>
    <dialog ref={search} aria-labelledby="search-title" className="academy-dialog w-[min(94vw,640px)] rounded-2xl border border-rule bg-white p-0 shadow-2xl backdrop:bg-night/40" onClick={(e) => { if (e.target === e.currentTarget) search.current?.close(); }}><div className="flex items-center justify-between border-b border-rule px-5 py-4"><h2 id="search-title" className="font-bold">Rechercher dans les cours</h2><button aria-label="Fermer la recherche" onClick={() => search.current?.close()} className="p-2"><Icon name="close" /></button></div><div className="p-5"><label htmlFor="course-search" className="sr-only">Titre de leçon ou compétence</label><input id="course-search" autoFocus type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ex. : expression écrite, argumenter…" className="w-full border border-rule px-4 py-3" /><p role="status" className="mt-4 text-xs text-slate">{found.length ? `${found.length} leçons proposées` : 'Aucune leçon trouvée. Essayez une compétence ou un mot plus court.'}</p><ul className="mt-2 max-h-[50dvh] overflow-y-auto">{found.map((l) => <li key={l.href}><Link href={l.href} onClick={() => search.current?.close()} className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 hover:bg-paper"><span><span className="block text-sm font-bold text-night">{l.title}</span><span className="text-xs text-slate">{l.module}</span></span><Icon name="arrow" className="shrink-0 text-ocean" /></Link></li>)}</ul></div></dialog>
  </>;
}
