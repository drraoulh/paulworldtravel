import type { EpreuveId } from '@/content/tcf';
/** One photograph per épreuve (Pexels, free licence; see public/images/CREDITS.md). */
export const EPREUVE_IMAGES: Record<EpreuveId, { src: string; alt: string }> = {
  co: { src: '/images/ecoute.jpg', alt: 'Une jeune femme écoute avec un casque' },
  ce: { src: '/images/lecture.jpg', alt: 'Un étudiant lit un livre, concentré' },
  ee: { src: '/images/ecriture.jpg', alt: 'Un étudiant écrit dans son cahier à côté de son ordinateur' },
  eo: { src: '/images/oral.jpg', alt: 'Un candidat s’exprime face à son interlocutrice lors d’un entretien' },
};
