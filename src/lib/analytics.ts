// A thin analytics-event abstraction. No provider is wired up yet — events are
// pushed to a dataLayer-style queue and mirrored to the console in dev, so a
// real tag manager or product-analytics SDK can be dropped in later without
// touching call sites.

export type AnalyticsEvent =
  | { name: 'product_view'; slug: string; collection: string; price: number }
  | { name: 'add_to_cart'; slug: string; qty: number; price: number; variant?: string }
  | { name: 'remove_from_cart'; slug: string }
  | { name: 'cart_view'; itemCount: number; subtotal: number }
  | { name: 'begin_checkout'; itemCount: number; subtotal: number }
  | { name: 'wishlist_add'; slug: string }
  | { name: 'wishlist_remove'; slug: string }
  | { name: 'newsletter_signup'; source: string }
  | { name: 'marketplace_click'; marketplace: string; slug?: string }
  | { name: 'board_pin'; slug: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    pinnedTrack?: (event: AnalyticsEvent) => void;
  }
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  const payload = { event: event.name, ...event, ts: Date.now() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (import.meta.env.DEV) {
    // Visible in dev so events can be verified while building.
    // eslint-disable-next-line no-console
    console.debug('[pinned:analytics]', payload);
  }
}

// Expose for inline handlers / debugging.
if (typeof window !== 'undefined') {
  window.pinnedTrack = track;
}
