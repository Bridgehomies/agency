import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Bridge Homies | Software Agency & Digital Solutions",
  description:
    "Bridge Homies is a top-tier software agency specializing in AI, SaaS, web & mobile app development, and digital solutions. We help businesses scale faster with cutting-edge technology.",
  keywords: [
    "Bridge Homies",
    "software agency",
    "AI solutions",
    "SaaS development",
    "web development",
    "mobile app development",
    "digital marketing",
    "Next.js developers",
    "Django developers",
    "Pakistan software company",
  ],
  authors: [{ name: "Bridge Homies", url: "https://bridgehomies.com" }],
  openGraph: {
    title: "Bridge Homies | Software Agency & Digital Solutions",
    description:
      "We build scalable SaaS, AI-powered applications, and digital products that accelerate business growth.",
    url: "https://bridgehomies.com",
    siteName: "Bridge Homies",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Bridge Homies Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4ZY8E5FZ32"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4ZY8E5FZ32');
          `}
        </Script>
      </head>
      <body>
        {children}
        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
