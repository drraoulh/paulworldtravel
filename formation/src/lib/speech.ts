'use client';

/** Browser text-to-speech, used for the listening documents (no audio files, no cost). */

export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

function frenchVoices() {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('fr'));
  return [...voices.filter((v) => v.lang === 'fr-CA'), ...voices.filter((v) => v.lang !== 'fr-CA')];
}

/** Reads the lines one after the other, two voices when available. Calls onEnd after the last line. */
export function speakLines(lines: { voice: 'a' | 'b'; text: string }[], onEnd: () => void) {
  const synth = window.speechSynthesis;
  synth.cancel();
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
  queue[queue.length - 1].onend = onEnd;
  queue.forEach((u) => synth.speak(u));
}

export const stopSpeaking = () => { if (speechSupported()) window.speechSynthesis.cancel(); };

/** Some browsers load their voices asynchronously. */
export const warmUpVoices = () => { if (speechSupported()) window.speechSynthesis.getVoices(); };
