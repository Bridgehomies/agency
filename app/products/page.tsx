import type { Metadata } from "next"
import ProductsClient from "./ProductsClient"

export const metadata: Metadata = {
  title: { absolute: "Software Products Built by Bridge Homies | AI, SaaS & FinTech" },
  description:
    "Explore software products built by Bridge Homies, including FBR e-invoicing, fintech systems, AI platforms, and production SaaS applications.",
  alternates: {
    canonical: "https://www.bridgehomies.com/products",
  },
  openGraph: {
    title: "Software Products Built by Bridge Homies | AI, SaaS & FinTech",
    description:
      "Explore FBR e-invoicing, fintech systems, AI platforms, and production SaaS applications built by Bridge Homies.",
    url: "https://www.bridgehomies.com/products",
    siteName: "Bridge Homies",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Software products built by Bridge Homies" }],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.bridgehomies.com/products/#page",
  name: "Our Products",
  url: "https://www.bridgehomies.com/products",
  description:
    "Software products built by Bridge Homies — from FBR-approved invoicing tools to fintech systems and AI-powered platforms.",
  publisher: { "@id": "https://www.bridgehomies.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bridgehomies.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://www.bridgehomies.com/products" },
    ],
  },
}

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProductsClient />
    </>
  )
}
