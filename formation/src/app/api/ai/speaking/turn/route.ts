import { speakingTasks } from '@/content/expression';
import { errorResponse } from '@/lib/ai/access';
import { MAX_TURNS, parseTurns, verifyTicket } from '@/lib/ai/interaction';
import { runExamOperation } from '@/lib/ai/exams';
import { transcribe } from '@/lib/ai/huggingface';
import { chat, MODELS } from '@/lib/ai/openrouter';
import { partnerPrompt } from '@/lib/ai/prompts';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_BYTES = 1.5 * 1024 * 1024;

/** One turn of the interaction: transcribes the candidate, then the AI partner answers. */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const task = speakingTasks.find((t) => t.id === form.get('taskId') && t.mode === 'interaction');
    if (!task?.partner) return Response.json({ error: 'Sujet inconnu.' }, { status: 422 });
    const access = await verifyTicket(form.get('ticket'), task.id);

    const history = parseTurns(form.get('history'));
    if (history.length >= MAX_TURNS) return Response.json({ error: 'L’échange est terminé.' }, { status: 422 });
    const audio = form.get('audio');
    if (!(audio instanceof Blob) || audio.size < 1000) return Response.json({ error: 'Réplique vide. Parlez puis envoyez.' }, { status: 422 });
    if (audio.size > MAX_BYTES) return Response.json({ error: 'Réplique trop longue. Faites des phrases plus courtes.' }, { status: 413 });

    const respond = async () => {
      const transcript = (await transcribe(await audio.arrayBuffer(), audio.type.split(';')[0])).slice(0, 800);
      if (!transcript.split(/\s+/).filter(Boolean).length) {
        throw new Error('Aucun son détecté.');
      }
      if (form.get('final') === '1') return { transcript, reply: null };

      const reply = (await chat(MODELS.fast(), partnerPrompt(task, [...history, { who: 'candidate', text: transcript }]), { maxTokens: 220, temperature: 0.6 }))
        .trim().slice(0, 600);
      return { transcript, reply };
    };
    return Response.json(access.examSessionId
      ? await runExamOperation(access.examSessionId, 'speaking', task.id, respond, history.filter((t) => t.who === 'candidate').length)
      : await respond());
  } catch (error) {
    return errorResponse(error);
  }
}
