import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogSubmitPortal from "@/components/BlogSubmitPortal";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Write for Us | SaaS, Web Dev & AI Guest Posts — Bridge Homies",
  description:
    "Write for us at Bridge Homies. We accept guest posts on SaaS, web development, AI, and software automation. Earn dofollow backlinks and a permanent author profile published in front of thousands of developers and founders.",
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
    canonical: "https://bridgehomies.com/blog/submit",
  },
  openGraph: {
    title: "Write for Us | SaaS & Web Dev Guest Post — Bridge Homies",
    description:
      "Submit a guest post on SaaS, web development, AI integrations, or software automation. Write for us and earn dofollow backlinks plus a permanent author profile on Bridge Homies.",
    url: "https://bridgehomies.com/blog/submit",
    siteName: "Bridge Homies",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://bridgehomies.com/og/write-for-us.jpg",
        width: 1200,
        height: 630,
        alt: "Write for Us — SaaS & Web Dev Guest Posts — Bridge Homies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Write for Us | SaaS & Web Dev Guest Post — Bridge Homies",
    description:
      "Write for us on SaaS, web development, AI, or automation. Earn dofollow backlinks and reach thousands of developers and founders.",
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
      "@id": "https://bridgehomies.com/blog/submit",
      "url": "https://bridgehomies.com/blog/submit",
      "name": "Write for Us | SaaS, Web Dev & AI Guest Post — Bridge Homies",
      "description":
        "Bridge Homies accepts guest posts and contributed articles on SaaS products, web development, AI engineering, software automation, and startup growth. Write for us to earn dofollow backlinks and reach a developer and founder audience.",
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
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Write for Us",
            "item": "https://bridgehomies.com/blog/submit",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://bridgehomies.com/blog/submit#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I write for you about SaaS products or SaaS development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes — SaaS is one of our primary topic areas. We accept guest posts covering SaaS architecture, SaaS onboarding, pricing strategies, SaaS growth, churn reduction, and building SaaS products with modern stacks. If you have real experience shipping or growing a SaaS product, we want to hear from you.",
          },
        },
        {
          "@type": "Question",
          "name": "What topics can I write about?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "We accept guest posts on SaaS, web development, AI and machine learning engineering, automation, custom software development, admin dashboards, APIs, DevOps, startup product strategy, and related technology topics. Practical, experience-backed articles perform best on our platform.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you provide dofollow backlinks for guest posts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Approved guest posts can include relevant dofollow backlinks to the author's website, SaaS product, or portfolio. Links must be contextually relevant and editorially appropriate.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does the review process take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Most submissions are reviewed within a few business days depending on editorial workload and content quality. SaaS and AI articles with strong practical depth are typically prioritized.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I submit an article about my SaaS startup or product?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes, as long as the article delivers genuine value to readers rather than reading as a press release or advertisement. We accept case studies, technical breakdowns, and growth stories from SaaS founders — the content must be informative first.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I submit AI or machine learning content?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. We accept high-quality articles about AI engineering, LLMs, automation workflows, machine learning integration in products, and AI-powered SaaS applications.",
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
      <Script
        id="write-for-us-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />

      <Navbar />

      <main id="main-content" aria-label="Write for Us — SaaS & Web Dev Guest Post Submission">
        <BlogSubmitPortal />
      </main>

      <Footer />
    </>
  );
}