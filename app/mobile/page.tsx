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
    animateCounter("counter-feedback", 97, true);
    animateCounter("counter-team", 2, false);
    animateCounter("counter-launched", 2024, false);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div id="counter-projects" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Mobile Apps Developed</div>
          </div>
          <div className="p-6">
            <div id="counter-feedback" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0%</div>
            <div className="text-gray-600">Positive Feedback</div>
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
      "@id": "https://bridgehomies.com/mobile/#webpage",
      url: "https://bridgehomies.com/mobile",
      name: "Mobile App Development Services — iOS, Android & AI Automation | Bridge Homies",
      description:
        "Bridge Homies builds intelligent mobile apps for iOS and Android with AI automation and machine learning. A software developer company delivering web apps and enterprise mobile solutions.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bridgehomies.com" },
          { "@type": "ListItem", position: 2, name: "Mobile App Development", item: "https://bridgehomies.com/mobile" },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://bridgehomies.com/mobile/#service",
      name: "Mobile App Development",
      provider: { "@id": "https://bridgehomies.com/#organization" },
      url: "https://bridgehomies.com/mobile",
      description:
        "Custom iOS and Android mobile app development with AI automation and ML integration. Fast, intuitive apps built to scale with your business.",
      serviceType: "Mobile App Development",
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why does my business need a mobile app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A mobile app provides direct access to your customers with a personalised experience. With AI automation and machine learning integration from our software developer company, your app can predict user behaviour and drive growth.",
          },
        },
      ],
    },
  ],
};

export default function MobilePage() {
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
              {/* H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Intelligent{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Mobile Apps
                </span>{" "}
                with AI Automation &amp; Machine Learning
              </h1>
              {/* First paragraph */}
              <p className="text-lg text-gray-600 mb-8">
                Bridge Homies is a software developer company that builds intelligent mobile apps for iOS and
                Android. We integrate AI automation and machine learning into every app we ship — helping
                businesses deliver smarter web apps and enterprise software experiences on mobile.
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
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
                {/* Image alt */}
                <img
                  src="https://plus.unsplash.com/premium_photo-1683141119010-6ac8b0682e1a?q=80&w=638&auto=format&fit=crop"
                  alt="Mobile app development with AI automation by Bridge Homies software developer company"
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
              Mobile App Development by a Software Developer Company That Understands AI
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-6">From Vision to Reality</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2024, Bridge Homies is a software company that builds AI-powered mobile apps for
                businesses worldwide. Our software developer team combines mobile expertise with machine learning
                and AI automation to create apps that learn and improve over time.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-200 rounded-lg"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80"
                  alt="Software developer company team working on mobile apps and enterprise software"
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
              Mobile Development Services with AI Automation
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              From iOS and Android apps to enterprise software with AI automation — our software developer company
              delivers intelligent mobile solutions at scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Mobile App Development",
                desc: "Tailored mobile applications with scalable architecture and performance optimisation by our software developer team.",
                items: ["AI-Powered Features", "Scalable Architecture", "Performance Optimised"],
              },
              {
                title: "AI Automation & ML Integration",
                desc: "Integrate AI automation and machine learning into your mobile app for intelligent personalisation and predictions.",
                items: ["Personalised Recommendations", "Predictive Analytics", "Chatbots & Assistants"],
              },
              {
                title: "Enterprise Mobile Software",
                desc: "Enterprise software solutions built for mobile — secure, scalable, and integrated with your existing systems.",
                items: ["Push Notifications", "Gamification", "User Analytics"],
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
            More from Our Software Company
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/webdev" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Website Development</div>
              <div className="text-xs text-gray-500 mt-1">Web Apps &amp; SaaS</div>
            </Link>
            <Link href="/ai-ml-development" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">AI ML Engineering</div>
              <div className="text-xs text-gray-500 mt-1">Machine Learning Agency</div>
            </Link>
            <Link href="/software" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">Enterprise Software</div>
              <div className="text-xs text-gray-500 mt-1">Custom SaaS</div>
            </Link>
            <Link href="/ui-ux-design" className="p-4 border rounded-lg hover:border-blue-500 transition text-center">
              <div className="font-semibold text-sm">UI/UX Design</div>
              <div className="text-xs text-gray-500 mt-1">App Design</div>
            </Link>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            Our mobile apps comply with{" "}
            <a
              href="https://developer.apple.com/app-store/review/guidelines/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Apple App Store Review Guidelines
            </a>{" "}
            and Google Play policies.
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
                Why does my business need a mobile app?
              </h3>
              <p className="text-gray-600">
                A mobile app with AI automation and machine learning gives your customers a personalised experience,
                drives engagement, and creates new revenue channels. Our software developer company builds enterprise
                software and mobile apps that grow with your business.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Do you integrate AI automation in mobile apps?
              </h3>
              <p className="text-gray-600">
                Yes. As a machine learning agency and software company, we integrate AI automation, predictive
                analytics, and intelligent recommendations into every mobile app we build.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}