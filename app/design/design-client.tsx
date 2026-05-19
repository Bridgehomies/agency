// app/design/design-client.tsx
"use client";

import React, { useEffect } from "react";

// ─── Stats Counter (client-only interactive component) ─────────────────────
export const StatsCounter: React.FC = () => {
  const animateCounter = (id: string, endValue: number, suffix = "") => {
    const element = document.getElementById(id);
    if (!element) return;
    let current = 0;
    const increment = Math.ceil(endValue / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        clearInterval(timer);
        element.textContent = `${endValue}${suffix}`;
      } else {
        element.textContent = `${current}${suffix}`;
      }
    }, 30);
  };

  useEffect(() => {
    animateCounter("counter-projects", 30, "+");
    animateCounter("counter-feedback", 97, "%");
    animateCounter("counter-team", 3, "+");
    animateCounter("counter-launched", 2024, "");
  }, []);

  return (
    <div className="py-12 border-y border-gray-200/60 bg-gray-50/50 backdrop-blur-xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-8 divide-x divide-gray-200/50">
          {[
            { id: "counter-projects", label: "Projects Delivered" },
            { id: "counter-feedback", label: "Client Satisfaction" },
            { id: "counter-team", label: "Creative Experts" },
            { id: "counter-launched", label: "Founded" },
          ].map((stat, i) => (
            <div key={i} className={`flex-1 ${i !== 0 ? "pl-8" : ""}`}>
              <div id={stat.id} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-1">
                0
              </div>
              <div className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};