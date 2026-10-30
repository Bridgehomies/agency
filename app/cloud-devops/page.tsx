import type { Metadata } from "next";
import ServiceDetailPage from "@/components/service-detail-page";

const title = "Cloud and DevOps Services in Lahore | Bridge Homies";
const description =
  "Plan cloud architecture, deployments, CI/CD, Docker, databases, monitoring, backups, and production support with a Lahore-based engineering team serving international clients.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://www.bridgehomies.com/cloud-devops" },
  openGraph: {
    title,
    description,
    url: "https://www.bridgehomies.com/cloud-devops",
    type: "website",
  },
};

export default function CloudDevOpsPage() {
  return (
    <ServiceDetailPage
      service={{
        title: "Cloud and DevOps Services",
        headline: { lead: "Cloud and", accent: "DevOps Services" },
        eyebrow: "Cloud and DevOps services · Lahore, Pakistan",
        description,
        scope: [
          "Cloud architecture",
          "Application deployment",
          "Server configuration",
          "Docker deployment",
          "CI/CD pipelines",
          "Database setup",
          "Cloud hosting",
          "Backend infrastructure",
          "Redis and queue systems",
          "PostgreSQL database systems",
          "Monitoring and logging",
          "Application security",
          "Backup and recovery setup",
          "Performance optimization",
          "Production support",
        ],
        outcomes: [
          "Shape infrastructure around application requirements, data, deployment practices, and operational constraints.",
          "Set up deployment and database foundations, plus monitoring, logging, and backup processes in the agreed environment.",
          "Support performance, security, and production operations within the defined service scope.",
        ],
        related: [
          { label: "MLOps consulting", href: "/mlops-consulting-services" },
          {
            label: "API and system integrations",
            href: "/api-system-integration",
          },
          {
            label: "Support and maintenance",
            href: "/software-support-maintenance",
          },
        ],
      }}
    />
  );
}
