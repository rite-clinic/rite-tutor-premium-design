import { pageMetadata } from './seo';
type MarketingEvent = "generate_lead" | "contact_click" | "resource_download" | "consultation_click" | "public_page_view";

/** Send event labels only. Never send parent/child details or confirmation tokens. */
export function trackMarketingEvent(event: MarketingEvent, details: { lead_type?: "strategy_call" | "course_demo"; course_id?: number; contact_method?: "phone" | "email"; resource?: string } = {}) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  const path = window.location.pathname;
  const pagePath = path.startsWith('/thank-you') ? '/thank-you' : pageMetadata[path] || /^\/courses\/\d+$/.test(path) || /^\/blogs\/[a-z0-9-]+$/.test(path) ? path : '/utility';
  // Runtime allowlist as well as TypeScript: never spread arbitrary caller data.
  const safe: Record<string, string | number> = {};
  if (details.lead_type === 'strategy_call' || details.lead_type === 'course_demo') safe.lead_type = details.lead_type;
  if (Number.isInteger(details.course_id)) safe.course_id = details.course_id!;
  if (details.contact_method === 'phone' || details.contact_method === 'email') safe.contact_method = details.contact_method;
  if (details.resource) safe.resource = 'public_learning_resource';
  analyticsWindow.dataLayer.push({ event, page_path: pagePath, ...safe });
}
