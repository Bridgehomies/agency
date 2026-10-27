import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: { absolute: "Software Product Discovery & Planning | Bridge Homies" },
  description:
    "Define software products with Bridge Homies through product discovery, workflow mapping, requirements, feature priorities, and MVP planning.",
  alternates: { canonical: "https://www.bridgehomies.com/design" },
  openGraph: {
    title: "Software Product Discovery & Planning | Bridge Homies",
    description:
      "Software product discovery and planning, including workflow mapping, requirements, feature priorities, and MVP definition.",
    url: "https://www.bridgehomies.com/design",
    siteName: "Bridge Homies",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bridge Homies software product design" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Software Product Discovery and Planning",
  url: "https://www.bridgehomies.com/design",
  provider: { "@id": "https://www.bridgehomies.com/#organization" },
  serviceType: "Product Discovery and Planning",
  description:
    "Software product discovery and planning, including workflow mapping, requirements, feature priorities, and MVP definition.",
  areaServed: "Worldwide",
};

const stages = [
  {
    title: "Product goals and constraints",
    description:
      "Clarify the product’s users, business goals, and delivery constraints before defining its scope.",
  },
  {
    title: "Workflow mapping",
    description:
      "Map the business processes and user tasks the software needs to support.",
  },
  {
    title: "Requirements and feature priorities",
    description:
      "Turn agreed workflows into product requirements and prioritize features against the project goals.",
  },
  {
    title: "MVP scope and next steps",
    description:
      "Define an initial product scope and identify the decisions and dependencies that guide delivery planning.",
  },
];

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <section className="px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">Software product discovery</p>
          <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">Define the product before designing its screens</h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-600">
            Bridge Homies helps teams clarify what a software product needs to do before interface design and engineering begin. We map workflows, define requirements, prioritize features, and shape an initial product scope.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-violet-700">Discuss product discovery</Link>
            <Link href="/ui-ux-design" className="border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:border-violet-700 hover:text-violet-700">Explore UI/UX design</Link>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">From business problem to product scope</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Product discovery connects a business problem with the workflows, requirements, and features a software product should support. Interface layouts and prototypes are handled separately through our <Link className="font-semibold text-violet-700 underline" href="/ui-ux-design">UI/UX design service</Link>.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {stages.map((stage, index) => (
              <article key={stage.title} className="border-t border-slate-300 pt-6">
                <p className="text-sm font-semibold text-violet-700">0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold">{stage.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{stage.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Product definition connected to software delivery</h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Bridge Homies offers product discovery alongside technical consulting, custom software, web development, mobile development, and AI/ML engineering. This lets teams discuss product scope in the context of implementation needs.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/software" className="border border-slate-200 p-5 font-semibold hover:border-violet-600">Custom software development →</Link>
            <Link href="/webdev" className="border border-slate-200 p-5 font-semibold hover:border-violet-600">Web development →</Link>
            <Link href="/ai-ml-development" className="border border-slate-200 p-5 font-semibold hover:border-violet-600">AI/ML development →</Link>
          </div>
        </div>
      </section>
      <section className="bg-slate-900 px-6 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold md:text-5xl">Clarifying a software product?</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">Share the business problem, workflows, and constraints you need to address. We can discuss product requirements, feature priorities, and how the scope relates to your software build.</p>
          <Link href="/contact" className="mt-8 inline-block bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-violet-200">Contact Bridge Homies</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
