import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Bridge Homies",
  description:
    "Current terms are not published on this page yet. Contact Bridge Homies to request the terms for a specific product or engagement.",
  alternates: {
    canonical: "https://www.bridgehomies.com/terms",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Terms & Conditions | Bridge Homies",
    description:
      "Current terms are not published on this page yet. Contact Bridge Homies to request the terms for a specific product or engagement.",
    url: "https://www.bridgehomies.com/terms",
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies — Terms & Conditions",
      },
    ],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
