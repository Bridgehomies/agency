import { TrendingUp, Users, Shield, Zap } from 'lucide-react'

export default function Stats() {
  const stats = [
    {
      icon: TrendingUp,
      number: '50+',
      label: 'Businesses Served',
      description: 'Growing companies trust our solutions'
    },
    
    {
      icon: Shield,
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable and secure infrastructure'
    },
    {
      icon: Zap,
      number: '24/7',
      label: 'Support',
      description: 'Round-the-clock technical assistance'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}