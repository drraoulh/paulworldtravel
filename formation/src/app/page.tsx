import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import ForAudience from '@/components/access/ForAudience';
import { ButtonLink, Container } from '@/components/ui';
import Icon, { type IconName } from '@/components/academy/Icon';
import PromoBanner from '@/components/packs/PromoBanner';
import { tier } from '@/components/packs/PackGrid';
import { formatFullPrice, formatPrice, packDuration, packs, zoneForCountry } from '@/content/offers';
import { mockNumbers, seriesFor } from '@/content/series/catalog';
import { sessionCombinaisons } from '@/content/combinaisons-sessions';
import { oralMonths } from '@/content/sujets-oraux';
import { EPREUVE_IMAGES } from '@/lib/epreuve-images';
import { NCLC_TABLE } from '@/lib/nclc';

const nf = (n: number) => n.toLocaleString('fr-FR').replace(/ | /g, ' ');

export default async function Home() {
  const zone = zoneForCountry((await headers()).get('x-vercel-ip-country'));
  const ce = seriesFor('ce');
  const co = seriesFor('co');
  const questions = [...ce, ...co].reduce((n, s) => n + s.questions.length, 0);
  const oral = oralMonths.reduce((n, m) => n + m.t2.length + m.t3.length, 0);
  const mocks = mockNumbers().length;
  const stats: [string, string, IconName][] = [
    [String(ce.length + co.length), 'séries complètes de 39 questions', 'headphones'],
    [nf(questions), 'questions corrigées et expliquées', 'check'],
    [String(sessionCombinaisons.length), 'combinaisons d’expression écrite', 'pen'],
    [nf(oral), 'sujets d’expression orale', 'mic'],
  ];
  const epreuves: { id: 'co' | 'ce' | 'ee' | 'eo'; slug: string; name: string; format: string; inside: string; cta: string; href: string }[] = [
    { id: 'co', slug: 'comprehension-orale', name: 'Compréhension orale', format: '39 questions · 35 minutes', inside: `${co.length} séries avec de vrais enregistrements, une seule écoute comme à l’examen, et la transcription après coup.`, cta: 'Voir les séries d’écoute', href: '/epreuve/comprehension-orale/series/' },
    { id: 'ce', slug: 'comprehension-ecrite', name: 'Compréhension écrite', format: '39 questions · 60 minutes', inside: `${ce.length} séries du niveau A1 au C2, chronométrées, avec l’explication de chaque réponse.`, cta: 'Voir les séries de lecture', href: '/epreuve/comprehension-ecrite/series/' },
    { id: 'ee', slug: 'expression-ecrite', name: 'Expression écrite', format: '3 tâches · 60 minutes', inside: `${sessionCombinaisons.length} combinaisons de sessions avec leurs corrigés, et un simulateur qui note vos textes sur 20.`, cta: 'Voir les combinaisons', href: '/epreuve/expression-ecrite/combinaisons/' },
    { id: 'eo', slug: 'expression-orale', name: 'Expression orale', format: '3 tâches · 12 minutes', inside: `${nf(oral)} sujets des tâches 2 et 3 avec des exemples de réponses, et un interlocuteur IA pour vous entraîner à voix haute.`, cta: 'Voir les sujets', href: '/epreuve/expression-orale/combinaisons/' },
  ];
  const nclc = [...NCLC_TABLE].filter((r) => [10, 9, 7, 5].includes(r.nclc));

  return (
    <Container className="space-y-16 py-6 sm:space-y-20 sm:py-10">
      <div className="space-y-5">
        <PromoBanner />
        <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-night-deep via-night to-ocean text-white shadow-[0_24px_60px_rgba(13,23,48,.28)]">
          <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-sky/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-ocean/40 blur-3xl" />
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:p-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.12em]"><span className="h-1.5 w-1.5 rounded-full bg-[#ffd84a]" />Préparation au TCF Canada</p>
              <h1 className="display mt-5 text-[2.5rem] sm:text-6xl">Visez votre NCLC.<br /><span className="text-[#ffd84a]">Entraînez-vous comme le jour J.</span></h1>
              <p className="mt-5 max-w-xl text-lg text-blue-50">{ce.length + co.length} séries chronométrées, {mocks} examens blancs complets et tous les sujets d’expression des sessions récentes, avec corrigés. Votre score sur 699 et votre NCLC à chaque série.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ForAudience
                  visitor={<Link href="/inscription/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffd84a] px-7 py-4 text-lg font-bold text-night shadow-[0_8px_24px_rgba(255,216,74,.35)] transition hover:-translate-y-0.5 hover:bg-white">Commencer gratuitement <Icon name="arrow" className="h-5 w-5" /></Link>}
                  free={<Link href="/packs/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffd84a] px-7 py-4 text-lg font-bold text-night shadow-[0_8px_24px_rgba(255,216,74,.35)] transition hover:-translate-y-0.5 hover:bg-white">Débloquer toutes les séries <Icon name="arrow" className="h-5 w-5" /></Link>}
                  pack={<Link href="/parcours/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffd84a] px-7 py-4 text-lg font-bold text-night shadow-[0_8px_24px_rgba(255,216,74,.35)] transition hover:-translate-y-0.5 hover:bg-white">Reprendre mon parcours <Icon name="arrow" className="h-5 w-5" /></Link>}
                />
                <ButtonLink href="/test-de-niveau/" variant="outline" className="rounded-xl py-4 text-lg">Tester mon niveau</ButtonLink>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-blue-100">
                <li>✓ Série 1 gratuite dans chaque compréhension</li><li>✓ Sans carte bancaire</li><li>✓ Sur mobile et ordinateur</li>
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-white/20">
                <Image src="/images/arrivee.jpg" alt="Un jeune homme souriant traverse un aéroport avec sa valise et son passeport à la main" fill priority sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover object-[55%_center]" />
              </div>
              <div className="absolute -bottom-5 -left-3 w-56 rounded-2xl bg-white p-4 text-night shadow-[0_16px_40px_rgba(13,23,48,.30)] sm:-left-8">
                <p className="text-xs font-bold uppercase tracking-wide text-slate">Exemple de résultat</p>
                <p className="display mt-1 text-4xl text-ocean">512<span className="text-base font-semibold text-slate"> / 699</span></p>
                <p className="mt-1 flex gap-2"><span className="rounded-full bg-ocean px-2.5 py-0.5 text-xs font-bold text-white">NCLC 8</span><span className="rounded-full bg-container px-2.5 py-0.5 text-xs font-bold text-night">Niveau C1</span></p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-rule"><div className="h-full w-[69%] rounded-full bg-ocean" /></div>
              </div>
            </div>
          </div>
        </section>
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(([n, label, icon]) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_6px_20px_rgba(20,33,61,.06)]">
              <span className="hidden rounded-xl bg-blue-50 p-3 text-ocean sm:block"><Icon name={icon} /></span>
              <div><dd className="display text-3xl text-night">{n}</dd><dt className="text-sm text-slate">{label}</dt></div>
            </div>
          ))}
        </dl>
      </div>

      <section id="epreuves" className="scroll-mt-24">
        <p className="text-xs font-bold uppercase tracking-[.15em] text-ocean">Les quatre épreuves</p>
        <h2 className="display mt-2 text-3xl text-night sm:text-4xl">Tout l’examen, épreuve par épreuve.</h2>
        <p className="mt-3 max-w-2xl text-lg text-slate">Chaque épreuve a sa méthode, ses séries ou ses sujets, et son tableau de bord.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {epreuves.map((e) => (
            <article key={e.id} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(20,33,61,.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(20,33,61,.14)] sm:flex-row">
              <div className="relative aspect-[16/9] sm:aspect-auto sm:w-2/5">
                <Image src={EPREUVE_IMAGES[e.id].src} alt={EPREUVE_IMAGES[e.id].alt} fill sizes="(min-width: 768px) 20vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-ocean">{e.format}</p>
                <h3 className="heading mt-1 text-xl text-night"><Link href={`/epreuve/${e.slug}/`} className="hover:text-ocean">{e.name}</Link></h3>
                <p className="mt-2 flex-1 text-slate">{e.inside}</p>
                <Link href={e.href} className="mt-4 inline-flex items-center gap-2 font-bold text-ocean">{e.cta} <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid items-center gap-10 rounded-[1.75rem] bg-white p-6 shadow-[0_8px_30px_rgba(20,33,61,.08)] sm:p-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-ocean">Des résultats que vous comprenez</p>
          <h2 className="display mt-2 text-3xl text-night sm:text-4xl">Votre score, comme sur l’attestation.</h2>
          <p className="mt-4 text-lg text-slate">À la fin de chaque série, vous voyez votre score estimé sur 699, votre niveau du A1 au C2, le NCLC correspondant et les points qu’il vous manque pour le niveau suivant.</p>
          <ul className="mt-5 space-y-3 text-ink">
            {['Les points gagnés et perdus, niveau par niveau.', 'La correction de chaque question, avec l’explication.', 'Le barème NCLC d’Immigration Canada, épreuve par épreuve.'].map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-ocean"><Icon name="check" className="h-4 w-4" /></span>{t}</li>
            ))}
          </ul>
          <Link href="/calculateur-nclc/" className="mt-6 inline-flex items-center gap-2 font-bold text-ocean">Calculer mon NCLC <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <div className="rounded-3xl bg-paper p-5 sm:p-7">
          <p className="text-sm font-bold text-night">Score de compréhension et NCLC</p>
          <table className="mt-3 w-full text-left">
            <thead className="text-xs uppercase tracking-wide text-slate"><tr><th className="py-2 font-semibold">NCLC</th><th className="py-2 font-semibold">Écoute</th><th className="py-2 font-semibold">Lecture</th><th className="py-2 font-semibold">Écrit et oral</th></tr></thead>
            <tbody className="divide-y divide-rule">
              {nclc.map((r) => (
                <tr key={r.nclc}>
                  <th scope="row" className="py-3"><span className="rounded-lg bg-ocean px-2.5 py-1 text-sm font-bold text-white">{r.nclc}{r.nclc === 10 ? '+' : ''}</span></th>
                  <td className="py-3 font-semibold text-night">{r.co[0]} à {r.co[1]}</td>
                  <td className="py-3 font-semibold text-night">{r.ce[0]} à {r.ce[1]}</td>
                  <td className="py-3 text-slate">{r.ee[0] === r.ee[1] ? r.ee[0] : `${r.ee[0]} à ${r.ee[1]}`} / 20</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-slate">Barème d’Immigration Canada (IRCC). <Link href="/niveaux-nclc/" className="font-semibold text-ocean underline">Voir tous les niveaux</Link></p>
        </div>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-[.15em] text-ocean">Comment ça marche</p>
        <h2 className="display mt-2 text-3xl text-night sm:text-4xl">Trois étapes jusqu’à l’examen.</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {([
            ['1', 'Mesurez votre niveau', 'Le test de niveau gratuit et la série 1 de chaque compréhension vous donnent un premier score.', '/test-de-niveau/', 'Faire le test'],
            ['2', 'Entraînez-vous par épreuve', 'Séries chronométrées, sujets des sessions avec corrigés, leçons de méthode et simulateur IA.', '/parcours/', 'Voir le parcours'],
            ['3', 'Passez un examen blanc', 'Les quatre épreuves enchaînées avec les durées officielles, puis un bilan complet avec votre NCLC.', '/examen-blanc/', 'Voir les examens blancs'],
          ] as const).map(([n, title, text, href, cta]) => (
            <li key={n} className="relative rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(20,33,61,.08)]">
              <span className="display flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean to-night text-2xl text-white">{n}</span>
              <h3 className="heading mt-4 text-xl text-night">{title}</h3>
              <p className="mt-2 text-slate">{text}</p>
              <Link href={href} className="mt-4 inline-flex items-center gap-2 font-bold text-ocean">{cta} <Icon name="arrow" className="h-4 w-4" /></Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-night text-white">
        <Image src="/images/salle-examen.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-night-deep via-night/90 to-night/40" />
        <div className="max-w-2xl p-6 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#ffd84a]">{mocks} examens blancs</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl">Les quatre épreuves, dans les conditions réelles.</h2>
          <p className="mt-4 text-lg text-blue-50">Environ 2 h 50 : écoute, lecture, trois textes et trois tâches orales. Vos productions sont corrigées par l’IA et vous recevez un bilan avec votre NCLC par épreuve.</p>
          <ButtonLink href="/examen-blanc/" className="mt-7 rounded-xl">Découvrir les examens blancs</ButtonLink>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.15em] text-ocean">Les packs</p>
            <h2 className="display mt-2 text-3xl text-night sm:text-4xl">Choisissez votre rythme.</h2>
            <p className="mt-3 max-w-2xl text-lg text-slate">Tous les packs ouvrent toutes les séries, tous les sujets et les examens blancs. Les packs supérieurs ajoutent du temps, des corrections et un formateur.</p>
          </div>
          <Link href="/packs/" className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Comparer les packs</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {packs.map((p) => (
            <Link key={p.id} href="/packs/" className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(20,33,61,.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(20,33,61,.14)] ${p.featured ? 'ring-2 ring-[#c9971f]' : 'ring-1 ring-rule'}`}>
              <p className={`flex items-center justify-between px-5 py-3 font-bold ${tier[p.id].band} ${tier[p.id].text}`}>{p.name}{p.featured && <span className="rounded-full bg-night px-2 py-0.5 text-[10px] font-bold text-[#ffd84a]">Recommandé</span>}</p>
              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <p className="flex-1 text-sm text-slate">{p.tagline}</p>
                {formatFullPrice(p, zone) && <p className="mt-3 text-sm text-slate"><s>{formatFullPrice(p, zone)}</s></p>}
                <p className={`display text-2xl text-night ${formatFullPrice(p, zone) ? '' : 'mt-4'}`}>{formatPrice(p, zone)}</p>
                <p className="mt-1 text-sm text-slate">{packDuration(p)} d’accès</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-ocean">Voir le pack <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <p className="pb-4 text-center text-sm text-slate">Plateforme d’entraînement indépendante : les scores affichés sont des estimations, pas des résultats officiels de France Éducation international.</p>
    </Container>
  );
}
