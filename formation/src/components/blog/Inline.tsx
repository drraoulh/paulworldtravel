import Link from 'next/link';
import type { ReactNode } from 'react';

const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders the two inline marks used in typed content: **bold** and [text](href). */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    if (m[1] !== undefined) {
      out.push(<strong key={i} className="font-bold text-night">{m[1]}</strong>);
    } else {
      const [label, href] = [m[2], m[3]];
      const cls = 'font-semibold text-ocean underline decoration-ocean/30 underline-offset-2 hover:decoration-ocean';
      out.push(
        href.startsWith('/')
          ? <Link key={i} href={href} className={cls}>{label}</Link>
          : <a key={i} href={href} className={cls} target="_blank" rel="noopener noreferrer">{label}</a>,
      );
    }
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Plain text of a marked string (for word counts and summaries). */
export const plainText = (text: string) => text.replace(TOKEN, (_, bold, label) => bold ?? label);
