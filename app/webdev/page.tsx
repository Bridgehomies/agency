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
    animateCounter('counter-projects', 10, false);
    animateCounter('counter-feedback', 95, true);
    animateCounter('counter-team', 10, false);
    animateCounter('counter-launched', 2024, false);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div id="counter-projects" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Projects Initiated</div>
          </div>
          <div className="p-6">
            <div id="counter-feedback" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0%</div>
            <div className="text-gray-600">Positive Feedback</div>
          </div>
          <div className="p-6">
            <div id="counter-team" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Talented Professionals</div>
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
                We Craft{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Digital Experiences
                </span>{' '}
                That Matter
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                At Bridge Homies, we transform ideas into powerful digital solutions. Our team of experts delivers cutting-edge web applications that drive business growth and engage users.
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
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  alt="Web Development"
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
              <h3 className="text-2xl font-bold mb-6">From Vision to Reality</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2024, Bridge Homies began as a small team of passionate developers with a vision to create digital solutions that make a real difference. Today, we've grown into a full-service web development agency serving clients worldwide.
              </p>
              <p className="text-gray-600 mb-6">
                Our journey has been marked by innovation, dedication, and an unwavering commitment to quality. We believe in the power of technology to transform businesses and create meaningful connections with users.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <i className="fas fa-lightbulb text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold">Innovative</div>
                    <div className="text-sm text-gray-500">Cutting-edge solutions</div>
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
              We offer comprehensive web development services tailored to your business needs. From concept to deployment, we've got you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card Example */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition case-study-card">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 service-icon">
                <i className="fas fa-code text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Web Development</h3>
              <p className="text-gray-600 mb-4">
                Tailored web applications built with modern technologies to meet your specific business requirements.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Responsive Design</i>
                  
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Scalable Architecture</i>
                  
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">Performance Optimized</i>
                  
                </li>
              </ul>
            </div>
            
                <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                    <div className="service-icon w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-mobile-alt text-purple-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Mobile-First Development</h3>
                    <p className="text-gray-600 mb-4">
                        Websites and applications designed with mobile users in mind, ensuring seamless experiences across all devices.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Progressive Web Apps</i>
                           
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Cross-Platform Compatibility</i>
                            
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Touch-Optimized UI</i>
                            
                        </li>
                    </ul>
                </div>
                
                
                <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                    <div className="service-icon w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-shopping-cart text-indigo-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3">E-Commerce Solutions</h3>
                    <p className="text-gray-600 mb-4">
                        Powerful online stores with secure payment gateways, inventory management, and conversion-focused design.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Shopify & WooCommerce</i>
                            
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Custom Checkout Flows</i>
                            
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">SEO Optimized</i>
                            
                        </li>
                    </ul>
                </div>
                
                
                <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                    <div className="service-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-search text-green-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3">SEO & Performance</h3>
                    <p className="text-gray-600 mb-4">
                        Optimize your website's visibility and speed to attract more visitors and keep them engaged.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Technical SEO Audits</i>
                            
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Page Speed Optimization</i>
                            
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Content Strategy</i>
                            
                        </li>
                    </ul>
                </div>
                
                
                <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                    <div className="service-icon w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-shield-alt text-yellow-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Security & Maintenance</h3>
                    <p className="text-gray-600 mb-4">
                        Protect your digital assets with robust security measures and keep everything running smoothly.
                    </p>
                    <ul className="text-gray-600 space-y-2">
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Weekly Updates</i>
                            
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">Security Audits</i>
                            
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2">24/7 Monitoring</i>
                            
                        </li>
                    </ul>
                </div>
                
                
                <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                    <div className="service-icon w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-headset text-red-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Support & Consulting</h3>
                    <p className="text-gray-600 mb-4">
                        Expert guidance and ongoing support to help you navigate the digital landscape with confidence.
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
                <h3 className="text-xl font-bold text-gray-800">How long does a typical web development project take?</h3>
                <i className="fas fa-chevron-down text-blue-600 transition-transform"></i>
              </button>
              <div className="faq-content mt-4 text-gray-600 hidden">
                <p>
                  Project timelines vary depending on complexity, features, and scope. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months or more. During our initial consultation, we'll provide a detailed timeline based on your specific requirements.
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