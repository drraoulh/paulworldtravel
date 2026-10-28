export type DemoSkill = "ce" | "co" | "ee" | "eo";
export type DemoResult = {
  id: string;
  skill: DemoSkill;
  date: string;
  correct: number | null;
  total: number;
  completed: number;
  seconds: number;
  simulation: boolean;
};
export type DemoProfile = { name: string; goal: string };
export const DEMO_KEY = "pwt-formation-demo-v1";
export function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/u).length : 0;
}
export function secondsLeft(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
export function validResult(value: unknown): value is DemoResult {
  if (!value || typeof value !== "object") return false;
  const r = value as DemoResult;
  return (
    typeof r.id === "string" &&
    ["ce", "co", "ee", "eo"].includes(r.skill) &&
    typeof r.date === "string" &&
    Number.isFinite(Date.parse(r.date)) &&
    Number.isInteger(r.total) &&
    r.total > 0 &&
    r.total <= 20 &&
    Number.isInteger(r.completed) &&
    r.completed >= 0 &&
    r.completed <= r.total &&
    (r.correct === null ||
      (Number.isInteger(r.correct) &&
        r.correct >= 0 &&
        r.correct <= r.completed)) &&
    Number.isFinite(r.seconds) &&
    r.seconds >= 0 &&
    typeof r.simulation === "boolean"
  );
}
export function parseDemo(raw: string | null): {
  profile: DemoProfile | null;
  results: DemoResult[];
} {
  try {
    const v = JSON.parse(raw ?? "null");
    const profile =
      v?.profile &&
      typeof v.profile.name === "string" &&
      v.profile.name.trim().length > 0 &&
      v.profile.name.length <= 40 &&
      ["NCLC 5", "NCLC 7", "NCLC 9"].includes(v.profile.goal)
        ? v.profile
        : null;
    return {
      profile,
      results: Array.isArray(v?.results)
        ? v.results.filter(validResult).slice(-50)
        : [],
    };
  } catch {
    return { profile: null, results: [] };
  }
}
export function safeDemoNext(value: string | null) {
  return value &&
    /^\/formation\/(?:espace|epreuves|resultats|simulation)(?:\/|\?|$)/.test(
      value,
    ) &&
    !/[\\\u0000-\u0020]/.test(value) &&
    !/%(?:2f|5c)/i.test(value)
    ? value
    : "/formation/espace/";
}
