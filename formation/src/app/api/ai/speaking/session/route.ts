import { speakingTasks } from '@/content/expression';
import { findMockSpeakingTask } from '@/content/mock-exam';
import { checkAccess, errorResponse } from '@/lib/ai/access';
import { examAccess } from '@/lib/ai/exams';
import { issueTicket } from '@/lib/ai/interaction';
import { aiConfigured } from '@/lib/ai/openrouter';
import { transcriptionConfigured } from '@/lib/ai/huggingface';

export const runtime = 'nodejs';

/** Starts an interaction (speaking task 2): charges one speaking correction. */
export async function POST(request: Request) {
  try {
    if (!aiConfigured() || !transcriptionConfigured()) {
      return Response.json({ error: 'La correction de l’oral n’est pas encore activée.' }, { status: 503 });
    }
    const body = await request.json().catch(() => ({}));
    const task = [...speakingTasks, findMockSpeakingTask(body.taskId)].find((t) => t && t.id === body.taskId && t.mode === 'interaction');
    if (!task) return Response.json({ error: 'Sujet inconnu.' }, { status: 422 });

    if (body.examSessionId !== undefined) {
      const access = await examAccess(body.examSessionId, 'speaking', task.id);
      return Response.json({ ticket: issueTicket(access.user.id, task.id, access.session.id), remaining: null, plan: access.plan });
    }
    const access = await checkAccess('speaking');
    const ticket = issueTicket(access.user.id, task.id);
    await access.record();
    return Response.json({ ticket, remaining: access.remaining, plan: access.plan });
  } catch (error) {
    return errorResponse(error);
  }
}
