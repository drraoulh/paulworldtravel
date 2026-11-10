import { startExam } from '@/lib/ai/exams';
import { errorResponse } from '@/lib/ai/access';
import { aiConfigured } from '@/lib/ai/openrouter';
import { transcriptionConfigured } from '@/lib/ai/huggingface';
import { getSeries } from '@/content/series/catalog';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    if (!aiConfigured() || !transcriptionConfigured()) return Response.json({ error: 'Les corrections IA de l’examen blanc ne sont pas encore activées.' }, { status: 503 });
    const body = await request.json().catch(() => ({}));
    const serie = Number(body.serie);
    if (!Number.isInteger(serie) || serie < 1 || !getSeries('co', serie) || !getSeries('ce', serie)) return Response.json({ error: 'Examen blanc inconnu.' }, { status: 422 });
    const session = await startExam(serie, body.requestId);
    return Response.json({ sessionId: session.id, expiresAt: session.expires_at });
  } catch (error) { return errorResponse(error); }
}
