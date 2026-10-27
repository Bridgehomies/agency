// app/ai-ml-development/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkSection from "@/components/home/work-section";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: { absolute: "ML Model Engineering Services | Bridge Homies" },

  description:
    "Need ML model engineering for your product? Bridge Homies scopes model, RAG, LLM, and AI integration work around your data, systems, and production needs.",

  alternates: {
    canonical: "https://www.bridgehomies.com/ai-ml-development",
  },

  openGraph: {
    title: "ML Model Engineering Services | Bridge Homies",
    description:
      "ML model engineering, RAG pipelines, LLM integration, and AI integration scoped around your product and systems.",
    url: "https://www.bridgehomies.com/ai-ml-development",
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ML Model Engineering Services Bridge Homies",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ML Model Engineering Services | Bridge Homies",
    description:
      "ML model engineering, RAG pipelines, LLM integration, and AI integration scoped around your product and systems.",
    images: ["/og-image.png"],
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
      name: "ML Model Engineering Services | Bridge Homies",
      description:
        "Bridge Homies is a software agency in Lahore, Pakistan, offering AI/ML engineering, RAG pipeline development, LLM integration, and MLOps services.",
      inLanguage: "en-US",
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
            name: "ML Model Engineering Services",
            item: "https://www.bridgehomies.com/ai-ml-development",
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.bridgehomies.com/ai-ml-development/#service",
      name: "ML Model Engineering Services",
      alternateName: [
        "AI/ML Engineering Services",
        "RAG Pipeline Development",
        "LLM Integration",
        "MLOps Services",
        "AI Automation for Business",
      ],
      provider: { "@id": "https://www.bridgehomies.com/#organization" },
      url: "https://www.bridgehomies.com/ai-ml-development",
      description:
        "AI/ML engineering services covering model architecture, RAG pipelines, LLM integration, software integration, and MLOps.",
      serviceType: "AI & Machine Learning Engineering",
      areaServed: [
        { "@type": "Country", name: "Pakistan" },
        { "@type": "City", name: "Lahore" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ML Model Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "ML Model Architecture & Custom Model Engineering" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "RAG Pipeline Development Services" },
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
            itemOffered: { "@type": "Service", name: "MLOps Services & Machine Learning Model Deployment" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Computer Vision & NLP" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "AI Pipeline Engineering" },
          },
        ],
      },
    },
  ],
};

// ─── Static data ─────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "ML Model Architecture & Engineering",
    desc: "We assess the use case, available data, latency needs, and budget before recommending a model architecture, training approach, and evaluation plan.",
  },
  {
    num: "02",
    title: "RAG Pipeline Development Services",
    desc: "We design retrieval pipelines around your data and application, which may include hybrid search, reranking, access controls, and evaluation depending on the use case.",
  },
  {
    num: "03",
    title: "LLM Integration Services",
    desc: "We connect hosted or open-source language models with existing applications and APIs, with scope for prompts, context management, rate limits, cost controls, and fallback behavior.",
  },
  {
    num: "04",
    title: "AI Automation for Business",
    desc: "We assess workflows such as document processing and data categorization to determine where automation can help, then design the required integrations and human review points.",
  },
  {
    num: "05",
    title: "MLOps Services & Model Deployment",
    desc: "We help teams plan and implement model versioning, deployment pipelines, monitoring, rollback procedures, and retraining workflows where they fit the system.",
  },
  {
    num: "06",
    title: "AI & ML Integration into Existing Systems",
    desc: "We assess how an AI or ML component can fit into existing applications, databases, ERP systems, or APIs, and define an integration approach that matches the current architecture.",
  },
];

const FAQS = [
  {
    q: "What are ML model engineering services?",
    a: "ML model engineering covers the work needed to evaluate, build, integrate, and operate a model in a software product. Depending on the use case, this can include data pipelines, model selection or training, evaluation, deployment, and monitoring.",
  },
  {
    q: "Can you integrate AI into our existing software?",
    a: "Often, AI capabilities can be added through APIs or integration services, but feasibility depends on your architecture, data access, security requirements, and vendor constraints. We review those factors before recommending an approach.",
  },
  {
    q: "What does RAG pipeline development include?",
    a: "A RAG project may include document ingestion, retrieval, access controls, answer generation, and evaluation. The components depend on the content sources, user permissions, and quality requirements for your product.",
  },
  {
    q: "What MLOps work can you help with?",
    a: "MLOps scope can include model and data versioning, deployment workflows, monitoring, rollback planning, and retraining criteria. We define the operating process to fit the team's infrastructure and ownership model.",
  },
  {
    q: "How long does an AI/ML project take?",
    a: "Timing depends on the use case, data readiness, integrations, evaluation needs, and deployment environment. After an initial assessment, we can propose phases and a delivery estimate for the agreed scope.",
  },
];

const INTERNAL_LINKS = [
  { label: "Enterprise Software", link: "/software" },
  { label: "React & Next.js", link: "/webdev" },
  { label: "Native Mobile", link: "/mobile" },
  { label: "FBR ERP Suite", link: "/products" },
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
                  ML Model Engineering · RAG · LLM Integration · MLOps
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900 uppercase">
                ML Model Engineering{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500">
                  Services.
                </span>
              </h1>

              <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-500 tracking-tight">
                AI/ML engineering for product teams building models, RAG
                applications, LLM integrations, and production workflows.
              </h2>
            </div>

            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                We help product and engineering teams scope and build ML model
                features, RAG pipelines, LLM integrations, and the software
                needed to operate them. The approach depends on your use case,
                data, existing systems, and deployment requirements.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/#contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-none overflow-hidden transition-all hover:bg-purple-600"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Discuss Your Project
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

      {/* ── FULL-WIDTH IMAGE BREAKER ──────────────────────────────────────── */}
      <section
        className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract visualization of ML model engineering and RAG pipeline architecture"
          className="object-cover w-full h-full opacity-50 filter grayscale hover:scale-105 transition-transform duration-[20s] ease-out"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
      </section>

      {/* ── ML MODEL ENGINEERING SERVICES SECTION ─────────────────────────── */}
      <section
        className="py-24 bg-gray-900 text-white"
        aria-label="ML Model Engineering Services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-400" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-400">
                  ML Model Engineering Services
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white mb-8">
                ML Model{" "}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                  Engineering Services.
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Our{" "}
                <strong className="text-white">ML model engineering services</strong>{" "}
                cover architecture, data and training pipelines, evaluation,
                deployment, and maintenance planning. We scope each engagement
                around the model's role, available data, latency needs, and
                operating constraints.
              </p>
              <p className="text-gray-500 leading-relaxed">
                For teams evaluating{" "}
                <strong className="text-gray-300">
                  AI/ML engineering service providers
                </strong>, Bridge Homies can support model engineering and
                integration work from initial assessment through implementation
                and handover. The scope and operating model are agreed for each
                project.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Model Architecture Design",
                    desc: "We compare suitable model approaches against your data, compute budget, latency requirements, and maintenance capacity.",
                  },
                  {
                    title: "Training Infrastructure",
                    desc: "Where custom training is needed, we can plan reproducible pipelines, experiment tracking, and resource management around the project requirements.",
                  },
                  {
                    title: "Inference Optimisation",
                    desc: "We can assess options such as quantization, batching, and serving infrastructure against measured latency, throughput, and cost needs.",
                  },
                  {
                    title: "Production Deployment",
                    desc: "Deployment options can include staged releases, rollback procedures, and health checks, depending on the existing platform.",
                  },
                  {
                    title: "Post-Deployment Monitoring",
                    desc: "Monitoring can track input changes and model quality; retraining triggers should be based on evaluation criteria agreed for the use case.",
                  },
                  {
                    title: "Legacy System Integration",
                    desc: "We assess integration with existing ERP, CRM, and API layers, including dependencies and rollout constraints.",
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

      {/* ── AI/ML INTEGRATION ──────────────────────────────────────────────── */}
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
                Engineering services for AI and ML integration connect model
                capabilities to existing applications, databases, ERP systems, and
                APIs. The right approach depends on the current architecture, data
                access, security requirements, and deployment constraints.
              </p>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                As an{" "}
                <strong className="text-gray-900">
                  AI/ML engineering service provider
                </strong>
                , we help assess model options, plan data and training pipelines,
                integrate inference into software, and define monitoring and release
                requirements for the environment.
              </p>

              <div
                className="border-l-4 border-purple-600 pl-6 py-2"
                aria-label="ML model engineering services definition"
              >
                <p className="text-sm text-gray-500 leading-relaxed">
                  <strong className="text-gray-900 text-base">
                    ML model engineering services
                  </strong>{" "}
                  can include data pipeline design, model selection, training,
                  inference, deployment, and monitoring. Project scope is based on
                  the team's goals, data, and operating environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────────────── */}
      <section
        id="services"
        className="pt-16 pb-32 bg-gray-50 relative"
        aria-label="ML Model Engineering, RAG Pipeline Development & LLM Integration Services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              What <br /> We Build.
            </h2>
            <div className="text-right mt-8 md:mt-0 max-w-sm">
              <p className="text-gray-500 font-medium">
                Bespoke <strong className="text-gray-900">ML model engineering</strong>,{" "}
                RAG pipelines, LLM integration, and MLOps scoped to your product
                and existing systems.
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

      {/* ── MLOPS CONSULTING ──────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-900 text-white relative overflow-hidden" aria-labelledby="mlops-consulting-heading">
        <div className="absolute -left-24 -bottom-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-3 mb-7">
                <div className="h-px w-8 bg-purple-400" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-300">Production Operations</span>
              </div>
              <h2 id="mlops-consulting-heading" className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-7">
                MLOps Consulting
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                MLOps consulting makes machine-learning systems repeatable and operable after launch. We help teams version data and models, build controlled release pipelines, monitor quality and cost, and define the rollback and ownership process before a model becomes business-critical.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 items-start">
                <Link href="/mlops-consulting-services" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-3 font-bold hover:bg-purple-300 transition-colors">
                  Explore MLOps consulting services <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/blog/what-is-mlops-consulting" className="inline-flex items-center gap-2 font-bold text-white border-b border-purple-300 pb-1 hover:text-purple-300 transition-colors sm:mt-3 lg:mt-0 xl:mt-3">
                  Read the practical MLOps guide <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-gray-700 border border-gray-700">
              {[
                ["Release with control", "Connect code, data, configurations, and model versions to a testable release process with approval and rollback conditions."],
                ["Monitor what matters", "Track service reliability alongside latency, spend, input changes, and the quality signals that affect the actual business workflow."],
                ["Keep AI systems governable", "Make access, audit records, retention, incident response, and the owner for model changes explicit from the start."],
                ["Test RAG as a system", "For retrieval products, evaluate retrieval quality, citations, document-level access filters, and prompt-injection resistance—not just whether the answer sounds convincing."],
              ].map(([title, description]) => (
                <article key={title} className="bg-gray-900 p-7 md:p-9 min-h-52 hover:bg-gray-800 transition-colors">
                  <h3 className="text-xl font-bold mb-4">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENTO / ABOUT ─────────────────────────────────────────────────── */}
      <section
        className="py-32 bg-white"
        aria-label="About Bridge Homies AI/ML Engineering Service Provider"
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
                  Engineering software <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                    with AI and ML
                  </span>
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-8">
                  Bridge Homies is a software agency based in Lahore, Pakistan.
                  We work with product teams on ML model engineering, RAG
                  pipelines, LLM integration, AI automation, and MLOps, with the
                  scope shaped around their existing software and operating needs.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-12">
                  Selected work includes Emotion Detect, an English text
                  classification project using ML and NLP, and Onyx Fintech, an
                  AI loan matchmaking platform. The portfolio describes their
                  functionality and technology; it does not publish performance
                  results.
                </p>
              </div>
              <a
                href="/#contact"
                className="relative z-10 inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors w-fit"
              >
                Discuss Your Project{" "}
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
              </a>
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
                    Data access, retention, and security requirements should be
                    defined for each system and deployment environment.
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
        aria-label="Frequently Asked Questions ML Model Engineering Services"
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
                Understanding our ML model engineering, RAG pipelines, LLM
                integration, AI automation, and MLOps services.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold text-sm uppercase tracking-wide hover:bg-purple-600 transition-colors"
              >
                    Discuss Your Project
                <svg
                  className="w-4 h-4"
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
              </a>
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

      {/* ── FINAL CTA (new — closes the loop toward a booked call) ────────── */}
      <section
        id="contact"
        className="py-24 bg-gray-900 text-white text-center"
        aria-label="Book a strategy call"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            Let's Engineer <br /> Your ML Model.
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Tell us what you're building, the systems and data involved, and
            the constraints you need to work within. We can discuss possible
            approaches and agree on a practical next step.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-black uppercase tracking-wide hover:bg-purple-500 hover:text-white transition-colors"
          >
            Discuss Your Project
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
              We use{" "}
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
