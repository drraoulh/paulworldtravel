// Speech-to-text with Whisper on Hugging Face Inference Providers (server only).

const DEFAULT_MODEL = 'openai/whisper-large-v3';

export const transcriptionConfigured = () => Boolean(process.env.HF_TOKEN);

export async function transcribe(audio: ArrayBuffer, contentType: string) {
  const token = process.env.HF_TOKEN;
  if (!token) throw new Error('HF_TOKEN is not set');
  const model = process.env.HF_WHISPER_MODEL || DEFAULT_MODEL;
  const res = await fetch(`https://router.huggingface.co/hf-inference/models/${model}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': contentType || 'audio/webm' },
    body: audio,
    signal: AbortSignal.timeout(55_000),
  });
  if (!res.ok) throw new Error(`Hugging Face ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text: string = (Array.isArray(data) ? data[0]?.text : data?.text) ?? '';
  return text.trim();
}
