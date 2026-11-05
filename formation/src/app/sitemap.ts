import type { MetadataRoute } from 'next';
import { articles } from '@/content/blog';
import { modules } from '@/content/parcours';
import { seriesFor } from '@/content/series';
import { epreuveConfigs } from '@/lib/epreuves';
import { absoluteUrl } from '@/lib/site';

/** Public pages only: accounts, results, payments and administration are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/',
    '/tcf-canada/',
    '/test-de-niveau/',
    '/parcours/',
    '/packs/',
    '/examen-blanc/',
    '/guide/',
    '/modeles-de-reponses/',
    '/calculateur-nclc/',
    '/niveaux-nclc/',
    '/partager-mes-sujets/',
    '/inscription/',
    '/blog/',
  ];

  const epreuvePages = epreuveConfigs.flatMap((e) => {
    const sections = e.sections.filter((s) => s.key !== 'tableau-de-bord').map((s) => s.href);
    const lessons = (modules.find((m) => m.slug === e.slug)?.lessons ?? []).map((l) => `/epreuve/${e.slug}/methodologie/${l.slug}/`);
    const series = e.kind === 'comprehension'
      ? seriesFor(e.module.id as 'ce' | 'co').map((s) => `/epreuve/${e.slug}/series/${s.number}/`)
      : [];
    return [...sections, ...lessons, ...series];
  });

  return [
    ...[...pages, ...epreuvePages].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.7,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/blog/${a.slug}/`),
      lastModified: a.updated ?? a.published,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
