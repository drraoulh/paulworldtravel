import { checkAccess, errorResponse } from '@/lib/ai/access';
import { aiConfigured, chat, MODELS, parseJson } from '@/lib/ai/openrouter';
import { generationPrompt } from '@/lib/ai/prompts';

export const runtime = 'nodejs';
export const maxDuration = 60;

type Item = { title: string; document: string; questions: { prompt: string; choices: string[]; answer: number; explanation: string }[] };

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export async function POST(request: Request) {
  try {
    if (!aiConfigured()) return Response.json({ error: 'La génération n’est pas encore activée.' }, { status: 503 });
    const body = await request.json().catch(() => ({}));
    const epreuve = body.epreuve === 'co' ? 'co' : 'ce';
    const level = LEVELS.includes(body.level) ? body.level : 'B1';
    const theme = String(body.theme ?? '').slice(0, 120);
    const count = Math.max(1, Math.min(5, Number(body.count) || 3));

    const access = await checkAccess('generate');
    const answer = await chat(MODELS.fast(), generationPrompt(epreuve, level, theme, count), { json: true, maxTokens: 4000, temperature: 0.7 });
    const items = (parseJson<{ items: Item[] }>(answer).items ?? [])
      .filter((i) => i?.document && Array.isArray(i.questions))
      .map((i) => ({
        title: String(i.title ?? '').slice(0, 120),
        document: String(i.document).slice(0, 4000),
        questions: i.questions.slice(0, 4).filter((q) => Array.isArray(q.choices) && q.choices.length === 4 && q.answer >= 0 && q.answer < 4),
      }))
      .filter((i) => i.questions.length > 0);
    if (items.length === 0) return Response.json({ error: 'La génération n’a rien donné d’exploitable. Réessayez.' }, { status: 502 });

    await access.record();
    const { error } = await access.admin.from('question_drafts').insert(
      items.map((content) => ({ created_by: access.user.id, epreuve, level, theme: theme || null, content }))
    );
    if (error) throw error;
    return Response.json({ created: items.length });
  } catch (error) {
    return errorResponse(error);
  }
}
