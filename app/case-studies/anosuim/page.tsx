import type { Metadata } from "next"
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate"
import type { CaseStudyData } from "@/lib/case-study-types"

export const metadata: Metadata = {
  title: { absolute: "Anosuim Case Study: Multi-Clinic Management Platform | Bridge Homies" },
  description:
    "Explore Anosuim, a clinic management platform connecting patient records, appointments, clinical visits, invoicing, payments, and clinic administration.",
  alternates: { canonical: "https://www.bridgehomies.com/case-studies/anosuim" },
}

const data: CaseStudyData = {
  slug: "anosuim",
  name: "Anosuim",
  category: "Multi-Clinic Management Platform",
  tagline: "From the reception desk to consultation and billing: connected workflows for clinics and their teams.",
  targetUsers: "Clinic administrators, doctors, and receptionists",
  productUrl: "https://anosium.bridgehomies.com/",
  coverImage: "/work/anosuim.png",
  heroSummary:
    "Anosuim is a clinic management application that brings patient registration, appointment scheduling, clinical visits, and billing into a shared workspace. Clinic administrators manage staff and services, receptionists handle appointments and collections, and doctors record consultation details through interfaces shaped around their roles.",
  challengeIntro:
    "Clinic software needs to connect administrative, clinical, and financial work while keeping each clinic’s records and staff responsibilities clearly defined.",
  challengePoints: [
    "Connect patient records, appointments, consultations, and invoices across the patient journey",
    "Support different responsibilities for administrators, doctors, and receptionists",
    "Keep clinic-specific records organized within a platform serving multiple clinics",
    "Track invoice balances and partial payments alongside clinical operations",
  ],
  solutionIntro:
    "The application combines a React and TypeScript frontend with a FastAPI backend. Its modules cover patients, doctors, departments, appointments, visits, services, invoices, payments, and platform administration. Authentication and clinic context shape access to these workflows.",
  solutionPoints: [
    "Patient management and appointment scheduling connected to doctor and clinic records",
    "Clinical visit records for symptoms, vitals, diagnoses, prescriptions, and follow-up plans",
    "Service-based invoicing with taxes, discounts, payment records, and outstanding balances",
    "Clinic administration and a separate super-admin workspace for managing clinics and users",
  ],
  features: [
    { title: "Patient Records", description: "Maintain patient profiles and connect each patient to appointments, clinical visits, and billing records." },
    { title: "Appointment Scheduling", description: "Organize patient appointments with doctor and clinic context, giving reception and clinical staff a common scheduling workflow." },
    { title: "Clinical Visits", description: "Record chief complaints, symptoms, vitals, diagnoses, treatment plans, prescriptions, lab requests, procedures, and follow-up information." },
    { title: "Invoicing & Payments", description: "Create invoices with service line items, taxes, and discounts. Record payments and track paid amounts, remaining balances, and invoice status." },
    { title: "Clinic Administration", description: "Manage doctors, departments, services, and users. A super-admin interface provides a separate workspace for platform-level clinic management." },
    { title: "Role-Based Workspaces", description: "Route access reflects clinic roles, with distinct permissions for administrators, doctors, receptionists, and platform administrators." },
  ],
  techStack: [
    { label: "Frontend", value: "React, TypeScript, Vite" },
    { label: "UI", value: "Tailwind CSS, Radix UI" },
    { label: "Client data", value: "TanStack Query, Axios" },
    { label: "Backend", value: "Python, FastAPI" },
    { label: "Database", value: "PostgreSQL, SQLAlchemy, Alembic" },
    { label: "Background jobs", value: "Celery, Redis" },
  ],
  engineeringChallenges: [
    { title: "Clinic Context Across Workflows", description: "Patient care and billing records need a consistent clinic context. The application carries tenant context through the frontend and uses tenant-aware backend services to organize clinic operations." },
    { title: "Different Roles, Shared Records", description: "Doctors and receptionists work with overlapping patient information but perform different tasks. Protected routes and backend authorization organize access around each role’s responsibilities." },
    { title: "Connecting Consultations and Billing", description: "Visits link patients, doctors, and optional appointments, while invoices and payments reference patient records. These relationships support continuity between consultation records and financial administration." },
    { title: "Representing Payment State", description: "Billing models distinguish invoice totals, collected amounts, and outstanding balances, with states for pending, partially paid, paid, overdue, and cancelled invoices." },
  ],
  resultIntro:
    "The codebase brings the main clinic workflows into one application, with dedicated screens and API services for patient administration, consultations, and billing.",
  resultPoints: ["Patient and appointment management", "Clinical visit documentation", "Invoices and payment tracking", "Multi-clinic administration"],
  businessValue: [
    "Keeps patient, appointment, visit, and billing information within one product",
    "Gives doctors structured fields for consultation and follow-up documentation",
    "Helps reception and administration teams track invoices and outstanding balances",
    "Supports clinic and platform administration through distinct workspaces",
  ],
  summaryTable: [
    { label: "Product", value: "Anosuim" },
    { label: "Category", value: "Multi-clinic management software" },
    { label: "Users", value: "Clinic administrators, doctors, receptionists, and super admins" },
    { label: "Core modules", value: "Patients, appointments, visits, services, invoices, and payments" },
    { label: "Architecture", value: "React frontend, FastAPI API, PostgreSQL database" },
  ],
  finalOutcome:
    "Anosuim connects the operational stages of a clinic visit: registering a patient, scheduling care, documenting a consultation, and managing the resulting bill. It demonstrates Bridge Homies’ work on healthcare workflow software with clinic context and role-aware interfaces.",
}

export default function AnosuimCaseStudy() {
  return <CaseStudyTemplate data={data} />
}
