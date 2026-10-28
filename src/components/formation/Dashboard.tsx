"use client";
import Link from "next/link";
import { FiArrowRight, FiTarget, FiClock, FiCheckCircle } from "react-icons/fi";
import { useDemo, DemoGuard } from "./DemoProvider";
import SkillCards from "./SkillCards";
import { skills } from "@/content/formation";
export default function Dashboard() {
  const { profile, results, clear } = useDemo();
  const completed = [...new Set(results.map((r) => r.skill))];
  const next = skills.find((s) => !completed.includes(s.id)) ?? skills[0];
  return (
    <DemoGuard>
      <div className="bg-paper py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ocean">
                Votre espace candidat
              </p>
              <h1 className="heading mt-3 text-3xl text-night sm:text-4xl">
                Bonjour {profile?.name}, on avance ?
              </h1>
              <p className="mt-3 text-slate">
                Une séance à la fois, construisez votre méthode pour le TCF
                Canada.
              </p>
            </div>
            <span className="rounded-full border border-rule bg-white px-4 py-2 text-sm font-semibold text-night">
              Objectif personnel : {profile?.goal}
            </span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                Icon: FiCheckCircle,
                value: `${completed.length}/4`,
                label: "épreuves découvertes",
              },
              {
                Icon: FiClock,
                value: String(results.length),
                label: "séances terminées",
              },
              {
                Icon: FiTarget,
                value: `${Math.round(results.reduce((n, r) => n + r.seconds, 0) / 60)} min`,
                label: "de pratique enregistrée",
              },
            ].map(({ Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-rule bg-white p-5"
              >
                <Icon className="h-6 w-6 text-ocean" aria-hidden="true" />
                <div>
                  <p className="heading text-2xl text-night">{value}</p>
                  <p className="text-sm text-slate">{label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl bg-night p-7 text-white lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-container">
                Votre prochaine séance
              </p>
              <h2 className="heading mt-4 text-2xl">{next.title}</h2>
              <p className="mt-3 max-w-lg text-blue-100">{next.description}</p>
              <Link
                href={`/formation/epreuves/${next.slug}/`}
                className="mt-6 inline-flex items-center gap-3 rounded-xl bg-container px-5 py-3 font-bold text-night"
              >
                {results.length
                  ? "Continuer ma préparation"
                  : "Commencer ma première séance"}
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-2xl border border-rule bg-white p-7">
              <h2 className="heading text-xl text-night">
                Votre parcours en 3 étapes
              </h2>
              <ol className="mt-5 space-y-4 text-sm text-slate">
                <li>01 · Découvrez chaque type d’épreuve.</li>
                <li>02 · Relisez les corrections et vos productions.</li>
                <li>03 · Essayez la simulation chronométrée.</li>
              </ol>
              <Link
                href="/formation/simulation/"
                className="mt-5 inline-block font-bold text-ocean"
              >
                Voir la simulation →
              </Link>
            </div>
          </div>
          <div className="mb-6 mt-12 flex flex-wrap items-end justify-between gap-3">
            <h2 className="heading text-2xl text-night">
              Sur quoi travaille-t-on aujourd’hui ?
            </h2>
            <Link
              href="/formation/resultats/"
              className="text-sm font-bold text-ocean"
            >
              Mes résultats →
            </Link>
          </div>
          <SkillCards completed={completed} />
          <div className="mt-10 rounded-2xl border border-rule bg-white p-6">
            <h2 className="heading text-lg text-night">
              Vous gardez la main sur vos données.
            </h2>
            <p className="mt-2 text-sm text-slate">
              Le pseudo et les 50 derniers bilans sont conservés sur cet
              appareil. Vos textes et enregistrements restent dans la séance en
              cours et ne sont pas envoyés à un serveur. Se déconnecter conserve
              les bilans sur cet appareil ; effacer la démo les supprime.
            </p>
            <button
              className="mt-4 text-sm font-bold text-red-700 underline"
              onClick={() => {
                if (
                  window.confirm(
                    "Effacer le pseudo et tous les bilans de démonstration sur cet appareil ?",
                  )
                )
                  clear();
              }}
            >
              Effacer ma démo
            </button>
          </div>
        </div>
      </div>
    </DemoGuard>
  );
}
