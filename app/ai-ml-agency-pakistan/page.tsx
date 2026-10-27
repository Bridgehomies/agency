import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const pageUrl = "https://www.bridgehomies.com/ai-ml-agency-pakistan";
const title = "AI Development Company in Pakistan | Bridge Homies";
const description =
  "Lahore-based AI development company in Pakistan. Bridge Homies builds AI/ML software, RAG applications, LLM integrations, and workflow automation.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI development services in Pakistan from Bridge Homies",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: "en-PK",
      isPartOf: { "@id": "https://www.bridgehomies.com/#website" },
      about: { "@id": `${pageUrl}/#service` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bridgehomies.com/" },
          { "@type": "ListItem", position: 2, name: "AI Development Company in Pakistan", item: pageUrl },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}/#service`,
      name: "AI Development Services",
      serviceType: [
        "AI and machine learning engineering",
        "Generative AI and LLM integration",
        "RAG application development",
        "AI workflow automation",
      ],
      provider: { "@id": "https://www.bridgehomies.com/#organization" },
      url: pageUrl,
      areaServed: [
        { "@type": "City", name: "Lahore" },
        { "@type": "Country", name: "Pakistan" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      description,
    },
  ],
};

const capabilities = [
  {
    title: "Generative AI and LLM integration",
    body: "Connect language models with applications, APIs, and business data. Scope can include assistants, document search, and RAG workflows based on the use case.",
  },
  {
    title: "AI and machine-learning engineering",
    body: "Assess model approaches, data, evaluation needs, and system constraints, then build the components that fit the product and its operating environment.",
  },
  {
    title: "AI workflow automation",
    body: "Identify suitable tasks such as document processing, data extraction, classification, or summarization, with integrations and human review where needed.",
  },
  {
    title: "AI features in business software",
    body: "Integrate AI capabilities into existing software, portals, and internal workflows through APIs and the surrounding application engineering.",
  },
];

export default function AiMlAgencyPakistan() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-muted/30 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="bg-grid-pattern absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Lahore, Pakistan · Serving teams internationally
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              AI development company in Pakistan
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Bridge Homies is a Lahore-based software engineering and AI company. We help businesses plan and build AI/ML software, RAG applications, LLM integrations, and workflow automation around their data and existing systems.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
                Discuss an AI project
              </Link>
              <Link href="/ai-ml-development" className="rounded-md border border-border bg-background px-6 py-3 font-semibold hover:border-primary hover:text-primary">
                Explore AI/ML engineering services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">AI development shaped around the use case</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Start with the workflow, users, available data, and systems involved. From there, we can assess whether an AI component is appropriate, how it should be evaluated, and what application or integration work it requires.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {capabilities.map((item) => (
              <article key={item.title} className="rounded-xl border border-border bg-card p-7 sm:p-8">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">A practical starting point</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">From discovery to a scoped engineering plan</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>We review the problem, data access, current software, and constraints before recommending a model or integration pattern.</p>
            <p>Project work can include technical discovery, architecture, model and RAG components, APIs, application development, evaluation, and deployment planning. The scope depends on what the system needs.</p>
            <p>For the detailed service scope, see our <Link href="/ai-ml-development" className="font-semibold text-primary underline underline-offset-4">ML model engineering and AI/ML services</Link>. For a broader software project, visit <Link href="/software" className="font-semibold text-primary underline underline-offset-4">custom software development</Link>.</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Planning an AI project in Pakistan?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Share the workflow you want to improve, the systems involved, and what you need the software to do. We can discuss a suitable next step with our Lahore-based team.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
            Contact Bridge Homies
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
