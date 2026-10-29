import type { Metadata } from 'next';
import { ButtonLink, Container } from '@/components/ui';
import CourseHome from '@/components/parcours/CourseHome';
import { weeklyPlan } from '@/content/parcours';
import { course, courseMinutes } from '@/content/parcours/course';

export const metadata: Metadata = {
  title: 'Parcours de formation TCF Canada',
  description: 'Un cours complet en six modules, avec barre de progression : test de niveau, méthode de chaque épreuve, séries notées, simulations corrigées par l’IA et examen blanc.',
};

export default function Parcours() {
  return (
    <>
      <CourseHome course={course} totalMinutes={courseMinutes} />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <h2 className="heading text-2xl text-night sm:text-3xl">Calendrier suggéré sur six semaines</h2>
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
