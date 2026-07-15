// app/fonts.ts
//
// NEW FILE — single source of truth for every webfont used across the site.
//
// Replaces the per-component `@import url('https://fonts.googleapis.com/...')`
// calls that used to live inside ArticleViewClient.tsx and BlogSubmitPortal.tsx
// (and likely other client components too — grep for "fonts.googleapis.com"
// across the codebase and remove any remaining ones).
//
// next/font/google self-hosts these at build time: no external DNS/TCP/TLS
// round trip to fonts.googleapis.com, no render-blocking @import chain, and
// automatic `size-adjust` fallback metrics so the swap from fallback font to
// webfont doesn't shift layout (this is the actual CLS fix, not just a
// performance nicety).
//
// Usage: import the objects below into app/layout.tsx and apply their
// `.variable` classes to <html> or <body>. Every component can then just
// reference `var(--font-bebas)`, `var(--font-dm-sans)`, etc. — as the two
// fixed components in this pass already do.

import {
  Bebas_Neue,
  Libre_Baskerville,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Playfair_Display,
  DM_Sans,
  JetBrains_Mono,
} from "next/font/google";

// ── Used by ArticleViewClient.tsx ──────────────────────────────────────────
export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
});

export const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baskerville",
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-sans",
});

// ── Used by BlogSubmitPortal.tsx ────────────────────────────────────────────
export const playfairDisplay = Playfair_Display({
  weight: ["700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const dmSans = DM_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

// Convenience export — spread this onto <html> or <body> className in
// app/layout.tsx, e.g.:
//
//   import { fontVariables } from "./fonts";
//
//   export default function RootLayout({ children }: { children: React.ReactNode }) {
//     return (
//       <html lang="en" className={fontVariables}>
//         <body>{children}</body>
//       </html>
//     );
//   }
//
export const fontVariables = [
  bebasNeue.variable,
  libreBaskerville.variable,
  ibmPlexMono.variable,
  ibmPlexSans.variable,
  playfairDisplay.variable,
  dmSans.variable,
  jetbrainsMono.variable,
].join(" ");