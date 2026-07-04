// Privacy-first event tracking slot (TZ §6A.3). No-ops until an analytics
// script (e.g. Plausible) is enabled via NEXT_PUBLIC_PLAUSIBLE_DOMAIN.
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}
