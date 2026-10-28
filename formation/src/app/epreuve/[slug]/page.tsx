import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink, Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import { writingTasks, speakingTasks } from '@/content/expression';
import { seriesFor } from '@/content/series';
import { epreuveConfigs, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => epreuveConfigs.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEpreuve((await params).slug);
  return e ? { title: `${e.module.name} TCF Canada : méthode, entraînement et simulateur`, description: e.module.intro } : {};
}

export default async function EpreuvePage({ params }: Props) {
  const e = getEpreuve((await params).slug);
  if (!e) notFound();
  const m = e.module;
  const series = e.kind === 'comprehension' ? seriesFor(m.id as 'ce' | 'co') : [];
  const subjects = m.id === 'ee' ? writingTasks.length : m.id === 'eo' ? speakingTasks.length : 0;

  const blocks = [
    { href: `/epreuve/${e.slug}/methodologie/`, title: 'Méthodologie et astuces', text: `${m.lessons.length} leçons courtes avec modèles commentés et quiz.` },
    ...(e.kind === 'comprehension'
      ? [{ href: `/epreuve/${e.slug}/series/`, title: 'Séries d’entraînement', text: `${series.length} séries complètes de 39 questions, du A1 au C2, en conditions d’examen ou en mode entraînement.` }]
      : [
          { href: `/epreuve/${e.slug}/sujets/`, title: 'Sujets et corrigés', text: `${subjects} sujets originaux, chacun avec un corrigé commenté.` },
          { href: `/epreuve/${e.slug}/simulateur/`, title: 'Simulateur IA', text: m.id === 'ee' ? 'Rédigez dans les conditions de l’examen : note sur 20, erreurs expliquées et version améliorée.' : 'Parlez au micro, dialoguez avec un interlocuteur IA en tâche 2 : note sur 20 et modèle.' },
        ]),
    { href: `/epreuve/${e.slug}/tableau-de-bord/`, title: 'Tableau de bord', text: 'Vos résultats et votre progression sur cette épreuve.' },
  ];

  return (
    <EpreuveShell epreuve={e} active="presentation" intro={m.intro}>
      <Container className="space-y-14">
        <div>
          <h2 className="heading text-2xl text-night">Format de l’épreuve</h2>
          <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {m.facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-white p-5">
                <dt className="text-sm text-slate">{f.label}</dt>
                <dd className="heading mt-1 text-xl text-night">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="heading text-2xl text-night">{e.kind === 'expression' ? 'Les trois tâches' : 'Comment l’épreuve progresse'}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {m.tasks.map((t) => (
              <div key={t.title} className="rounded-2xl border border-rule bg-white p-6">
                <h3 className="heading text-lg text-night">{t.title}</h3>
                <p className="mt-2 text-slate">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="heading text-2xl text-night">Votre programme pour cette épreuve</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {blocks.map((b) => (
              <Link key={b.href} href={b.href} className="group rounded-2xl border border-rule bg-white p-6 transition-colors hover:border-ocean">
                <h3 className="heading text-xl text-night group-hover:text-ocean">{b.title}</h3>
                <p className="mt-2 text-slate">{b.text}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 rounded-2xl bg-night p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="heading text-xl">Prêt à vous tester ?</p>
            <p className="mt-1 text-blue-100">Commencez par la méthode, puis passez à la pratique.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`/epreuve/${e.slug}/methodologie/`}>Lire la méthode</ButtonLink>
            <ButtonLink href={blocks[1].href} variant="outline">{e.kind === 'comprehension' ? 'Commencer une série' : 'Voir les sujets'}</ButtonLink>
          </div>
        </div>
      </Container>
    </EpreuveShell>
  );
}
