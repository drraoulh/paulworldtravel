import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import { combiTaskId, MONTHS, TASK_LIMITS } from '@/lib/combinaisons';
import { publishedCombinaisons } from '@/lib/combinaisons-server';
import { getEpreuve } from '@/lib/epreuves';
import { getOralMonth } from '@/content/sujets-oraux';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string; annee: string; mois: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { annee, mois } = await params;
  return { title: `Combinaisons ${MONTHS[Number(mois) - 1] ?? ''} ${annee} : expression écrite` };
}

export default async function MoisPage({ params }: Props) {
  const { slug, annee, mois } = await params;
  const e = getEpreuve(slug);
  const year = Number(annee);
  const month = Number(mois);
  if (!e || (e.module.id !== 'ee' && e.module.id !== 'eo') || !Number.isInteger(year) || month < 1 || month > 12) notFound();
  if (e.module.id === 'eo') {
    const oral = getOralMonth(year, month);
    if (!oral) notFound();
    const groups = [
      { id: 'tache-2', title: 'Tâche 2 : exercice en interaction', meta: '2 min de préparation, 3 min 30 d’échange', list: oral.t2, answers: oral.c2, answerLabel: 'Voir des exemples de questions' },
      { id: 'tache-3', title: 'Tâche 3 : expression d’un point de vue', meta: 'Sans préparation, 4 min 30', list: oral.t3, answers: oral.c3, answerLabel: 'Voir un exemple de réponse' },
    ];
    return (
      <EpreuveShell epreuve={e} active="combinaisons" title={`${MONTHS[month - 1]} ${year}`} intro={`${oral.t2.length + oral.t3.length} sujets de ce mois-ci. Préparez-vous à voix haute, chronomètre en main.`}>
        <Container className="space-y-6">
          <Link href={`/epreuve/${e.slug}/combinaisons/`} className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Tous les mois</Link>
          <nav aria-label="Tâches" className="flex flex-wrap gap-3">
            {groups.map((g) => <a key={g.id} href={`#${g.id}`} className="rounded-2xl border border-rule bg-white px-5 py-3 text-center hover:border-ocean"><span className="block font-bold text-ocean">{g.title.split(' : ')[0]}</span><span className="block text-sm text-slate">{g.list.length} sujets</span></a>)}
          </nav>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { href: `/epreuve/${e.slug}/methodologie/`, label: 'Méthodologie', cls: 'bg-container text-night hover:bg-container-hover' },
              { href: '/parcours/', label: 'Formation', cls: 'bg-ocean text-white hover:bg-night' },
              { href: `/epreuve/${e.slug}/simulateur/`, label: 'Simulateur', cls: 'bg-emerald-700 text-white hover:bg-emerald-800' },
              { href: `/epreuve/${e.slug}/sujets/`, label: 'Modèles de réponses', cls: 'bg-maple text-white hover:bg-red-800' },
            ].map((b) => <Link key={b.label} href={b.href} className={`flex min-h-14 items-center justify-center rounded-2xl px-4 py-3 text-center font-bold ${b.cls}`}>{b.label}</Link>)}
          </div>
          {groups.map((g, gi) => (
            <details key={g.id} id={g.id} open={gi === 0} className="group scroll-mt-28 overflow-hidden rounded-2xl bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-gradient-to-r from-night to-ocean px-6 py-5 text-white [&::-webkit-details-marker]:hidden">
                <span><span className="heading block text-xl">{g.title}</span><span className="block text-sm text-blue-50">{g.meta} · {g.list.length} sujets</span></span>
                <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <ol className="divide-y divide-rule px-6 sm:px-8">
                {g.list.map((t, i) => (
                  <li key={i} className="flex gap-4 py-4">
                    <span className="font-bold text-ocean">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-ink">{t}</p>
                      {g.answers?.[i] && (
                        <details className="mt-3 rounded-xl bg-paper p-4">
                          <summary className="cursor-pointer font-semibold text-night">{g.answerLabel}</summary>
                          <p className="reading mt-3 whitespace-pre-line text-ink">{g.answers[i]}</p>
                        </details>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </details>
          ))}
          <p className="text-sm text-slate">Pour vous entraîner avec un interlocuteur et recevoir une note, utilisez le simulateur IA.</p>
        </Container>
      </EpreuveShell>
    );
  }
  const list = (await publishedCombinaisons()).filter((c) => c.content.year === year && c.content.month === month).reverse();

  return (
    <EpreuveShell
      epreuve={e}
      active="combinaisons"
      title={`${MONTHS[month - 1]} ${year}`}
      intro={`${list.length} combinaison${list.length > 1 ? 's' : ''} de cette session. Faites les trois tâches dans l’ordre : 10, 20 puis 30 minutes.`}
    >
      <Container className="space-y-6">
        <Link href={`/epreuve/${e.slug}/combinaisons/?annee=${year}`} className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Tous les mois de {year}</Link>
        {list.length === 0 && <p className="rounded-2xl bg-white p-6 text-slate">Aucune combinaison publiée pour ce mois.</p>}

        {list.length > 0 && (
          <nav aria-label="Combinaisons du mois" className="-mx-4 overflow-x-auto px-4 pb-2">
            <ul className="flex gap-3">
              {list.map((c, i) => (
                <li key={c.id} className="shrink-0">
                  <a href={`#combinaison-${i + 1}`} className="block rounded-2xl border border-rule bg-white px-5 py-3 text-center hover:border-ocean">
                    <span className="block font-bold text-ocean">Combinaison {i + 1}</span>
                    <span className="block text-sm text-slate">3 tâches</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { href: `/epreuve/${e.slug}/methodologie/`, label: 'Méthodologie', cls: 'bg-container text-night hover:bg-container-hover' },
            { href: '/parcours/', label: 'Formation', cls: 'bg-ocean text-white hover:bg-night' },
            { href: `/epreuve/${e.slug}/simulateur/`, label: 'Simulateur', cls: 'bg-emerald-700 text-white hover:bg-emerald-800' },
            { href: '/modeles-de-reponses/', label: 'Modèles de réponses', cls: 'bg-maple text-white hover:bg-red-800' },
          ].map((b) => (
            <Link key={b.label} href={b.href} className={`flex min-h-14 items-center justify-center rounded-2xl px-4 py-3 text-center font-bold ${b.cls}`}>{b.label}</Link>
          ))}
        </div>

        <div className="space-y-4">
          {list.map((c, i) => (
            <details key={c.id} id={`combinaison-${i + 1}`} open={i === 0} className="group scroll-mt-28 overflow-hidden rounded-2xl bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-gradient-to-r from-night to-ocean px-6 py-5 text-white [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="heading block text-xl">Combinaison {i + 1}</span>
                  {c.theme && <span className="block text-sm text-blue-50">Tâche 3 : {c.theme}</span>}
                </span>
                <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-slate">{c.content.source === 'licence' ? 'Sujets de session, avec corrigés' : c.content.source === 'candidats' ? 'Rapportée par des candidats, reformulée par l’équipe' : 'Tâche 1 rapportée par des candidats, tâches 2 et 3 proposées par l’équipe'}</span>
                  <Link href={`/epreuve/${e.slug}/simulateur/?sujet=${encodeURIComponent(combiTaskId(c.id, 1))}`} className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">Commencer au simulateur</Link>
                </div>
                <ol className="mt-5 space-y-6">
                  {c.content.tasks.map((t, k) => {
                    const n = (k + 1) as 1 | 2 | 3;
                    return (
                      <li key={k} className="border-t border-rule pt-5">
                        <p className="text-sm font-bold text-night">Tâche {n} : {TASK_LIMITS[n].minWords} à {TASK_LIMITS[n].maxWords} mots, {TASK_LIMITS[n].minutes} min</p>
                        <p className="mt-2 text-ink">{t.prompt}</p>
                        {t.documents?.map((d) => <blockquote key={d} className="mt-2 border-l-4 border-sky bg-paper p-3 text-sm">{d}</blockquote>)}
                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <Link href={`/epreuve/${e.slug}/simulateur/?sujet=${encodeURIComponent(combiTaskId(c.id, n))}`} className="rounded-full bg-night px-5 py-2.5 text-sm font-bold text-white hover:bg-ocean">Rédiger et faire corriger</Link>
                        </div>
                        {t.corrige && (
                          <details className="mt-3 rounded-xl bg-paper p-4">
                            <summary className="cursor-pointer font-semibold text-night">Voir le corrigé</summary>
                            <p className="reading mt-3 whitespace-pre-line text-ink">{t.corrige}</p>
                          </details>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </EpreuveShell>
  );
}
