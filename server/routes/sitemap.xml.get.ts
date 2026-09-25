/**
 * Sitemap, written by hand because the site is a handful of URLs.
 *
 * Only pages a person can open are listed. /cv.md and /llms.txt are for
 * machines and are reached through llms.txt and the footer, not through here:
 * a sitemap full of non-HTML entries just confuses crawlers.
 */
const SITE = 'https://heuberger.dev';

const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/cv', priority: '0.9', changefreq: 'monthly' },
];

export default defineEventHandler((event) => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = PAGES.map(
    (page) => `  <url>
    <loc>${SITE}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  ).join('\n');

  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
