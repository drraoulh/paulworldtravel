import SkillCards from "@/components/formation/SkillCards";
import { Container } from "@/components/site";
export const metadata = {
  title: "Les quatre épreuves | Formation Paul World Travel",
};
export default function Page() {
  return (
    <section className="bg-paper py-12 sm:py-16">
      <Container className="max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-widest text-ocean">
          Votre salle d’entraînement
        </p>
        <h1 className="heading mt-4 text-3xl text-night sm:text-4xl">
          Quatre compétences. Un seul objectif.
        </h1>
        <p className="mb-10 mt-5 max-w-2xl text-lg text-slate">
          Choisissez une épreuve et prenez le temps de pratiquer. Les séances
          sont courtes, les contenus originaux et les corrections expliquées. Un
          accès simulé suffit pour commencer.
        </p>
        <SkillCards />
      </Container>
    </section>
  );
}
