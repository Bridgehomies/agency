import type { Metadata } from "next"
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate"
import type { CaseStudyData } from "@/lib/case-study-types"

export const metadata: Metadata = {
  title: "Aierpify — FBR E-Invoicing SaaS Platform | Bridge Homies",
  description:
    "How Bridge Homies built Aierpify, a cloud-based FBR e-invoicing SaaS platform for Pakistani businesses covering invoicing, FBR integration, and subscriptions.",
  alternates: { canonical: "https://bridgehomies.com/case-studies/aierpify" },
}

const data: CaseStudyData = {
  slug: "aierpify",
  name: "Aierpify",
  category: "FBR E-Invoicing SaaS",
  tagline:
    "Helping Pakistani businesses create, manage, and submit compliant digital invoices — from invoice creation to FBR integration, subscriptions, and admin controls.",
  targetUsers: "Pakistani businesses and taxpayers",
  status: "Live production platform",
  liveUrl: "https://aierpify.com",
  coverImage: "/work/aierpify.png",
  heroSummary:
    "Aierpify is a cloud-based FBR e-invoicing platform built for Pakistani businesses that need a simpler way to generate tax invoices, manage billing records, and submit invoice data digitally. Bridge Homies designed and developed Aierpify as a complete SaaS product — from invoice creation and customer management to FBR integration, subscriptions, reporting, and administrative controls.",
  challengeIntro:
    "Many Pakistani businesses still manage invoices manually through paper records, spreadsheets, or disconnected billing tools. The goal was to build a practical digital invoicing platform that could simplify daily billing while supporting Pakistan's evolving FBR e-invoicing requirements.",
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
    "Bridge Homies developed Aierpify as an end-to-end digital invoicing SaaS platform, designed for simplicity, accuracy, and repeatable business workflows so users can manage invoices without depending on technical expertise.",
  solutionPoints: [
    "Create professional digital and tax invoices",
    "Manage customers and buyer information",
    "Maintain product and HS-code records",
    "Apply relevant tax fields and invoice details",
    "Submit invoice data to FBR systems",
    "Generate printable invoice documents",
    "Track invoice references and validation responses",
    "Manage subscriptions and account access",
  ],
  features: [
    {
      title: "Digital Invoice Generation",
      description:
        "Create invoices by entering seller, buyer, product, pricing, tax, and transaction details, with structured tax-invoice data for digital submission.",
    },
    {
      title: "FBR Integration",
      description:
        "Connects with FBR invoice validation and submission endpoints — payload preparation, submission responses, reference numbers, and validation statuses.",
    },
    {
      title: "Product & HS-Code Management",
      description:
        "Maintain product records with relevant HS codes and tax info, including similarity-based HS-code assistance for classification.",
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
      description: "Generate professional invoice documents with tax details, QR data, and reference information.",
    },
    {
      title: "Subscription-Based SaaS",
      description: "Businesses access features according to their selected subscription plan.",
    },
    {
      title: "Administrative Dashboard",
      description: "Monitor total users, invoices, revenue, active subscriptions, and monthly growth.",
    },
  ],
  techStack: [
    { label: "Frontend", value: "Tanstack Start, React, TypeScript, Tailwind CSS" },
    { label: "Backend services", value: "FastAPI" },
    { label: "Database", value: "PostgreSQL (via Server)" },
    { label: "Hosting & deployment", value: "Google Cloud Platform" },
    { label: "External integration", value: "FBR invoice submission & validation APIs" },
    { label: "Authentication", value: "Secure user authentication & account management" },
    { label: "Document generation", value: "Dynamic invoices with QR and reference data" },
  ],
  engineeringChallenges: [
    {
      title: "Handling FBR Data Requirements",
      description:
        "FBR invoices require structured fields not normally present in a basic invoice system — seller/buyer info, HS codes, units, quantities, tax values, sale types, SRO details, schedules, and invoice scenarios.",
    },
    {
      title: "Managing API Validation Responses",
      description:
        "FBR responses may include validation errors, rejected invoices, or temporary service issues. Aierpify stores and presents these in a way users can understand and act on.",
    },
    {
      title: "Simplifying a Complex Workflow",
      description:
        "The interface converts a complex tax-compliance submission process into a guided, small-business-friendly invoice-generation workflow.",
    },
    {
      title: "Maintaining Accurate Invoice Records",
      description:
        "The platform preserves invoice details, submission references, tax calculations, and generated documents for reliable billing records.",
    },
  ],
  resultIntro:
    "Aierpify became a production-oriented FBR digital invoicing platform bringing invoice generation, customer handling, product records, tax information, FBR submission, and subscription management into one system.",
  resultPoints: [
    "Complex business rules",
    "Government API integration",
    "Tax and invoice data structures",
    "Subscription management",
    "Role-based administration",
    "Dynamic document generation",
    "Production deployment and ongoing updates",
  ],
  businessValue: [
    "Faster invoice preparation",
    "Centralized customer and product records",
    "Reduced repetitive data entry",
    "Structured FBR invoice submission",
    "Better visibility into invoice activity",
    "Easier access to printable invoice documents",
    "A scalable foundation for future financial tools",
  ],
  summaryTable: [
    { label: "Product", value: "Aierpify" },
    { label: "Category", value: "FBR E-Invoicing SaaS" },
    { label: "Target Users", value: "Pakistani businesses and taxpayers" },
    { label: "Primary Function", value: "Digital invoice creation and FBR submission" },
    { label: "Platform", value: "Web-based SaaS" },
    { label: "Frontend", value: "Tanstack Start, React, TypeScript" },
    { label: "Backend & Database", value: "FastAPI, PostgreSQL" },
    { label: "Deployment", value: "Google Cloud Platform" },
    { label: "Key Integration", value: "FBR invoice submission & validation APIs" },
    { label: "Status", value: "Live production platform" },
  ],
  finalOutcome:
    "Bridge Homies transformed a complex FBR invoicing requirement into a user-focused SaaS platform that businesses can use to create, manage, validate, and track digital invoices from one place — demonstrating our ability to build serious business software including compliance systems, SaaS platforms, API integrations, dashboards, and billing workflows.",
}

export default function AierpifyCaseStudy() {
  return <CaseStudyTemplate data={data} />
}