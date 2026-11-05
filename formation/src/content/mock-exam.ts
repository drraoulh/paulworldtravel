import { writingTasks, speakingTasks } from './expression';

/** Shared by the browser and server so an exam credit only covers its six subjects. */
export const mockWritingTasks = (serie: number) => ([1, 2, 3] as const).map((n) => {
  const list = writingTasks.filter((t) => t.task === n);
  return list[(serie - 1) % list.length];
});
export const mockSpeakingTasks = (serie: number) => ([1, 2, 3] as const).map((n) => {
  const list = speakingTasks.filter((t) => t.task === n);
  return list[(serie - 1) % list.length];
});
