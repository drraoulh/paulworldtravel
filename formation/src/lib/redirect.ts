/** Keep authentication redirects on this application, including URL-normalization edge cases. */
export function safeRedirectPath(value: string | null, fallback = '/espace/') {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u0020]/.test(value) || /%(?:2f|5c)/i.test(value)) return fallback;
  return value;
}
