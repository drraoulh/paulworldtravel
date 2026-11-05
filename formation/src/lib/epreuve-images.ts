import type { EpreuveId } from '@/content/tcf';
/** One photograph per épreuve (Pexels, free licence; see public/images/CREDITS.md). */
export const EPREUVE_IMAGES: Record<EpreuveId, { src: string; alt: string }> = {
  co: { src: '/images/co-ecoute.jpg', alt: 'Une femme sourit en écoutant un enregistrement au casque devant son ordinateur' },
  ce: { src: '/images/ce-lecture.jpg', alt: 'Une étudiante lit un livre attentivement dans un amphithéâtre' },
  ee: { src: '/images/ee-ecriture.jpg', alt: 'Un jeune homme rédige dans son cahier à côté de son ordinateur portable' },
  eo: { src: '/images/eo-oral.jpg', alt: 'Une jeune femme prend la parole avec assurance devant un groupe' },
};
