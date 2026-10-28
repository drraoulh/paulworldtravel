// Speech-to-text. Default: OpenRouter (audio-capable model), so a single key covers all AI.
// Optional: set HF_TOKEN to use Whisper on Hugging Face instead.

import { aiConfigured, chat, MODELS } from './openrouter';

export const transcriptionConfigured = () => Boolean(process.env.HF_TOKEN) || aiConfigured();

const FORMATS: Record<string, string> = {
  'audio/mpeg': 'mp3', 'audio/mp3': 'mp3', 'audio/wav': 'wav', 'audio/x-wav': 'wav',
  'audio/mp4': 'm4a', 'audio/x-m4a': 'm4a', 'audio/aac': 'aac', 'audio/ogg': 'ogg', 'audio/flac': 'flac',
};

async function viaHuggingFace(audio: ArrayBuffer, contentType: string) {
  const model = process.env.HF_WHISPER_MODEL || 'openai/whisper-large-v3';
  const res = await fetch(`https://router.huggingface.co/hf-inference/models/${model}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${process.env.HF_TOKEN}`, 'content-type': contentType || 'audio/mpeg' },
    body: audio,
    signal: AbortSignal.timeout(55_000),
  });
  if (!res.ok) throw new Error(`Hugging Face ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return String((Array.isArray(data) ? data[0]?.text : data?.text) ?? '').trim();
}

async function viaOpenRouter(audio: ArrayBuffer, contentType: string) {
  const format = FORMATS[contentType] ?? 'mp3';
  const text = await chat(MODELS.audio(), [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text:
            'Transcris mot à mot cet enregistrement en français, tel qu’il a été prononcé, sans corriger les fautes ni reformuler. ' +
            'N’ajoute aucun commentaire. Si rien n’est audible, réponds exactement : [inaudible]',
        },
        { type: 'input_audio', input_audio: { data: Buffer.from(audio).toString('base64'), format } },
      ],
    },
  ], { maxTokens: 2500, temperature: 0 });
  return text.trim() === '[inaudible]' ? '' : text.trim();
}

export async function transcribe(audio: ArrayBuffer, contentType: string) {
  return process.env.HF_TOKEN ? viaHuggingFace(audio, contentType) : viaOpenRouter(audio, contentType);
}
