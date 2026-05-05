import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogSubmitPortal from "@/components/BlogSubmitPortal";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Write for Us | Submit a Guest Post — Bridge Homies",
  description:
    "Write for us and reach thousands of developers & business owners. Submit a guest post on custom web apps, SaaS, AI integrations, admin dashboards, and software development. Get dofollow backlinks + author profile.",
  keywords: [
    "write for us",
    "write for us software",
    "write for us web development",
    "submit guest post",
    "guest post guidelines",
    "guest blogging",
    "write for us technology",
    "write for us SaaS",
    "submit article",
    "contribute blog post",
    "write for us AI",
    "write for us custom web app",
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
    canonical: "https://bridgehomies.com/blog/write-for-us",
  },
  openGraph: {
    title: "Write for Us | Submit a Guest Post — Bridge Homies",
    description:
      "Contribute to Bridge Homies. Write for us and get published in front of developers and business owners. Earn dofollow backlinks and a permanent author profile.",
    url: "https://bridgehomies.com/blog/write-for-us",
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
    title: "Write for Us | Submit a Guest Post — Bridge Homies",
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
      "@id": "https://bridgehomies.com/blog/write-for-us",
      "url": "https://bridgehomies.com/blog/write-for-us",
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
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bridgehomies.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://bridgehomies.com/blog",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Write for Us",
            "item": "https://bridgehomies.com/blog/write-for-us",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I write for Bridge Homies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fill out the 4-step submission form on this page. Provide your author details, optional backlinks, your article (minimum 800 words), and submit for editorial review. We respond within 3–5 business days.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you accept guest posts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We publish expert guest posts on custom web apps, admin dashboards, SaaS platforms, AI integrations, automation tools, eCommerce systems, and lead generation software.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I get a dofollow backlink for writing for you?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every accepted article includes up to 3 dofollow backlinks in your author profile, plus any contextual links embedded naturally in the article body.",
          },
        },
        {
          "@type": "Question",
          "name": "What topics can I write about?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We cover custom web apps, admin dashboards, automation tools, SaaS platforms, AI/ML integrations, smart dashboards, eCommerce platforms, invoice and billing systems, lead generation, SEO, content marketing, case studies, and opinion pieces.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the minimum word count for a guest post?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All articles must be at least 800 words. We recommend 1,200–2,500 words for best editorial and SEO performance.",
          },
        },
        {
          "@type": "Question",
          "name": "Is guest posting on Bridge Homies free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, submitting a guest post to Bridge Homies is completely free. There are no fees to submit or get published.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does editorial review take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our editorial team reviews every submission within 3–5 business days and notifies you by email.",
          },
        },
      ],
    },
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