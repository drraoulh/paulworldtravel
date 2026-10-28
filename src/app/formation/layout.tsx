import type { ReactNode } from "react";
import DemoProvider from "@/components/formation/DemoProvider";
export default function FormationLayout({ children }: { children: ReactNode }) {
  return <DemoProvider>{children}</DemoProvider>;
}
