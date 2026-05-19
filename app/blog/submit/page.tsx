import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogSubmitPortal from "@/components/BlogSubmitPortal";


export const metadata: Metadata = {
  title: "Write for Us | Guest Post on Web Dev, AI & SaaS — Bridge Homies",
  description:
    "Write for us at Bridge Homies and get published in front of thousands of developers and business owners. Submit a guest post on web development, AI, SaaS, custom apps, or software. Earn dofollow backlinks + permanent author profile.",
  keywords: [
    "write for us",
    "write for us software development",
    "write for us web development",
    "write for us technology",
    "write for us AI",
    "write for us SaaS",
    "submit guest post",
    "guest post guidelines",
    "write for us software",
    "write for us web design",
    "write for us custom web app",
    "write for us automation",
    "guest blogging technology",
    "contribute blog post",
    "submit article technology",
  ],
  authors: [{ name: "Bridge Homies Editorial Team" }],
  creator: "Bridge Homies",
  publisher: "Bridge Homies",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://bridgehomies.com/blog/submit",  // ← FIX: match actual URL
  },
  openGraph: {
    title: "Write for Us | Guest Post — Bridge Homies",
    description:
      "Contribute to Bridge Homies. Write for us and get published in front of developers and business owners. Earn dofollow backlinks and a permanent author profile.",
    url: "https://bridgehomies.com/blog/submit",  // ← FIX: match actual URL
    siteName: "Bridge Homies",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://bridgehomies.com/og/write-for-us.jpg",
        width: 1200,
        height: 630,
        alt: "Write for Us — Bridge Homies Guest Post Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Write for Us | Guest Post — Bridge Homies",
    description:
      "Write for us and earn dofollow backlinks. Submit a guest post on web apps, SaaS, AI, or admin dashboards.",
    images: ["https://bridgehomies.com/og/write-for-us.jpg"],
    site: "@bridgehomies",
    creator: "@bridgehomies",
  },
};
// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://bridgehomies.com/blog/submit",           // ← FIX
      "url": "https://bridgehomies.com/blog/submit",           // ← FIX
      "name": "Write for Us | Submit a Guest Post — Bridge Homies",
      "description":
        "Write for Bridge Homies and get published in front of thousands of developers and business owners. Submit a guest post on custom web apps, SaaS, AI integrations, admin dashboards, and more.",
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://bridgehomies.com/#website",
        "url": "https://bridgehomies.com",
        "name": "Bridge Homies",
        "description": "Custom web apps, admin dashboards, SaaS platforms & AI integrations",
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
          { "@type": "ListItem", "position": 3, "name": "Write for Us", "item": "https://bridgehomies.com/blog/submit" }, // ← FIX
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What topics can I write about?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "You can write about web development, SaaS, AI, machine learning, automation, custom software, admin dashboards, APIs, startups, DevOps, and related technology topics.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you provide dofollow backlinks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Approved guest posts can include relevant dofollow backlinks to the author's website or product.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does approval take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Most submissions are reviewed within a few business days depending on editorial workload and content quality.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I submit AI-related content?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. We accept high-quality articles about AI engineering, automation, machine learning, LLMs, and AI tools.",
          },
        },
      ],
    }
  ],
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WriteForUsPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <Script
        id="write-for-us-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />

      <Navbar />

      {/*
        Semantic landmark for crawlers.
        The H1 ("Write for Us") and all editorial copy live inside BlogSubmitPortal —
        make sure the component renders a real <h1> with those exact words (see note below).
      */}
      <main id="main-content" aria-label="Write for Us — Guest Post Submission">
        <BlogSubmitPortal />
      </main>

      <Footer />
    </>
  );
}