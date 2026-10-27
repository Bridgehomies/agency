export default function ValuesSection() {
  return (
    <section className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        {/* Left Side */}
        <div className="relative flex min-h-[360px] items-end overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-white via-purple-50 to-violet-100 p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-12 -top-16 h-72 w-72 rounded-full bg-purple-300/35 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(rgba(91,33,182,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(91,33,182,.18) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="relative">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-purple-700">03 / What guides us</p>
            <h2 className="text-5xl font-black uppercase leading-[.9] tracking-tighter text-gray-900 sm:text-7xl">
              Core<br /><span className="text-purple-700">values.</span>
            </h2>
          </div>
        </div>

        {/* Right Side */}
        <div className="grid gap-0 rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm sm:px-8">
          {/* Value 1 */}
          <div className="group border-t border-gray-200 py-5 transition-colors hover:border-purple-400">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 font-mono text-xs text-purple-700">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 transition group-hover:text-purple-700">
                  Innovation First
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  We challenge conventions and embrace emerging technologies to
                  deliver cutting-edge solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Value 2 */}
          <div className="group border-t border-gray-200 py-5 transition-colors hover:border-purple-400">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 font-mono text-xs text-purple-700">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 transition group-hover:text-purple-700">
                  Human-Centered
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Every decision starts with people—understanding needs,
                  behaviors, and aspirations.
                </p>
              </div>
            </div>
          </div>

          {/* Value 3 */}
          <div className="group border-t border-gray-200 py-5 transition-colors hover:border-purple-400">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 font-mono text-xs text-purple-700">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 transition group-hover:text-purple-700">
                  Radical Transparency
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Open communication builds trust with our team, clients, and
                  community.
                </p>
              </div>
            </div>
          </div>

          {/* Value 4 */}
          <div className="group border-t border-gray-200 py-5 transition-colors hover:border-purple-400">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 font-mono text-xs text-purple-700">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 transition group-hover:text-purple-700">
                  Sustainable Growth
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  We measure success not just by profits, but by positive impact
                  and lasting relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
