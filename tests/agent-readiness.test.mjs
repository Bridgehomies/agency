import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const llms = read("public/llms.txt");
const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const notFound = read("app/not-found.tsx");
const middleware = read("middleware.ts");
const sitemap = read("public/sitemap-0.xml");

assert.match(llms, /## When to use Bridge Homies/);
assert.match(llms, /Accept: text\/markdown/);
assert.match(layout, /contactPoint/);
assert.match(layout, /email: "info@bridgehomies\.com"/);
assert.match(layout, /"@type": "PostalAddress"/);
assert.match(home, /<h1>AI\/ML Engineering and Custom Software Development<\/h1>/);
assert.match(notFound, /404 recovery information/);
assert.match(notFound, /href="\/sitemap\.xml"/);
assert.match(notFound, /# 404 — Page not found/);
assert.match(middleware, /Content-Type.*text\/markdown/);
assert.match(middleware, /Vary.*Accept, Accept-Encoding/);
assert.ok(fs.existsSync(path.join(root, "app/contact/page.tsx")));
assert.ok(fs.existsSync(path.join(root, "app/privacy/page.tsx")));
assert.match(sitemap, /https:\/\/bridgehomies\.com\/contact/);
assert.match(sitemap, /https:\/\/bridgehomies\.com\/privacy/);

console.log("agent-readiness checks passed");
