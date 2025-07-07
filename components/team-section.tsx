"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";

const team = [
  {
    name: "Muhammad Bin Asif",
    role: "Founder & Director",
    image: "/team/bini.jpg",
    bio: "Visionary leader with a passion for technology and innovation, dedicated to driving the company's mission forward. ",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Muhammad Talha",
    role: "Co-Founder & Director",
    image: "/team/tal.jpg",
    bio: "Experienced software engineer with a passion for building scalable applications. Expert in full-stack development.",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Daniyal Majid",
    role: "CTO & Director",
    image: "/team/ddani.png",
    bio: "Tech enthusiast, driving innovation and excellence in our projects. Expert in cloud computing and AI.",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
];

export default function iTeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="team" className="p-20 md:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Brain Behind Bridge Homies
          </h2>
          <p className="text-xl text-muted-foreground">
            Our talented team of experts is passionate about creating
            exceptional digital experiences.
          </p>
        </motion.div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {team.map((member, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
        <div className="relative overflow-hidden">
          <div className="w-full aspect-square overflow-hidden bg-muted">
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
        <CardContent className="text-center p-6">
          <h3 className="text-xl font-bold mb-1">{member.name}</h3>
          <p className="text-primary font-medium mb-2">{member.role}</p>
          <p className="text-muted-foreground">{member.bio}</p>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>

      </div>
    </section>
  );
}
