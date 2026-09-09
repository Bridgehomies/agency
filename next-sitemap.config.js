/** @type {import('next-sitemap').IConfig} */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const matter = require("gray-matter");

// FIX: was 'https://bridgehomies.com' — your layout.tsx canonical/OG tags all
// declare 'https://www.bridgehomies.com'. Confirm bridgehomies.com 301s to the
// www version, then keep this matching whichever one your pages actually
// canonicalize to. If the redirect goes the other way, flip this back.
const SITE_URL = "https://www.bridgehomies.com";

const BLOG_DIR = path.join(__dirname, "content", "blogs");

// Map of app-route -> source file, so static pages get a real lastmod
// instead of "whenever this build happened to run". Add a line here any
// time you add a new top-level page.
const STATIC_PAGE_SOURCES = {
  "/": "app/page.tsx",
  "/aboutus": "app/aboutus/page.tsx",
  "/ai-ml-agency-pakistan": "app/ai-ml-agency-pakistan/page.tsx",
  "/ai-ml-development": "app/ai-ml-development/page.tsx",
  "/blog": "app/blog/page.tsx",
  "/case-studies/aierpify": "app/case-studies/aierpify/page.tsx",
  "/case-studies/anosuim": "app/case-studies/anosuim/page.tsx",
  "/case-studies/ihfp": "app/case-studies/ihfp/page.tsx",
  "/case-studies/mail-hauler-pro": "app/case-studies/mail-hauler-pro/page.tsx",
  "/contact": "app/contact/page.tsx",
  "/design": "app/design/page.tsx",
  "/mobile": "app/mobile/page.tsx",
  "/privacy": "app/privacy/page.tsx",
  "/products": "app/products/page.tsx",
  "/software": "app/software/page.tsx",
  "/terms": "app/terms/page.tsx",
  "/testimonials": "app/testimonials/page.tsx",
  "/ui-ux-design": "app/ui-ux-design/page.tsx",
  "/webdev": "app/webdev/page.tsx",
};

// Cache git lookups so a ~90-URL sitemap doesn't shell out ~90 times per build.
const gitDateCache = new Map();

function getGitLastModified(relativeFilePath) {
  if (gitDateCache.has(relativeFilePath)) return gitDateCache.get(relativeFilePath);

  try {
    const iso = execSync(`git log -1 --format=%aI -- "${relativeFilePath}"`, {
      cwd: __dirname,
      encoding: "utf-8",
    }).trim();
    const result = iso || new Date().toISOString();
    gitDateCache.set(relativeFilePath, result);
    return result;
  } catch {
    // Untracked file, or a shallow/blobless CI checkout without full git history.
    // Fall back rather than fail the build.
    const fallback = new Date().toISOString();
    gitDateCache.set(relativeFilePath, fallback);
    return fallback;
  }
}

function getBlogFrontmatterDate(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const iso = data.dateModified || data.date;
    return iso ? new Date(iso).toISOString() : new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

module.exports = {
  siteUrl: SITE_URL, // no trailing slash
  generateRobotsTxt: true, // automatically generates robots.txt too

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        // ADDED: admin/submit/api routes were previously indexable by omission
        // (an empty exclude list here doesn't stop crawling, just sitemap
        // listing — this is the part that actually blocks them).
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/blog/submit",
          "/testimonials/submit",
          "/write",
        ],
      },
    ],
  },

  // Same pattern as before, plus the routes that shouldn't be publicly
  // indexed. next-sitemap's `exclude` only keeps these out of the sitemap
  // file itself — the `disallow` above is what actually stops crawling.
  exclude: [
    "/server-sitemap.xml", // kept from original — adjust if this was a placeholder
    "/admin",
    "/admin/*",
    "/api/*",
    "/blog/submit",
    "/testimonials/submit",
    "/write",
  ],

  // Unchanged from your original — kept in case these two routes weren't
  // being auto-detected from the build output for some reason. Worth
  // double-checking your generated sitemap-0.xml doesn't now list
  // /ui-ux-design and /ai-ml-development twice, since next-sitemap should
  // already be picking both up automatically as static pages.
  additionalPaths: async (config) => [
    await config.transform(config, "/ui-ux-design"),
    await config.transform(config, "/ai-ml-development"),
  ],

  transform: async (config, url) => {
    const routePath = url.replace(SITE_URL, "") || "/";
    let lastmod;

    const blogMatch = routePath.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      lastmod = getBlogFrontmatterDate(blogMatch[1]);
    } else if (STATIC_PAGE_SOURCES[routePath]) {
      lastmod = getGitLastModified(STATIC_PAGE_SOURCES[routePath]);
    } else {
      // Unmapped route — falls back to build time (same as today) so
      // nothing breaks, but add it to STATIC_PAGE_SOURCES above to fix.
      lastmod = new Date().toISOString();
    }

    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod,
    };
  },
};