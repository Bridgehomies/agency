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
    animateCounter('counter-projects', 20, false);
    animateCounter('counter-feedback', 98, true);
    animateCounter('counter-team', 15, false);
    animateCounter('counter-launched', 2024, false);
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
                We Create{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Exceptional UI/UX Designs
                </span>{' '}
                That Drive Engagement
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                At Bridge Homies, we transform ideas into visually stunning and intuitive designs. Our team of expert designers delivers user-centered solutions that enhance engagement, improve usability, and drive business growth.
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
                  src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="UI/UX Design"
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
              <h3 className="text-2xl font-bold mb-6">From Ideas to Impactful Designs</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2024, Bridge Homies began as a small team of passionate designers with a vision to create meaningful user experiences. Today, we've grown into a full-service UI/UX design agency serving clients worldwide.
              </p>
              <p className="text-gray-600 mb-6">
                Our journey has been marked by innovation, dedication, and an unwavering commitment to delivering designs that resonate with users. We believe in the power of thoughtful design to transform businesses and create lasting connections.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <i className="fas fa-lightbulb text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold">User-Centered</div>
                    <div className="text-sm text-gray-500">Designs that matter</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <i className="fas fa-heart text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold">Passionate</div>
                    <div className="text-sm text-gray-500">About what we do</div>
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
              We offer comprehensive UI/UX design services tailored to your business needs. From wireframes to final designs, we ensure a seamless user experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card Example */}
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-palette text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">UI Design</h3>
              <p className="text-gray-600 mb-4">
                Visually appealing interfaces designed to captivate users and elevate your brand identity.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Modern Aesthetics</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Consistent Branding</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Pixel-Perfect Precision</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-users text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">UX Design</h3>
              <p className="text-gray-600 mb-4">
                User-centered designs focused on enhancing usability, accessibility, and overall satisfaction.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">User Research</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Wireframing & Prototyping</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Usability Testing</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-mobile-alt text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile App Design</h3>
              <p className="text-gray-600 mb-4">
                Intuitive and responsive designs optimized for mobile devices to deliver seamless experiences.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Touch-Friendly Interfaces</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Cross-Platform Compatibility</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Performance Optimization</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-chart-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Conversion-Driven Design</h3>
              <p className="text-gray-600 mb-4">
                Designs crafted to maximize conversions, whether it's increasing sign-ups, sales, or engagement.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Call-to-Action Optimization</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">A/B Testing</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Analytics Integration</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-brush text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Branding & Visual Identity</h3>
              <p className="text-gray-600 mb-4">
                Consistent branding across all touchpoints to establish a strong and recognizable identity.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Logo Design</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Color & Typography Systems</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Style Guides</i>
                </li>
              </ul>
            </div>
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-headset text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Support & Consulting</h3>
              <p className="text-gray-600 mb-4">
                Expert guidance and ongoing support to help you refine your design strategy and achieve your goals.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Dedicated Support</i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Design Audits</i>
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
        {/* <Form /> */}
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
                <h3 className="text-xl font-bold text-gray-800">Why is UI/UX design important for my business?</h3>
                <i className="fas fa-chevron-down text-blue-600 transition-transform"></i>
              </button>
              <div className="faq-content mt-4 text-gray-600 hidden">
                <p>
                  UI/UX design is crucial because it directly impacts how users interact with your product or service. A well-designed interface enhances user satisfaction, builds trust, and drives conversions, ultimately contributing to business growth.
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