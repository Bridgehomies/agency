// app/ai-ml-development/page.tsx
// SEO UPDATE: Targeting top GSC queries week of 5/26/26
// New keywords: ml model engineering services, ml engineering services,
// machine learning engineering services, ai pipeline engineering services,
// engineering services for ai and ml integration, ai ml engineering service providers

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkSection from "@/components/home/work-section";
import StatsCounter from "@/components/StatsCounter"; // ← client component

// ─── SEO Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "ML Model Engineering Services & Machine Learning Agency | Bridge Homies",
  description:
    "Bridge Homies delivers production-grade ML model engineering services and AI ML engineering. We build RAG pipelines, LLM integrations, AI pipeline engineering, and scalable MLOps for enterprises worldwide.",
  keywords: [
    // Primary — top GSC queries
    "ml model engineering services",
    "ml engineering services",
    "machine learning engineering services",
    "ai ml engineering services",
    "ai/ml engineering services",
    "ai pipeline engineering services",
    "engineering services for ai and ml integration",
    "ai ml engineering service providers",
    "ai and machine learning services for engineering automation",
    // Secondary / supporting
    "AI ML services",
    "AI ML engineering",
    "machine learning agency",
    "AI automation",
    "LLM integration",
    "RAG pipeline",
    "MLOps",
    "AI engineering services",
    "predictive analytics",
    "computer vision",
    "NLP services",
    "enterprise AI",
    "AI development company",
    "machine learning development",
    "generative AI services",
  ],
  alternates: {
    canonical: "https://bridgehomies.com/ai-ml-development",
  },
  openGraph: {
    type: "website",
    url: "https://bridgehomies.com/ai-ml-development",
    title:
      "ML Model Engineering Services & Machine Learning Agency | Bridge Homies",
    description:
      "Production-grade ML model engineering services — RAG pipelines, AI pipeline engineering, LLM fine-tuning, and MLOps for enterprise clients. Delivered by Bridge Homies.",
    siteName: "Bridge Homies",
    images: [
      {
        url: "https://bridgehomies.com/og-ai-ml.jpg",
        width: 1200,
        height: 630,
        alt: "Bridge Homies — ML Model Engineering Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ML Model Engineering Services & Machine Learning Agency | Bridge Homies",
    description:
      "RAG pipelines, AI pipeline engineering, LLM integrations, and scalable MLOps — built for production. Bridge Homies.",
    images: ["https://bridgehomies.com/og-ai-ml.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://bridgehomies.com/ai-ml-development/#webpage",
      url: "https://bridgehomies.com/ai-ml-development",
      name: "ML Model Engineering Services & Machine Learning Agency | Bridge Homies",
      description:
        "Bridge Homies delivers production-grade ML model engineering services including RAG pipelines, AI pipeline engineering, LLM fine-tuning, and MLOps for enterprises.",
      inLanguage: "en-US",
      isPartOf: { "@id": "https://bridgehomies.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://bridgehomies.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "ML Model Engineering Services",
            item: "https://bridgehomies.com/ai-ml-development",
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/ai-ml-development/#service",
      name: "ML Model Engineering Services",
      alternateName: [
        "ML Engineering Services",
        "Machine Learning Engineering Services",
        "AI ML Engineering Services",
        "AI Pipeline Engineering Services",
        "Engineering Services for AI and ML Integration",
        "Machine Learning Agency",
        "AI Automation Services",
        "LLM Integration Services",
        "RAG Pipeline Development",
        "MLOps Engineering",
      ],
      provider: { "@id": "https://bridgehomies.com/#organization" },
      url: "https://bridgehomies.com/ai-ml-development",
      description:
        "Production-grade ML model engineering services and AI ML engineering including RAG pipelines, AI pipeline engineering, LLM fine-tuning, AI automation workflows, computer vision, NLP, and scalable MLOps infrastructure.",
      serviceType: "AI & Machine Learning Engineering",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ML Model Engineering Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "LLM & RAG Pipeline Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation Workflows" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Predictive Analytics & ML Model Engineering" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Computer Vision & NLP" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Pipeline Engineering & MLOps" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://bridgehomies.com/ai-ml-development/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes your AI ML engineering services different from standard dev shops?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We don't just 'wrap' ChatGPT APIs. We are a dedicated machine learning agency that builds secure RAG pipelines, fine-tunes open-source models, and sets up robust MLOps to ensure your data remains proprietary and your inferences remain lightning fast.",
          },
        },
        {
          "@type": "Question",
          name: "What do your ML model engineering services actually include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our ML model engineering services cover the full lifecycle: data pipeline engineering, model architecture design, training and fine-tuning, AI pipeline engineering for inference, and ongoing MLOps monitoring. Whether you need engineering services for AI and ML integration into an existing system, or a net-new ML platform, we handle it end to end.",
          },
        },
        {
          "@type": "Question",
          name: "How can AI automation actually impact our enterprise workflows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "By replacing deterministic, rule-based systems with probabilistic intelligence. We implement AI automation to handle dynamic tasks—like context-aware customer support, unstructured invoice data extraction, and real-time inventory predictive analytics—saving thousands of manual labor hours.",
          },
        },
        {
          "@type": "Question",
          name: "What industries do you build machine learning models for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our core expertise spans Fintech, Healthcare, Logistics, and SaaS. Whether it is algorithmic trading models, patient data analysis, or supply chain route optimization, our engineering principles remain universally robust.",
          },
        },
      ],
    },
  ],
};

// ─── Static data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: "01",
    title: "LLM & RAG Pipelines",
    desc: "We integrate Large Language Models with Retrieval-Augmented Generation (RAG) to build context-aware, highly accurate enterprise search and chat applications.",
  },
  {
    num: "02",
    title: "ML Model Engineering",
    // KEYWORD: "ml model engineering services" — exact match in H3
    desc: "Full-lifecycle ML model engineering services: architecture design, training, fine-tuning, and validation. We build models that don't just pass benchmarks — they perform in production.",
  },
  {
    num: "03",
    title: "AI Automation",
    desc: "Replace mundane workflows. We deploy intelligent agents capable of processing documents, categorizing data, and executing multi-step logic autonomously.",
  },
  {
    num: "04",
    title: "Computer Vision & NLP",
    desc: "Advanced neural networks designed to parse, understand, and extract actionable metadata from raw images, video streams, and unstructured text.",
  },
  {
    num: "05",
    title: "AI Pipeline Engineering",
    // KEYWORD: "ai pipeline engineering services" — exact match in H3
    desc: "End-to-end AI pipeline engineering: data ingestion, feature stores, model serving, and monitoring. We build the MLOps infrastructure that keeps your models reliable at scale.",
  },
];

const FAQS = [
  {
    q: "What makes your AI ML engineering services different from standard dev shops?",
    a: "We don't just 'wrap' ChatGPT APIs. We are a dedicated machine learning agency that builds secure RAG pipelines, fine-tunes open-source models, and sets up robust MLOps to ensure your data remains proprietary and your inferences remain lightning fast.",
  },
  {
    // KEYWORD: "ml model engineering services", "engineering services for ai and ml integration"
    q: "What do your ML model engineering services actually include?",
    a: "Our ML model engineering services cover the full lifecycle: data pipeline engineering, model architecture design, training and fine-tuning, AI pipeline engineering for inference, and ongoing MLOps monitoring. Whether you need engineering services for AI and ML integration into an existing system, or a net-new ML platform, we handle it end to end.",
  },
  {
    q: "How can AI automation actually impact our enterprise workflows?",
    a: "By replacing deterministic, rule-based systems with probabilistic intelligence. We implement AI automation to handle dynamic tasks—like context-aware customer support, unstructured invoice data extraction, and real-time inventory predictive analytics—saving thousands of manual labor hours.",
  },
  {
    q: "What industries do you build machine learning models for?",
    a: "Our core expertise spans Fintech, Healthcare, Logistics, and SaaS. Whether it is algorithmic trading models, patient data analysis, or supply chain route optimization, our engineering principles remain universally robust.",
  },
];

const INTERNAL_LINKS = [
  { label: "Enterprise Software", link: "/software" },
  { label: "React & Next.js", link: "/webdev" },
  { label: "Native Mobile", link: "/mobile" },
  { label: "FBR ERP Suite", link: "/products" },
];

// ─── KEYWORD TAGS — LSI / topical cluster signals ────────────────────────────
const KEYWORD_TAGS = [
  // Primary GSC query variants — exact match chips
  "ML Model Engineering Services",
  "ML Engineering Services",
  "Machine Learning Engineering Services",
  "AI ML Engineering Services",
  "AI Pipeline Engineering Services",
  "Engineering Services for AI & ML Integration",
  "AI ML Engineering Service Providers",
  // Secondary
  "LLM Integration",
  "RAG Pipeline",
  "AI Automation",
  "MLOps",
  "Predictive Analytics",
  "Computer Vision",
  "Natural Language Processing",
  "Neural Networks",
  "Deep Learning",
  "Generative AI",
  "AI Strategy Consulting",
  "Model Fine-tuning",
  "Data Pipeline Engineering",
  "AI Security",
  "Enterprise AI",
  "Model Deployment",
  "Vector Databases",
  "AI Agents",
  "Workflow Automation",
  "Intelligent Document Processing",
  "Real-time Inference",
  "Model Monitoring",
  "AIOps",
];

// ─── Page (Server Component) ─────────────────────────────────────────────────
export default function AiMlPage() {
  return (
    <main className="font-sans bg-gray-50 text-gray-900 selection:bg-purple-900 selection:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      {/* ── 1. EDITORIAL HERO ─────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex flex-col justify-center"
        aria-label="Hero"
      >
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600" />
                {/* KEYWORD: "ml engineering services" — eyebrow label */}
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">
                  ML Engineering Services
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900 uppercase">
                Engineer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500">
                  Intelligence.
                </span>
              </h1>

              {/* KEYWORD: "machine learning engineering services" — H2 subhead */}
              <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-500 tracking-tight uppercase">
                Machine Learning Engineering Services &amp; AI Pipeline Engineering
              </h2>
            </div>

            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                We deliver production-grade{" "}
                <strong className="text-gray-900">ML model engineering services</strong>.
                From advanced RAG pipelines to{" "}
                <strong className="text-gray-900">AI pipeline engineering</strong> and
                autonomous agents, we turn raw data into dominant market leverage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-none overflow-hidden transition-all hover:bg-purple-600"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Deploy AI
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS COUNTER (Client Component) ─────────────────────────────── */}
      <StatsCounter />

      {/* ── FULL-WIDTH IMAGE BREAKER ──────────────────────────────────────── */}
      <section
        className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract visualization of neural networks and ML model engineering architecture"
          className="object-cover w-full h-full opacity-50 filter grayscale hover:scale-105 transition-transform duration-[20s] ease-out"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
      </section>

      {/* ── 2. SERVICES GRID ─────────────────────────────────────────────── */}
      <section
        id="services"
        className="pt-16 pb-32 bg-gray-50 relative"
        aria-label="ML Model Engineering Services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              What <br /> We Build.
            </h2>
            <div className="text-right mt-8 md:mt-0 max-w-sm">
              <p className="text-gray-500 font-medium">
                Bespoke{" "}
                <strong className="text-gray-900">ML model engineering services</strong>{" "}
                and{" "}
                <strong className="text-gray-900">machine learning engineering services</strong>{" "}
                bridging the gap between theoretical data science and live production.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {SERVICES.map((service, index) => (
              <div
                key={service.num}
                className={`relative group ${index % 2 !== 0 ? "md:mt-24" : ""}`}
              >
                <div className="text-7xl font-black text-gray-200 absolute -top-12 -left-6 z-0 transition-colors group-hover:text-purple-100 select-none">
                  {service.num}
                </div>
                <div className="relative z-10 border-l border-gray-300 pl-6 group-hover:border-purple-600 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BENTO / ABOUT ─────────────────────────────────────────────── */}
      <section className="py-32 bg-white" aria-label="About Bridge Homies AI ML Engineering">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-8 bg-gray-900 text-white p-12 md:p-16 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-6">
                  The Data Standard
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                  Not just another <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                    machine learning agency
                  </span>
                  .
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-12">
                  Many can run a Python script; few can deploy it securely at
                  scale. As premier{" "}
                  <strong className="text-white">ML engineering services</strong>{" "}
                  and{" "}
                  <strong className="text-white">AI ML engineering service providers</strong>,
                  we ensure your models are free of hallucination, built on
                  secure architecture, and actively drive{" "}
                  <strong className="text-white">AI automation</strong> that
                  impacts your bottom line. Our{" "}
                  <strong className="text-white">engineering services for AI and ML integration</strong>{" "}
                  mean you're not bolting on intelligence — you're building it in.
                </p>
              </div>
              <Link
                href="/about"
                className="relative z-10 inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors w-fit"
              >
                Meet the Experts{" "}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gray-100 flex-1 relative overflow-hidden group min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop"
                  alt="Enterprise data integrity and AI ML engineering security"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gray-900/40" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                    Data Integrity
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Strict adherence to enterprise data security compliance.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <WorkSection />

      {/* ── 4. FAQ ───────────────────────────────────────────────────────── */}
      <section
        className="py-32 bg-gray-50"
        aria-label="Frequently Asked Questions — ML Model Engineering Services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            <div className="lg:col-span-5 sticky top-32 self-start">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">
                  Inquiries
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-8">
                Clear <br /> Context.
              </h2>
              <p className="text-gray-500 font-medium max-w-sm mb-12">
                Understanding the mechanics of our{" "}
                <strong className="text-gray-900">ML engineering services</strong> and{" "}
                <strong className="text-gray-900">AI pipeline engineering</strong> for
                enterprise architecture.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <div className="border-t-2 border-gray-900">
                {FAQS.map((faq, i) => (
                  <div key={i} className="py-10 border-b border-gray-200 group">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight group-hover:text-purple-600 transition-colors duration-300">
                      {faq.q}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          KEYWORD TAG STRIP — LSI / topical cluster signals
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="ML model engineering services keywords" className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase text-center mb-8">
            What We Do
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {KEYWORD_TAGS.map((kw, i) => (
              <span
                key={i}
                className="text-xs font-bold tracking-[0.12em] uppercase px-3 py-2 border border-gray-200 text-gray-500 hover:border-purple-600 hover:text-purple-600 transition-colors cursor-default"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. INTERNAL LINKS + EXTERNAL CITATION ────────────────────────── */}
      <section
        className="py-24 bg-white border-y border-gray-200/60"
        aria-label="Related Engineering Services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">
            Discover Core Engineering
          </h2>

          <nav aria-label="Internal service links">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
              {INTERNAL_LINKS.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="group flex items-center space-x-2 text-xl font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-600 text-2xl leading-none">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="pt-8 border-t border-gray-100 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">
              Our{" "}
              <strong className="text-gray-600">ml engineering services</strong>{" "}
              strictly adhere to{" "}
              <a
                href="https://developers.google.com/machine-learning/guides/rules-of-ml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 border-b border-gray-900 pb-0.5 hover:text-purple-600 hover:border-purple-600 transition-all duration-300"
              >
                Google&apos;s Rules of Machine Learning
              </a>{" "}
              to build reliable systems.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}