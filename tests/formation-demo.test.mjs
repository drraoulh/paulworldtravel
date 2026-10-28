import test from "node:test";
import assert from "node:assert/strict";
import {
  parseDemo,
  safeDemoNext,
  secondsLeft,
  validResult,
  wordCount,
} from "../src/lib/formation/demo.ts";
const result = {
  id: "attempt-1",
  skill: "ce",
  date: "2026-10-28T12:00:00Z",
  correct: 4,
  total: 6,
  completed: 5,
  seconds: 120,
  simulation: false,
};
test("demo storage recovers from corrupt data and invalid profile", () => {
  assert.deepEqual(parseDemo("{broken"), { profile: null, results: [] });
  assert.equal(
    parseDemo(JSON.stringify({ profile: { name: "", goal: "NCLC 7" } }))
      .profile,
    null,
  );
  assert.equal(
    parseDemo(JSON.stringify({ profile: { name: "Marie", goal: "NCLC 7" } }))
      .profile.name,
    "Marie",
  );
  assert.deepEqual(
    parseDemo(
      JSON.stringify({ results: [result, { ...result, correct: 9 }, null] }),
    ).results,
    [result],
  );
});
test("only the latest 50 valid attempts are kept", () => {
  const parsed = parseDemo(
    JSON.stringify({
      results: Array.from({ length: 55 }, (_, i) => ({
        ...result,
        id: `attempt-${i}`,
      })),
    }),
  );
  assert.equal(parsed.results.length, 50);
  assert.equal(parsed.results[0].id, "attempt-5");
});
test("results reject impossible scores, negative durations and unknown skills", () => {
  assert.equal(validResult(result), true);
  for (const patch of [
    { correct: 6 },
    { completed: 7 },
    { seconds: -1 },
    { skill: "other" },
    { date: "invalid" },
    { total: 0 },
  ])
    assert.equal(validResult({ ...result, ...patch }), false);
  assert.equal(validResult({ ...result, skill: "ee", correct: null }), true);
});
test("word counter handles blank text, French apostrophes and multiple spaces", () => {
  assert.equal(wordCount(" \n "), 0);
  assert.equal(wordCount("Bonjour,\n je m’appelle   Léa."), 4);
});
test("timer remains correct across suspended tabs and expiration", () => {
  assert.equal(secondsLeft(60000, 1000), 59);
  assert.equal(secondsLeft(60000, 59999), 1);
  assert.equal(secondsLeft(60000, 90000), 0);
});
test("simulated login only redirects within the permitted formation pages", () => {
  assert.equal(
    safeDemoNext("/formation/epreuves/comprehension-orale/?mode=simulation"),
    "/formation/epreuves/comprehension-orale/?mode=simulation",
  );
  for (const path of [
    "//example.com",
    "https://example.com",
    "/admin/",
    "/formation/epreuves/\\example.com",
    "/formation/epreuves/%2fexample.com",
    null,
  ])
    assert.equal(safeDemoNext(path), "/formation/espace/");
});
