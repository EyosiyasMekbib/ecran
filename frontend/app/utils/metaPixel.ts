/**
 * Sends a standard Meta Pixel event (e.g. 'Lead'). A no-op when the pixel isn't
 * configured or an ad blocker stopped it. Never pass personal data (names,
 * emails) as params — Meta receives everything sent here.
 */
export function trackPixelEvent(event: string, params?: Record<string, string | number>) {
  if (import.meta.client) window.fbq?.('track', event, params)
}
