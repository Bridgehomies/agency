import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogSubmitPortal from "@/components/BlogSubmitPortal";

export const metadata: Metadata = {
  title: "Write for Us | SaaS, Web Dev & AI Guest Posts",
  description:
    "Write for us at Bridge Homies. We accept guest posts on SaaS, web development, AI, and software automation. Earn dofollow backlinks and a permanent author profile.",
  authors: [{ name: "Bridge Homies Editorial Team" }],
  creator: "Bridge Homies",
  publisher: "Bridge Homies",
  category: "Technology",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  alternates: { canonical: "/blog/submit" },
  openGraph: {
    title: "Write for Us | SaaS & Web Dev Guest Post",
    description: "Submit a guest post on SaaS, web development, AI integrations, or software automation. Earn dofollow backlinks plus a permanent author profile on Bridge Homies.",
    url: "/blog/submit",
    siteName: "Bridge Homies",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/write-for-us.jpg", width: 1200, height: 630, alt: "Write for Us — SaaS & Web Dev Guest Posts — Bridge Homies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Write for Us | SaaS & Web Dev Guest Post",
    description: "Write for us on SaaS, web development, AI, or automation. Earn dofollow backlinks and reach thousands of developers and founders.",
    images: ["/og/write-for-us.jpg"],
    site: "@bridgehomies",
    creator: "@bridgehomies",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.bridgehomies.com/blog/submit",
      url: "https://www.bridgehomies.com/blog/submit",
      name: "Write for Us | SaaS, Web Dev & AI Guest Post — Bridge Homies",
      description: "Bridge Homies accepts guest posts on SaaS, web development, AI engineering, software automation, and startup growth.",
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.bridgehomies.com/#website",
        url: "https://www.bridgehomies.com",
        name: "Bridge Homies",
        publisher: {
          "@type": "Organization",
          "@id": "https://www.bridgehomies.com/#organization",
          name: "Bridge Homies",
          url: "https://www.bridgehomies.com",
          logo: { "@type": "ImageObject", url: "https://www.bridgehomies.com/logo-bg.png" },
        },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",         item: "https://www.bridgehomies.com" },
          { "@type": "ListItem", position: 2, name: "Blog",         item: "https://www.bridgehomies.com/blog" },
          { "@type": "ListItem", position: 3, name: "Write for Us", item: "https://www.bridgehomies.com/blog/submit" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.bridgehomies.com/blog/submit#faq",
      mainEntity: [
        { "@type": "Question", name: "Is it free to write for Bridge Homies?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, submitting a guest post is completely free. No fees, ever." } },
        { "@type": "Question", name: "Do I get a dofollow backlink?",
          acceptedAnswer: { "@type": "Answer", text: "Every accepted article includes up to 3 dofollow backlinks in your author profile, plus natural in-body links." } },
        { "@type": "Question", name: "What is the minimum word count?",
          acceptedAnswer: { "@type": "Answer", text: "800 words minimum. We recommend 1,200–2,500 words for best editorial and SEO performance." } },
        { "@type": "Question", name: "How long does review take?",
          acceptedAnswer: { "@type": "Answer", text: "Our editorial team responds within 3–5 business days." } },
        { "@type": "Question", name: "What topics can I write about?",
          acceptedAnswer: { "@type": "Answer", text: "Custom web apps, admin dashboards, SaaS, AI/ML integrations, automation, eCommerce, billing systems, lead generation, SEO, and software case studies." } },
        { "@type": "Question", name: "Will I get an author profile?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, every published contributor gets a permanent author profile page with their bio and backlinks." } },
        { "@type": "Question", name: "Can I submit an article about my SaaS startup or product?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, as long as the article delivers genuine value rather than reading as a press release. Case studies, technical breakdowns, and growth stories are welcome." } },
        { "@type": "Question", name: "Can I submit AI or machine learning content?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. We accept high-quality articles about AI engineering, LLMs, automation workflows, machine learning integration in products, and AI-powered SaaS applications." } },
      ],
    },
  ],
};

export default function WriteForUsPage() {
  return (
    <>
      <Script id="write-for-us-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <Navbar />
      <main id="main-content" aria-label="Write for Us — Guest Post Submission">
        <BlogSubmitPortal />
      </main>
      <Footer />
    </>
  );
}