import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/site";
import ReadingPractice from "../../../../formation/src/app/entrainement/ReadingPractice";
export const metadata: Metadata = {
  title: "Exercices gratuits TCF Canada | Paul World Travel",
};
export default function TrainingPreview() {
  return (
    <>
      <PageHero
        title="Lisez, comprenez, progressez."
        intro="Essayez gratuitement la compréhension écrite, à votre rythme ou en huit minutes."
        image="/images/photos/canada-toronto.jpg"
      />
      <section className="bg-paper py-12">
        <Container className="max-w-5xl">
          <Link
            href="/formation/"
            className="mb-6 inline-block font-bold text-ocean hover:underline"
          >
            ← Retour à la formation
          </Link>
          <p className="mb-6 text-slate">
            Six questions originales, de A2 à B2. Cette série de découverte
            n’est pas un test blanc officiel et ne délivre pas de score TCF.
            Aucun compte nécessaire.
          </p>
          <ReadingPractice />
        </Container>
      </section>
    </>
  );
}
