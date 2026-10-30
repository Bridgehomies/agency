import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export type ServicePageData = {
  title: string;
  headline?: { lead: string; accent: string };
  eyebrow: string;
  description: string;
  outcomes: string[];
  scope: string[];
  related: { label: string; href: string }[];
};

export default function ServiceDetailPage({
  service,
}: {
  service: ServicePageData;
}) {
  const titleSplit = service.title.lastIndexOf(" ");
  const titleLead =
    service.headline?.lead ?? service.title.slice(0, titleSplit);
  const titleAccent =
    service.headline?.accent ?? service.title.slice(titleSplit + 1);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@id": "https://www.bridgehomies.com/#organization" },
    areaServed: "Worldwide",
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50 font-sans text-gray-900 selection:bg-purple-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <section className="relative flex min-h-[90vh] flex-col justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-48">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]" />
        <div className="pointer-events-none absolute right-[-12rem] top-24 h-[34rem] w-[34rem] rounded-full bg-purple-300/20 blur-3xl" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-8 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
                  {service.eyebrow}
                </span>
              </div>
              <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.9] tracking-tighter text-gray-900 md:text-8xl lg:text-[7rem]">
                <span className="block">{titleLead}</span>
                <span className="block bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500 bg-clip-text text-transparent">
                  {titleAccent}.
                </span>
              </h1>
            </div>
            <div className="pb-1 lg:col-span-4">
              <p className="text-lg font-medium leading-relaxed text-gray-600">
                {service.description}
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3 bg-gray-900 px-8 py-4 font-bold text-white transition-colors hover:bg-purple-600"
              >
                Discuss this service{" "}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col justify-between gap-6 border-b-2 border-gray-900 pb-8 md:mb-20 md:flex-row md:items-end">
            <h2 className="text-6xl font-black uppercase leading-none tracking-tighter text-gray-900 md:text-8xl">
              What <br />
              We Build.
            </h2>
            <p className="max-w-sm font-medium leading-relaxed text-gray-500">
              Services shaped around your requirements, existing systems, and
              delivery constraints.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {service.scope.map((item, index) => (
              <li
                key={item}
                className="group relative border-t border-gray-300 py-7 pl-6 transition-colors hover:border-purple-600 md:py-8"
              >
                <span className="absolute left-0 top-8 font-mono text-xs text-purple-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold uppercase leading-snug tracking-tight text-gray-900">
                  {item}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-gray-900 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
              How we work
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-6xl">
              Grounded in your workflow.
            </h2>
          </div>
          <div className="space-y-0">
            {service.outcomes.map((item, index) => (
              <div
                key={item}
                className="flex gap-6 border-t border-white/15 py-7 md:py-9"
              >
                <span className="font-mono text-sm text-purple-300">
                  0{index + 1}
                </span>
                <p className="max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-gray-800 bg-gray-900 px-4 pb-20 pt-2 text-white sm:px-6 md:pb-24 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
              Related services
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {service.related.map((item) => (
                <Link
                  key={item.href}
                  className="text-sm text-white/65 underline decoration-white/25 underline-offset-4 transition-colors hover:text-purple-300"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            className="w-fit border border-white/30 px-6 py-3 font-bold text-white transition-colors hover:border-purple-400 hover:bg-purple-600"
          >
            Talk to our team ↗
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
