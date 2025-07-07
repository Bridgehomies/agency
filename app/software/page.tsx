"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import WorkSection from '@/components/work-section';
import Form from '@/components/form/form';

// Stats Counter Component
const StatsCounter: React.FC = () => {
  const animateCounter = (
    id: string,
    endValue: number,
    isPercentage: boolean = false
  ) => {
    const element = document.getElementById(id);
    if (!element) return;
    let current = 0;
    const increment = Math.ceil(endValue / 50); // adjust speed
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
    animateCounter('counter-projects', 30, false);
    animateCounter('counter-feedback', 97, true);
    animateCounter('counter-team', 15, false);
    animateCounter('counter-launched', 2024, false);
  }, []);
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div id="counter-projects" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Python Projects Delivered</div>
          </div>
          <div className="p-6">
            <div id="counter-feedback" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="p-6">
            <div id="counter-team" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Python Experts</div>
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

export default function HomePage() {
  return (
    <main className="font-sans bg-gray-50 text-gray-800">
      <Navbar></Navbar>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="particles" id="particles"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                We Build{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Custom Software Solutions
                </span>{' '}
                with Python
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                At Bridge Homies, we leverage the power of Python to create scalable, efficient, and innovative custom software tailored to your business needs. Our team of experts delivers solutions that drive growth, automate processes, and unlock new opportunities.
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
              <div className="relative w-full max-w-md floating">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-50 z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
                <img
                  src="https://images.unsplash.com/photo-1649877508777-1554357604eb?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Python Development"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-6">From Code to Impact</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2024, Bridge Homies began as a small team of passionate developers with a vision to harness the power of Python for solving real-world problems. Today, we've grown into a full-service Python development agency serving clients worldwide.
              </p>
              <p className="text-gray-600 mb-6">
                Our journey has been marked by innovation, dedication, and an unwavering commitment to delivering high-quality software solutions. We believe in the power of Python to transform industries and create lasting impact.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <i className="fas fa-code text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold">Scalable</div>
                    <div className="text-sm text-gray-500">Solutions that grow with you</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <i className="fas fa-bolt text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold">Efficient</div>
                    <div className="text-sm text-gray-500">Streamlined workflows</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-200 rounded-lg"></div>
                <img
                  src=" https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80"
                  alt="Our Team"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              We offer comprehensive Python-based custom software development services tailored to your business needs. From ideation to deployment, we deliver solutions that drive innovation and efficiency.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card Example */}
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="fab fa-python text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Application Development</h3>
              <p className="text-gray-600 mb-4">
                Tailored software solutions built using Python to meet your specific business requirements.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Scalable Architecture</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Cross-Platform Compatibility</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Integration with APIs</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-cogs text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Automation & Scripting</h3>
              <p className="text-gray-600 mb-4">
                Automate repetitive tasks and streamline workflows with Python scripts and tools.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Task Automation</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Data Processing Pipelines</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Custom Scripting</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-database text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Data Science & Analytics</h3>
              <p className="text-gray-600 mb-4">
                Unlock insights from your data with Python's powerful libraries and tools for data science and analytics.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Predictive Modeling</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Statistical Analysis</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Data Visualization</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-network-wired text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">API Development & Integration</h3>
              <p className="text-gray-600 mb-4">
                Build and integrate robust APIs to connect your systems and streamline data exchange.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">RESTful APIs</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Third-Party Integrations</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Microservices Architecture</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-shield-alt text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Security & Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Ensure your software is secure, reliable, and up-to-date with our maintenance and security services.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Regular Updates</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Vulnerability Assessments</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Performance Monitoring</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-headset text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Support & Consulting</h3>
              <p className="text-gray-600 mb-4">
                Expert guidance and ongoing support to help you navigate the complexities of Python development.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Dedicated Support</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Technology Consulting</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Training Sessions</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Work Section */}
      <WorkSection />
      {/* CTA Section */}
        <Form />
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* FAQ Item */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <button className="faq-toggle flex justify-between items-center w-full text-left">
                <h3 className="text-xl font-bold text-gray-800">Why should I choose Python for my project?</h3>
                <i className="fas fa-chevron-down text-blue-600 transition-transform"></i>
              </button>
              <div className="faq-content mt-4 text-gray-600 hidden">
                <p>
                  Python is a versatile, easy-to-learn language with a rich ecosystem of libraries and frameworks. It's ideal for building scalable applications, automating tasks, and performing complex data analysis. Its readability and maintainability make it a top choice for businesses looking for efficient and cost-effective solutions.
                </p>
              </div>
            </div>
            {/* Add more FAQs similarly... */}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
}