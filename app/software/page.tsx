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
    animateCounter("counter-projects", 30, false);
    animateCounter("counter-feedback", 97, true);
    animateCounter("counter-team", 15, false);
    animateCounter("counter-launched", 2024, false);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div id="counter-projects" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Software Projects Delivered</div>
          </div>
          <div className="p-6">
            <div id="counter-feedback" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="p-6">
            <div id="counter-team" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Software Developers</div>
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
      "@id": "https://bridgehomies.com/software/#webpage",
      url: "https://bridgehomies.com/software",
      name: "Custom Enterprise Software & SaaS Development | Bridge Homies Software Company",
      description:
        "Bridge Homies is a software company delivering custom enterprise software, SaaS platforms, and web apps. Our software developer team builds maintainable, scalable solutions with AI automation.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
          { "@type": "ListItem", position: 2, name: "Custom Software Development", item: "https://bridgehomies.com/software" },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/software/#service",
      name: "Custom Enterprise Software Development",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      url: "https://bridgehomies.com/software",
      description:
        "End-to-end custom enterprise software, SaaS, and web apps tailored to your business workflows. Bridge Software — built for maintainability, performance, and long-term scale.",
      serviceType: "Custom Software Development",
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why choose Bridge Homies as your software company?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bridge Homies is a software company with expertise in enterprise software, SaaS, and AI automation. Our software developer team builds scalable, production-ready solutions that grow with your business.",
          },
        },
        {
          "@type": "Question",
          name: "What is bridge software development?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bridge software development refers to our approach of building digital bridges between your business problems and intelligent software solutions — including enterprise software, SaaS, web apps, and AI automation.",
          },
        },
      ],
    },
  ],
};

export default function SoftwarePage() {
  return (
    <main className="font-sans bg-gray-50 text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              {/* H1 — primary keywords */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Custom{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Enterprise Software &amp; SaaS
                </span>{" "}
                by Bridge Software Company
              </h1>
              {/* First paragraph */}
              <p className="text-lg text-gray-600 mb-8">
                Bridge Homies is a software company delivering custom enterprise software, SaaS platforms,
                web apps, and AI automation solutions. Our software developer team uses Python, Django, and
                modern frameworks to build bridge software that solves real business problems at scale.
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
                  src="https://images.unsplash.com/photo-1649877508777-1554357604eb?q=80&w=580&auto=format&fit=crop"
                  alt="Bridge software company building enterprise software and SaaS with Python"
                  className="rounded-2xl shadow-2xl border-8 border-blue-50 transform transition duration-500 hover:scale-105 hover:shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* About */}
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* H2 */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise Software &amp; SaaS Built by a Software Company That Ships
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-6">From Code to Impact</h3>
              <p className="text-gray-600 mb-6">
                Bridge Homies began as a small team of software developers solving real-world problems with Python.
                Today we're a full-service software company delivering enterprise software, SaaS, web apps, and
                AI automation to clients worldwide. Our bridge software philosophy: understand the problem first,
                then build the right solution.
              </p>
              <p className="text-gray-600 mb-6">
                Every software developer on our team is committed to clean code, fast delivery, and long-term
                maintainability — so your enterprise software stays valuable for years to come.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-200 rounded-lg"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80"
                  alt="Software developer team at Bridge Homies software company"
                  className="relative rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Software Developer Services — Enterprise, SaaS &amp; AI Automation
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              Our software company delivers enterprise software, SaaS, web apps, and AI automation — all
              built for scalability, performance, and maintainability.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Enterprise Software",
                desc: "Tailored enterprise software solutions built with Python and Django to meet your specific business requirements.",
                items: ["Scalable Architecture", "Cross-Platform Compatibility", "API Integration"],
              },
              {
                title: "SaaS Development",
                desc: "End-to-end SaaS platforms designed for growth — from MVP to enterprise-grade web apps.",
                items: ["Multi-Tenant Architecture", "Subscription Billing", "Usage Analytics"],
              },
              {
                title: "AI Automation",
                desc: "Automate repetitive tasks and streamline workflows with AI automation built into your enterprise software.",
                items: ["Task Automation", "Data Processing Pipelines", "Intelligent Workflows"],
              },
              {
                title: "Data Science & Analytics",
                desc: "Unlock insights from your data with our software developer team's data science capabilities.",
                items: ["Predictive Modelling", "Statistical Analysis", "Data Visualisation"],
              },
              {
                title: "API Development & Integration",
                desc: "Build and integrate robust APIs to connect your enterprise software and streamline data exchange.",
                items: ["RESTful APIs", "Third-Party Integrations", "Microservices Architecture"],
              },
              {
                title: "Security & Maintenance",
                desc: "Keep your enterprise software secure and up-to-date with our ongoing maintenance services.",
                items: ["Regular Updates", "Vulnerability Assessments", "Performance Monitoring"],
              },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{s.desc}</p>
                <ul className="text-gray-600 space-y-1 text-sm">
                  {s.items.map((item, j) => <li key={j}>✓ {item}</li>)}
                </ul>
              </div>
            ))}
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
            <Link href="/ai-ml-development" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">AI ML Engineering</div>
              <div className="text-xs text-gray-500 mt-1">Machine Learning Agency</div>
            </Link>
            <Link href="/webdev" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Website Development</div>
              <div className="text-xs text-gray-500 mt-1">Next.js &amp; React</div>
            </Link>
            <Link href="/mobile" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Mobile Development</div>
              <div className="text-xs text-gray-500 mt-1">iOS &amp; Android Apps</div>
            </Link>
            <Link href="/products" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Our Products</div>
              <div className="text-xs text-gray-500 mt-1">FBR ERP Software</div>
            </Link>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            Our software developer team follows{" "}
            <a
              href="https://peps.python.org/pep-0008/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              PEP 8 Python coding standards
            </a>{" "}
            to ensure clean, maintainable enterprise software.
          </p>
        </div>
      </section>

      <WorkSection />

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Why choose Python for enterprise software?
              </h3>
              <p className="text-gray-600">
                Python is a versatile, high-performance language ideal for enterprise software, SaaS, and AI automation.
                Our software developer team uses Python and Django to build scalable, maintainable bridge software solutions.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Does Bridge Homies build SaaS products?
              </h3>
              <p className="text-gray-600">
                Yes. As a software company, Bridge Homies designs and builds SaaS platforms from scratch —
                covering architecture, development, deployment, and ongoing maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}