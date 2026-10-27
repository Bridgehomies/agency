const facts = [
  ["Based in", "Lahore, Pakistan"],
  ["Working with", "Businesses and product teams"],
  ["Software", "Custom systems, SaaS, web, and mobile"],
  ["Engineering", "AI/ML, automation, and integrations"],
];

export default function StorySection() {
  return (
    <section className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-purple-700">01 / Our story</p>
          <h2 className="mb-7 text-5xl font-black uppercase leading-[.9] tracking-tighter sm:text-6xl md:text-7xl">
            Built around<br /><span className="text-purple-800">the work.</span>
          </h2>
          <div className="space-y-5 text-gray-600">
            <p className="text-base leading-8">
              Bridge Homies is a Lahore-based software engineering and AI company. We work with businesses and teams to plan and build custom software, SaaS products, web and mobile applications, AI/ML systems, workflow automation, and integrations.
            </p>
            <p className="text-base leading-8">
              Projects start with the workflow, users, existing systems, and constraints. We use that context to shape the scope and technical approach, then build software to fit the product and the people who will use it.
            </p>
            <p className="text-base leading-8">
              Our work spans product discovery, architecture, engineering, integration, deployment, and ongoing improvements, depending on what each project needs.
            </p>
          </div>
        </div>
        <dl className="grid w-full grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-7">
          {facts.map(([label, value]) => (
            <div key={label} className="min-h-32 border-t border-gray-200 py-5">
              <dt className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-purple-700">{label}</dt>
              <dd className="text-sm leading-6 text-gray-700">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
