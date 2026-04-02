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
    animateCounter("counter-projects", 15, false);
    animateCounter("counter-feedback", 98, true);
    animateCounter("counter-team", 2, false);
    animateCounter("counter-launched", 2024, false);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div id="counter-projects" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">AI/ML Projects Delivered</div>
          </div>
          <div className="p-6">
            <div id="counter-feedback" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="p-6">
            <div id="counter-team" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">AI/ML Experts</div>
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
      "@id": "https://bridgehomies.com/ai-ml-development/#webpage",
      url: "https://bridgehomies.com/ai-ml-development",
      name: "AI ML Engineering Services — Machine Learning Agency | Bridge Homies",
      description:
        "Bridge Homies is a machine learning agency delivering production-grade AI ML engineering services — RAG pipelines, LLM integrations, intelligent automation, and AI automation for real business impact.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
          { "@type": "ListItem", position: 2, name: "AI ML Engineering Services", item: "https://bridgehomies.com/ai-ml-development" },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/ai-ml-development/#service",
      name: "AI ML Engineering Services",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      url: "https://bridgehomies.com/ai-ml-development",
      description:
        "Production-grade AI ML engineering services — RAG pipelines, LLM integrations, intelligent automation, and data-driven systems. Bridge Homies is a trusted machine learning agency built for real business impact.",
      serviceType: "AI & Machine Learning Engineering",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI ML Engineering Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "RAG Pipeline Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "LLM Integration & Fine-Tuning" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation Workflows" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Predictive Analytics & ML Models" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What AI ML engineering services does Bridge Homies offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bridge Homies offers end-to-end AI ML engineering services including RAG pipelines, LLM integration, machine learning model deployment, predictive analytics, and AI automation for enterprise use cases.",
          },
        },
        {
          "@type": "Question",
          name: "Is Bridge Homies a machine learning agency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Bridge Homies is a dedicated machine learning agency serving clients worldwide with expert AI ML engineering services, custom AI automation, and data-driven software solutions.",
          },
        },
      ],
    },
  ],
};

export default function AiMlPage() {
  return (
    <main className="font-sans bg-gray-50 text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              {/* H1 — primary keyword */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Expert{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  AI ML Engineering Services
                </span>{" "}
                That Drive Growth
              </h1>
              {/* First paragraph — keyword-rich */}
              <p className="text-lg text-gray-600 mb-8">
                Bridge Homies is a machine learning agency and AI ML engineering service provider delivering
                production-grade solutions — from RAG pipelines and LLM integrations to intelligent AI automation
                and data-driven enterprise software. We help businesses automate, innovate, and scale with AI.
              </p>
              <div className="flex space-x-4">
                <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition">
                  Start Your AI Project
                </a>
                <a href="#work" className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                  View Our Work
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
                {/* Image alt — keyword */}
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-flat-design-rpa-illustration_23-2149277643.jpg?w=826"
                  alt="Bridge Homies AI ML engineering services and machine learning agency solutions"
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
              Your Trusted Machine Learning Agency for AI Automation
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-6">From Data to Intelligence</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2024, Bridge Homies started as a passionate team of engineers focused on AI ML
                engineering services. Today we are a full-service machine learning agency serving clients
                worldwide — transforming raw data into actionable intelligence with AI automation and enterprise
                software solutions.
              </p>
              <p className="text-gray-600 mb-6">
                Our AI ML engineering services cover the entire lifecycle — from data engineering and model
                training to deployment and monitoring — so your business gets lasting value from every
                AI investment.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-200 rounded-lg"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80"
                  alt="Machine learning agency team delivering AI ML engineering services"
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
              Our AI ML Engineering Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              As a machine learning agency, we deliver AI ML engineering services, AI automation, and
              data-driven enterprise software for businesses at every stage of growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Machine Learning Models",
                desc: "Custom ML models designed to solve specific business challenges. Our AI ML engineering services cover predictive analytics, NLP, and image recognition.",
                items: ["Predictive Analytics", "Natural Language Processing", "Image Recognition"],
                color: "bg-blue-100",
              },
              {
                title: "Data Science & Analytics",
                desc: "Transform raw data into actionable insights with our machine learning agency's data science and visualisation capabilities.",
                items: ["Data Cleaning & Preprocessing", "Statistical Analysis", "Dashboard Development"],
                color: "bg-purple-100",
              },
              {
                title: "AI Automation",
                desc: "Automate repetitive tasks and optimise workflows using AI automation tools and intelligent algorithms.",
                items: ["Process Automation", "Supply Chain Optimisation", "Resource Allocation"],
                color: "bg-indigo-100",
              },
              {
                title: "LLM Integration & RAG",
                desc: "Integrate large language models and build RAG pipelines that power intelligent, context-aware applications.",
                items: ["OpenAI & Anthropic APIs", "RAG Pipeline Development", "Fine-Tuning LLMs"],
                color: "bg-green-100",
              },
              {
                title: "AI Security & Compliance",
                desc: "Ensure your AI ML engineering services are secure, ethical, and compliant with industry regulations.",
                items: ["Bias Detection", "Data Privacy", "Regulatory Compliance"],
                color: "bg-yellow-100",
              },
              {
                title: "Support & Consulting",
                desc: "Expert guidance and ongoing support to help you implement AI ML engineering services effectively.",
                items: ["Dedicated Support", "Technology Consulting", "Training Sessions"],
                color: "bg-red-100",
              },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                <div className={`w-16 h-16 ${s.color} rounded-full flex items-center justify-center mb-6`}>
                  <span className="text-2xl">🤖</span>
                </div>
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
            Explore All Our Software &amp; AI Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/webdev" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Website Development</div>
              <div className="text-xs text-gray-500 mt-1">Next.js &amp; React</div>
            </Link>
            <Link href="/software" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Enterprise Software</div>
              <div className="text-xs text-gray-500 mt-1">SaaS &amp; Web Apps</div>
            </Link>
            <Link href="/mobile" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Mobile Development</div>
              <div className="text-xs text-gray-500 mt-1">iOS &amp; Android</div>
            </Link>
            <Link href="/products" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Our Products</div>
              <div className="text-xs text-gray-500 mt-1">FBR ERP &amp; More</div>
            </Link>
          </div>
          {/* External link */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Our machine learning agency follows{" "}
            <a
              href="https://developers.google.com/machine-learning/guides/rules-of-ml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google's Rules of Machine Learning
            </a>{" "}
            to build reliable AI systems.
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
                How can AI ML engineering services benefit my business?
              </h3>
              <p className="text-gray-600">
                AI ML engineering services help your business by automating repetitive tasks, predicting
                customer behaviour, optimising processes, and providing actionable insights from data.
                As a machine learning agency, Bridge Homies enables smarter decision-making and reduces costs.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                What industries do your AI ML engineering services serve?
              </h3>
              <p className="text-gray-600">
                Our machine learning agency serves fintech, e-commerce, healthcare, logistics, and SaaS companies
                with tailored AI automation and enterprise software solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}