/*
 * Writing and speaking subjects of mock exam n: the n-th licensed writing combination
 * and speaking subjects (newest sessions first). Server side only (large data files):
 * the browser receives them from /api/examen/[numero]/.
 */
import 'server-only';
import type { SpeakingTask, WritingTask } from './expression';
import { sessionCombinaisons } from './combinaisons-sessions';
import { oralMonths } from './sujets-oraux';
import { toWritingTask } from '@/lib/combinaisons';

const at = <T,>(list: T[], serie: number) => list[(Math.max(1, serie) - 1) % list.length];

export const mockWritingTasks = (serie: number): WritingTask[] => {
  const c = at(sessionCombinaisons, serie);
  return ([1, 2, 3] as const).map((n) => toWritingTask(c, n));
};

const t2 = oralMonths.flatMap((m) => m.t2);
const t3 = oralMonths.flatMap((m) => m.t3);

export const mockSpeakingTasks = (serie: number): SpeakingTask[] => {
  const interaction = at(t2, serie);
  return [
    {
      id: `examen:${serie}:1`,
      task: 1,
      title: 'Tâche 1 : entretien dirigé',
      prompt: 'Présentez-vous : votre parcours, votre travail ou vos études, votre famille, vos loisirs et votre projet au Canada.',
      tips: ['Parlez de vous au présent, au passé et au futur.', 'Donnez des détails concrets plutôt qu’une liste.'],
      seconds: 120,
      mode: 'monologue',
    },
    {
      id: `examen:${serie}:2`,
      task: 2,
      title: 'Tâche 2 : exercice en interaction',
      prompt: interaction,
      tips: ['Pendant les 2 minutes de préparation, notez les questions à poser.', 'Saluez, expliquez votre situation, puis posez vos questions.', 'Réagissez aux réponses et demandez des précisions.'],
      seconds: 210,
      mode: 'interaction',
      prepSeconds: 120,
      partner: {
        role: 'la personne décrite dans le sujet (celle qui dit « je »)',
        opening: 'Bonjour ! Je vous écoute.',
        facts: `Situation de l’examen : « ${interaction} » Répondez aux questions du candidat avec des informations réalistes et cohérentes avec cette situation ; inventez les détails nécessaires (prix, horaires, lieux) et gardez-les identiques jusqu’à la fin.`,
      },
    },
    {
      id: `examen:${serie}:3`,
      task: 3,
      title: 'Tâche 3 : expression d’un point de vue',
      prompt: at(t3, serie),
      tips: ['Annoncez clairement votre position.', 'Donnez au moins deux arguments illustrés d’exemples, puis une nuance.'],
      seconds: 270,
      mode: 'monologue',
    },
  ];
};

/** Speaking task of a mock exam from its id (« examen:12:2 »). */
export const findMockSpeakingTask = (id: unknown): SpeakingTask | undefined => {
  const m = typeof id === 'string' ? /^examen:(\d{1,3}):([123])$/.exec(id) : null;
  return m ? mockSpeakingTasks(Number(m[1]))[Number(m[2]) - 1] : undefined;
};
