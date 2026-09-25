import type { Metadata } from "next";
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate";
import type { CaseStudyData } from "@/lib/case-study-types";

export const metadata: Metadata = {
  title: { absolute: "OPleo HR & Operations Platform | Bridge Homies" },
  description:
    "How Bridge Homies built OPleo, an operations platform that connects attendance, payroll, leave, remote work, invoicing, and employee self-service.",
  alternates: { canonical: "https://www.bridgehomies.com/case-studies/opleo" },
};

const data: CaseStudyData = {
  slug: "opleo",
  name: "OPleo",
  category: "HR & Operations Platform",
  tagline:
    "Connecting attendance, payroll, leave, remote work, invoicing, and employee self-service in one operational workspace.",
  targetUsers: "Operations, HR, finance teams, and employees",
  status: "Live product",
  liveUrl: "https://www.opleo.dev/",
  coverImage: "/uploads/blog/opleo.png",
  heroSummary:
    "OPleo is an operational people platform built by Bridge Homies to bring the business events that affect employees, attendance, payroll, and finance into a connected workflow rather than a patchwork of spreadsheets, WhatsApp messages, and disconnected tools.",
  challengeIntro:
    "People operations become error-prone when attendance, leave, remote work, payroll, employee requests, and invoicing live in separate systems that must be reconciled manually.",
  challengePoints: [
    "Attendance and shift records managed outside payroll",
    "Leave and remote-work approvals needing manual follow-up",
    "Repeated employee requests for routine information",
    "Payroll inputs spread across disconnected records",
    "Invoices and operational data requiring duplicate entry",
    "Limited visibility for HR, operations, and finance teams",
  ],
  solutionIntro:
    "Bridge Homies designed OPleo around a shared operational record: an approved business event is captured once, then made available to the workflows that legitimately depend on it.",
  solutionPoints: [
    "Centralize employee, attendance, leave, and payroll workflows",
    "Connect biometric attendance with shifts, policies, and approved exceptions",
    "Give employees a self-service portal for routine requests and information",
    "Track remote-work handling alongside people-operations workflows",
    "Bring invoicing into the same operational workspace",
    "Provide role-appropriate access for employees and administrators",
  ],
  features: [
    { title: "Attendance Management", description: "Record attendance and interpret it against shifts, policies, and approved exceptions." },
    { title: "Payroll Operations", description: "Bring the operational inputs required for payroll into a more connected workflow." },
    { title: "Leave & Remote Work", description: "Handle leave and remote-work events without losing their connection to attendance and payroll." },
    { title: "Employee Self-Service", description: "Give employees a direct portal for the information and requests they should manage themselves." },
    { title: "Invoicing", description: "Keep invoicing in the broader operational workspace rather than a separate administrative silo." },
    { title: "Role-Based Administration", description: "Support the distinct responsibilities of employees, HR, operations, and finance teams." },
  ],
  techStack: [
    { label: "Product type", value: "Web-based operations platform" },
    { label: "Core workflows", value: "Attendance, payroll, leave, remote work, invoicing" },
    { label: "Data model", value: "Connected employee and operational records" },
    { label: "Access", value: "Employee self-service and administrative roles" },
    { label: "Integration focus", value: "Biometric attendance and business workflow inputs" },
  ],
  engineeringChallenges: [
    { title: "One Event, Multiple Downstream Effects", description: "An approved leave request or attendance record must be available to the relevant payroll and operational processes without being copied or reinterpreted manually." },
    { title: "Policy-Aware Attendance", description: "Raw biometric punches need context from shifts, policies, and approved exceptions before they can inform a dependable operational record." },
    { title: "Usable Self-Service", description: "Employee access must make routine requests simpler without exposing administrative controls or creating new support work for HR." },
    { title: "Cross-Functional Visibility", description: "The platform must give each team useful context while respecting its role in people, finance, and operations workflows." },
  ],
  resultIntro:
    "OPleo provides a connected foundation for operational people workflows, reducing the need to repeatedly reconcile the same event across spreadsheets, messages, and separate tools.",
  resultPoints: [
    "Connected operational records",
    "Less duplicate data entry",
    "Clearer employee self-service",
    "Attendance-aware workflows",
    "Better cross-team visibility",
  ],
  businessValue: [
    "Reduces manual handoffs between HR, operations, and finance.",
    "Makes employee events easier to trace from approval through downstream workflows.",
    "Helps teams replace fragmented administrative processes with a connected workspace.",
    "Creates a scalable foundation for people and business operations.",
  ],
  summaryTable: [
    { label: "Product", value: "OPleo" },
    { label: "Category", value: "HR & operations platform" },
    { label: "Core users", value: "HR, operations, finance, and employees" },
    { label: "Key workflows", value: "Attendance, payroll, leave, remote work, invoicing" },
    { label: "Live product", value: "opleo.dev" },
  ],
  finalOutcome:
    "OPleo demonstrates how connected operational software can replace manual reconciliation with shared, policy-aware workflows for people and business operations.",
};

export default function OPleoCaseStudyPage() {
  return <CaseStudyTemplate data={data} />;
}
