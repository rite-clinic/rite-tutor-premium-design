import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'https://www.ritetutor.com';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert(urls.length > 20, 'Sitemap must contain pages, blogs, and courses.');
assert.equal(new Set(urls).size, urls.length, 'Sitemap URLs must be unique.');
const paths = new Set(urls.map(url => new URL(url).pathname));
const titles = new Set();
const descriptions = new Set();
const failures = [];

for (const url of urls) {
  const route = new URL(url).pathname;
  try {
    assert.equal(new URL(url).origin, base);
    const source = await readFile(route === '/' ? 'dist/index.html' : `dist${route}.html`, 'utf8');
    const dom = new JSDOM(source);
    const doc = dom.window.document;
    assert.equal(doc.querySelectorAll('title').length, 1, 'Exactly one title is required.');
    assert(!titles.has(doc.title), 'Page title must be unique.');
    titles.add(doc.title);
    assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
    const description = doc.querySelector('meta[name="description"]').content;
    assert(description.length >= 60 && description.length <= 170, 'Description needs useful, concise text.');
    assert(!descriptions.has(description), 'Descriptions must be unique.');
    descriptions.add(description);
    assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, url);
    assert.equal(doc.querySelector('meta[property="og:url"]').content, url);
    assert.equal(doc.querySelector('meta[property="og:title"]').content, doc.title);
    assert.equal(doc.querySelector('meta[name="twitter:title"]').content, doc.title);
    assert.equal(doc.querySelectorAll('meta[name="robots"]').length, 1);
    assert(!doc.querySelector('meta[name="robots"]').content.includes('noindex'));
    assert.equal(doc.querySelectorAll('h1').length, 1, 'Exactly one main heading is required.');
    assert(doc.querySelector('main')?.textContent.trim().length > 300, 'Main content must exist without JavaScript.');
    assert(!doc.title.includes('Loading'));
    const schemaTags = [...doc.querySelectorAll('script[type="application/ld+json"]')];
    assert(schemaTags.length > 0);
    for (const script of schemaTags) {
      const data = JSON.parse(script.textContent);
      assert.equal(data['@context'], 'https://schema.org');
      assert(!script.textContent.includes('aggregateRating'), 'Do not publish unverified review ratings.');
    }
    const payload = JSON.parse(doc.getElementById('prerender-data').textContent);
    assert(!JSON.stringify(payload).match(/\"(?:charges|author|teacher_fname|teacher_lname|price_per_class)\"/), 'No public prices or tutor data');
    assert((payload.courses || []).every(course => course.is_course_verified === true && course.show_on_website === true));
    for (const link of doc.querySelectorAll('a[href^="/"]')) {
      const href = link.getAttribute('href').split(/[?#]/)[0];
      if (href.startsWith('//') || href === '') continue;
      if (href.includes('.')) await access(`dist${href}`);
      else assert(paths.has(href), `Broken internal link: ${href}`);
    }
    for (const image of doc.querySelectorAll('img[src^="/"]')) {
      await access(`dist${image.getAttribute('src')}`);
      assert(image.hasAttribute('alt'), 'Images need alt attributes.');
    }
    dom.window.close();
  } catch (error) { failures.push(`${route}: ${error.message}`); }
}
const notFound = new JSDOM(await readFile('dist/404.html', 'utf8')).window.document;
assert(notFound.querySelector('meta[name="robots"]').content.includes('noindex'));
const privateShell = new JSDOM(await readFile('dist/app-shell.html', 'utf8')).window.document;
assert(privateShell.querySelector('meta[name="robots"]').content.includes('noindex'));
assert(!urls.some(url => /thank-you|app-shell|404|\/blog\//.test(url)));
assert((await readFile('dist/robots.txt', 'utf8')).includes(`${base}/sitemap.xml`));
const routing = await readFile('dist/.htaccess', 'utf8');
assert(routing.includes('ErrorDocument 404 /404.html'));
assert(routing.includes('app-shell.html [END]'));
assert(routing.includes('https://www.ritetutor.com/blogs [R=301,L]'));
assert(!paths.has('/pricing'));
assert(paths.has('/learning-plans'));
assert(routing.includes('RewriteRule ^courses$ courses.html [END]'));
assert(routing.includes('RewriteRule ^blogs$ blogs.html [END]'));
const catalog = JSON.parse(await readFile('dist/public-courses.json', 'utf8'));
assert(!JSON.stringify(catalog).match(/\"(?:charges|author)\"/));
assert.deepEqual(catalog.map(c => `/courses/${c.id}`).sort(), [...paths].filter(p => /^\/courses\/\d+$/.test(p)).sort());
if (failures.length) throw new Error(`SEO checks failed:\n${failures.join('\n')}`);
console.log(`Passed: ${urls.length} pages with unique metadata, indexable HTML, valid JSON-LD, working internal links/assets, sitemap, and noindex error/confirmation pages.`);
