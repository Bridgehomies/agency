import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function TeamSection() {
  return (
    <section className="mb-24 md:mb-32 mx-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800">
          The <span className="text-gradient">Minds</span> Behind
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A diverse collective of thinkers, makers, and problem-solvers united by a shared passion for excellence.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover-scale transition-all duration-300 border-t-4 border-blue-500 group hover:bg-gradient-to-b hover:from-blue-50 hover:to-white">
          <div className="w-24 h-24 rounded-full bg-blue-100 mb-6 mx-auto flex items-center justify-center text-blue-600 text-3xl font-bold transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
            MBA
          </div>
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Muhammad Bin Asif</h3>
          <p className="text-purple-600 text-center mb-4">Founder & Director</p>
          <p className="text-gray-600 text-center mb-4">
            Visionary leader with 15+ years in digital transformation and strategic innovation.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/mbinasif/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-600 hover:text-blue-800 text-xl" />
            </a>
            {/* <a href="https://github.com/sample1" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-800 hover:text-black text-xl" />
            </a> */}
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover-scale transition-all duration-300 border-t-4 border-purple-500 group hover:bg-gradient-to-b hover:from-purple-50 hover:to-white">
          <div className="w-24 h-24 rounded-full bg-purple-100 mb-6 mx-auto flex items-center justify-center text-purple-600 text-3xl font-bold transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white">
            MT
          </div>
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Muhammad Talha</h3>
          <p className="text-blue-600 text-center mb-4">Co-Founder & Director</p>
          <p className="text-gray-600 text-center mb-4">
            Design thinker bridging aesthetics and functionality across digital experiences.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/muhammad-talha-100949260/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-600 hover:text-blue-800 text-xl" />
            </a>
            {/* <a href="https://github.com/sample2" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-800 hover:text-black text-xl" />
            </a> */}
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover-scale transition-all duration-300 border-t-4 border-blue-500 group hover:bg-gradient-to-b hover:from-blue-50 hover:to-white">
          <div className="w-24 h-24 rounded-full bg-blue-100 mb-6 mx-auto flex items-center justify-center text-blue-600 text-3xl font-bold transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
            DM
          </div>
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Danyaal Majid</h3>
          <p className="text-purple-600 text-center mb-4">CTO & Director</p>
          <p className="text-gray-600 text-center mb-4">
            Technology architect building scalable, future-proof digital solutions.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/danyaal-majid/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-600 hover:text-blue-800 text-xl" />
            </a>
            {/* <a href="https://github.com/sample3" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-800 hover:text-black text-xl" />
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}