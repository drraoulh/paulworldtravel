'use client';

import { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

type Lang = 'fr' | 'en';

export interface Testimonial {
  id: string;
  name: string;
  role: Record<Lang, string>;
  company?: string;
  content: Record<Lang, string>;
  rating: number;
}

/**
 * Testimonials shown on the site. The site is a static export, so this local
 * list is the source of truth (no backend fetch).
 */
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jean Durand',
    role: { fr: 'Directeur Commercial', en: 'Sales Director' },
    company: 'Import Export SARL',
    content: {
      fr: 'Nous travaillons avec Paul World Travel depuis plus de 3 ans pour nos importations de Chine. Leur service est impeccable et les délais sont toujours respectés.',
      en: 'We have worked with Paul World Travel for more than 3 years on our imports from China. Their service is flawless and deadlines are always met.',
    },
    rating: 5,
  },
  {
    id: '2',
    name: 'Marie Kouassi',
    role: { fr: 'Entrepreneure', en: 'Entrepreneur' },
    company: 'Boutique Mode Afrique',
    content: {
      fr: 'Grâce à Paul World Travel, j’ai pu établir des contacts solides avec des fournisseurs chinois pour ma boutique de mode.',
      en: 'Thanks to Paul World Travel, I was able to build strong relationships with Chinese suppliers for my fashion store.',
    },
    rating: 5,
  },
  {
    id: '3',
    name: 'Robert Chen',
    role: { fr: 'Étudiant', en: 'Student' },
    content: {
      fr: 'Le service d’assistance pour l’obtention de mon visa étudiant a été excellent. Toutes les démarches ont été facilitées.',
      en: 'The support I received to obtain my student visa was excellent. Every step of the process was made easy.',
    },
    rating: 5,
  },
];

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** Single quote card, reused by the slider and the testimonials grid. */
export function TestimonialCard({ testimonial, large = false }: { testimonial: Testimonial; large?: boolean }) {
  const { language } = useLanguage();
  const meta = [testimonial.role[language], testimonial.company].filter(Boolean).join(' · ');

  return (
    <figure className="flex h-full flex-col">
      <span className="text-5xl font-semibold leading-none text-accent" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className={`mt-4 flex-1 leading-relaxed text-foreground ${large ? 'text-2xl tracking-tight sm:text-3xl' : 'text-lg'}`}>
        {testimonial.content[language]}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-medium text-accent" aria-hidden="true">
          {initials(testimonial.name)}
        </span>
        <span>
          <span className="block font-medium text-foreground">{testimonial.name}</span>
          <span className="block text-sm text-muted">{meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

const copy = {
  fr: { prev: 'Témoignage précédent', next: 'Témoignage suivant', goTo: 'Aller au témoignage' },
  en: { prev: 'Previous testimonial', next: 'Next testimonial', goTo: 'Go to testimonial' },
};

/** Minimal one-at-a-time quote slider (auto-advances every 7s). */
export default function TestimonialSlider() {
  const { language } = useLanguage();
  const c = copy[language];
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [count, next, index]);

  if (count === 0) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <div aria-live="polite">
        <TestimonialCard key={testimonials[index].id} testimonial={testimonials[index]} large />
      </div>

      {count > 1 && (
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${c.goTo} ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-accent' : 'w-4 bg-line hover:bg-muted'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label={c.prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-foreground"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={c.next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-foreground"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
