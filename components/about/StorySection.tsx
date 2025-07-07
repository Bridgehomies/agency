export default function StorySection() {
  return (
    <section className="mb-24 md:mb-32 px-8">
      <div className="flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8 text-gray-800">
            Our <span className="text-blue-600">Story</span>
          </h2>
          <div className="space-y-6 text-gray-600">
            <p className="text-lg text-justify">
              Founded in a small studio with just three people, we've grown into a team of creative professionals across continents.
            </p>
            <p className="text-lg text-justify">
              What began as a passion project has transformed into an award-winning digital agency recognized for pushing boundaries.
            </p>
            <p className="text-lg text-justify">
              Our journey reflects our commitment to innovation, quality, and meaningful relationships with our clients.
            </p>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-xl hover-scale transition-all duration-300">
              <div className="text-blue-600 text-4xl font-bold mb-2">1+</div>
              <div className="text-gray-600">Years in business</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl hover-scale transition-all duration-300">
              <div className="text-purple-600 text-4xl font-bold mb-2">30+</div>
              <div className="text-gray-600">Projects delivered</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl hover-scale transition-all duration-300">
              <div className="text-purple-600 text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-600">Client retention</div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}