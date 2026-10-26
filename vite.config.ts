import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { validate } from "./scripts/public-catalog.mjs";

function developmentCatalog(): Plugin {
  return {
    name: "rite-public-catalog",
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, "VITE_");
      const api = (process.env.VITE_API_BASE_URL || env.VITE_API_BASE_URL || "https://ritetutor.com/backend/api").replace(/\/$/, "");
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split("?")[0] !== "/public-courses.json") return next();
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");
        try {
          const response = await fetch(`${api}/courses-list/`, { signal: AbortSignal.timeout(15000) });
          if (!response.ok) throw new Error(`Course API returned ${response.status}`);
          res.end(JSON.stringify(validate(await response.json())));
        } catch {
          res.statusCode = 503;
          res.end(JSON.stringify({ message: "Course catalog unavailable. Check the API connection and try again." }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), developmentCatalog(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@/route-pages": path.resolve(__dirname, isSsrBuild ? "./src/route-pages.server.ts" : "./src/route-pages.ts"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
