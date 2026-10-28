'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

function pickMime() {
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  return types.find((t) => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) ?? '';
}

export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

/** Microphone recorder. start() throws if the microphone is refused; stop() resolves with the recording. */
export function useRecorder() {
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);
  const [recording, setRecording] = useState(false);

  useEffect(() => () => recorder.current?.stream.getTracks().forEach((t) => t.stop()), []);

  const start = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    const mimeType = pickMime();
    const rec = new MediaRecorder(stream, { ...(mimeType ? { mimeType } : {}), audioBitsPerSecond: 32000 });
    chunks.current = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.current.push(e.data); };
    recorder.current = rec;
    started.current = Date.now();
    rec.start(1000);
    setRecording(true);
  }, []);

  const stop = useCallback(() => new Promise<{ blob: Blob; seconds: number } | null>((resolve) => {
    const rec = recorder.current;
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
