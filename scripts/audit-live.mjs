import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
const origin = process.env.AUDIT_ORIGIN || 'https://www.ritetutor.com';
const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const samples = [...new Set([...paths, '/courses/', '/blogs/', '/sign-in', '/register', '/seo-nonexistent-20261026'])];
const rows = [];
for (const path of samples) {
  let url = origin + path; const hops = []; const seen = new Set(); let html = ''; let status;
  try {
    while (!seen.has(url) && hops.length < 8) {
      seen.add(url);
      const r = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
      status = r.status; const location = r.headers.get('location');
      hops.push({ url, status, location });
      if (!location || status < 300 || status >= 400) { html = await r.text(); break; }
      url = new URL(location, url).href;
    }
    const doc = new JSDOM(html).window.document;
    rows.push({ path, status, redirects: hops, loop: !html && seen.has(url), title: doc.title, canonical: doc.querySelector('link[rel=canonical]')?.href, robots: doc.querySelector('meta[name=robots]')?.content, h1: doc.querySelector('h1')?.textContent, initialMainCharacters: doc.querySelector('main')?.textContent.trim().length || 0, sitemap: paths.includes(path), intendedIndexable: paths.includes(path) });
  } catch (error) { rows.push({ path, error: error.message }); }
}
await mkdir('output/seo', { recursive: true });
await writeFile('output/seo/live-baseline.json', JSON.stringify({ date: '2026-10-26', origin, rows }, null, 2));
console.log(`Recorded ${rows.length} routes; ${rows.filter(r => r.loop).length} loops.`);
