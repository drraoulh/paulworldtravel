"use client";
import Link from "next/link";
import { FiArrowUpRight, FiAward } from "react-icons/fi";
import { skills } from "@/content/formation";
import { DemoGuard, useDemo } from "./DemoProvider";
export default function Results() {
  const { results } = useDemo();
  return (
    <DemoGuard>
      <section className="bg-paper py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-ocean">
            Voir ses progrès, choisir la suite
          </p>
          <h1 className="heading mt-4 text-3xl text-night sm:text-4xl">
            Votre carnet de préparation.
          </h1>
          <p className="mt-5 max-w-2xl text-slate">
            Vos bilans sont indicatifs et conservés sur cet appareil. Les QCM
            sont corrigés automatiquement ; les productions écrites et orales
            sont auto-évaluées, sans note officielle.
          </p>
          {!results.length ? (
            <div className="mt-10 rounded-2xl border border-rule bg-white p-10 text-center">
              <FiAward
                className="mx-auto h-10 w-10 text-ocean"
                aria-hidden="true"
              />
              <h2 className="heading mt-5 text-2xl text-night">
                Votre première séance vous attend.
              </h2>
              <p className="mt-3 text-slate">
                Terminez un entraînement pour retrouver votre premier bilan ici.
              </p>
              <Link
                href="/formation/epreuves/"
                className="mt-6 inline-block rounded-xl bg-night px-6 py-3 font-bold text-white"
              >
                Choisir une épreuve
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((s) => {
                  const rows = results.filter((r) => r.skill === s.id);
                  const last = rows.at(-1);
                  return (
                    <div
                      key={s.id}
                      className="rounded-2xl border border-rule bg-white p-5"
                    >
                      <p className="text-sm font-bold text-night">{s.title}</p>
                      <p className="heading mt-4 text-2xl text-ocean">
                        {last
                          ? last.correct === null
                            ? `${last.completed}/${last.total} tâches`
                            : `${last.correct}/${last.total}`
                          : "À découvrir"}
                      </p>
                      <p className="mt-2 text-xs text-slate">
                        {rows.length} séance(s) ·{" "}
                        {last ? "dernier bilan" : "aucun résultat"}
                      </p>
                      <Link
                        href={`/formation/epreuves/${s.slug}/`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ocean"
                      >
                        S’entraîner <FiArrowUpRight aria-hidden="true" />
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h2 className="heading mb-5 mt-10 text-2xl text-night">
                Vos dernières séances
              </h2>
              <ol className="space-y-3">
                {[...results].reverse().map((r) => {
                  const skill = skills.find((s) => s.id === r.skill)!;
                  return (
                    <li
                      key={r.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rule bg-white p-5"
                    >
                      <div>
                        <h3 className="font-bold text-night">{skill.title}</h3>
                        <p className="mt-1 text-xs text-slate">
                          {new Date(r.date).toLocaleString("fr-FR")} ·{" "}
                          {r.simulation
                            ? "Simulation raccourcie"
                            : "Entraînement"}{" "}
                          · {Math.floor(r.seconds / 60)} min {r.seconds % 60} s
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-night">
                          {r.correct === null
                            ? `${r.completed}/${r.total} tâches pratiquées`
                            : `${r.correct}/${r.total} bonnes réponses`}
                        </p>
                        <p className="mt-1 text-xs text-slate">
                          {r.correct === null
                            ? "Auto-évaluation, sans note"
                            : "Score sur cette série uniquement"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/formation/espace/"
              className="font-bold text-ocean hover:underline"
            >
              ← Mon espace
            </Link>
            <Link
              href="/formation/simulation/"
              className="font-bold text-ocean hover:underline"
            >
              Essayer la simulation →
            </Link>
          </div>
        </div>
      </section>
    </DemoGuard>
  );
}
