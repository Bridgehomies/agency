import type { Metadata } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Editorial Terms & Pricing Policy | Bridge Homies",
  description:
    "Review Bridge Homies editorial publishing terms, guest post pricing, link insertion rates, content guidelines, prohibited niches, and submission process.",
};

const prohibitedNiches = [
  "Casino, Gambling, iGaming, or Betting",
  "CBD, Cannabis, or Pharmaceuticals",
  "Cryptocurrency, Forex, or High-Risk Finance",
  "Adult, Essay Writing, or General Non-Technical Content",
];

const effectiveDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
}).format(new Date());

export default function BlogTermsPage() {
  return (
    <>
      <Navbar />
    <main className="min-h-screen bg-white mt-16 text-slate-900">
      <article className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:py-20">
        <header className="mb-12 border-b border-slate-200 pb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Bridge Homies Editorial Policy
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Editorial Terms &amp; Pricing Policy
          </h1>
          <div className="mt-6 space-y-2 text-slate-600">
            <p>
              <strong>Website:</strong>{" "}
              <a href="https://www.bridgehomies.com" className="font-medium text-indigo-600 hover:text-indigo-800">
                bridgehomies.com
              </a>
            </p>
            <p>
              <strong>Editorial Queue:</strong>{" "}
              <a href="https://bridgehomies.com/blog/submit" className="font-medium text-indigo-600 hover:text-indigo-800">
                bridgehomies.com/blog/submit
              </a>
            </p>
            <p><strong>Effective Date:</strong> {effectiveDate}</p>
          </div>
        </header>

        <div className="space-y-14 text-base leading-8 text-slate-700">
          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              1. Pricing Structure &amp; Options
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Service / Tier</th>
                    <th className="px-5 py-4 font-semibold">Rate</th>
                    <th className="px-5 py-4 font-semibold">Conditions / Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="px-5 py-4 font-semibold text-slate-900">$0 Link Exchange</td>
                    <td className="px-5 py-4 font-bold text-emerald-600">$0</td>
                    <td className="px-5 py-4 text-slate-600">1:1 or 3-way (ABC) reciprocal DoFollow link swap on a clean tech or SaaS site.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">Standard Agency Rate</td>
                    <td className="px-5 py-4 font-bold text-indigo-600">$15</td>
                    <td className="px-5 py-4 text-slate-600">Per placement for new guest articles and live link insertions.</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-semibold text-slate-900">Bulk / Reseller Floor Rate</td>
                    <td className="px-5 py-4 font-bold text-indigo-600">$12</td>
                    <td className="px-5 py-4 text-slate-600">Per placement for ongoing partners or batch orders of 5+ placements.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">2. Payment Terms &amp; Policy</h2>
            <ul className="space-y-4">
              <li><strong className="text-slate-950">Pay After Live:</strong> All monetary orders operate on a strict “pay after live” policy. Payment is processed only after verifying that the article or link insertion is published and live.</li>
              <li><strong className="text-slate-950">Accepted Payment Methods:</strong> Wise, Payoneer, or Direct Bank Transfer.</li>
              <li><strong className="text-slate-950">Non-Negotiable Baseline:</strong> $12 per placement is our absolute operational floor rate due to our manual technical review process by engineering leadership.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">3. Editorial &amp; Content Guidelines</h2>
            <p className="mb-5">To maintain our technical quality and domain authority, all submissions must meet the following criteria:</p>
            <ul className="space-y-4">
              <li><strong className="text-slate-950">Niche Scope:</strong> Strictly limited to Software Engineering, SaaS Architecture, AI/ML Workflows, Cloud/DevOps, or Web/Mobile Development.</li>
              <li><strong className="text-slate-950">Length &amp; Quality:</strong> Minimum 1,000+ words, deeply technical, highly actionable, and 100% human-written. AI-generated fluff or low-value content is rejected during technical review.</li>
              <li><strong className="text-slate-950">Link Allowance:</strong> Up to 1–2 permanent DoFollow links per post.</li>
              <li><strong className="text-slate-950">Publishing Style:</strong> Clean organic publication with zero “sponsored” or advertorial tags.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">4. Prohibited Niches &amp; Categories</h2>
            <p className="mb-5">We enforce a strict zero-tolerance policy for non-technical or restricted niches. We do not accept content or links in the following categories under any price point:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {prohibitedNiches.map((category) => (
                <div key={category} className="rounded-xl border border-red-100 bg-red-50 px-5 py-4 font-medium text-red-800">{category}</div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">5. Turnaround Time (TAT) &amp; Process</h2>
            <ol className="space-y-5">
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">1</span><span><strong className="text-slate-950">Submission / Pitch:</strong> Pitch 2–3 technical topics along with target URLs and anchor text, or submit a full draft to our queue at <a href="https://bridgehomies.com/blog/submit" className="font-medium text-indigo-600 hover:text-indigo-800">bridgehomies.com/blog/submit</a>.</span></li>
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">2</span><span><strong className="text-slate-950">Technical Review &amp; Publication:</strong> 2–3 business days for technical evaluation, formatting, and publication.</span></li>
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">3</span><span><strong className="text-slate-950">Verification &amp; Settlement:</strong> Link live confirmation is provided, the client verifies the link, and payment is processed via Wise, Payoneer, or Bank Transfer. Reciprocal links are verified in the same way.</span></li>
            </ol>
          </section>

          
        </div>
      </article>
    </main>
    <Footer />
    </>          
  );
}