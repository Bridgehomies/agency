import type { Metadata } from "next"
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate"
import type { CaseStudyData } from "@/lib/case-study-types"

export const metadata: Metadata = {
  title: { absolute: "Aierpify Case Study: FBR & PRAL E-Invoicing | Bridge Homies" },
  description:
    "See how Bridge Homies built Aierpify, a Pakistani FBR and PRAL e-invoicing platform with invoice creation, validation, submission workflows, QR and IRN generation, and status tracking.",
  alternates: { canonical: "https://www.bridgehomies.com/case-studies/aierpify" },
}

const data: CaseStudyData = {
  slug: "aierpify",
  name: "Aierpify",
  category: "FBR & PRAL E-Invoicing Platform",
  tagline:
    "Digital invoice creation, validation and submission workflows for Pakistani businesses using FBR and PRAL e-invoicing systems.",
  targetUsers: "Pakistani businesses",
  coverImage: "/work/aierpify.png",
  heroSummary:
    "Aierpify is a Pakistani FBR and PRAL e-invoicing and tax-compliance platform. Bridge Homies developed the product to support digital invoice creation, validation and submission workflows, QR and IRN generation, sales-tax calculations, invoice status and rejection handling, product imports, multi-user access, and business reporting.",
  challengeIntro:
    "Many Pakistani businesses manage invoice information across paper records, spreadsheets, or disconnected billing tools. The goal was to build a digital invoicing platform that organizes invoice data and supports FBR and PRAL e-invoicing workflows.",
  challengePoints: [
    "Slow invoice preparation",
    "Repeated data entry",
    "Tax calculation errors",
    "Difficulty maintaining customer and product records",
    "Limited visibility into billing activity",
    "Complex FBR submission workflows",
    "No central system for managing invoices and business data",
  ],
  solutionIntro:
    "Bridge Homies developed Aierpify around invoice creation, validation and submission workflows, with records and status details available in one platform.",
  solutionPoints: [
    "Create professional digital and tax invoices",
    "Manage customers and buyer information",
    "Manage customer, product, and inventory-related records",
    "Handle sales tax, withholding, extra, and further tax details",
    "Prepare and submit invoice data through FBR and PRAL workflows",
    "Generate printable invoice documents",
    "Track invoice references and validation responses",
    "Review invoice reports and business analytics with multi-user access",
  ],
  features: [
    {
      title: "Digital Invoice Generation",
      description:
        "Create invoices by entering seller, buyer, product, pricing, tax, and transaction details, with structured tax-invoice data for digital submission.",
    },
    {
      title: "FBR & PRAL E-Invoicing Workflows",
      description:
        "Supports invoice validation and submission workflows, including response handling, invoice reference numbers, and validation statuses.",
    },
    {
      title: "Product & HS-Code Management",
      description:
        "Maintain product records with HS/PCT-code support, inventory-related records, and Excel product import.",
    },
    {
      title: "Customer Management",
      description: "Save and manage buyer information instead of re-entering customer details on every invoice.",
    },
    {
      title: "Invoice Records & Tracking",
      description: "Track invoice dates, references, statuses, and submission results across every invoice.",
    },
    {
      title: "Printable Invoices",
      description: "Generate invoice documents with tax details, QR data, and reference information.",
    },
    {
      title: "Reports & Multi-User Access",
      description: "Review reports and business analytics, with platform access for multiple users.",
    },
  ],
  engineeringChallenges: [
    {
      title: "Handling E-Invoicing Data Requirements",
      description:
        "E-invoicing needs structured seller and buyer details, product information, tax values, and transaction fields. The platform supports these records as part of invoice preparation.",
    },
    {
      title: "Managing API Validation Responses",
      description:
        "Validation responses and rejected invoices need clear status handling. Aierpify includes invoice status and rejection handling in its workflow.",
    },
    {
      title: "Simplifying a Complex Workflow",
      description:
        "The product organizes invoice creation, validation, submission, and status review into a single digital workflow.",
    },
    {
      title: "Maintaining Accurate Invoice Records",
      description:
        "The platform preserves invoice details, submission references, tax calculations, and generated documents for review.",
    },
  ],
  resultIntro:
    "Aierpify brings digital invoice creation, tax fields, FBR and PRAL validation and submission workflows, QR and IRN generation, and invoice status handling into one platform.",
  resultPoints: [
    "Digital invoice creation and tax details",
    "FBR and PRAL validation and submission workflows",
    "QR and IRN generation",
    "Multi-user access and business reporting",
    "Invoice status and rejection handling",
  ],
  businessValue: [
    "Create digital invoices with tax details",
    "Manage customer, product, and inventory-related records",
    "Use FBR and PRAL validation and submission workflows",
    "Review invoice statuses, rejections, and references",
    "Generate QR and IRN details and printable invoices",
    "Review reports and business analytics",
  ],
  summaryTable: [
    { label: "Product", value: "Aierpify" },
    { label: "Category", value: "FBR and PRAL e-invoicing platform" },
    { label: "Target Users", value: "Pakistani businesses" },
    { label: "Primary Function", value: "Digital invoice creation, validation, and submission workflows" },
    { label: "Platform", value: "Web-based SaaS" },
    { label: "Key Workflows", value: "FBR and PRAL e-invoicing, validation, and submission" },
  ],
  finalOutcome:
    "Bridge Homies developed Aierpify as a Pakistani FBR and PRAL e-invoicing platform for digital invoice creation, validation, submission, and status tracking. The project demonstrates our experience building business software, API integrations, and invoice workflows.",
}

export default function AierpifyCaseStudy() {
  return <CaseStudyTemplate data={data} />
}
