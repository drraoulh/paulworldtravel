import type { Block } from '@/content/blog/types';
import { Inline } from './Inline';

/** The body of a blog article, block by block, in the reading typeface. */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="reading space-y-5 text-ink">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return <h2 key={i} id={b.id} className="heading scroll-mt-28 pt-6 text-[1.7rem] text-night">{b.text}</h2>;
          case 'h3':
            return <h3 key={i} className="heading pt-2 text-xl text-night">{b.text}</h3>;
          case 'p':
            return <p key={i}><Inline text={b.text} /></p>;
          case 'ul':
            return <ul key={i} className="list-disc space-y-2 pl-6 marker:text-ocean">{b.items.map((t) => <li key={t}><Inline text={t} /></li>)}</ul>;
          case 'ol':
            return <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-bold marker:text-ocean">{b.items.map((t) => <li key={t}><Inline text={t} /></li>)}</ol>;
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-rule bg-white font-sans text-base">
                <table className="w-full min-w-[32rem] text-left">
                  {b.caption && <caption className="px-4 pt-3 text-left text-sm text-slate">{b.caption}</caption>}
                  <thead className="bg-night text-sm text-white">
                    <tr>{b.head.map((h) => <th key={h} scope="col" className="px-4 py-2.5 font-semibold">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    {b.rows.map((r) => (
                      <tr key={r.join('|')}>{r.map((c, j) => j === 0
                        ? <th key={j} scope="row" className="px-4 py-2.5 font-bold text-night"><Inline text={c} /></th>
                        : <td key={j} className="px-4 py-2.5"><Inline text={c} /></td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'callout':
            return (
              <aside key={i} className={`rounded-xl border-l-4 p-5 font-sans text-base ${b.tone === 'warning' ? 'border-maple bg-red-50' : 'border-ocean bg-container/40'}`}>
                {b.title && <p className="heading text-night">{b.title}</p>}
                <p className={b.title ? 'mt-1' : ''}><Inline text={b.text} /></p>
              </aside>
            );
          case 'example':
            return (
              <figure key={i} className="rounded-xl border border-rule bg-white p-5 font-sans text-base">
                {b.title && <figcaption className="mb-2 text-sm font-bold uppercase tracking-wide text-ocean">{b.title}</figcaption>}
                <p className="whitespace-pre-line leading-relaxed">{b.text}</p>
              </figure>
            );
        }
      })}
    </div>
  );
}
