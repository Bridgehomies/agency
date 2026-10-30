import type { Metadata } from "next";
import ServiceDetailPage from "@/components/service-detail-page";

const title = "SaaS Product Development in Lahore | Bridge Homies";
const description =
  "Build SaaS MVPs and multi-tenant platforms with a Lahore-based team serving clients internationally. We scope product discovery, architecture, billing, API design, scaling, and ongoing maintenance.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://www.bridgehomies.com/saas-product-development",
  },
  openGraph: {
    title,
    description,
    url: "https://www.bridgehomies.com/saas-product-development",
    type: "website",
  },
};

export default function SaasProductDevelopmentPage() {
  return (
    <ServiceDetailPage
      service={{
        title: "SaaS Product Development",
        headline: { lead: "SaaS Product", accent: "Development" },
        eyebrow: "SaaS MVP development · Lahore, Pakistan",
        description,
        scope: [
          "SaaS product architecture",
          "MVP development",
          "Startup product development",
          "Subscription platforms",
          "Multi-user software",
          "Multi-tenant architecture",
          "Product discovery and planning",
          "Technical architecture",
          "API design",
          "Payment and subscription integration",
          "Product scaling",
          "Ongoing product maintenance",
        ],
        outcomes: [
          "Clarify product users, workflows, and the first useful release before committing to a larger roadmap.",
          "Design the architecture and API boundaries around the product's users, tenants, integrations, and operating needs.",
          "Build subscription and payment flows, then plan the next improvements around actual product requirements.",
        ],
        related: [
          { label: "Custom software development", href: "/software" },
          { label: "Web application development", href: "/webdev" },
          { label: "Technical consulting", href: "/technical-consulting" },
        ],
      }}
    />
  );
}
