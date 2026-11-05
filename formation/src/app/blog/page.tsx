import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/ui';
import { articles, formatDate, readingMinutes } from '@/content/blog';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

const title = 'Blog : conseils et méthode pour le TCF Canada';
const description = 'Format de l’examen, niveaux NCLC, inscription au Cameroun et au Canada, méthode pour chaque épreuve et planning de révision : nos articles pour réussir le TCF Canada.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/blog/') },
  openGraph: { type: 'website', locale: 'fr_FR', siteName: SITE_NAME, url: absoluteUrl('/blog/'), title, description },
};

export default function BlogIndex() {
  const [first, ...rest] = articles;
  return (
    <>
      <PageHeader
        title="Le blog du TCF Canada"
        intro="Des articles vérifiés sur les sources officielles pour comprendre l’examen, vous inscrire et vous préparer épreuve par épreuve."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container>
          <Link href={`/blog/${first.slug}/`} className="group grid overflow-hidden rounded-2xl border border-rule bg-white transition-colors hover:border-ocean md:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[18rem]">
              <Image src={first.image.src} alt={first.image.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9">
              <p className="text-sm font-semibold text-ocean">{first.category}</p>
              <h2 className="heading mt-2 text-2xl text-night group-hover:text-ocean sm:text-3xl">{first.title}</h2>
              <p className="mt-3 text-slate">{first.description}</p>
              <p className="mt-5 text-sm text-slate">{formatDate(first.updated ?? first.published)} · {readingMinutes(first)} min de lecture</p>
            </div>
          </Link>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}/`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-white transition-colors hover:border-ocean">
                  <div className="relative aspect-[16/9]">
                    <Image src={a.image.src} alt={a.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm font-semibold text-ocean">{a.category}</p>
                    <h2 className="heading mt-1.5 text-xl text-night group-hover:text-ocean">{a.title}</h2>
                    <p className="mt-2 flex-1 text-[0.95rem] text-slate">{a.description}</p>
                    <p className="mt-4 text-sm text-slate">{formatDate(a.updated ?? a.published)} · {readingMinutes(a)} min</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
