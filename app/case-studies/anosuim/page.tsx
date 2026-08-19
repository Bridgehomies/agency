import type { Metadata } from "next"
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate"
import type { CaseStudyData } from "@/lib/case-study-types"

export const metadata: Metadata = {
  title: "Anosuim — Multi-Clinic Healthcare Management SaaS | Bridge Homies",
  description:
    "How Bridge Homies designed Anosuim, a multi-tenant healthcare SaaS with clinic operations, billing, patient engagement, and AI-powered appointment automation.",
  alternates: { canonical: "https://bridgehomies.com/case-studies/anosuim" },
}

const data: CaseStudyData = {
  slug: "anosuim",
  name: "Anosuim",
  category: "Healthcare Management and AI Automation SaaS",
  tagline:
    "A unified platform for clinic operations, billing, patient engagement, and AI-powered appointment automation across multiple clinics.",
  targetUsers: "Clinics, hospitals, diagnostic centers, doctors, and healthcare staff",
  status: "Product scope and system requirements defined",
  heroSummary:
    "Anosuim is a multi-tenant healthcare management SaaS platform designed for clinics, hospitals, and diagnostic centers. The platform brings patient records, doctors, appointments, visits, billing, payments, subscriptions, and patient communication into one centralized system, with an AI automation layer to capture leads, answer inquiries, and schedule appointments.",
  challengeIntro:
    "Small and mid-sized clinics often rely on a combination of paper records, spreadsheets, phone calls, WhatsApp messages, and separate billing tools. Anosuim was designed to solve these problems through one secure, scalable healthcare operations platform.",
  challengePoints: [
    "Patient information stored in different places",
    "Manual appointment scheduling",
    "Double-bookings and missed appointments",
    "Limited visibility into doctor availability",
    "Slow billing and payment reconciliation",
    "Repetitive follow-up communication",
    "Missed leads from social media and messaging channels",
    "No centralized platform-level oversight",
  ],
  solutionIntro:
    "Bridge Homies designed Anosuim as a multi-clinic SaaS system where every clinic operates independently in its own isolated workspace, while the platform owner manages subscriptions, feature access, and overall usage centrally.",
  solutionPoints: [
    "Complete patient profiles with medical history and visit records",
    "Doctor and staff management with role-based permissions",
    "Appointment booking, rescheduling, and double-booking prevention",
    "Department management and service catalogs",
    "White-label clinic configuration",
    "Automated invoicing with partial and advance payments",
    "Omnichannel AI lead capture and appointment booking",
    "Super Admin and Clinic Admin dashboards",
  ],
  features: [
    {
      title: "Patient Management",
      description: "Complete profiles with medical history, visit records, diagnoses, prescriptions, and lab tests.",
    },
    {
      title: "Appointment Management",
      description: "New bookings, rescheduling, cancellations, walk-ins, and double-booking prevention.",
    },
    {
      title: "Multi-Clinic Architecture",
      description:
        "Tenant-level data isolation, clinic-specific users and settings, independent billing, and centralized platform administration.",
    },
    {
      title: "Billing & Invoicing",
      description: "Automated invoices with partial/advance payments, discounts, promotions, and status tracking.",
    },
    {
      title: "AI Appointment Booking",
      description:
        "AI agent understands natural-language requests, checks doctor availability, and books appointments, escalating to staff on low confidence.",
    },
    {
      title: "Omnichannel Lead Capture",
      description: "Captures and tags leads from WhatsApp, Instagram, and Facebook Messenger.",
    },
    {
      title: "White-Label Configuration",
      description: "Each clinic configures its own logo, brand colors, workflows, and subscription-based features.",
    },
    {
      title: "Role-Based Access Control",
      description: "Super Admin, Clinic Admin, Doctor, Receptionist/Staff, and AI Agent roles, enforced UI and API-wide.",
    },
  ],
  techStack: [
    { label: "Architecture", value: "Multi-tenant, role-based, API-first, modular" },
    { label: "AI modules", value: "Lead capture, booking, reminders, follow-ups" },
    { label: "Integrations", value: "WhatsApp, Instagram, Facebook Messenger, payment gateways" },
    { label: "Security", value: "Tenant isolation, encryption in transit and at rest, audit logging" },
    { label: "Reliability", value: "Automated clinic backups, disaster recovery planning" },
    { label: "AI response target", value: "Under 3 seconds where infrastructure allows" },
  ],
  engineeringChallenges: [
    {
      title: "Multi-Tenant Data Isolation",
      description:
        "Each clinic needed its own isolated workspace — users, doctors, departments, patients, and invoices — while the platform owner retains centralized oversight.",
    },
    {
      title: "AI-Assisted Scheduling",
      description:
        "The AI agent needed to interpret natural-language booking requests, check real doctor availability, and hand off to human staff when confidence is low.",
    },
    {
      title: "Omnichannel Lead Capture",
      description:
        "Leads originating from WhatsApp, Instagram, and Facebook Messenger needed consistent capture and tagging outside the clinic's own website.",
    },
    {
      title: "Security for Sensitive Data",
      description:
        "Patient and financial data required tenant-level isolation, encryption, role-based access enforcement, and audit logs across both UI and API layers.",
    },
  ],
  resultIntro:
    "Anosuim brings clinic operations, billing, subscriptions, patient engagement, and AI automation into a single healthcare platform, designed to scale horizontally across multiple clinics and hundreds of concurrent users.",
  resultPoints: [
    "Centralized patient, doctor, and appointment records",
    "Automated invoicing and payment tracking",
    "AI-driven lead capture and appointment booking",
    "Super Admin and Clinic Admin dashboards",
    "Modular, API-first architecture for future expansion",
  ],
  businessValue: [
    "Reduce administrative workload",
    "Centralize patient and visit records",
    "Improve appointment coordination",
    "Prevent scheduling conflicts",
    "Speed up billing and payment tracking",
    "Recover missed appointment opportunities",
    "Improve patient communication",
    "Manage multiple clinics from one platform",
    "Create recurring SaaS revenue through subscriptions",
  ],
  summaryTable: [
    { label: "Product", value: "Anosuim" },
    { label: "Category", value: "Healthcare Management and AI Automation SaaS" },
    { label: "Target Users", value: "Clinics, hospitals, diagnostic centers, healthcare staff" },
    { label: "Platform", value: "Multi-tenant web-based SaaS" },
    { label: "Core Modules", value: "Patients, doctors, appointments, visits, billing, payments" },
    { label: "AI Modules", value: "Lead capture, booking, reminders, follow-ups" },
    { label: "Architecture", value: "Multi-tenant, role-based, API-first, modular" },
    { label: "Integrations", value: "WhatsApp, Instagram, Messenger, payment gateways" },
    { label: "Security Focus", value: "Tenant isolation, encryption, audit logging, backups" },
    { label: "Initial Market", value: "Small and mid-sized clinics" },
    { label: "Project Status", value: "Product scope and system requirements defined" },
  ],
  finalOutcome:
    "Anosuim brings clinic operations, billing, subscriptions, patient engagement, and AI automation into a single healthcare platform — demonstrating Bridge Homies' capability to plan and design complex SaaS systems involving multi-tenancy, healthcare workflows, financial operations, and AI-assisted automation.",
}

export default function AnosuimCaseStudy() {
  return <CaseStudyTemplate data={data} />
}