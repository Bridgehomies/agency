import type { Metadata } from "next";
import ServiceDetailPage from "@/components/service-detail-page";

const title = "Business Process Automation in Lahore | Bridge Homies";
const description =
  "Automate business workflows in Lahore with n8n, Python, CRM, WhatsApp, email, approval, recruitment, and invoice integrations. Bridge Homies serves clients internationally.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://www.bridgehomies.com/business-automation" },
  openGraph: {
    title,
    description,
    url: "https://www.bridgehomies.com/business-automation",
    type: "website",
  },
};

export default function BusinessAutomationPage() {
  return (
    <ServiceDetailPage
      service={{
        title: "Business Process Automation",
        headline: { lead: "Business Process", accent: "Automation" },
        eyebrow: "Workflow automation · Lahore, Pakistan",
        description,
        scope: [
          "Workflow automation",
          "WhatsApp automation",
          "Email automation",
          "CRM automation",
          "Lead-management automation",
          "Recruitment automation",
          "Invoice and tax automation",
          "Approval and notification workflows",
          "n8n workflow automation",
          "Python-based automation",
          "API-to-API integrations",
          "Spreadsheet and database automation",
          "Repetitive-task reduction",
        ],
        outcomes: [
          "Map the current steps, handoffs, systems, and exceptions before automating a workflow.",
          "Connect approved tools and data sources, with notifications and human review where the process requires them.",
          "Reduce repeated manual handling while keeping workflow behavior understandable and maintainable.",
        ],
        related: [
          {
            label: "API and system integrations",
            href: "/api-system-integration",
          },
          { label: "Custom software development", href: "/software" },
          { label: "AI and ML engineering", href: "/ai-ml-development" },
        ],
      }}
    />
  );
}
