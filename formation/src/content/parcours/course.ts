import { allSeries, SERIES_SECONDS } from '@/content/series';
import { lessonId, modules } from '.';

/*
 * The learning path laid out as a course: numbered modules, each a list of
 * items (lesson, graded exercise, AI simulation, mock exam) in the order to
 * follow. Pure data, shared by the server pages and the progress widgets.
 */

export type ItemKind = 'lecon' | 'exercice' | 'simulation' | 'examen';

export interface CourseItem {
  id: string;
  kind: ItemKind;
  title: string;
  minutes: number;
  href: string;
  /** Completed automatically by the platform (series, mock exam) or by the candidate. */
  auto?: boolean;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  summary: string;
  items: CourseItem[];
}


const writingTasks = [
  { n: 1, title: 'Rédiger la tâche 1 : un message', minutes: 15 },
  { n: 2, title: 'Rédiger la tâche 2 : un récit', minutes: 25 },
  { n: 3, title: 'Rédiger la tâche 3 : un texte argumenté', minutes: 35 },
];
const speakingTasks = [
  { n: 1, title: 'Tâche 1 orale : se présenter', minutes: 8 },
  { n: 2, title: 'Tâche 2 orale : l’échange avec l’IA', minutes: 12 },
  { n: 3, title: 'Tâche 3 orale : défendre un point de vue', minutes: 10 },
];

export const course: CourseModule[] = [
  {
    id: 'depart',
    number: 1,
    title: 'Bien démarrer',
    summary: 'Mesurez votre niveau de départ et découvrez le déroulement de l’examen.',
    items: [
      { id: 'test-niveau', kind: 'exercice', title: 'Test de niveau gratuit', minutes: 10, href: '/test-de-niveau/', auto: true },
    ],
  },
  ...modules.map((m, i): CourseModule => {
    const series = allSeries.filter((s) => s.epreuve === m.id);
    const practice: CourseItem[] =
      m.id === 'ee'
        ? writingTasks.map((t) => ({ id: `ee/simulation-${t.n}`, kind: 'simulation', title: t.title, minutes: t.minutes, href: `/epreuve/${m.slug}/simulateur/` }))
        : m.id === 'eo'
          ? speakingTasks.map((t) => ({ id: `eo/simulation-${t.n}`, kind: 'simulation', title: t.title, minutes: t.minutes, href: `/epreuve/${m.slug}/simulateur/` }))
          : series.map((s) => ({
            id: `serie:${s.epreuve}-${s.number}`,
            kind: 'exercice',
            title: `Série ${s.number} : ${s.questions.length} questions`,
            minutes: SERIES_SECONDS[s.epreuve] / 60,
            href: `/epreuve/${m.slug}/series/${s.number}/`,
            auto: true,
          }));
    return {
      id: m.id,
      number: i + 2,
      title: m.name,
      summary: m.intro,
      items: [
        ...m.lessons.map((l): CourseItem => ({
          id: lessonId(m, l),
          kind: 'lecon',
          title: l.title,
          minutes: l.minutes + 3,
          href: `/epreuve/${m.slug}/methodologie/${l.slug}/`,
        })),
        ...practice,
      ],
    };
  }),
  {
    id: 'examen',
    number: modules.length + 2,
    title: 'Examen blanc',
    summary: 'Les trois épreuves écrites enchaînées et chronométrées, comme le jour J.',
    items: [
      { id: 'examen-blanc', kind: 'examen', title: 'Examen blanc complet', minutes: 155, href: '/examen-blanc/', auto: true },
    ],
  },
];

export const courseItems = course.flatMap((m) => m.items);

export const courseMinutes = courseItems.reduce((n, it) => n + it.minutes, 0);

/** Module and position of an item, and the item that follows it in the course. */
export function locateItem(id: string) {
  const index = courseItems.findIndex((it) => it.id === id);
  if (index < 0) return null;
  const mod = course.find((m) => m.items.some((it) => it.id === id))!;
  return { item: courseItems[index], module: mod, next: courseItems[index + 1] ?? null };
}
