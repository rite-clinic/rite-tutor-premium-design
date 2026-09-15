import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import type { PrerenderData } from "./contexts/PrerenderContext";
import "./index.css";

const root = document.getElementById("root")!;
const payload = document.getElementById("prerender-data");
const data: PrerenderData = payload ? JSON.parse(payload.textContent || "{}") : {};
if (root.hasChildNodes() && document.documentElement.hasAttribute("data-prerendered")) {
  hydrateRoot(root, <App data={data} />);
} else {
  createRoot(root).render(<App data={data} />);
}
