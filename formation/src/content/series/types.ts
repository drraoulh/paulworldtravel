export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/** One question of a series licensed from TCF Canada Ltd (contract of 23 October 2026). */
export interface SeriesQuestion {
  level: Level;
  /** image: 4 heard propositions about a picture; reponse: a heard extract and 4 heard answers. */
  kind?: 'image' | 'reponse';
  /** Path under MEDIA_BASE (see lib/media.ts). */
  image?: { src: string; alt: string };
  /** Index of the right choice: the choices keep their order on screen. */
  answer?: number;
  /** Recorded document: path under MEDIA_BASE. */
  audio?: string;
  /** Compréhension écrite: the document to read. */
  doc?: string;
  /** Compréhension orale: the transcription (and the browser voice if the recording cannot load). */
  lines?: { voice: 'a' | 'b'; text: string }[];
  prompt: string;
  choices: string[];
  explanation: string;
}

export interface Series {
  epreuve: 'ce' | 'co';
  number: number;
  questions: SeriesQuestion[];
}

/** Index of the right choice. */
export const rightChoice = (q: SeriesQuestion) => q.answer ?? 0;
