'use client';

import { useCallback, useEffect, useState } from 'react';

// Completed lessons are remembered in this browser only (a convenience, not a record).
const KEY = 'pwt-parcours-done';
const EVENT = 'pwt-parcours-change';

function read(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((v) => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

export function useDoneLessons() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setDone(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggle = useCallback((id: string, value?: boolean) => {
    const current = read();
    const next = (value ?? !current.includes(id)) ? Array.from(new Set([...current, id])) : current.filter((v) => v !== id);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch { /* Progress is optional. */ }
    setDone(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { done, toggle };
}
