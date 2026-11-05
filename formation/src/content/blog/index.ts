import { plainText } from '@/components/blog/Inline';
import type { Article, Block } from './types';
import { guideComplet } from './tcf-canada-guide-complet-2026';
import { niveauxNclc } from './niveaux-nclc-bareme-tcf-canada';
import { cameroun } from './tcf-canada-cameroun-centres-prix-inscription';
import { auCanada } from './passer-tcf-canada-au-canada';
import { comprehensionOrale } from './reussir-comprehension-orale-tcf-canada';
import { comprehensionEcrite } from './reussir-comprehension-ecrite-tcf-canada';
import { expressionEcrite } from './expression-ecrite-tcf-canada-3-taches';
import { expressionOrale } from './expression-orale-tcf-canada-3-taches';
import { tcfOuTef } from './tcf-canada-ou-tef-canada';
import { planning30Jours } from './preparation-tcf-canada-planning-30-jours';

export type { Article, Block } from './types';

/** All articles, newest first. */
export const articles: Article[] = [
  guideComplet,
  niveauxNclc,
  cameroun,
  auCanada,
  comprehensionOrale,
  comprehensionEcrite,
  expressionEcrite,
  expressionOrale,
  tcfOuTef,
  planning30Jours,
].sort((a, b) => (b.updated ?? b.published).localeCompare(a.updated ?? a.published));

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

const blockText = (b: Block): string => {
  switch (b.type) {
    case 'ul':
    case 'ol':
      return b.items.join(' ');
    case 'table':
      return [...b.head, ...b.rows.flat()].join(' ');
    case 'callout':
      return `${b.title ?? ''} ${b.text}`;
    case 'example':
      return `${b.title ?? ''} ${b.text}`;
    default:
      return b.text;
  }
};

/** Number of words of the article, title and lead included. */
export const wordCount = (a: Article) =>
  plainText([a.title, a.lead, ...a.blocks.map(blockText)].join(' ')).split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;

/** Reading time in minutes, at about 200 words a minute. */
export const readingMinutes = (a: Article) => Math.max(1, Math.round(wordCount(a) / 200));

/** Table of contents: the section titles. */
export const tableOfContents = (a: Article) =>
  a.blocks.flatMap((b) => (b.type === 'h2' ? [{ id: b.id, text: b.text }] : []));

/** Related articles, in the order given, then the newest others to make three. */
export function relatedArticles(a: Article, count = 3) {
  const picked = a.related.map(getArticle).filter((r): r is Article => !!r && r.slug !== a.slug);
  const rest = articles.filter((r) => r.slug !== a.slug && !picked.includes(r));
  return [...picked, ...rest].slice(0, count);
}

/** « 5 novembre 2026 » */
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
