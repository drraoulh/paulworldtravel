// Training formats and upcoming languages. Offices and phones live in ./contact.
import { inPersonPlaces } from './contact';

// Prices and calendars are not set yet: fill `price` and `schedule` when they are decided.

export interface Formule {
  id: 'en-ligne' | 'presentiel' | 'hybride';
  name: string;
  where: string;
  summary: string;
  includes: string[];
  price: string | null;
  schedule: string | null;
}

export const formules: Formule[] = [
  {
    id: 'en-ligne',
    name: 'En ligne',
    where: 'Depuis chez vous, partout dans le monde',
    summary: 'Cours en visio en petit groupe et entraînement à votre rythme.',
    includes: [
      'Cours en direct en visio, rediffusion disponible',
      'Séries d’exercices sur les 4 épreuves',
      'Tests blancs complets chronométrés',
      'Rédactions et enregistrements corrigés par un formateur',
      'Suivi sur WhatsApp',
    ],
    price: null,
    schedule: null,
  },
  {
    id: 'presentiel',
    name: 'En présentiel',
    where: `En salle, ${inPersonPlaces}`,
    summary: 'Cours en salle avec un formateur, en groupe réduit.',
    includes: [
      'Cours en salle en groupe réduit',
      'Simulations d’expression orale face à un examinateur',
      'Tests blancs en conditions réelles',
      'Supports de cours imprimés',
      'Suivi individuel de la progression',
    ],
    price: null,
    schedule: null,
  },
  {
    id: 'hybride',
    name: 'Hybride',
    where: 'En salle à Douala ou à Yaoundé, et en ligne',
    summary: 'Les cours en salle, plus l’entraînement en ligne entre les séances.',
    includes: [
      'Tout le présentiel',
      'Tout l’entraînement en ligne',
      'Séances de rattrapage en visio',
    ],
    price: null,
    schedule: null,
  },
];

export const objectifs = ['NCLC 4', 'NCLC 5', 'NCLC 6', 'NCLC 7', 'NCLC 8', 'NCLC 9', 'NCLC 10 et plus', 'Je ne sais pas encore'];

export const autresLangues = [
  { name: 'Anglais', exams: 'IELTS, CELPIP' },
  { name: 'Allemand', exams: 'Goethe-Zertifikat' },
  { name: 'Italien', exams: 'CILS, CELI' },
];
