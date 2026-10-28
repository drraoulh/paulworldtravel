import type { EpreuveId } from '@/content/tcf';

export interface QuizQuestion {
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export interface Lesson {
  slug: string;
  title: string;
  /** Reading time, in minutes. */
  minutes: number;
  /** What the candidate can do after the lesson. */
  goal: string;
  sections: { heading: string; paragraphs?: string[]; list?: string[] }[];
  /** Worked example: a model answer or a commented document. */
  model?: { title: string; text: string; note?: string };
  phrases?: { heading: string; items: string[] };
  pitfalls?: string[];
  quiz: QuizQuestion[];
  practice?: { href: string; label: string };
}

export interface Module {
  id: EpreuveId;
  slug: string;
  name: string;
  intro: string;
  facts: { label: string; value: string }[];
  tasks: { title: string; detail: string }[];
  lessons: Lesson[];
  practice: { href: string; label: string };
}
