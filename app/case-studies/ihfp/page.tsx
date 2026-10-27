import type { Metadata } from "next"
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate"
import type { CaseStudyData } from "@/lib/case-study-types"

export const metadata: Metadata = {
  title: { absolute: "IHFP Case Study: Pigeon Community Platform | Bridge Homies" },
  description:
    "See how Bridge Homies built IHFP, a pigeon community and tournament platform with user profiles, judge assignments, manual time submissions, admin approvals, dashboards, and notifications.",
  alternates: { canonical: "https://www.bridgehomies.com/case-studies/ihfp" },
}

const data: CaseStudyData = {
  slug: "ihfp",
  name: "IHFP",
  category: "Pigeon Community & Tournament Platform",
  tagline:
    "A pigeon community and tournament platform with user profiles, judge assignments, manual time submissions, approval workflows, dashboards, and notifications.",
  targetUsers: "Pigeon community members, judges, organizers, and administrators",
  coverImage: "/work/hfp.png",
  heroSummary:
    "IHFP is a pigeon community and tournament platform for members, judges, organizers, and administrators. Its listed capabilities include user profiles, activity feeds, tournament management, judge assignments, manual time submissions, admin approvals, dashboards, notifications, and API integrations.",
  challengeIntro:
    "Tournament and community workflows bring together participants, judges, submitted times, and administrative review. IHFP provides platform features for managing these activities.",
  challengePoints: [
    "Manage tournament and community activity",
    "Assign judges to competitions",
    "Record departure and landing times manually",
    "Review submissions through admin approval workflows",
    "Provide public and private dashboards",
  ],
  solutionIntro:
    "Bridge Homies developed IHFP as a pigeon community and tournament management platform with user profiles, activity feeds, tournament administration, judge assignments, manual time submissions, approval workflows, dashboards, notifications, and API integrations.",
  solutionPoints: [
    "User profiles and activity feeds",
    "Tournament management and community features",
    "Judge management and assignments",
    "Departure and landing records with manual time submission",
    "Admin approval workflows",
    "Public and private dashboards",
    "Notifications and API integrations",
  ],
  features: [
    {
      title: "User Profiles & Activity Feeds",
      description:
        "Community profiles and activity feeds for platform members.",
    },
    {
      title: "Judge Panel",
      description:
        "Judge management and assignments, with manual departure and landing time submissions routed through admin approval workflows.",
    },
    {
      title: "Tournament Management",
      description:
        "Tournament management features for competition organizers and participants.",
    },
    {
      title: "Competition Records",
      description:
        "Record competition times and route entries through the platform's administrative approval workflows.",
    },
    {
      title: "Dashboards, Notifications & Integrations",
      description: "Public and private dashboards, notifications, and API integrations for platform workflows.",
    },
  ],
  engineeringChallenges: [
    {
      title: "Member and Judge Workflows",
      description:
        "The platform includes user profiles, judge management, assigned judges, and administrative workflows.",
    },
    {
      title: "Competition Review Workflows",
      description:
        "Manual time submissions and competition records can pass through administrative approval workflows.",
    },
    {
      title: "Competition Record Approvals",
      description:
        "Manual time submissions and competition records can pass through administrative approval steps before publication.",
    },
    {
      title: "Tournament and Community Management",
      description:
        "Tournament management sits alongside user profiles, community activity feeds, dashboards, and notifications.",
    },
    {
      title: "Administrative Review",
      description:
        "Admin approval workflows are available for competition submissions and records.",
    },
  ],
  resultIntro:
    "IHFP brings pigeon community features and tournament workflows together, including profiles, judge assignments, manual time submissions, admin approvals, dashboards, and notifications.",
  resultPoints: [
    "User profiles and activity feeds",
    "Tournament management and community features",
    "Judge management and assignments",
    "Departure and landing records with manual time submissions",
    "Public and private dashboards, notifications, and API integrations",
  ],
  businessValue: [
    "Manage tournament and community activity",
    "Record departure and landing times manually",
    "Route submissions through admin approval workflows",
    "Provide public and private dashboards",
    "Share notifications within platform workflows",
    "Connect competition data with API integrations",
  ],
  summaryTable: [
    { label: "Product", value: "IHFP" },
    { label: "Category", value: "Pigeon Community and Tournament Platform" },
    { label: "Target Users", value: "Community members, judges, organizers, administrators" },
    { label: "Platform", value: "Role-based web application" },
  ],
  finalOutcome:
    "IHFP is a pigeon community and tournament platform with user profiles, activity feeds, judge assignments, manual time submissions, approval workflows, dashboards, notifications, and API integrations.",
}

export default function IhfpCaseStudy() {
  return <CaseStudyTemplate data={data} />
}
