'use client';

/** Browser text-to-speech, used for the listening documents (no audio files, no cost). */

export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

function frenchVoices() {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('fr'));
  return [...voices.filter((v) => v.lang === 'fr-CA'), ...voices.filter((v) => v.lang !== 'fr-CA')];
}

/** Reads the lines one after the other, two voices when available. Calls onEnd after the last line. */
// Each new reading (or a stop) invalidates the callbacks of the previous one.
let generation = 0;

export function speakLines(lines: { voice: 'a' | 'b'; text: string }[], onEnd: () => void) {
  const synth = window.speechSynthesis;
  synth.cancel();
  const mine = ++generation;
  const voices = frenchVoices();
  const queue = lines.map((line) => {
    const u = new SpeechSynthesisUtterance(line.text);
    const voice = line.voice === 'a' ? voices[0] : voices[1] ?? voices[0];
    u.lang = voice?.lang ?? 'fr-FR';
    if (voice) u.voice = voice;
    // Only one French voice: lower the pitch to tell the two speakers apart.
    u.pitch = line.voice === 'b' && !voices[1] ? 0.8 : 1;
    u.rate = 0.95;
    return u;
  });
  // Some browsers never fire "end" (or fail silently): fall back on an estimate of the reading time.
  let ended = false;
  const end = () => { if (!ended && mine === generation) { ended = true; clearTimeout(fallback); onEnd(); } };
  const chars = lines.reduce((n, l) => n + l.text.length, 0);
  const fallback = setTimeout(end, 3000 + chars * 90);
  const last = queue[queue.length - 1];
  last.onend = end;
  queue.forEach((u) => { u.onerror = end; });
  queue.forEach((u) => synth.speak(u));
}

export const stopSpeaking = () => {
  generation++;
  stopPlayer();
  if (speechSupported()) window.speechSynthesis.cancel();
};

/** Some browsers load their voices asynchronously. */
export const warmUpVoices = () => { if (speechSupported()) window.speechSynthesis.getVoices(); };

// Recorded documents (MP3 files generated with open French voices). They play on every
// device; the browser voice above is only a fallback if a file cannot be loaded.
let player: HTMLAudioElement | null = null;

export function playDocument(src: string | undefined, lines: { voice: 'a' | 'b'; text: string }[], onEnd: () => void) {
  stopSpeaking();
  const mine = generation;
  const fallback = () => {
    if (mine !== generation) return;
    if (speechSupported()) speakLines(lines, onEnd);
    else onEnd();
  };
  if (!src) return fallback();
  player ??= new Audio();
  player.src = src;
  player.onended = () => { if (mine === generation) onEnd(); };
  player.onerror = fallback;
  player.play().catch(fallback);
}

const stopPlayer = () => { if (player) { player.onended = null; player.onerror = null; player.pause(); } };
