import { safeRedirectPath } from '../src/lib/redirect.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { gradeAnswers, remainingSeconds, isValidEndDate } from '../src/lib/practice.ts';
import { effectiveStatus } from '../src/lib/enrollment.ts';
import { readingQuestions } from '../src/content/reading.ts';

test('all original questions have unique ids, four choices and a valid correction', () => {
  assert.equal(new Set(readingQuestions.map(q => q.id)).size, readingQuestions.length);
  for (const q of readingQuestions) { assert.equal(q.choices.length, 4); assert.ok(q.answer >= 0 && q.answer < 4); assert.ok(q.explanation.length > 20); }
});
test('grading counts unanswered questions as incorrect', () => {
  assert.deepEqual(gradeAnswers([{ answer: 1 }, { answer: 0 }, { answer: 2 }], [1, null, 0]), { correct: 1, total: 3, answered: 2 });
  assert.equal(gradeAnswers(readingQuestions, readingQuestions.map(q => q.answer)).correct, 6);
  assert.equal(gradeAnswers(readingQuestions, []).correct, 0);
});
test('timer uses an absolute deadline, even if a background tab pauses ticks', () => {
  assert.equal(remainingSeconds(480000, 1000), 479);
  assert.equal(remainingSeconds(480000, 479999), 1);
  assert.equal(remainingSeconds(480000, 490000), 0);
});
test('activation rejects invalid calendar dates and dates in the past', () => {
  assert.equal(isValidEndDate('2026-02-30', '2026-02-01'), false);
  assert.equal(isValidEndDate('invalid', '2026-10-28'), false);
  assert.equal(isValidEndDate('2026-10-27', '2026-10-28'), false);
  assert.equal(isValidEndDate('2026-10-28', '2026-10-28'), true);
  assert.equal(isValidEndDate('2028-02-29', '2026-10-28'), true);
});

test('enrollment dates include the last day and reject future access', () => {
  assert.equal(effectiveStatus({ status: 'active', starts_at: '2026-10-28', ends_at: '2026-10-29' }, '2026-10-28'), 'active');
  assert.equal(effectiveStatus({ status: 'active', ends_at: '2026-10-28' }, '2026-10-28'), 'active');
  assert.equal(effectiveStatus({ status: 'active', ends_at: '2026-10-27' }, '2026-10-28'), 'expired');
  assert.equal(effectiveStatus({ status: 'active', starts_at: '2026-10-29', ends_at: null }, '2026-10-28'), 'scheduled');
  assert.equal(effectiveStatus({ status: 'cancelled', ends_at: null }, '2026-10-28'), 'cancelled');
});

test('auth redirects reject external URLs and normalization tricks', () => {
  for (const value of ['https://example.com', '//example.com', '/\\example.com', '/%2fexample.com', '/%5cexample.com', '/\n/example.com', null]) assert.equal(safeRedirectPath(value), '/espace/');
  assert.equal(safeRedirectPath('/admin/?statut=active'), '/admin/?statut=active');
  assert.equal(safeRedirectPath('/auth/nouveau-mot-de-passe/'), '/auth/nouveau-mot-de-passe/');
});
