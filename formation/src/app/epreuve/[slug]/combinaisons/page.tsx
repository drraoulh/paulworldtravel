import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import { MONTHS, TASK_LIMITS } from '@/lib/combinaisons';
import { publishedCombinaisons } from '@/lib/combinaisons-server';
import { getEpreuve } from '@/lib/epreuves';
import { oralMonths } from '@/content/sujets-oraux';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Combinaisons des sessions : expression écrite' };

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ annee?: string }> };

export default async function CombinaisonsPage({ params, searchParams }: Props) {
  const e = getEpreuve((await params).slug);
  if (!e || (e.module.id !== 'ee' && e.module.id !== 'eo')) notFound();
  if (e.module.id === 'eo') {
    return (
      <EpreuveShell epreuve={e} active="combinaisons" title="Sujets des sessions" intro="Les sujets des tâches 2 et 3 des sessions d’examen, mois par mois depuis 2023, avec des exemples de réponses. Entraînez-vous à voix haute, dans le temps officiel.">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {oralMonths.map((m) => (
              <li key={`${m.year}-${m.month}`}>
                <Link href={`/epreuve/${e.slug}/combinaisons/${m.year}/${m.month}/`} className="group block rounded-2xl card-link p-6 hover:border-night">
                  <span className="heading block text-2xl text-night group-hover:text-ocean">{MONTHS[m.month - 1]} {m.year}</span>
                  <span className="mt-2 block text-slate">{m.t2.length + m.t3.length} sujets</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </EpreuveShell>
    );
  }
  const all = await publishedCombinaisons();
  const years = Array.from(new Set(all.map((c) => c.content.year))).sort((a, b) => b - a);
  const asked = Number((await searchParams).annee);
  const year = years.includes(asked) ? asked : years[0];
  const months = Array.from({ length: 12 }, (_, i) => 12 - i)
    .map((m) => ({ m, count: all.filter((c) => c.content.year === year && c.content.month === m).length }))
    .filter((x) => x.count > 0);

  return (
    <EpreuveShell
      epreuve={e}
      active="combinaisons"
      title="Combinaisons des sessions"
      intro="Les trois tâches tombées ensemble lors d’une session, mois par mois depuis 2024, avec leurs corrigés. Entraînez-vous sur la combinaison complète, dans l’ordre, en 60 minutes."
    >
      <Container className="space-y-12">
        <ol className="grid gap-3 sm:grid-cols-3">
          {([1, 2, 3] as const).map((n) => (
            <li key={n} className="rounded-2xl bg-white p-5">
              <p className="font-bold text-night">Tâche {n}</p>
              <p className="text-sm text-slate">{TASK_LIMITS[n].title.split(' : ')[1]}, {TASK_LIMITS[n].minWords} à {TASK_LIMITS[n].maxWords} mots, {TASK_LIMITS[n].minutes} min</p>
            </li>
          ))}
        </ol>

        {years.length > 0 ? (
          <section>
            <h2 className="heading text-2xl text-night">Choisissez une année</h2>
            <nav aria-label="Années" className="mt-5 flex flex-wrap gap-3">
              {years.map((y) => (
                <Link key={y} href={`?annee=${y}`} aria-current={y === year ? 'page' : undefined}
                  className={`rounded-full px-6 py-3 font-bold ${y === year ? 'bg-night text-white' : 'border border-rule bg-white text-night hover:border-night'}`}>
                  {y}
                </Link>
              ))}
            </nav>
            <h2 className="heading mt-10 text-2xl text-night">Combinaisons de {year}</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {months.map(({ m, count }) => (
                <li key={m}>
                  <Link href={`/epreuve/${e.slug}/combinaisons/${year}/${m}/`} className="group block rounded-2xl card-link p-6 hover:border-night">
                    <span className="heading block text-2xl text-night group-hover:text-ocean">{MONTHS[m - 1]} {year}</span>
                    <span className="mt-2 block text-slate">{count} combinaison{count > 1 ? 's' : ''}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="rounded-2xl bg-white p-6 sm:p-8">
            <h2 className="heading text-xl text-night">Les premières combinaisons arrivent</h2>
            <p className="mt-2 max-w-2xl text-slate">
              Nous publions ici les sujets rapportés par les candidats, session par session. En attendant, entraînez-vous sur les combinaisons de l’équipe ci-dessous.
            </p>
          </section>
        )}

        <section className="flex flex-col gap-4 rounded-2xl bg-night p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="heading text-xl">Vous venez de passer le TCF ?</h2>
            <p className="mt-1 max-w-2xl text-blue-100">Partagez les sujets que vous avez eus, même approximativement : vous aidez les prochains candidats à se préparer.</p>
          </div>
          <Link href="/partager-mes-sujets/" className="inline-flex justify-center rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover">Partager mes sujets</Link>
        </section>

        <p className="text-sm text-slate">
          Ces sujets d’entraînement ne sont pas publiés par France Éducation international, seul organisme responsable des sujets officiels du TCF.
        </p>
      </Container>
    </EpreuveShell>
  );
}
