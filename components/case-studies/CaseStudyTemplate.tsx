"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { CaseStudyData } from "@/lib/case-study-types"

export default function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-grid-pattern pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 mb-6">
            {data.category}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {data.name}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {data.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
              {data.targetUsers}
            </span>
            <span className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
              {data.status}
            </span>
            {data.liveUrl && (
              <a
                href={data.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Visit Live Site <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 py-16 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <p className="text-lg leading-relaxed text-foreground/90">{data.heroSummary}</p>
        </div>
      </section>

      {/* Challenge */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">{data.challengeIntro}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.challengePoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">The Solution</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">{data.solutionIntro}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.solutionPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Core Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Technical Implementation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.techStack.map((t, i) => (
              <div key={i} className="flex justify-between gap-4 border-b border-border py-3">
                <span className="text-sm font-medium text-muted-foreground">{t.label}</span>
                <span className="text-sm text-foreground text-right">{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Challenges */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10">Important Engineering Challenges</h2>
          <div className="space-y-8">
            {data.engineeringChallenges.map((c, i) => (
              <div key={i}>
                <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Result */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">The Result</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">{data.resultIntro}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.resultPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Business Value */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Business Value</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.businessValue.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Summary Table */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Project Summary</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            {data.summaryTable.map((row, i) => (
              <div
                key={i}
                className={`flex justify-between gap-4 px-6 py-3.5 text-sm ${
                  i % 2 === 0 ? "bg-muted/40" : ""
                }`}
              >
                <span className="font-medium text-muted-foreground">{row.label}</span>
                <span className="text-foreground text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Outcome / CTA */}
      <section className="px-6 py-20 bg-primary/5 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Final Outcome</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">{data.finalOutcome}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start Your Project
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary/50 transition-colors"
            >
              View More Work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}