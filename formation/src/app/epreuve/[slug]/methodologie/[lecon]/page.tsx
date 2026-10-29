import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import LessonQuiz from '@/components/parcours/LessonQuiz';
import { ModuleOutline, ModuleProgress, NextBar, TrackVisit } from '@/components/parcours/Player';
import { getLesson, lessonId } from '@/content/parcours';
import { locateItem } from '@/content/parcours/course';
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
  const { module: m, lesson, index } = found;
  const id = lessonId(m, lesson);
  const practice = lesson.practice ?? m.practice;
  const place = locateItem(id)!;
  const href = `/epreuve/${e.slug}/methodologie/${lesson.slug}/`;

  return (
    <>
      <TrackVisit item={{ id, href, title: lesson.title }} />
      <div className="border-b border-rule bg-white">
        <Container className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-x-2 text-sm text-slate">
            <Link href="/parcours/" className="font-semibold text-ocean hover:underline">Parcours</Link>
            <span aria-hidden="true">/</span>
            <span>Module {place.module.number} : {place.module.title}</span>
            <span aria-hidden="true">/</span>
            <span className="text-night">Leçon {index + 1}</span>
          </nav>
          <ModuleProgress items={place.module.items} />
        </Container>
      </div>
      <section className="bg-paper py-8 sm:py-12">
      <Container className="grid gap-8 lg:grid-cols-[19rem_1fr]">
        <aside className="order-2 lg:order-1 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto">
          <ModuleOutline title={place.module.title} number={place.module.number} items={place.module.items} currentId={id} />
        </aside>

        <div className="order-1 min-w-0 lg:order-2">
        <header className="mb-8 max-w-[44rem]">
          <p className="text-sm font-semibold text-ocean">Leçon {index + 1} sur {m.lessons.length}, {lesson.minutes} min de lecture</p>
          <h1 className="display mt-2 text-[2rem] text-night sm:text-[2.6rem]">{lesson.title}</h1>
          <p className="mt-3 text-lg text-slate">Objectif : {lesson.goal}</p>
        </header>
        <article className="min-w-0 max-w-[44rem] space-y-10">
          {lesson.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="heading text-2xl text-night">{s.heading}</h2>
              {s.paragraphs?.map((p) => <p key={p} className="reading mt-4 text-ink">{p}</p>)}
              {s.list && <ul className="reading mt-4 list-disc space-y-2 pl-6 text-ink marker:text-slate">{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
            </section>
          ))}

          {lesson.model && (
            <section className="rounded-2xl border-l-4 border-container bg-white p-6 sm:p-8">
              <h2 className="heading text-xl text-night">{lesson.model.title}</h2>
              <p className="reading mt-4 whitespace-pre-line text-ink">{lesson.model.text}</p>
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

          <p className="rounded-2xl bg-white p-6 text-slate">
            Pour aller plus loin : <Link href={practice.href} className="font-bold text-ocean hover:underline">{practice.label}</Link>
          </p>

          <NextBar id={id} next={place.next} />
        </article>

        </div>
      </Container>
      </section>
    </>
  );
}
