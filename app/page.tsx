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
    "Software development agency in Lahore building custom software, SaaS, web and mobile apps, and AI systems for businesses worldwide. Discuss your project.",
  alternates: {
    canonical: "/", // resolves to https://www.bridgehomies.com via metadataBase
  },
  openGraph: {
    title: "Software Development Agency | Bridge Homies",
    description:
      "Custom software, SaaS, web and mobile apps, and AI engineering from Bridge Homies in Lahore, Pakistan. Explore our work and discuss your project.",
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
      "Custom software, SaaS, web and mobile apps, and AI engineering from Bridge Homies in Lahore, Pakistan. Explore our work and discuss your project.",
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
        "Bridge Homies is a machine learning agency delivering AI ML engineering services, RAG pipelines, LLM integration, SaaS, and enterprise software.",
      isPartOf: { "@id": "https://www.bridgehomies.com/#website" },
      about: { "@id": "https://www.bridgehomies.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bridgehomies.com" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What AI ML engineering services does Bridge Homies offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bridge Homies offers end-to-end AI ML engineering services including RAG pipeline development, LLM integration, machine learning model deployment, predictive analytics, and AI automation for businesses of all sizes.",
          },
        },
        {
          "@type": "Question",
          name: "Is Bridge Homies a machine learning agency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Bridge Homies is a dedicated machine learning agency based in Lahore, Pakistan. We serve clients worldwide with AI ML engineering services, website development, SaaS, and enterprise software.",
          },
        },
        {
          "@type": "Question",
          name: "Does Bridge Homies build SaaS and web apps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We design and develop SaaS platforms, web apps, and enterprise software using Next.js, React, Django, and Python — with AI automation integrated at every layer.",
          },
        },
      ],
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
        <section className="container px-4 sm:px-6 py-16 space-y-5 text-muted-foreground leading-relaxed" aria-label="Bridge Homies overview">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">A software development agency for your next product</h2>
          <p>Bridge Homies is a software development company and machine learning agency based in Lahore, Pakistan, serving clients worldwide. We build production-ready AI and ML systems, RAG pipelines, LLM integrations, predictive analytics, workflow automation, websites, web applications, mobile apps, SaaS platforms, and enterprise software for founders and established businesses.</p>
          <h3 className="text-xl font-semibold text-foreground">From business workflow to working software</h3>
          <p>Work with Bridge Homies when you need to replace manual Excel, WhatsApp, or email workflows, launch a serious digital product, add AI to existing software, or turn a validated idea into a maintainable product. Our team works with Next.js, React, Python, FastAPI, Django, PostgreSQL, and modern cloud infrastructure.</p>
          <h3 className="text-xl font-semibold text-foreground">Explore our software development services</h3>
          <p>Read about <a href="/ai-ml-development">AI/ML engineering</a>, <a href="/webdev">website development</a>, <a href="/software">enterprise software</a>, <a href="/mobile">mobile app development</a>, and <a href="/ui-ux-design">UI/UX design</a>. See our <a href="/case-studies/aierpify">case studies</a> or <a href="/contact">contact Bridge Homies</a> for a project discussion.</p>
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
