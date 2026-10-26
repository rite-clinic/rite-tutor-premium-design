// Run against an Apache staging host after build, or production after authorization/deployment.
import assert from 'node:assert/strict';
const origin = process.env.SEO_TEST_ORIGIN;
if (!origin) throw new Error('Set SEO_TEST_ORIGIN to the Apache staging or deployed origin.');
const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
for (const path of paths) {
  const response = await fetch(origin + path, { redirect: 'manual' });
  assert.equal(response.status, 200, `${path} must return 200`);
  if (path === '/') continue;
  for (const variant of [path + '/', path + '.html']) {
    const seen = new Set(); let url = origin + variant;
    for (let hop = 0; ; hop++) {
      assert(hop <= 2 && !seen.has(url), `Redirect chain/loop: ${variant}`); seen.add(url);
      const r = await fetch(url, { redirect: 'manual' });
      if (r.status === 200) { assert.equal(new URL(url).pathname, path); break; }
      assert([301, 308].includes(r.status), `${variant}: permanent redirect required`);
      url = new URL(r.headers.get('location'), url).href;
    }
  }
}
const missing = await fetch(origin + '/seo-definitely-missing-20261026');
assert.equal(missing.status, 404);
assert((await missing.text()).includes('noindex'));
const pricing = await fetch(origin + '/pricing', { redirect: 'manual' });
assert.equal(pricing.status, 301);
assert.equal(new URL(pricing.headers.get('location'), origin).pathname, '/learning-plans');
console.log(`HTTP checks passed for ${paths.length} canonical pages, alternate paths and unknown 404.`);
