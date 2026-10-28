import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import { ProgressBar } from '@/components/parcours/Progress';
import { lessonCount, lessonId, modules, weeklyPlan } from '@/content/parcours';

export const metadata: Metadata = {
  title: 'Parcours de formation TCF Canada',
  description: 'Un parcours complet en quatre étapes : test de niveau, méthode de chaque épreuve, entraînement corrigé par l’IA et conditions réelles.',
};

const steps = [
  { title: 'Évaluez votre niveau', text: 'Quinze questions gratuites, environ dix minutes, pour savoir d’où vous partez et ce qu’il faut travailler en priorité.', href: '/test-de-niveau/', cta: 'Passer le test' },
  { title: 'Apprenez la méthode', text: `${lessonCount} leçons courtes, une épreuve à la fois, avec des modèles commentés et un quiz pour valider chaque leçon.`, href: '#modules', cta: 'Voir les modules' },
  { title: 'Entraînez-vous', text: 'Séries de 39 questions en lecture et en écoute, rédactions et oraux corrigés par l’IA, tuteur disponible à toute heure.', href: '/epreuve/comprehension-ecrite/series/', cta: 'Commencer une série' },
  { title: 'Passez l’examen blanc', text: 'Compréhension orale, compréhension écrite et expression écrite enchaînées et chronométrées, comme le jour J.', href: '/examen-blanc/', cta: 'Passer l’examen blanc' },
];

export default function Parcours() {
  const allIds = modules.flatMap((m) => m.lessons.map((l) => lessonId(m, l)));
  return (
    <>
      <PageHeader
        title="Votre parcours vers le TCF Canada."
        intro="Quatre étapes, quatre épreuves, une méthode. Suivez le parcours dans l’ordre ou allez directement à l’épreuve qui vous inquiète le plus."
      >
        <div className="mt-8 max-w-sm"><ProgressBar ids={allIds} label="leçons terminées sur ce navigateur" /></div>
      </PageHeader>

      <section className="bg-paper py-12 sm:py-16">
        <Container>
          <h2 className="heading text-2xl text-night sm:text-3xl">Les quatre étapes</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col rounded-2xl border border-rule bg-white p-6">
                <span className="display text-4xl text-container" aria-hidden="true">{i + 1}</span>
                <h3 className="heading mt-3 text-lg text-night">{s.title}</h3>
                <p className="mt-2 flex-1 text-slate">{s.text}</p>
                <Link href={s.href} className="mt-5 font-bold text-ocean hover:underline">{s.cta}</Link>
              </li>
            ))}
          </ol>

          <h2 id="modules" className="heading mt-16 scroll-mt-28 text-2xl text-night sm:text-3xl">Les modules</h2>
          <p className="mt-3 max-w-2xl text-slate">Un module par épreuve, dans l’ordre du jour de l’examen. Chaque leçon se lit en moins de 12 minutes.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {modules.map((m) => (
              <Link key={m.id} href={`/epreuve/${m.slug}/`} className="group flex flex-col rounded-2xl border border-rule bg-white p-6 transition-colors hover:border-ocean sm:p-8">
                <h3 className="heading text-2xl text-night group-hover:text-ocean">{m.name}</h3>
                <p className="mt-1 text-sm font-semibold text-ocean">{m.facts.slice(0, 2).map((f) => f.value).join(', ')}</p>
                <p className="mt-3 flex-1 text-slate">{m.intro}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-ink">
                  {m.lessons.map((l) => <li key={l.slug}>{l.title}</li>)}
                </ul>
                <div className="mt-6"><ProgressBar ids={m.lessons.map((l) => lessonId(m, l))} /></div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <h2 className="heading text-2xl text-night sm:text-3xl">Un plan sur six semaines</h2>
          <p className="mt-3 max-w-2xl text-slate">Environ une heure par jour, cinq jours par semaine. Si votre examen est plus proche, faites deux semaines en une et concentrez-vous sur vos épreuves les plus faibles.</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {weeklyPlan.map((w) => (
              <li key={w.week} className="rounded-2xl bg-paper p-6">
                <p className="text-sm font-bold text-ocean">Semaine {w.week}</p>
                <h3 className="heading mt-1 text-lg text-night">{w.focus}</h3>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-slate">{w.tasks.map((t) => <li key={t}>{t}</li>)}</ul>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-night p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="heading text-xl">Préférez-vous être accompagné ?</p>
              <p className="mt-1 text-blue-100">Nos formateurs suivent ce parcours avec vous, en ligne ou en présentiel à Douala.</p>
            </div>
            <ButtonLink href="/formules/">Voir les formules</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
