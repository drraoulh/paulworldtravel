import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { EPREUVE_IMAGES } from '@/lib/epreuve-images';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import LessonQuiz from '@/components/parcours/LessonQuiz';
import { ModuleOutline, ModuleProgress, NextBar, TrackVisit } from '@/components/parcours/Player';
import { lessonId } from '@/content/parcours';
import { publishedLesson, publishedModules } from '@/lib/training-content';
import { buildCourse, locateItem } from '@/content/parcours/course';
import { epreuveConfigs, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string; lecon: string }> };

export const dynamicParams = true;
export const dynamic = 'force-dynamic';
export const generateStaticParams = () => epreuveConfigs.flatMap((e) => e.module.lessons.map((l) => ({ slug: e.slug, lecon: l.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lecon } = await params;
  const found = await publishedLesson(slug, lecon);
  return found ? { title: `${found.lesson.title} | ${found.module.name}`, description: found.lesson.goal } : {};
}

export default async function LessonPage({ params }: Props) {
  const { slug, lecon } = await params;
  const e = getEpreuve(slug);
  const found = await publishedLesson(slug, lecon);
  if (!e || !found) notFound();
  const { module: m, lesson, index } = found;
  const id = lessonId(m, lesson);
  const practice = lesson.practice ?? m.practice;
  const place = locateItem(id, buildCourse(await publishedModules()))!;
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
      <Container className="grid gap-8 xl:grid-cols-[16rem_1fr]">
        <aside className="order-2 xl:order-1 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:self-start xl:overflow-y-auto">
          <ModuleOutline title={place.module.title} number={place.module.number} items={place.module.items} currentId={id} />
        </aside>

        <div className="order-1 min-w-0 xl:order-2">
        <header className="mb-8 max-w-[44rem] overflow-hidden rounded-xl border border-rule bg-white">
          <div className="relative h-40 sm:h-48"><Image src={EPREUVE_IMAGES[m.id].src} alt={EPREUVE_IMAGES[m.id].alt} fill priority sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover" /></div>
          <div className="p-6">
          <p className="text-sm font-semibold text-ocean">Leçon {index + 1} sur {m.lessons.length}, {lesson.minutes} min de lecture</p>
          <h1 className="display mt-2 text-[2rem] text-night sm:text-[2.6rem]">{lesson.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate">Objectif : {lesson.goal}</p><nav aria-label="Dans cette leçon" className="mt-5 flex flex-wrap gap-4 border-t border-rule pt-4 text-xs font-bold text-ocean"><a href="#lesson-content">Lire la leçon</a><a href="#quiz">Quiz · {lesson.quiz.length} questions</a><Link href={practice.href}>Mettre en pratique</Link></nav>
          </div>
        </header>
        <article id="lesson-content" className="min-w-0 max-w-[44rem] scroll-mt-24 space-y-10 rounded-xl border border-rule bg-white p-5 sm:p-7">
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

          <section id="quiz" className="scroll-mt-24">
            <h2 className="heading text-2xl text-night">Validez vos compétences</h2>
            <p className="mt-2 text-slate">{lesson.quiz.length} questions corrigées et expliquées. Répondez à toutes les questions correctement pour valider le quiz. Vous pouvez réessayer après avoir relu la leçon.</p>
            <div className="mt-6"><LessonQuiz key={id} questions={lesson.quiz} lessonId={id} /></div>
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
