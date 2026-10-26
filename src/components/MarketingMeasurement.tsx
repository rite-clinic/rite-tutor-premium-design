import { useLocation } from "react-router-dom";
import { pageMetadata } from "@/lib/seo";
import { useEffect, useRef } from "react";
import { trackMarketingEvent } from "@/lib/analytics";

export function MarketingMeasurement() {
  const { pathname } = useLocation();
  const previousPath = useRef<string>();
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (pageMetadata[pathname] || /^\/courses\/\d+$/.test(pathname) || /^\/blogs\/[a-z0-9-]+$/.test(pathname)) trackMarketingEvent("public_page_view");
  }, [pathname]);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      const href = link?.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackMarketingEvent("contact_click", { contact_method: "phone" });
      else if (href.startsWith("mailto:")) trackMarketingEvent("contact_click", { contact_method: "email" });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return null;
}
