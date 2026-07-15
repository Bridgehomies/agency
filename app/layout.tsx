import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SITE_URL } from "@/lib/config";
import { fontVariables } from "./fonts";

// PERF FIX: removed the standalone `Bebas_Neue({...})` call that used to be
// here. It duplicated the `bebasNeue` export already declared in
// app/fonts.ts under the same `--font-bebas` variable name — two separate
// next/font instances competing for one CSS variable, which meant Next was
// generating and potentially shipping two font-loading strategies for the
// same typeface. `fonts.ts` is now the single source of truth; every font
// the site uses is loaded there exactly once and exposed via
// `fontVariables` below.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI ML Engineering Services | Machine Learning Agency | Bridge Homies",
    template: "%s | Bridge Homies",
  },
  description:
    "Bridge Homies is a machine learning agency and AI/ML engineering service provider based in Lahore, Pakistan. We build RAG pipelines, LLM integrations, custom software, and SaaS platforms.",
  alternates: {
    canonical: "/", // ponytail: relative — metadataBase resolves to www.bridgehomies.com/
  },
  // ponytail: keywords removed — Next.js renders this as <meta name="keywords">, same stuffing issue
  authors: [{ name: "Bridge Homies", url: SITE_URL }],
  openGraph: {
    title: "AI ML Engineering Services | Machine Learning Agency | Bridge Homies",
    description:
      "AI/ML engineering, RAG pipelines, LLM integration, custom software, and SaaS — built by Bridge Homies, Lahore.",
    url: "/",
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
      "AI/ML engineering agency in Lahore — RAG pipelines, LLM integration, custom software, SaaS.",
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
    // PERF/CLS FIX: fontVariables applied here — this is what actually puts
    // --font-bebas, --font-baskerville, --font-plex-mono, --font-plex-sans,
    // --font-playfair, --font-dm-sans, and --font-jetbrains into scope for
    // every page. Without this line, every var(--font-*) reference in
    // ArticleViewClient.tsx and BlogSubmitPortal.tsx silently falls through
    // to each rule's fallback (serif/sans-serif/monospace) — the components
    // were fixed, but weren't switched from the visible fallback font.
    <html lang="en" className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Bridge Homies",
                  url: SITE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/Favicon.png`,
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    areaServed: "Worldwide",
                    availableLanguage: "English",
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/bridge-homies",
                    "https://github.com/Bridgehomies",
                    "https://www.instagram.com/bridgehomies/",
                    "https://x.com/BridgeHomies",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: "Bridge Homies",
                  url: SITE_URL,
                  publisher: {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
                {
                  "@type": "ProfessionalService",
                  "@id": `${SITE_URL}/#service`,
                  name: "Bridge Homies",
                  url: SITE_URL,
                  image: `${SITE_URL}/og-image.png`,
                  description:
                    "AI/ML engineering agency in Lahore, Pakistan — RAG pipelines, LLM integration, MLOps, custom software, and SaaS development.",
                  priceRange: "$$",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "167/A Block G1, Johar Town",
                    addressLocality: "Lahore",
                    addressRegion: "Punjab",
                    postalCode: "54782",
                    addressCountry: "PK",
                  },
                  telephone: "+92-342-9263395",
                  email: "info@bridgehomies.com",
                  areaServed: "Worldwide",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Services",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "RAG Pipeline Development" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LLM Integration" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ML Model Engineering" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "MLOps" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application Development" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Product Development" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
                    ],
                  },
                },
              ],
            }),
          }}
        />

        <Script
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

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}