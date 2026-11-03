import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/ui';
import { FREE_SERIES, FREE_TRIAL } from '@/content/offers';
import GuideDone from './GuideDone';

export const metadata: Metadata = {
  title: 'Guide : bien démarrer sur la plateforme',
  description: 'Comment utiliser la plateforme de préparation au TCF Canada : compte gratuit, test de niveau, parcours, séries, simulateurs IA, packs et examen blanc.',
};

const steps: { title: string; text: string; link: { href: string; label: string } }[] = [
  {
    title: 'Créez votre compte gratuit',
    text: `L’inscription est gratuite et sans engagement. Elle enregistre votre progression sur tous vos appareils et vous donne un essai de l’intelligence artificielle : ${FREE_TRIAL.writing} corrections écrites, ${FREE_TRIAL.speaking} corrections orales et ${FREE_TRIAL.tutor} questions au tuteur. Vous choisirez un pack plus tard, seulement si la plateforme vous convient.`,
    link: { href: '/inscription/', label: 'Créer mon compte gratuit' },
  },
  {
    title: 'Passez le test de niveau',
    text: 'Quinze questions, une dizaine de minutes. Vous obtenez une première indication en grammaire, vocabulaire et lecture. Ce test ne mesure pas l’écoute ni l’expression écrite ou orale.',
    link: { href: '/test-de-niveau/', label: 'Passer le test de niveau' },
  },
  {
    title: 'Suivez le parcours, étape par étape',
    text: 'La page Parcours est votre point de départ à chaque connexion. Le bouton « Reprendre » vous emmène directement à l’étape suivante, et la barre de progression avance à chaque quiz réussi, série ou simulation terminée. Une leçon consultée est distinguée d’un quiz réussi. Les leçons de méthode sont gratuites ; chacune se termine par un quiz.',
    link: { href: '/parcours/', label: 'Ouvrir le parcours' },
  },
  {
    title: 'Entraînez-vous sur les séries chronométrées',
    text: `Chaque série reprend le format officiel : 39 questions du niveau A1 au C2, 35 minutes en compréhension orale, 60 minutes en compréhension écrite. Choisissez « Conditions d’examen » pour une seule écoute et le chronomètre, ou « Mode entraînement » pour réécouter, lire la transcription et voir la correction après chaque question. La série ${FREE_SERIES} de chaque épreuve est gratuite.`,
    link: { href: '/epreuve/comprehension-orale/series/', label: 'Voir les séries d’écoute' },
  },
  {
    title: 'Rédigez et parlez, l’IA vous corrige',
    text: 'Dans le simulateur d’expression écrite, choisissez un sujet, rédigez dans le temps imparti et recevez une note indicative sur 20 avec vos erreurs expliquées. Dans le simulateur d’expression orale, autorisez le micro, parlez, et l’IA vous corrige ; à la tâche 2, vous échangez avec un interlocuteur IA comme face à l’examinateur. Le nombre d’essais restants s’affiche au-dessus de chaque simulateur.',
    link: { href: '/epreuve/expression-ecrite/simulateur/', label: 'Essayer le simulateur écrit' },
  },
  {
    title: 'Choisissez un pack quand vous êtes prêt',
    text: 'Un pack débloque toutes les séries, les examens blancs et des corrections par l’IA chaque jour. Silver inclut des relectures par un formateur ; Gold et Platinum ajoutent des cours et un suivi. Les prix s’affichent dans votre monnaie (FCFA, dollar canadien ou dollar américain). Après votre demande, un conseiller vous contacte pour le paiement et votre accès est activé dès réception.',
    link: { href: '/packs/', label: 'Comparer les packs' },
  },
  {
    title: 'Passez un examen blanc complet',
    text: 'Les quatre épreuves s’enchaînent avec les durées officielles : compréhension orale, compréhension écrite, expression écrite puis expression orale. Prévoyez environ 2 h 50, des écouteurs, un micro et un endroit calme. Faites-en un au début, puis un autre quelques semaines avant l’examen pour mesurer vos progrès.',
    link: { href: '/examen-blanc/', label: 'Voir les examens blancs' },
  },
  {
    title: 'Suivez vos résultats',
    text: 'Mon espace regroupe votre progression dans le parcours, vos corrections, vos essais restants et votre pack. Le tableau de bord de chaque épreuve montre vos scores par niveau, pour savoir où vous perdez des points.',
    link: { href: '/espace/', label: 'Ouvrir mon espace' },
  },
];

const tips = [
  'Travaillez un peu chaque jour plutôt que beaucoup une fois par semaine : fixez votre objectif hebdomadaire sur la page Parcours.',
  'À l’oral, utilisez Chrome sur ordinateur ou sur Android, et autorisez le micro quand le navigateur le demande.',
  'En compréhension orale, mettez des écouteurs : à l’examen, chaque document n’est diffusé qu’une fois.',
  'Une question de grammaire ou de méthode ? Le tuteur IA répond à toute heure.',
  'Vous avez passé le TCF ? Partagez vos sujets : ils aident les prochains candidats.',
];

export default function Guide() {
  return (
    <>
      <PageHeader image={{ src: '/images/study.jpg', alt: 'Un cahier de révision pour organiser sa préparation' }}
        title="Bien démarrer sur la plateforme"
        intro="Huit étapes pour passer de la première visite au jour de l’examen. Lisez-les une fois : ensuite, la page Parcours vous guide toute seule."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-2xl bg-white p-6 sm:p-8">
                <span className="display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-night text-lg text-white" aria-hidden="true">{i + 1}</span>
                <div>
                  <h2 className="heading text-xl text-night">{s.title}</h2>
                  <p className="reading mt-2 text-ink">{s.text}</p>
                  <Link href={s.link.href} className="mt-3 inline-block font-bold text-ocean hover:underline">{s.link.label}</Link>
                </div>
              </li>
            ))}
          </ol>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-6">
              <h2 className="heading text-lg text-night">Bons réflexes</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink">
                {tips.map((t) => <li key={t} className="border-l-4 border-container pl-3">{t}</li>)}
              </ul>
            </div>
            <GuideDone />
          </aside>
        </Container>
      </section>
    </>
  );
}
