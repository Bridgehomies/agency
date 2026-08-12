import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Experience | Bridge Homies",
  description:
    "Worked with Bridge Homies? Share your experience — your feedback helps us improve and helps other businesses know what to expect.",
  alternates: {
    canonical: "https://bridgehomies.com/testimonials/submit",
  },
  openGraph: {
    title: "Share Your Experience | Bridge Homies",
    description:
      "Worked with Bridge Homies? Share your experience — your feedback helps us improve and helps other businesses know what to expect.",
    url: "https://bridgehomies.com/testimonials/submit",
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies — Share Your Experience",
      },
    ],
  },
};

export default function TestimonialsSubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
