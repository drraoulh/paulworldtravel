'use client';
import { OPEN_PREFERENCES } from '@/lib/cookie-consent';
export default function CookiePreferencesButton({ className = '' }: { className?: string }) {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES))} className={className}>Gérer mes cookies</button>;
}
