// app/funnel/page.tsx
// Single-goal funnel: book a discovery call. One offer, one CTA.

import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "Book a Free Discovery Call | Bridge Homies",
    description:
        "Get a clear scope, timeline, and cost for your AI, SaaS, or web project in a free 20-minute discovery call with Bridge Homies. No sales pitch, no obligation.",
    keywords: [
        "discovery call",
        "free consultation software development",
        "AI consulting Lahore",
        "SaaS development consultation",
        "Bridge Homies",
        "AI ML engineering services",
        "custom software roadmap",
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    alternates: {
        canonical: "https://bridgehomies.com/funnel",
    },
    openGraph: {
        type: "website",
        url: "https://bridgehomies.com/funnel",
        title: "Book a Free Discovery Call | Bridge Homies",
        description:
            "Get a clear scope, timeline, and cost for your AI, SaaS, or web project in a free 20-minute call. No sales pitch, no obligation.",
        siteName: "Bridge Homies",
        images: [
            {
                url: "https://bridgehomies.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "Bridge Homies Free Discovery Call",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Book a Free Discovery Call | Bridge Homies",
        description:
            "Get a clear scope, timeline, and cost for your AI, SaaS, or web project in a free 20-minute call.",
        images: ["https://bridgehomies.com/og-image.png"],
    },
};

const PROBLEMS = [
    "You have an idea but don't know where to start, or what it'll actually cost.",
    "Your current system is breaking under growth and nobody can tell you why.",
    "You're burning hours on manual work that AI could handle today.",
];

const WHAT_YOU_GET = [
    {
        num: "01",
        title: "A clear scope",
        desc: "We map your idea or problem into concrete deliverables no vague 'it depends'.",
    },
    {
        num: "02",
        title: "A realistic timeline & cost",
        desc: "Based on 30+ shipped projects: SaaS platforms, AI pipelines, fleet & invoicing systems.",
    },
    {
        num: "03",
        title: "An honest recommendation",
        desc: "If it's a bad idea, we'll tell you. If it's a 2-week fix instead of a 2-month build, we'll tell you that too.",
    },
];

const PROOF = [
    "Built and shipped fleet management, CV-screening SaaS, cold-email platforms, and FBR-integrated invoicing for real clients.",
    "Enterprise clients across Fintech, Healthcare, Logistics, and SaaS.",
    "Based in Lahore, working with teams worldwide.",
];

const STATS = [
    { value: "30+", label: "Projects Delivered" },
    { value: "97%", label: "Client Satisfaction" },
    { value: "2025", label: "Founded" },
    { value: "20 min", label: "To Get Clarity" },
];

const PROCESS = [
    {
        step: "01",
        title: "Book the call",
        desc: "Pick a slot. Tell us roughly what you're trying to build or fix takes 2 minutes.",
    },
    {
        step: "02",
        title: "We dig in together",
        desc: "On the call, we ask the questions you haven't thought of yet: scale, data, integrations, edge cases.",
    },
    {
        step: "03",
        title: "Get your roadmap",
        desc: "Walk away with a clear scope, realistic timeline, and cost range in writing, no pressure.",
    },
    {
        step: "04",
        title: "Decide on your time",
        desc: "Move forward with us, take it to another team, or sit on it. The clarity is yours either way.",
    },
];

const SERVICES = [
    {
        title: "AI / ML Engineering",
        desc: "RAG pipelines, LLM integrations, model deployment, AI automation.",
    },
    {
        title: "SaaS & Web Apps",
        desc: "Full-stack platforms built with Next.js, React, FastAPI, Django.",
    },
    {
        title: "Enterprise Software",
        desc: "Admin dashboards, multi-tenant systems, billing, role-based access.",
    },
    {
        title: "Automation & Integrations",
        desc: "Workflow bots, API bridges, and tools that remove manual busywork.",
    },
];

const FAQS = [
    {
        q: "Is the call actually free?",
        a: "Yes no catch, no credit card. If we're not a fit, we'll tell you and point you in a better direction.",
    },
    {
        q: "What if I don't have a clear idea yet?",
        a: "That's normal, and exactly what this call is for. We'll help you turn a rough idea into a concrete plan.",
    },
    {
        q: "Will I get a hard sales pitch?",
        a: "No. The goal is clarity for you. If working together makes sense afterward, we'll talk about that separately.",
    },
    {
        q: "How fast can you start if we move forward?",
        a: "Depends on scope, but most engagements can kick off within 1-2 weeks of agreeing on the plan.",
    },
];

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://bridgehomies.com/funnel/#webpage",
            url: "https://bridgehomies.com/funnel",
            name: "Book a Free Discovery Call | Bridge Homies",
            description:
                "Get a clear scope, timeline, and cost for your AI, SaaS, or web project in a free 20-minute discovery call with Bridge Homies.",
            inLanguage: "en-US",
            isPartOf: { "@id": "https://bridgehomies.com/#website" },
            about: { "@id": "https://bridgehomies.com/#organization" },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
                    { "@type": "ListItem", position: 2, name: "Free Discovery Call", item: "https://bridgehomies.com/funnel" },
                ],
            },
        },
        {
            "@type": "Service",
            "@id": "https://bridgehomies.com/funnel/#service",
            name: "Free Discovery Call",
            provider: { "@id": "https://bridgehomies.com/#organization" },
            url: "https://bridgehomies.com/funnel",
            description:
                "A free 20-minute discovery call to scope AI, SaaS, web, or automation projects covering clear deliverables, realistic timelines, and honest cost estimates.",
            serviceType: "Software Consulting",
            areaServed: "Worldwide",
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
            },
        },
        {
            "@type": "FAQPage",
            "@id": "https://bridgehomies.com/funnel/#faq",
            mainEntity: FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.a,
                },
            })),
        },
    ],
};

export default function FunnelPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Navbar />
            {/* ── HERO ──────────────────────────────────────────────────────── */}
            <section aria-label="Hero" className="relative pt-20 pb-16 px-6 flex flex-col items-center text-center min-h-[90vh] justify-center">
                <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]">
                        Free 20-Minute Call
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-6">
                        Stop guessing what your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
                            software, AI, or automation project
                        </span>{" "}
                        should actually look like.
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                        One focused call. You walk away with a clear plan scope, timeline, and cost for what to build next. No sales pitch, no obligation.
                    </p>

                    <a
                        href="https://www.bridgehomies.com/#contact"
                        className="inline-flex items-center justify-center px-10 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-full transition-all hover:scale-105 shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
                    >
                        Book My Free Call →
                    </a>
                </div>
            </section>

            {/* ── STATS BAR ─────────────────────────────────────────────────── */}
            <section aria-label="Company stats" className="py-10 px-6 border-y border-border bg-card">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((s, i) => (
                        <div key={i}>
                            <div className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                                {s.value}
                            </div>
                            <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mt-1">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section aria-label="Problems we solve" className="py-20 px-6 border-t border-border bg-muted/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                        Sound familiar?
                    </h2>
                    <div className="space-y-4">
                        {PROBLEMS.map((p, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card"
                            >
                                <span className="text-primary font-black text-xl flex-shrink-0">✕</span>
                                <p className="text-foreground/80 leading-relaxed">{p}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHAT YOU GET ──────────────────────────────────────────────── */}
            <section aria-label="What you get from the call" className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                        Here's exactly what happens on the call
                    </h2>
                    <p className="text-muted-foreground text-center mb-12">
                        20 minutes. No fluff. You leave with answers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {WHAT_YOU_GET.map((item) => (
                            <div
                                key={item.num}
                                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
                            >
                                <div className="text-primary font-black text-3xl mb-4">{item.num}</div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS ───────────────────────────────────────────────────── */}
            <section aria-label="How the process works" className="py-20 px-6 border-t border-border bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                        How it works
                    </h2>
                    <p className="text-muted-foreground text-center mb-12">
                        From "I have a problem" to "I know exactly what to do next."
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PROCESS.map((item) => (
                            <div key={item.step} className="relative">
                                <div className="text-6xl font-black text-primary/15 mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES ──────────────────────────────────────────────────── */}
            <section aria-label="Services we offer" className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                        Whatever the call uncovers, we can build it
                    </h2>
                    <p className="text-muted-foreground text-center mb-12">
                        We're not limited to one stack or one type of project.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SERVICES.map((s, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
                            >
                                <h3 className="font-bold text-base mb-1.5">{s.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section aria-label="Why Bridge Homies" className="py-16 px-6 border-y border-border bg-muted/30">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                        Why Bridge Homies
                    </p>
                    <div className="space-y-3">
                        {PROOF.map((p, i) => (
                            <p key={i} className="text-muted-foreground text-base leading-relaxed">
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────────────── */}
            <section aria-label="Frequently asked questions" className="py-20 px-6 border-t border-border" itemScope itemType="https://schema.org/FAQPage">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
                        Questions? Answered.
                    </h2>

                    <div className="space-y-6">
                        {FAQS.map((faq, i) => (
                            <div
                                key={i}
                                className="pb-6 border-b border-border last:border-b-0"
                                itemScope
                                itemProp="mainEntity"
                                itemType="https://schema.org/Question"
                            >
                                <h3 className="font-bold text-base mb-2" itemProp="name">{faq.q}</h3>
                                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                    <p className="text-muted-foreground text-sm leading-relaxed" itemProp="text">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
            <section id="book" aria-label="Book your call" className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        Ready to get clarity on your project?
                    </h2>
                    <p className="text-muted-foreground mb-10 text-lg">
                        Pick a time that works for you. We'll come prepared.
                    </p>

                    <a
                        href="https://www.bridgehomies.com/#contact"
                        className="inline-flex items-center justify-center px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl rounded-full transition-all hover:scale-105 shadow-[0_0_50px_hsl(var(--primary)/0.45)]"
                    >
                        Book My Free Call →
                    </a>

                    <p className="mt-6 text-muted-foreground/60 text-sm">
                        No commitment. No spam. Just a real conversation about your project.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
} 