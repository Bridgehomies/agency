import type { Metadata } from "next";
import ServiceDetailPage from "@/components/service-detail-page";

const title = "Software Consulting Services in Lahore | Bridge Homies";
const description =
  "Get software consulting services in Lahore, including architecture reviews, technical discovery, AI feasibility assessments, modernization advice, and MVP roadmaps.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://www.bridgehomies.com/technical-consulting",
  },
  openGraph: {
    title,
    description,
    url: "https://www.bridgehomies.com/technical-consulting",
    type: "website",
  },
};

export default function TechnicalConsultingPage() {
  return (
    <ServiceDetailPage
      service={{
        title: "Software Consulting Services",
        headline: { lead: "Software Consulting", accent: "Services" },
        eyebrow: "Software consulting · Lahore, Pakistan",
        description,
        scope: [
          "Software product consulting",
          "AI feasibility assessment",
          "Technical discovery",
          "Software architecture",
          "Technology selection",
          "MVP planning",
          "Legacy-system modernization",
          "Digital workflow analysis",
          "Vendor and solution evaluation",
          "Technical documentation",
          "CTO-level product guidance",
          "Code and architecture review",
          "Software estimation and roadmap planning",
        ],
        outcomes: [
          "Understand the product or operational challenge, current systems, and constraints before recommending a technical direction.",
          "Assess architecture, vendors, technology options, or modernization needs against the requirements provided.",
          "Document decisions, estimates, risks, and practical next steps for planning or delivery.",
        ],
        related: [
          { label: "Software product discovery", href: "/design" },
          { label: "Custom software development", href: "/software" },
          {
            label: "SaaS and product development",
            href: "/saas-product-development",
          },
        ],
      }}
    />
  );
}
