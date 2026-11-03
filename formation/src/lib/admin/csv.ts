// Reads a list of learners pasted from Excel or exported as CSV (comma, semicolon or tab).

export interface ImportRow { line: number; first_name: string; last_name: string; email: string; phone: string; city: string; pack: string }

const fields: Record<string, keyof Omit<ImportRow, 'line'>> = {
  prenom: 'first_name', prenoms: 'first_name', firstname: 'first_name', first_name: 'first_name',
  nom: 'last_name', lastname: 'last_name', last_name: 'last_name', nomdefamille: 'last_name',
  email: 'email', mail: 'email', courriel: 'email', adresseemail: 'email',
  telephone: 'phone', tel: 'phone', phone: 'phone', whatsapp: 'phone', numero: 'phone',
  ville: 'city', city: 'city', villeetpays: 'city', pays: 'city',
  pack: 'pack', formule: 'pack', offre: 'pack',
};
const order: (keyof Omit<ImportRow, 'line'>)[] = ['first_name', 'last_name', 'email', 'phone', 'city', 'pack'];
const key = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z_]/g, '');

function splitLine(line: string, sep: string) {
  const out: string[] = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') quoted = false;
      else cur += c;
    } else if (c === '"') quoted = true;
    else if (c === sep) { out.push(cur.trim()); cur = ''; }
    else cur += c;
  }
  out.push(cur.trim());
  return out;
}

export function parseLearners(text: string, max = 200) {
  const lines = text.replace(/^﻿/, '').split(/\r?\n/).filter((l) => l.trim());
  if (!lines.length) return { rows: [] as ImportRow[], tooMany: false };
  const first = lines[0];
  const sep = ['\t', ';', ','].sort((a, b) => first.split(b).length - first.split(a).length)[0];
  const head = splitLine(first, sep).map((h) => fields[key(h)]);
  const hasHeader = head.some(Boolean) && !first.includes('@');
  const columns = hasHeader ? head : order;
  const body = hasHeader ? lines.slice(1) : lines;
  const rows = body.slice(0, max).map((l, i) => {
    const cells = splitLine(l, sep);
    const row: ImportRow = { line: i + (hasHeader ? 2 : 1), first_name: '', last_name: '', email: '', phone: '', city: '', pack: '' };
    columns.forEach((c, j) => { if (c && cells[j]) row[c] = cells[j]; });
    row.email = row.email.toLowerCase();
    row.pack = key(row.pack);
    return row;
  });
  return { rows, tooMany: body.length > max };
}
