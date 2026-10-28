"use client";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import { FiMic, FiSquare, FiDownload } from "react-icons/fi";
export function RecordingPreview({
  blob,
  filename,
}: {
  blob: Blob;
  filename: string;
}) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const value = URL.createObjectURL(blob);
    setUrl(value);
    return () => URL.revokeObjectURL(value);
  }, [blob]);
  const ext = blob.type.includes("mp4")
    ? "m4a"
    : blob.type.includes("ogg")
      ? "ogg"
      : "webm";
  return (
    <div className="mt-4 space-y-3">
      {url && (
        <>
          <audio
            controls
            src={url}
            className="w-full"
            aria-label="Votre enregistrement"
          />
          <a
            href={url}
            download={`${filename}.${ext}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-ocean"
          >
            <FiDownload aria-hidden="true" />
            Télécharger mon audio
          </a>
        </>
      )}
    </div>
  );
}
export type RecorderHandle = { finish: () => Promise<void> };
export default function VoiceRecorder({
  seconds,
  blob,
  onRecord,
  onBusy,
  handle,
}: {
  seconds: number;
  blob?: Blob;
  onRecord: (blob: Blob) => void;
  onBusy: (busy: boolean) => void;
  handle: Ref<RecorderHandle>;
}) {
  const [recording, setRecording] = useState(false);
  const [pending, setPending] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const requestId = useRef(0);
  const finishResolve = useRef<(() => void) | null>(null);
  const busyCallback = useRef(onBusy);
  busyCallback.current = onBusy;
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const alive = useRef(true);
  const callback = useRef(onRecord);
  callback.current = onRecord;
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      if (recorder.current?.state === "recording") recorder.current.stop();
      stream.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);
  useImperativeHandle(
    handle,
    () => ({
      finish: () =>
        new Promise<void>((resolve) => {
          requestId.current++;
          if (recorder.current?.state === "recording") {
            finishResolve.current = resolve;
            recorder.current.stop();
          } else {
            setPending(false);
            busyCallback.current(false);
            resolve();
          }
        }),
    }),
    [],
  );
  function stop() {
    if (recorder.current?.state === "recording") recorder.current.stop();
    stream.current?.getTracks().forEach((t) => t.stop());
  }
  async function start() {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia || !("MediaRecorder" in window))
      return setError(
        "L’enregistrement n’est pas disponible. Utilisez un navigateur récent en HTTPS, ou entraînez-vous sans micro.",
      );
    setPending(true);
    busyCallback.current(true);
    const request = ++requestId.current;
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!alive.current || request !== requestId.current) {
        media.getTracks().forEach((t) => t.stop());
        return;
      }
      stream.current = media;
      const r = new MediaRecorder(media);
      recorder.current = r;
      const chunks: BlobPart[] = [];
      r.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      r.onstop = () => {
        media.getTracks().forEach((t) => t.stop());
        if (alive.current) {
          setRecording(false);
          if (chunks.length)
            callback.current(new Blob(chunks, { type: r.mimeType }));
          busyCallback.current(false);
        }
        finishResolve.current?.();
        finishResolve.current = null;
      };
      r.onerror = () => {
        stop();
        if (alive.current)
          setError(
            "L’enregistrement a été interrompu. Réessayez ou entraînez-vous sans micro.",
          );
      };
      r.start();
      setElapsed(0);
      setRecording(true);
    } catch {
      stream.current?.getTracks().forEach((t) => t.stop());
      if (alive.current)
        setError(
          "Le microphone n’a pas pu être ouvert. Vérifiez son autorisation, ou entraînez-vous sans micro.",
        );
    } finally {
      if (alive.current && request === requestId.current) {
        setPending(false);
        if (recorder.current?.state !== "recording")
          busyCallback.current(false);
      }
    }
  }
  useEffect(() => {
    if (!recording) return;
    const started = Date.now();
    const timer = setInterval(() => {
      const n = Math.floor((Date.now() - started) / 1000);
      setElapsed(Math.min(n, seconds));
      if (n >= seconds) stop();
    }, 250);
    return () => clearInterval(timer);
  }, [recording, seconds]);
  return (
    <div className="rounded-xl border border-rule bg-paper p-5">
      <p className="text-sm text-slate">
        Le micro est utilisé uniquement après votre accord. L’audio reste dans
        cet onglet ; téléchargez-le avant de quitter.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {recording ? (
          <button
            onClick={stop}
            className="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 font-bold text-white"
          >
            <FiSquare aria-hidden="true" />
            Arrêter l’enregistrement
          </button>
        ) : (
          <button
            disabled={pending}
            onClick={start}
            className="flex items-center gap-2 rounded-xl bg-night px-5 py-3 font-bold text-white disabled:opacity-40"
          >
            <FiMic aria-hidden="true" />
            {pending
              ? "Ouverture du micro…"
              : blob
                ? "Réenregistrer"
                : "Démarrer le micro"}
          </button>
        )}
        <span role="timer" className="text-sm font-semibold text-night">
          {elapsed} / {seconds} s
        </span>
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}
      {blob && <RecordingPreview blob={blob} filename="ma-pratique-orale" />}
    </div>
  );
}
