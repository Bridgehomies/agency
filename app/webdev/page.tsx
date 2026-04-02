import type { Metadata } from "next"
import WebDevClient from "./WebDevClient"

export const metadata: Metadata = {
  title: "Website Development Services — Next.js, React & Django | Bridge Homies",
  description:
    "Bridge Homies delivers expert website development using Next.js, React, and Django. From SaaS and web apps to enterprise software — we build scalable, AI-powered digital products that perform.",
  alternates: {
    canonical: "https://bridgehomies.com/webdev",
  },
  openGraph: {
    title: "Website Development Services — Next.js, React & Django | Bridge Homies",
    description:
      "Expert website development, web apps, SaaS platforms, and enterprise software. Bridge Homies is your trusted software developer company.",
    url: "https://bridgehomies.com/webdev",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies Website Development Services - Software Developer Company",
      },
    ],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://bridgehomies.com/webdev/#webpage",
      url: "https://bridgehomies.com/webdev",
      name: "Website Development Services — Next.js, React & Django | Bridge Homies",
      description:
        "Expert website development, web apps, SaaS, and enterprise software development from Bridge Homies — a leading software developer company.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
          { "@type": "ListItem", position: 2, name: "Website Development", item: "https://bridgehomies.com/webdev" },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/webdev/#service",
      name: "Website Development",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      url: "https://bridgehomies.com/webdev",
      description:
        "Custom website development, web apps, SaaS platforms, and enterprise software built with Next.js, React, and Django. Bridge Homies is a software developer company serving clients worldwide.",
      serviceType: "Website Development",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website Development Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Next.js Website Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "React Web Apps Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Django Enterprise Software" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation Integration" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What website development technologies does Bridge Homies use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bridge Homies builds websites and web apps using Next.js, React, and Django. We specialize in SaaS platforms, enterprise software, and AI automation-powered web applications.",
          },
        },
        {
          "@type": "Question",
          name: "Can Bridge Homies build enterprise software and SaaS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. As a software developer company, Bridge Homies designs and builds SaaS platforms, enterprise software, and web apps tailored to your business workflows.",
          },
        },
      ],
    },
  ],
}

export default function WebDevPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <WebDevClient />
    </>
  )
}