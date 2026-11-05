import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateTcfScore, estimateFromBands, nclcFor, overallNclc, nclcLabel, cefrForScore, NCLC_TABLE, TCF_MAX, TCF_MIN } from '../src/lib/nclc.ts';

// The distribution of the per-level grid: 4 A1, 6 A2, 9 B1, 10 B2, 6 C1, 4 C2.
const grid = { A1: 4, A2: 6, B1: 9, B2: 10, C1: 6, C2: 4 };
const series = (rightUpTo) => Object.entries(grid).flatMap(([level, n]) =>
  Array.from({ length: n }, () => ({ level, correct: Object.keys(grid).indexOf(level) <= Object.keys(grid).indexOf(rightUpTo) })));

test('the estimate follows the per-level grid and stays between 100 and 699', () => {
  assert.equal(estimateTcfScore(series('C2')), 699);
  assert.equal(estimateTcfScore(series('B2')), 12 + 54 + 135 + 210);
  assert.equal(estimateTcfScore(series('none')), TCF_MIN);
  assert.equal(estimateTcfScore(series('A1')), TCF_MIN);
  assert.equal(estimateTcfScore([]), TCF_MIN);
});

test('a series with another distribution still gives 699 when perfect', () => {
  const ours = [...series('C2').filter((q) => q.level !== 'B1'), ...Array.from({ length: 10 }, () => ({ level: 'B1', correct: true }))];
  ours.splice(ours.findIndex((q) => q.level === 'B2'), 1);
  assert.equal(ours.length, 39);
  assert.equal(estimateTcfScore(ours), TCF_MAX);
});

test('the estimate from bands matches the per-question one on the grid', () => {
  assert.equal(estimateFromBands({ 'A1-A2': [10, 10], 'B1-B2': [19, 19], 'C1-C2': [10, 10] }), 699);
  assert.equal(estimateFromBands({ 'A1-A2': [10, 10], 'B1-B2': [19, 19], 'C1-C2': [0, 10] }), estimateTcfScore(series('B2')));
  assert.equal(estimateFromBands({}), TCF_MIN);
});

test('IRCC table: comprehension limits', () => {
  const cases = [
    ['co', 330, null], ['co', 331, 4], ['co', 368, 4], ['co', 369, 5], ['co', 397, 5], ['co', 398, 6], ['co', 457, 6],
    ['co', 458, 7], ['co', 502, 7], ['co', 503, 8], ['co', 522, 8], ['co', 523, 9], ['co', 548, 9], ['co', 549, 10], ['co', 699, 10],
    ['ce', 341, null], ['ce', 342, 4], ['ce', 374, 4], ['ce', 375, 5], ['ce', 405, 5], ['ce', 406, 6], ['ce', 452, 6],
    ['ce', 453, 7], ['ce', 498, 7], ['ce', 499, 8], ['ce', 523, 8], ['ce', 524, 9], ['ce', 548, 9], ['ce', 549, 10], ['ce', 699, 10],
  ];
  for (const [skill, score, level] of cases) assert.equal(nclcFor(skill, score), level, `${skill} ${score}`);
  assert.equal(nclcFor('co', 700), null);
  assert.equal(nclcFor('ce', 99), null);
  assert.equal(nclcFor('co', NaN), null);
});

test('IRCC table: expression notes out of 20', () => {
  const expected = { 0: null, 3: null, 4: 4, 5: 4, 6: 5, 7: 6, 9: 6, 10: 7, 11: 7, 12: 8, 13: 8, 14: 9, 15: 9, 16: 10, 20: 10 };
  for (const skill of ['ee', 'eo']) {
    for (const [note, level] of Object.entries(expected)) assert.equal(nclcFor(skill, Number(note)), level, `${skill} ${note}`);
  }
  assert.equal(nclcFor('ee', 9.5), 6);
  assert.equal(nclcFor('eo', 21), null);
  assert.equal(nclcFor('eo', -1), null);
});

test('the table has no gap nor overlap', () => {
  for (const skill of ['co', 'ce', 'ee', 'eo']) {
    for (let i = 1; i < NCLC_TABLE.length; i++) assert.equal(NCLC_TABLE[i][skill][1] + 1, NCLC_TABLE[i - 1][skill][0], `${skill} NCLC ${NCLC_TABLE[i].nclc}`);
  }
});

test('the overall level is the lowest skill', () => {
  assert.equal(overallNclc([9, 7, 8, 10]), 7);
  assert.equal(overallNclc([9, null, 8, 10]), null);
  assert.equal(overallNclc([]), null);
  assert.equal(nclcLabel(10), 'NCLC 10 et plus');
  assert.equal(nclcLabel(7), 'NCLC 7');
  assert.equal(nclcLabel(null), 'Inférieur au NCLC 4');
});

test('CEFR level on the TCF score scale', () => {
  assert.equal(cefrForScore(99), null);
  assert.equal(cefrForScore(100), 'A1');
  assert.equal(cefrForScore(299), 'A2');
  assert.equal(cefrForScore(458), 'B2');
  assert.equal(cefrForScore(599), 'C1');
  assert.equal(cefrForScore(699), 'C2');
});
