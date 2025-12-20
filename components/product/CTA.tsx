import { ArrowRight, Star } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Decorative Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Star Rating */}
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="ml-3 text-white/90 text-sm sm:text-base">
            Rated 4.9/5 by 50+ customers
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Ready to Transform Your Business?
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10">
          Join hundreds of growing businesses already revolutionizing their operations
          with our cutting-edge software.
        </p>

        {/* CTA Buttons */}
        {/* <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center group">
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-all">
            Schedule a Demo
          </button>
        </div> */}

        {/* Benefits Row */}
        
      </div>
    </section>
  )
}
