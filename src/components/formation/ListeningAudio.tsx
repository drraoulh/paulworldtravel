"use client";
import { useEffect, useRef, useState } from "react";
import { FiHeadphones, FiPlay, FiSquare } from "react-icons/fi";
export default function ListeningAudio({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const active = useRef<SpeechSynthesisUtterance | null>(null);
  useEffect(
    () => () => {
      active.current = null;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    [text],
  );
  function play() {
    setError("");
    if (!("speechSynthesis" in window))
      return setError(
        "La lecture vocale n’est pas disponible dans ce navigateur. Utilisez la transcription ci-dessous.",
      );
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.9;
    const voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang.startsWith("fr"));
    if (voice) utterance.voice = voice;
    active.current = utterance;
    utterance.onstart = () => {
      if (active.current === utterance) setPlaying(true);
    };
    utterance.onend = () => {
      if (active.current === utterance) setPlaying(false);
    };
    utterance.onerror = () => {
      if (active.current === utterance) {
        setPlaying(false);
        setError(
          "La lecture vocale a échoué. Vous pouvez réessayer ou consulter la transcription.",
        );
      }
    };
    window.speechSynthesis.speak(utterance);
  }
  return (
    <div className="rounded-2xl bg-night p-6 text-white">
      <div className="flex items-center gap-3">
        <FiHeadphones className="h-6 w-6 text-container" aria-hidden="true" />
        <div>
          <p className="font-bold">Écoutez le document</p>
          <p className="mt-1 text-xs text-blue-100">
            Voix de synthèse de votre navigateur · Réécoute libre
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={play}
          className="inline-flex items-center gap-2 rounded-xl bg-container px-5 py-3 font-bold text-night"
        >
          <FiPlay aria-hidden="true" />
          {playing ? "Recommencer l’écoute" : "Écouter le document"}
        </button>
        {playing && (
          <button
            onClick={() => {
              active.current = null;
              window.speechSynthesis.cancel();
              setPlaying(false);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-4 py-3"
          >
            <FiSquare aria-hidden="true" />
            Arrêter
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-amber-100">
          {error}
        </p>
      )}
      <details className="mt-5 text-sm text-blue-100">
        <summary className="cursor-pointer underline underline-offset-4">
          Afficher la transcription (aide)
        </summary>
        <p className="mt-3 leading-relaxed">{text}</p>
      </details>
    </div>
  );
}
