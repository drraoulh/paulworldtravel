'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Four-second microphone check before an oral task: a live level meter, then the
 * recording is played back. Nothing is sent to the server or counted as a try.
 */
export default function MicTest() {
  const [state, setState] = useState<'idle' | 'recording' | 'ok' | 'quiet' | 'denied'>('idle');
  const [level, setLevel] = useState(0);
  const [url, setUrl] = useState('');
  const stop = useRef<() => void>(() => {});
  useEffect(() => () => stop.current(), []);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  const run = async () => {
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setState('denied');
      return;
    }
    setState('recording');
    setUrl('');
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const buf = new Uint8Array(analyser.fftSize);
    let peak = 0;
    let frame = 0;
    const loop = () => {
      analyser.getByteTimeDomainData(buf);
      let sum = 0;
      for (const v of buf) sum += ((v - 128) / 128) ** 2;
      const rms = Math.sqrt(sum / buf.length);
      peak = Math.max(peak, rms);
      setLevel(Math.min(1, rms * 6));
      frame = requestAnimationFrame(loop);
    };
    loop();
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream);
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      setUrl(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })));
      setState(peak > 0.04 ? 'ok' : 'quiet');
    };
    const end = () => {
      cancelAnimationFrame(frame);
      if (rec.state !== 'inactive') rec.stop();
      stream.getTracks().forEach((t) => t.stop());
      ctx.close().catch(() => {});
      setLevel(0);
    };
    stop.current = end;
    rec.start();
    setTimeout(end, 4000);
  };

  return (
    <div className="mt-6 rounded-xl border border-rule bg-paper p-4">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={run} disabled={state === 'recording'} className="rounded-full border-2 border-night px-4 py-2 text-sm font-bold text-night hover:bg-night hover:text-white disabled:opacity-50">
          {state === 'recording' ? 'Parlez maintenant…' : 'Tester mon micro'}
        </button>
        <span className="h-2.5 w-40 overflow-hidden rounded-full bg-white" aria-hidden="true">
          <span className="block h-full bg-green-600 transition-[width] duration-75" style={{ width: `${Math.round(level * 100)}%` }} />
        </span>
        {url && <audio controls src={url} className="h-9" />}
      </div>
      <p role="status" className="mt-2 text-sm text-slate">
        {state === 'idle' && 'Avant de commencer, lisez une phrase à voix haute pendant 4 secondes. Ce test ne consomme aucun essai.'}
        {state === 'recording' && 'Lisez une phrase à voix haute…'}
        {state === 'ok' && <span className="font-semibold text-green-700">Votre micro fonctionne. Réécoutez-vous pour vérifier le son, puis lancez la tâche.</span>}
        {state === 'quiet' && <span className="font-semibold text-maple">Nous n’avons presque rien entendu. Vérifiez le micro choisi par le navigateur, rapprochez-vous de l’appareil, puis refaites le test.</span>}
        {state === 'denied' && <span className="font-semibold text-maple">Le micro est bloqué. Autorisez-le dans les réglages du navigateur (icône à gauche de l’adresse), puis refaites le test.</span>}
      </p>
    </div>
  );
}
