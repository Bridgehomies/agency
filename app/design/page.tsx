// app/design/page.tsx
// ✅ This is a Server Component — NO "use client" at the top

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import VideoGallery from "@/components/video-gallery";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";
import { StatsCounter } from "./design-client"; // ← imported client component
import { Metadata } from "next";

// ─── Metadata (Next.js App Router) — ✅ Only allowed in Server Components ───
export const metadata: Metadata = {
  title: "Video Editing, Graphic Design & Social Media Management Agency | Bridge Homies",
  description:
    "Bridge Homies is a full-service creative agency offering professional video editing, graphic design, brand identity design, social media management, and content creation. We craft scroll-stopping visuals that grow your brand.",
  keywords:
    "video editing services, graphic design agency, social media management, brand identity design, content creation agency, reel editing service, motion graphics, Instagram reels editor, YouTube video editing, TikTok content creation, viral content creation, logo design agency, social media marketing agency, content strategy agency",
  alternates: { canonical: "https://bridgehomies.com/design" },
  openGraph: {
    title: "Video Editing & Graphic Design Agency | Bridge Homies",
    description:
      "Professional video editing, graphic design, social media management, and brand identity services. We help brands dominate every platform.",
    url: "https://bridgehomies.com/design",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Editing & Graphic Design Agency | Bridge Homies",
    description:
      "Scroll-stopping video editing, graphic design, and social media management. Grow your brand with Bridge Homies.",
  },
};

// ─── Rich Schema (multi-graph) ───────────────────────────────────────────────
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://bridgehomies.com/design/#webpage",
      url: "https://bridgehomies.com/design",
      name: "Video Editing, Graphic Design & Social Media Management | Bridge Homies",
      description:
        "Bridge Homies is a full-service creative agency specialising in video editing, graphic design, brand identity, and social media management for brands that want to dominate every platform.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
          { "@type": "ListItem", position: 2, name: "Creative Design & Video Editing", item: "https://bridgehomies.com/design" },
        ],
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://bridgehomies.com/#organization",
      name: "Bridge Homies",
      url: "https://bridgehomies.com",
      logo: "https://bridgehomies.com/logo.png",
      sameAs: [
        "https://www.instagram.com/bridgehomies",
        "https://www.linkedin.com/company/bridgehomies",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/design/#service-video",
      name: "Professional Video Editing Services",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      description:
        "Professional video editing for YouTube, Instagram Reels, TikTok, and brand promos. Motion graphics, colour grading, and scroll-stopping cuts.",
      serviceType: "Video Editing",
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/design/#service-graphic",
      name: "Graphic Design & Brand Identity",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      description:
        "Full-service graphic design including logo design, brand identity systems, social media templates, and visual communication.",
      serviceType: "Graphic Design",
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/design/#service-social",
      name: "Social Media Management & Content Creation",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      description:
        "Done-for-you social media management covering content strategy, daily posting, analytics, and audience growth across Instagram, TikTok, LinkedIn, and YouTube.",
      serviceType: "Social Media Management",
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      "@id": "https://bridgehomies.com/design/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What video editing services does Bridge Homies offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide professional video editing for YouTube, Instagram Reels, TikTok, Facebook, and brand promotional videos. Our services include motion graphics, colour grading, subtitle design, and short-form content editing.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer graphic design and brand identity services?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our graphic design services include logo design, full brand identity systems, social media templates, story highlights, thumbnails, and marketing collateral.",
          },
        },
        {
          "@type": "Question",
          name: "Can Bridge Homies manage our social media accounts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. We offer complete social media management including content calendars, daily posting, community management, analytics tracking, and growth strategy across all major platforms.",
          },
        },
        {
          "@type": "Question",
          name: "How much do your video editing and social media services cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pricing depends on scope, volume, and platform requirements. We offer flexible packages for startups, SMBs, and enterprise brands. Contact us for a custom quote.",
          },
        },
        {
          "@type": "Question",
          name: "What platforms do you create content for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We create content optimised for Instagram, TikTok, YouTube, LinkedIn, Facebook, Pinterest, and X (Twitter). Each piece of content is formatted and sized for its target platform.",
          },
        },
      ],
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: "01",
    h3: "Video Editing & Reel Production",
    desc: "Professional video editing for YouTube, Instagram Reels, TikTok, and brand promos. We handle cuts, colour grading, motion graphics, subtitles, and platform-specific formatting — delivering scroll-stopping content that drives views, shares, and conversions.",
    tags: ["YouTube Video Editing", "Instagram Reels", "TikTok Editing", "Motion Graphics", "Colour Grading"],
  },
  {
    num: "02",
    h3: "Social Media Management",
    desc: "Full-service social media management covering content calendars, daily posting, community engagement, and performance analytics. We run your Instagram, TikTok, LinkedIn, and YouTube like an in-house team — growing your following and turning followers into customers.",
    tags: ["Instagram Management", "TikTok Growth", "LinkedIn Strategy", "Community Management", "Analytics & Reporting"],
  },
  {
    num: "03",
    h3: "Graphic Design & Brand Identity",
    desc: "Eye-catching graphic design that communicates your brand instantly. We build complete brand identity systems — logo design, colour palettes, typography, and design guidelines — alongside social media templates, story highlights, and thumbnail design that keep every touchpoint consistent.",
    tags: ["Logo Design", "Brand Identity Systems", "Social Media Templates", "Thumbnail Design", "Print & Digital Graphics"],
  },
  {
    num: "04",
    h3: "Content Strategy & Creation",
    desc: "Data-driven content strategy built around your audience and platform algorithms. We research what converts, build a monthly content roadmap, and execute it — writing captions, scripting videos, and producing every asset your brand needs to dominate its niche.",
    tags: ["Content Calendars", "Audience Research", "Platform Strategy", "Copywriting", "Short-form Scripts"],
  },
  {
    num: "05",
    h3: "Viral Campaigns & Trend Marketing",
    desc: "We monitor trending sounds, formats, and hashtags daily — then build campaigns engineered to go viral. From hook writing to trend-jacking and challenge formats, our viral content creation strategies maximise organic reach without paid spend.",
    tags: ["Trend Research", "Viral Hook Writing", "Hashtag Strategy", "Challenge Formats", "Sound & Audio Strategy"],
  },
  {
    num: "06",
    h3: "Creative Consulting & Coaching",
    desc: "Want to grow a world-class in-house creative team? We offer 1-on-1 strategy sessions, reels editing workshops, and growth coaching to train your staff on video production, graphic design fundamentals, and social media best practices.",
    tags: ["1-on-1 Strategy Sessions", "Editing Workshops", "Growth Coaching", "Brand Audits", "Team Training"],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery & Brand Audit",
    desc: "We analyse your existing brand, competitors, and target audience to define a clear creative direction and content strategy.",
  },
  {
    step: "02",
    title: "Creative Strategy & Planning",
    desc: "We build a platform-specific content calendar, visual language guide, and video production roadmap aligned with your business goals.",
  },
  {
    step: "03",
    title: "Design, Edit & Produce",
    desc: "Our designers and video editors craft every asset — from logo systems and social media graphics to short-form reels and long-form YouTube content.",
  },
  {
    step: "04",
    title: "Publish, Analyse & Optimise",
    desc: "We publish on schedule, monitor performance analytics, and continuously refine the creative strategy to maximise reach and engagement.",
  },
];

const FAQS = [
  {
    q: "What does your video editing service include?",
    a: "Our professional video editing service covers everything from raw footage assembly and J/L-cuts to motion graphics, text animations, colour grading, sound design, and platform-specific export formats. Whether you need YouTube long-form edits, punchy Instagram Reels, or TikTok short-form videos, we deliver polished, brand-consistent content ready to publish.",
  },
  {
    q: "How is Bridge Homies different from other graphic design agencies?",
    a: "Most graphic design agencies hand you a logo and disappear. We build complete brand identity systems — from logo design and colour science to typography hierarchies and social media templates — then stay on as your ongoing creative partner to maintain brand consistency across every platform and campaign.",
  },
  {
    q: "Do you manage social media accounts end-to-end?",
    a: "Yes. Our social media management service is fully done-for-you. We handle content planning, graphic design, video editing, caption writing, scheduling, posting, and monthly analytics reporting. You stay focused on your business; we keep your audience growing.",
  },
  {
    q: "Which platforms do you specialise in for social media content creation?",
    a: "We create content optimised for Instagram, TikTok, YouTube, LinkedIn, Facebook, Pinterest, and X. Each piece is formatted, captioned, and sized specifically for its platform — including aspect ratios, text overlays, and algorithm-friendly posting schedules.",
  },
  {
    q: "How quickly can you deliver edited videos?",
    a: "Standard video editing turnaround is 3–5 business days per video depending on length and complexity. For clients on monthly retainers, we maintain a content pipeline so assets are always ready before scheduled publishing dates. Rush delivery is available.",
  },
  {
    q: "Can you help a small business with branding and social media?",
    a: "Absolutely. We offer flexible packages designed for startups and small businesses — from affordable logo design and brand kit creation to social media starter packages with weekly content. Growing brands deserve professional creative work too.",
  },
];

const KEYWORD_TAGS = [
  "Video Editing", "Reel Production", "Graphic Design", "Brand Identity",
  "Logo Design", "Social Media Management", "Content Creation",
  "Motion Graphics", "TikTok Strategy", "Instagram Growth",
  "YouTube Video Production", "Content Strategy", "Viral Campaigns",
  "Social Media Marketing", "Visual Branding", "Creative Consulting",
  "Short-form Video", "Colour Grading", "Thumbnail Design", "Brand Audit",
];

// ─── Page Component (Server Component) ───────────────────────────────────────
export default function DesignPage() {
  return (
    <main
      className="font-sans bg-gray-50 text-gray-900 selection:bg-purple-900 selection:text-white overflow-hidden"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════
          HERO — H1 targets all three primary keyword clusters
      ══════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Hero"
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">
                  Creative Design &amp; Video Editing Agency
                </span>
              </div>
              {/* H1 — primary keyword trio */}
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900 uppercase">
                Video Editing.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500">
                  Graphic Design.
                </span>{" "}
                Social Media.
              </h1>
            </div>

            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                Bridge Homies is a full-service{" "}
                <strong className="text-gray-900">video editing and graphic design agency</strong>{" "}
                delivering professional{" "}
                <strong className="text-gray-900">social media management</strong>,{" "}
                <strong className="text-gray-900">brand identity design</strong>, and{" "}
                <strong className="text-gray-900">content creation</strong> for brands that
                want to own every platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-none overflow-hidden transition-all hover:bg-purple-600"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
                <a
                  href="#services"
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-none hover:bg-gray-900 hover:text-white transition-all"
                >
                  View Services
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ✅ StatsCounter is now a client component imported from design-client.tsx */}
      <StatsCounter />

      {/* ── FULL-WIDTH IMAGE BREAKER ─────────────────────────────── */}
      <section aria-hidden="true" className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Professional graphic design and video editing workspace showing creative production"
          width={2070}
          height={1380}
          className="object-cover w-full h-full opacity-60 filter grayscale hover:scale-105 transition-transform duration-[20s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES — each H3 is a distinct keyword cluster target
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="services"
        aria-label="Creative Services"
        className="pt-16 pb-32 bg-gray-50 relative"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              Our Creative <br /> Services.
            </h2>
            <div className="text-right mt-8 md:mt-0 max-w-sm">
              <p className="text-gray-500 font-medium">
                From{" "}
                <strong className="text-gray-900">professional video editing</strong> and{" "}
                <strong className="text-gray-900">graphic design</strong> to full{" "}
                <strong className="text-gray-900">social media management</strong> — every
                creative need, one agency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {SERVICES.map((service, index) => (
              <article
                key={index}
                className={`relative group ${index % 2 !== 0 ? "md:mt-24" : ""}`}
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <div className="text-7xl font-black text-gray-200 absolute -top-12 -left-6 z-0 transition-colors group-hover:text-purple-100">
                  {service.num}
                </div>
                <div className="relative z-10 border-l border-gray-300 pl-6 group-hover:border-purple-600 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase tracking-tight" itemProp="name">
                    {service.h3}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4" itemProp="description">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-1 bg-gray-100 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BENTO — OUR STORY (semantic depth + E-E-A-T signals)
      ══════════════════════════════════════════════════════════════ */}
      <section id="about" aria-label="About Bridge Homies" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-8 bg-gray-900 text-white p-12 md:p-16 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-6">Our Story</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                  Not Just Another <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                    Creative Agency.
                  </span>
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-6">
                  Founded in 2024, Bridge Homies started as a Python development shop and evolved
                  into a full-service{" "}
                  <strong className="text-white">creative design and video editing agency</strong>.
                  Today we serve startups, e-commerce brands, and enterprise companies looking for
                  a reliable partner in{" "}
                  <strong className="text-white">graphic design</strong>,{" "}
                  <strong className="text-white">social media content creation</strong>, and{" "}
                  <strong className="text-white">video production</strong>.
                </p>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-12">
                  We don't just deliver assets — we build creative systems. Every{" "}
                  <strong className="text-white">brand identity</strong> we design is built to scale
                  across every platform. Every{" "}
                  <strong className="text-white">reel we edit</strong> is engineered around the hook,
                  pacing, and CTA that drives the algorithm. Every{" "}
                  <strong className="text-white">social media strategy</strong> we deploy is rooted
                  in data, not guesswork.
                </p>
              </div>
              <a href="/about" className="relative z-10 inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors w-fit">
                Meet the Homies
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gray-100 flex-1 relative overflow-hidden group min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=1470&q=80"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"
                  alt="Bridge Homies creative team working on graphic design and video editing projects"
                  width={1470}
                  height={980}
                />
                <div className="absolute inset-0 bg-gray-900/30" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Scalable Creativity</h3>
                  <p className="text-gray-200 text-sm">Brand design &amp; video strategies that grow with your audience.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PROCESS — topical depth + E-E-A-T
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Our Creative Process" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900">
              How We <br /> Work.
            </h2>
            <p className="text-gray-500 font-medium max-w-sm mt-8 md:mt-0 text-right">
              A proven four-step process for{" "}
              <strong className="text-gray-900">video editing</strong>,{" "}
              <strong className="text-gray-900">graphic design</strong>, and{" "}
              <strong className="text-gray-900">social media management</strong> that
              consistently delivers measurable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PROCESS.map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-7xl font-black text-gray-200 mb-4 transition-colors group-hover:text-purple-100">
                  {item.step}
                </div>
                <div className="border-l-2 border-gray-300 pl-6 group-hover:border-purple-600 transition-all duration-500">
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SEO PROSE BLOCK — ~350 words of keyword-rich body copy.
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="About our creative services" className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="inline-flex items-center space-x-3 mb-8">
            <div className="h-px w-8 bg-purple-600" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">Why Bridge Homies</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-10 uppercase">
            The Creative Agency Built <br /> for the Scroll Era.
          </h2>

          <div className="prose prose-lg prose-gray max-w-none text-gray-600 space-y-6">
            <p>
              The modern brand lives and dies on its feed. Whether it's a{" "}
              <strong>video editing agency</strong> that delivers cinematic YouTube content,
              a <strong>graphic design agency</strong> that builds a recognisable visual
              identity, or a <strong>social media management company</strong> that keeps your
              audience engaged every single day — you need a creative partner who understands
              all three, not just one.
            </p>
            <p>
              At Bridge Homies, our <strong>video editing services</strong> cover everything from
              raw-footage assembly to full motion-graphics packages. Our editors are fluent in
              every platform format — long-form YouTube storytelling, punchy{" "}
              <strong>Instagram Reels editing</strong>, fast-cut{" "}
              <strong>TikTok video production</strong>, and professional{" "}
              <strong>LinkedIn video content</strong>. We don't just cut footage; we architect
              viewing experiences that hold attention and drive action.
            </p>
            <p>
              Our <strong>graphic design services</strong> go beyond logos. We design entire{" "}
              <strong>brand identity systems</strong> — colour science, typography hierarchies,
              iconography, and templates — ensuring your brand looks consistent whether someone
              sees it on a billboard, a social media post, or a website. For brands starting from
              scratch, our <strong>logo design service</strong> is the first step toward owning a
              space in your audience's mind.
            </p>
            <p>
              <strong>Social media management</strong> is where strategy meets execution. Our
              team handles <strong>social media content creation</strong>, scheduling, community
              management, and monthly analytics so you always know what's working. From{" "}
              <strong>Instagram growth strategies</strong> to{" "}
              <strong>TikTok content planning</strong>, we build systems that compound — growing
              your following, brand equity, and revenue month after month.
            </p>
            <p>
              Whether you're a startup building a brand from zero or an established business
              looking to scale your <strong>digital content production</strong>, Bridge Homies
              has the creative firepower to get you there. Our clients come to us for{" "}
              <strong>affordable video editing</strong> and professional{" "}
              <strong>graphic design for small businesses</strong> — and stay because the results
              speak for themselves.
            </p>
          </div>

        </div>
      </section>

      {/* ── VIDEO WORK GALLERY ─────────────────────────────────────── */}
      <VideoGallery />

      {/* ══════════════════════════════════════════════════════════════
          FAQ — each question IS a search query
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="faq"
        aria-label="Frequently Asked Questions"
        className="py-32 bg-gray-50"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            <div className="lg:col-span-5 sticky top-32 self-start">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">FAQ</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-8">
                Common <br /> Questions.
              </h2>
              <p className="text-gray-500 font-medium max-w-sm">
                Everything you need to know about our{" "}
                <strong className="text-gray-900">video editing</strong>,{" "}
                <strong className="text-gray-900">graphic design</strong>, and{" "}
                <strong className="text-gray-900">social media management</strong> services.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col border-t-2 border-gray-900">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="py-10 border-b border-gray-200 group"
                  itemScope
                  itemType="https://schema.org/Question"
                  itemProp="mainEntity"
                >
                  <h3
                    className="text-xl md:text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight group-hover:text-purple-600 transition-colors duration-300"
                    itemProp="name"
                  >
                    {faq.q}
                  </h3>
                  <div
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl" itemProp="text">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <FaqAccordion />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          KEYWORD TAG STRIP — LSI / topical cluster signals
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Service keywords" className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase text-center mb-8">
            What We Do
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {KEYWORD_TAGS.map((kw, i) => (
              <span
                key={i}
                className="text-xs font-bold tracking-[0.12em] uppercase px-3 py-2 border border-gray-200 text-gray-500 hover:border-purple-600 hover:text-purple-600 transition-colors cursor-default"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS ─────────────────────────────────────────── */}
      <section aria-label="More services" className="py-24 bg-white border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">
            Discover More Capabilities
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: "Software Engineering", link: "/software" },
              { label: "AI/ML Development",    link: "/ai-ml-development" },
              { label: "React & Next.js",      link: "/webdev" },
              { label: "Native Mobile",        link: "/mobile" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="group flex items-center space-x-2 text-xl font-bold text-gray-400 hover:text-gray-900 transition-colors"
              >
                <span>{item.label}</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-600 text-2xl leading-none">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}