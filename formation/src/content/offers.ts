// Packs and upcoming languages. Offices and phones live in ./contact.
import { inPersonPlaces } from './contact';

/*
 * The four packs. Prices in FCFA. The AI allowances below are enforced by
 * src/lib/ai/access.ts (per day, while the pack is active).
 */
export type PackId = 'essentiel' | 'silver' | 'gold' | 'platinum';

export interface Pack {
  id: PackId;
  name: string;
  price: number;
  months: number;
  tagline: string;
  includes: string[];
  /** Daily AI allowance while the pack is active. */
  ai: { writing: number; speaking: number; tutor: number };
  featured?: boolean;
}

export const packs: Pack[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: 15000,
    months: 1,
    tagline: 'Pour s’entraîner seul, à son rythme.',
    ai: { writing: 2, speaking: 1, tutor: 20 },
    includes: [
      'Tout le parcours : 20 leçons de méthode et leurs quiz',
      'Toutes les séries chronométrées d’écoute et de lecture',
      'Combinaisons d’expression écrite avec corrigés',
      'Examen blanc et tableau de bord',
      'Corrections par l’IA : 2 écrites et 1 orale par jour',
      'Tuteur IA : 20 questions par jour',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 35000,
    months: 2,
    tagline: 'Plus de temps et plus de corrections.',
    ai: { writing: 5, speaking: 3, tutor: 60 },
    includes: [
      'Tout le pack Essentiel, pendant 2 mois',
      'Corrections par l’IA : 5 écrites et 3 orales par jour',
      'Tuteur IA : 60 questions par jour',
      '2 productions relues et notées par un formateur',
      'Attestation de parcours',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 75000,
    months: 3,
    tagline: 'L’accompagnement d’un formateur, en ligne.',
    ai: { writing: 8, speaking: 5, tutor: 100 },
    featured: true,
    includes: [
      'Tout le pack Silver, pendant 3 mois',
      'Un cours en direct par semaine, en visio et en petit groupe',
      '8 productions relues et notées par un formateur',
      'Un examen blanc corrigé par un formateur',
      'Suivi personnalisé sur WhatsApp',
      'Corrections par l’IA : 8 écrites et 5 orales par jour',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 150000,
    months: 3,
    tagline: 'La préparation complète, en salle et en ligne.',
    ai: { writing: 12, speaking: 8, tutor: 150 },
    includes: [
      'Tout le pack Gold',
      `Cours en salle, ${inPersonPlaces}`,
      'Simulations d’expression orale face à un examinateur',
      '2 séances de coaching individuel',
      'Aide à l’inscription au TCF Canada',
      'Corrections par l’IA : 12 écrites et 8 orales par jour',
    ],
  },
];

/** Formules sold before the packs, still shown for existing enrollments. */
const legacyNames: Record<string, string> = { 'en-ligne': 'En ligne', presentiel: 'En présentiel', hybride: 'Hybride' };

export const packName = (id: string) => packs.find((p) => p.id === id)?.name ?? legacyNames[id] ?? id;

export const formatFcfa = (n: number) => `${n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ')} FCFA`;

export const objectifs = ['NCLC 4', 'NCLC 5', 'NCLC 6', 'NCLC 7', 'NCLC 8', 'NCLC 9', 'NCLC 10 et plus', 'Je ne sais pas encore'];

export const autresLangues = [
  { name: 'Anglais', exams: 'IELTS, CELPIP' },
  { name: 'Allemand', exams: 'Goethe-Zertifikat' },
  { name: 'Italien', exams: 'CILS, CELI' },
];
