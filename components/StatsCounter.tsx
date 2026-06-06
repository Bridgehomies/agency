"use client";

import { useEffect } from "react";

// KEYWORD: "ml model engineering services" — "ML Models Engineered" stat label
const STATS = [
  { id: "counter-projects", label: "ML Models Engineered", end: 15, suffix: "+" },
  { id: "counter-feedback", label: "Client Satisfaction",  end: 98, suffix: "%" },
  { id: "counter-team",     label: "ML Engineers",         end: 12, suffix: "+" },
  { id: "counter-launched", label: "Founded",              end: 2024, suffix: "" },
] as const;

function animateCounter(
  id: string,
  endValue: number,
  suffix: string = ""
): void {
  const el = document.getElementById(id);
  if (!el) return;

  let current = 0;
  const increment = Math.ceil(endValue / 50);

  const timer = setInterval(() => {
    current += increment;
    if (current >= endValue) {
      clearInterval(timer);
      el.textContent = `${endValue}${suffix}`;
    } else {
      el.textContent = `${current}${suffix}`;
    }
  }, 30);
}

export default function StatsCounter() {
  useEffect(() => {
    STATS.forEach(({ id, end, suffix }) => animateCounter(id, end, suffix));
  }, []);

  return (
    <div className="py-12 border-y border-gray-200/60 bg-gray-50/50 backdrop-blur-xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-8 divide-x divide-gray-200/50">
          {STATS.map(({ id, label }, i) => (
            <div key={id} className={`flex-1 ${i !== 0 ? "pl-8" : ""}`}>
              <div
                id={id}
                className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-1"
                aria-live="polite"
              >
                0
              </div>
              <div className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}