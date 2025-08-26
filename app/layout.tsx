import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bridge Homies | Software Agency & Digital Solutions",
  description:
    "Bridge Homies is a full-service software agency providing AI, SaaS, web & mobile app development, and digital solutions. Build, scale, and grow your business with us.",
  keywords: [
    "Bridge Homies",
    "software agency",
    "web development",
    "AI solutions",
    "SaaS development",
    "app development",
    "digital marketing",
    "Pakistan software agency",
    "Next.js development",
    "Django development",
  ],
  authors: [{ name: "Bridge Homies", url: "https://bridgehomies.com" }],
  openGraph: {
    title: "Bridge Homies | Software Agency & Digital Solutions",
    description:
      "We build SaaS, AI-powered apps, and digital products to help your business scale faster.",
    url: "https://bridgehomies.com",
    siteName: "Bridge Homies",
    images: [
      {
        url: "/logo-bg.png",
        width: 800,
        height: 600,
        alt: "Bridge Homies Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/logo-bg.png",
    shortcut: "/logo-bg.png",
    apple: "/logo-bg.png",
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
      </body>
    </html>
  );
}
