import type { Metadata } from "next"
import HeroSection from "@/components/home/hero-section"
import ServicesSection from "@/components/home/services-section"
import WorkSection from "@/components/home/work-section"
import InteractiveChecklist from "@/components/home/interactive-checklist"
import InteractiveMap from "@/components/home/interactive-map"
import TeamSection from "@/components/home/team-section"
import ContactSection from "@/components/home/contact-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import StickyTransformSection from "@/components/home/sticky-transform-section"
import TestimonialsSection from "@/components/home/testimonials-section"

export const metadata: Metadata = {
  title: { absolute: "Software Development Agency | Bridge Homies" },
  description:
    "Lahore software engineering and AI company building custom business systems, SaaS, web and mobile apps, workflow automation, integrations, and ML products.",
  alternates: {
    canonical: "/", // resolves to https://www.bridgehomies.com via metadataBase
  },
  openGraph: {
    title: "Software Development Agency | Bridge Homies",
    description:
      "Custom software, SaaS, web and mobile apps, workflow automation, system integrations, and AI/ML engineering from Bridge Homies in Lahore, Pakistan.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies - AI ML Engineering Services, Machine Learning Agency & Software Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Agency | Bridge Homies",
    description:
      "Custom software, SaaS, web and mobile apps, workflow automation, system integrations, and AI/ML engineering from Bridge Homies in Lahore, Pakistan.",
    images: ["/og-image.png"],
  },
}

// ponytail: WebPage only — ProfessionalService/Organization live in layout.tsx, no duplication
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.bridgehomies.com/#webpage",
      url: "https://www.bridgehomies.com",
      name: "Software Development Agency | Bridge Homies",
      description:
        "Bridge Homies is a Lahore-based software engineering and AI company offering custom software, SaaS, web and mobile applications, workflow automation, system integrations, and AI/ML engineering.",
      isPartOf: { "@id": "https://www.bridgehomies.com/#website" },
      about: { "@id": "https://www.bridgehomies.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bridgehomies.com" },
        ],
      },
    },
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Toaster />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <section
          className="relative overflow-hidden border-y border-[#171717] bg-[#080808] px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
          aria-label="Bridge Homies overview"
        >
          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-purple-600/[0.07] blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[.25em] text-purple-400">
                  Bridge Homies / Lahore, Pakistan
                </p>
                <h2
                  className="max-w-xl text-[clamp(42px,6vw,76px)] leading-[.88] tracking-wide text-white"
                  style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                >
                  Software for <span className="text-purple-500">what&apos;s next.</span>
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-[#777]">
                  We turn business workflows and product ideas into dependable software, from the first technical plan through launch and ongoing support.
                </p>
              </div>

              <div className="grid gap-0 sm:grid-cols-2 sm:gap-x-8">
                <div className="border-t border-[#222] py-5 sm:col-span-2">
                  <p className="font-mono text-[10px] uppercase tracking-[.2em] text-purple-400/80">01 / What we build</p>
                  <p className="mt-3 text-sm leading-7 text-[#999]">
                    Custom business systems, SaaS products, web and mobile applications, AI/ML and RAG systems, workflow automation, APIs, and integrations for teams in Lahore and internationally.
                  </p>
                </div>
                <div className="border-t border-[#222] py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[.2em] text-purple-400/80">02 / How we help</p>
                  <p className="mt-3 text-sm leading-7 text-[#777]">
                    Product discovery, MVP planning, architecture, development, deployment, and maintenance, shaped around your requirements.
                  </p>
                </div>
                <div className="border-t border-[#222] py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[.2em] text-purple-400/80">03 / Explore</p>
                  <p className="mt-3 text-sm leading-7 text-[#777]">
                    <a className="text-[#bbb] transition-colors hover:text-purple-400" href="/software">Custom software</a>,{" "}
                    <a className="text-[#bbb] transition-colors hover:text-purple-400" href="/webdev">web</a>,{" "}
                    <a className="text-[#bbb] transition-colors hover:text-purple-400" href="/mobile">mobile</a>,{" "}
                    <a className="text-[#bbb] transition-colors hover:text-purple-400" href="/ai-ml-development">AI/ML</a>,{" "}
                    <a className="text-[#bbb] transition-colors hover:text-purple-400" href="/mlops-consulting-services">MLOps</a>, and{" "}
                    <a className="text-[#bbb] transition-colors hover:text-purple-400" href="/ui-ux-design">product design</a>.
                  </p>
                </div>
                <div className="border-t border-[#222] py-5 sm:col-span-2">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[.12em]">
                    <a className="text-[#666] transition-colors hover:text-purple-400" href="/products">Products ↗</a>
                    <a className="text-[#666] transition-colors hover:text-purple-400" href="/case-studies/aierpify">Case studies ↗</a>
                    <a className="text-[#666] transition-colors hover:text-purple-400" href="/contact">Start a project ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <StickyTransformSection />
        <TestimonialsSection />
        <InteractiveChecklist />
        <InteractiveMap />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
