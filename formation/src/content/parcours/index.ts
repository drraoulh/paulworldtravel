import { co } from './co';
import { ce } from './ce';
import { ee } from './ee';
import { eo } from './eo';
import type { Lesson, Module } from './types';

export type { Lesson, Module, QuizQuestion } from './types';

/** Learning path: one module per test, in the order of the exam day. */
export const modules: Module[] = [co, ce, ee, eo];

export const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);

export const getModule = (slug: string) => modules.find((m) => m.slug === slug);

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModule(moduleSlug);
  const index = mod?.lessons.findIndex((l) => l.slug === lessonSlug) ?? -1;
  if (!mod || index < 0) return null;
  return { module: mod, lesson: mod.lessons[index], index, prev: mod.lessons[index - 1], next: mod.lessons[index + 1] };
}

/** Stable id used to remember completed lessons. */
export const lessonId = (mod: Module, lesson: Lesson) => `${mod.id}/${lesson.slug}`;

/** Suggested six-week plan. Lesson references are `module/lesson`. */
export const weeklyPlan: { week: number; focus: string; tasks: string[] }[] = [
  {
    week: 1,
    focus: 'Faire le point et comprendre l’examen',
    tasks: ['Passer le test de niveau gratuit.', 'Lire la première leçon de chaque module.', 'Faire la série de lecture et la série d’écoute une première fois.'],
  },
  {
    week: 2,
    focus: 'Les compréhensions : méthode',
    tasks: ['Leçons 2 et 3 de compréhension orale et écrite.', '15 minutes d’écoute de radio francophone par jour.', 'Refaire les séries en mode chronométré.'],
  },
  {
    week: 3,
    focus: 'Expression écrite : tâches 1 et 2',
    tasks: ['Leçons sur la tâche 1 et la tâche 2.', 'Rédiger deux messages et deux récits, corrigés par l’IA.', 'Noter vos erreurs fréquentes dans un carnet.'],
  },
  {
    week: 4,
    focus: 'Expression orale : tâches 1 et 2',
    tasks: ['Leçons sur la tâche 1 et la tâche 2 orales.', 'Enregistrer votre présentation et la corriger.', 'Simuler la tâche 2 avec l’interlocuteur IA.'],
  },
  {
    week: 5,
    focus: 'Les tâches 3 : argumenter',
    tasks: ['Leçons sur les tâches 3 écrite et orale.', 'Deux textes argumentés et deux points de vue oraux corrigés.', 'Leçons 4 et 5 des compréhensions.'],
  },
  {
    week: 6,
    focus: 'Conditions réelles',
    tasks: ['Relire les leçons « Relire et corriger » et « Aisance ».', 'Refaire toutes les séries chronométrées.', 'Faire relire vos meilleures productions par votre formateur.'],
  },
];
