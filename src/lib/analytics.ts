type MarketingEvent = "generate_lead" | "contact_click" | "resource_download";

/** Send event labels only. Never send parent/child details or confirmation tokens. */
export function trackMarketingEvent(event: MarketingEvent, details: { lead_type?: "strategy_call" | "course_demo"; course_id?: number; contact_method?: "phone" | "email"; resource?: string } = {}) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push({ event, page_path: window.location.pathname.startsWith("/thank-you") ? "/thank-you" : window.location.pathname, ...details });
}
