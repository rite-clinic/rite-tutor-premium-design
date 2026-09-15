import { useEffect } from "react";
import { trackMarketingEvent } from "@/lib/analytics";

export function MarketingMeasurement() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      const href = link?.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackMarketingEvent("contact_click", { contact_method: "phone" });
      else if (href.startsWith("mailto:")) trackMarketingEvent("contact_click", { contact_method: "email" });
      else if (href.startsWith("/downloads/") && href.endsWith(".pdf")) trackMarketingEvent("resource_download", { resource: href.split("/").pop() });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return null;
}
