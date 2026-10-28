import { Suspense } from "react";
import DemoLogin from "@/components/formation/DemoLogin";
export const metadata = {
  title: "Espace candidat démo | Formation Paul World Travel",
  robots: { index: false },
};
export default function Login() {
  return (
    <Suspense fallback={<p className="p-10">Chargement…</p>}>
      <DemoLogin />
    </Suspense>
  );
}
