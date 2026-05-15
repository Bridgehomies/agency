"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BRIDGE_HOMIES_LOCATION = {
  title: "Bridge Homies",
  address1: "167/A",
  address2: "Block G1 Block G 1 Phase 1 Johar Town, Lahore, 54782, Pakistan",
  coords: { lat: 31.47865600031038, lng: 74.28096650859833 },
  placeId: "ChIJl3C-8LADGTkRl72j2jfjjU8",
  actions: [
    {
      label: "Book appointment",
      defaultUrl: "https://www.bridgehomies.com/#contact",
    },
  ],
};

const LOCATOR_CONFIG = {
  locations: [BRIDGE_HOMIES_LOCATION],
  mapOptions: {
    center: { lat: 31.47865600031038, lng: 74.28096650859833 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    zoom: 15,
    zoomControl: true,
    maxZoom: 17,
    mapId: "DEMO_MAP_ID",
  },
  mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  capabilities: {
    input: false,
    autocomplete: false,
    directions: false,
    distanceMatrix: false,
    details: true,
    actions: true,
  },
};

const INFO_ITEMS = [
  { label: "Address", value: "167/A Block G1, Johar Town" },
  { label: "City", value: "Lahore, Punjab" },
  { label: "Hours", value: "Mon–Fri, 10am–8pm PST" },
  { label: "Team", value: "15+ members" },
];

export default function InteractiveMap() {
  const locatorRef = useRef<HTMLElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

    const apiLoader = document.createElement("gmpx-api-loader");
    apiLoader.setAttribute("key", apiKey);
    apiLoader.setAttribute("solution-channel", "GMP_QB_locatorplus_v11_cF");
    document.head.appendChild(apiLoader);

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";
    document.head.appendChild(script);

    script.onload = async () => {
      await customElements.whenDefined("gmpx-store-locator");
      const locator = locatorRef.current as HTMLElement & {
        configureFromQuickBuilder?: (config: typeof LOCATOR_CONFIG) => void;
      };
      if (locator?.configureFromQuickBuilder) {
        locator.configureFromQuickBuilder(LOCATOR_CONFIG);
      }
    };
  }, []);

  return (
    <section className="relative py-24 md:py-36 overflow-hidden ">

      {/* Decorative grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent glow top-left */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-500 opacity-[0.04] blur-[120px]" />

      <div className="relative container max-w-7xl mx-auto px-6">

        {/* Header row — asymmetric, oversized */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-purple-500" />
              <span
                className="text-[11px] tracking-[0.25em] uppercase text-purple-500 font-medium"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Find Us
              </span>
            </div>
            <h2
              className="text-5xl md:text-7xl font-black leading-none text-black/80"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
            >
              Our
              <br />
              <span className="text-purple-500">Studio.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-black/50 max-w-xs md:text-right leading-relaxed"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Bridge Homies is rooted in Johar Town, Lahore — a creative hub where
            ideas are built into products.
          </motion.p>
        </div>

        {/* Map + Info card layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Map */}
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{
              height: "560px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
            }}
          >
            <gmpx-store-locator
              ref={locatorRef}
              map-id="DEMO_MAP_ID"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Floating info card — overlaps bottom-left of map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="absolute -bottom-6 left-6 md:left-10 z-10"
            style={{
              background: "rgba(14,14,14,0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "28px 32px",
              minWidth: "280px",
            }}
          >
            {/* Card header */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full text-[#0a0a0a] text-xs font-bold"
                style={{ background: "#9f77e6", fontFamily: "'Syne', sans-serif" }}
              >
                BH
              </span>
              <div>
                <p
                  className="text-white text-sm font-semibold leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Bridge Homies
                </p>
                <p
                  className="text-white/40 text-xs mt-0.5"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Headquarters
                </p>
              </div>
              {/* Live dot */}
              <span className="ml-auto flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                <span
                  className="text-[10px] text-purple-500 tracking-wider"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  OPEN
                </span>
              </span>
            </div>

            {/* Info rows */}
            <div className="space-y-3">
              {INFO_ITEMS.map((item, i) => (
                <div key={i} className="flex items-baseline justify-between gap-8">
                  <span
                    className="text-[10px] tracking-widest uppercase text-white/30"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-xs text-white/80 text-right"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="mt-5 pt-5 border-t border-white/[0.07]">
              <a
                href="https://www.bridgehomies.com/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full group"
              >
                <span
                  className="text-xs text-purple-500 tracking-wider uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Book a visit
                </span>
                <span className="text-purple-500 text-sm transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </motion.div>

          {/* Coordinates badge — top-right corner of map */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute top-4 right-4 z-10"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "6px 12px",
            }}
          >
            <p
              className="text-[10px] text-white/50 tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              31.4787° N · 74.2810° E
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom spacer for floating card overflow */}
        <div className="h-10" />
      </div>

      {/* Load Syne + DM Mono fonts */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}