"use client";
import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useDemo } from "./DemoProvider";
import { safeDemoNext } from "@/lib/formation/demo";
export default function DemoLogin() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("NCLC 7");
  const { login, ready } = useDemo();
  const router = useRouter();
  const params = useSearchParams();
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    login({ name: name.trim().slice(0, 40), goal });
    router.push(safeDemoNext(params.get("suite")));
  }
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
      <div className="relative hidden min-h-[560px] overflow-hidden rounded-[2rem] bg-night lg:block">
        <Image
          src="/images/photos/canada-toronto.jpg"
          alt="Toronto au coucher du soleil"
          fill
          sizes="520px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
        <div className="absolute bottom-10 left-8 right-8 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-container">
            Votre prochaine étape
          </p>
          <h1 className="display mt-4 text-4xl">
            Un projet.
            <br />
            Quatre compétences.
            <br />
            Votre rythme.
          </h1>
          <p className="mt-5 text-blue-100">
            Un espace pour vous entraîner, comprendre vos erreurs et suivre vos
            séances.
          </p>
        </div>
      </div>
      <div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-ocean">
          ACCÈS DÉMONSTRATION
        </span>
        <h2 className="heading mt-5 text-3xl text-night sm:text-4xl">
          Bienvenue dans votre préparation.
        </h2>
        <p className="mt-4 text-slate">
          Explorez le parcours candidat sans créer de compte réel. Utilisez
          simplement un prénom ou un pseudonyme.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block font-semibold text-night">
            Votre prénom ou pseudo
            <input
              autoComplete="off"
              name="name"
              maxLength={40}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-rule bg-white px-4 py-3"
              placeholder="Comment vous appeler ?"
            />
          </label>
          <label className="block font-semibold text-night">
            Votre objectif
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-2 w-full rounded-xl border border-rule bg-white px-4 py-3"
            >
              <option>NCLC 5</option>
              <option>NCLC 7</option>
              <option>NCLC 9</option>
            </select>
          </label>
          <button
            disabled={!ready || !name.trim()}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-container px-6 py-4 font-bold text-night hover:bg-container-hover disabled:opacity-40"
          >
            Entrer dans mon espace <FiArrowRight aria-hidden="true" />
          </button>
        </form>
        <ul className="mt-6 space-y-2 text-sm text-slate">
          {[
            "Aucun mot de passe ni carte bancaire.",
            "Les résultats restent dans ce navigateur.",
            "Vous pouvez effacer la démo depuis votre espace.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <FiCheckCircle
                className="shrink-0 text-ocean"
                aria-hidden="true"
              />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
