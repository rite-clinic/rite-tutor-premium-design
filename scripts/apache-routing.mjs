// Public routes only: keep the existing virtual-host API/auth/dashboard handlers.
export function apacheRouting(routes, origin) {
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const aliases = [['/pricing', '/learning-plans'], ['/blog', '/blogs'], ...routes.filter(p => p.startsWith('/blogs/')).map(p => [p.replace('/blogs/', '/blog/'), p])];
  return `# Generated. Apache 2.4; AllowOverride FileInfo Indexes Options=Indexes,MultiViews required.
Options -MultiViews -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
RewriteEngine On
# Preserve existing application and API handlers; do not normalize their URLs.
RewriteRule ^(?:backend|api|sign-in|sign-up|register|login|dashboard|student|admin)(?:/|$) - [L]
${aliases.map(([from, to]) => `RewriteRule ^${escape(from.slice(1))}/?$ ${origin}${to} [R=301,L]`).join('\n')}
# Explicit file mapping avoids mod_dir slash redirects on courses/blogs directories.
${routes.map(route => {
    const name = route.slice(1);
    const target = route === '/' ? 'index.html' : `${name}.html`;
    return `RewriteCond %{THE_REQUEST} \\s/+${route === '/' ? '(?:index\\.html)' : `${escape(name)}(?:/|\\.html)`}[?\\s] [NC]
RewriteRule ^${route === '/' ? 'index\\.html' : `${escape(name)}(?:/|\\.html)`}$ ${origin}${route} [R=301,L]
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} !^www\\.ritetutor\\.com$ [NC]
RewriteRule ^${escape(name)}$ ${origin}${route} [R=301,L]
RewriteRule ^${escape(name)}$ ${target} [END]`;
  }).join('\n')}
RewriteRule ^thank-you(?:/[^/]+)?/?$ app-shell.html [END]
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [END]
RewriteRule ^.+$ - [R=404,L]
<IfModule mod_headers.c>
<FilesMatch "\\.html$">
Header set Cache-Control "no-cache"
</FilesMatch>
<FilesMatch "-[A-Za-z0-9_-]{8,}\\.(js|css|woff2)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
</IfModule>
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
`;
}
