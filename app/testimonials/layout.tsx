import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Feedback | Bridge Homies",
  description:
    "Client feedback shared with Bridge Homies. Reviews appear here after they are submitted and approved.",
  alternates: {
    canonical: "https://www.bridgehomies.com/testimonials",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    title: "Client Feedback | Bridge Homies",
    description: "Client feedback shared with Bridge Homies. Reviews appear here after they are submitted and approved.",
    url: "https://www.bridgehomies.com/testimonials",
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
