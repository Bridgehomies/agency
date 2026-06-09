// app/blog/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import BlogsExperience from "@/components/BlogsExperience";
import { getPublishedBlogs } from "@/lib/blog";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
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

export default async function BlogPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      <Script
        id="blog-index-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(posts)) }}
        strategy="beforeInteractive"
      />

      <Navbar />

      <BlogsExperience posts={posts} />

      <Footer />
    </>
  );
}