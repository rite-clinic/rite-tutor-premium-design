import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import type { ComponentProps } from "react";
import { AppContent } from "./App";
import type { PrerenderData } from "./contexts/PrerenderContext";
import { pageMetadata } from "./lib/seo";
import { blogPosts } from "./data/blogData";

export function render(path: string, data: PrerenderData) {
  const context: NonNullable<ComponentProps<typeof HelmetProvider>["context"]> = {};
  const html = renderToString(<HelmetProvider context={context}><StaticRouter location={path}><AppContent data={data} /></StaticRouter></HelmetProvider>);
  const { helmet } = context;
  if (!helmet) throw new Error(`Missing SEO metadata for ${path}`);
  return { html, head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString() + helmet.script.toString() };
}

export const staticPaths = [...Object.keys(pageMetadata), ...blogPosts.map(post => `/blogs/${post.slug}`)];
export const articles = blogPosts.map(({ slug, date }) => ({ slug, date }));
