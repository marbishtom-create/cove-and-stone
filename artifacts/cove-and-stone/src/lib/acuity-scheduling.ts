const ACUITY_EMBED_HOST =
  /^(?:[a-z0-9-]+\.)*?(?:as\.me|acuityscheduling\.com|acuityscheduling\.net|squarespacescheduling\.com)$/i;

/**
 * Accepts an Acuity client scheduling page and returns a canonical https URL.
 * Empty or unrecognized values return null so the contact page can stay unchanged.
 */
export function resolveAcuitySchedulingUrl(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" || url.username || url.password) return null;
  if (!ACUITY_EMBED_HOST.test(url.hostname)) return null;

  return url.toString();
}
