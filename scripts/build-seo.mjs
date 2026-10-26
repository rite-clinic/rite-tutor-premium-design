import { validate } from './public-catalog.mjs';
import { build, loadEnv } from 'vite';
import { apacheRouting } from './apache-routing.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

process.env.NODE_ENV = 'production';
const root = process.cwd();
const { origin: site } = JSON.parse(await readFile('src/data/brand.json', 'utf8'));
const env = { ...loadEnv('production', root, ''), ...process.env };
const api = (env.VITE_API_BASE_URL || 'https://ritetutor.com/backend/api').replace(/\/$/, '');

async function publicCourses() {
  if (env.SEO_COURSES_FILE) return validate(JSON.parse(await readFile(env.SEO_COURSES_FILE, 'utf8')));
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(`${api}/courses-list/`, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`Course API returned HTTP ${response.status}`);
      return validate(await response.json());
    } catch (error) { failure = error; }
  }
  throw new Error('Cannot build fresh course pages. Check the public course API and rebuild. ' + failure.message);
}


const courses = await publicCourses();
if (!courses.length) throw new Error('Empty public catalog: explicitly review unpublishing before deploying.');
await build();
await writeFile("dist/public-courses.json", JSON.stringify(courses).replace(/</g, "\\u003c"));
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.seo-build', emptyOutDir: true, copyPublicDir: false }, ssr: { noExternal: ['react-helmet-async'] } });
const { render, staticPaths } = await import(pathToFileURL(path.join(root, '.seo-build/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<!--seo-head-->') || !template.includes('<!--app-html-->')) throw new Error('SEO template markers are missing.');
const routes = [...staticPaths, ...courses.map(course => `/courses/${course.id}`)];
const escapeXml = value => value.replace(/[<>&"']/g, c => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&apos;' })[c]);
const serialize = data => JSON.stringify(data).replace(/</g, '\\u003c');

for (const route of [...routes, '/404']) {
  // Only serialize the public records needed by this page; never booking data.
  const data = route === '/404' ? { notFound: true } : route === '/courses' ? { courses } : route.startsWith('/courses/') ? { courses: courses.filter(course => route === `/courses/${course.id}`) } : {};
  const { html, head } = render(route, data);
  const output = template.replace('<html lang="en">', '<html lang="en" data-prerendered>')
    .replace('<!--seo-head-->', head)
    .replace('<!--app-html-->', () => html)
    .replace('</body>', () => `<script type="application/json" id="prerender-data">${serialize(data)}</script></body>`);
  const filename = route === '/' ? 'dist/index.html' : `dist${route}.html`;
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, output);
}

const { head: privateHead } = render('/thank-you/confirmation', {});
await writeFile('dist/app-shell.html', template.replace('<!--seo-head-->', privateHead).replace('<!--app-html-->', ''));

// No fabricated modification dates or unsupported priority/change frequency hints.
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${escapeXml(site + (route === '/' ? '/' : route))}</loc></url>`).join('\n')}\n</urlset>\n`);

await writeFile('dist/.htaccess', apacheRouting(routes, site));
console.log(`SEO build complete: ${routes.length} indexable pages.`);
