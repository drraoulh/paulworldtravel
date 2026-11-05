// Server-side AI adapter. OpenAI is used when its key is set; existing OpenRouter installations remain supported.

const URL = 'https://openrouter.ai/api/v1/chat/completions';

export const MODELS = {
  /** Grading of written and spoken productions. */
  grading: () => process.env.OPENAI_API_KEY ? process.env.OPENAI_MODEL_GRADING || 'gpt-6-luna' : process.env.OPENROUTER_MODEL_GRADING || 'google/gemini-3.8-flash',
  /** Tutor and content drafts. */
  fast: () => process.env.OPENAI_API_KEY ? process.env.OPENAI_MODEL_FAST || 'gpt-6-luna' : process.env.OPENROUTER_MODEL_FAST || 'google/gemini-3.5-flash-lite',
  /** Speech-to-text (model must accept audio input). */
  audio: () => process.env.OPENROUTER_MODEL_AUDIO || 'google/gemini-3.8-flash',
};

type Part = { type: 'text'; text: string } | { type: 'input_audio'; input_audio: { data: string; format: string } };
export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string | Part[] };

export const aiConfigured = () => Boolean(process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY);

export async function chat(model: string, messages: ChatMessage[], opts: { json?: boolean; maxTokens?: number; temperature?: number } = {}) {
  const direct = Boolean(process.env.OPENAI_API_KEY);
  const key = direct ? process.env.OPENAI_API_KEY : process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('No AI provider configured');
  const res = await fetch(direct ? 'https://api.openai.com/v1/chat/completions' : URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      ...(!direct ? { 'HTTP-Referer': 'https://formation.paulworldtravel.com', 'X-Title': 'Paul World Travel Formation' } : {}),
    },
    body: JSON.stringify({
      model,
      messages,
      ...(direct ? { max_completion_tokens: opts.maxTokens ?? 2000, reasoning_effort: 'none' } : { max_tokens: opts.maxTokens ?? 2000, temperature: opts.temperature ?? 0.2 }),
      ...(opts.json ? { response_format: { type: 'json_object' } } : {}),
    }),
    signal: AbortSignal.timeout(55_000),
  });
  if (!res.ok) throw new Error(`${direct ? 'OpenAI' : 'OpenRouter'} request failed (${res.status})`);
  const data = await res.json();
  const text: string = data?.choices?.[0]?.message?.content ?? '';
  if (!text) throw new Error('AI provider returned an empty answer');
  return text;
}

/** Parses the first JSON object in a model answer (tolerates code fences). */
export function parseJson<T>(text: string): T {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < start) throw new Error('No JSON in model answer');
  return JSON.parse(text.slice(start, end + 1)) as T;
}
