export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/**
 * One question. The FIRST choice is always the right answer: choices are shuffled
 * on screen, so authors never have to track an answer index.
 * Exception: the listening questions whose propositions are only heard ("image" and
 * "reponse", as at the start of the official test) keep the heard order A to D,
 * and `answer` gives the right one.
 */
export interface SeriesQuestion {
  level: Level;
  /** image: 4 heard propositions about a picture; reponse: a heard question and 4 heard answers. */
  kind?: 'image' | 'reponse';
  image?: { src: string; alt: string };
  /** Index of the right choice, for the kinds above (choices in heard order). */
  answer?: number;
  /** Compréhension écrite: the document to read. */
  doc?: string;
  /** Compréhension orale: the script, read aloud by the browser (two voices). */
  lines?: { voice: 'a' | 'b'; text: string }[];
  prompt: string;
  choices: [string, string, string, string];
  explanation: string;
}

export interface Series {
  epreuve: 'ce' | 'co';
  number: number;
  questions: SeriesQuestion[];
}

/** Helpers to keep the content files compact. */
export const read = (level: Level, doc: string, prompt: string, choices: SeriesQuestion['choices'], explanation: string): SeriesQuestion =>
  ({ level, doc, prompt, choices, explanation });

export const listen = (level: Level, lines: string | [string, string][], prompt: string, choices: SeriesQuestion['choices'], explanation: string): SeriesQuestion => ({
  level,
  lines: typeof lines === 'string'
    ? [{ voice: 'a', text: lines }]
    : lines.map(([who, text]) => ({ voice: who === 'b' ? 'b' : 'a', text })),
  prompt,
  choices,
  explanation,
});

/** Index of the right choice. */
export const rightChoice = (q: SeriesQuestion) => q.answer ?? 0;

const LETTERS = ['A', 'B', 'C', 'D'];

/** Picture question: the 4 propositions are only heard. `answer` is 0-3 in heard order. */
export const picture = (level: Level, image: { src: string; alt: string }, choices: SeriesQuestion['choices'], answer: number, explanation: string): SeriesQuestion => ({
  level,
  kind: 'image',
  image,
  answer,
  lines: choices.map((c, i) => ({ voice: i % 2 ? 'b' : 'a', text: `${LETTERS[i]}. ${c}` })),
  prompt: 'Écoutez les 4 propositions. Choisissez celle qui correspond à l’image.',
  choices,
  explanation,
});

/** Heard question with 4 heard answers. `answer` is 0-3 in heard order. */
export const reply = (level: Level, question: string, choices: SeriesQuestion['choices'], answer: number, explanation: string): SeriesQuestion => ({
  level,
  kind: 'reponse',
  answer,
  lines: [{ voice: 'b', text: question }, ...choices.map((c, i) => ({ voice: 'a' as const, text: `${LETTERS[i]}. ${c}` }))],
  prompt: 'Écoutez la question et les 4 réponses. Choisissez la réponse qui convient.',
  choices,
  explanation,
});
