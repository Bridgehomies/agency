/** @type {import('next-sitemap').IConfig} */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const matter = require("gray-matter");

// Keep the sitemap host aligned with the site's www canonicals and the
// permanent apex-to-www redirect configured in next.config.mjs.
const SITE_URL = "https://www.bridgehomies.com";

const BLOG_DIR = path.join(__dirname, "content", "blogs");

// Map of app-route -> source files that make up its visible content, so
// lastmod reflects route and imported-component edits. Add a line here any
// time you add a new top-level page or move significant copy into a component.
const STATIC_PAGE_SOURCES = {
  "/": [
    "app/page.tsx",
    "components/home/hero-section.tsx",
    "components/home/services-section.tsx",
    "components/home/work-section.tsx",
    "components/home/interactive-checklist.tsx",
    "components/home/interactive-map.tsx",
    "components/home/sticky-transform-section.tsx",
    "components/home/team-section.tsx",
    "components/home/testimonials-section.tsx",
    "components/home/contact-section.tsx",
  ],
  "/aboutus": [
    "app/aboutus/page.tsx",
    "components/about/HeroSection.tsx",
    "components/about/StorySection.tsx",
    "components/about/TeamSection.tsx",
    "components/about/ValuesSection.tsx",
  ],
  "/ai-ml-agency-pakistan": "app/ai-ml-agency-pakistan/page.tsx",
  "/ai-ml-development": "app/ai-ml-development/page.tsx",
  "/blog": "app/blog/page.tsx",
  "/business-automation": [
    "app/business-automation/page.tsx",
    "components/service-detail-page.tsx",
  ],
  "/case-studies/aierpify": "app/case-studies/aierpify/page.tsx",
  "/case-studies/anosuim": "app/case-studies/anosuim/page.tsx",
  "/case-studies/ihfp": "app/case-studies/ihfp/page.tsx",
  "/case-studies/mail-hauler-pro": "app/case-studies/mail-hauler-pro/page.tsx",
  "/case-studies/opleo": "app/case-studies/opleo/page.tsx",
  "/contact": "app/contact/page.tsx",
  "/api-system-integration": [
    "app/api-system-integration/page.tsx",
    "components/service-detail-page.tsx",
  ],
  "/cloud-devops": [
    "app/cloud-devops/page.tsx",
    "components/service-detail-page.tsx",
  ],
  "/design": "app/design/page.tsx",
  "/mobile": "app/mobile/page.tsx",
  "/mlops-consulting-services": "app/mlops-consulting-services/page.tsx",
  "/privacy": "app/privacy/page.tsx",
  "/saas-product-development": [
    "app/saas-product-development/page.tsx",
    "components/service-detail-page.tsx",
  ],
  "/products": [
    "app/products/page.tsx",
    "app/products/ProductsClient.tsx",
    "components/product/Hero.tsx",
    "components/product/FeaturedProduct.tsx",
    "components/product/Features.tsx",
    "components/product/CTA.tsx",
    "components/product/AierpifyPage.tsx",
    "components/product/MailHaulerProPage.tsx",
  ],
  "/software": "app/software/page.tsx",
  "/terms": "app/terms/page.tsx",
  "/technical-consulting": [
    "app/technical-consulting/page.tsx",
    "components/service-detail-page.tsx",
  ],
  "/software-support-maintenance": [
    "app/software-support-maintenance/page.tsx",
    "components/service-detail-page.tsx",
  ],
  "/testimonials": "app/testimonials/page.tsx",
  "/ui-ux-design": "app/ui-ux-design/page.tsx",
  "/webdev": ["app/webdev/page.tsx", "app/webdev/WebDevClient.tsx"],
};

const SHARED_PAGE_SOURCES = [
  "app/layout.tsx",
  "components/navbar.tsx",
  "components/footer.tsx",
];

// Cache git lookups so a ~90-URL sitemap doesn't shell out ~90 times per build.
const gitDateCache = new Map();

function getGitLastModified(relativeFilePath) {
  if (gitDateCache.has(relativeFilePath))
    return gitDateCache.get(relativeFilePath);

  try {
    const status = execSync(
      `git status --porcelain --untracked-files=no -- "${relativeFilePath}"`,
      {
        cwd: __dirname,
        encoding: "utf-8",
      },
    ).trim();

    // During local generation, Git's last commit date predates uncommitted
    // content edits. Use the edited source file's mtime in that case. Clean
    // checkouts (including deployment builds after commit) use the commit date.
    if (status) {
      const sourcePath = path.join(__dirname, relativeFilePath);
      const modified = fs.statSync(sourcePath).mtime.toISOString();
      gitDateCache.set(relativeFilePath, modified);
      return modified;
    }

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

function getStaticPageLastModified(sourceFiles) {
  const files = Array.isArray(sourceFiles) ? sourceFiles : [sourceFiles];
  const dates = [...SHARED_PAGE_SOURCES, ...files]
    .map((filePath) => Date.parse(getGitLastModified(filePath)))
    .filter(Number.isFinite);

  return dates.length
    ? new Date(Math.max(...dates)).toISOString()
    : new Date().toISOString();
}

function getBlogFrontmatterDate(slug) {
  const candidates = [`${slug}.mdx`, `${slug}.md`].map((file) =>
    path.join(BLOG_DIR, file),
  );
  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) return new Date().toISOString();

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    if (data.dateModified) return new Date(data.dateModified).toISOString();

    // For legacy posts, use the source's latest tracked edit date instead of
    // pretending the publication date is also the last modification date.
    return getGitLastModified(path.relative(__dirname, filePath));
  } catch {
    return getGitLastModified(path.relative(__dirname, filePath));
  }
}

module.exports = {
  siteUrl: SITE_URL, // no trailing slash
  generateRobotsTxt: true, // automatically generates robots.txt too

  robotsTxtOptions: {
    policies: [
      // These are the search crawlers that power citation surfaces. They are
      // declared separately so an upstream robots rule cannot accidentally
      // obscure the site's intended AI-search access policy. Training bots
      // remain governed by the default policy and are deliberately not used
      // as a proxy for search citability.
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/*", "/api/*"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/admin/*", "/api/*"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/*", "/api/*"],
      },
      {
        userAgent: "*",
        allow: "/",
        // The public /admin login shell is noindexed so crawlers can read that
        // directive. Private admin subroutes and APIs remain blocked.
        disallow: ["/admin/*", "/api/*"],
      },
    ],
  },

  // Submission and policy pages are noindex but crawlable so search engines
  // can see their robots metadata. Keep them out of the sitemap.
  exclude: [
    "/server-sitemap.xml", // kept from original — adjust if this was a placeholder
    "/admin",
    "/admin/*",
    "/api/*",
    "/blog/submit",
    "/blog-terms",
    "/blog/where-can-i-find-websites-that-say-write-for-us",
    "/testimonials/submit",
    "/testimonials",
    "/terms",
    "/write",
  ],

  transform: async (config, url) => {
    const routePath = url.replace(SITE_URL, "") || "/";
    let lastmod;

    const blogMatch = routePath.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      lastmod = getBlogFrontmatterDate(blogMatch[1]);
    } else if (STATIC_PAGE_SOURCES[routePath]) {
      lastmod = getStaticPageLastModified(STATIC_PAGE_SOURCES[routePath]);
    } else {
      // Unmapped route — falls back to build time (same as today) so
      // nothing breaks, but add it to STATIC_PAGE_SOURCES above to fix.
      lastmod = new Date().toISOString();
    }

    return {
      loc: url,
      changefreq: config.changefreq,
      priority:
        routePath === "/" ? 1 : routePath.startsWith("/blog") ? 0.3 : 0.8,
      lastmod,
    };
  },
};
