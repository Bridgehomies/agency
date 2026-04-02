// ============================================================
// FILE: app/ui-ux-design/page.tsx
// ============================================================
"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkSection from "@/components/work-section";
import Link from "next/link";

const StatsCounter: React.FC = () => {
  const animateCounter = (id: string, endValue: number, isPercentage: boolean = false) => {
    const element = document.getElementById(id);
    if (!element) return;
    let current = 0;
    const increment = Math.ceil(endValue / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        clearInterval(timer);
        element.textContent = isPercentage ? `${endValue}%` : `${endValue}+`;
      } else {
        element.textContent = isPercentage ? `${current}%` : `${current}+`;
      }
    }, 30);
  };

  useEffect(() => {
    animateCounter("counter-projects", 20, false);
    animateCounter("counter-feedback", 98, true);
    animateCounter("counter-team", 15, false);
    animateCounter("counter-launched", 2024, false);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div id="counter-projects" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Design Projects Completed</div>
          </div>
          <div className="p-6">
            <div id="counter-feedback" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="p-6">
            <div id="counter-team" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Experienced Designers</div>
          </div>
          <div className="p-6">
            <div id="counter-launched" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0</div>
            <div className="text-gray-600">Launched in</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://bridgehomies.com/ui-ux-design/#webpage",
      url: "https://bridgehomies.com/ui-ux-design",
      name: "UI/UX Design Services for Web Apps, SaaS & Enterprise Software | Bridge Homies",
      description:
        "Bridge Homies delivers user-first UI/UX design for website development, SaaS platforms, web apps, and enterprise software. A software developer company that designs for conversion.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
          { "@type": "ListItem", position: 2, name: "UI/UX Design", item: "https://bridgehomies.com/ui-ux-design" },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/ui-ux-design/#service",
      name: "UI/UX Design",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      url: "https://bridgehomies.com/ui-ux-design",
      description:
        "User-first UI/UX design for website development, SaaS, web apps, and enterprise software. Bridge Homies prototypes fast, tests early, and ships interfaces users love.",
      serviceType: "UI/UX Design",
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why is UI/UX design important for software development?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "UI/UX design directly impacts how users interact with your website, SaaS, web apps, or enterprise software. Good design builds trust, reduces churn, and increases conversions.",
          },
        },
      ],
    },
  ],
};

export default function UiUxPage() {
  return (
    <main className="font-sans bg-gray-50 text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              {/* H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                UI/UX Design for{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  SaaS, Web Apps &amp; Enterprise Software
                </span>
              </h1>
              {/* First paragraph */}
              <p className="text-lg text-gray-600 mb-8">
                Bridge Homies is a software developer company delivering user-centred UI/UX design for website
                development, SaaS platforms, web apps, and enterprise software. We prototype fast, test early,
                and ship interfaces that drive engagement, conversion, and long-term retention.
              </p>
              <div className="flex space-x-4">
                <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition">
                  Start Your Project
                </a>
                <a href="#work" className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                  View Our Work
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-50 z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
                {/* Image alt */}
                <img
                  src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=464&auto=format&fit=crop"
                  alt="UI/UX design services for web apps, SaaS, and enterprise software by Bridge Homies"
                  className="rounded-2xl shadow-2xl border-8 border-blue-50 transform transition duration-500 hover:scale-105 hover:shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />

      <section id="about" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* H2 */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Design-Driven Website Development &amp; Software Company
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-6">From Ideas to Impactful Designs</h3>
              <p className="text-gray-600 mb-6">
                Bridge Homies is a software developer company with a design-first philosophy. We create UI/UX
                for website development projects, SaaS platforms, web apps, and enterprise software that users
                actually enjoy using — not just tolerate.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-200 rounded-lg"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80"
                  alt="Software developer company UI/UX design team"
                  className="relative rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interlinks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            More Services from Our Software Company
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/webdev" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Website Development</div>
              <div className="text-xs text-gray-500 mt-1">Next.js &amp; React</div>
            </Link>
            <Link href="/ai-ml-development" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">AI ML Engineering</div>
              <div className="text-xs text-gray-500 mt-1">Machine Learning Agency</div>
            </Link>
            <Link href="/software" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Enterprise Software</div>
              <div className="text-xs text-gray-500 mt-1">SaaS &amp; Web Apps</div>
            </Link>
            <Link href="/mobile" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Mobile Development</div>
              <div className="text-xs text-gray-500 mt-1">iOS &amp; Android</div>
            </Link>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            Our UI/UX process follows{" "}
            <a
              href="https://www.nngroup.com/articles/ten-usability-heuristics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Nielsen Norman Group's 10 Usability Heuristics
            </a>
            .
          </p>
        </div>
      </section>

      <WorkSection />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Why is UI/UX design important for my business?
              </h3>
              <p className="text-gray-600">
                UI/UX design is crucial for website development, SaaS, and enterprise software because it directly
                impacts how users interact with your product. Good design builds trust, enhances satisfaction, and
                drives conversions — critical for any software company.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}