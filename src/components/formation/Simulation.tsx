"use client";
import Link from "next/link";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { skills } from "@/content/formation";
import { DemoGuard } from "./DemoProvider";
import { skillIcons } from "./SkillCards";
export default function Simulation() {
  return (
    <DemoGuard>
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-ocean">
            SE METTRE EN SITUATION
          </span>
          <h1 className="heading mt-5 text-3xl text-night sm:text-4xl">
            Un premier tour des quatre épreuves.
          </h1>
          <p className="mt-5 text-lg text-slate">
            Enchaînez une version courte de chaque compétence. Chaque étape
            possède son chronomètre et son bilan. Vous démarrez la suivante
            quand vous êtes prêt.
          </p>
          <div className="mt-7 flex items-center gap-3 rounded-xl bg-night p-5 font-semibold text-white">
            <FiClock className="h-6 w-6 text-container" aria-hidden="true" />
            31 minutes d’exercices, hors lecture des bilans
          </div>
          <ol className="mt-8 space-y-4">
            {skills.map((s, i) => {
              const Icon = skillIcons[s.id];
              return (
                <li
                  key={s.id}
                  className="flex items-center gap-4 rounded-2xl border border-rule bg-white p-5"
                >
                  <span className={`rounded-xl p-3 ${s.color}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate">
                      ÉTAPE {i + 1}
                    </p>
                    <h2 className="mt-1 font-bold text-night">{s.title}</h2>
                    <p className="mt-1 text-sm text-slate">{s.detail}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-night">
                    {s.minutes} min
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="font-bold text-night">
              Une simulation de découverte, pas un examen blanc complet.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Le format officiel comporte notamment 39 questions par
              compréhension et des durées différentes. Cette démonstration
              utilise les mêmes séries que les entraînements et ne fournit
              aucune équivalence NCLC. L’oral est une pratique autonome, sans
              interlocuteur. Les textes et audios doivent être téléchargés
              depuis leur bilan si vous souhaitez les garder.
            </p>
          </div>
          <Link
            href={`/formation/epreuves/${skills[0].slug}/?mode=simulation`}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-container px-6 py-4 font-bold text-night"
          >
            Commencer par l’écoute <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </DemoGuard>
  );
}
