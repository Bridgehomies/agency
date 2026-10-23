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
        <section className="container px-4 sm:px-6 py-16 space-y-5 text-muted-foreground leading-relaxed" aria-label="Bridge Homies overview">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">A software development agency for your next product</h2>
          <p>Bridge Homies is a Lahore-based software engineering and AI company serving businesses, startups, agencies, and organizations internationally. We build custom business systems, SaaS products, web and mobile applications, AI/ML systems, RAG applications, workflow automation, APIs, and integrations.</p>
          <h3 className="text-xl font-semibold text-foreground">From business workflow to working software</h3>
          <p>Engage us for product discovery, MVP planning, software architecture, application development, deployment, or ongoing maintenance. We also help connect payment, tax, messaging, CRM, ERP, and other systems where project requirements and available integrations allow.</p>
          <h3 className="text-xl font-semibold text-foreground">Explore our software development services</h3>
          <p>Explore <a href="/software">custom software and business systems</a>, <a href="/webdev">web development</a>, <a href="/mobile">mobile app development</a>, <a href="/ai-ml-development">AI/ML engineering</a>, <a href="/mlops-consulting-services">MLOps consulting</a>, and <a href="/ui-ux-design">UI/UX design</a>. Browse our <a href="/products">software products</a> and <a href="/case-studies/aierpify">project case studies</a>, or <a href="/contact">contact Bridge Homies</a>.</p>
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
