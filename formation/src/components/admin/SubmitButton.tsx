'use client';

import { useFormStatus } from 'react-dom';
import type { ReactNode } from 'react';

/** A form button that locks while the form is sent, so one click sends once. */
export default function SubmitButton({ children, pending = 'Envoi en cours…', className, name, value }: { children: ReactNode; pending?: string; className: string; name?: string; value?: string }) {
  const { pending: busy } = useFormStatus();
  return <button type="submit" name={name} value={value} disabled={busy} aria-disabled={busy} className={className}>{busy ? pending : children}</button>;
}
