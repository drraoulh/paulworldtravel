// Client helper: posts a website form to /api/contact (sent by email through Brevo).

export type SendFormResult = 'success' | 'not_configured' | 'invalid' | 'error';

export async function sendForm(
  type: 'contact' | 'quote' | 'testimonial',
  data: Record<string, string | number | undefined>
): Promise<SendFormResult> {
  try {
    const response = await fetch('/api/contact/', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ type, ...data }),
    });
    if (response.ok) return 'success';
    if (response.status === 503) return 'not_configured';
    if (response.status === 422) return 'invalid';
    return 'error';
  } catch {
    return 'error';
  }
}
