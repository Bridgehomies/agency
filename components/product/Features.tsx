import { Workflow, ReceiptText, Users, Package, BrainCircuit, Code2 } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: ReceiptText,
      title: 'Digital Invoicing',
      description: 'Aierpify provides digital invoicing and tax workflow capabilities for businesses.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'HR and Operations',
      description: 'OPleo supports human resources and company operations workflows.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Stockhale is a business inventory and management platform.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: BrainCircuit,
      title: 'AI Resume Tools',
      description: 'CV JET provides AI resume and CV tools.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Workflow,
      title: 'Business Workflows',
      description: 'Products across the portfolio support company operations, communication, and workflow management.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Code2,
      title: 'Software Products',
      description: 'Bridge Homies develops web platforms, SaaS products, and software tools.',
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
            Why Choose BRIDGE HOMIES?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The portfolio includes products for distinct business and software use cases. Availability and features vary by product.
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
