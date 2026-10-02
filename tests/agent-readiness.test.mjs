import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const llms = read("public/llms.txt");
const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const hero = read("components/home/hero-section.tsx");
const notFound = read("app/not-found.tsx");
const proxy = read("proxy.ts");
const sitemap = read("public/sitemap-0.xml");
const robots = read("public/robots.txt");

assert.match(llms, /## When to use Bridge Homies/);
assert.match(llms, /Accept: text\/markdown/);
assert.match(layout, /contactPoint/);
assert.match(layout, /email: "info@bridgehomies\.com"/);
assert.match(layout, /"@type": "PostalAddress"/);
assert.match(home, /When to use Bridge Homies/);
assert.match(hero, /AI\/ML engineering and custom software/);
assert.match(notFound, /404 recovery information/);
assert.match(notFound, /href="\/sitemap\.xml"/);
assert.match(notFound, /# 404 — Page not found/);
assert.match(proxy, /Content-Type.*text\/markdown/);
assert.match(proxy, /Vary.*Accept, Accept-Encoding/);
assert.match(robots, /User-agent: OAI-SearchBot/);
assert.match(robots, /User-agent: Claude-SearchBot/);
assert.match(robots, /User-agent: PerplexityBot/);
assert.ok(fs.existsSync(path.join(root, "app/contact/page.tsx")));
assert.ok(fs.existsSync(path.join(root, "app/privacy/page.tsx")));
assert.match(sitemap, /https:\/\/www\.bridgehomies\.com\/contact/);
assert.match(sitemap, /https:\/\/www\.bridgehomies\.com\/privacy/);

console.log("agent-readiness checks passed");
