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
    animateCounter("counter-projects", 10, false);
    animateCounter("counter-feedback", 95, true);
    animateCounter("counter-team", 10, false);
    animateCounter("counter-launched", 2024, false);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div id="counter-projects" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Website Development Projects</div>
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

export default function WebDevClient() {
  return (
    <main className="font-sans bg-gray-50 text-gray-800">
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
                  Website Development
                </span>{" "}
                &amp; Web App Services
              </h1>
              {/* First paragraph — keyword-rich */}
              <p className="text-lg text-gray-600 mb-8">
                Bridge Homies is a software developer company delivering professional website development,
                SaaS platforms, web apps, and enterprise software using Next.js, React, and Django.
                Our expert team integrates AI automation into every project to help businesses scale faster and smarter.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition"
                >
                  Start Your Project
                </a>
                <a
                  href="#work"
                  className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                >
                  View Our Work
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-50 z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
                {/* Image alt — keyword */}
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  alt="Bridge Homies website development and web apps software developer company"
                  className="rounded-2xl shadow-2xl border-8 border-blue-50 transform transition duration-500 hover:scale-105 hover:shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* H2 — secondary keyword */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Software Developer Company for SaaS &amp; Web Apps
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-6">From Vision to Reality</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2024, Bridge Homies is a software company that began building scalable websites and
                web apps for businesses worldwide. Our website development services span custom web applications,
                SaaS platforms, enterprise software, and AI automation — all under one roof.
              </p>
              <p className="text-gray-600 mb-6">
                As a trusted software developer company, we believe in shipping production-ready code fast,
                with clean architecture and performance built in from day one.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-200 rounded-lg"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80"
                  alt="Bridge Homies software developer team building web apps and enterprise software"
                  className="relative rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* H2 */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Website Development &amp; Software Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              We offer end-to-end website development, SaaS, web apps, enterprise software, and AI automation
              services tailored to your business needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/webdev/Custom Web Development.png" alt="Custom website development service" />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Website Development</h3>
              <p className="text-gray-600 mb-4">
                Tailored websites and web apps built with modern technologies. Our software developer company
                delivers responsive, scalable, and performance-optimised solutions.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Responsive Website Design</li>
                <li>✓ Scalable Architecture</li>
                <li>✓ Performance Optimised</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/webdev/Mobile-First.png" alt="Mobile-first web app development" />
              </div>
              <h3 className="text-xl font-bold mb-3">SaaS &amp; Web Apps</h3>
              <p className="text-gray-600 mb-4">
                Full-stack SaaS platforms and web apps designed for growth. We build with Next.js and Django
                to deliver production-ready enterprise software.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Progressive Web Apps</li>
                <li>✓ Cross-Platform Compatibility</li>
                <li>✓ Touch-Optimised UI</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="webdev/E-Commerce.png" alt="E-commerce website development" />
              </div>
              <h3 className="text-xl font-bold mb-3">E-Commerce Development</h3>
              <p className="text-gray-600 mb-4">
                Powerful online stores with secure payment gateways, inventory management, and conversion-focused
                website development.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Shopify &amp; WooCommerce</li>
                <li>✓ Custom Checkout Flows</li>
                <li>✓ SEO Optimised</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/webdev/SEO&Performance.png" alt="SEO and performance for web apps" />
              </div>
              <h3 className="text-xl font-bold mb-3">SEO &amp; Performance</h3>
              <p className="text-gray-600 mb-4">
                Optimise your website's visibility and speed to attract more visitors and outperform competitors.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Technical SEO Audits</li>
                <li>✓ Page Speed Optimisation</li>
                <li>✓ Content Strategy</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/webdev/Security&Maintenance.png" alt="Security for enterprise software" />
              </div>
              <h3 className="text-xl font-bold mb-3">Security &amp; Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Protect your enterprise software with robust security measures and keep everything running smoothly.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Weekly Updates</li>
                <li>✓ Security Audits</li>
                <li>✓ 24/7 Monitoring</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/webdev/Support&Consulting.png" alt="Software development consulting" />
              </div>
              <h3 className="text-xl font-bold mb-3">Support &amp; Consulting</h3>
              <p className="text-gray-600 mb-4">
                Expert guidance and ongoing support to navigate your website development and software journey.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Dedicated Support</li>
                <li>✓ Technology Consulting</li>
                <li>✓ Training Sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interlinks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Related Software &amp; AI Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/ai-ml-development" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">AI ML Engineering</div>
              <div className="text-xs text-gray-500 mt-1">Machine Learning Agency</div>
            </Link>
            <Link href="/software" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Enterprise Software</div>
              <div className="text-xs text-gray-500 mt-1">Custom Python Solutions</div>
            </Link>
            <Link href="/mobile" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Mobile Development</div>
              <div className="text-xs text-gray-500 mt-1">iOS &amp; Android Apps</div>
            </Link>
            <Link href="/ui-ux-design" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">UI/UX Design</div>
              <div className="text-xs text-gray-500 mt-1">User-Centred Design</div>
            </Link>
          </div>
          {/* External link */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Our website development follows{" "}
            <a
              href="https://web.dev/performance/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google Web Performance best practices
            </a>{" "}
            for all client projects.
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
                How long does a typical website development project take?
              </h3>
              <p className="text-gray-600">
                Project timelines vary depending on complexity. A simple website typically takes 4–6 weeks,
                while complex SaaS platforms or enterprise software may take 3–6 months. We provide a detailed
                timeline during our initial consultation.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Do you build SaaS and enterprise software?
              </h3>
              <p className="text-gray-600">
                Yes. Bridge Homies is a software developer company specialising in SaaS, web apps, and enterprise
                software. We use Next.js, React, and Django to deliver scalable, production-ready solutions.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Can you integrate AI automation into my website?
              </h3>
              <p className="text-gray-600">
                Absolutely. As a machine learning agency, we integrate AI automation, chatbots, recommendation
                engines, and intelligent workflows into any website development project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}