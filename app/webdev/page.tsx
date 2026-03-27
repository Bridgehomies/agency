import type { Metadata } from "next"
import WebDevClient from "./WebDevClient"

export const metadata: Metadata = {
  title: "Web Development Services — Next.js, React & Django",
  description:
    "Bridge Homies builds fast, scalable web applications using Next.js, React, and Django. From MVPs to full-scale platforms — we ship products that perform.",
  alternates: {
    canonical: "https://bridgehomies.com/webdev",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://bridgehomies.com/webdev/#service",
  name: "Web Development",
  provider: { "@id": "https://bridgehomies.com/#organization" },
  url: "https://bridgehomies.com/webdev",
  description:
    "Custom web application development using Next.js, React, and Django. From MVPs to full-scale platforms built for performance and scale.",
  serviceType: "Web Development",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Next.js Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "React Application Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Django Backend Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "MVP Development" } },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
      { "@type": "ListItem", position: 2, name: "Web Development", item: "https://bridgehomies.com/webdev" },
    ],
  },
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