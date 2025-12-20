import React from 'react';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: '/webdev/Custom Web Development.png',
    title: 'Custom Web Development',
    description: 'Tailored web applications built with modern technologies to meet your specific business requirements.',
    features: ['Responsive Design', 'Scalable Architecture', 'Performance Optimized'],
  },
  {
    icon: '/webdev/Mobile-First.png',
    title: 'Mobile-First Development',
    description: 'Websites and applications designed with mobile users in mind, ensuring seamless experiences across all devices.',
    features: ['Progressive Web Apps', 'Cross-Platform Compatibility', 'Touch-Optimized UI'],
  },
  {
    icon: '/webdev/E-Commerce.png',
    title: 'E-Commerce Solutions',
    description: 'Powerful online stores with secure payment gateways, inventory management, and conversion-focused design.',
    features: ['Shopify & WooCommerce', 'Custom Checkout Flows', 'SEO Optimized'],
  },
  {
    icon: '/webdev/SEO&Performance.png',
    title: 'SEO & Performance',
    description: 'Optimize your website\'s visibility and speed to attract more visitors and keep them engaged.',
    features: ['Technical SEO Audits', 'Page Speed Optimization', 'Content Strategy'],
  },
  {
    icon: '/webdev/Security&Maintenance.png',
    title: 'Security & Maintenance',
    description: 'Protect your digital assets with robust security measures and keep everything running smoothly.',
    features: ['Weekly Updates', 'Security Audits', '24/7 Monitoring'],
  },
  {
    icon: '/webdev/Support&Consulting.png',
    title: 'Support & Consulting',
    description: 'Expert guidance and ongoing support to help you navigate the digital landscape with confidence.',
    features: ['Dedicated Support', 'Technology Consulting', 'Training Sessions'],
  },
];

export default function Services() {
  return (
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
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition case-study-card">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 service-icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="text-gray-600 space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2">{feature}</i>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
