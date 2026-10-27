export default function HeroSection() {
  return (
    <section className="relative flex min-h-[72vh] flex-col justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.035]" />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="mb-7 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-purple-600" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">About Bridge Homies</span>
          </div>
          <h1 className="text-6xl font-black uppercase leading-[.9] tracking-tighter sm:text-7xl md:text-8xl lg:text-[7rem]">
            Software<br />
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-gray-500 bg-clip-text text-transparent">Engineering.</span>
          </h1>
        </div>
        <div className="lg:col-span-4 lg:pb-2">
          <p className="max-w-xl text-lg font-medium leading-relaxed text-gray-600 sm:text-xl">
            Bridge Homies is a Lahore-based software engineering and AI company building custom business systems, SaaS products, web and mobile applications, and AI/ML software.
          </p>
          <div className="mt-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
            <span className="h-px w-8 bg-purple-600" />
            Lahore, Pakistan <span className="text-purple-600">/</span> Est. 2025
          </div>
        </div>
      </div>
    </section>
  );
}
