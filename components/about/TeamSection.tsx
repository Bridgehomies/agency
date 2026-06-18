import { FaLinkedin } from "react-icons/fa";

const TEAM = [
  {
    img: "/team/bini.png",
    alt: "MBA",
    name: "Muhammad Bin Asif",
    role: "Founder & Director",
    bio: "Visionary leader with 2+ years in digital transformation and strategic innovation.",
    color: "blue",
    linkedin: "https://www.linkedin.com/in/mbinasif/",
  },
  {
    img: "/team/tal.jpg",
    alt: "MT",
    name: "Muhammad Talha",
    role: "Co-Founder & Director",
    bio: "Experienced software engineer specialising in full-stack development and scalable application architecture.",
    color: "purple",
    linkedin: "https://www.linkedin.com/in/muhammad-talha-100949260/",
  },
  {
    img: "/team/ddani.png",
    alt: "DM",
    name: "Danyaal Majid",
    role: "CTO & Director",
    bio: "Technology architect building scalable, future-proof digital solutions with deep expertise in cloud and AI.",
    color: "blue",
    linkedin: "https://www.linkedin.com/in/danyaal-majid/",
  },
  {
    img: "/team/zain.jpg",
    alt: "Z",
    name: "Zain",
    role: "Video Editor Head",
    bio: "Creative video editor with a passion for storytelling and visual effects. Expert in Adobe Premiere Pro and After Effects.",
    color: "blue",
    linkedin: null,
  },
];

const colors: Record<string, { border: string; bg: string; text: string; hover: string }> = {
  blue:   { border: "border-blue-500",   bg: "bg-blue-100",   text: "text-blue-600",   hover: "group-hover:bg-blue-600" },
  purple: { border: "border-purple-500", bg: "bg-purple-100", text: "text-purple-600", hover: "group-hover:bg-purple-600" },
};

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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {TEAM.map(({ img, alt, name, role, bio, color, linkedin }) => {
          const c = colors[color];
          return (
            <div
              key={name}
              className={`bg-white p-8 rounded-xl shadow-lg hover-scale transition-all duration-300 border-t-4 ${c.border} group hover:bg-gradient-to-b hover:from-${color}-50 hover:to-white`}
            >
              <div className={`w-24 h-24 rounded-full ${c.bg} mb-6 mx-auto flex items-center justify-center ${c.text} text-3xl font-bold transition-all duration-300 ${c.hover} group-hover:text-white`}>
                <img src={img} alt={alt} className="w-full h-full rounded-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">{name}</h3>
              <p className={`${c.text} text-center mb-4`}>{role}</p>
              <p className="text-gray-600 text-center mb-4">{bio}</p>
              {linkedin && (
                <div className="flex justify-center">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-blue-600 hover:text-blue-800 text-xl" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}