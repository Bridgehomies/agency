import type { Metadata } from "next";
import ServiceDetailPage from "@/components/service-detail-page";

const title = "Software Support and Maintenance in Lahore | Bridge Homies";
const description =
  "Get software support and maintenance in Lahore for existing applications, including bug fixes, security patches, performance monitoring, database and server care, upgrades, and ongoing technical support.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://www.bridgehomies.com/software-support-maintenance",
  },
  openGraph: {
    title,
    description,
    url: "https://www.bridgehomies.com/software-support-maintenance",
    type: "website",
  },
};

export default function SoftwareSupportMaintenancePage() {
  return (
    <ServiceDetailPage
      service={{
        title: "Software Support and Maintenance Services",
        headline: { lead: "Software Support", accent: "and Maintenance" },
        eyebrow: "Software support and maintenance · Lahore, Pakistan",
        description,
        scope: [
          "Bug fixing",
          "Application maintenance",
          "Performance monitoring",
          "Security updates",
          "Feature enhancements",
          "Database maintenance",
          "Server maintenance",
          "Technical support",
          "Version upgrades",
          "Post-launch improvements",
          "Long-term development retainers",
        ],
        outcomes: [
          "Review the application, infrastructure, dependencies, and support needs to agree on a workable scope.",
          "Address the prioritized fixes, updates, maintenance, or enhancements under the agreed engagement.",
          "Keep follow-up work visible through clear priorities and communication with your team.",
        ],
        related: [
          { label: "Cloud and DevOps", href: "/cloud-devops" },
          { label: "Mobile app development", href: "/mobile" },
          { label: "Custom software development", href: "/software" },
        ],
      }}
    />
  );
}
