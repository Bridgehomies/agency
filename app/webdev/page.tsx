import type { Metadata } from "next"
import WebDevClient from "./WebDevClient"

export const metadata: Metadata = {
  title: { absolute: "Web Application Development Services | Bridge Homies" },
  description:
    "Bridge Homies builds business websites, SaaS platforms, custom web apps, customer and vendor portals, marketplaces, and API-driven systems.",
  alternates: {
    canonical: "https://www.bridgehomies.com/webdev",
  },
  openGraph: {
    title: "Web Application Development Services | Bridge Homies",
    description:
      "Web development for business websites, SaaS products, custom applications, portals, e-commerce, and marketplaces.",
    url: "https://www.bridgehomies.com/webdev",
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
      "@id": "https://www.bridgehomies.com/webdev/#webpage",
      url: "https://www.bridgehomies.com/webdev",
      name: "Web Application Development Services | Bridge Homies",
      description:
        "Web development for business websites, SaaS products, custom applications, portals, e-commerce, and marketplaces.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bridgehomies.com" },
          { "@type": "ListItem", position: 2, name: "Website Development", item: "https://www.bridgehomies.com/webdev" },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.bridgehomies.com/webdev/#service",
      name: "Website Development",
      provider: { "@id": "https://www.bridgehomies.com/#organization" },
      url: "https://www.bridgehomies.com/webdev",
      description:
        "Custom web applications, SaaS platforms, business websites, customer and vendor portals, marketplaces, e-commerce, and API-driven web systems.",
      serviceType: "Website Development",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website Development Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Web Applications and SaaS Platforms" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customer and Vendor Portals" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce and Marketplace Platforms" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "API Development and System Integrations" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you build SaaS and custom enterprise software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Web development projects can include SaaS platforms, custom web applications, customer and vendor portals, marketplaces, e-commerce sites, and dashboards.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a typical website development project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Project timelines depend on scope, integrations, content, and review needs. We define milestones during project planning.",
          },
        },
        {
          "@type": "Question",
          name: "Can a web application connect with my existing systems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web applications can connect to existing APIs, payment services, CRMs, ERPs, messaging platforms, and other systems based on project requirements.",
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
