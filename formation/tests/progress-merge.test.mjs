import test from 'node:test';
import assert from 'node:assert/strict';
import { compactProgress, mergeProgress, normalizeProgress, MAX_DAYS, MAX_MOCKS } from '../src/lib/progress-merge.ts';

const serie = (date, score) => ({ score, total: 39, mode: 'exam', date, bands: { A1: [1, 2] } });
const mock = (date) => ({ serie: 1, co: 400, ce: 420, total: 820, date });
const progress = (p = {}) => normalizeProgress(p);

test('done ids and days are united, without duplicates', () => {
  const m = mergeProgress(
    progress({ done: ['a', 'b'], meta: { days: ['2026-10-02', '2026-10-01'] } }),
    progress({ done: ['b', 'c'], meta: { days: ['2026-10-01', '2026-10-03'] } }),
  );
  assert.deepEqual(m.done.sort(), ['a', 'b', 'c']);
  assert.deepEqual(m.meta.days, ['2026-10-01', '2026-10-02', '2026-10-03']);
});

test('the remote goal wins when present, else the local one', () => {
  assert.equal(mergeProgress(progress({ meta: { goal: 3 } }), progress({ meta: { goal: 7 } })).meta.goal, 7);
  assert.equal(mergeProgress(progress({ meta: { goal: 3 } }), progress({ meta: {} })).meta.goal, 3);
  assert.equal(mergeProgress(progress({ meta: { goal: 3 } }), progress({ meta: { goal: 4 } })).meta.goal, 3);
});

test('the local last item is kept, else the remote one', () => {
  const a = { id: 'a', href: '/a/', title: 'A' };
  const b = { id: 'b', href: '/b/', title: 'B' };
  assert.deepEqual(mergeProgress(progress({ meta: { last: a } }), progress({ meta: { last: b } })).meta.last, a);
  assert.deepEqual(mergeProgress(progress(), progress({ meta: { last: b } })).meta.last, b);
  assert.equal(mergeProgress(progress(), progress()).meta.last, undefined);
});

test('series keep the most recent attempt, the best score and the most attempts', () => {
  const local = progress({ results: { series: {
    'ce-1': { last: serie('2026-10-05T10:00:00.000Z', 20), best: 30, attempts: 2 },
    'co-1': { last: serie('2026-10-01T10:00:00.000Z', 10), best: 10, attempts: 1 },
  } } });
  const remote = progress({ results: { series: {
    'ce-1': { last: serie('2026-10-01T10:00:00.000Z', 25), best: 25, attempts: 4 },
    'ce-2': { last: serie('2026-10-02T10:00:00.000Z', 12), best: 12, attempts: 1 },
  } } });
  const s = mergeProgress(local, remote).results.series;
  assert.deepEqual(Object.keys(s).sort(), ['ce-1', 'ce-2', 'co-1']);
  assert.equal(s['ce-1'].last.score, 20);
  assert.equal(s['ce-1'].best, 30);
  assert.equal(s['ce-1'].attempts, 4);
});

test('mocks are united by date, newest first, and capped', () => {
  const m = mergeProgress(
    progress({ results: { mocks: [mock('2026-10-02T00:00:00.000Z'), mock('2026-10-01T00:00:00.000Z')] } }),
    progress({ results: { mocks: [mock('2026-10-03T00:00:00.000Z'), mock('2026-10-01T00:00:00.000Z')] } }),
  );
  assert.deepEqual(m.results.mocks.map((x) => x.date.slice(0, 10)), ['2026-10-03', '2026-10-02', '2026-10-01']);
  const many = Array.from({ length: 30 }, (_, i) => mock(new Date(Date.UTC(2026, 0, i + 1)).toISOString()));
  const capped = compactProgress(progress({ results: { mocks: many } })).results.mocks;
  assert.equal(capped.length, MAX_MOCKS);
  assert.equal(capped[0].date, many[29].date);
});

test('days are capped to the most recent ones', () => {
  const days = Array.from({ length: 200 }, (_, i) => new Date(Date.UTC(2026, 0, i + 1)).toISOString().slice(0, 10));
  const m = mergeProgress(progress({ meta: { days } }), progress());
  assert.equal(m.meta.days.length, MAX_DAYS);
  assert.equal(m.meta.days.at(-1), days.at(-1));
});

test('no remote progress keeps the local one; bad data is ignored', () => {
  const local = progress({ done: ['a'], meta: { days: ['2026-10-01'], goal: 5 } });
  assert.deepEqual(mergeProgress(local, null), local);
  const bad = normalizeProgress({ done: 'x', meta: { days: [1, '2026-10-01'], last: { id: 1 } }, results: { series: { s: {} }, mocks: [{}, null] } });
  assert.deepEqual(bad, { done: [], meta: { days: ['2026-10-01'] }, results: { series: {}, mocks: [] } });
  assert.deepEqual(normalizeProgress(null), { done: [], meta: { days: [] }, results: { series: {}, mocks: [] } });
});

test('merging is stable: merging the result again changes nothing', () => {
  const local = progress({ done: ['a'], meta: { days: ['2026-10-01'] }, results: { mocks: [mock('2026-10-01T00:00:00.000Z')] } });
  const remote = progress({ done: ['b'], meta: { days: ['2026-10-02'], goal: 7 } });
  const once = mergeProgress(local, remote);
  assert.equal(JSON.stringify(mergeProgress(once, once)), JSON.stringify(once));
});
