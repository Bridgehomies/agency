import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI/UX Design Services | Bridge Homies",
  description:
    "Bridge Homies designs SaaS, web, and enterprise product interfaces — UI/UX design, prototyping, wireframing, and design systems built to convert.",
  alternates: {
    canonical: "https://bridgehomies.com/ui-ux-design",
  },
  openGraph: {
    title: "UI/UX Design Services | Bridge Homies",
    description:
      "Bridge Homies designs SaaS, web, and enterprise product interfaces — UI/UX design, prototyping, wireframing, and design systems built to convert.",
    url: "https://bridgehomies.com/ui-ux-design",
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies — UI/UX Design Services",
      },
    ],
  },
};

export default function UiUxDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
