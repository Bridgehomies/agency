import type { Metadata } from "next"
import ProductsClient from "./ProductsClient"

export const metadata: Metadata = {
  title: { absolute: "Software Products | Aierpify, OPleo & More | Bridge Homies" },
  description:
    "Explore Aierpify e-invoicing, OPleo people operations, Mail Hauler Pro outreach, Stockhale inventory, and CV JET resume tools from Bridge Homies.",
  alternates: {
    canonical: "https://www.bridgehomies.com/products",
  },
  openGraph: {
    title: "Software Products | Aierpify, OPleo & More | Bridge Homies",
    description:
      "Explore Aierpify e-invoicing, OPleo people operations, Mail Hauler Pro outreach, Stockhale inventory, and CV JET resume tools from Bridge Homies.",
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
  name: "Software Products by Bridge Homies",
  url: "https://www.bridgehomies.com/products",
  description:
    "Aierpify e-invoicing, OPleo people operations, Mail Hauler Pro outreach, Stockhale inventory, and CV JET resume tools from Bridge Homies.",
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
