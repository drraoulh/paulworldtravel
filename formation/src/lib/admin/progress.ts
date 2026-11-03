import { normalizeProgress } from '@/lib/progress-merge';
import { completionId, lessonIsRead } from '@/lib/lesson-progress';
import type { CourseModule } from '@/content/parcours/course';
export function progressSummary(raw: unknown, course: CourseModule[]) {
  const p = normalizeProgress(raw);
  const done = (id: string) => id === 'examen-blanc' ? p.results.mocks.length > 0 : id.startsWith('serie:') ? !!p.results.series[id.slice(6)] : p.done.includes(completionId(id));
  const items = course.flatMap((m) => m.items);
  const count = items.filter((it) => done(it.id)).length;
  const lessons = items.filter((it) => it.kind === 'lecon' && it.id !== 'guide');
  const modules = course.map((m) => ({ id: m.id, title: m.title, done: m.items.filter((it) => done(it.id)).length, total: m.items.length }));
  return { percent: items.length ? Math.round(count / items.length * 100) : 0, done: count, total: items.length, read: lessons.filter((it) => lessonIsRead(p.done, it.id)).length, quizzes: lessons.filter((it) => done(it.id)).length, lessonCount: lessons.length, series: Object.keys(p.results.series).length, mocks: p.results.mocks.length, lastDay: [...p.meta.days].sort().at(-1) ?? null, modules, progress: p, isDone: done };
}
