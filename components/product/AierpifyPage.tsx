// components/product/AierpifyPage.tsx
"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  num: string;
  title: string;
  desc: string;
  tag?: string;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface CompareRow {
  label: string;
  manual: string;
  aierpify: string;
  bad?: boolean;
}

interface Plan {
  name: string;
  price: string;
  per?: string;
  desc: string;
  items: string[];
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    num: "01",
    title: "Connect your business",
    desc: "Register your NTN, link your FBR IRIS account, and you're live in under an hour. We handle sandbox testing and integration setup.",
  },
  {
    num: "02",
    title: "Create your invoice",
    desc: "Enter sale details in the dashboard  customer NTN/CNIC, line items, HS codes, and tax type.",
    tag: "B2B / B2C / Debit Notes / Credit Notes",
  },
  {
    num: "03",
    title: "Aierpify validates and submits",
    desc: "Sales Tax, FED, and Further Tax rules are applied automatically. Your invoice is POSTed to the FBR API in real time  no IRIS portal, no manual upload.",
  },
  {
    num: "04",
    title: "Confirmed. You're done.",
    desc: "FBR acknowledges the invoice instantly. Records update, and every submission is audit-logged for the mandatory 6-year retention period.",
  },
];

const FEATURES: Feature[] = [
  {
    icon: "🛡",
    title: "Real-time FBR submission",
    desc: "Every invoice hits the FBR API the moment it's created. No batching, no delays, no gaps.",
  },
  {
    icon: "🧮",
    title: "Auto tax calculation",
    desc: "GST, FED, Further Tax, and Advance Tax  calculated per item based on HS codes and schedule rules.",
  },
  {
    icon: "✅",
    title: "NTN / CNIC validation",
    desc: "Customers are validated against FBR records before invoice creation. Bad data doesn't reach the portal.",
  },
  {
    icon: "📄",
    title: "Credit and debit notes",
    desc: "Returns, corrections, and adjustments  FBR-compliant debit/credit note workflows built in.",
  },
  {
    icon: "🗄",
    title: "6-year audit archive",
    desc: "All submitted invoices stored with full audit trails, ready for FBR inspection at any time.",
  },
  {
    icon: "🔌",
    title: "ERP and POS integration",
    desc: "Connect your existing accounting software or POS system via API. No workflow changes required.",
  },
];

const COMPARE: CompareRow[] = [
  { label: "Invoice submission", manual: "Manual IRIS login every time", aierpify: "Automated via API", bad: true },
  { label: "Tax calculation", manual: "Manual, error-prone", aierpify: "Auto-applied per HS code", bad: true },
  { label: "Customer validation", manual: "No validation", aierpify: "NTN/CNIC verified instantly", bad: true },
  { label: "Credit / debit notes", manual: "Complex, slow process", aierpify: "One-click workflow", bad: true },
  { label: "Audit readiness", manual: "Scattered records", aierpify: "6-year structured archive", bad: true },
  { label: "Penalty risk", manual: "High  human error", aierpify: "Near zero", bad: true },
];

const PLANS: Plan[] = [
  {
    name: "Professional Plan",
    price: "PKR 15,000",
    per: "/year",
    desc: '"For small businesses needing basic compliance features."',
    items: [
      "FBR Integration",
      "Unlimited Cloud Storage",
      "Up to 100 invoices/month",
      "50 customers",
      "100 products/services",
      "All Sales Tax Scenarios Included",
      "PDF Invoice generation",
      "Priority email support",
    ],
  },
  {
    name: "Business Plan",
    price: "PKR 25,000",
    per: "/year",
    desc: '"For growing businesses needing advanced compliance features."',
    items: [
      "FBR Integration",
      "Unlimited Cloud Storage",
      "Unlimited Invoices",
      "Unlimited Customers",
      "Unlimited products/services",
      "Custom Logo on Invoices",
      "All Sales Tax Scenarios Included",
      "PDF Invoice generation",
      "Priority support through calls, chats and emails",
    ],
    featured: true,
  },
  {
    name: "Enterprises Plan",
    price: "Custom",
    per: "/year",
    desc: '"Custom solutions for large organizations with complex needs."',
    items: [
      "FBR Integration",
      "Unlimited Cloud Storage",
      "Unlimited Invoices",
      "Unlimited Customers",
      "Unlimited products/services",
      "All Sales Tax Scenarios Included",
      "PDF Invoice generation",
      "Priority support through calls, chats and emails",
      "Create Invoice by importing Excel Sheet",
      "Consultation for FBR Integration",
      "Customize Invoices and Reports",
      "Customize Dashboard",
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AierpifyPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-foreground text-background overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,currentColor 39px,currentColor 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,currentColor 39px,currentColor 40px)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-0">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-sm px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/50">
              FBR Licensed Integrator Platform · Pakistan
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-black leading-[0.96] tracking-tight mb-6 max-w-3xl">
            Stop filing{" "}
            <span className="italic font-light text-primary/80">invoices</span>
            <br />
            manually.{" "}
            <span
              className="italic font-light"
              style={{ fontFamily: "'Georgia', serif", color: "hsl(var(--primary)/0.6)" }}
            >
              Forever.
            </span>
          </h1>

          <p className="text-white/50 text-lg leading-relaxed max-w-xl mb-10 font-normal">
            Aierpify connects your business directly to FBR's digital invoicing
            system. Invoices are validated and submitted in real time. Built for
            Pakistani businesses where a penalty isn't an option.
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors"
            >
              Get compliant now →
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-white/15 text-white/70 px-6 py-3 rounded-sm text-sm font-medium hover:border-white/30 hover:text-white transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 border-t border-white/10 -mx-6">
            {[
              { num: 100, suffix: "%", label: "FBR compliant" },
              { num: 3, suffix: "s", label: "Avg submission time" },
              { num: 0, suffix: " penalties", label: "When you use Aierpify" },
            ].map((s) => (
              <div
                key={s.label}
                className="px-6 py-6 border-r border-white/10 last:border-r-0"
              >
                <div className="text-3xl font-black text-primary mb-1">
                  <AnimatedCounter target={s.num} suffix={s.suffix} />
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-white/30">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade into background */}
        <div className="h-8 bg-gradient-to-b from-foreground to-background" />
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionLabel>The problem</SectionLabel>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-foreground text-background rounded-sm p-8 col-span-full md:col-span-1 row-span-2">
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-4">
              SRO 709 · April 2025
            </p>
            <h2 className="text-3xl font-black leading-tight mb-4">
              FBR e-invoicing is mandatory.{" "}
              <span
                className="italic font-light"
                style={{ fontFamily: "'Georgia', serif", color: "hsl(var(--primary)/0.7)" }}
              >
                Most businesses aren't ready.
              </span>
            </h2>
            <p className="text-white/50 leading-relaxed text-sm mb-6">
              Pakistan's FBR now requires every registered business to transmit
              invoices in real time through the PRAL portal via a licensed
              integrator. Manual uploads, spreadsheets, and paper records are no
              longer compliant  effective immediately for corporate taxpayers.
            </p>
            <div className="border-l-2 border-destructive pl-4 bg-destructive/5 py-2 pr-3 rounded-r-sm">
              <p className="font-mono text-xs text-red-400 leading-relaxed">
                ⚠ Non-compliant businesses face penalties under Section 33
                of the Sales Tax Act 1990. Enforcement is active.
              </p>
            </div>
          </div>

          {[
            {
              icon: "📋",
              title: "Every invoice must go digital",
              body: "All B2B and B2C sales invoices, debit notes, and credit notes must be issued through an FBR-approved digital system.",
            },
            {
              icon: "⚡",
              title: "Submission is real time, not next-day",
              body: "Invoices must reach FBR at point of sale. Batch uploads and end-of-day reconciliation are not compliant.",
            },
            {
              icon: "🏢",
              title: "Applies to all registered persons",
              body: "Corporate and non-corporate registered entities are both in scope. If you file sales tax returns, this applies to you.",
            },
            {
              icon: "🔗",
              title: "Direct FBR connection isn't allowed",
              body: "All integration must go through a licensed integrator. You can't connect to FBR yourself.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="border border-border rounded-sm p-6 hover:border-primary/40 transition-colors"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-sm mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <SectionLabel>How it works</SectionLabel>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-black leading-tight mb-2">
              From invoice creation
              <br />
              <span
                className="italic font-light text-primary"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                to FBR confirmation
              </span>
              <br />
              in seconds.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              Four steps. No IRIS portal. No manual uploads.
            </p>
          </div>

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={[
                  "w-full text-left border-b border-border last:border-b-0 py-5 transition-all group",
                  activeStep === i ? "border-b-primary/30" : "",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={[
                      "font-mono text-xs tracking-wider mt-0.5 transition-colors",
                      activeStep === i
                        ? "text-primary font-semibold"
                        : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <p
                      className={[
                        "font-bold text-sm mb-1 transition-colors",
                        activeStep === i ? "text-foreground" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {step.title}
                    </p>
                    <p
                      className={[
                        "text-sm leading-relaxed transition-all overflow-hidden",
                        activeStep === i
                          ? "text-muted-foreground max-h-24 opacity-100"
                          : "max-h-0 opacity-0",
                      ].join(" ")}
                    >
                      {step.desc}
                    </p>
                    {step.tag && activeStep === i && (
                      <p className="font-mono text-[10px] text-primary/70 mt-2 tracking-wide">
                        {step.tag}
                      </p>
                    )}
                  </div>
                  <span
                    className={[
                      "text-muted-foreground/30 transition-transform mt-0.5 text-sm",
                      activeStep === i ? "rotate-90" : "",
                    ].join(" ")}
                  >
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <SectionLabel>Features</SectionLabel>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-sm overflow-hidden">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-background p-6 hover:bg-muted/40 transition-colors group"
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <SectionLabel>Aierpify vs manual compliance</SectionLabel>

        <div className="border border-border rounded-sm overflow-hidden text-sm">
          <div className="grid grid-cols-3 bg-foreground text-background">
            <div className="px-5 py-3 font-mono text-[10px] tracking-widest uppercase text-white/40">
              Capability
            </div>
            <div className="px-5 py-3 font-mono text-[10px] tracking-widest uppercase text-white/40 border-l border-white/10">
              Manual / IRIS portal
            </div>
            <div className="px-5 py-3 font-mono text-[10px] tracking-widest uppercase text-primary/80 border-l border-white/10">
              Aierpify
            </div>
          </div>

          {COMPARE.map((row, i) => (
            <div
              key={row.label}
              className={[
                "grid grid-cols-3 border-t border-border",
                i % 2 === 1 ? "bg-muted/30" : "bg-background",
              ].join(" ")}
            >
              <div className="px-5 py-3 font-medium text-foreground">{row.label}</div>
              <div className="px-5 py-3 text-destructive/70 border-l border-border">
                {row.manual}
              </div>
              <div className="px-5 py-3 text-primary font-medium border-l border-border">
                {row.aierpify}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <SectionLabel>Plans</SectionLabel>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={[
                "rounded-sm p-6 flex flex-col",
                plan.featured
                  ? "bg-foreground text-background ring-1 ring-primary/40"
                  : "border border-border bg-background",
              ].join(" ")}
            >
              {plan.featured && (
                <span className="inline-block bg-primary text-primary-foreground font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm mb-4 w-fit">
                  Most popular
                </span>
              )}
              <p
                className={[
                  "font-mono text-[10px] tracking-widest uppercase mb-2",
                  plan.featured ? "text-white/40" : "text-muted-foreground",
                ].join(" ")}
              >
                {plan.name}
              </p>
              <p className="text-3xl font-black tracking-tight mb-1">
                {plan.price}
                {plan.per && (
                  <span
                    className={[
                      "text-sm font-normal ml-1",
                      plan.featured ? "text-white/40" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {plan.per}
                  </span>
                )}
              </p>
              <p
                className={[
                  "text-sm leading-relaxed mb-6",
                  plan.featured ? "text-white/50" : "text-muted-foreground",
                ].join(" ")}
              >
                {plan.desc}
              </p>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.items.map((item) => (
                  <li
                    key={item}
                    className={[
                      "flex items-start gap-2 text-sm",
                      plan.featured ? "text-white/70" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.aierpify.com/auth/sign-up"
                className={[
                  "block text-center py-2.5 rounded-sm text-sm font-semibold transition-colors",
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border hover:border-primary/40 hover:text-primary",
                ].join(" ")}
              >
                Get started
              </a>
            </div>
          ))}
        </div>

        {/* FBR compliance badge */}
        <div className="flex items-start gap-4 border border-green-600/30 bg-green-600/5 rounded-sm p-5">
          <span className="text-green-500 text-xl flex-shrink-0 mt-0.5">🏛</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">
              Fully compliant with FBR licensing requirements.
            </strong>{" "}
            Aierpify submits through official FBR APIs as required under Chapter
            XIV of the Sales Tax Rules 2006. Your business stays on the right
            side of the law  automatically.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black leading-tight mb-2">
              Ready to get compliant?
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Businesses across Pakistan have dropped manual FBR invoicing
              entirely. Onboarding takes less than a day.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              See pricing →
            </a>
            <a
              href="https://aierpify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 px-6 py-3 rounded-sm text-sm font-medium hover:border-white/30 hover:text-white transition-colors"
            >
              Visit aierpify.com ↗
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-[10px] tracking-widest uppercase text-white/20">
            Aierpify
          </span>
          <span className="font-mono text-[10px] tracking-wide text-white/20">
            Built by Bridge Homies · Lahore, Pakistan · 2024
          </span>
        </div>
      </section>

    </main>
  );
}