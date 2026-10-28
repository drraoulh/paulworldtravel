import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import { corriges } from '@/content/corriges';
import { speakingTasks, writingTasks } from '@/content/expression';
import { expressionConfigs, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => expressionConfigs.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEpreuve((await params).slug);
  return e ? { title: `Sujets et corrigés : ${e.module.name}` } : {};
}

const fmt = (s: number) => `${Math.floor(s / 60)} min${s % 60 ? ` ${s % 60}` : ''}`;

export default async function SujetsPage({ params }: Props) {
  const e = getEpreuve((await params).slug);
  if (!e || e.kind !== 'expression') notFound();
  const isEe = e.module.id === 'ee';
  const subjects = isEe
    ? writingTasks.map((t) => ({ id: t.id, task: t.task, prompt: t.prompt, documents: t.documents, meta: `${t.minWords} à ${t.maxWords} mots, environ ${t.minutes} min` }))
    : speakingTasks.map((t) => ({ id: t.id, task: t.task, prompt: t.prompt, documents: undefined, meta: t.prepSeconds ? `${fmt(t.prepSeconds)} de préparation, ${fmt(t.seconds)} d’échange` : `${fmt(t.seconds)}, sans préparation` }));

  return (
    <EpreuveShell
      epreuve={e}
      active="sujets"
      title="Sujets et corrigés"
      intro="Des sujets originaux du type de l’examen. Essayez d’abord seul, puis comparez avec le corrigé commenté, ou faites corriger votre production par l’IA."
    >
      <Container className="space-y-12">
        {([1, 2, 3] as const).map((n) => (
          <section key={n}>
            <h2 className="heading text-2xl text-night">{e.module.tasks[n - 1].title}</h2>
            <p className="mt-2 max-w-3xl text-slate">{e.module.tasks[n - 1].detail}</p>
            <div className="mt-6 space-y-4">
              {subjects.filter((s) => s.task === n).map((s) => {
                const c = corriges[s.id];
                return (
                  <article key={s.id} className="rounded-2xl border border-rule bg-white p-6">
                    <p className="text-sm font-semibold text-ocean">{s.meta}</p>
                    <p className="mt-2 text-lg text-ink">{s.prompt}</p>
                    {s.documents && <div className="mt-3 space-y-2">{s.documents.map((d) => <blockquote key={d} className="border-l-4 border-sky bg-paper p-3 text-sm">{d}</blockquote>)}</div>}
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <Link href={`/epreuve/${e.slug}/simulateur/?sujet=${s.id}`} className="rounded-full bg-night px-5 py-3 font-bold text-white hover:bg-ocean">
                        {isEe ? 'Rédiger sur ce sujet' : 'M’entraîner sur ce sujet'}
                      </Link>
                    </div>
                    {c && (
                      <details className="mt-5 rounded-xl bg-paper p-5">
                        <summary className="cursor-pointer font-semibold text-night">Voir le corrigé</summary>
                        <p className="mt-4 whitespace-pre-line leading-relaxed text-ink">{c.text}</p>
                        <p className="mt-4 border-t border-rule pt-3 text-sm text-slate"><strong className="text-night">Pourquoi ça marche : </strong>{c.note}</p>
                      </details>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </Container>
    </EpreuveShell>
  );
}
