import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Bridge Homies",
  description:
    "The terms and conditions governing the use of Bridge Homies' products and services.",
  alternates: {
    canonical: "https://bridgehomies.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Bridge Homies",
    description:
      "The terms and conditions governing the use of Bridge Homies' products and services.",
    url: "https://bridgehomies.com/terms",
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
