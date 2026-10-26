// Local artifact/browser test server only. Does NOT validate Apache configuration.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.xml': 'application/xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let name = decodeURIComponent(url.pathname);
  if (name === '/pricing') { res.writeHead(301, { Location: '/learning-plans' }); return res.end(); }
  if (name !== '/' && name.endsWith('/')) { res.writeHead(301, { Location: name.slice(0, -1) + url.search }); return res.end(); }
  if (name.startsWith('/thank-you/')) name = '/app-shell.html';
  if (name === '/') name = '/index.html';
  else if (!path.extname(name)) name += '.html';
  const file = path.resolve(root, '.' + name);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  try { const body = await readFile(file); res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }); res.end(body); }
  catch { res.writeHead(404, { 'Content-Type': 'text/html' }); res.end(await readFile(path.join(root, '404.html'))); }
}).listen(4173, '127.0.0.1', () => console.log('Artifact test server on http://127.0.0.1:4173 (not Apache)'));
