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
    animateCounter("counter-projects", 15, "+");
    animateCounter("counter-feedback", 98, "%");
    animateCounter("counter-team", 12, "+");
    animateCounter("counter-launched", 2024, "");
  }, []);

  return (
    <div className="py-12 border-y border-gray-200/60 bg-gray-50/50 backdrop-blur-xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-8 divide-x divide-gray-200/50">
          {[
            { id: "counter-projects", label: "AI Models Deployed" },
            { id: "counter-feedback", label: "Client Satisfaction" },
            { id: "counter-team", label: "ML Engineers" },
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
      "@id": "https://bridgehomies.com/ai-ml-development/#webpage",
      url: "https://bridgehomies.com/ai-ml-development",
      name: "Elite AI ML Engineering Services & Machine Learning Agency | Bridge Homies",
      description:
        "Bridge Homies is a premium machine learning agency delivering production-grade AI ML engineering services, RAG pipelines, LLM integrations, and intelligent AI automation for enterprises.",
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/ai-ml-development/#service",
      name: "AI ML Engineering Services",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      url: "https://bridgehomies.com/ai-ml-development",
      description:
        "Production-grade AI ML engineering services, focusing on RAG pipelines, LLM fine-tuning, and AI automation workflows built for real business impact.",
      serviceType: "AI & Machine Learning Engineering",
      areaServed: "Worldwide",
    },
  ],
};

export default function AiMlPage() {
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
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-600">Machine Learning Agency</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900 uppercase">
                Engineer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500">
                  Intelligence.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                We deliver production-grade <strong className="text-gray-900">AI ML engineering services</strong>. From advanced RAG pipelines to autonomous agents, we turn raw data into dominant market leverage.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-none overflow-hidden transition-all hover:bg-purple-600">
                  <span className="relative z-10 flex items-center gap-2">
                    Deploy AI
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </span>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* FULL-WIDTH DATA/AI IMAGE BREAKER */}
      <section className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          alt="Abstract representation of neural networks and machine learning engineering" 
          className="object-cover w-full h-full opacity-50 filter grayscale hover:scale-105 transition-transform duration-[20s] ease-out"
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
              <p className="text-gray-500 font-medium">Bespoke <strong className="text-gray-900">AI ML engineering services</strong> bridging the gap between theoretical data science and live production.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {[
              {
                num: "01",
                title: "LLM & RAG Pipelines",
                desc: "We integrate Large Language Models with Retrieval-Augmented Generation (RAG) to build context-aware, highly accurate enterprise search and chat applications.",
              },
              {
                num: "02",
                title: "Predictive Analytics",
                desc: "Harness historical data. Our custom ML models identify patterns, forecast trends, and automate decision-making processes for supply chains and finance.",
              },
              {
                num: "03",
                title: "AI Automation",
                desc: "Replace mundane workflows. We deploy intelligent agents capable of processing documents, categorizing data, and executing multi-step logic autonomously.",
              },
              {
                num: "04",
                title: "Computer Vision & NLP",
                desc: "Advanced neural networks designed to parse, understand, and extract actionable metadata from raw images, video streams, and unstructured text.",
              },
              {
                num: "05",
                title: "Scalable MLOps",
                desc: "Models mean nothing if they can't scale. We architect robust MLOps pipelines ensuring continuous integration, testing, and deployment of your AI systems.",
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
                <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-6">The Data Standard</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                  Not just another <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">machine learning agency</span>.
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-12">
                  Many can run a Python script; few can deploy it securely at scale. As a premier <strong className="text-white">AI ML engineering services</strong> provider, we ensure your models are free of hallucination, built on secure architecture, and actively drive <strong className="text-white">AI automation</strong> that impacts your bottom line.
                </p>
              </div>
              <a href="/about" className="relative z-10 inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors w-fit">
                Meet the Experts <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>

            {/* Right side bento box - Image Integration */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gray-100 flex-1 relative overflow-hidden group min-h-[300px]">
                <img 
                  src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Minimalist data abstraction" 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gray-900/40"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Data Integrity</h3>
                  <p className="text-gray-200 text-sm">Strict adherence to enterprise data security compliance.</p>
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
                Understanding the mechanics of integrating AI automation and LLMs into enterprise architecture.
              </p>
            </div>

            {/* FAQ Right Column - Reading Grid */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="border-t-2 border-gray-900">
                
                {[
                  {
                    q: "What makes your AI ML engineering services different from standard dev shops?",
                    a: "We don't just 'wrap' ChatGPT APIs. We are a dedicated machine learning agency that builds secure RAG pipelines, fine-tunes open-source models, and sets up robust MLOps to ensure your data remains proprietary and your inferences remain lightning fast."
                  },
                  {
                    q: "How can AI automation actually impact our enterprise workflows?",
                    a: "By replacing deterministic, rule-based systems with probabilistic intelligence. We implement AI automation to handle dynamic tasks—like context-aware customer support, unstructured invoice data extraction, and real-time inventory predictive analytics—saving thousands of manual labor hours."
                  },
                  {
                    q: "What industries do you build machine learning models for?",
                    a: "Our core expertise spans Fintech, Healthcare, Logistics, and SaaS. Whether it is algorithmic trading models, patient data analysis, or supply chain route optimization, our engineering principles remain universally robust."
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
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">Discover Core Engineering</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {[
              { label: "Enterprise Software", link: "/software" },
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

          {/* Re-integrated External Link with Premium Styling */}
          <div className="pt-8 border-t border-gray-100 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">
              Our machine learning agency strictly adheres to{" "}
              <a
                href="https://developers.google.com/machine-learning/guides/rules-of-ml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 border-b border-gray-900 pb-0.5 hover:text-purple-600 hover:border-purple-600 transition-all duration-300"
              >
                Google's Rules of Machine Learning
              </a>
              {" "}to build reliable systems.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}