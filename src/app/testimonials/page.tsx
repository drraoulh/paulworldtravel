'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button, PageHeader, Section } from '@/components/ui';
import { TestimonialCard, testimonials } from '@/components/TestimonialSlider';
import TestimonialForm from '@/components/TestimonialForm';

const copy = {
  fr: {
    eyebrow: 'Témoignages',
    intro: 'Importateurs, entrepreneurs et étudiants nous font confiance entre la Chine, l’Afrique et l’Amérique du Nord.',
    asideTitle: 'Une question avant de vous lancer ?',
    asideText: 'Parlez-nous de votre projet : cargo, change, visa ou création d’entreprise.',
    asideCta: 'Nous contacter',
  },
  en: {
    eyebrow: 'Testimonials',
    intro: 'Importers, entrepreneurs and students trust us between China, Africa and North America.',
    asideTitle: 'A question before you start?',
    asideText: 'Tell us about your project: cargo, currency exchange, visa or business creation.',
    asideCta: 'Contact us',
  },
};

export default function TestimonialsPage() {
  const { t, language } = useLanguage();
  const c = copy[language];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={t('testimonials.subtitle')} intro={c.intro} />

      <Section>
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <TestimonialForm />
          </div>
          <aside className="lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{c.asideTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted">{c.asideText}</p>
            <div className="mt-6">
              <Button href="/contact/" variant="secondary">
                {c.asideCta}
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
