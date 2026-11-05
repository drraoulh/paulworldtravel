import ForAudience from '@/components/access/ForAudience';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import { CopyButton, PrintButton } from '@/components/modeles/CopyButton';
import { answerTemplates, templatesFor, type AnswerTemplate, type ExpressionGroup } from '@/content/modeles';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

const title = 'Modèles de réponses : expression écrite et orale du TCF Canada';
const description = 'Structures prêtes à l’emploi pour les 6 tâches d’expression du TCF Canada : squelettes à compléter, expressions utiles, erreurs fréquentes et exemples commentés. À copier ou imprimer.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/modeles-de-reponses/') },
  openGraph: { type: 'website', locale: 'fr_FR', siteName: SITE_NAME, url: absoluteUrl('/modeles-de-reponses/'), title, description },
};

/** Highlights the [parts to fill in] of a skeleton. */
function Skeleton({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        part.startsWith('[') ? <span key={i} className="rounded bg-container px-1 font-semibold text-night print:bg-transparent print:underline">{part}</span> : part,
      )}
    </>
  );
}

function Groups({ groups, columns = 'sm:grid-cols-2 lg:grid-cols-3' }: { groups: ExpressionGroup[]; columns?: string }) {
  return (
    <div className={`grid gap-4 ${columns}`}>
      {groups.map((g) => (
        <div key={g.title} className="rounded-xl border border-rule bg-paper p-4 print:break-inside-avoid print:border-slate/40 print:bg-white">
          <h4 className="text-sm font-bold uppercase tracking-wide text-ocean">{g.title}</h4>
          <ul className="mt-2 space-y-1 text-[0.95rem] text-ink">
            {g.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function TemplateCard({ t, breakBefore }: { t: AnswerTemplate; breakBefore: boolean }) {
  return (
    <article id={t.id} className={`scroll-mt-24 rounded-2xl border border-rule bg-white p-6 sm:p-8 print:rounded-none print:border-0 print:p-0 ${breakBefore ? 'print:break-before-page' : ''}`}>
      <header>
        <p className="text-sm font-semibold text-ocean">{t.epreuve === 'ee' ? 'Expression écrite' : 'Expression orale'} · {t.meta}</p>
        <h3 className="heading mt-1 text-2xl text-night">{t.title}</h3>
        <p className="mt-2 max-w-3xl text-slate print:text-ink">{t.summary}</p>
      </header>

      <section className="mt-7" aria-label="Squelette à compléter">
        <h4 className="heading text-lg text-night">Le squelette à compléter</h4>
        <div className={`mt-3 grid gap-4 ${t.skeletons.length > 1 ? 'lg:grid-cols-2' : ''}`}>
          {t.skeletons.map((s) => (
            <div key={s.label} className="flex flex-col rounded-xl border-2 border-dashed border-sky bg-white print:break-inside-avoid print:border-slate/50">
              <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-2.5">
                <p className="text-sm font-bold text-night">{s.label}</p>
                <CopyButton text={s.text} />
              </div>
              <p className="whitespace-pre-wrap px-4 py-4 text-[0.95rem] leading-relaxed text-ink">
                <Skeleton text={s.text} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {t.questionBank && (
        <section className="mt-8" aria-label="Banque de questions">
          <h4 className="heading text-lg text-night">Banque de questions par thème</h4>
          <div className="mt-3"><Groups groups={t.questionBank} /></div>
        </section>
      )}

      <section className="mt-8" aria-label="Expressions utiles">
        <h4 className="heading text-lg text-night">Expressions utiles</h4>
        <div className="mt-3"><Groups groups={t.expressions} /></div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <section aria-label="Erreurs fréquentes" className="print:break-inside-avoid">
          <h4 className="heading text-lg text-night">Erreurs fréquentes</h4>
          <ul className="mt-3 space-y-2 text-[0.95rem] text-ink">
            {t.mistakes.map((m) => (
              <li key={m} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-0.5 font-bold text-maple">✕</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-label="Exemple commenté" className="rounded-xl bg-paper p-5 print:break-inside-avoid print:border print:border-slate/40 print:bg-white">
          <h4 className="heading text-lg text-night">Exemple commenté</h4>
          <p className="mt-2 text-sm italic text-slate print:text-ink">{t.example.prompt}</p>
          <p className="reading mt-3 whitespace-pre-line text-base text-ink">{t.example.text}</p>
          <p className="mt-4 border-t border-rule pt-3 text-sm text-slate print:text-ink"><strong className="text-night">Pourquoi ça marche : </strong>{t.example.note}</p>
        </section>
      </div>
    </article>
  );
}

const parts = [
  { id: 'expression-ecrite', epreuve: 'ee' as const, title: 'Expression écrite', intro: 'Trois rédactions en 60 minutes. Apprenez la structure, puis entraînez-vous à la remplir avec vos idées : c’est ce qui fait gagner du temps le jour de l’examen.', practice: { href: '/epreuve/expression-ecrite/simulateur/', label: 'Rédiger et faire corriger par l’IA' } },
  { id: 'expression-orale', epreuve: 'eo' as const, title: 'Expression orale', intro: 'Douze minutes face à un examinateur. Ces plans vous évitent les blancs : vous savez toujours ce qui vient ensuite.', practice: { href: '/epreuve/expression-orale/simulateur/', label: 'S’entraîner au micro avec l’IA' } },
];

export default function ModelesPage() {
  return (
    <>
      <PageHeader
        title="Modèles de réponses pour l’expression écrite et orale"
        intro="Pour chacune des six tâches d’expression du TCF Canada : un squelette à compléter, les expressions utiles, les erreurs à éviter et un exemple commenté. Copiez un squelette en un clic, ou imprimez la page pour réviser sur papier."
      >
        <div className="mt-7 flex flex-wrap gap-3 print:hidden">
          <PrintButton />
          <ButtonLink href="/blog/expression-ecrite-tcf-canada-3-taches/" variant="dark">Comprendre les tâches</ButtonLink>
        </div>
        <nav aria-label="Aller à une tâche" className="mt-8 flex flex-wrap gap-2 print:hidden">
          {answerTemplates.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="rounded-full border border-rule px-3.5 py-1.5 text-sm font-semibold text-night hover:border-ocean hover:text-ocean">
              {t.epreuve === 'ee' ? 'Écrit' : 'Oral'}, tâche {t.task}
            </a>
          ))}
        </nav>
      </PageHeader>

      {parts.map((p, i) => (
        <section key={p.id} id={p.id} aria-labelledby={`${p.id}-title`} className={`${i % 2 ? 'bg-white' : 'bg-paper'} py-12 sm:py-16 print:bg-white print:py-4`}>
          <Container>
            <h2 id={`${p.id}-title`} className="heading text-3xl text-night sm:text-4xl">{p.title}</h2>
            <p className="mt-3 max-w-3xl text-lg text-slate print:text-ink">{p.intro}</p>
            <div className="mt-8 space-y-8">
              {templatesFor(p.epreuve).map((t) => <TemplateCard key={t.id} t={t} breakBefore={t.id !== answerTemplates[0].id} />)}
            </div>
            <p className="mt-8 print:hidden">
              <Link href={p.practice.href} className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">{p.practice.label}</Link>
            </p>
          </Container>
        </section>
      ))}

      <section className="bg-night py-12 text-white print:hidden">
        <Container>
          <h2 className="heading text-2xl">Un modèle ne suffit pas : il faut le remplir vite et bien</h2>
          <ForAudience
            visitor={<><p className="mt-3 max-w-2xl text-white/80">Entraînez-vous sur des sujets du type de l’examen et faites corriger vos productions. Commencez par le test de niveau gratuit, puis choisissez un pack si la plateforme vous convient.</p>
              <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/test-de-niveau/">Faire le test de niveau gratuit</ButtonLink><ButtonLink href="/packs/" variant="outline">Voir les packs</ButtonLink></div></>}
            free={<><p className="mt-3 max-w-2xl text-white/80">Entraînez-vous sur des sujets du type de l’examen. Avec un pack, vos productions écrites et orales sont corrigées chaque jour.</p>
              <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/packs/">Voir les packs</ButtonLink><ButtonLink href="/epreuve/expression-ecrite/sujets/" variant="outline">Voir les sujets corrigés</ButtonLink></div></>}
            pack={<><p className="mt-3 max-w-2xl text-white/80">Remplissez un modèle sur un sujet du type de l’examen, puis faites corriger votre production avec votre pack.</p>
              <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/epreuve/expression-ecrite/simulateur/">Faire corriger un texte</ButtonLink><ButtonLink href="/epreuve/expression-orale/simulateur/" variant="outline">M’entraîner à l’oral</ButtonLink></div></>}
          />
        </Container>
      </section>
    </>
  );
}
