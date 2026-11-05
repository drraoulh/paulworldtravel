'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { useCourse } from '@/components/parcours/useCourse';
import { audienceOf, useAccess } from '@/components/access/useAccess';
type Course = { id: string; title: string; intro: string; image: { src: string; alt: string }; href: string; lessons: string[]; minutes: number };
const tabs = [{ id: 'all', label: 'Toutes les compétences' }, { id: 'comprehension', label: 'Comprendre' }, { id: 'expression', label: 'S’exprimer' }];
export default function CourseCatalog({ courses }: { courses: Course[] }) {
  const [filter, setFilter] = useState('all');
  const { isDone, ready } = useCourse();
  const withPack = audienceOf(useAccess()) === 'pack';
  const shown = courses.filter((c) => filter === 'all' || (filter === 'comprehension' ? c.id.startsWith('c') : c.id.startsWith('e')));
  return <div><div role="group" aria-label="Filtrer les cours par compétence" className="mb-6 flex flex-wrap gap-2">{tabs.map((t) => <button key={t.id} onClick={() => setFilter(t.id)} aria-pressed={filter === t.id} className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${filter === t.id ? 'border-night bg-night text-white' : 'border-rule bg-white text-night hover:border-ocean hover:text-ocean'}`}>{t.label}</button>)}</div><div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">{shown.map((c) => {
    const done = ready ? c.lessons.filter(isDone).length : 0;
    return <article key={c.id} className="group overflow-hidden rounded-xl border-2 border-rule bg-white shadow-[0_6px_20px_rgba(20,33,61,.07)] transition hover:-translate-y-1 hover:border-ocean hover:shadow-lg"><Link href={c.href} className="relative block aspect-[2/1] overflow-hidden"><Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1536px) 22vw, (min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-night">Méthode TCF Canada</span></Link><div className="p-5"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.12em] text-ocean">Paul World Travel · {withPack ? 'Inclus dans votre pack' : 'Cours gratuit'}</p><h3 className="heading text-xl text-night"><Link href={c.href} className="hover:text-ocean">{c.title}</Link></h3><p className="mt-2 line-clamp-2 min-h-12 text-sm text-slate">{c.intro}</p><div className="mt-5 flex flex-wrap items-center gap-4 border-t border-rule pt-4 text-xs text-slate"><span className="flex items-center gap-1.5"><Icon name="book" className="h-4 w-4" />{c.lessons.length} leçons</span><span className="flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4" />{c.minutes} min de lecture</span></div>{done > 0 && <p className="mt-3 text-xs font-bold text-green-700">{done} / {c.lessons.length} quiz réussis</p>}<Link href={c.href} className="mt-5 flex items-center justify-between rounded-lg bg-ocean px-4 py-2.5 text-sm font-bold text-white transition hover:bg-night">{done ? 'Continuer à apprendre' : 'Découvrir le cours'}<Icon name="arrow" className="h-4 w-4" /></Link></div></article>;
  })}</div></div>;
}
