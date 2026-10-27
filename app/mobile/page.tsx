// app/mobile/page.tsx
// Server Component so metadata and JSON-LD are rendered with the page.

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkSection from "@/components/home/work-section";

const pageTitle = "Mobile App Development Services | Bridge Homies";
const pageDescription =
  "Build Android, iOS, and cross-platform mobile apps for customer, employee, field, delivery, booking, commerce, finance, and community workflows.";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: "https://www.bridgehomies.com/mobile",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://www.bridgehomies.com/mobile",
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mobile App Development Services Bridge Homies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.bridgehomies.com/mobile/#webpage",
      url: "https://www.bridgehomies.com/mobile",
      name: pageTitle,
      description: pageDescription,
      inLanguage: "en-US",
      isPartOf: { "@id": "https://www.bridgehomies.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.bridgehomies.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mobile App Development",
            item: "https://www.bridgehomies.com/mobile",
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.bridgehomies.com/mobile/#service",
      name: "Mobile App Development Services",
      alternateName: [
        "iOS App Development",
        "Android App Development",
        "Cross-Platform Mobile Development",
        "Enterprise Mobile Software",
      ],
      provider: { "@id": "https://www.bridgehomies.com/#organization" },
      url: "https://www.bridgehomies.com/mobile",
      description:
        "Android, iOS, and cross-platform mobile applications for customer, employee, field-worker, delivery, booking, e-commerce, finance, and community use cases.",
      serviceType: "Mobile App Development",
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.bridgehomies.com/mobile/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of mobile applications can you build?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Projects can include customer-facing, employee, field-worker, delivery, booking, e-commerce, marketplace, finance, social, community, and dashboard applications.",
          },
        },
        {
          "@type": "Question",
          name: "Can mobile apps connect to APIs and existing systems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mobile apps can connect to APIs, business systems, and third-party services when required by the project. Integration scope and synchronization behavior are defined for each project.",
          },
        },
        {
          "@type": "Question",
          name: "Can you maintain or upgrade an existing mobile app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Mobile app maintenance and upgrades can be scoped around the existing application, its platform, and the changes required.",
          },
        },
      ],
    },
  ],
};

// ─── Page (Server Component) ──────────────────────────────────────────────────

export default function MobilePage() {
  return (
    <main className="font-sans bg-gray-50 text-gray-900 selection:bg-purple-900 selection:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      {/* ── 1. EDITORIAL HERO ────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">
                  Mobile Engineering
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900 uppercase">
                Mobile App{" "}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500">
                  Development.
                </span>
              </h1>

              <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-500 tracking-tight">
                Android, iOS, and cross-platform applications for customer, employee, and field-team workflows.
              </h2>
            </div>

            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                We build <strong className="text-gray-900">mobile apps</strong> for Android, iOS, and cross-platform projects, including customer, employee, field-worker, delivery, booking, commerce, finance, and community applications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-none overflow-hidden transition-all hover:bg-purple-600"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Building
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE BREAKER ────────────────────────────────────────────────── */}
      <section
        className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
          alt="Mobile app development iOS and Android interface engineering"
          className="object-cover w-full h-full opacity-60 filter grayscale hover:scale-105 transition-transform duration-[20s] ease-out"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
      </section>

      {/* ── 2. SERVICES GRID ─────────────────────────────────────────────── */}
      <section id="services" className="pt-16 pb-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              What <br /> We Build.
            </h2>
            <div className="text-right mt-8 md:mt-0 max-w-sm">
              <p className="text-gray-500 font-medium">
                Mobile applications shaped around the users, devices, and workflows your product needs to support.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {[
              {
                num: "01",
                title: "iOS Applications",
                desc: "Develop iOS applications for customer-facing products, employees, field workers, and business workflows.",
              },
              {
                num: "02",
                title: "Android Applications",
                desc: "Develop Android applications for customer-facing products, employees, field workers, and business workflows.",
              },
              {
                num: "03",
                title: "Cross-Platform Applications",
                desc: "Build cross-platform mobile applications. React Native and Flutter are available options when they fit the project requirements.",
              },
              {
                num: "04",
                title: "Business and Employee Apps",
                desc: "Support employee and field-worker workflows with mobile access to tasks, records, and operational tools.",
              },
              {
                num: "05",
                title: "Mobile App Maintenance",
                desc: "Maintain and upgrade existing mobile applications as requirements, devices, and connected services change.",
              },
            ].map((service, index) => (
              <div
                key={service.num}
                className={`relative group ${index % 2 !== 0 ? "md:mt-24" : ""}`}
              >
                <div className="text-7xl font-black text-gray-200 absolute -top-12 -left-6 z-0 transition-colors group-hover:text-purple-100 select-none">
                  {service.num}
                </div>
                <div className="relative z-10 border-l border-gray-300 pl-6 group-hover:border-purple-600 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BENTO / ABOUT ─────────────────────────────────────────────── */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-gray-900 text-white p-12 md:p-16 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-6">
                  The Mobile Standard
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                  Mobile products. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                    Built for your workflows.
                  </span>
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-12">
                  Bridge Homies develops mobile applications around product requirements and user workflows. Projects can include customer-facing apps, employee and field-worker tools, delivery, booking, commerce, finance, and community applications.
                </p>
              </div>
              <Link
                href="/aboutus"
                className="relative z-10 inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors w-fit"
              >
                Meet the Engineers{" "}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gray-100 flex-1 relative overflow-hidden group min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=800&auto=format&fit=crop"
                  alt="Mobile application interface displayed on a smartphone"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gray-900/40" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                    Mobile Interfaces
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Interface planning for Android, iOS, and cross-platform products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorkSection />

      {/* ── 4. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 sticky top-32 self-start">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">
                  Inquiries
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-8">
                Clear <br /> Context.
              </h2>
              <p className="text-gray-500 font-medium max-w-sm mb-12">
                Common questions about planning and building Android, iOS, and cross-platform applications.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <div className="border-t-2 border-gray-900">
                {[
                  {
                    q: "What types of mobile applications can you build?",
                    a: "Projects can include customer-facing, employee, field-worker, delivery, booking, e-commerce, marketplace, finance, social, community, and dashboard applications.",
                  },
                  {
                    q: "Can mobile apps connect to APIs and existing systems?",
                    a: "Mobile apps can connect to APIs, business systems, and third-party services when required by the project. AI features can be considered where they fit the product and workflow.",
                  },
                  {
                    q: "Can you maintain or upgrade an existing mobile app?",
                    a: "Yes. Mobile app maintenance and upgrades can be scoped around the existing application, its platform, and the changes required.",
                  },
                ].map((faq, i) => (
                  <div key={i} className="py-10 border-b border-gray-200 group">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight group-hover:text-purple-600 transition-colors duration-300">
                      {faq.q}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. INTERNAL LINKS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">
            Explore Ecosystem
          </h2>

          <nav aria-label="Internal service links">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
              {[
                { label: "Website Development", link: "/webdev" },
                { label: "ML Engineering Services", link: "/ai-ml-development" },
                { label: "Enterprise Software", link: "/software" },
                { label: "UI/UX Design", link: "/ui-ux-design" },
              ].map((item) => (
                <Link
                  key={item.link}
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
          </nav>

          <div className="pt-8 border-t border-gray-100 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase leading-relaxed">
              Mobile platform, API, and release requirements are assessed as part of project planning.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
