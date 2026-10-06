import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const origin = 'https://www.bridgehomies.com';
const routes = ['/', '/software', '/webdev', '/mobile', '/ai-ml-development', '/mlops-consulting-services', '/ui-ux-design', '/design', '/products', '/aboutus', '/contact', '/blog', '/blog/submit', '/blog-terms', '/case-studies/aierpify', '/case-studies/anosuim', '/case-studies/ihfp', '/case-studies/mail-hauler-pro', '/case-studies/opleo'];
function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
}
for (const route of routes) {
  const file = path.join('.next/server/app', route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  const html = fs.readFileSync(file, 'utf8');
  const canonical = tags(html, 'link').filter(t => t.rel === 'canonical');
  assert.equal(canonical.length, 1, `${route}: exactly one canonical`);
  assert.equal(new URL(canonical[0].href).href, new URL(`${origin}${route}`).href, `${route}: self canonical`);
  const metas = tags(html, 'meta');
  for (const tag of metas.filter(t => t.property === 'og:image' || t.name === 'twitter:image')) {
    const url = new URL(tag.content, origin);
    if (url.origin === origin) assert.ok(fs.existsSync(path.join('public', decodeURIComponent(url.pathname))), `${route}: social asset ${url.pathname} exists`);
  }
  if (['/blog/submit', '/blog-terms'].includes(route)) {
    assert.ok(metas.some(t => t.name === 'robots' && t.content.includes('noindex')), `${route}: noindex`);
    assert.ok(!metas.some(t => t.name === 'googlebot' && /(?:^|,\s*)index(?:,|$)/.test(t.content)), `${route}: no conflicting googlebot index`);
  }
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(([, raw]) => {
    const data = JSON.parse(raw); return data['@graph'] || [data];
  });
  for (const entity of schemas) {
    for (const value of [entity.url, entity['@id'], entity.provider?.['@id']]) {
      assert.ok(!value?.startsWith('https://bridgehomies.com'), `${route}: consistent schema host`);
    }
  }
  if (route === '/webdev') assert.equal(schemas.filter(s => s['@type'] === 'Service').length, 1, 'Web development has one Service entity');
  if (route === '/') {
    assert.ok(!html.includes('href="/blog/submit"'), 'Homepage does not promote guest submissions');
    assert.ok(html.includes('A software development agency for your next product'), 'Visible agency overview');
  }
  console.log(`PASS ${route}`);
}
const sitemap = fs.readFileSync('public/sitemap-0.xml', 'utf8');
for (const route of ['/blog/submit', '/blog-terms', '/write', '/admin', '/testimonials/submit']) assert.ok(!sitemap.includes(`<loc>${origin}${route}</loc>`), `${route}: excluded from sitemap`);
assert.ok(sitemap.includes(`${origin}/mlops-consulting-services`), 'MLOps service is discoverable');
assert.ok(sitemap.includes(`${origin}/blog/`), 'Blog posts remain in sitemap');
const robots = fs.readFileSync('public/robots.txt', 'utf8');
assert.ok(!robots.includes('Disallow: /blog/submit'), 'Submission noindex is crawlable');
console.log('PASS sitemap, social images, schema, agency focus, and noindex crawlability');
