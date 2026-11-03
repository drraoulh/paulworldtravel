import 'server-only';
import { cache } from 'react';
import { modules as defaults, type Module } from '@/content/parcours';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';
import { validateLesson, lessonKeyValid } from '@/lib/admin/lesson-validation';
export type Publication = { id: string; content: unknown; revision: number; archived: boolean; published_at: string };
/** Only the published table is read here. Drafts never enter a learner response. */
export const publishedModules = cache(async (): Promise<Module[]> => {
  if (!supabaseConfigured) return defaults;
  const supabase = await createClient();
  const { data, error } = await supabase.from('lesson_publications').select('id,content,archived').limit(1000);
  if (error || !data) { if (error) console.error('Published lessons unavailable:', error.code); return defaults; }
  return defaults.map((m) => {
    const lessons = new Map(m.lessons.map((l) => [l.slug, l]));
    for (const row of data) {
      if (!lessonKeyValid(row.id) || !row.id.startsWith(`${m.id}/`)) continue;
      const slug = row.id.slice(m.id.length + 1);
      if (row.archived) { lessons.delete(slug); continue; }
      const checked = validateLesson(row.content);
      if (checked.lesson && checked.lesson.slug === slug) lessons.set(slug, checked.lesson);
    }
    return { ...m, lessons: [...lessons.values()] };
  });
});
export async function publishedLesson(moduleSlug: string, slug: string) {
  const trainingModule = (await publishedModules()).find((m) => m.slug === moduleSlug);
  const index = trainingModule?.lessons.findIndex((l) => l.slug === slug) ?? -1;
  return trainingModule && index >= 0 ? { module: trainingModule, lesson: trainingModule.lessons[index], index } : null;
}
