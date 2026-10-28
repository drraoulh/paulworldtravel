import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink, Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import { LessonMark, ProgressBar } from '@/components/parcours/Progress';
import { lessonId } from '@/content/parcours';
import { epreuveConfigs, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => epreuveConfigs.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEpreuve((await params).slug);
  return e ? { title: `Méthodologie : ${e.module.name}` } : {};
}

export default async function MethodologiePage({ params }: Props) {
  const e = getEpreuve((await params).slug);
  if (!e) notFound();
  const m = e.module;
  const ids = m.lessons.map((l) => lessonId(m, l));

  return (
    <EpreuveShell epreuve={e} active="methodologie" title="Méthodologie et astuces" intro={`${m.lessons.length} leçons pour maîtriser l’épreuve de ${m.name.toLowerCase()}. Chaque leçon se valide par un quiz de trois questions.`}>
      <Container className="grid gap-10 lg:grid-cols-[1fr_20rem]">
        <ol className="space-y-3">
          {m.lessons.map((l, i) => (
            <li key={l.slug}>
              <Link href={`/epreuve/${e.slug}/methodologie/${l.slug}/`} className="group flex items-start gap-4 rounded-2xl border border-rule bg-white p-5 transition-colors hover:border-ocean">
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
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl bg-white p-6">
            <ProgressBar ids={ids} />
            <ButtonLink href={`/epreuve/${e.slug}/methodologie/${m.lessons[0].slug}/`} variant="dark" className="mt-5 w-full">Commencer la première leçon</ButtonLink>
            <Link href={m.practice.href} className="mt-4 block text-center font-bold text-ocean hover:underline">{m.practice.label}</Link>
          </div>
          <div className="rounded-2xl bg-white p-6 text-sm text-slate">
            Une question de grammaire ou de méthode ? <Link href="/entrainement/tuteur/" className="font-semibold text-ocean hover:underline">Demandez au tuteur IA</Link>.
          </div>
        </aside>
      </Container>
    </EpreuveShell>
  );
}
