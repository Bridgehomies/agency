export default function HeroSection() {
  return (
    <section className="mb-24 md:mb-32 pl-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold leading-tight">
            <span className="text-gradient animate__animated animate__fadeInDown">We Craft</span><br />
            <span className="text-blue-600 animate__animated animate__fadeInDown animate__delay-1s">Digital</span><br />
            <span className="text-purple-600 animate__animated animate__fadeInDown animate__delay-2s">Experiences</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            Redefining boundaries in the digital landscape with innovative solutions that blend creativity and technology.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center floating shadow-2xl">
            <div className="absolute inset-0 bg-[url(' https://grainy-gradients.vercel.app/noise.svg ')] opacity-10 rounded-full"></div>
            <div className="absolute inset-0 rounded-full border-8 border-white opacity-20 animate-spin-slow"></div>
            <div className="absolute inset-8 rounded-full border-8 border-white opacity-10 animate-spin-slow-reverse"></div>
            <div className="bg-white rounded-full w-3/4 h-3/4 flex items-center justify-center shadow-xl hover-scale">
              <div className="text-center p-6">
                <span className="text-4xl md:text-5xl font-playfair font-bold text-blue-600">Since</span>
                <span className="block text-6xl md:text-7xl font-playfair font-bold text-purple-600">2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}