export default function services() {
return (
  
  <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              We offer comprehensive web development services tailored to your
              business needs. From concept to deployment, we've got you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card Example */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition case-study-card">
              <div className="w-16 h-16  rounded-full flex items-center justify-center mb-6 service-icon">
                {/* <i className="fas fa-code text-blue-600 text-2xl"> */}
                <img src="/webdev/Custom Web Development.png" alt="" />
                {/* </i> */}
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Web Development</h3>
              <p className="text-gray-600 mb-4">
                Tailored web applications built with modern technologies to meet
                your specific business requirements.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Responsive Design
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Scalable Architecture
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Performance Optimized
                  </i>
                </li>
              </ul>
            </div>

            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/webdev/Mobile-First.png" alt="" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Mobile-First Development
              </h3>
              <p className="text-gray-600 mb-4">
                Websites and applications designed with mobile users in mind,
                ensuring seamless experiences across all devices.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Progressive Web Apps
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Cross-Platform Compatibility
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Touch-Optimized UI
                  </i>
                </li>
              </ul>
            </div>

            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="webdev/E-Commerce.png" alt="" />
              </div>
              <h3 className="text-xl font-bold mb-3">E-Commerce Solutions</h3>
              <p className="text-gray-600 mb-4">
                Powerful online stores with secure payment gateways, inventory
                management, and conversion-focused design.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Shopify & WooCommerce
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Custom Checkout Flows
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    SEO Optimized
                  </i>
                </li>
              </ul>
            </div>

            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/webdev/SEO&Performance.png" alt="" />
              </div>
              <h3 className="text-xl font-bold mb-3">SEO & Performance</h3>
              <p className="text-gray-600 mb-4">
                Optimize your website's visibility and speed to attract more
                visitors and keep them engaged.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Technical SEO Audits
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Page Speed Optimization
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Content Strategy
                  </i>
                </li>
              </ul>
            </div>

            <div className="service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {/* <i className="fas fa-shield-alt text-yellow-600 text-2xl"></i> */}
                <img src="/webdev/Security&Maintenance.png" alt="" />
              </div>
              <h3 className="text-xl font-bold mb-3">Security & Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Protect your digital assets with robust security measures and
                keep everything running smoothly.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Weekly Updates
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Security Audits
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    24/7 Monitoring
                  </i>
                </li>
              </ul>
            </div>

            <div className="service-card p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {/* <i className="fas fa-headset text-red-600 text-2xl"></i> */}
                <img src="/webdev/Support&Consulting.png" alt="" />
              </div>
              <h3 className="text-xl font-bold mb-3">Support & Consulting</h3>
              <p className="text-gray-600 mb-4">
                Expert guidance and ongoing support to help you navigate the
                digital landscape with confidence.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Dedicated Support
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Technology Consulting
                  </i>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2">
                    Training Sessions
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
)
}