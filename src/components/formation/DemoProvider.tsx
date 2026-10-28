"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DEMO_KEY,
  parseDemo,
  type DemoProfile,
  type DemoResult,
} from "@/lib/formation/demo";

type DemoContext = {
  ready: boolean;
  exiting: boolean;
  profile: DemoProfile | null;
  results: DemoResult[];
  login: (profile: DemoProfile) => void;
  logout: () => void;
  saveResult: (result: DemoResult) => void;
  clear: () => void;
};
const Context = createContext<DemoContext | null>(null);
export function useDemo() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("DemoProvider missing");
  return ctx;
}
export default function DemoProvider({ children }: { children: ReactNode }) {
  const [exitTo, setExitTo] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<DemoProfile | null>(null);
  const [results, setResults] = useState<DemoResult[]>([]);
  const [storageError, setStorageError] = useState(false);
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    try {
      const v = parseDemo(localStorage.getItem(DEMO_KEY));
      setProfile(v.profile);
      setResults(v.results);
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(DEMO_KEY, JSON.stringify({ profile, results }));
    } catch {
      setStorageError(true);
    }
  }, [ready, profile, results]);
  useEffect(() => {
    if (exitTo === path) setExitTo(null);
  }, [exitTo, path]);
  const logout = () => {
    setExitTo("/formation/");
    setProfile(null);
    router.push("/formation/");
  };
  const clear = () => {
    setExitTo("/formation/connexion/");
    setResults([]);
    setProfile(null);
    try {
      localStorage.removeItem(DEMO_KEY);
    } catch {
      setStorageError(true);
    }
    router.push("/formation/connexion/");
  };
  return (
    <Context.Provider
      value={{
        ready,
        exiting: exitTo !== null,
        profile,
        results,
        login: setProfile,
        logout,
        clear,
        saveResult: (result) =>
          setResults((old) =>
            old.some((r) => r.id === result.id)
              ? old
              : [...old, result].slice(-50),
          ),
      }}
    >
      <div className="border-b border-rule bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/formation/" className="text-sm font-bold text-night">
            FORMATION{" "}
            <span className="ml-2 rounded-full bg-amber-50 px-2 py-1 text-[10px] tracking-wider text-amber-900">
              DÉMO
            </span>
          </Link>
          <nav
            aria-label="Navigation formation"
            className="flex flex-wrap items-center gap-2 text-sm"
          >
            {[
              ["/formation/espace/", "Mon espace"],
              ["/formation/epreuves/", "Les 4 épreuves"],
              ["/formation/simulation/", "Simulation"],
              ["/formation/resultats/", "Résultats"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
                className={`rounded-lg px-3 py-2 font-semibold ${path === href ? "bg-night text-white" : "text-slate hover:bg-paper"}`}
              >
                {label}
              </Link>
            ))}
            {ready &&
              (profile ? (
                <button
                  onClick={logout}
                  className="px-3 py-2 text-slate hover:text-ocean"
                >
                  Déconnexion
                </button>
              ) : (
                <Link
                  href="/formation/connexion/"
                  className="rounded-lg bg-container px-3 py-2 font-bold text-night"
                >
                  Essayer mon espace
                </Link>
              ))}
          </nav>
        </div>
      </div>
      <div className="border-b border-amber-100 bg-amber-50 px-4 py-2 text-center text-xs text-amber-950">
        Connexion simulée · Aucun paiement · Progression locale · Aucun score
        officiel ni correction IA
      </div>
      {storageError && (
        <p
          role="status"
          className="bg-paper px-4 py-3 text-center text-sm text-slate"
        >
          Le stockage est indisponible. Vous pouvez essayer la démo, mais votre
          progression ne sera pas conservée après rechargement.
        </p>
      )}
      {children}
    </Context.Provider>
  );
}
export function DemoGuard({ children }: { children: ReactNode }) {
  const { ready, profile, exiting } = useDemo();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (ready && !profile && !exiting)
      router.replace(`/formation/connexion/?suite=${encodeURIComponent(path)}`);
  }, [ready, profile, exiting, router, path]);
  if (!ready || !profile)
    return (
      <p role="status" className="mx-auto max-w-6xl px-6 py-20 text-slate">
        Ouverture de votre espace de démonstration…
      </p>
    );
  return <>{children}</>;
}
