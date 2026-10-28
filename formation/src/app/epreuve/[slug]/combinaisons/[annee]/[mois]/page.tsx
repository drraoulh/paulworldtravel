import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import { combiTaskId, MONTHS, TASK_LIMITS } from '@/lib/combinaisons';
import { publishedCombinaisons } from '@/lib/combinaisons-server';
import { getEpreuve } from '@/lib/epreuves';

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
  if (!e || e.module.id !== 'ee' || !Number.isInteger(year) || month < 1 || month > 12) notFound();
  const list = (await publishedCombinaisons()).filter((c) => c.content.year === year && c.content.month === month).reverse();

  return (
    <EpreuveShell
      epreuve={e}
      active="combinaisons"
      title={`${MONTHS[month - 1]} ${year}`}
      intro={`${list.length} combinaison${list.length > 1 ? 's' : ''} de cette session. Faites les trois tâches dans l’ordre : 10, 20 puis 30 minutes.`}
    >
      <Container className="space-y-6">
        <Link href={`/epreuve/${e.slug}/combinaisons/?annee=${year}`} className="font-bold text-ocean hover:underline">Tous les mois de {year}</Link>
        {list.length === 0 && <p className="rounded-2xl bg-white p-6 text-slate">Aucune combinaison publiée pour ce mois.</p>}
        {list.map((c, i) => (
          <article key={c.id} className="rounded-2xl bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="heading text-xl text-night">Combinaison {i + 1}{c.theme ? ` : ${c.theme}` : ''}</h2>
              <span className="text-sm text-slate">{c.content.source === 'candidats' ? 'Rapportée par un candidat, reformulée' : 'Proposée par l’équipe'}</span>
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
          </article>
        ))}
      </Container>
    </EpreuveShell>
  );
}
