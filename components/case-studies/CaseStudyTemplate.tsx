import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { CaseStudyData } from "@/lib/case-study-types"

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-fit items-center space-x-3 mb-8">
    <div className="h-px w-8 bg-purple-600" />
    <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">{children}</span>
  </div>
)

export default function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  return (
    <main className="font-sans bg-gray-50 text-gray-900 selection:bg-purple-900 selection:text-white overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[80vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Link
            href="/products"
            className="group flex w-fit items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-purple-600 transition-colors mb-12"
          >
            <ArrowIcon className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>

          <Eyebrow>{data.category}</Eyebrow>

          <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.9] uppercase text-gray-900">
            {data.name}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mt-8 mb-10">
            {data.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="px-4 py-2 border border-gray-300 text-xs font-bold tracking-wide uppercase text-gray-500">
              {data.targetUsers}
            </span>
            <span className="px-4 py-2 border border-gray-300 text-xs font-bold tracking-wide uppercase text-gray-500">
              {data.status}
            </span>
            {data.liveUrl && (
              <a
                href={data.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-bold text-xs uppercase tracking-wide hover:bg-purple-600 transition-colors"
              >
                Visit Live Site
                <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* COVER */}
      {data.coverImage && (
        <section className="pb-20 lg:pb-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <figure className="group relative overflow-hidden border border-gray-200 bg-white">
              <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:3rem_3rem]" />
              <div className="relative z-10 flex items-center justify-center p-10 sm:p-16 min-h-[20rem] md:min-h-[28rem]">
                <img
                  src={data.coverImage}
                  alt={`${data.name} — ${data.category}`}
                  className="max-h-[15rem] md:max-h-[22rem] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </figure>
          </div>
        </section>
      )}

      {/* OVERVIEW */}
      <section className="py-20 bg-white border-y border-gray-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed">{data.heroSummary}</p>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900">
              The <br /> Challenge.
            </h2>
            <p className="text-gray-500 font-medium max-w-sm mt-8 md:mt-0 text-right">{data.challengeIntro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {data.challengePoints.map((point, i) => (
              <div key={i} className="flex items-start gap-4 border-l border-gray-300 pl-5 py-1">
                <span className="text-gray-400 font-black text-sm tabular-nums pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-700 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>The Approach</Eyebrow>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-8">
            The Solution.
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mb-16 text-lg leading-relaxed">{data.solutionIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {data.solutionPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-l border-gray-300 pl-5 py-1 group hover:border-purple-600 transition-colors"
              >
                <span className="text-purple-600 font-black">→</span>
                <span className="text-gray-700 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              Core <br /> Features.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {data.features.map((f, i) => (
              <div key={i} className="relative group">
                <div className="text-7xl font-black text-gray-200 absolute -top-12 -left-6 z-0 transition-colors group-hover:text-purple-100">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative z-10 border-l border-gray-300 pl-6 group-hover:border-purple-600 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase tracking-tight">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK — dark bento block */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 text-white p-12 md:p-16 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-10">
                Technical Implementation
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {data.techStack.map((t, i) => (
                  <div key={i} className="flex justify-between gap-6 border-b border-white/10 pb-4">
                    <span className="text-sm font-bold uppercase tracking-wide text-gray-400 shrink-0">
                      {t.label}
                    </span>
                    <span className="text-sm text-white text-right">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERING CHALLENGES — editorial FAQ style */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
              <Eyebrow>Under the Hood</Eyebrow>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-8">
                Engineering <br /> Challenges.
              </h2>
              <p className="text-gray-500 font-medium max-w-sm">
                The hard problems that shaped how {data.name} was actually built.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <div className="border-t-2 border-gray-900">
                {data.engineeringChallenges.map((c, i) => (
                  <div key={i} className="py-10 border-b border-gray-200 group">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight group-hover:text-purple-600 transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULT */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900">
              The <br /> Result.
            </h2>
            <p className="text-gray-500 font-medium max-w-sm mt-8 md:mt-0 text-right">{data.resultIntro}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.resultPoints.map((point, i) => (
              <span
                key={i}
                className="px-5 py-2.5 border border-gray-300 text-sm font-bold text-gray-700 uppercase tracking-wide hover:border-purple-600 hover:text-purple-600 transition-colors"
              >
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS VALUE */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>Why It Matters</Eyebrow>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-16">
            Business Value.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {data.businessValue.map((point, i) => (
              <div key={i} className="flex items-start gap-4 border-l border-gray-300 pl-5 py-1">
                <span className="text-purple-600 font-black">→</span>
                <span className="text-gray-700 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT SUMMARY */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-16">
            Project <br /> Summary.
          </h2>
          <div className="border-t-2 border-gray-900">
            {data.summaryTable.map((row, i) => (
              <div key={i} className="flex justify-between gap-6 py-4 border-b border-gray-200">
                <span className="text-sm font-bold uppercase tracking-wide text-gray-400 shrink-0">{row.label}</span>
                <span className="text-sm font-medium text-gray-900 text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="py-24 bg-gray-900 text-white text-center" aria-label="Book a strategy call">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            Final <br /> Outcome.
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">{data.finalOutcome}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-black uppercase tracking-wide hover:bg-purple-500 hover:text-white transition-colors"
            >
              Start Your Project
              <ArrowIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-10 py-5 border border-white/30 text-white font-black uppercase tracking-wide hover:border-purple-500 hover:text-purple-400 transition-colors"
            >
              View More Work
            </Link>
          </div>
        </div>
      </section>

      {/* MINIMALIST INTERNAL LINKS */}
      <section className="py-24 bg-white border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">
            Discover More Capabilities
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: "AI/ML engineering services", link: "/ai-ml-development" },
              { label: "React & Next.js", link: "/webdev" },
              { label: "Native Mobile", link: "/mobile" },
              { label: "All Products", link: "/products" },
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
  )
}