'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container, PageHero } from '@/components/site';
import { faqs, type Category } from '@/content/faqs';

const copy = {
  fr: {
    title: 'Questions fréquentes',
    intro: 'Délais, tarifs, documents, produits autorisés : les réponses aux questions que nos clients posent le plus souvent.',
    all: 'Toutes',
    categories: { canada: 'Fret Cameroun → Canada', cargo: 'Cargo', currency: 'Change', visa: 'Visas', consulting: 'Achats en Chine', business: 'Entreprise', it: 'Informatique', customs: 'Douane' },
    moreTitle: 'Votre question n’est pas dans la liste ?',
    moreText: 'Écrivez-nous : nous vous répondons sous 24 h ouvrées.',
    moreCta: 'Poser ma question',
  },
  en: {
    title: 'Frequent questions',
    intro: 'Transit times, prices, documents, allowed items: answers to the questions our customers ask most.',
    all: 'All',
    categories: { canada: 'Freight Cameroon → Canada', cargo: 'Cargo', currency: 'Currency', visa: 'Visas', consulting: 'Purchasing in China', business: 'Business', it: 'IT', customs: 'Customs' },
    moreTitle: 'Your question isn’t listed?',
    moreText: 'Write to us: we reply within one business day.',
    moreCta: 'Ask my question',
  },
};

export default function FAQ() {
  const { language } = useLanguage();
  const c = copy[language];
  const [category, setCategory] = useState<Category | 'all'>('all');
  const shown = category === 'all' ? faqs : faqs.filter((f) => f.category === category);
  const filters: (Category | 'all')[] = ['all', ...(Object.keys(c.categories) as Category[])];

  return (
    <>
      <PageHero title={c.title} intro={c.intro} image="/images/photos/voyage-affaires.jpg" />

      <section className="bg-paper py-16 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={c.title}>
            {filters.map((id) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                aria-pressed={category === id}
                className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                  category === id ? 'bg-night text-white' : 'bg-white text-night hover:bg-rule'
                }`}
              >
                {id === 'all' ? c.all : c.categories[id]}
              </button>
            ))}
          </div>

          <div className="divide-y divide-rule overflow-hidden rounded-lg bg-white">
            {shown.map((item) => (
              <details key={item.q.fr} className="group p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <span className="heading text-lg text-night">{item.q[language]}</span>
                  <span aria-hidden="true" className="display mt-0.5 text-2xl leading-none text-ocean transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-slate">{item.a[language]}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-lg bg-night p-8 text-white">
            <h2 className="heading text-2xl">{c.moreTitle}</h2>
            <p className="mt-2 text-blue-100">{c.moreText}</p>
            <Link href="/contact/" className="mt-5 inline-flex rounded-md bg-container px-6 py-3 font-bold text-night hover:bg-container-hover">
              {c.moreCta}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
