"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import WorkSection from '@/components/work-section';
import Form from '@/components/form/form';
import VideoGallery from '@/components/video-gallery';
import FaqAccordion from "@/components/FaqAccordion";

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
    animateCounter('counter-team', 3, false);
    animateCounter('counter-launched', 2024, false);
  }, []);
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div id="counter-projects" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Projects Delivered</div>
          </div>
          <div className="p-6">
            <div id="counter-feedback" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="p-6">
            <div id="counter-team" className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">0+</div>
            <div className="text-gray-600">Social Expert</div>
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
              <h3 className="text-2xl font-bold mb-6">From Code to Content</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2024, Bridge Homies began as a passionate team of developers solving real-world problems with Python. But as the digital world evolved, so did we.
              </p>
              <p className="text-gray-600 mb-6">
                Today, Bridge Homies is a full-service digital strategy agency, helping brands stand out through engaging video editing, scroll-stopping social media content, and performance-driven strategy. From building backend systems to crafting viral reels — we help brands go from concept to conversion.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <i className="fas fa-chart-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold">Scalable</div>
                    <div className="text-sm text-gray-500">Strategies that grow with your audience</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <i className="fas fa-video text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold">Creative</div>
                    <div className="text-sm text-gray-500">Visuals that tell your brand’s story</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-200 rounded-lg"></div>
                <img
                  src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=1470&q=80"
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
              We empower brands with creative content, high-converting video, and data-driven strategies for digital dominance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-video text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Video Editing & Reels</h3>
              <p className="text-gray-600 mb-4">
                Scroll-stopping edits that boost reach, storytelling, and engagement across all major platforms.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> YouTube & Instagram Reels
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Testimonials & Promos
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Motion Graphics
                </li>
              </ul>
            </div>
      
            {/* Service 2 */}
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-bullhorn text-pink-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Social Media Management</h3>
              <p className="text-gray-600 mb-4">
                From content calendars to daily posting — we manage your social presence like a pro.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Profile Optimization
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Content Creation & Posting
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Analytics & Growth Tracking
                </li>
              </ul>
            </div>
      
            {/* Service 3 */}
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-lightbulb text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Content Strategy</h3>
              <p className="text-gray-600 mb-4">
                Align your brand voice, content types, and messaging to win attention and trust.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Audience Research
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Platform-Specific Strategy
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Monthly Planning & Optimization
                </li>
              </ul>
            </div>
      
            {/* Service 4 */}
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-magic text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Brand Design & Visuals</h3>
              <p className="text-gray-600 mb-4">
                Eye-catching creatives that reflect your identity and grab attention in a scroll.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Logo & Visual Identity
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Social Media Templates
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Story Highlights & Thumbnails
                </li>
              </ul>
            </div>
      
            {/* Service 5 */}
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-rocket text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Viral Campaigns & Trends</h3>
              <p className="text-gray-600 mb-4">
                Leverage trends, hooks, and viral formulas to maximize reach and engagement.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Trend Mapping
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Short-form Video Strategy
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Hashtag & Sound Research
                </li>
              </ul>
            </div>
      
            {/* Service 6 */}
            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-headset text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Consulting & Coaching</h3>
              <p className="text-gray-600 mb-4">
                Want to grow in-house? We'll train your team on strategy, content, and growth hacking.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> 1-on-1 Strategy Sessions
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Reels & Editing Workshops
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> Growth Coaching
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <VideoGallery/>
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
            <FaqAccordion />
            
          </div>
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
}
