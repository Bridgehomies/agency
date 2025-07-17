import {
  CheckCircle,
  Calculator,
  TrendingUp,
  FileText,
  Clock,
} from 'lucide-react'

export default function FeaturedProduct() {
  const features = [
    'Live Invoicing with FBR integration',
    'Coming Soon: Business analytics & reporting',
    'Coming Soon: Inventory and stock tracking',
    'Role-based access (coming soon)',
    'Cloud-based system with offline mode (upcoming)',
    'Automated tax compliance (live)'
  ]

  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            ✅ Invoicing is Live
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ERP Software with FBR Integration
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instantly generate and submit invoices to FBR with our live smart invoicing module. 
            More powerful ERP modules including analytics and inventory are coming soon.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Features */}
          <div className="space-y-10">
            {/* LIVE Feature */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">FBR Invoicing (Live)</h3>
                <p className="text-gray-600">
                  Fully functional invoicing system connected with FBR Pakistan, 
                  enabling direct submission, tax automation, and compliant reporting.
                </p>
              </div>
            </div>

            {/* Upcoming Features */}
            {[{
              icon: Calculator,
              title: 'Smart Analytics (Coming Soon)',
              color: 'bg-blue-100 text-blue-600',
              description: 'Soon you’ll be able to track business performance and revenue insights with powerful dashboards.'
            }, {
              icon: TrendingUp,
              title: 'Inventory & Stock (Coming Soon)',
              color: 'bg-purple-100 text-purple-600',
              description: 'We’re working on real-time stock tracking and inventory control features to give you full visibility.'
            }].map(({ icon: Icon, title, color, description }, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              </div>
            ))}

            {/* Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle className={`w-5 h-5 ${feature.includes('Live') ? 'text-green-600' : 'text-yellow-500'}`} />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="https://www.aierpify.com" target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition">
                    Try Invoicing Now
                </button>
                </a>

              
            </div>
          </div>

          {/* Right: Dashboard Card */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-md">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Dashboard Overview</h4>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Live</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₨2.4M</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1,847</div>
                    <div className="text-sm text-gray-600">Invoices Processed</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>FBR Compliance</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-green-500 h-2 rounded-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
