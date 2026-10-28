export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/**
 * One question. The FIRST choice is always the right answer: choices are shuffled
 * on screen, so authors never have to track an answer index.
 */
export interface SeriesQuestion {
  level: Level;
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
