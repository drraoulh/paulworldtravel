import ForAudience from '@/components/access/ForAudience';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink, Container } from '@/components/ui';
import ArticleBody from '@/components/blog/ArticleBody';
import { articles, formatDate, getArticle, readingMinutes, relatedArticles, tableOfContents } from '@/content/blog';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const url = absoluteUrl(`/blog/${a.slug}/`);
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      url,
      title: a.title,
      description: a.description,
      publishedTime: a.published,
      modifiedTime: a.updated ?? a.published,
      images: [{ url: absoluteUrl(a.image.src), alt: a.image.alt }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const toc = tableOfContents(a);
  const related = relatedArticles(a);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    image: [absoluteUrl(a.image.src)],
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    inLanguage: 'fr',
    mainEntityOfPage: absoluteUrl(`/blog/${a.slug}/`),
    author: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/'), logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.png') } },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className="border-b border-rule bg-white">
        <Container className="grid gap-10 py-9 sm:py-12 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
          <div>
            <nav aria-label="Fil d’Ariane" className="text-sm text-slate">
              <Link href="/blog/" className="hover:text-ocean">Blog</Link> <span aria-hidden="true">/</span> <span>{a.category}</span>
            </nav>
            <h1 className="display mt-3 max-w-3xl text-[2.2rem] text-night sm:text-[3rem]">{a.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate">{a.lead}</p>
            <p className="mt-5 text-sm text-slate">
              {a.updated && a.updated !== a.published ? <>Mis à jour le <time dateTime={a.updated}>{formatDate(a.updated)}</time></> : <>Publié le <time dateTime={a.published}>{formatDate(a.published)}</time></>}
              {' · '}{readingMinutes(a)} min de lecture
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper lg:aspect-[4/3]">
            <Image src={a.image.src} alt={a.image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </header>

      <div className="bg-paper py-10 sm:py-14">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0 max-w-3xl">
            {toc.length > 1 && (
              <nav aria-labelledby="toc-title" className="mb-8 rounded-2xl border border-rule bg-white p-6 lg:hidden">
                <p id="toc-title" className="heading text-night">Sommaire</p>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[0.95rem]">
                  {toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="text-slate hover:text-ocean">{t.text}</a></li>)}
                </ol>
              </nav>
            )}

            <ArticleBody blocks={a.blocks} />

            {a.sources.length > 0 && (
              <section aria-labelledby="sources-title" className="mt-12 rounded-2xl border border-rule bg-white p-6">
                <h2 id="sources-title" className="heading text-lg text-night">Sources officielles</h2>
                <ul className="mt-3 space-y-2 text-[0.95rem]">
                  {a.sources.map((s) => (
                    <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="text-ocean underline decoration-ocean/30 underline-offset-2 hover:decoration-ocean">{s.label}</a></li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate">Les règles, tarifs et barèmes peuvent changer : vérifiez toujours ces pages avant une démarche.</p>
              </section>
            )}

            <section aria-labelledby="cta-title" className="mt-10 rounded-2xl bg-night p-7 text-white sm:p-9">
              <ForAudience
                visitor={<><h2 id="cta-title" className="heading text-2xl">Où en êtes-vous avant l’examen ?</h2>
                  <p className="mt-3 max-w-xl text-white/80">Le test de niveau gratuit vous situe en une dizaine de minutes. Ensuite, un pack vous donne toutes les séries, les examens blancs et des corrections chaque jour.</p>
                  <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/test-de-niveau/">Faire le test de niveau gratuit</ButtonLink><ButtonLink href="/packs/" variant="outline">Voir les packs</ButtonLink></div></>}
                free={<><h2 id="cta-title" className="heading text-2xl">Passez à la vitesse supérieure</h2>
                  <p className="mt-3 max-w-xl text-white/80">Un pack vous donne toutes les séries, les examens blancs et des corrections par l’IA chaque jour.</p>
                  <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/packs/">Voir les packs</ButtonLink><ButtonLink href="/parcours/" variant="outline">Reprendre mon parcours</ButtonLink></div></>}
                pack={<><h2 id="cta-title" className="heading text-2xl">Mettez cet article en pratique</h2>
                  <p className="mt-3 max-w-xl text-white/80">Votre pack vous donne toutes les séries, les examens blancs et des corrections chaque jour.</p>
                  <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/parcours/">Reprendre mon parcours</ButtonLink><ButtonLink href="/examen-blanc/" variant="outline">Faire un examen blanc</ButtonLink></div></>}
              />
            </section>
          </div>

          <aside className="hidden lg:block">
            {toc.length > 1 && (
              <nav aria-label="Sommaire" className="sticky top-24 rounded-2xl border border-rule bg-white p-6">
                <p className="heading text-night">Sommaire</p>
                <ol className="mt-3 space-y-2 text-sm">
                  {toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="block text-slate hover:text-ocean">{t.text}</a></li>)}
                </ol>
              </nav>
            )}
          </aside>
        </Container>
      </div>

      <section aria-labelledby="related-title" className="border-t border-rule bg-white py-12 sm:py-16">
        <Container>
          <h2 id="related-title" className="heading text-2xl text-night">À lire aussi</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}/`} className="group flex h-full flex-col rounded-2xl border border-rule bg-paper p-6 transition-colors hover:border-ocean">
                  <p className="text-sm font-semibold text-ocean">{r.category}</p>
                  <h3 className="heading mt-1.5 text-lg text-night group-hover:text-ocean">{r.title}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-slate">{r.description}</p>
                  <p className="mt-4 text-sm text-slate">{readingMinutes(r)} min de lecture</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  );
}
