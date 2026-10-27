import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-slate-900">
      <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">
          Legal information
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Current terms for Bridge Homies products and services are not published on this page yet.
          Please contact us to request the terms that apply to a specific product or engagement.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="mailto:info@bridgehomies.com"
            className="inline-flex items-center rounded-md bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Email Bridge Homies
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-900 hover:border-violet-700 hover:text-violet-700"
          >
            Contact page
          </Link>
        </div>
      </section>
    </main>
  );
}
