export default function ClientsSection() {
  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800">
          Partners in <span className="text-gradient">Innovation</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're proud to collaborate with visionary organizations across industries.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
        <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
          <img src=" https://via.placeholder.com/128x64?text=Astra" alt="Astra" className="h-full object-contain" />
        </div>
        <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
          <img src=" https://via.placeholder.com/128x64?text=Nexus" alt="Nexus" className="h-full object-contain" />
        </div>
        <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
          <img src=" https://via.placeholder.com/128x64?text=Vanta" alt="Vanta" className="h-full object-contain" />
        </div>
        <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
          <img src=" https://via.placeholder.com/128x64?text=Orbit" alt="Orbit" className="h-full object-contain" />
        </div>
        <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
          <img src=" https://via.placeholder.com/128x64?text=Quasar" alt="Quasar" className="h-full object-contain" />
        </div>
      </div>
    </section>
  );
}