import { Shield, Zap, Users, Globe, Lock, HeadphonesIcon } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and compliance with international standards.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with cloud infrastructure ensuring quick response times.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built-in collaboration tools with real-time updates and role-based access control.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Multi-language support and localization for businesses operating internationally.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'GDPR compliant with advanced data protection and privacy controls.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock technical support with dedicated account managers.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ]

  return (
    <section className="py-24 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Why Choose TechFlow?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our solutions are built with the latest technology and best practices to ensure your business stays ahead of the competition.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-gray-200 p-8 text-center transition-shadow hover:shadow-md"
            >
              <div
                className={`mx-auto flex items-center justify-center w-16 h-16 ${feature.bgColor} ${feature.color} rounded-xl mb-6`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
