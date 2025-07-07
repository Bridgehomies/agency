export default function ValuesSection() {
  return (
    <section className="mb-24 md:mb-32 px-6 md:px-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="relative h-full min-h-96 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
          <div className="relative h-full flex items-center justify-center p-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white text-center drop-shadow-lg">
              Our <span className="text-white/90">Core</span> Values
            </h2>
          </div>
        </div>

        {/* Right Side */}
        <div className="grid gap-8">
          {/* Value 1 */}
          <div className="group backdrop-blur-md bg-white/70 hover:bg-white/90 transition-all duration-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition">
                  Innovation First
                </h3>
                <p className="text-gray-600 mt-1">
                  We challenge conventions and embrace emerging technologies to deliver cutting-edge solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Value 2 */}
          <div className="group backdrop-blur-md bg-white/70 hover:bg-white/90 transition-all duration-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition">
                  Human-Centered
                </h3>
                <p className="text-gray-600 mt-1">
                  Every decision starts with people—understanding needs, behaviors, and aspirations.
                </p>
              </div>
            </div>
          </div>

          {/* Value 3 */}
          <div className="group backdrop-blur-md bg-white/70 hover:bg-white/90 transition-all duration-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition">
                  Radical Transparency
                </h3>
                <p className="text-gray-600 mt-1">
                  Open communication builds trust with our team, clients, and community.
                </p>
              </div>
            </div>
          </div>

          {/* Value 4 */}
          <div className="group backdrop-blur-md bg-white/70 hover:bg-white/90 transition-all duration-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition">
                  Sustainable Growth
                </h3>
                <p className="text-gray-600 mt-1">
                  We measure success not just by profits, but by positive impact and lasting relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}