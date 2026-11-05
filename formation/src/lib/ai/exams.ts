import { requireAiEntitlement, examAllowance, AccessError, type Plan } from './access';
import { effectiveStatus } from '@/lib/enrollment';
import { mockWritingTasks, mockSpeakingTasks } from '@/content/mock-exam';

type Account = Awaited<ReturnType<typeof requireAiEntitlement>>;
export type CorrectionAccess = Pick<Account, 'admin' | 'user'> & {
  plan: Plan; remaining: number | null; record: () => PromiseLike<unknown>;
};
export interface ExamSession { id: string; serie: number; enrollment_id: string | null; expires_at: string }
const uuid = (value: unknown): value is string => typeof value === 'string' && /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(value);

export async function startExam(serie: number, requestId: unknown) {
  const account = await requireAiEntitlement();
  if (!uuid(requestId)) throw new AccessError(422, 'Demande d’examen invalide.');
  const allowance = examAllowance(account);
  if (account.plan !== 'staff' && !allowance.enrollmentId) throw new AccessError(503, 'Impossible de vérifier votre pack.');
  const { data, error } = await account.admin.rpc('start_ai_exam', {
    p_user_id: account.user.id, p_enrollment_id: allowance.enrollmentId,
    p_serie: serie, p_limit: allowance.limit, p_request_id: requestId,
  });
  if (error) {
    if (error.message.includes('exam_quota_exhausted')) throw new AccessError(429, 'Tous les examens blancs corrigés de votre pack ont été utilisés. Vos entraînements restent disponibles selon leurs quotas.');
    if (error.message.includes('expired_exam')) throw new AccessError(410, 'Cet examen a expiré. Lancez un nouvel examen blanc.');
    throw new AccessError(503, 'Impossible de réserver cet examen. Réessayez.');
  }
  if (!data?.id) throw new AccessError(503, 'Impossible de réserver cet examen.');
  return data as ExamSession;
}

export async function examAccess(sessionId: unknown, feature: 'writing' | 'speaking', taskId: string) {
  const account = await requireAiEntitlement();
  if (!uuid(sessionId)) throw new AccessError(403, 'Examen blanc invalide.');
  const { data, error } = await account.admin.from('ai_exam_sessions').select('id,serie,enrollment_id,expires_at')
    .eq('id', sessionId).eq('user_id', account.user.id).single();
  if (error || !data) throw new AccessError(403, 'Examen blanc introuvable pour votre compte.');
  if (Date.parse(data.expires_at) <= Date.now()) throw new AccessError(410, 'Les corrections de cet examen ont expiré après 24 heures.');
  if (account.plan !== 'staff') {
    // Another active pack must not resurrect credits from a revoked/expired enrollment.
    const { data: enrollment, error: enrollmentError } = await account.admin.from('enrollments')
      .select('id,status,starts_at,ends_at').eq('id', data.enrollment_id).eq('user_id', account.user.id).single();
    if (enrollmentError || !enrollment || effectiveStatus(enrollment) !== 'active') throw new AccessError(403, 'Le pack associé à cet examen n’est plus actif.');
  }
  const tasks = feature === 'writing' ? mockWritingTasks(data.serie) : mockSpeakingTasks(data.serie);
  if (!tasks.some((t) => t.id === taskId)) throw new AccessError(403, 'Ce sujet ne fait pas partie de cet examen blanc.');
  return { ...account, session: data as ExamSession };
}

/** Six correction slots and at most 12 dialogue turns. Cached results prevent duplicate billing. */
export async function runExamOperation(sessionId: unknown, feature: 'writing' | 'speaking', taskId: string, action: (access: CorrectionAccess) => Promise<Record<string, unknown>>, turn?: number) {
  const access = await examAccess(sessionId, feature, taskId);
  if (turn !== undefined && (!Number.isInteger(turn) || turn < 0 || turn >= 12)) throw new AccessError(422, 'Les 12 répliques de cet échange ont été utilisées. Faites corriger votre échange.');
  const operation = turn === undefined ? `grade:${feature}:${taskId}` : `turn:${taskId}:${turn}`;
  const { data, error } = await access.admin.rpc('claim_ai_exam_operation', { p_session_id: access.session.id, p_operation: operation });
  if (error) {
    if (error.message.includes('operation_busy')) throw new AccessError(409, 'Cette correction est déjà en cours. Patientez avant de réessayer.');
    if (error.message.includes('operation_attempts_exhausted')) throw new AccessError(429, 'Les deux tentatives de cette tâche ont été utilisées. Contactez votre formateur si le problème persiste.');
    throw new AccessError(503, 'Impossible de préparer la correction.');
  }
  if (data?.state === 'done') return data.result as Record<string, unknown>;
  if (!data?.lease_id) throw new AccessError(503, 'Impossible de préparer la correction.');
  try {
    const result = await action({ ...access, remaining: null, record: () => Promise.resolve() });
    const saved = await access.admin.from('ai_exam_operations').update({ state: 'done', result, updated_at: new Date().toISOString() })
      .eq('session_id', access.session.id).eq('operation', operation).eq('lease_id', data.lease_id).select('session_id').single();
    if (saved.error || !saved.data) throw new AccessError(503, 'La correction n’a pas pu être enregistrée.');
    return result;
  } catch (e) {
    await access.admin.from('ai_exam_operations').update({ state: 'failed', updated_at: new Date().toISOString() })
      .eq('session_id', access.session.id).eq('operation', operation).eq('lease_id', data.lease_id);
    throw e;
  }
}
