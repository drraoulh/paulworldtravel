import { checkAccess, errorResponse } from '@/lib/ai/access';
import { aiConfigured, chat, MODELS, type ChatMessage } from '@/lib/ai/openrouter';
import { TUTOR_SYSTEM } from '@/lib/ai/prompts';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    if (!aiConfigured()) return Response.json({ error: 'Le tuteur n’est pas encore activé.' }, { status: 503 });
    const body = await request.json().catch(() => ({}));
    const history: ChatMessage[] = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m: ChatMessage) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string')
      .slice(-10)
      .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, 2000) }));
    if (history.length === 0 || history[history.length - 1].role !== 'user') {
      return Response.json({ error: 'Posez votre question.' }, { status: 422 });
    }

    const access = await checkAccess('tutor');
    const reply = await chat(MODELS.fast(), [{ role: 'system', content: TUTOR_SYSTEM }, ...history], { maxTokens: 700, temperature: 0.4 });
    await access.record();
    return Response.json({ reply: reply.trim(), remaining: access.remaining, plan: access.plan });
  } catch (error) {
    return errorResponse(error);
  }
}
