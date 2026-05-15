"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";

// Define the type for a team member to ensure all properties are present
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin: string;
    github: string;
    twitter: string; // Explicitly defined, resolving the TS2339 error
  };
}

// Apply the interface to the data array
const team: TeamMember[] = [
  {
    name: "Muhammad Bin Asif",
    role: "Founder & Director",
    image: "/team/bini.jpg",
    bio: "Visionary leader with a passion for technology and innovation, dedicated to driving the company's mission forward.",
    social: {
      linkedin: "https://www.linkedin.com/in/mbinasif/",
      github: "https://github.com/MBinAsif",
      twitter: "", // Added missing property
    },
  },
  {
    name: "Muhammad Talha",
    role: "Co-Founder & Director",
    image: "/team/tal.jpg",
    bio: "Experienced software engineer with a passion for building scalable applications. Expert in full-stack development.",
    social: {
      linkedin: "https://www.linkedin.com/in/muhammad-talha-100949260/",
      github: "https://github.com/TalhahaRana",
      twitter: "", // Added missing property
    },
  },
  {
    name: "Daniyal Majid",
    role: "CTO & Director",
    image: "/team/ddani.png",
    bio: "Tech enthusiast, driving innovation and excellence in our projects. Expert in cloud computing and AI.",
    social: {
      linkedin: "",
      github: "https://github.com/DanyaalMajid",
      twitter: "", // Added missing property
    },
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="team"
      className="bg-muted/30 py-12 sm:py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            The Brain Behind Bridge Homies
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Our talented team of experts is passionate about creating
            exceptional digital experiences.
          </p>
        </motion.div>

        {/* On very small screens, allow horizontal scroll */}
        <div className="overflow-x-auto sm:overflow-x-visible -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="min-w-[280px] sm:min-w-0"
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className="relative w-full aspect-square bg-muted overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="text-center p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {member.bio}
                    </p>
                    <div className="mt-3 flex justify-center space-x-4 text-muted-foreground">
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} aria-label="LinkedIn">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} aria-label="GitHub">
                          <Github size={18} />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} aria-label="Twitter">
                          <Twitter size={18} />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
