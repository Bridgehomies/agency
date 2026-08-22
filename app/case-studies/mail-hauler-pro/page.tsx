import type { Metadata } from "next"
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate"
import type { CaseStudyData } from "@/lib/case-study-types"

export const metadata: Metadata = {
  title: "Mail Hauler Pro — Cold Email Automation Platform | Bridge Homies",
  description:
    "How Bridge Homies built Mail Hauler Pro, a multi-inbox cold email SaaS with campaign automation, warm-up, deliverability monitoring, and analytics.",
  alternates: { canonical: "https://bridgehomies.com/case-studies/mail-hauler-pro" },
}

const data: CaseStudyData = {
  slug: "mail-hauler-pro",
  name: "Mail Hauler Pro",
  category: "Cold Email Automation SaaS",
  tagline:
    "Helping marketing teams manage multiple inboxes, automate campaigns, and monitor email deliverability from one central platform.",
  targetUsers: "Marketing teams, agencies, sales teams, and lead-generation businesses",
  status: "Live and scaling through private beta",
  liveUrl: "https://mailhaulerpro.com",
  coverImage: "/work/white.png",
  heroSummary:
    "Mail Hauler Pro is a cold email automation platform built for marketing teams, lead-generation agencies, and businesses running outbound email campaigns across multiple inboxes. Bridge Homies designed and developed it as a complete email operations platform, combining inbox management, campaign automation, warm-up, lead handling, deliverability monitoring, and analytics.",
  challengeIntro:
    "Running cold email campaigns across multiple inboxes is difficult when everything is managed manually across separate tools for account management, scheduling, lead importing, sequencing, monitoring, warm-up, bounce tracking, and reporting.",
  challengePoints: [
    "Repetitive campaign setup",
    "Poor visibility across inboxes",
    "Inconsistent sending schedules",
    "Higher risk of deliverability issues",
    "Difficulty monitoring replies",
    "Scattered lead and campaign data",
    "Limited control over account rotation",
  ],
  solutionIntro:
    "Bridge Homies developed Mail Hauler Pro as a multi-inbox cold email SaaS platform where users connect email accounts, import leads, create automated campaigns, manage follow-up sequences, monitor inbox health, and review performance from one dashboard.",
  solutionPoints: [
    "Multi-inbox management from a centralized workspace",
    "Automated campaigns with scheduled sequences",
    "Email warm-up for healthier sending behavior",
    "Deliverability and bounce monitoring",
    "Lead importing and subscriber management",
    "Unified inbox for all replies",
    "Personalization with dynamic variables",
    "Analytics dashboards for accounts and campaigns",
  ],
  features: [
    {
      title: "Multi-Inbox Management",
      description: "Connect and manage multiple sending inboxes, organize accounts, and monitor account health.",
    },
    {
      title: "Campaign Automation",
      description:
        "Scheduled sequences with initial outreach, follow-ups, delays, personalization variables, spintax, and status tracking.",
    },
    {
      title: "Email Warm-Up",
      description: "Gradually increases account activity to support healthier sending before running larger campaigns.",
    },
    {
      title: "Deliverability Monitoring",
      description: "Tracks bounce activity, account health, sending behavior, and campaign performance signals.",
    },
    {
      title: "Lead Importing",
      description: "Import leads through supported sources with subscriber management and personalization data.",
    },
    {
      title: "Unified Inbox",
      description: "Brings replies from all connected inboxes into one central interface.",
    },
    {
      title: "Personalization",
      description: "Dynamic variables and content variations for more relevant outreach at scale.",
    },
    {
      title: "Analytics Dashboard",
      description: "Emails sent, replies, bounces, opens, campaign progress, and deliverability indicators.",
    },
  ],
  techStack: [
    { label: "Frontend", value: "React, Next.js" },
    { label: "Backend", value: "Node.js" },
    { label: "Database", value: "MongoDB" },
    { label: "Queue & Workers", value: "Redis-backed background processing" },
    { label: "Email Sending", value: "SMTP" },
    { label: "Inbox Sync", value: "IMAP" },
    { label: "Core infra", value: "Scheduler, queue processing, account rotation, monitoring" },
  ],
  engineeringChallenges: [
    {
      title: "Managing Multiple Email Accounts",
      description:
        "Each inbox has its own credentials, sending limits, health status, and activity history — kept isolated while giving users one workspace.",
    },
    {
      title: "Campaign Scheduling and Queues",
      description:
        "Cold email requires controlled sending rather than sending everything at once — scheduled queues and background workers process campaign actions at the right time.",
    },
    {
      title: "Inbox Synchronization",
      description:
        "Replies and activity from multiple mailboxes are collected via message synchronization, conversation grouping, and sender identification.",
    },
    {
      title: "Deliverability and Bounce Monitoring",
      description:
        "Bounced emails, unhealthy inboxes, and poor sending patterns are monitored and surfaced before they become larger operational problems.",
    },
    {
      title: "Background Processing",
      description:
        "Sending, warm-up, inbox sync, bounce monitoring, and analytics collection run through queues and workers rather than direct user requests.",
    },
  ],
  resultIntro:
    "Mail Hauler Pro became a complete outbound email operations platform for managing campaigns across multiple sending inboxes, giving marketing teams a central system for planning, executing, and monitoring cold email campaigns.",
  resultPoints: [
    "Campaign automation and multi-inbox management",
    "Email warm-up and lead importing",
    "Unified replies and bounce monitoring",
    "Deliverability tracking and personalization",
    "Campaign analytics",
  ],
  businessValue: [
    "Manage multiple inboxes from one place",
    "Reduce manual campaign administration",
    "Create structured follow-up sequences",
    "Organize leads and subscribers",
    "Monitor account health and bounce activity",
    "Review replies through a unified inbox",
    "Track campaign performance",
    "Build a repeatable outbound sales process",
  ],
  summaryTable: [
    { label: "Product", value: "Mail Hauler Pro" },
    { label: "Category", value: "Cold Email Automation SaaS" },
    { label: "Target Users", value: "Marketing teams, agencies, lead-gen businesses" },
    { label: "Primary Function", value: "Multi-inbox campaign automation and email operations" },
    { label: "Frontend", value: "React, Next.js" },
    { label: "Backend", value: "Node.js" },
    { label: "Database", value: "MongoDB" },
    { label: "Queue & Workers", value: "Redis-backed background processing" },
    { label: "Email Sending", value: "SMTP" },
    { label: "Inbox Sync", value: "IMAP" },
    { label: "Status", value: "Live and scaling through private beta" },
  ],
  finalOutcome:
    "Bridge Homies turned a fragmented cold email workflow into a centralized SaaS platform for campaign automation, inbox management, deliverability monitoring, and outbound operations — demonstrating experience building multi-account infrastructure, background workers, scheduling systems, and analytics.",
}

export default function MailHaulerProCaseStudy() {
  return <CaseStudyTemplate data={data} />
}