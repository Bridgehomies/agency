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
import TestimonialsSection from "@/components/testimonials-section";

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
        <HeroSection />
        {/* Internal navigation anchors for interlinking */}
        <ServicesSection />
        <WorkSection />
        {/* <TimelineSection /> */}
        <StickyTransformSection />
        {/* <DiagnosticQuiz /> */}
        <TestimonialsSection />
        <InteractiveChecklist />
        {/* <BookingSystem /> */}
        <InteractiveMap />
        {/* <RealTimePoll /> */}
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}