import licensed from './licence/sujets-oraux.json';
import type { SpeakingTask } from './expression';

/**
 * Speaking subjects of the exam sessions, month by month (tasks 2 and 3), under the
 * TCF Canada Ltd licence (contract of 23 October 2026), 2023 to 2026, newest first.
 * c2 and c3: sample answer of each subject, same order as t2 and t3 ('' when none).
 */
export interface OralMonth { year: number; month: number; t2: string[]; t3: string[]; c2?: string[]; c3?: string[] }

export const oralMonths = licensed as OralMonth[];

export const getOralMonth = (year: number, month: number) => oralMonths.find((m) => m.year === year && m.month === month);

const MONTH_NAMES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** Simulator id of a session subject, e.g. `eo:2026-11:3:4` (task 3, fifth subject). */
export const sessionSpeakingId = (year: number, month: number, task: 2 | 3, index: number) =>
  `eo:${year}-${String(month).padStart(2, '0')}:${task}:${index}`;

/**
 * A session subject as a simulator task. Task 2 has no partner sheet in the sessions:
 * the AI partner invents consistent, realistic answers from the situation.
 */
export function findSessionSpeakingTask(id: unknown): SpeakingTask | undefined {
  const m = typeof id === 'string' ? /^eo:(\d{4})-(\d{2}):([23]):(\d{1,3})$/.exec(id) : null;
  if (!m) return undefined;
  const [year, month, task, index] = [Number(m[1]), Number(m[2]), Number(m[3]) as 2 | 3, Number(m[4])];
  const oral = getOralMonth(year, month);
  const prompt = oral?.[task === 2 ? 't2' : 't3'][index];
  if (!prompt) return undefined;
  const when = `session de ${MONTH_NAMES[month - 1]} ${year}`;
  return task === 2
    ? {
      id: id as string, task: 2, title: `Tâche 2 : obtenir des informations (${when})`, prompt, mode: 'interaction', seconds: 210, prepSeconds: 120,
      tips: [
        'Pendant les 2 minutes de préparation, notez les questions à poser.',
        'Saluez, présentez-vous et expliquez la raison de votre appel.',
        'Variez les formes de questions et réagissez aux réponses.',
      ],
      partner: {
        role: 'la personne à qui le candidat s’adresse dans cette situation',
        opening: 'Bonjour, je vous écoute.',
        facts: 'Aucune fiche n’est fournie pour ce sujet : invente des informations précises et réalistes, cohérentes avec la situation (prix, horaires, lieux, conditions), et garde-les identiques pendant tout l’échange.',
      },
    }
    : {
      id: id as string, task: 3, title: `Tâche 3 : exprimer un point de vue (${when})`, prompt, mode: 'monologue', seconds: 270,
      tips: ['Annoncez clairement votre position.', 'Donnez au moins deux arguments illustrés, puis une nuance.'],
    };
}
