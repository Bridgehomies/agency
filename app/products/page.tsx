import type { Metadata } from "next"
import ProductsClient from "./ProductsClient"

export const metadata: Metadata = {
  title: "Our Products — Software We've Built",
  description:
    "Explore the software products built by Bridge Homies — from FBR-approved invoicing tools to fintech systems and AI-powered platforms.",
  alternates: {
    canonical: "https://bridgehomies.com/products",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://bridgehomies.com/products/#page",
  name: "Our Products",
  url: "https://bridgehomies.com/products",
  description:
    "Software products built by Bridge Homies — from FBR-approved invoicing tools to fintech systems and AI-powered platforms.",
  publisher: { "@id": "https://bridgehomies.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://bridgehomies.com/products" },
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