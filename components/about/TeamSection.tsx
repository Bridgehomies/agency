const engagementStages = [
  {
    title: "Understand the workflow",
    description: "Clarify business needs, current processes, and project requirements.",
  },
  {
    title: "Define the solution",
    description: "Plan product scope, software architecture, and implementation priorities.",
  },
  {
    title: "Build and support",
    description: "Develop the software and integrations, then plan maintenance around project needs.",
  },
];

export default function TeamSection() {
  return (
    <section className="mb-24 border-y border-gray-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="engagement-heading">
      <div className="mx-auto mb-12 max-w-7xl md:mb-16">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-purple-700">02 / Our approach</p>
        <h2 id="engagement-heading" className="mb-4 text-5xl font-black uppercase leading-[.9] tracking-tighter sm:text-6xl md:text-7xl">
          How we <span className="text-purple-800">work.</span>
        </h2>
        <p className="max-w-2xl text-base leading-7 text-gray-600">
          Bridge Homies works with businesses on software planning, engineering, integrations, and ongoing maintenance.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 md:grid-cols-3">
        {engagementStages.map((stage, index) => (
          <article key={stage.title} className="border-t border-gray-200 px-0 py-7 md:px-7 md:py-8 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-gray-200">
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.16em] text-purple-700">0{index + 1} / Step</p>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{stage.title}</h3>
            <p className="max-w-sm text-sm leading-7 text-gray-600">{stage.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
