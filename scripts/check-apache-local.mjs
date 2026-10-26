import https from 'node:https';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const request = (path, host = 'www.ritetutor.com') => new Promise((resolve, reject) => {
  https.get({ hostname: '127.0.0.1', port: 8443, path, headers: { Host: host }, rejectUnauthorized: false }, response => {
    let body = ''; response.on('data', part => body += part); response.on('end', () => resolve({ status: response.statusCode, location: response.headers.location, body }));
  }).on('error', reject);
});
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
for (const path of routes) {
  assert.equal((await request(path)).status, 200, path);
  const alternateHost = await request(path, 'ritetutor.com');
  assert.equal(alternateHost.status, 301, `host: ${path}`);
  assert.equal(alternateHost.location, `https://www.ritetutor.com${path}`);
  for (const alternate of path === '/' ? ['/index.html'] : [path + '/', path + '.html']) {
    const r = await request(alternate);
    assert.equal(r.status, 301, alternate);
    assert.equal(r.location, `https://www.ritetutor.com${path}`, alternate);
    assert.equal((await request(new URL(r.location).pathname)).status, 200, `redirect loop: ${alternate}`);
  }
}
for (const path of ['/missing-test', '/courses/99999999', '/blogs/deleted-test']) {
  const r = await request(path); assert.equal(r.status, 404, path); assert(r.body.includes('noindex'));
}
assert.equal((await request('/pricing')).location, 'https://www.ritetutor.com/learning-plans');
assert.equal((await request('/public-courses.json')).status, 200);
assert.equal((await request('/thank-you/example')).status, 200);
console.log(`Apache integration: ${routes.length} routes, hostname/path redirects, assets and genuine 404s passed.`);
