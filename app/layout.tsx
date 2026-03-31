import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bridgehomies.com"),
  title: {
    default: "AI ML Engineering Services | Machine Learning Agency | Bridge Homies",
    template: "%s | Bridge Homies",
  },
  description:
    "Bridge Homies is a top-rated machine learning agency and ai ml engineering service providers. We deliver expert ai/ml engineering services, custom software, SaaS platforms, and AI automation to help businesses scale globally.",
  alternates: {
    canonical: "https://bridgehomies.com",
  },
  keywords: [
    "ai ml engineering services",
    "ai ml engineering service providers",
    "ai/ml engineering services",
    "machine learning agency",
    "engenies",
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
    title: "AI ML Engineering Services | Machine Learning Agency | Bridge Homies",
    description:
      "Bridge Homies — expert ai ml engineering service providers offering ai/ml engineering services, custom software, and AI automation for businesses worldwide.",
    url: "https://bridgehomies.com",
    siteName: "Bridge Homies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies — AI ML Engineering Services & Machine Learning Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI ML Engineering Services | Machine Learning Agency | Bridge Homies",
    description:
      "Top ai ml engineering service providers. Expert machine learning agency delivering ai/ml engineering services globally.",
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
                    "Leading machine learning agency and ai ml engineering service providers. We offer expert ai/ml engineering services, AI-powered software development, SaaS, web & mobile apps for businesses worldwide.",
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
                          name: "AI ML Engineering Services",
                          description: "Expert ai/ml engineering services from a trusted machine learning agency and ai ml engineering service providers.",
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