import test from 'node:test';
import assert from 'node:assert/strict';
import { completionId, lessonIsRead, quizPassed, isLessonItem } from '../src/lib/lesson-progress.ts';
import { normalizeProgress, mergeProgress } from '../src/lib/progress-merge.ts';
import { extraQuestions } from '../src/content/parcours/extra-questions.ts';

test('legacy completion and consultation do not count as passed quizzes', () => {
  const id = 'co/ecoute-unique';
  assert.equal(lessonIsRead([id], id), true);
  assert.equal(lessonIsRead([`read:${id}`], id), true);
  assert.equal([id, `read:${id}`].includes(completionId(id)), false);
  assert.equal(lessonIsRead([completionId(id)], id), true);
  assert.notEqual(completionId(id), id);
});
test('only a full, non-empty quiz passes; practice markers remain independent', () => {
  assert.equal(quizPassed(5, 6), false);
  assert.equal(quizPassed(6, 6), true);
  assert.equal(quizPassed(0, 0), false);
  assert.equal(quizPassed(7, 6), false);
  assert.equal(quizPassed(NaN, 6), false);
  assert.equal(isLessonItem('ee/simulation-1'), false);
  assert.equal(completionId('ee/simulation-1'), 'ee/simulation-1');
  assert.equal(completionId('test-niveau'), 'test-niveau');
});
test('reading and quiz validation survive account progress merges separately', () => {
  const id = 'ce/documents-pratiques';
  const merged = mergeProgress(normalizeProgress({ done: [id, `read:${id}`] }), normalizeProgress({ done: [completionId(id)] }));
  assert.deepEqual(new Set(merged.done), new Set([id, `read:${id}`, completionId(id)]));
});
test('60 new application questions cover all 20 lessons, with complete corrections', () => {
  assert.equal(Object.keys(extraQuestions).length, 20);
  const seen = new Set();
  for (const [id, questions] of Object.entries(extraQuestions)) {
    assert.equal(isLessonItem(id), true, id);
    assert.equal(questions.length, 3, id);
    for (const q of questions) {
      assert.ok(!seen.has(q.prompt), `duplicate: ${q.prompt}`);
      seen.add(q.prompt);
      assert.equal(q.choices.length, 4);
      assert.equal(new Set(q.choices).size, 4);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
      assert.ok(q.explanation.length > 40);
    }
  }
  assert.equal(seen.size, 60);
});
