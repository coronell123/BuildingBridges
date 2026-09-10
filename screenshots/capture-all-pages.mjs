import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'pages');
const baseURL = process.env.SCREENSHOT_BASE_URL || 'https://building-bridges.app';

const routes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/reset-password',
  '/contact',
  '/partners',
  '/team',
  '/team/claudia-calvano',
  '/team/esther-kipnis',
  '/team/celiana-kiefer',
  '/team/susanne-birnkammer',
  '/team/felicia-boma-lazaridou',
  '/team/dilara-yildirim',
  '/team/hannes-rothe',
  '/team/daniel-courtney',
  '/team/sumera-sajid',
  '/team/laureen-warikoru',
  '/mentors',
  '/workshops',
  '/vision',
  '/roadmap',
  '/glossary',
  '/stories',
  '/story-tool',
  '/imprint',
  '/tos',
  '/privacy-policy',
  '/onboarding',
  '/design-system',
  '/corporate-design',
  '/dashboard',
  '/dashboard/activity',
  '/dashboard/general',
  '/dashboard/security',
  '/dashboard/personal',
  '/dashboard/mentoring',
  '/dashboard/workshops',
  '/portal',
  '/portal/admin',
  '/portal/admin/stories/review',
  '/portal/admin/stories/published',
  '/portal/admin/users/pending',
  '/portal/admin/users/approved',
  '/portal/admin/users/rejected',
  '/portal/admin/settings',
];

function fileNameFor(route) {
  const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '__');
  return `${slug}.png`;
}

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' }).catch(() =>
  chromium.launch({ channel: 'chrome' })
);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const results = [];

for (const route of routes) {
  const url = `${baseURL}${route}`;
  const file = join(outDir, fileNameFor(route));
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: file, fullPage: true });
    results.push({
      route,
      finalUrl: page.url(),
      status: response?.status() ?? null,
      file,
    });
    console.log(`OK ${route} -> ${page.url()} (${response?.status()})`);
  } catch (error) {
    results.push({ route, error: error.message, file });
    console.error(`FAIL ${route}: ${error.message}`);
  }
}

await browser.close();
console.log(JSON.stringify({ baseURL, outDir, count: results.length, results }, null, 2));
