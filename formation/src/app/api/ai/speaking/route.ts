import { speakingTasks } from '@/content/expression';
import { checkAccess, errorResponse } from '@/lib/ai/access';
import { transcribe, transcriptionConfigured } from '@/lib/ai/huggingface';
import { aiConfigured, chat, MODELS, parseJson } from '@/lib/ai/openrouter';
import { cleanFeedback, dialogueText, interactionPrompt, speakingPrompt } from '@/lib/ai/prompts';
import { parseTurns, verifyTicket } from '@/lib/ai/interaction';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    if (!aiConfigured() || !transcriptionConfigured()) {
      return Response.json({ error: 'La correction de l’oral n’est pas encore activée.' }, { status: 503 });
    }
    if (request.headers.get('content-type')?.includes('application/json')) return await gradeInteraction(request);
    const form = await request.formData();
    const task = speakingTasks.find((t) => t.id === form.get('taskId') && t.mode === 'monologue');
    const audio = form.get('audio');
    const seconds = Math.max(0, Math.min(600, Math.round(Number(form.get('seconds')) || 0)));
    if (!task) return Response.json({ error: 'Sujet inconnu.' }, { status: 422 });
    if (!(audio instanceof Blob) || audio.size < 2000) return Response.json({ error: 'Enregistrement vide ou trop court.' }, { status: 422 });
    if (audio.size > MAX_BYTES) return Response.json({ error: 'Enregistrement trop lourd. Réessayez avec un enregistrement plus court.' }, { status: 413 });

    const access = await checkAccess('speaking');
    const transcript = await transcribe(await audio.arrayBuffer(), audio.type.split(';')[0]);
    if (transcript.split(/\s+/).filter(Boolean).length < 8) {
      return Response.json({ error: 'Nous n’avons presque rien entendu. Vérifiez votre micro et parlez plus près de l’appareil.', transcript }, { status: 422 });
    }
    const answer = await chat(MODELS.grading(), speakingPrompt(task, transcript, seconds), { json: true, maxTokens: 3000 });
    const feedback = cleanFeedback(parseJson(answer), 'eo');

    await access.record();
    const { data, error } = await access.admin
      .from('submissions')
      .insert({
        user_id: access.user.id, kind: 'eo', task_id: task.id, task_prompt: task.prompt,
        transcript, duration_seconds: seconds, ai_score: feedback.score, ai_feedback: feedback,
      })
      .select('id')
      .single();
    if (error) console.error('Saving submission failed', error);

    return Response.json({ id: data?.id ?? null, transcript, feedback, remaining: access.remaining, plan: access.plan });
  } catch (error) {
    return errorResponse(error);
  }
}

/** Grades a finished interaction (task 2). Already charged when it started. */
async function gradeInteraction(request: Request) {
  const body = await request.json().catch(() => ({}));
  const task = speakingTasks.find((t) => t.id === body.taskId && t.mode === 'interaction');
  if (!task) return Response.json({ error: 'Sujet inconnu.' }, { status: 422 });
  const { user, admin } = await verifyTicket(body.ticket, task.id);
  const turns = parseTurns(body.turns);
  const seconds = Math.max(0, Math.min(600, Math.round(Number(body.seconds) || 0)));
  const words = turns.filter((t) => t.who === 'candidate').map((t) => t.text).join(' ').split(/\s+/).filter(Boolean).length;
  if (words < 8) return Response.json({ error: 'L’échange est trop court pour être corrigé. Posez plusieurs questions.' }, { status: 422 });

  const answer = await chat(MODELS.grading(), interactionPrompt(task, turns, seconds), { json: true, maxTokens: 3000 });
  const feedback = cleanFeedback(parseJson(answer), 'interaction');
  const transcript = dialogueText(turns);
  const { data, error } = await admin
    .from('submissions')
    .insert({
      user_id: user.id, kind: 'eo', task_id: task.id, task_prompt: task.prompt,
      transcript, duration_seconds: seconds, ai_score: feedback.score, ai_feedback: feedback,
    })
    .select('id')
    .single();
  if (error) console.error('Saving submission failed', error);
  return Response.json({ id: data?.id ?? null, transcript, feedback });
}
