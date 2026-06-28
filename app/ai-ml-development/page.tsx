// app/ai-ml-development/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkSection from "@/components/home/work-section";
import StatsCounter from "@/components/StatsCounter";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "ML Engineering Services | RAG Pipelines, LLM Integration & MLOps | Bridge Homies",

  description:
    "Bridge Homies provides ML engineering services including RAG pipeline development, LLM integration, MLOps, AI automation, vector databases, custom AI applications and enterprise AI solutions.",

  alternates: {
    canonical: "https://www.bridgehomies.com/ai-ml-development",
  },

  openGraph: {
    title: "ML Engineering Services | RAG Pipelines & Enterprise AI",
    description:
      "Custom ML engineering, RAG systems, LLM integration and MLOps for startups and enterprises.",
    url: "https://www.bridgehomies.com/ai-ml-development",
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-ai-ml.jpg",
        width: 1200,
        height: 630,
        alt: "ML Engineering Services Bridge Homies",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ML Engineering Services | Bridge Homies",
    description:
      "Enterprise ML engineering, LLM integration and RAG pipeline development.",
    images: ["/og-ai-ml.jpg"],
  },

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
};

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.bridgehomies.com/ai-ml-development/#webpage",
      url: "https://www.bridgehomies.com/ai-ml-development",
      name: "ML Engineering Services | RAG Pipelines, LLM Integration & MLOps | Bridge Homies",
      description:
        "Bridge Homies delivers RAG pipeline development services, LLM integration services, AI automation for business, and MLOps services production-ready ML engineering for enterprises worldwide.",
      inLanguage: "en-US",
      dateModified: "2026-06-28",
      isPartOf: { "@id": "https://www.bridgehomies.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.bridgehomies.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "ML Engineering Services",
            item: "https://www.bridgehomies.com/ai-ml-development",
          },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.bridgehomies.com/#organization",
      name: "Bridge Homies",
      url: "https://www.bridgehomies.com",
      foundingDate: "2025",
      description:
        "Bridge Homies is a software development and AI/ML engineering agency based in Lahore, Pakistan, delivering RAG pipeline development services, LLM integration services, AI automation for business, and MLOps services to enterprise clients worldwide.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      sameAs: [
        "https://www.linkedin.com/company/bridge-homies",
        "https://github.com/bridgehomies",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.bridgehomies.com/ai-ml-development/#service",
      name: "ML Engineering Services",
      // ponytail: trimmed from 15 → 5 genuine alternates
      alternateName: [
        "Machine Learning Engineering Services",
        "RAG Pipeline Development Services",
        "LLM Integration Services",
        "MLOps Services",
        "AI Automation for Business",
      ],
      provider: { "@id": "https://www.bridgehomies.com/#organization" },
      url: "https://www.bridgehomies.com/ai-ml-development",
      description:
        "Production-ready ML engineering services including RAG pipeline development, LLM integration, AI automation for business, MLOps, computer vision, NLP, and scalable AI pipeline engineering.",
      serviceType: "AI & Machine Learning Engineering",
      areaServed: [
        { "@type": "Country", name: "Pakistan" },
        { "@type": "City", name: "Lahore" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ML Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "RAG Pipeline Development Services",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "LLM Integration Services" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "AI Automation for Business" },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "ML Model Architecture & Custom Model Engineering",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "MLOps Services & Machine Learning Model Deployment",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Computer Vision & NLP" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "AI Pipeline Engineering" },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Machine Learning Engineering Services",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.bridgehomies.com/ai-ml-development/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes your AI ML engineering services different from standard dev shops?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We don't just wrap ChatGPT APIs. We build secure RAG pipeline development services, fine-tune open-source models, and set up robust MLOps services to ensure your data stays proprietary and your inferences run fast. As a dedicated AI ML development company, we focus on production-ready ML engineering services not prototypes.",
          },
        },
        {
          "@type": "Question",
          name: "What do your RAG pipeline development services include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our RAG pipeline development services go beyond simple vector search. We build context-aware retrieval systems with hybrid search, re-ranking, query decomposition, and guardrails integrated directly into your existing tech stack. Every pipeline is production-ready with observability and failover built in.",
          },
        },
        {
          "@type": "Question",
          name: "What does LLM integration services mean in practice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our LLM integration services connect large language models whether hosted (OpenAI, Anthropic, Gemini) or open-source (Llama, Mistral) into your existing applications, APIs, and databases. We handle prompt engineering, context management, rate limiting, cost control, and fallback logic so you ship a stable product, not an experiment.",
          },
        },
        {
          "@type": "Question",
          name: "How does AI automation for business actually work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI automation for business replaces rule-based workflows with intelligent agents that can handle dynamic, context-dependent tasks like processing unstructured documents, routing customer support tickets, extracting data from invoices, and making real-time inventory decisions. We design, build, and deploy these systems end-to-end, including the monitoring layer to catch drift before it costs you.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer engineering services for AI and ML integration into existing systems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes this is one of our core specialties. Our engineering services for AI and ML integration cover connecting ML inference layers to existing databases, APIs, ERP systems, and SaaS platforms without requiring a full rebuild. We design integration architectures that are modular, observable, and production-ready from day one.",
          },
        },
        {
          "@type": "Question",
          name: "What MLOps services do you provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our MLOps services cover the full post-training lifecycle: feature stores, model registries, CI/CD pipelines for ML, A/B deployment, performance monitoring, and automated retraining triggers. We set up infrastructure so your models don't just deploy once they stay accurate, observable, and cost-efficient over time.",
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
        {
          "@type": "Question",
          name: "What are ML engineering services and what do they include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Machine learning engineering services cover the full technical lifecycle of an ML system: data pipeline design, model architecture selection, training infrastructure, inference optimization, deployment, and ongoing monitoring. AI/ML engineering services from Bridge Homies are production-ready from day one not research prototypes. We handle everything from initial architecture to post-deployment MLOps so your models deliver measurable business value.",
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
    title: "RAG Pipeline Development Services",
    desc: "Production-ready RAG pipeline development services that go beyond simple vector search. We build context-aware retrieval systems with hybrid search, re-ranking, and guardrails integrated directly into your existing tech stack.",
  },
  {
    num: "02",
    title: "LLM Integration Services",
    desc: "Our LLM integration services connect large language models hosted or open-source into your existing applications, APIs, and databases. We handle prompt engineering, context management, rate limiting, cost control, and fallback logic so your product ships stable, not experimental.",
  },
  {
    num: "03",
    title: "AI Automation for Business",
    desc: "Replace mundane workflows with intelligent agents built for real business operations. We deploy AI automation for business that handles document processing, data categorization, and multi-step logic autonomously saving thousands of manual labor hours across your enterprise.",
  },
  {
    num: "04",
    title: "Computer Vision & NLP",
    desc: "Advanced neural networks designed to parse, understand, and extract actionable metadata from raw images, video streams, and unstructured text.",
  },
  {
    num: "05",
    title: "MLOps Services & Model Deployment",
    desc: "End-to-end MLOps services covering data ingestion, feature stores, model serving, CI/CD for ML, and performance monitoring. Machine learning model deployment that stays reliable at scale with automated retraining and observability built in.",
  },
  {
    num: "06",
    title: "AI & ML Integration into Existing Systems",
    desc: "Our engineering services for AI and ML integration connect inference layers to your existing databases, APIs, ERP systems, and SaaS platforms no full rebuild required. Modular, observable, and production-ready from day one.",
  },
];

const FAQS = [
  {
    q: "What makes your AI ML engineering services different from standard dev shops?",
    a: "We don't just wrap ChatGPT APIs. We build secure RAG pipeline development services, fine-tune open-source models, and set up robust MLOps services to ensure your data stays proprietary and your inferences run fast. As a dedicated AI ML development company, we focus on production-ready ML engineering services not prototypes.",
  },
  {
    q: "What do your RAG pipeline development services include?",
    a: "Our RAG pipeline development services go beyond simple vector search. We build context-aware retrieval systems with hybrid search, re-ranking, query decomposition, and guardrails integrated directly into your existing tech stack. Every pipeline is production-ready with observability and failover built in.",
  },
  {
    q: "What does LLM integration services mean in practice?",
    a: "Our LLM integration services connect large language models whether hosted (OpenAI, Anthropic, Gemini) or open-source (Llama, Mistral) into your existing applications, APIs, and databases. We handle prompt engineering, context management, rate limiting, cost control, and fallback logic so you ship a stable product, not an experiment.",
  },
  {
    q: "How does AI automation for business actually work?",
    a: "AI automation for business replaces rule-based workflows with intelligent agents that handle dynamic, context-dependent tasks like processing unstructured documents, routing customer support tickets, extracting invoice data, and making real-time inventory decisions. We build and deploy these systems end-to-end, including the monitoring layer to catch drift before it costs you.",
  },
  {
    q: "What MLOps services do you provide?",
    a: "Our MLOps services cover the full post-training lifecycle: feature stores, model registries, CI/CD pipelines for ML, A/B deployment, performance monitoring, and automated retraining triggers. Your models don't just deploy once they stay accurate, observable, and cost-efficient over time.",
  },
  {
    q: "What industries do you build machine learning models for?",
    a: "Our core expertise spans Fintech, Healthcare, Logistics, and SaaS. Whether it is algorithmic trading models, patient data analysis, or supply chain route optimization, our engineering principles remain universally robust.",
  },
  {
    q: "What are ML engineering services and how are they different from data science?",
    a: "Machine learning engineering services focus on building and operating systems that run ML models reliably in production. Data science is primarily concerned with experimentation, analysis, and model research. ML engineering is what happens after the experiment succeeds turning a notebook into a scalable, observable, maintainable production system. Our AI/ML engineering services are production-ready from day one not research prototypes. We handle everything from initial architecture to post-deployment MLOps so your models deliver measurable business value.",
  },
];

const INTERNAL_LINKS = [
  { label: "Enterprise Software", link: "/software" },
  { label: "React & Next.js", link: "/webdev" },
  { label: "Native Mobile", link: "/mobile" },
  { label: "FBR ERP Suite", link: "/products" },
];

// ponytail: trimmed keyword tags from 37 → 8 most specific; strip had no content value
const KEYWORD_TAGS = [
  "RAG Pipeline Development",
  "LLM Integration Services",
  "ML Engineering Services",
  "MLOps Services",
  "AI Automation for Business",
  "Machine Learning Model Deployment",
  "AI Pipeline Engineering",
  "Custom ML Model Engineering",
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
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">
                  RAG Pipelines · LLM Integration · MLOps Services
                </span>
              </div>

              {/* H1 aligned to title tag "ML Engineering Services" leads */}
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900 uppercase">
                ML Engineering{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500">
                  Services.
                </span>
              </h1>

              <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-500 tracking-tight">
                RAG pipeline development, LLM integration, AI automation for
                business, and MLOps production-ready, end to end.
              </h2>
            </div>

            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                We deliver{" "}
                <strong className="text-gray-900">RAG pipeline development services</strong>{" "}
                and{" "}
                <strong className="text-gray-900">LLM integration services</strong> for
                companies that need results, not experiments. From{" "}
                <strong className="text-gray-900">AI automation for business</strong> to
                full{" "}
                <strong className="text-gray-900">MLOps services</strong> and engineering
                for AI integration into your existing systems we turn raw data into
                dominant market leverage.
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

      {/* ── STATS COUNTER ─────────────────────────────────────────────────── */}
      <StatsCounter />

      {/* ── FULL-WIDTH IMAGE BREAKER ──────────────────────────────────────── */}
      <section
        className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract visualization of RAG pipelines and LLM integration architecture"
          className="object-cover w-full h-full opacity-50 filter grayscale hover:scale-105 transition-transform duration-[20s] ease-out"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
      </section>

      {/* ── DEFINITIONAL BLOCK ────────────────────────────────────────────── */}
      <section
        className="py-20 bg-white border-b border-gray-100"
        aria-label="What are engineering services for AI and ML integration"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">
                  What We Do
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-gray-900">
                Engineering Services for AI and ML Integration
              </h2>
            </div>

            <div className="lg:col-span-8 lg:pt-16">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Engineering services for AI and ML integration connect machine
                learning inference layers to existing applications, databases, ERP
                systems, and APIs without requiring a full platform rebuild. These
                services cover architecture design, model deployment, API integration,
                and ongoing MLOps support to keep models accurate and cost-efficient in
                production.
              </p>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                Our{" "}
                <strong className="text-gray-900">
                  machine learning engineering services
                </strong>{" "}
                span the full ML lifecycle: from selecting the right model architecture
                and building training pipelines, to deploying inference endpoints and
                monitoring production performance. Whether you need{" "}
                <strong className="text-gray-900">AI/ML engineering services</strong>{" "}
                for a greenfield product or to extend a legacy system, we deliver
                production-ready systems not research prototypes.
              </p>

              <div
                className="border-l-4 border-purple-600 pl-6 py-2"
                aria-label="ML engineering services definition"
              >
                <p className="text-sm text-gray-500 leading-relaxed">
                  <strong className="text-gray-900 text-base">
                    ML engineering services
                  </strong>{" "}
                  encompass data pipeline design, model architecture selection, training
                  infrastructure, inference optimization, and post-deployment monitoring.
                  Bridge Homies delivers end-to-end{" "}
                  <strong className="text-gray-900">AI ML engineering services</strong>{" "}
                  with full observability, automated retraining pipelines, and rollback
                  strategies built in from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ML ENGINEERING SERVICES SECTION ──────────────────────────────── */}
      <section
        className="py-24 bg-gray-900 text-white"
        aria-label="ML Engineering Services full lifecycle"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-400" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-400">
                  ML Engineering Services
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white mb-8">
                ML Engineering{" "}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                  Services.
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Our{" "}
                <strong className="text-white">
                  machine learning engineering services
                </strong>{" "}
                cover everything from initial architecture decisions through to
                production deployment and long-term model maintenance. Unlike generic
                dev shops, we treat ML as an engineering discipline with the same
                rigor, observability, and reliability standards you expect from any
                critical system.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Whether you call it{" "}
                <strong className="text-gray-300">AI ML engineering services</strong>,{" "}
                <strong className="text-gray-300">AI/ML engineering services</strong>,
                or simply{" "}
                <strong className="text-gray-300">ML engineering services</strong> the
                outcome is the same: models that perform reliably in production,
                integrated cleanly into your existing stack, with clear observability
                into their behaviour over time.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Model Architecture Design",
                    desc: "We select and design ML architectures appropriate to your data, compute budget, and latency requirements avoiding over-engineering from the start.",
                  },
                  {
                    title: "Training Infrastructure",
                    desc: "Reproducible, versioned training pipelines with experiment tracking, hyperparameter management, and compute optimisation built in.",
                  },
                  {
                    title: "Inference Optimisation",
                    desc: "Model quantization, batching strategies, and serving infrastructure tuned for your throughput and cost targets not just benchmark scores.",
                  },
                  {
                    title: "Production Deployment",
                    desc: "Blue-green and canary deployments, rollback strategies, and health monitoring so every release is a controlled, low-risk event.",
                  },
                  {
                    title: "Post-Deployment Monitoring",
                    desc: "Data drift detection, performance degradation alerts, and automated retraining triggers to maintain model quality over time.",
                  },
                  {
                    title: "Legacy System Integration",
                    desc: "We wire ML capabilities directly into your existing ERP, CRM, or API layer no full rebuild, no downtime, no disruption.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border border-white/10 p-6 hover:border-purple-500/40 transition-colors duration-300"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────────────── */}
      <section
        id="services"
        className="pt-16 pb-32 bg-gray-50 relative"
        aria-label="RAG Pipeline Development Services & LLM Integration Services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              What <br /> We Build.
            </h2>
            <div className="text-right mt-8 md:mt-0 max-w-sm">
              <p className="text-gray-500 font-medium">
                Bespoke{" "}
                <strong className="text-gray-900">RAG pipeline development services</strong>
                ,{" "}
                <strong className="text-gray-900">LLM integration services</strong>,{" "}
                <strong className="text-gray-900">AI automation for business</strong>, and{" "}
                <strong className="text-gray-900">MLOps services</strong>. Production-ready
                from day one.
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

      {/* ── COMMON QUESTIONS ──────────────────────────────────────────────── */}
      <section
        className="py-32 bg-white border-t border-gray-100"
        aria-label="Common questions about our ML engineering services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="h-px w-8 bg-purple-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">
                ML Engineering FAQ
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-8">
              Common Questions <br /> About Our ML <br /> Engineering Services.
            </h2>

            <p className="max-w-3xl text-lg text-gray-500 leading-relaxed">
              Answers to the most common questions about{" "}
              <strong className="text-gray-900">RAG pipeline development services</strong>,{" "}
              <strong className="text-gray-900">LLM integration services</strong>,{" "}
              <strong className="text-gray-900">AI automation for business</strong>,{" "}
              <strong className="text-gray-900">MLOps services</strong>, and{" "}
              <strong className="text-gray-900">machine learning engineering services</strong>.
            </p>
          </div>

          <div className="space-y-16">
            <div className="border-t-2 border-gray-900 pt-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                What is the difference between RAG and fine-tuning a model?
              </h3>
              <div className="max-w-4xl space-y-4 text-gray-600 leading-relaxed">
                <p>
                  RAG (Retrieval-Augmented Generation) and fine-tuning solve different
                  problems. A RAG pipeline allows an AI model to retrieve information
                  from your company's documents, databases, or knowledge base before
                  generating a response, allowing the system to use current information
                  without retraining.
                </p>
                <p>
                  Fine-tuning modifies the model itself by training it on additional
                  examples to improve behavior, formatting, classification, or
                  domain-specific reasoning. It changes how the model responds rather
                  than what information it can access.
                </p>
                <p>
                  In most enterprise environments, RAG pipeline development services are
                  the preferred starting point because knowledge can be updated instantly
                  without retraining costs. Many mature AI systems eventually combine
                  both approaches to achieve maximum performance.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                How long does a typical ML project take from kickoff to deployment?
              </h3>
              <div className="max-w-4xl space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The timeline depends on project complexity, data availability, and
                  integration requirements. Smaller AI automation projects can often be
                  launched within 4 to 8 weeks, while enterprise-grade machine learning
                  systems may require 3 to 6 months.
                </p>
                <p>
                  Our process typically includes discovery, data assessment, architecture
                  design, model development, testing, deployment, and monitoring setup.
                  Each phase is designed to reduce risk while maintaining delivery speed.
                </p>
                <p>
                  Projects involving LLM integration services and RAG pipelines often
                  move faster because they can leverage proven foundation models rather
                  than requiring extensive custom model training from scratch.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                Do you work with companies outside Pakistan?
              </h3>
              <div className="max-w-4xl space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Yes. We work with startups, SMEs, and enterprise organizations
                  worldwide. Our development process is built around remote
                  collaboration, structured communication, and transparent project
                  management.
                </p>
                <p>
                  We provide regular progress updates, technical documentation, milestone
                  reviews, and direct communication throughout the project lifecycle.
                  Time zone differences are managed through planned workflows and
                  overlapping collaboration windows.
                </p>
                <p>
                  Whether the engagement involves AI automation for business, machine
                  learning engineering services, or long-term MLOps support, our
                  delivery process is designed to support international clients
                  efficiently.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                What does "production-ready" mean for an ML model?
              </h3>
              <div className="max-w-4xl space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A production-ready ML model is more than a model that performs well
                  during testing. It includes deployment infrastructure, monitoring,
                  security controls, scalability planning, version management, and
                  failure recovery mechanisms.
                </p>
                <p>
                  The model must continue delivering reliable performance after launch as
                  real-world data, traffic, and business requirements evolve. Accuracy
                  alone is not enough for enterprise deployment.
                </p>
                <p>
                  Our MLOps services include observability, automated deployment
                  pipelines, model monitoring, rollback strategies, and performance
                  tracking to ensure long-term stability and business value.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                Can you integrate AI into our existing software without rebuilding it?
              </h3>
              <div className="max-w-4xl space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In most cases, yes. Our engineering services for AI and ML integration
                  are specifically designed to work with existing applications, databases,
                  ERP systems, CRMs, APIs, and internal business platforms.
                </p>
                <p>
                  Rather than replacing your software, we typically create integration
                  layers that connect AI capabilities directly into your current
                  architecture. This significantly reduces implementation risk and
                  development costs.
                </p>
                <p>
                  Whether the project involves document processing, predictive analytics,
                  workflow automation, or LLM integration services, we focus on extending
                  existing systems instead of rebuilding them from scratch.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                What are ML engineering services and how are they different from data
                science?
              </h3>
              <div className="max-w-4xl space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Machine learning engineering services focus on building and operating
                  systems that run ML models reliably in production. Data science is
                  primarily concerned with experimentation, analysis, and model research.
                  ML engineering is what happens after the experiment succeeds turning
                  a notebook into a scalable, observable, maintainable production system.
                </p>
                <p>
                  Our{" "}
                  <strong className="text-gray-900">AI ML engineering services</strong>{" "}
                  include data pipeline engineering, feature store design, model serving
                  infrastructure, API development, CI/CD for ML, and performance
                  monitoring. These are the components that make a model usable in a
                  real product not just on a researcher's laptop.
                </p>
                <p>
                  Companies that engage{" "}
                  <strong className="text-gray-900">AI/ML engineering services</strong>{" "}
                  from a dedicated team like Bridge Homies get faster time-to-production,
                  lower operational risk, and systems that continue to improve
                  automatically as new data arrives rather than degrading silently
                  until someone notices.
                </p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 pt-10 pb-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                What industries have you built ML systems for?
              </h3>
              <div className="max-w-4xl space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Our experience spans SaaS, enterprise software, eCommerce, logistics,
                  automation platforms, finance, and document-intensive business
                  operations. We have worked on intelligent search systems, workflow
                  automation, recommendation engines, and AI-powered decision-support
                  tools.
                </p>
                <p>
                  We also build solutions involving RAG pipelines, intelligent document
                  processing, predictive analytics, custom machine learning models, and
                  large language model integrations for operational efficiency.
                </p>
                <p>
                  Regardless of industry, successful ML systems depend on strong data
                  foundations, scalable architecture, measurable business outcomes, and
                  ongoing monitoring. Those principles guide every project we deliver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENTO / ABOUT ─────────────────────────────────────────────────── */}
      <section
        className="py-32 bg-white"
        aria-label="About Bridge Homies ML Engineering Services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-gray-900 text-white p-12 md:p-16 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-6">
                  Why Bridge Homies
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                  Not just another <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                    machine learning agency
                  </span>
                  .
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-8">
                  Many can run a Python script; few can deploy it securely at scale. As
                  an{" "}
                  <strong className="text-white">AI ML development company</strong>{" "}
                  founded in Lahore in 2025, we deliver{" "}
                  <strong className="text-white">RAG pipeline development services</strong>
                  ,{" "}
                  <strong className="text-white">LLM integration services</strong>,{" "}
                  <strong className="text-white">AI automation for business</strong>,
                  complete{" "}
                  <strong className="text-white">MLOps services</strong>, and end-to-end{" "}
                  <strong className="text-white">
                    machine learning engineering services
                  </strong>{" "}
                  to enterprise clients worldwide. You're not bolting on intelligence
                  you're building it into the architecture from the start.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-12">
                  Led by engineers with hands-on experience in{" "}
                  <strong className="text-gray-300">ML model architecture</strong>,{" "}
                  <strong className="text-gray-300">RAG pipeline development</strong>,{" "}
                  <strong className="text-gray-300">LLM integration</strong>, and{" "}
                  <strong className="text-gray-300">
                    machine learning model deployment
                  </strong>{" "}
                  across Fintech, Healthcare, and SaaS verticals.
                </p>
              </div>
              <Link
                href="/aboutus"
                className="relative z-10 inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors w-fit"
              >
                Talk to ML Engineers{" "}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gray-100 flex-1 relative overflow-hidden group min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop"
                  alt="Enterprise data integrity for LLM integration and MLOps services"
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

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        className="py-32 bg-gray-50"
        aria-label="Frequently Asked Questions ML Engineering Services"
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
                Understanding our{" "}
                <strong className="text-gray-900">RAG pipeline development services</strong>
                ,{" "}
                <strong className="text-gray-900">LLM integration services</strong>,{" "}
                <strong className="text-gray-900">AI automation for business</strong>,{" "}
                <strong className="text-gray-900">MLOps services</strong>, and{" "}
                <strong className="text-gray-900">ML engineering services</strong>.
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

      {/* ── KEYWORD TAG STRIP (trimmed) ───────────────────────────────────── */}
      <section
        aria-label="ML engineering services core capabilities"
        className="py-16 bg-white border-y border-gray-100"
      >
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

      {/* ── INTERNAL LINKS + EXTERNAL CITATION ───────────────────────────── */}
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
              <strong className="text-gray-600">RAG pipeline development services</strong>{" "}
              and{" "}
              <strong className="text-gray-600">
                machine learning engineering services
              </strong>{" "}
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