import {
  Calculator,
  TrendingUp,
  FileText,
  ArrowRight,
  Lock,
  Cloud,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function FeaturedProduct() {
  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* The Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-fr">
          
          {/* 1. HERO BLOCK (Spans 8 columns) */}
          <div className="lg:col-span-8 flex flex-col justify-center bg-white p-2">
            <div className="inline-flex items-center w-max px-4 py-1.5 bg-green-100 text-green-700 rounded-none text-sm font-bold tracking-widest uppercase mb-8 border-l-4 border-green-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-3"></span>
              Module Status: Live
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
              SMART ERP. <br />
              <span className="text-green-600">FBR INTEGRATED.</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed mb-10">
              Stop waiting on compliance. Generate and submit invoices to the FBR instantly, while we build the rest of your command center.
            </p>

            <div>
              <a href="https://www.aierpify.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <button className="group flex items-center gap-4 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-none transition-all">
                  TRY INVOICING NOW
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </a>
            </div>
          </div>

          {/* 2. THE LIVE FEATURE BLOCK (Spans 4 columns) */}
          <div className="lg:col-span-4 relative bg-green-50 border-4 border-green-100 p-8 rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden group hover:border-green-300 transition-colors flex flex-col justify-between min-h-[320px]">
            {/* Background Watermark */}
            <div className="absolute -right-6 -bottom-10 text-9xl font-black text-green-100/50 select-none transform -rotate-12 group-hover:scale-110 transition-transform duration-700">
              FBR
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-none flex items-center justify-center mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">FBR Invoicing</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Fully functional and natively connected with FBR Pakistan. Direct submission, tax automation, and compliant reporting—ready today.
              </p>
            </div>
            
            <div className="relative z-10 mt-8 pt-4 border-t-2 border-green-200">
              <span className="text-green-700 font-black tracking-widest uppercase text-sm">Status: Operational</span>
            </div>
          </div>

          {/* 3. UPCOMING MODULE: ANALYTICS (Spans 4 columns) */}
          <div className="lg:col-span-4 bg-white border-2 border-dashed border-blue-200 p-8 rounded-tl-[3rem] rounded-br-[3rem] hover:bg-blue-50/50 hover:border-blue-400 transition-all cursor-crosshair relative">
            <div className="absolute top-6 right-6 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3 h-3" /> Building
            </div>
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-none flex items-center justify-center mb-6">
              <Calculator className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Smart Analytics</h3>
            <p className="text-gray-600 font-medium">
              Powerful dashboards to track business performance and revenue insights.
            </p>
          </div>

          {/* 4. UPCOMING MODULE: INVENTORY (Spans 4 columns) */}
          <div className="lg:col-span-4 bg-white border-2 border-dashed border-purple-200 p-8 rounded-none hover:bg-purple-50/50 hover:border-purple-400 transition-all cursor-crosshair relative">
            <div className="absolute top-6 right-6 bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3 h-3" /> Building
            </div>
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-none flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Stock & Inventory</h3>
            <p className="text-gray-600 font-medium">
              Real-time stock tracking and inventory control features for full asset visibility.
            </p>
          </div>

          {/* 5. CORE INFRASTRUCTURE (Spans 4 columns) */}
          <div className="lg:col-span-4 bg-gray-50 border border-gray-200 p-8 rounded-tr-[3rem] rounded-bl-[3rem]">
            <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">
              Core Architecture
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 leading-none mb-1">Automated Tax</div>
                  <div className="text-sm text-gray-500">Live compliance</div>
                </div>
              </li>
              <li className="flex items-start gap-4 opacity-60">
                <Lock className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 leading-none mb-1">Role-Based Access</div>
                  <div className="text-sm text-gray-500">In development</div>
                </div>
              </li>
              <li className="flex items-start gap-4 opacity-60">
                <Cloud className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 leading-none mb-1">Cloud + Offline</div>
                  <div className="text-sm text-gray-500">In development</div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}