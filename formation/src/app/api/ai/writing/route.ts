import { writingTasks, wordCount } from '@/content/expression';
import { checkAccess, errorResponse } from '@/lib/ai/access';
import { aiConfigured, chat, MODELS, parseJson } from '@/lib/ai/openrouter';
import { cleanFeedback, writingPrompt, type Feedback } from '@/lib/ai/prompts';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    if (!aiConfigured()) return Response.json({ error: 'La correction automatique n’est pas encore activée.' }, { status: 503 });
    const body = await request.json().catch(() => ({}));
    const task = writingTasks.find((t) => t.id === body.taskId);
    const text = String(body.text ?? '').trim().slice(0, 6000);
    const words = wordCount(text);
    if (!task) return Response.json({ error: 'Sujet inconnu.' }, { status: 422 });
    if (words < 20) return Response.json({ error: 'Écrivez au moins 20 mots avant de demander une correction.' }, { status: 422 });

    const access = await checkAccess('writing');
    const answer = await chat(MODELS.grading(), writingPrompt(task, text, words), { json: true, maxTokens: 3000 });
    const feedback = cleanFeedback(parseJson<Partial<Feedback>>(answer));

    await access.record();
    const { data, error } = await access.admin
      .from('submissions')
      .insert({
        user_id: access.user.id, kind: 'ee', task_id: task.id, task_prompt: task.prompt,
        content: text, word_count: words, ai_score: feedback.score, ai_feedback: feedback,
      })
      .select('id')
      .single();
    if (error) console.error('Saving submission failed', error);

    return Response.json({ id: data?.id ?? null, feedback, remaining: access.remaining, plan: access.plan });
  } catch (error) {
    return errorResponse(error);
  }
}
