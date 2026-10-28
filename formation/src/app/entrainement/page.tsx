import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/ui';
import ReadingPractice from './ReadingPractice';
import TeamSeries from './TeamSeries';

export const metadata: Metadata = { title: 'S’entraîner au TCF Canada' };

const modules = [
  { href: '/entrainement/expression-ecrite/', name: 'Expression écrite', text: 'Rédigez une tâche, recevez une note sur 20, vos erreurs expliquées et une version améliorée.', tag: 'Corrigé par l’IA' },
  { href: '/entrainement/expression-orale/', name: 'Expression orale', text: 'Répondez au micro, et dialoguez avec un interlocuteur IA pour la tâche 2 : transcription, note sur 20 et modèle.', tag: 'Corrigé par l’IA' },
  { href: '/entrainement/tuteur/', name: 'Tuteur de français', text: 'Posez vos questions de grammaire, de vocabulaire ou de méthode, à toute heure.', tag: 'Disponible 24 h/24' },
  { href: '#comprehension-ecrite', name: 'Compréhension écrite', text: 'Une série gratuite de six questions, avec ou sans chronomètre.', tag: 'Sans compte' },
  { href: '/entrainement/comprehension-orale/', name: 'Compréhension orale', text: 'Huit documents à écouter, de A1 à C1, en conditions d’examen ou en mode entraînement.', tag: 'Sans compte' },
];

export default function Training() {
  return (
    <>
      <PageHeader title="Entraînez-vous sur les quatre épreuves." intro="Des exercices originaux, corrigés en quelques secondes. Un compte gratuit donne droit à un essai des corrections par l’IA ; votre formule active les débloque chaque jour." />
      <section className="bg-paper py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <Link key={m.href} href={m.href} className="group rounded-2xl border border-rule bg-white p-6 transition-colors hover:border-ocean">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-ocean">{m.tag}</span>
                <h2 className="heading mt-4 text-xl text-night group-hover:text-ocean">{m.name}</h2>
                <p className="mt-2 text-slate">{m.text}</p>
              </Link>
            ))}
          </div>

          <h2 id="comprehension-ecrite" className="heading mb-4 mt-16 scroll-mt-28 text-2xl text-night">Compréhension écrite</h2>
          <p className="mb-6 max-w-3xl text-slate">Six questions originales, de A2 à B2. Cette série de découverte n’est pas un test blanc officiel et ne délivre pas de score TCF. Aucun compte nécessaire.</p>
          <ReadingPractice />
          <TeamSeries />
          <Link href="/parcours/" className="mt-8 inline-block font-bold text-ocean hover:underline">Suivre le parcours de formation</Link>
        </Container>
      </section>
    </>
  );
}
