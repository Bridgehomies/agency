import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ProductCTA() {
  return (
    <section className="bg-[#0b0f19] py-24 px-6 text-white sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
          Products by Bridge Homies
        </p>
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Software for business and product workflows.
        </h2>
        <p className="mx-auto mb-10 mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          Explore our digital invoicing, HR and operations, email outreach, and other software platforms. For a custom product or integration, contact Bridge Homies to discuss the requirements.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-indigo-100">
            Discuss a software project
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/software" className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white">
            Custom software development
          </Link>
        </div>
      </div>
    </section>
  )
}
