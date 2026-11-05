/*
 * Blog articles are typed data, rendered by src/components/blog/ArticleBody.tsx.
 * Text fields accept two inline marks: **bold** and [link text](/path/ or https://…).
 */

export type Block =
  | { type: 'p'; text: string }
  /** Section title. Its id is the anchor used by the table of contents. */
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  /** A framed note: key point, warning or tip. */
  | { type: 'callout'; tone?: 'info' | 'warning'; title?: string; text: string }
  /** A sample text (message, answer), shown in a box and kept with its line breaks. */
  | { type: 'example'; title?: string; text: string };

export type Category = 'L’examen' | 'S’inscrire' | 'Méthode' | 'Organisation';

export interface Source {
  label: string;
  href: string;
}

export interface Article {
  slug: string;
  title: string;
  /** Meta description and card summary, about 150 characters. */
  description: string;
  category: Category;
  /** ISO dates (YYYY-MM-DD). */
  published: string;
  updated?: string;
  /** Photograph from /public/images, shown on the card and at the top of the article. */
  image: { src: string; alt: string };
  /** Short opening paragraph, shown under the title. */
  lead: string;
  blocks: Block[];
  /** Official pages the facts come from. */
  sources: Source[];
  /** Slugs of related articles, shown at the end. */
  related: string[];
}
