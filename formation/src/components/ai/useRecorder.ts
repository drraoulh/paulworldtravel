'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

function pickMime() {
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  return types.find((t) => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) ?? '';
}

export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

/**
 * End of speech: the candidate spoke for at least `minSpeechMs`, then stayed quiet for
 * `silenceMs`. The level threshold follows the room noise.
 */
export interface AutoStop { onEnd: () => void; silenceMs?: number; minSpeechMs?: number }

/** Microphone recorder. start() throws if the microphone is refused; stop() resolves with the recording. */
export function useRecorder() {
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);
  const watch = useRef<{ ctx: AudioContext; timer: ReturnType<typeof setInterval> } | null>(null);
  const [recording, setRecording] = useState(false);

  const unwatch = () => {
    if (!watch.current) return;
    clearInterval(watch.current.timer);
    void watch.current.ctx.close().catch(() => {});
    watch.current = null;
  };

  useEffect(() => () => { unwatch(); recorder.current?.stream.getTracks().forEach((t) => t.stop()); }, []);

  const listen = (stream: MediaStream, auto: AutoStop) => {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    // Created outside a click, the context can start suspended: resume it (the page already had a click).
    void ctx.resume().catch(() => {});
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const data = new Float32Array(analyser.fftSize);
    const silenceMs = auto.silenceMs ?? 1500;
    const minSpeechMs = auto.minSpeechMs ?? 500;
    const STEP = 100;
    // Room noise: follows the quietest moments, rises slowly, so speaking at the start does not fool it.
    let floor = 0.01, speech = 0, quiet = 0, done = false;
    const timer = setInterval(() => {
      if (done) return;
      analyser.getFloatTimeDomainData(data);
      let sum = 0;
      for (const v of data) sum += v * v;
      const level = Math.sqrt(sum / data.length);
      floor = level < floor ? level : Math.min(0.05, floor * 1.02 + 0.00001);
      const loud = level > Math.min(0.08, Math.max(0.012, floor * 3));
      if (loud) { speech += STEP; quiet = 0; } else if (speech >= minSpeechMs) quiet += STEP;
      if (speech >= minSpeechMs && quiet >= silenceMs) { done = true; unwatch(); auto.onEnd(); }
    }, STEP);
    watch.current = { ctx, timer };
  };

  const start = useCallback(async (auto?: AutoStop) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    const mimeType = pickMime();
    const rec = new MediaRecorder(stream, { ...(mimeType ? { mimeType } : {}), audioBitsPerSecond: 32000 });
    chunks.current = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.current.push(e.data); };
    recorder.current = rec;
    started.current = Date.now();
    rec.start(1000);
    setRecording(true);
    unwatch();
    if (auto) listen(stream, auto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback(() => new Promise<{ blob: Blob; seconds: number } | null>((resolve) => {
    const rec = recorder.current;
    unwatch();
    if (!rec || rec.state !== 'recording') return resolve(null);
    rec.onstop = () => {
      rec.stream.getTracks().forEach((t) => t.stop());
      setRecording(false);
      resolve({
        blob: new Blob(chunks.current, { type: rec.mimeType || 'audio/webm' }),
        seconds: Math.round((Date.now() - started.current) / 1000),
      });
    };
    rec.stop();
  }), []);

  const elapsed = useCallback(() => Math.round((Date.now() - started.current) / 1000), []);

  return { start, stop, recording, elapsed };
}

export const MIC_ERROR = 'Impossible d’accéder au micro. Autorisez le micro dans votre navigateur, puis réessayez.';
