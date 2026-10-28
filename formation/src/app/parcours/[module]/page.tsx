import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import { LessonMark, ProgressBar } from '@/components/parcours/Progress';
import { getModule, lessonId, modules } from '@/content/parcours';

type Props = { params: Promise<{ module: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => modules.map((m) => ({ module: m.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModule((await params).module);
  return m ? { title: `${m.name} : méthode TCF Canada`, description: m.intro } : {};
}

export default async function ModulePage({ params }: Props) {
  const m = getModule((await params).module);
  if (!m) notFound();
  const ids = m.lessons.map((l) => lessonId(m, l));
  const others = modules.filter((o) => o.id !== m.id);

  return (
    <>
      <PageHeader title={m.name} intro={m.intro}>
        <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {m.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-blue-200">{f.label}</dt>
              <dd className="heading mt-1 text-lg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <h2 className="heading text-2xl text-night">Les leçons</h2>
            <ol className="mt-6 space-y-3">
              {m.lessons.map((l, i) => (
                <li key={l.slug}>
                  <Link href={`/parcours/${m.slug}/${l.slug}/`} className="group flex items-start gap-4 rounded-2xl border border-rule bg-white p-5 transition-colors hover:border-ocean">
                    <LessonMark id={ids[i]} />
                    <span className="flex-1">
                      <span className="block text-sm text-slate">Leçon {i + 1}, {l.minutes} min</span>
                      <span className="heading mt-0.5 block text-lg text-night group-hover:text-ocean">{l.title}</span>
                      <span className="mt-1 block text-slate">{l.goal}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <h2 className="heading mt-14 text-2xl text-night">Comment se présente l’épreuve</h2>
            <div className="mt-6 space-y-4">
              {m.tasks.map((t) => (
                <div key={t.title} className="rounded-2xl border border-rule bg-white p-5">
                  <h3 className="heading text-night">{t.title}</h3>
                  <p className="mt-1.5 text-slate">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-white p-6">
              <ProgressBar ids={ids} />
              <ButtonLink href={`/parcours/${m.slug}/${m.lessons[0].slug}/`} variant="dark" className="mt-5 w-full">Commencer le module</ButtonLink>
              <Link href={m.practice.href} className="mt-4 block text-center font-bold text-ocean hover:underline">{m.practice.label}</Link>
            </div>
            <div className="rounded-2xl bg-white p-6">
              <p className="font-semibold text-night">Les autres modules</p>
              <ul className="mt-3 space-y-2">
                {others.map((o) => <li key={o.id}><Link href={`/parcours/${o.slug}/`} className="text-ocean hover:underline">{o.name}</Link></li>)}
              </ul>
              <Link href="/parcours/" className="mt-4 inline-block text-sm text-slate hover:text-ocean">Retour au parcours</Link>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
