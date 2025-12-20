import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center pt-16">
      {/* Floating Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/5 w-[26rem] h-[26rem] bg-purple-200 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center">
          {/* Tag */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              ERP Software with FBR Integration Now Live!
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6 animate-slide-up">
            Innovative Software Solutions
            <span className="block text-purple-400">
              for Modern Businesses
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            We build next-generation software to automate workflows, enhance visibility, and drive real growth across Pakistan and beyond.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <a href="#products">
            <Button className="bg-gradient-to-r from-fuchsia-400 to-purple-600 hover:from-primary/50 hover:to-purple-600/50 text-white flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold group">
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            </a>

            
          </div>

          {/* Brands Section */}
          {/* <div className="mt-20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-gray-500 mb-4">Trusted by modern businesses</p>
            <div className="flex justify-center items-center gap-6 opacity-60">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-24 h-8 bg-gray-300 rounded animate-pulse" />
              ))}1
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
