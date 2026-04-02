import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import WorkSection from "@/components/work-section"
import TimelineSection from "@/components/timeline-section"
import DiagnosticQuiz from "@/components/diagnostic-quiz"
import InteractiveChecklist from "@/components/interactive-checklist"
import BookingSystem from "@/components/booking-system"
import InteractiveMap from "@/components/interactive-map"
import RealTimePoll from "@/components/real-time-poll"
import TeamSection from "@/components/team-section"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import StickyTransformSection from "@/components/sticky-transform-section"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI ML Engineering Services & Machine Learning Agency | Bridge Homies",
  description:
    "Bridge Homies is a leading machine learning agency and top AI ML engineering service provider. We deliver expert website development, SaaS, web apps, AI automation, and enterprise software to help businesses scale globally.",
  alternates: {
    canonical: "https://bridgehomies.com",
  },
  openGraph: {
    title: "AI ML Engineering Services & Machine Learning Agency | Bridge Homies",
    description:
      "Top AI ML engineering service providers delivering expert machine learning agency services, website development, SaaS, and AI automation for enterprise software worldwide.",
    url: "https://bridgehomies.com",
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
    title: "AI ML Engineering Services & Machine Learning Agency | Bridge Homies",
    description:
      "Top AI ML engineering service providers. Expert machine learning agency delivering website development, SaaS, web apps, and AI automation globally.",
    images: ["/og-image.png"],
  },
}

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://bridgehomies.com/#webpage",
      url: "https://bridgehomies.com",
      name: "AI ML Engineering Services & Machine Learning Agency | Bridge Homies",
      description:
        "Bridge Homies is a software company and machine learning agency delivering AI ML engineering services, website development, SaaS, web apps, AI automation, and enterprise software.",
      isPartOf: { "@id": "https://bridgehomies.com/#website" },
      about: { "@id": "https://bridgehomies.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
        ],
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://bridgehomies.com/#organization",
      name: "Bridge Homies",
      url: "https://bridgehomies.com",
      logo: "https://bridgehomies.com/Favicon.png",
      image: "https://bridgehomies.com/og-image.png",
      description:
        "Bridge Homies is a software developer company and machine learning agency specialising in AI ML engineering services, website development, SaaS, web apps, AI automation, and enterprise software.",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "167-A, Block G-1, Phase-1, Johar Town",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      areaServed: "Worldwide",
      sameAs: ["https://www.linkedin.com/company/bridgehomies"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI ML Engineering & Software Development Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI ML Engineering Services" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Apps Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise Software" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Machine Learning Agency Services" } },
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
            text: "Yes, Bridge Homies is a dedicated machine learning agency and software company based in Lahore, Pakistan. We serve clients worldwide with expert AI ML engineering services, website development, SaaS, and enterprise software.",
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
        {/* H1 keyword placement handled inside HeroSection — ensure it reads:
            "Expert AI ML Engineering Services That Drive Growth" */}
        <HeroSection />

        {/* Internal navigation anchors for interlinking */}
        <ServicesSection />

        {/* Inline interlinks section */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">
              Explore Our AI ML Engineering Services & Software Solutions
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              As a trusted machine learning agency and software company, we offer comprehensive website development,
              SaaS, web apps, AI automation, and enterprise software across all industries.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link
                href="/webdev"
                className="text-center p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="font-semibold text-sm">Website Development</div>
                <div className="text-xs text-muted-foreground mt-1">Next.js & React</div>
              </Link>
              <Link
                href="/ai-ml-development"
                className="text-center p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="font-semibold text-sm">AI ML Engineering</div>
                <div className="text-xs text-muted-foreground mt-1">Machine Learning Agency</div>
              </Link>
              <Link
                href="/software"
                className="text-center p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="font-semibold text-sm">Enterprise Software</div>
                <div className="text-xs text-muted-foreground mt-1">Custom SaaS & Apps</div>
              </Link>
              <Link
                href="/mobile"
                className="text-center p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="font-semibold text-sm">Mobile Development</div>
                <div className="text-xs text-muted-foreground mt-1">iOS & Android</div>
              </Link>
            </div>
            {/* External link for credibility */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              Our AI solutions follow{" "}
              <a
                href="https://www.iso.org/standard/81230.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                ISO/IEC 42001 AI Management System
              </a>{" "}
              best practices.
            </p>
          </div>
        </section>

        <WorkSection />
        <TimelineSection />
        <StickyTransformSection />
        <DiagnosticQuiz />
        <InteractiveChecklist />
        <BookingSystem />
        <InteractiveMap />
        <RealTimePoll />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}