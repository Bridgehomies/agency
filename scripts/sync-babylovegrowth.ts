/**
 * scripts/sync-babylovegrowth.ts
 *
 * Pulls all articles from the BabyLoveGrowth content API and syncs them into
 * content/blogs/<slug>.mdx, matching the frontmatter shape the rest of the
 * site's blog pipeline already expects.
 *
 * WHY A SYNC SCRIPT (not fetch-on-demand):
 * The API is rate-limited. This script pages through everything once per
 * run and writes it to disk — the site itself only ever reads local files.
 *
 * WHY MERGE INSTEAD OF OVERWRITE:
 * The API response only carries title / content_html / content_markdown /
 * slug / meta_description / hero_image_url / jsonLd. It knows nothing about
 * category, tags, author, date, readTime, views, published, or faq — fields
 * your existing MDX files already have and that BlogsExperience.tsx filters
 * on. So:
 *   - New article -> create the file with sane defaults for the fields the
 *     API doesn't provide.
 *   - Existing article -> only overwrite the fields the API DOES own; any
 *     category/tags/etc. you've hand-edited since import are left alone.
 *   - Unchanged content -> file isn't rewritten at all (hash-checked), so a
 *     cron run doesn't create noisy diffs.
 *
 * USAGE
 *   BABYLOVEGROWTH_API_KEY=xxx npx tsx scripts/sync-babylovegrowth.ts
 *
 * Requires: npm install gray-matter
 * (node's built-in fetch is used — Node 18+)
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";

const API_BASE = "https://api.babylovegrowth.ai/api/integrations/v1/articles";
const API_KEY = process.env.BABYLOVEGROWTH_API_KEY;
const OUTPUT_DIR = path.join(process.cwd(), "content", "blogs");
const PAGE_LIMIT = 50; // API's actual enforced max — its docs say 500, but the server rejects anything over 50

type RemoteArticle = {
  id?: string | number;
  title: string;
  content_html?: string;
  content_markdown?: string;
  slug: string;
  meta_description?: string;
  hero_image_url?: string;
  jsonLd?: unknown;
};

if (!API_KEY) {
  console.error("Missing BABYLOVEGROWTH_API_KEY environment variable.");
  process.exit(1);
}

async function fetchAllArticles(): Promise<RemoteArticle[]> {
  const all: RemoteArticle[] = [];
  let offset = 0;

  while (true) {
    const url = `${API_BASE}?limit=${PAGE_LIMIT}&offset=${offset}`;
    const res = await fetch(url, {
      headers: {
        "X-API-Key": API_KEY as string,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`BabyLoveGrowth API error ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    // Support either a bare array or a { articles: [...] } envelope.
    const batch: RemoteArticle[] = Array.isArray(data) ? data : data.articles ?? [];

    all.push(...batch);

    if (batch.length < PAGE_LIMIT) break; // reached the end
    offset += PAGE_LIMIT;
  }

  return all;
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function contentHash(body: string): string {
  return crypto.createHash("sha256").update(body).digest("hex").slice(0, 16);
}

function syncArticle(article: RemoteArticle) {
  const filePath = path.join(OUTPUT_DIR, `${article.slug}.mdx`);
  const body = article.content_markdown?.trim() || article.content_html?.trim() || "";
  const excerpt = article.meta_description || stripHtml(body).slice(0, 200);
  const hash = contentHash(body + article.title);

  // Fields the API owns — these are refreshed on every sync.
  const apiOwnedFields = {
    id: String(article.id ?? article.slug),
    slug: article.slug,
    title: article.title,
    excerpt,
    seoDescription: article.meta_description || excerpt,
    coverImage: article.hero_image_url || "",
    sourceHash: hash,
  };

  if (fs.existsSync(filePath)) {
    const existing = matter(fs.readFileSync(filePath, "utf8"));

    if (existing.data.sourceHash === hash) {
      console.log(`skip (unchanged): ${article.slug}`);
      return;
    }

    const mergedData = { ...existing.data, ...apiOwnedFields };
    const out = matter.stringify(body, mergedData);
    fs.writeFileSync(filePath, out);
    console.log(`updated: ${article.slug}`);
    return;
  }

  // New article — fill in the fields the API doesn't provide with defaults
  // an editor can adjust by hand afterwards.
  const newData = {
    ...apiOwnedFields,
    author: "Bridge Homies Team",
    authorRole: "Editorial",
    date: new Date().toISOString(),
    readTime: estimateReadTime(stripHtml(body)),
    category: "Uncategorized",
    tags: [] as string[],
    views: 0,
    published: true,
    schemaType: "BlogPosting",
  };

  const out = matter.stringify(body, newData);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(filePath, out);
  console.log(`created: ${article.slug}`);
}

async function main() {
  console.log("Fetching articles from BabyLoveGrowth...");
  const articles = await fetchAllArticles();
  console.log(`Fetched ${articles.length} article(s).`);

  for (const article of articles) {
    try {
      syncArticle(article);
    } catch (err) {
      console.error(`Failed to sync "${article.slug}":`, err);
    }
  }

  console.log("Sync complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});