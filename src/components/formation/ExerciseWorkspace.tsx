"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import {
  listening,
  reading,
  selfReview,
  skills,
  speakingTasks,
  writingTasks,
  type SkillId,
} from "@/content/formation";
import { secondsLeft, wordCount, type DemoResult } from "@/lib/formation/demo";
import { DemoGuard, useDemo } from "./DemoProvider";
import { skillIcons } from "./SkillCards";
import ListeningAudio from "./ListeningAudio";
import VoiceRecorder, {
  RecordingPreview,
  type RecorderHandle,
} from "./VoiceRecorder";
const button =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-night px-5 py-3 font-bold text-white hover:bg-ocean disabled:opacity-40 disabled:cursor-not-allowed";
export default function ExerciseWorkspace({
  skillId,
  simulation = false,
}: {
  skillId: SkillId;
  simulation?: boolean;
}) {
  const skill = skills.find((s) => s.id === skillId)!;
  const Icon = skillIcons[skillId];
  const { saveResult } = useDemo();
  const choice = skillId === "ce" || skillId === "co";
  const questions = skillId === "ce" ? reading : listening;
  const tasks = skillId === "ee" ? writingTasks : speakingTasks;
  const total = choice ? questions.length : tasks.length;
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(total).fill(null),
  );
  const [texts, setTexts] = useState<string[]>(Array(total).fill(""));
  const [blobs, setBlobs] = useState<Record<number, Blob>>({});
  const [oralPractice, setOralPractice] = useState<boolean[]>(
    Array(total).fill(false),
  );
  const [review, setReview] = useState<boolean[]>(Array(4).fill(false));
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(skill.minutes * 60);
  const recorderHandle = useRef<RecorderHandle>(null);
  const [mediaBusy, setMediaBusy] = useState(false);
  const expired = useRef(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  const startTime = useRef(0);
  const saved = useRef(false);
  const title = useRef<HTMLHeadingElement>(null);
  const correct = choice
    ? questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0)
    : null;
  const completed = choice
    ? answers.filter((a) => a !== null).length
    : skillId === "ee"
      ? texts.filter((t) => wordCount(t) > 0).length
      : oralPractice.filter((v, i) => v || Boolean(blobs[i])).length;
  useEffect(() => {
    if (started) title.current?.focus();
  }, [started, index, done]);
  useEffect(() => {
    if (!deadline || done) return;
    const tick = () => {
      const n = secondsLeft(deadline, Date.now());
      setRemaining(n);
      if (n === 0 && !expired.current) {
        expired.current = true;
        void (async () => {
          await recorderHandle.current?.finish();
          setDone(true);
        })();
      }
    };
    tick();
    const timer = setInterval(tick, 500);
    return () => clearInterval(timer);
  }, [deadline, done]);
  useEffect(() => {
    if (!started || done) return;
    const guard = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [started, done]);
  useEffect(() => {
    if (!done || saved.current) return;
    saved.current = true;
    const r: DemoResult = {
      id: crypto.randomUUID(),
      skill: skillId,
      date: new Date().toISOString(),
      correct,
      total,
      completed,
      seconds: Math.max(0, Math.round((Date.now() - startTime.current) / 1000)),
      simulation,
    };
    setResult(r);
    saveResult(r);
  }, [done, correct, total, completed, simulation, skillId, saveResult]);
  const start = () => {
    startTime.current = Date.now();
    setStarted(true);
    if (simulation) setDeadline(Date.now() + skill.minutes * 60000);
  };
  const move = (n: number) => {
    if (mediaBusy) return;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIndex(n);
    setChecked(false);
  };
  const finish = async () => {
    if (
      completed === total ||
      window.confirm(
        "Certaines questions ou tâches sont incomplètes. Terminer cette séance ?",
      )
    ) {
      await recorderHandle.current?.finish();
      setDone(true);
    }
  };
  const nextSimulation = skills[skills.findIndex((s) => s.id === skillId) + 1];
  return (
    <DemoGuard>
      <section className="bg-paper py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/formation/epreuves/"
            onClick={(e) => {
              if (
                started &&
                !done &&
                !window.confirm(
                  "Quitter la séance ? Les réponses en cours ne seront pas conservées.",
                )
              )
                e.preventDefault();
            }}
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-ocean"
          >
            <FiArrowLeft aria-hidden="true" />
            Les épreuves
          </Link>
          {!started ? (
            <div className="mx-auto max-w-3xl rounded-2xl border border-rule bg-white p-6 sm:p-10">
              <span className={`inline-flex rounded-2xl p-4 ${skill.color}`}>
                <Icon className="h-8 w-8" aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-ocean">
                {simulation ? "Simulation raccourcie" : "Séance de découverte"}
              </p>
              <h1 className="heading mt-3 text-3xl text-night sm:text-4xl">
                {skill.title}
              </h1>
              <p className="mt-5 text-lg text-slate">{skill.description}</p>
              <div className="mt-7 grid gap-3 rounded-xl bg-paper p-5 text-sm text-night sm:grid-cols-2">
                <p>{skill.detail}</p>
                <p>
                  {simulation
                    ? `${skill.minutes} minutes · Fin automatique`
                    : "À votre rythme · Sans chronomètre global"}
                </p>
              </div>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate">
                <li>
                  {choice
                    ? simulation
                      ? "Réponses modifiables, correction à la fin."
                      : "Correction expliquée après chaque réponse."
                    : "Trois consignes originales avec conseils et auto-évaluation."}
                </li>
                {skillId === "co" && (
                  <li>
                    Les documents sont lus par la synthèse vocale du navigateur
                    ; une transcription est disponible en aide.
                  </li>
                )}
                {skillId === "eo" && (
                  <li>
                    Micro facultatif. Enregistrement et téléchargement locaux ;
                    aucun examinateur ou IA n’intervient.
                  </li>
                )}
                {skillId === "ee" && (
                  <li>
                    Vos textes restent dans cet onglet et disparaissent en
                    quittant la page. Vous pourrez les télécharger dans le
                    bilan.
                  </li>
                )}
                <li>
                  Il s’agit d’un entraînement de démonstration, sans note
                  officielle TCF ou NCLC.
                </li>
              </ul>
              <button onClick={start} className={`${button} mt-8`}>
                Commencer la séance <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          ) : done ? (
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl bg-night p-7 text-white sm:p-10">
                <FiCheckCircle
                  className="h-9 w-9 text-container"
                  aria-hidden="true"
                />
                <h1 ref={title} tabIndex={-1} className="heading mt-5 text-3xl">
                  Séance terminée. Place au bilan.
                </h1>
                <p className="mt-4 text-2xl font-bold text-container">
                  {choice
                    ? `${correct}/${total} bonnes réponses`
                    : `${completed}/${total} tâches pratiquées`}
                </p>
                <p className="mt-3 text-blue-100">
                  {simulation && remaining === 0 ? "Le temps est écoulé. " : ""}
                  {choice
                    ? "Les réponses manquantes comptent comme incorrectes."
                    : "Les productions ne sont pas notées automatiquement. Utilisez la grille ci-dessous pour vous relire ou vous réécouter."}
                </p>
                <p className="mt-3 text-sm text-blue-100">
                  Un bilan d’entraînement, pas une équivalence TCF ou NCLC.
                </p>
              </div>
              <div className="mt-6 space-y-5">
                {choice ? (
                  questions.map((q, i) => (
                    <article
                      key={q.id}
                      className="rounded-2xl border border-rule bg-white p-6"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-ocean">
                        Question {i + 1} ·{" "}
                        {answers[i] === q.answer ? "Réussie" : "À revoir"}
                      </p>
                      <h2 className="heading mt-3 text-xl text-night">
                        {q.prompt}
                      </h2>
                      <p className="mt-3 rounded-xl bg-paper p-4 text-sm text-slate">
                        {q.text}
                      </p>
                      <p className="mt-4 text-sm">
                        Votre réponse :{" "}
                        {answers[i] === null
                          ? "Sans réponse"
                          : q.choices[answers[i]!]}
                      </p>
                      <p className="mt-2 font-semibold text-night">
                        Bonne réponse : {q.choices[q.answer]}
                      </p>
                      <p className="mt-2 text-slate">{q.explanation}</p>
                    </article>
                  ))
                ) : (
                  <>
                    {tasks.map((task, i) => (
                      <article
                        key={task.id}
                        className="rounded-2xl border border-rule bg-white p-6"
                      >
                        <h2 className="heading text-xl text-night">
                          Tâche {i + 1} · {task.title}
                        </h2>
                        <p className="mt-3 text-sm text-slate">{task.prompt}</p>
                        {skillId === "ee" ? (
                          <>
                            <p className="mt-4 whitespace-pre-wrap rounded-xl bg-paper p-4">
                              {texts[i] || "Aucune production."}
                            </p>
                            <p className="mt-3 text-sm font-semibold text-night">
                              {wordCount(texts[i])} mots · Cible :{" "}
                              {writingTasks[i].min} à {writingTasks[i].max} mots
                            </p>
                            <p className="mt-2 text-sm text-slate">
                              {wordCount(texts[i]) < writingTasks[i].min
                                ? "Votre texte est trop court pour la consigne."
                                : wordCount(texts[i]) > writingTasks[i].max
                                  ? "Votre texte dépasse la longueur demandée."
                                  : "Longueur conforme. Cela ne préjuge pas de la qualité du texte."}
                            </p>
                            <details className="mt-4 text-sm">
                              <summary className="cursor-pointer font-bold text-ocean">
                                Exemple ou piste de réponse
                              </summary>
                              <p className="mt-3 text-slate">
                                {writingTasks[i].example}
                              </p>
                            </details>
                          </>
                        ) : blobs[i] ? (
                          <RecordingPreview
                            blob={blobs[i]}
                            filename={`oral-tache-${i + 1}`}
                          />
                        ) : (
                          <p className="mt-4 text-sm text-slate">
                            {oralPractice[i]
                              ? "Pratique sans micro déclarée."
                              : "Aucun enregistrement ni pratique déclarée."}
                          </p>
                        )}
                      </article>
                    ))}
                    {skillId === "ee" && (
                      <button
                        className={button}
                        onClick={() => {
                          const blob = new Blob(
                            [
                              writingTasks
                                .map(
                                  (t, i) =>
                                    `${t.title}\n\n${texts[i] || "(sans réponse)"}`,
                                )
                                .join("\n\n---\n\n"),
                            ],
                            { type: "text/plain;charset=utf-8" },
                          );
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "mes-productions-tcf.txt";
                          a.click();
                          setTimeout(() => URL.revokeObjectURL(url), 1000);
                        }}
                      >
                        Télécharger mes textes
                      </button>
                    )}
                    <div className="rounded-2xl border border-rule bg-white p-6">
                      <h2 className="heading text-xl text-night">
                        Ma grille d’auto-évaluation
                      </h2>
                      <p className="mt-2 text-sm text-slate">
                        Cochez ce que vous avez vérifié. Ce bilan ne remplace
                        pas la correction d’un formateur.
                      </p>
                      <div className="mt-5 space-y-3">
                        {selfReview.map((item, i) => (
                          <label key={item} className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={review[i]}
                              onChange={(e) =>
                                setReview((old) =>
                                  old.map((v, n) =>
                                    n === i ? e.target.checked : v,
                                  ),
                                )
                              }
                              className="mt-1 accent-ocean"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {simulation && nextSimulation ? (
                  <Link
                    href={`/formation/epreuves/${nextSimulation.slug}/?mode=simulation`}
                    className={button}
                  >
                    Étape suivante : {nextSimulation.verb}{" "}
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                ) : (
                  <Link href="/formation/resultats/" className={button}>
                    Voir ma progression
                  </Link>
                )}
                <Link
                  href="/formation/epreuves/"
                  className="rounded-xl border border-night px-5 py-3 font-bold text-night"
                >
                  Choisir une autre épreuve
                </Link>
              </div>
              {result && (
                <p className="mt-4 text-xs text-slate">
                  Bilan enregistré dans la démo de cet appareil. Textes et
                  audios non synchronisés.
                </p>
              )}
            </div>
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="min-w-0 rounded-2xl border border-rule bg-white p-5 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate">
                  <span>{skill.title}</span>
                  {simulation && (
                    <span
                      role="timer"
                      aria-label="Temps restant"
                      className="flex items-center gap-2 font-bold text-night"
                    >
                      <FiClock aria-hidden="true" />
                      {Math.floor(remaining / 60)}:
                      {String(remaining % 60).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <div
                  className="mt-5 h-2 rounded-full bg-paper"
                  role="progressbar"
                  aria-label="Tâches pratiquées"
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-valuenow={completed}
                >
                  <div
                    className="h-full rounded-full bg-ocean"
                    style={{ width: `${(completed / total) * 100}%` }}
                  />
                </div>
                <p className="mt-7 text-xs font-bold uppercase tracking-widest text-ocean">
                  {choice ? "Question" : "Tâche"} {index + 1} sur {total}
                </p>
                <h1
                  ref={title}
                  tabIndex={-1}
                  className="heading mt-3 text-xl text-night sm:text-2xl"
                >
                  {choice ? questions[index].prompt : tasks[index].title}
                </h1>
                {choice ? (
                  <>
                    {skillId === "co" ? (
                      <div className="mt-6">
                        <ListeningAudio
                          key={index}
                          text={questions[index].text}
                        />
                      </div>
                    ) : (
                      <blockquote className="mt-6 rounded-xl border-l-4 border-ocean bg-paper p-5 leading-relaxed">
                        {questions[index].text}
                      </blockquote>
                    )}
                    <fieldset className="mt-6 space-y-3">
                      <legend className="sr-only">
                        Choisissez votre réponse
                      </legend>
                      {questions[index].choices.map((option, i) => (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 ${answers[index] === i ? "border-ocean bg-blue-50" : "border-rule hover:border-ocean/50"}`}
                        >
                          <input
                            type="radio"
                            name={`choice-${index}`}
                            checked={answers[index] === i}
                            disabled={checked}
                            onChange={() =>
                              setAnswers((old) =>
                                old.map((a, n) => (n === index ? i : a)),
                              )
                            }
                            className="mt-1 accent-ocean"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </fieldset>
                    {checked && (
                      <p role="status" className="mt-5 rounded-xl bg-paper p-5">
                        <strong>
                          {answers[index] === questions[index].answer
                            ? "Bonne réponse. "
                            : `Bonne réponse : ${questions[index].choices[questions[index].answer]}. `}
                        </strong>
                        {questions[index].explanation}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mt-5 rounded-xl bg-paper p-5 leading-relaxed">
                      {tasks[index].prompt}
                    </p>
                    {skillId === "ee" ? (
                      <div className="mt-6">
                        <label
                          htmlFor="production"
                          className="font-bold text-night"
                        >
                          Votre production écrite
                        </label>
                        <textarea
                          id="production"
                          value={texts[index]}
                          maxLength={12000}
                          onChange={(e) =>
                            setTexts((old) =>
                              old.map((t, n) =>
                                n === index ? e.target.value : t,
                              ),
                            )
                          }
                          rows={12}
                          placeholder="Commencez votre texte ici…"
                          className="mt-3 w-full resize-y rounded-xl border border-rule p-4 leading-relaxed"
                        />
                        <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm text-slate">
                          <span>{wordCount(texts[index])} mots</span>
                          <span>
                            Consigne : {writingTasks[index].min}–
                            {writingTasks[index].max} mots
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6">
                        <VoiceRecorder
                          key={index}
                          handle={recorderHandle}
                          onBusy={setMediaBusy}
                          seconds={speakingTasks[index].seconds}
                          blob={blobs[index]}
                          onRecord={(blob) =>
                            setBlobs((old) => ({ ...old, [index]: blob }))
                          }
                        />
                        <label className="mt-5 flex items-start gap-3 text-sm text-slate">
                          <input
                            type="checkbox"
                            checked={oralPractice[index]}
                            onChange={(e) =>
                              setOralPractice((old) =>
                                old.map((v, n) =>
                                  n === index ? e.target.checked : v,
                                ),
                              )
                            }
                            className="mt-1 accent-ocean"
                          />
                          J’ai pratiqué cette tâche sans enregistrement.
                        </label>
                      </div>
                    )}
                  </>
                )}
                <p className="mt-4 text-xs text-slate">
                  {mediaBusy
                    ? "Arrêtez l’enregistrement avant de changer de tâche."
                    : ""}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {(!choice || simulation) && (
                    <button
                      className={button}
                      disabled={index === 0 || mediaBusy}
                      onClick={() => move(index - 1)}
                    >
                      Précédente
                    </button>
                  )}
                  {choice && !simulation && !checked ? (
                    <button
                      className={button}
                      disabled={answers[index] === null}
                      onClick={() => setChecked(true)}
                    >
                      Corriger ma réponse
                    </button>
                  ) : index < total - 1 ? (
                    <button
                      className={button}
                      disabled={mediaBusy}
                      onClick={() => move(index + 1)}
                    >
                      {choice ? "Question suivante" : "Tâche suivante"}
                      <FiArrowRight aria-hidden="true" />
                    </button>
                  ) : (
                    <button className={button} onClick={finish}>
                      Terminer et voir mon bilan
                    </button>
                  )}
                  {simulation && index < total - 1 && (
                    <button
                      className="px-3 py-2 text-sm font-semibold text-slate underline"
                      onClick={finish}
                    >
                      Terminer maintenant
                    </button>
                  )}
                </div>
              </div>
              <aside className="space-y-5">
                <div className="rounded-2xl border border-rule bg-white p-5">
                  <h2 className="font-bold text-night">Votre séance</h2>
                  <p className="mt-2 text-sm text-slate">
                    {completed}/{total}{" "}
                    {choice ? "réponses données" : "tâches pratiquées"}
                  </p>
                  {(!choice || simulation) && (
                    <div
                      className="mt-4 flex flex-wrap gap-2"
                      aria-label="Navigation entre les tâches"
                    >
                      {Array.from({ length: total }, (_, i) => (
                        <button
                          key={i}
                          disabled={mediaBusy}
                          onClick={() => move(i)}
                          aria-current={index === i ? "step" : undefined}
                          aria-label={`${choice ? "Question" : "Tâche"} ${i + 1}`}
                          className={`h-10 w-10 rounded-lg border text-sm font-bold ${index === i ? "border-night bg-night text-white" : "border-rule text-night"}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="rounded-2xl bg-blue-50 p-5">
                  <h2 className="font-bold text-night">Le conseil méthode</h2>
                  {choice ? (
                    <p className="mt-3 text-sm leading-relaxed text-slate">
                      {skillId === "co"
                        ? "Écoutez d’abord pour comprendre la situation. À la deuxième écoute, repérez les détails utiles : heure, motif, opinion."
                        : "Lisez la question avant le texte. Repérez les mots de liaison et vérifiez la réponse dans le document."}
                    </p>
                  ) : (
                    <ul className="mt-3 list-disc space-y-3 pl-4 text-sm text-slate">
                      {tasks[index].tips.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="px-1 text-xs leading-relaxed text-slate">
                  Vos réponses en cours ne sont pas sauvegardées si vous
                  rechargez ou quittez cette page.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </DemoGuard>
  );
}
