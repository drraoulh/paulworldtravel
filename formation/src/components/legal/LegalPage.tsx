import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui';
import { legalLinks, LEGAL_UPDATED, LEGAL_VERSION, publisher } from '@/content/legal';
import { contact } from '@/content/contact';
import PrintLegalButton from './PrintLegalButton';

export type LegalSection = { id: string; title: string; content: ReactNode };
export default function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return <>
    <header className="border-b border-rule bg-white py-10 sm:py-14"><Container>
      <p className="text-sm font-semibold text-ocean">Paul World Travel Formation · {publisher.shortName}</p>
      <h1 className="display mt-3 text-3xl text-night sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-slate">{intro}</p>
      <p className="mt-4 text-sm text-slate">Mise à jour : {LEGAL_UPDATED} · Version {LEGAL_VERSION}</p>
      <div className="mt-5"><PrintLegalButton /></div>
    </Container></header>
    <section className="bg-paper py-10 sm:py-14"><Container className="grid min-w-0 gap-8 xl:grid-cols-[14rem_minmax(0,1fr)]">
      <aside className="print:hidden"><nav aria-label="Sommaire du document" className="rounded-2xl border border-rule bg-white p-5"><p className="font-bold text-night">Dans ce document</p><ol className="mt-3 space-y-3 text-sm">{sections.map((section) => <li key={section.id}><a className="text-ocean underline-offset-4 hover:underline" href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
      <nav aria-label="Documents légaux" className="mt-5 flex flex-col gap-3 p-2 text-sm">{legalLinks.map((link) => <Link className="font-semibold text-ocean hover:underline" key={link.href} href={link.href}>{link.label}</Link>)}</nav></aside>
      <article className="min-w-0 space-y-9 rounded-2xl border border-rule bg-white p-6 sm:p-9 print:border-0 print:p-0">{sections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-28"><h2 className="heading text-xl text-night sm:text-2xl">{section.title}</h2><div className="mt-4 space-y-3 leading-relaxed text-ink [&_a]:break-words [&_a]:font-semibold [&_a]:text-ocean [&_a]:underline [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_table]:w-full [&_th]:text-left [&_td]:align-top [&_td]:py-2 [&_td]:pr-3">{section.content}</div></section>)}
      <p className="border-t border-rule pt-6 text-sm text-slate">Contact : <a className="text-ocean underline" href={`mailto:${contact.email}`}>{contact.email}</a> · {publisher.name}, {publisher.headquarters}.</p>
      </article>
    </Container></section>
  </>;
}
