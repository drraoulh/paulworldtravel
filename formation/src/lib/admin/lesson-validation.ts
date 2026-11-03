import type { Lesson } from '@/content/parcours/types';
type Obj = Record<string, unknown>;
const obj = (v: unknown): v is Obj => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown, max: number) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
const list = (v: unknown, max: number, length: number) => Array.isArray(v) && v.length <= max && v.every((s) => text(s, length));
export const lessonKeyValid = (id: string) => /^(co|ce|ee|eo)\/(?!simulation-)[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && id.length <= 90;
export function validateLesson(raw: unknown): { lesson: Lesson; error?: never } | { error: string; lesson?: never } {
  if (!obj(raw)) return { error: 'Le contenu de la leçon est invalide.' };
  if (!text(raw.slug, 80) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(raw.slug))) return { error: 'Utilisez une adresse composée de lettres minuscules, chiffres et tirets.' };
  if (!text(raw.title, 180) || !text(raw.goal, 1000)) return { error: 'Renseignez le titre et l’objectif de la leçon.' };
  if (!Number.isInteger(raw.minutes) || Number(raw.minutes) < 1 || Number(raw.minutes) > 180) return { error: 'La durée doit être comprise entre 1 et 180 minutes.' };
  if (!Array.isArray(raw.sections) || raw.sections.length < 1 || raw.sections.length > 30 || raw.sections.some((s) => !obj(s) || !text(s.heading, 200) || (s.paragraphs !== undefined && !list(s.paragraphs, 30, 12000)) || (s.list !== undefined && !list(s.list, 50, 2000)) || !(Array.isArray(s.paragraphs) && s.paragraphs.length || Array.isArray(s.list) && s.list.length))) return { error: 'Ajoutez au moins une section avec un titre et du texte ou une liste.' };
  if (!Array.isArray(raw.quiz) || raw.quiz.length < 1 || raw.quiz.length > 20) return { error: 'Le quiz doit contenir entre 1 et 20 questions.' };
  for (const [i, q] of raw.quiz.entries()) {
    if (!obj(q) || !text(q.prompt, 2000) || !Array.isArray(q.choices) || q.choices.length !== 4 || !q.choices.every((c) => text(c, 1000)) || new Set(q.choices.map((c) => String(c).trim())).size !== 4 || !Number.isInteger(q.answer) || Number(q.answer) < 0 || Number(q.answer) > 3 || !text(q.explanation, 4000)) return { error: `Question ${i + 1} : indiquez une consigne, quatre réponses différentes, la bonne réponse et une explication.` };
  }
  if (raw.model !== undefined && (!obj(raw.model) || !text(raw.model.title, 200) || !text(raw.model.text, 20000) || (raw.model.note !== undefined && !text(raw.model.note, 5000)))) return { error: 'Vérifiez le titre, le texte et le commentaire du modèle.' };
  if (raw.phrases !== undefined && (!obj(raw.phrases) || !text(raw.phrases.heading, 200) || !list(raw.phrases.items, 50, 2000))) return { error: 'Vérifiez les expressions utiles.' };
  if (raw.pitfalls !== undefined && !list(raw.pitfalls, 50, 2000)) return { error: 'Vérifiez la liste des erreurs à éviter.' };
  if (raw.practice !== undefined && (!obj(raw.practice) || !text(raw.practice.label, 200) || typeof raw.practice.href !== 'string' || !/^\/[a-z0-9][a-z0-9/?=&%-]*$/i.test(raw.practice.href))) return { error: 'Le lien de mise en pratique doit pointer vers une page du site.' };
  return { lesson: raw as unknown as Lesson };
}
