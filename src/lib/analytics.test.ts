import { afterEach, describe, expect, it } from "vitest";
import { trackMarketingEvent } from "./analytics";

describe("lead measurement", () => {
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  afterEach(() => { delete analyticsWindow.dataLayer; window.history.replaceState({}, "", "/"); });
  it("adds conversion labels without overwriting the existing GTM queue", () => {
    analyticsWindow.dataLayer = [{ event: "gtm.js" }];
    window.history.replaceState({}, "", "/courses/22");
    trackMarketingEvent("generate_lead", { lead_type: "course_demo", course_id: 22 });
    expect(analyticsWindow.dataLayer).toEqual([{ event: "gtm.js" }, { event: "generate_lead", page_path: "/courses/22", lead_type: "course_demo", course_id: 22 }]);
  });
  it("does not include confirmation tokens in event paths", () => {
    window.history.replaceState({}, "", "/thank-you/PRIVATE123");
    trackMarketingEvent("contact_click", { contact_method: "phone" });
    expect(JSON.stringify(analyticsWindow.dataLayer)).not.toContain("PRIVATE123");
    expect(analyticsWindow.dataLayer?.[0].page_path).toBe("/thank-you");
  });
});
