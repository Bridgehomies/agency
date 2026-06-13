"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkSection from "@/components/home/work-section";
import Link from "next/link";

const StatsCounter: React.FC = () => {
  const animateCounter = (id: string, endValue: number, suffix: string = "") => {
    const element = document.getElementById(id);
    if (!element) return;
    let current = 0;
    const increment = Math.ceil(endValue / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        clearInterval(timer);
        element.textContent = `${endValue}${suffix}`;
      } else {
        element.textContent = `${current}${suffix}`;
      }
    }, 30);
  };

  useEffect(() => {
    animateCounter("counter-projects", 20, "+");
    animateCounter("counter-feedback", 98, "%");
    animateCounter("counter-team", 15, "+");
    animateCounter("counter-launched", 2025, "");
  }, []);

  return (
    <div className="py-12 border-y border-gray-200/60 bg-gray-50/50 backdrop-blur-xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-8 divide-x divide-gray-200/50">
          {[
            { id: "counter-projects", label: "Design Projects Completed" },
            { id: "counter-feedback", label: "Client Satisfaction" },
            { id: "counter-team", label: "Experienced Designers" },
            { id: "counter-launched", label: "Founded" },
          ].map((stat, i) => (
            <div key={i} className={`flex-1 ${i !== 0 ? 'pl-8' : ''}`}>
              <div id={stat.id} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-1">0</div>
              <div className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
    <main className="font-sans bg-gray-50 text-gray-900 selection:bg-purple-900 selection:text-white overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">Premium Design Studio</span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900 uppercase">
                Design <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500">
                  The Experience.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                As a leading <strong className="text-gray-900">software developer company</strong>, we deliver user-first <strong className="text-gray-900">UI/UX design</strong> for website development, SaaS platforms, web apps, and enterprise software.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-none overflow-hidden transition-all hover:bg-purple-600">
                  <span className="relative z-10 flex items-center gap-2">
                    Prototype Now
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <StatsCounter />

      {/* FULL-WIDTH ABSTRACT DESIGN IMAGE BREAKER */}
      <section className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
          alt="Abstract geometric design representing UI/UX architecture and enterprise software"
          className="object-cover w-full h-full opacity-60 filter grayscale hover:scale-105 transition-transform duration-[20s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
      </section>

      {/* 2. STAGGERED "WHAT WE BUILD" */}
      <section id="services" className="pt-16 pb-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              How <br /> We Design.
            </h2>
            <div className="text-right mt-8 md:mt-0 max-w-sm">
              <p className="text-gray-500 font-medium">Flawless <strong className="text-gray-900">UI/UX design</strong> bridging the gap between human psychology and complex digital architectures.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {[
              {
                num: "01",
                title: "SaaS & Web Apps",
                desc: "We design multi-tenant SaaS platforms and dynamic web apps focused on intuitive onboarding, low churn, and seamless user retention.",
              },
              {
                num: "02",
                title: "Enterprise Software",
                desc: "Simplifying the complex. We transform dense, feature-heavy enterprise software into clean, accessible, and highly efficient interfaces.",
              },
              {
                num: "03",
                title: "Website Development UI",
                desc: "Bespoke website development UI/UX that prioritizes conversion rates, lightning-fast load perception, and immersive brand storytelling.",
              },
              {
                num: "04",
                title: "Prototyping & Wireframing",
                desc: "We test early. High-fidelity wireframes and interactive prototypes allow us to validate user journeys before a single line of code is written.",
              },
              {
                num: "05",
                title: "Design Systems",
                desc: "Scalable component libraries built in Figma, ensuring absolute consistency across your entire product ecosystem as your software grows.",
              }
            ].map((service, index) => (
              <div key={index} className={`relative group ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
                <div className="text-7xl font-black text-gray-200 absolute -top-12 -left-6 z-0 transition-colors group-hover:text-purple-100">
                  {service.num}
                </div>
                <div className="relative z-10 border-l border-gray-300 pl-6 group-hover:border-purple-600 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID / ABOUT SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left large bento box */}
            <div className="lg:col-span-8 bg-gray-900 text-white p-12 md:p-16 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-6">The Design Standard</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                  Design-Driven <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">Software Developer Company</span>.
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-12">
                  We don't just make things look pretty. Bridge Homies is a <strong className="text-white">software developer company</strong> with a militant design-first philosophy. We create <strong className="text-white">UI/UX design</strong> for website development, SaaS platforms, and enterprise software that users actually enjoy navigating—eliminating friction and driving measurable business impact.
                </p>
              </div>
              <a href="#work" className="relative z-10 inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors w-fit">
                View Our Portfolio <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>

            {/* Right side bento box - Image Integration */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gray-100 flex-1 relative overflow-hidden group min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=464&auto=format&fit=crop"
                  alt="Minimalist UI UX Wireframing"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gray-900/40"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">User-Centric</h3>
                  <p className="text-gray-200 text-sm">Every pixel is mapped to user psychology.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <WorkSection />

      {/* 4. EDITORIAL FAQ SECTION */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* FAQ Left Column */}
            <div className="lg:col-span-5 sticky top-32 self-start">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">Inquiries</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-8">
                Clear <br /> Context.
              </h2>
              <p className="text-gray-500 font-medium max-w-sm mb-12">
                Understanding the impact of world-class UI/UX design on enterprise scale and retention.
              </p>
            </div>

            {/* FAQ Right Column - Reading Grid */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="border-t-2 border-gray-900">

                {[
                  {
                    q: "Why is UI/UX design important for software development?",
                    a: "Because a product is only as good as its usability. UI/UX design directly dictates how users interact with your website, SaaS, web apps, or enterprise software. Superior design builds instant trust, drastically reduces customer churn, and directly increases conversion rates."
                  },
                  {
                    q: "How does UI/UX impact enterprise software specifically?",
                    a: "Enterprise software is notoriously cluttered. By applying strict UI/UX methodologies, we streamline complex workflows, reduce employee training times, and mitigate costly user errors, ultimately saving organizations thousands of hours in lost productivity."
                  },
                  {
                    q: "Do you offer UI/UX for both new products and redesigns?",
                    a: "Absolutely. Whether we are architecting a SaaS platform from scratch or overhauling legacy enterprise software to meet modern aesthetic and functional standards, our software developer company handles the entire lifecycle."
                  }
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

      {/* 5. MINIMALIST INTERNAL LINKS & EXTERNAL CITATION */}
      <section className="py-24 bg-white border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">Explore Ecosystem</h2>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {[
              { label: "Website Development", link: "/webdev" },
              { label: "AI/ML Engineering", link: "/ai-ml-development" },
              { label: "Enterprise Software", link: "/software" },
              { label: "Mobile Development", link: "/mobile" },
            ].map((item, idx) => (
              <Link key={idx} href={item.link} className="group flex items-center space-x-2 text-xl font-bold text-gray-400 hover:text-gray-900 transition-colors">
                <span>{item.label}</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-600 text-2xl leading-none">↗</span>
              </Link>
            ))}
          </div>

          {/* External Link with Premium Styling */}
          <div className="pt-8 border-t border-gray-100 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase leading-relaxed">
              Our UI/UX architecture process strictly follows <br className="hidden md:block" />
              <a
                href="https://www.nngroup.com/articles/ten-usability-heuristics/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 border-b border-gray-900 pb-0.5 hover:text-purple-600 hover:border-purple-600 transition-all duration-300"
              >
                Nielsen Norman Group's 10 Usability Heuristics
              </a>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
} 