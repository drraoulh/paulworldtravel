'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon, { type IconName } from './Icon';
const groups: { title: string; links: { href: string; label: string; icon: IconName }[] }[] = [
  { title: 'Mon apprentissage', links: [
    { href: '/', label: 'Découvrir', icon: 'home' },
    { href: '/parcours/', label: 'Mon parcours', icon: 'book' },
    { href: '/espace/', label: 'Mes résultats', icon: 'chart' },
  ] },
  { title: 'Les quatre compétences', links: [
    { href: '/epreuve/comprehension-orale/', label: 'Compréhension orale', icon: 'headphones' },
    { href: '/epreuve/comprehension-ecrite/', label: 'Compréhension écrite', icon: 'book' },
    { href: '/epreuve/expression-ecrite/', label: 'Expression écrite', icon: 'pen' },
    { href: '/epreuve/expression-orale/', label: 'Expression orale', icon: 'mic' },
  ] },
  { title: 'Aller plus loin', links: [
    { href: '/examen-blanc/', label: 'Examens blancs', icon: 'clock' },
    { href: '/entrainement/tuteur/', label: 'Mon tuteur IA', icon: 'sparkles' },
    { href: '/modeles-de-reponses/', label: 'Modèles de réponses', icon: 'pen' },
    { href: '/blog/', label: 'Blog et conseils', icon: 'book' },
    { href: '/packs/', label: 'Les packs', icon: 'award' },
  ] },
];
export function AcademyNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return <nav aria-label="Navigation de formation" className="space-y-7">{groups.map((g) => <div key={g.title}><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.14em] text-slate">{g.title}</p><ul className="space-y-1">{g.links.map((l) => {
    const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
    return <li key={l.href}><Link onClick={onNavigate} href={l.href} aria-current={active ? 'page' : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors ${active ? 'bg-blue-50 text-ocean' : 'text-slate hover:bg-paper hover:text-night'}`}><Icon name={l.icon} className="h-[18px] w-[18px] shrink-0" />{l.label}</Link></li>;
  })}</ul></div>)}</nav>;
}
export default function Sidebar() {
  return <aside aria-label="Menu de formation" className="fixed bottom-0 left-0 top-[73px] z-30 hidden w-60 flex-col overflow-y-auto border-r border-rule bg-white px-4 py-7 lg:flex print:hidden"><AcademyNav /><div className="mt-auto pt-8"><div className="rounded-xl bg-[#edf3ff] p-4"><p className="text-sm font-bold text-night">Votre projet commence ici.</p><p className="mt-2 text-xs leading-relaxed text-slate">Un objectif, quatre compétences. Avancez une séance à la fois.</p><Link href="/test-de-niveau/" className="mt-4 flex items-center gap-2 text-xs font-bold text-ocean">Évaluer mon niveau <Icon name="arrow" className="h-4 w-4" /></Link></div><Link href="/guide/" className="mt-5 block px-3 text-xs text-slate hover:text-ocean">Aide et guide de démarrage</Link></div></aside>;
}
