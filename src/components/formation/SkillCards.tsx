import Link from "next/link";
import {
  FiHeadphones,
  FiBookOpen,
  FiEdit3,
  FiMic,
  FiArrowUpRight,
} from "react-icons/fi";
import { skills, type SkillId } from "@/content/formation";
export const skillIcons = {
  co: FiHeadphones,
  ce: FiBookOpen,
  ee: FiEdit3,
  eo: FiMic,
};
export default function SkillCards({
  completed = [],
}: {
  completed?: SkillId[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {skills.map((skill) => {
        const Icon = skillIcons[skill.id];
        return (
          <Link
            key={skill.id}
            href={`/formation/epreuves/${skill.slug}/`}
            className="group flex flex-col rounded-2xl border border-rule bg-white p-6 transition hover:border-ocean hover:shadow-md sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-2xl p-3 ${skill.color}`}>
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <span className="text-xs font-semibold text-slate">
                {completed.includes(skill.id)
                  ? "Déjà pratiquée"
                  : "À découvrir"}
              </span>
            </div>
            <h3 className="heading mt-6 text-xl text-night">{skill.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
              {skill.description}
            </p>
            <p className="mt-5 text-xs font-semibold text-slate">
              {skill.detail} · {skill.minutes} min en simulation
            </p>
            <span className="mt-5 flex items-center gap-2 font-bold text-ocean">
              M’entraîner <FiArrowUpRight aria-hidden="true" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
