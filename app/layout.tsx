import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bridgehomies.com"),
  title: {
    default: "AI & Software Development Agency | Bridge Homies",
    template: "%s | Bridge Homies",
  },
  description:
    "Bridge Homies builds AI-powered software, SaaS platforms, and custom web & mobile apps that help businesses scale. Based in Lahore, serving clients globally.",
  alternates: {
    canonical: "https://bridgehomies.com",
  },
  keywords: [
    "Bridge Homies",
    "software agency",
    "AI solutions",
    "SaaS development",
    "web development",
    "mobile app development",
    "AI automation",
    "RAG pipelines",
    "LLM development",
    "Next.js developers",
    "Django developers",
    "Pakistan software company",
    "Lahore software agency",
  ],
  authors: [{ name: "Bridge Homies", url: "https://bridgehomies.com" }],
  openGraph: {
    title: "AI & Software Development Agency | Bridge Homies",
    description:
      "Bridge Homies builds AI-powered software, SaaS platforms, and custom web & mobile apps that help businesses scale. Based in Lahore, serving clients globally.",
    url: "https://bridgehomies.com",
    siteName: "Bridge Homies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies — AI & Software Development Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Software Development Agency | Bridge Homies",
    description:
      "Bridge Homies builds AI-powered software, SaaS platforms, and custom web & mobile apps that help businesses scale.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Favicon.png",
    shortcut: "/Favicon.png",
    apple: "/Favicon.png",
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
        {/* Inline server-rendered schema — visible to crawlers on first parse */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://bridgehomies.com/#organization",
                  name: "Bridge Homies",
                  url: "https://bridgehomies.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://bridgehomies.com/Favicon.png",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    areaServed: "Worldwide",
                    availableLanguage: "English",
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/bridgehomies",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://bridgehomies.com/#website",
                  name: "Bridge Homies",
                  url: "https://bridgehomies.com",
                  publisher: {
                    "@id": "https://bridgehomies.com/#organization",
                  },
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://bridgehomies.com/#service",
                  name: "Bridge Homies",
                  url: "https://bridgehomies.com",
                  image: "https://bridgehomies.com/og-image.png",
                  description:
                    "AI-powered software development, SaaS, web & mobile apps, and digital solutions for businesses worldwide.",
                  priceRange: "$$",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lahore",
                    addressRegion: "Punjab",
                    addressCountry: "PK",
                  },
                  areaServed: "Worldwide",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Software Development Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "AI & Machine Learning Development",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Web Application Development",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Mobile App Development",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "SaaS Product Development",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "UI/UX Design",
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />

        {/* Google Analytics — load async, non-blocking */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4ZY8E5FZ32"
          strategy="afterInteractive"
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}