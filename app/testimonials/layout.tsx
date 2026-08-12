import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials | Bridge Homies",
  description:
    "Real feedback from clients who've worked with Bridge Homies on web, mobile, AI/ML, and SaaS projects — no cherry-picking, just honest reviews.",
  alternates: {
    canonical: "https://bridgehomies.com/testimonials",
  },
  openGraph: {
    title: "Client Testimonials | Bridge Homies",
    description:
      "Real feedback from clients who've worked with Bridge Homies on web, mobile, AI/ML, and SaaS projects — no cherry-picking, just honest reviews.",
    url: "https://bridgehomies.com/testimonials",
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies — Client Testimonials",
      },
    ],
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
