import type { ReactNode } from 'react';

/*
 * Shows an AI reply written in simple Markdown: paragraphs, "-" or "1." lists,
 * "#" headings, **bold**, *italic* and `code`. Everything else stays plain text.
 */

const INLINE = /\*\*(.+?)\*\*|__(.+?)__|\*([^*\s][^*]*?)\*|_([^_\s][^_]*?)_|`([^`]+)`/g;

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const k = `${key}-${i}`;
    if (m[1] ?? m[2]) out.push(<strong key={k} className="font-bold text-night">{m[1] ?? m[2]}</strong>);
    else if (m[3] ?? m[4]) out.push(<em key={k}>{m[3] ?? m[4]}</em>);
    else out.push(<code key={k} className="rounded bg-white px-1 py-0.5 text-[0.95em]">{m[5]}</code>);
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type Block = { kind: 'p' | 'h' | 'ul' | 'ol'; lines: string[] };

function blocks(text: string): Block[] {
  const out: Block[] = [];
  for (const raw of text.replace(/\r/g, '').split('\n')) {
    const line = raw.trim();
    if (!line) { out.push({ kind: 'p', lines: [] }); continue; }
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const number = line.match(/^\d+[.)]\s+(.*)$/);
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    const kind: Block['kind'] = bullet ? 'ul' : number ? 'ol' : heading ? 'h' : 'p';
    const content = (bullet ?? number ?? heading)?.[1] ?? line;
    const prev = out[out.length - 1];
    if (prev && prev.kind === kind && kind !== 'h' && (kind !== 'p' || prev.lines.length > 0)) prev.lines.push(content);
    else out.push({ kind, lines: [content] });
  }
  return out.filter((b) => b.lines.length > 0);
}

export default function RichReply({ text }: { text: string }) {
  return (
    <div className="space-y-2.5">
      {blocks(text).map((b, i) => {
        const key = String(i);
        if (b.kind === 'h') return <p key={key} className="font-bold text-night">{inline(b.lines[0], key)}</p>;
        if (b.kind === 'ul') return <ul key={key} className="list-disc space-y-1 pl-5">{b.lines.map((l, j) => <li key={j}>{inline(l, `${key}-${j}`)}</li>)}</ul>;
        if (b.kind === 'ol') return <ol key={key} className="list-decimal space-y-1 pl-5">{b.lines.map((l, j) => <li key={j}>{inline(l, `${key}-${j}`)}</li>)}</ol>;
        return <p key={key}>{b.lines.map((l, j) => <span key={j}>{j > 0 && <br />}{inline(l, `${key}-${j}`)}</span>)}</p>;
      })}
    </div>
  );
}
