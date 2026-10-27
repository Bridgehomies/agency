import type { Metadata } from "next";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  alternates: { canonical: "/blog-terms" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  title: "Editorial Publishing Policy | Bridge Homies",
  description:
    "Submission criteria, editorial review, paid-placement disclosures, and current payment terms for Bridge Homies.",
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
            Editorial Publishing Policy
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
              <a href="https://www.bridgehomies.com/blog/submit" className="font-medium text-indigo-600 hover:text-indigo-800">
                bridgehomies.com/blog/submit
              </a>
            </p>
            <p><strong>Effective Date:</strong> {effectiveDate}</p>
          </div>
        </header>

        <div className="space-y-14 text-base leading-8 text-slate-700">
          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              1. Paid Editorial Placement
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Service</th>
                    <th className="px-5 py-4 font-semibold">Fee</th>
                    <th className="px-5 py-4 font-semibold">Conditions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="px-5 py-4 font-semibold text-slate-900">Paid editorial review</td>
                    <td className="px-5 py-4 font-bold text-indigo-600">Shown before confirmation</td>
                    <td className="px-5 py-4 text-slate-600">Subject to editorial review and acceptance; publication is not guaranteed.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">2. Payment Terms &amp; Policy</h2>
            <ul className="space-y-4">
              <li><strong className="text-slate-950">Payment Timing:</strong> The payment plan and amount displayed in the submission form apply to that request.</li>
              <li><strong className="text-slate-950">Accepted Payment Methods:</strong> Wise, Payoneer, or Direct Bank Transfer.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">3. Editorial &amp; Content Guidelines</h2>
            <p className="mb-5">We review submissions for relevance, originality, accuracy, and usefulness to readers:</p>
            <ul className="space-y-4">
              <li><strong className="text-slate-950">Niche Scope:</strong> Strictly limited to Software Engineering, SaaS Architecture, AI/ML Workflows, Cloud/DevOps, or Web/Mobile Development.</li>
              <li><strong className="text-slate-950">Length &amp; Quality:</strong> Articles should be original, technically useful, and at least 1,000 words.</li>
              <li><strong className="text-slate-950">External Links:</strong> Links must support the reader’s understanding and may be edited or removed during review. Paid-placement links are disclosed and qualified as sponsored.</li>
              <li><strong className="text-slate-950">Disclosure:</strong> Paid articles are identified as sponsored content, and their outbound links are marked with <code>rel="sponsored"</code>.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">4. Prohibited Niches &amp; Categories</h2>
            <p className="mb-5">We do not accept content or links in the following restricted categories:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {prohibitedNiches.map((category) => (
                <div key={category} className="rounded-xl border border-red-100 bg-red-50 px-5 py-4 font-medium text-red-800">{category}</div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">5. Turnaround Time (TAT) &amp; Process</h2>
            <ol className="space-y-5">
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">1</span><span><strong className="text-slate-950">Submit for Review:</strong> Submit a complete draft to our editorial queue at <a href="https://www.bridgehomies.com/blog/submit" className="font-medium text-indigo-600 hover:text-indigo-800">bridgehomies.com/blog/submit</a>. External links must be relevant to the article.</span></li>
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">2</span><span><strong className="text-slate-950">Editorial Review:</strong> We assess relevance, originality, accuracy, and usefulness. Publication is not guaranteed, and review times may vary.</span></li>
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">3</span><span><strong className="text-slate-950">Payment and Disclosure:</strong> If accepted as a paid placement, the applicable fee and payment timing shown at submission apply. The article is identified as sponsored, and its outbound links are qualified as sponsored.</span></li>
            </ol>
          </section>

          
        </div>
      </article>
    </main>
    <Footer />
    </>          
  );
}
