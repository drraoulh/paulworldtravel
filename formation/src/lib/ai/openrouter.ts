// Minimal OpenRouter client (server only). Models are configurable without code changes.

const URL = 'https://openrouter.ai/api/v1/chat/completions';

export const MODELS = {
  /** Precise model for grading productions. */
  grading: () => process.env.OPENROUTER_MODEL_GRADING || 'anthropic/claude-sonnet-5.5',
  /** Fast, inexpensive model for the tutor and content drafts. */
  fast: () => process.env.OPENROUTER_MODEL_FAST || 'anthropic/claude-haiku-5.5',
};

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export const aiConfigured = () => Boolean(process.env.OPENROUTER_API_KEY);

export async function chat(model: string, messages: ChatMessage[], opts: { json?: boolean; maxTokens?: number; temperature?: number } = {}) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('OPENROUTER_API_KEY is not set');
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      'HTTP-Referer': 'https://formation.paulworldtravel.com',
      'X-Title': 'Paul World Travel Formation',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: opts.maxTokens ?? 2000,
      temperature: opts.temperature ?? 0.2,
      ...(opts.json ? { response_format: { type: 'json_object' } } : {}),
    }),
    signal: AbortSignal.timeout(55_000),
  });
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text: string = data?.choices?.[0]?.message?.content ?? '';
  if (!text) throw new Error('OpenRouter returned an empty answer');
  return text;
}

/** Parses the first JSON object in a model answer (tolerates code fences). */
export function parseJson<T>(text: string): T {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < start) throw new Error('No JSON in model answer');
  return JSON.parse(text.slice(start, end + 1)) as T;
}
