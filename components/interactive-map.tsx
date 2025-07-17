"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building, Users, MapPin } from "lucide-react";

// Lahore-based office locations with actual lat/lng coordinates
const offices = [
  {
    id: 1,
    name: "Main Office - Lahore",
    location: "Lahore, Punjab, Pakistan",
    coordinates: { lat: 31.5204, lng: 74.3587 }, // Approximate central Lahore
    employees: 10,
    type: "headquarters",
  },
];

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof offices)[0] | null
  >(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const viewMode = "offices"; // Only show offices

  // Load Google Maps script
  useEffect(() => {
    // Instead of loading Google Maps JS API, embed the Google Map via iframe
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.innerHTML = `
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3402.6573279127138!2d74.27841282426151!3d31.478611275730255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x391903b0f0be7097%3A0x4f8de337daa3bd97!2sBridge%20Homies%2C%20167%2FA%2C%20Block%20G1%20Johar%20Town%2C%20Lahore%2C%2054782%2C%20Pakistan!3m2!1d31.4786926!2d74.2809075!5e0!3m2!1sen!2sus!4v1752753801472!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      `;
    }
    // No cleanup needed for iframe
  }, []);

  // The following block is not needed when using an iframe for Google Maps, so it should be removed.
  // If you want to use Google Maps JS API, you need to load the API and create a map instance.
  // Since you are embedding via iframe, remove this block entirely.

  // Update map center when a location is selected
  useEffect(() => {
    if (map && selectedLocation) {
      map.panTo(selectedLocation.coordinates);
    }
  }, [selectedLocation, map]);

  return (
    <section className="py-20 md:py-32">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Offices in Lahore
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore our development studios across Lahore
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Google Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  id="map"
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden"
                ></div>
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedLocation ? "Office Details" : "Office Overview"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedLocation ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">
                        {selectedLocation.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">
                          {selectedLocation.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm capitalize">
                        {selectedLocation.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedLocation.employees} employees
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-4 text-muted-foreground">
                      Select an office marker to see details.
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {offices.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Offices
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          50+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Team Members
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Click on any marker to see detailed information about each
                      office in Lahore.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
