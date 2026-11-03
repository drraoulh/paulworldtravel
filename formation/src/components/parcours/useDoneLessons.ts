'use client';

import { useEffect, useState } from 'react';

import { QUIZ_PREFIX } from '@/lib/lesson-progress';

// Quiz-validated lessons are remembered locally and synchronized by ProgressSync when signed in.
const KEY = 'pwt-parcours-done';
const EVENT = 'pwt-parcours-change';

function read(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string' && v.startsWith(QUIZ_PREFIX)).map((v) => v.slice(QUIZ_PREFIX.length)) : [];
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

  return { done };
}
