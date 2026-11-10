import { accessStatus } from '@/lib/ai/access';
import { getSeries } from '@/content/series/catalog';
import { mockSpeakingTasks, mockWritingTasks } from '@/content/mock-exam';

// The four tests of mock exam n, for candidates with an active pack (and the staff).
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ numero: string }> }) {
  try {
    const status = await accessStatus();
    if (!status) return Response.json({ error: 'Connectez-vous pour passer un examen blanc.' }, { status: 401 });
    if (!status.aiAllowed) return Response.json({ error: 'L’examen blanc nécessite un pack actif.' }, { status: 403 });
    const numero = Number((await params).numero);
    const co = Number.isInteger(numero) ? getSeries('co', numero) : undefined;
    const ce = Number.isInteger(numero) ? getSeries('ce', numero) : undefined;
    if (!co || !ce) return Response.json({ error: 'Examen blanc inconnu.' }, { status: 404 });
    return Response.json(
      { co: co.questions, ce: ce.questions, writing: mockWritingTasks(numero), speaking: mockSpeakingTasks(numero) },
      { headers: { 'cache-control': 'private, no-store' } },
    );
  } catch (error) {
    console.error('Loading a mock exam failed', error);
    return Response.json({ error: 'L’examen n’a pas pu être chargé. Réessayez dans un instant.' }, { status: 500 });
  }
}
