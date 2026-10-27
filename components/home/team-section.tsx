"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const engagementSteps = [
  {
    title: "Discover",
    description: "Map workflows, define requirements, and prioritize product features.",
  },
  {
    title: "Design",
    description: "Plan software architecture, user flows, and the scope for implementation.",
  },
  {
    title: "Develop",
    description: "Build custom software, web and mobile apps, integrations, and AI/ML systems.",
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="delivery-approach" className="bg-muted/30 py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">From Product Scope to Software</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Work with Bridge Homies on product planning, software delivery, and the integrations and maintenance a project requires.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {engagementSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-sm font-semibold text-primary mb-4">0{index + 1}</p>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
