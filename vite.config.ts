import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Dynamic SEO Sitemap & Robots.txt Generator Plugin
function sitemapPlugin(): Plugin {
  const routes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.9', changefreq: 'weekly' },
    { path: '/history', priority: '0.8', changefreq: 'monthly' },
    { path: '/principal-message', priority: '0.8', changefreq: 'monthly' },
    { path: '/chairman-message', priority: '0.8', changefreq: 'monthly' },
    { path: '/mission-vision', priority: '0.8', changefreq: 'monthly' },
    { path: '/infrastructure', priority: '0.8', changefreq: 'monthly' },
    { path: '/admission', priority: '1.0', changefreq: 'weekly' },
    { path: '/academic-info', priority: '0.9', changefreq: 'weekly' },
    { path: '/routine', priority: '0.8', changefreq: 'weekly' },
    { path: '/results', priority: '0.9', changefreq: 'weekly' },
    { path: '/calendar', priority: '0.8', changefreq: 'monthly' },
    { path: '/rules', priority: '0.8', changefreq: 'monthly' },
    { path: '/scholarship', priority: '0.8', changefreq: 'monthly' },
    { path: '/notices', priority: '1.0', changefreq: 'daily' },
    { path: '/news-events', priority: '0.9', changefreq: 'daily' },
    { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
    { path: '/downloads', priority: '0.8', changefreq: 'weekly' },
    { path: '/teachers', priority: '0.8', changefreq: 'monthly' },
    { path: '/staff', priority: '0.7', changefreq: 'monthly' },
    { path: '/committee', priority: '0.8', changefreq: 'monthly' },
    { path: '/students', priority: '0.8', changefreq: 'monthly' },
    { path: '/library', priority: '0.8', changefreq: 'monthly' },
    { path: '/co-curricular', priority: '0.8', changefreq: 'monthly' },
    { path: '/sports', priority: '0.8', changefreq: 'monthly' },
    { path: '/student-portal', priority: '0.8', changefreq: 'weekly' },
    { path: '/teacher-portal', priority: '0.7', changefreq: 'weekly' },
    { path: '/useful-links', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  ];

  const buildXml = (hostUrl: string) => {
    const today = new Date().toISOString().split('T')[0];
    const cleanHost = hostUrl.replace(/\/+$/, '');
    const urls = routes
      .map((r) => {
        const loc = `${cleanHost}${r.path === '/' ? '' : r.path}`;
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${urls}\n</urlset>`;
  };

  const buildRobots = (hostUrl: string) => {
    const cleanHost = hostUrl.replace(/\/+$/, '');
    return `# robots.txt for Chattogram Airport High School\n# EIIN: 104248 | Patenga, Chattogram\nUser-agent: *\nAllow: /\n\n# Private Admin CMS\nDisallow: /admin\nDisallow: /admin/\nDisallow: /admin/login\n\n# Dynamic Sitemap Reference\nHost: ${cleanHost}\nSitemap: ${cleanHost}/sitemap.xml\n`;
  };

  const defaultDomain = 'https://chattogramairporthighschool.edu.bd';

  return {
    name: 'dynamic-sitemap-generator',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host || 'localhost:3000';
        const currentOrigin = `${protocol}://${host}`;

        if (url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(buildXml(currentOrigin));
          return;
        }

        if (url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(buildRobots(currentOrigin));
          return;
        }

        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: buildXml(defaultDomain),
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: buildRobots(defaultDomain),
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), sitemapPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
