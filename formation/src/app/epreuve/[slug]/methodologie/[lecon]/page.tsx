import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink, Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import LessonQuiz from '@/components/parcours/LessonQuiz';
import { DoneButton, LessonMark } from '@/components/parcours/Progress';
import { getLesson, lessonId } from '@/content/parcours';
import { epreuveConfigs, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string; lecon: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => epreuveConfigs.flatMap((e) => e.module.lessons.map((l) => ({ slug: e.slug, lecon: l.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lecon } = await params;
  const found = getLesson(slug, lecon);
  return found ? { title: `${found.lesson.title} | ${found.module.name}`, description: found.lesson.goal } : {};
}

export default async function LessonPage({ params }: Props) {
  const { slug, lecon } = await params;
  const e = getEpreuve(slug);
  const found = getLesson(slug, lecon);
  if (!e || !found) notFound();
  const { module: m, lesson, index, prev, next } = found;
  const id = lessonId(m, lesson);
  const practice = lesson.practice ?? m.practice;
  const href = (s: string) => `/epreuve/${e.slug}/methodologie/${s}/`;

  return (
    <EpreuveShell
      epreuve={e}
      active="methodologie"
      title={lesson.title}
      intro={<>Leçon {index + 1} sur {m.lessons.length}, {lesson.minutes} min de lecture. Objectif : {lesson.goal}</>}
    >
      <Container className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <article className="min-w-0 max-w-3xl space-y-10">
          {lesson.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="heading text-2xl text-night">{s.heading}</h2>
              {s.paragraphs?.map((p) => <p key={p} className="mt-4 text-lg leading-relaxed text-ink">{p}</p>)}
              {s.list && <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-ink">{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
            </section>
          ))}

          {lesson.model && (
            <section className="rounded-2xl border-l-4 border-container bg-white p-6 sm:p-8">
              <h2 className="heading text-xl text-night">{lesson.model.title}</h2>
              <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-ink">{lesson.model.text}</p>
              {lesson.model.note && <p className="mt-5 border-t border-rule pt-4 text-slate"><strong className="text-night">Pourquoi ça marche : </strong>{lesson.model.note}</p>}
            </section>
          )}

          {(lesson.phrases || lesson.pitfalls) && (
            <div className="grid gap-4 md:grid-cols-2">
              {lesson.phrases && (
                <section className="rounded-2xl bg-white p-6">
                  <h2 className="heading text-lg text-night">{lesson.phrases.heading}</h2>
                  <ul className="mt-4 space-y-2 text-ink">{lesson.phrases.items.map((p) => <li key={p} className="rounded-lg bg-paper px-3 py-2">{p}</li>)}</ul>
                </section>
              )}
              {lesson.pitfalls && (
                <section className="rounded-2xl bg-white p-6">
                  <h2 className="heading text-lg text-maple">Erreurs à éviter</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-ink">{lesson.pitfalls.map((p) => <li key={p}>{p}</li>)}</ul>
                </section>
              )}
            </div>
          )}

          <section>
            <h2 className="heading text-2xl text-night">Vérifiez vos acquis</h2>
            <p className="mt-2 text-slate">Trois questions. Un sans-faute valide automatiquement la leçon.</p>
            <div className="mt-6"><LessonQuiz questions={lesson.quiz} lessonId={id} /></div>
          </section>

          <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-6">
            <DoneButton id={id} />
            <Link href={practice.href} className="font-bold text-ocean hover:underline">{practice.label}</Link>
          </div>

          <nav aria-label="Leçons" className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            {prev ? <Link href={href(prev.slug)} className="font-semibold text-ocean hover:underline">Leçon précédente : {prev.title}</Link> : <span />}
            {next
              ? <ButtonLink href={href(next.slug)} variant="dark">Leçon suivante : {next.title}</ButtonLink>
              : <ButtonLink href={practice.href} variant="dark">Méthode terminée : passer à la pratique</ButtonLink>}
          </nav>
        </article>

        <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-white p-5">
            <p className="font-semibold text-night">Méthodologie</p>
            <ol className="mt-4 space-y-1">
              {m.lessons.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={href(l.slug)}
                    aria-current={l.slug === lesson.slug ? 'page' : undefined}
                    className={`flex items-start gap-3 rounded-lg px-2 py-2 text-sm ${l.slug === lesson.slug ? 'bg-paper font-semibold text-night' : 'text-slate hover:text-ocean'}`}
                  >
                    <LessonMark id={lessonId(m, l)} />
                    <span>{l.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </Container>
    </EpreuveShell>
  );
}
