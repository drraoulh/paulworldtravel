import { formules } from '@/content/offers';

export const formuleName = (id: string) => formules.find((f) => f.id === id)?.name ?? id;

export const statusLabel: Record<string, string> = {
  pending: 'En attente de paiement',
  active: 'Active',
  expired: 'Terminée',
  cancelled: 'Annulée',
};

export const statusTone: Record<string, string> = {
  pending: 'bg-container/20 text-night',
  active: 'bg-green-100 text-green-800',
  expired: 'bg-paper text-slate',
  cancelled: 'bg-red-50 text-maple',
};

export const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export interface Enrollment {
  id: string;
  user_id: string;
  formule: string;
  level: string | null;
  goal: string | null;
  exam_date: string | null;
  message: string | null;
  status: string;
  starts_at: string | null;
  ends_at: string | null;
  staff_notes: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  city: string | null;
  role: string;
}

/** An active enrollment past its end date is shown as finished. */
export const effectiveStatus = (e: Pick<Enrollment, 'status' | 'ends_at'>) =>
  e.status === 'active' && e.ends_at && e.ends_at < new Date().toISOString().slice(0, 10) ? 'expired' : e.status;
