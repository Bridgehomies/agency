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
  mainEntity: {
    "@type": "ItemList",
    name: "Software products by Bridge Homies",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: 8,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          "@id": "https://www.bridgehomies.com/case-studies/aierpify#product",
          name: "Aierpify",
          description: "Digital invoice creation, validation and submission workflows for Pakistani businesses using FBR and PRAL e-invoicing systems.",
          url: "https://www.bridgehomies.com/case-studies/aierpify",
          image: "https://www.bridgehomies.com/work/aierpify.png",
          category: "FBR and PRAL e-invoicing platform",
          manufacturer: { "@id": "https://www.bridgehomies.com/#organization" },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          "@id": "https://www.bridgehomies.com/case-studies/opleo#product",
          name: "OPleo",
          description: "Connecting attendance, payroll, leave, remote work, invoicing, and employee self-service in one operational workspace.",
          url: "https://www.bridgehomies.com/case-studies/opleo",
          image: "https://www.bridgehomies.com/uploads/blog/opleo.png",
          category: "HR and operations platform",
          manufacturer: { "@id": "https://www.bridgehomies.com/#organization" },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          "@id": "https://www.bridgehomies.com/case-studies/mail-hauler-pro#product",
          name: "Mail Hauler Pro",
          description: "A platform for managing multiple inboxes, automating campaigns, and monitoring email deliverability.",
          url: "https://www.bridgehomies.com/case-studies/mail-hauler-pro",
          image: "https://www.bridgehomies.com/Mail%20Hauler%20Pro.png",
          category: "Cold email automation software",
          manufacturer: { "@id": "https://www.bridgehomies.com/#organization" },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          "@id": "https://www.bridgehomies.com/case-studies/anosuim#product",
          name: "Anosuim",
          description: "From the reception desk to consultation and billing: connected workflows for clinics and their teams.",
          url: "https://www.bridgehomies.com/case-studies/anosuim",
          image: "https://www.bridgehomies.com/work/anosuim.png",
          category: "Multi-clinic management software",
          manufacturer: { "@id": "https://www.bridgehomies.com/#organization" },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Product",
          "@id": "https://www.bridgehomies.com/case-studies/ihfp#product",
          name: "IHFP",
          description: "A pigeon community and tournament platform with user profiles, judge assignments, manual time submissions, approval workflows, dashboards, and notifications.",
          url: "https://www.bridgehomies.com/case-studies/ihfp",
          image: "https://www.bridgehomies.com/work/hfp.png",
          category: "Community and tournament platform",
          manufacturer: { "@id": "https://www.bridgehomies.com/#organization" },
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Product",
          "@id": "https://pos.aierpify.com/#product",
          name: "Aierpify POS",
          description: "Cloud POS and digital invoicing for retail, restaurants, salons, clinics, schools, and service businesses, with sales, billing, inventory, reporting, and tax workflows.",
          url: "https://pos.aierpify.com",
          category: "Point-of-sale and digital invoicing software",
          manufacturer: { "@id": "https://www.bridgehomies.com/#organization" },
        },
      },
      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "Product",
          "@id": "https://stockhale.app/#product",
          name: "Stockhale",
          description: "Inventory and business-management platform for stock, sales, purchases, billing, customers, suppliers, and business operations.",
          url: "https://stockhale.app",
          category: "Inventory and business management software",
          manufacturer: { "@id": "https://www.bridgehomies.com/#organization" },
        },
      },
      {
        "@type": "ListItem",
        position: 8,
        item: {
          "@type": "Product",
          "@id": "https://cvjet.com/#product",
          name: "CV JET",
          description: "AI resume and career tools for resume creation, improvement, ATS scoring, and job-focused resumes.",
          url: "https://cvjet.com",
          category: "Resume and career software",
          manufacturer: { "@id": "https://www.bridgehomies.com/#organization" },
        },
      },
    ],
  },
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <ProductsClient />
    </>
  )
}
