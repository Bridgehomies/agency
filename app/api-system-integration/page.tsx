import type { Metadata } from "next";
import ServiceDetailPage from "@/components/service-detail-page";

const title = "API Integration Services in Lahore | Bridge Homies";
const description =
  "API integration services in Lahore for REST APIs, FBR and PRAL, payments, POS, banking, CRM, ERP, messaging, and cloud systems; available to international clients.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://www.bridgehomies.com/api-system-integration",
  },
  openGraph: {
    title,
    description,
    url: "https://www.bridgehomies.com/api-system-integration",
    type: "website",
  },
};

export default function ApiSystemIntegrationPage() {
  return (
    <ServiceDetailPage
      service={{
        title: "API Integration Services",
        headline: { lead: "API Integration", accent: "Services" },
        eyebrow: "API integration services · Lahore, Pakistan",
        description,
        scope: [
          "REST API development",
          "Third-party API integration",
          "Payment gateway integration",
          "FBR and PRAL API integrations",
          "POS and tax-system integration",
          "Banking and financial integrations",
          "Email and SMTP integration",
          "WhatsApp and messaging integrations",
          "Google services integration",
          "CRM and ERP integrations",
          "Biometric attendance integrations",
          "Cloud storage integrations",
          "Data synchronization between platforms",
        ],
        outcomes: [
          "Review the systems, available APIs, permissions, and data that need to move between platforms.",
          "Define API contracts, synchronization behavior, and failure handling to fit the agreed integration scope.",
          "Connect the selected systems and document their responsibilities and data flow.",
        ],
        related: [
          { label: "Business automation", href: "/business-automation" },
          { label: "Custom software development", href: "/software" },
          { label: "Cloud and DevOps", href: "/cloud-devops" },
        ],
      }}
    />
  );
}
