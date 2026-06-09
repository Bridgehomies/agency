// app/blog/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import BlogsExperience from "@/components/BlogsExperience";
import { getPublishedBlogByIdentifier, getPublishedBlogs } from "@/lib/blog";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // FIX 1: No "— Bridge Homies" suffix here — your root layout.tsx
  // template appends it. Previously this would render as
  // "Blog | SaaS... — Bridge Homies | Bridge Homies" if template is active.
  // If you do NOT have a title template in layout.tsx, restore the suffix.
  title: "SaaS, Web Dev & AI Engineering Blog — Bridge Homies",
  description:
    "In-depth articles on SaaS development, custom web apps, AI integrations, automation, and software engineering. Written by practitioners for founders and developers.",
  alternates: {
    canonical: "https://bridgehomies.com/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Bridge Homies Blog | SaaS, Web Dev & AI Engineering",
    description:
      "Practical articles on SaaS, AI engineering, automation, web development, and software growth. Written for builders and founders.",
    url: "https://bridgehomies.com/blog",
    siteName: "Bridge Homies",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://bridgehomies.com/og/blog.jpg",
        width: 1200,
        height: 630,
        alt: "Bridge Homies Blog — SaaS, Web Dev & AI Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge Homies Blog | SaaS, Web Dev & AI Engineering",
    description:
      "Practical articles on SaaS, AI engineering, automation, and custom software. Written for builders and founders.",
    images: ["https://bridgehomies.com/og/blog.jpg"],
    site: "@bridgehomies",
  },
};

// ─── Structured Data ─────────────────────────────────────────────────────────

function buildJsonLd(posts: { title: string; slug: string; excerpt: string; date: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://bridgehomies.com/blog#collectionpage",
        "url": "https://bridgehomies.com/blog",
        "name": "Bridge Homies Blog",
        "description":
          "In-depth articles on SaaS development, custom web apps, AI integrations, automation, and software engineering.",
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://bridgehomies.com/#website",
          "url": "https://bridgehomies.com",
          "name": "Bridge Homies",
          "publisher": {
            "@type": "Organization",
            "@id": "https://bridgehomies.com/#organization",
            "name": "Bridge Homies",
            "url": "https://bridgehomies.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://bridgehomies.com/logo.png",
            },
          },
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bridgehomies.com" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://bridgehomies.com/blog" },
          ],
        },
        // FIX 2: Surface the article list to Googlebot via structured data.
        // Even if the grid is client-rendered, the schema gives Google
        // a deterministic signal about what this page contains.
        "hasPart": posts.slice(0, 12).map((post) => ({
          "@type": "Article",
          "url": `https://bridgehomies.com/blog/${post.slug}`,
          "name": post.title,
          "description": post.excerpt,
          "datePublished": post.date,
        })),
      },
    ],
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const posts = getPublishedBlogs()
    .map((post) => getPublishedBlogByIdentifier(post.slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return (
    <>
      {/* FIX 3: JSON-LD injected server-side, before the client component hydrates.
          Googlebot sees this on first render regardless of JS execution. */}
      <Script
        id="blog-index-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(posts)) }}
        strategy="beforeInteractive"
      />

      <Navbar />

      {/* FIX 4: posts is passed as a prop from this Server Component,
          which means Next.js serialises the array into the HTML payload.
          BlogsExperience receives fully-populated posts on first render —
          Googlebot does NOT need to execute any fetch to see the content.
          
          If posts.length === 0 here, your CMS/MDX source isn't being read
          at build time. Check that getPublishedBlogs() works without a
          runtime fetch (file-system reads are fine; API calls are not
          unless you're using SSR with proper caching). */}
      <BlogsExperience posts={posts} />

      <Footer />
    </>
  );
}