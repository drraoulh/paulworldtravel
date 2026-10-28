/** Dates are inclusive, expressed in UTC consistently with activation dates. */
export function effectiveStatus(e: { status: string; ends_at: string | null; starts_at?: string | null }, today = new Date().toISOString().slice(0, 10)) {
  if (e.status !== 'active') return e.status;
  if (e.ends_at && e.ends_at < today) return 'expired';
  if (e.starts_at && e.starts_at > today) return 'scheduled';
  return 'active';
}
