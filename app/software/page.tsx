"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkSection from "@/components/work-section";
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
    animateCounter("counter-projects", 30, "+");
    animateCounter("counter-feedback", 97, "%");
    animateCounter("counter-team", 15, "+");
    animateCounter("counter-launched", 2024, "");
  }, []);

  return (
    <div className="py-12 border-y border-gray-200/60 bg-gray-50/50 backdrop-blur-xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-8 divide-x divide-gray-200/50">
          {[
            { id: "counter-projects", label: "Enterprise Projects" },
            { id: "counter-feedback", label: "Client Retention" },
            { id: "counter-team", label: "Software Engineers" },
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
      "@id": "https://bridgehomies.com/software/#webpage",
      url: "https://bridgehomies.com/software",
      name: "Premium Custom Software Development | Bridge Homies Software House",
      description:
        "Bridge Homies is an elite software house engineering scalable enterprise software solutions, custom software development, and AI systems. Your search for premium software houses near me ends here.",
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/software/#service",
      name: "Enterprise Software Solutions & Software Engineering",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      url: "https://bridgehomies.com/software",
      description:
        "Architecting elite custom software development and enterprise software solutions tailored to your complex workflows.",
      serviceType: "Custom Software Development",
      areaServed: "Worldwide",
    },
  ],
};

export default function SoftwarePage() {
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
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">Premium Software House</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900 uppercase">
                Engineer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500">
                  The Future.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                We provide exclusive <strong className="text-gray-900">custom software development</strong> and <strong className="text-gray-900">enterprise software solutions</strong> designed for market leaders.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-none overflow-hidden transition-all hover:bg-purple-600">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Building
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </span>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* FULL-WIDTH ARCHITECTURAL IMAGE BREAKER */}
      <section className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Abstract structural architecture representing scale and enterprise software solutions" 
          className="object-cover w-full h-full opacity-60 filter grayscale hover:scale-105 transition-transform duration-[20s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
      </section>

      {/* 2. STAGGERED "WHAT WE BUILD" */}
      <section id="services" className="pt-16 pb-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-900 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              What <br /> We Build.
            </h2>
            <div className="text-right mt-8 md:mt-0 max-w-sm">
              <p className="text-gray-500 font-medium">Bespoke <strong className="text-gray-900">software engineering</strong> spanning across architecture, AI, and scalable SaaS infrastructures.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {[
              {
                num: "01",
                title: "Enterprise Solutions",
                desc: "High-performance enterprise software solutions tailored to handle complex logic, integrations, and massive global datasets securely.",
              },
              {
                num: "02",
                title: "Custom SaaS",
                desc: "End-to-end custom software development. We architect multitenant platforms that scale flawlessly from day one.",
              },
              {
                num: "03",
                title: "AI / ML Integration",
                desc: "Intelligent automation and predictive pipelines seamlessly integrated into your core web architecture.",
              },
              {
                num: "04",
                title: "Web Architecture",
                desc: "Next.js and React ecosystems built with strict PEP 8 compliance and flawless UI/UX methodologies.",
              },
              {
                num: "05",
                title: "Cloud Infrastructure",
                desc: "Robust DevOps, containerization, and serverless deployments ensuring 99.99% uptime for your products.",
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
                <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-6">The Agency Standard</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                  Not just another <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">software house</span>.
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-12">
                  When looking for <strong className="text-white">software houses near me</strong>, you want partners, not just typists. Bridge Homies treats code as craft. We blend uncompromising minimalist design with rigorous <strong className="text-white">software engineering</strong> to deliver digital products that dominate markets.
                </p>
              </div>
              <a href="/about" className="relative z-10 inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors w-fit">
                Meet the Homies <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>

            {/* Right side bento box - Image Integration */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gray-100 flex-1 relative overflow-hidden group min-h-[300px]">
                <img 
                  src="https://images.unsplash.com/photo-1649877508777-1554357604eb?q=80&w=580&auto=format&fit=crop"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gray-900/30"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Clean Architecture</h3>
                  <p className="text-gray-200 text-sm">PEP 8 compliance and strict ecosystems.</p>
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
                Understanding the mechanics of how we approach high-level custom software development.
              </p>
            </div>

            {/* FAQ Right Column - Reading Grid */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="border-t-2 border-gray-900">
                
                {[
                  {
                    q: "Why is software engineering crucial for custom enterprise solutions?",
                    a: "Standard programming makes a feature work once. Proper software engineering ensures it operates securely and efficiently for millions of users over years. We architect scalable systems utilizing Python and Next.js to ensure absolute longevity and zero technical debt."
                  },
                  {
                    q: "How do you differ from other software houses near me?",
                    a: "Bridge Homies prioritizes complex business logic and aesthetic minimalism over basic coding. We don't just take orders; we consult, strategize, and implement enterprise software solutions that act as a definitive bridge between your operational bottlenecks and your future goals."
                  },
                  {
                    q: "Do you offer ongoing maintenance post-launch?",
                    a: "Yes. Premium software requires premium upkeep. We offer dedicated retainers ensuring your cloud infrastructure, CI/CD pipelines, and security protocols remain at the bleeding edge of industry standards."
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

      {/* 5. MINIMALIST INTERNAL LINKS */}
      <section className="py-24 bg-white border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">Discover More Capabilities</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: "AI/ML Engineering", link: "/ai-ml-development" },
              { label: "React & Next.js", link: "/webdev" },
              { label: "Native Mobile", link: "/mobile" },
              { label: "FBR ERP Suite", link: "/products" },
            ].map((item, idx) => (
              <Link key={idx} href={item.link} className="group flex items-center space-x-2 text-xl font-bold text-gray-400 hover:text-gray-900 transition-colors">
                <span>{item.label}</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-600 text-2xl leading-none">↗</span>
              </Link>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-100 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">
              Our software developer team follows{" "}
              <a
                href="https://peps.python.org/pep-0008/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 border-b border-gray-900 pb-0.5 hover:text-purple-600 hover:border-purple-600 transition-all duration-300"
              >
                PEP 8 Python coding standards
              </a>
              to ensure clean, maintainable enterprise software.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}