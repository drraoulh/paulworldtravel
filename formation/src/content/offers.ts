// Packs and upcoming languages. Offices and phones live in ./contact.
import { inPersonPlaces } from './contact';

/*
 * The five packs, priced per zone (Express first, the cheapest way in). The AI allowances below are enforced by
 * src/lib/ai/access.ts (per day, while the pack is active).
 */
export type PackId = 'express' | 'essentiel' | 'silver' | 'gold' | 'platinum';

/** Price zones: Cameroon and Central Africa in FCFA, Canada in CAD, elsewhere in USD. */
export type Zone = 'cm' | 'ca' | 'intl';

export const zones: { id: Zone; label: string; currency: 'XAF' | 'CAD' | 'USD' }[] = [
  { id: 'cm', label: 'Cameroun et Afrique centrale', currency: 'XAF' },
  { id: 'ca', label: 'Canada', currency: 'CAD' },
  { id: 'intl', label: 'Autres pays', currency: 'USD' },
];

const CEMAC = ['CM', 'GA', 'CG', 'TD', 'CF', 'GQ'];

/** Zone from a two-letter country code (for example Vercel's x-vercel-ip-country header). */
export const zoneForCountry = (country: string | null | undefined): Zone =>
  !country ? 'intl' : country.toUpperCase() === 'CA' ? 'ca' : CEMAC.includes(country.toUpperCase()) ? 'cm' : 'intl';

export const isZone = (z: unknown): z is Zone => z === 'cm' || z === 'ca' || z === 'intl';

export interface Pack {
  id: PackId;
  name: string;
  prices: Record<Zone, number>;
  /** Length of the access, in days (drives the activation after payment). */
  days: number;
  tagline: string;
  includes: string[];
  /** Replaces `includes` outside Cameroon, where classes in our offices are not practical. */
  includesAbroad?: string[];
  /** Daily AI allowance while the pack is active. */
  ai: { writing: number; speaking: number; tutor: number };
  featured?: boolean;
  /** Short entry pack, shown as a wide card above the others. */
  starter?: boolean;
}

export const packs: Pack[] = [
  {
    id: 'express',
    name: 'Express',
    prices: { cm: 5000, ca: 12.99, intl: 9.99 },
    days: 7,
    tagline: 'Une semaine intensive, juste avant l’examen.',
    ai: { writing: 1, speaking: 1, tutor: 10 },
    starter: true,
    includes: [
      'Toutes les séries chronométrées d’écoute et de lecture',
      'Toutes les leçons de méthode et leurs quiz',
      'Combinaisons d’expression écrite avec corrigés',
      'Examens blancs et tableau de bord',
      'Corrections par l’IA : 1 écrite et 1 orale par jour',
      'Tuteur IA : 10 questions par jour',
    ],
  },
  {
    id: 'essentiel',
    name: 'Essentiel',
    prices: { cm: 15000, ca: 32.99, intl: 24.99 },
    days: 30,
    tagline: 'Pour s’entraîner seul, à son rythme.',
    ai: { writing: 2, speaking: 1, tutor: 20 },
    includes: [
      'Tout le parcours : les leçons de méthode et leurs quiz',
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
    prices: { cm: 27500, ca: 59.99, intl: 44.99 },
    days: 60,
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
    prices: { cm: 75000, ca: 189, intl: 139.99 },
    days: 90,
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
    prices: { cm: 135000, ca: 309, intl: 229.99 },
    days: 90,
    tagline: 'La préparation complète, avec un formateur.',
    ai: { writing: 12, speaking: 8, tutor: 150 },
    includes: [
      'Tout le pack Gold',
      `Cours en salle, ${inPersonPlaces}`,
      'Simulations d’expression orale face à un examinateur',
      '2 séances de coaching individuel',
      'Aide à l’inscription au TCF Canada',
      'Corrections par l’IA : 12 écrites et 8 orales par jour',
    ],
    includesAbroad: [
      'Tout le pack Gold',
      '4 cours individuels en visio avec un formateur',
      'Simulations d’expression orale face à un examinateur, en visio',
      '2 séances de coaching individuel',
      'Aide à l’inscription au TCF Canada',
      'Corrections par l’IA : 12 écrites et 8 orales par jour',
    ],
  },
];

/*
 * What a free account gets, once, before choosing a pack. Change the numbers
 * here: they drive the limits (src/lib/ai/access.ts) and every message.
 */
export const FREE_TRIAL = { writing: 3, speaking: 2, tutor: 20 };

/** Practice series open without a pack, with a free account (numbers 1..FREE_SERIES of each épreuve). */
export const FREE_SERIES: number = 1;

const NUMBER_WORDS = ['', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six'];
/** « les séries 1 à 3 » (or « la série 1 »), for the messages. */
export const freeSeriesRange = FREE_SERIES === 1 ? 'la série 1' : `les séries 1 à ${FREE_SERIES}`;
/** « les trois premières séries » (or « la première série »). */
export const freeSeriesFirst = FREE_SERIES === 1 ? 'la première série' : `les ${NUMBER_WORDS[FREE_SERIES] ?? FREE_SERIES} premières séries`;
/** « aux trois premières séries » (or « à la première série »). */
export const freeSeriesFirstTo = FREE_SERIES === 1 ? 'à la première série' : `aux ${NUMBER_WORDS[FREE_SERIES] ?? FREE_SERIES} premières séries`;
/** Agrees the verb: « est gratuite » or « sont gratuites ». */
export const freeSeriesAreFree = FREE_SERIES === 1 ? 'est gratuite' : 'sont gratuites';

/** Formules sold before the packs, still shown for existing enrollments. */
const legacyNames: Record<string, string> = { 'en-ligne': 'En ligne', presentiel: 'En présentiel', hybride: 'Hybride' };

export const packName = (id: string) => packs.find((p) => p.id === id)?.name ?? legacyNames[id] ?? id;

const nbsp = (t: string) => t.replace(/\u202f|\u00a0/g, ' ');

/** Price of a pack in a zone, formatted for display. */
export function formatPrice(pack: Pack, zone: Zone) {
  const n = pack.prices[zone];
  if (zone === 'cm') return `${nbsp(n.toLocaleString('fr-FR'))} FCFA`;
  const amount = nbsp(n.toLocaleString('fr-FR', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }));
  return `${amount} ${zone === 'ca' ? '$ CA' : '$ US'}`;
}

/** « 7 jours », « 1 mois », « 3 mois ». */
export const packDuration = (pack: Pick<Pack, 'days'>) =>
  pack.days % 30 === 0 ? `${pack.days / 30} mois` : `${pack.days} jour${pack.days > 1 ? 's' : ''}`;

export const isPackId = (id: unknown): id is PackId => packs.some((p) => p.id === id);

export const packIncludes = (pack: Pack, zone: Zone) => (zone !== 'cm' && pack.includesAbroad) || pack.includes;

export const objectifs = ['NCLC 4', 'NCLC 5', 'NCLC 6', 'NCLC 7', 'NCLC 8', 'NCLC 9', 'NCLC 10 et plus', 'Je ne sais pas encore'];

export const autresLangues = [
  { name: 'Anglais', exams: 'IELTS, CELPIP' },
  { name: 'Allemand', exams: 'Goethe-Zertifikat' },
  { name: 'Italien', exams: 'CILS, CELI' },
];
