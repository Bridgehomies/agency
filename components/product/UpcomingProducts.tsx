import {
  ShoppingCart,
  Filter,
  MessageSquare,
  Scale,
  Clock,
  ArrowRight, X, CheckCircle
} from 'lucide-react'

import { useState } from 'react'

export default function UpcomingProducts() {
    const [open, setOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  fetch("https://formspree.io/f/mgvyqeog", {
    method: "POST",
    body: new FormData(e.currentTarget),
    headers: {
      Accept: "application/json", // REQUIRED to prevent redirection
    },
  })
    .then((res) => {
      if (res.ok) {
        setSubmitted(true)
        setOpen(false)
        setTimeout(() => setSubmitted(false), 4000)
      } else {
        alert("Submission failed. Please try again.")
      }
    })
    .catch(() => {
      alert("Submission failed. Please try again.")
    })
}


    const upcomingProducts = [
    {
      icon: ShoppingCart,
      title: 'E-commerce Platform',
      description: 'Complete online store solution with payment gateway integration, inventory management, and customer analytics.',
      status: 'In Development',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      features: ['Multi-vendor support', 'Mobile responsive', 'Payment integration', 'Analytics dashboard']
    },
    {
      icon: Filter,
      title: 'CV Filtering System',
      description: 'AI-powered recruitment tool that automatically filters and ranks CVs based on job requirements and qualifications.',
      status: 'Beta Testing',
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      features: ['AI-powered matching', 'Skills assessment', 'Bulk processing', 'Custom criteria']
    },
    {
      icon: MessageSquare,
      title: 'TikTok Message Automation',
      description: 'Automated messaging system for TikTok that helps businesses engage with their audience and manage communications.',
      status: 'Coming Q2 2025',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      features: ['Auto-responses', 'Bulk messaging', 'Analytics tracking', 'Template library']
    },
    {
      icon: Scale,
      title: 'Legal Client Portal',
      description: 'Platform connecting lawyers with clients featuring AI chatbot for initial consultations and case management.',
      status: 'Planning Phase',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      features: ['AI consultation', 'Case management', 'Document sharing', 'Secure messaging']
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Coming Soon
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're constantly innovating to bring you the latest technology solutions. Here's what's coming next in our product pipeline.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingProducts.map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 ${product.bgColor} ${product.iconColor} rounded-xl flex items-center justify-center`}>
                  <product.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                    <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {product.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-4">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${product.color}`}></span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-14">
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-lg"
        >
          Get Notified When Available
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-md mx-auto rounded-2xl p-8 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Stay in the Loop
            </h2>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Enter your details and we’ll notify you when it’s ready.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <input type="hidden" name="_gotcha" />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-md transition"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {submitted && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Thank you! You'll be notified soon.</span>
        </div>
      )}
      </div>
    </section>
  )
}
