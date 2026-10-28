import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/ui';
import ReadingPractice from './ReadingPractice';
import TeamSeries from './TeamSeries';

export const metadata: Metadata = { title: 'S’entraîner au TCF Canada' };

const modules = [
  { href: '/entrainement/comprehension-orale/', name: 'Compréhension orale', text: '39 questions, 35 minutes : écoute, choix de réponse et corrections expliquées.', tag: 'Séries mensuelles' },
  { href: '/entrainement/comprehension-ecrite/', name: 'Compréhension écrite', text: '39 questions en 60 minutes : textes progressifs, repérage et interprétation.', tag: 'Séries mensuelles' },
  { href: '/entrainement/expression-orale/series/', name: 'Expression orale', text: 'Trois tâches en 12 minutes : présentation, interaction et point de vue.', tag: 'Séries mensuelles' },
  { href: '/entrainement/expression-ecrite/series/', name: 'Expression écrite', text: 'Trois tâches en 60 minutes : rédigez, comptez vos mots et relisez avec une grille.', tag: 'Séries mensuelles' },
];

export default function Training() {
  return (
    <>
      <PageHeader title="Entraînez-vous sur les quatre épreuves." intro="Des combinaisons originales par mois et par année pour les quatre épreuves. Choisissez votre série, puis entraînez-vous avec les consignes, le chronomètre et les corrections ou critères de révision." />
      <section className="bg-paper py-12 sm:py-16">
        <Container>
          <Link href="/entrainement/series/" className="mb-8 inline-block rounded-xl bg-night px-6 py-3 font-bold text-white">Choisir une combinaison pour les quatre épreuves</Link>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {modules.map((m) => (
              <Link key={m.href} href={m.href} className="group rounded-2xl border border-rule bg-white p-6 transition-colors hover:border-ocean">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-ocean">{m.tag}</span>
                <h2 className="heading mt-4 text-xl text-night group-hover:text-ocean">{m.name}</h2>
                <p className="mt-2 text-slate">{m.text}</p>
              </Link>
            ))}
          </div>

          <aside className="mt-10 rounded-2xl border border-rule bg-white p-6"><h2 className="heading text-2xl text-night">Aller plus loin avec l’IA</h2><p className="mt-3 text-slate">Un compte gratuit donne droit à un essai ; une formule active débloque des quotas quotidiens. Les retours de l’IA sont des indications pédagogiques.</p><div className="mt-5 flex flex-wrap gap-5"><Link href="/entrainement/expression-ecrite/" className="font-bold text-ocean underline">Correction écrite</Link><Link href="/entrainement/expression-orale/" className="font-bold text-ocean underline">Pratique orale avec l’IA</Link><Link href="/entrainement/tuteur/" className="font-bold text-ocean underline">Tuteur de français</Link></div></aside>
          <h2 id="comprehension-ecrite" className="heading mb-4 mt-16 scroll-mt-28 text-2xl text-night">Compréhension écrite</h2>
          <p className="mb-6 max-w-3xl text-slate">Six questions originales, de A2 à B2. Cette série de découverte n’est pas un test blanc officiel et ne délivre pas de score TCF. Aucun compte nécessaire.</p>
          <Link href="/entrainement/comprehension-ecrite/" className="mb-6 inline-block rounded-xl bg-night px-6 py-3 font-bold text-white">Choisir une série de 39 questions</Link>
          <ReadingPractice />
          <TeamSeries />
          <Link href="/cours/" className="mt-8 inline-block font-bold text-ocean hover:underline">Consulter les fiches méthode</Link>
        </Container>
      </section>
    </>
  );
}
