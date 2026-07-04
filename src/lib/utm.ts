const COOKIE_NAME = "pm_utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function captureUtmParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const found: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }

  // First-touch attribution: keep the first captured set for the session.
  if (Object.keys(found).length > 0 && !readCookie(COOKIE_NAME)) {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(found))}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
  }
}

export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const raw = readCookie(COOKIE_NAME);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}
