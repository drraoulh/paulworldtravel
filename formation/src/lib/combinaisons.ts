import type { WritingTask } from '@/content/expression';
import { writingTasks } from '@/content/expression';

/*
 * "Combinaisons": the three writing tasks of one exam session, as reported by
 * candidates after their test and reworded by the team before publication.
 * Stored in question_drafts (epreuve 'ee'):
 *   content.kind = 'report'      → raw report from a candidate (never public)
 *   content.kind = 'combinaison' → reworded set, public once status = 'approved'
 */

export const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export interface CombiTask { prompt: string; documents?: string[]; corrige?: string }

export interface CombinaisonContent {
  kind: 'combinaison';
  year: number;
  month: number; // 1-12, month of the exam session
  source: 'candidats' | 'equipe';
  reportId?: string;
  tasks: [CombiTask, CombiTask, CombiTask];
}

export interface ReportContent {
  kind: 'report';
  year: number;
  month: number;
  city?: string;
  tasks: [string, string, string];
  notes?: string;
  firstName?: string;
}

export interface Combinaison { id: string; theme: string | null; created_at: string; content: CombinaisonContent }

/** Official length and suggested time of each writing task. */
export const TASK_LIMITS = {
  1: { minWords: 60, maxWords: 120, minutes: 10, title: 'Tâche 1 : un message' },
  2: { minWords: 120, maxWords: 150, minutes: 20, title: 'Tâche 2 : un récit ou compte rendu' },
  3: { minWords: 120, maxWords: 180, minutes: 30, title: 'Tâche 3 : un texte argumenté' },
} as const;

/** Practice task id for one task of a published combination. */
export const combiTaskId = (id: string, task: 1 | 2 | 3) => `cmb:${id}:${task}`;

export function parseCombiTaskId(taskId: string) {
  const m = /^cmb:([0-9a-f-]{36}):([123])$/.exec(taskId);
  return m ? { id: m[1], task: Number(m[2]) as 1 | 2 | 3 } : null;
}

export function toWritingTask(c: Combinaison, task: 1 | 2 | 3): WritingTask {
  const t = c.content.tasks[task - 1];
  const l = TASK_LIMITS[task];
  return {
    id: combiTaskId(c.id, task),
    task,
    title: `${l.title} (${MONTHS[c.content.month - 1]} ${c.content.year})`,
    prompt: t.prompt,
    documents: t.documents?.length ? t.documents : undefined,
    minWords: l.minWords,
    maxWords: l.maxWords,
    minutes: l.minutes,
  };
}

export function isCombinaison(content: unknown): content is CombinaisonContent {
  const c = content as CombinaisonContent | null;
  return Boolean(c && c.kind === 'combinaison' && Number.isInteger(c.year) && c.month >= 1 && c.month <= 12 && Array.isArray(c.tasks) && c.tasks.length === 3);
}

/** Team sets built from the platform's own original subjects (not tied to an exam session). */
export const teamCombinaisons = [0, 1, 2, 3].map((i) => {
  const pick = (n: 1 | 2 | 3) => writingTasks.filter((t) => t.task === n)[i];
  return { id: `equipe-${i + 1}`, tasks: [pick(1), pick(2), pick(3)] as const };
});
