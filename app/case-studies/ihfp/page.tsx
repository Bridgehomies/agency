import type { Metadata } from "next"
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate"
import type { CaseStudyData } from "@/lib/case-study-types"

export const metadata: Metadata = {
  title: "IHFP — Pigeon Loft, Tournament & Community Platform | Bridge Homies",
  description:
    "How Bridge Homies built IHFP, a role-based platform for pigeon lofts, clubs, tournaments, judging, real-time scoring, and community messaging.",
  alternates: { canonical: "https://bridgehomies.com/case-studies/ihfp" },
}

const data: CaseStudyData = {
  slug: "ihfp",
  name: "IHFP",
  category: "Pigeon Community & Tournament Platform",
  tagline:
    "Bringing pigeon management, competitions, judging, and community interaction into one digital platform for lofts, clubs, judges, and organizers.",
  targetUsers: "Loft owners, pigeon enthusiasts, clubs, judges, organizers, and administrators",
  status: "Deployed production platform",
  liveUrl: "https://ihfp.io",
  coverImage: "/work/hfp.png",
  heroSummary:
    "IHFP is a web-based platform built for pigeon enthusiasts, loft owners, clubs, tournament organizers, judges, and administrators. Bridge Homies developed IHFP as a structured digital ecosystem where users can manage pigeon lofts, organize tournaments, communicate with other members, submit entries, record race results, and manage competition workflows from one platform.",
  challengeIntro:
    "Pigeon clubs and tournament organizers often depend on manual records, WhatsApp groups, spreadsheets, and disconnected communication. IHFP needed to bring these workflows into one centralized platform while supporting different user roles and approval requirements.",
  challengePoints: [
    "Manage loft and pigeon information",
    "Organize tournament entries",
    "Track deadlines and payments",
    "Assign judges",
    "Record race timings",
    "Approve results and publish rankings",
    "Coordinate clubs and participants",
    "Maintain reliable competition records",
  ],
  solutionIntro:
    "Bridge Homies developed IHFP as a role-based pigeon community and tournament management platform supporting the complete competition workflow — from registration and loft management to judging, scoring, results, messaging, and administration.",
  solutionPoints: [
    "User profiles and account verification",
    "Loft management with co-owners and approval workflows",
    "Ustad–Shaagird mentorship relationships",
    "Clubs and membership management",
    "Tournament creation, registration, and check-in",
    "Judge panel with controlled, assigned access",
    "Results, scoring, and live leaderboards",
    "Platform messaging and admin console",
  ],
  features: [
    {
      title: "Loft Management",
      description:
        "Loft ownership, co-owners, pigeon records, visibility controls, safe deletion workflows, and approval-based administration.",
    },
    {
      title: "Judge Panel",
      description:
        "Assigned competition listings, departure/landing recording, manual time entry, and admin approval — only approved judges access the workflow.",
    },
    {
      title: "Tournament Management",
      description:
        "Creation, registration, check-in, entry deadlines, sub-admins, payment records, judge assignments, and competition status.",
    },
    {
      title: "Results & Leaderboards",
      description:
        "Result processing, scoring, rankings, and live scoreboards, reviewed through administrative workflows before finalizing.",
    },
    {
      title: "Messaging",
      description: "Conversation-based platform messaging for communication between users and community participants.",
    },
    {
      title: "Awards & Sponsorships",
      description: "Organizers manage awards and sponsorship information tied to competitions.",
    },
    {
      title: "Admin Console",
      description:
        "Manage users, roles, lofts, clubs, tournaments, judges, results, approvals, notifications, and activity logs.",
    },
    {
      title: "Notifications & Localization",
      description: "Platform notifications, localization support, and weather info within relevant workflows.",
    },
  ],
  techStack: [
    { label: "Frontend", value: "React, TypeScript, TanStack Router/Start, TanStack Query" },
    { label: "Backend", value: "FastAPI, Pydantic, SQLModel, SQLAlchemy" },
    { label: "Database", value: "PostgreSQL" },
    { label: "Authentication", value: "Better Auth" },
    { label: "Background processing", value: "TaskIQ and Redis" },
    { label: "Real-time", value: "WebSockets and Redis Pub/Sub" },
    { label: "Messaging", value: "Matrix-based infrastructure" },
    { label: "File storage", value: "S3-compatible object storage" },
    { label: "Hosting", value: "Google Cloud Platform" },
    { label: "Edge & DNS", value: "Cloudflare" },
  ],
  engineeringChallenges: [
    {
      title: "Multiple User Roles",
      description:
        "Users, loft owners, club owners, Ustad, judges, tournament organizers, sub-admins, and administrators each need role-based access to only their relevant workflows.",
    },
    {
      title: "Competition Approval Workflows",
      description:
        "Tournament and judging data can't always publish immediately — IHFP includes administrative approval steps for judges, timings, scoring, and results.",
    },
    {
      title: "Real-Time Competition Updates",
      description:
        "Race and scoring workflows require timely updates, handled through WebSockets and Redis Pub/Sub for real-time scoreboard updates.",
    },
    {
      title: "Complex Data Relationships",
      description:
        "The platform connects users, lofts, pigeons, clubs, tournaments, judges, entries, results, awards, and sponsorships in a structured, traceable data model.",
    },
    {
      title: "Reliable Administrative Control",
      description:
        "Because competition records require trust, the system includes controlled approvals, permissions, logs, and administrative oversight.",
    },
  ],
  resultIntro:
    "IHFP became a centralized web platform for managing pigeon communities and tournaments, deployed to production on Google Cloud Platform with the live application at ihfp.io.",
  resultPoints: [
    "Loft and pigeon management",
    "Club workflows and Ustad–Shaagird relationships",
    "Tournament registration and entry records",
    "Judge assignments and race timing",
    "Scoring, results, and leaderboards",
    "Messaging, notifications, and awards",
  ],
  businessValue: [
    "Replace scattered manual records",
    "Manage participants and entries centrally",
    "Control judge access and approvals",
    "Maintain structured pigeon and loft data",
    "Publish competition results more reliably",
    "Improve communication between members",
    "Reduce administrative repetition",
    "Create a foundation for future digital services",
  ],
  summaryTable: [
    { label: "Product", value: "IHFP" },
    { label: "Category", value: "Pigeon Community and Tournament Platform" },
    { label: "Target Users", value: "Loft owners, clubs, judges, organizers, administrators" },
    { label: "Platform", value: "Role-based web application" },
    { label: "Frontend", value: "React, TypeScript, TanStack" },
    { label: "Backend", value: "FastAPI, Pydantic, SQLModel" },
    { label: "Database", value: "PostgreSQL" },
    { label: "Real-Time", value: "WebSockets, Redis Pub/Sub" },
    { label: "Messaging", value: "Matrix" },
    { label: "Storage", value: "S3-compatible storage" },
    { label: "Hosting", value: "Google Cloud Platform" },
    { label: "Edge Layer", value: "Cloudflare" },
    { label: "Status", value: "Deployed production platform" },
  ],
  finalOutcome:
    "Bridge Homies transformed a complex pigeon competition workflow into a structured digital platform connecting community management, loft records, tournament operations, judging, scoring, messaging, and administration — demonstrating our ability to build complex role-based platforms with real-time features, approval workflows, and scalable modular architecture.",
}

export default function IhfpCaseStudy() {
  return <CaseStudyTemplate data={data} />
}