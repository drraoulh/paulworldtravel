import ForAudience from '@/components/access/ForAudience';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import CourseHome from '@/components/parcours/CourseHome';
import { inPersonPlaces } from '@/content/contact';
import { weeklyPlan } from '@/content/parcours';
import { buildCourse } from '@/content/parcours/course';
import { publishedModules } from '@/lib/training-content';

export const metadata: Metadata = {
  title: 'Parcours de formation TCF Canada',
  description: 'Un cours complet en six modules, avec barre de progression : test de niveau, méthode de chaque épreuve, séries notées, simulations corrigées par l’IA et examen blanc.',
};

export default async function Parcours() {
  const modules = await publishedModules();
  const course = buildCourse(modules);
  const courseMinutes = course.flatMap((m) => m.items).reduce((n, it) => n + it.minutes, 0);
  return (
    <>
      <CourseHome course={course} totalMinutes={courseMinutes} quizCount={modules.reduce((n, m) => n + m.lessons.reduce((s, l) => s + l.quiz.length, 0), 0)} />

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
          <ForAudience visitor={<p className="mt-10 max-w-2xl text-slate">
            Vous préférez être accompagné ? Nos formateurs suivent ce parcours avec vous, en ligne ou {inPersonPlaces}.{' '}
            <Link href="/packs/" className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Voir les packs</Link>
          </p>} free={<p className="mt-10 max-w-2xl text-slate">
            Vous préférez être accompagné ? Nos formateurs suivent ce parcours avec vous, en ligne ou {inPersonPlaces}.{' '}
            <Link href="/packs/" className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Voir les packs</Link>
          </p>} />
        </Container>
      </section>
    </>
  );
}
