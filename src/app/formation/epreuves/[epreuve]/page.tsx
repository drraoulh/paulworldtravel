import { notFound } from "next/navigation";
import { skills } from "@/content/formation";
import ExerciseWorkspace from "@/components/formation/ExerciseWorkspace";
export const metadata = {
  title: "Entraînement | Formation Paul World Travel",
  robots: { index: false },
};
export function generateStaticParams() {
  return skills.map((skill) => ({ epreuve: skill.slug }));
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ epreuve: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { epreuve } = await params;
  const skill = skills.find((s) => s.slug === epreuve);
  if (!skill) notFound();
  return (
    <ExerciseWorkspace
      key={skill.id}
      skillId={skill.id}
      simulation={(await searchParams).mode === "simulation"}
    />
  );
}
