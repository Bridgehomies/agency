import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Product Discovery",
    description: "Map workflows, define requirements, and prioritize features before development.",
    icon: "📱",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Custom Software",
    description: "Build business systems, portals, dashboards, and workflow tools around project needs.",
    icon: "⚡",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "APIs & Integrations",
    description: "Connect applications and business systems through APIs and service integrations.",
    icon: "🎯",
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Ongoing Maintenance",
    description: "Plan software updates, maintenance, and support after launch.",
    icon: "🚀",
    color: "from-orange-500 to-amber-400",
  },
]

export default function StickyTransformSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
            Software Engineering Services
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Support for product planning, software delivery, integrations, and ongoing maintenance.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="group h-full border-none shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="p-4 text-center sm:p-6">
                <div aria-hidden="true" className="mb-4 text-3xl sm:text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-base font-semibold sm:text-lg">{feature.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground sm:text-base">{feature.description}</p>
                <Badge className={`border-none bg-gradient-to-r ${feature.color} text-white`}>Service</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 sm:h-96 sm:w-96" />
    </section>
  )
}
