"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const videoProjects = [
  {
    id: 1,
    title: "Punjab Horse & Cattle Show",
    thumbnail: "/digital/thumbnail/pro1.png",
    videoUrl: "/digital/proj1.mp4",
  },
  {
    id: 2,
    title: "Event Highlights",
    thumbnail: "digital/thumbnail/pro2.png",
    videoUrl: "/digital/pro2.mp4",
  },
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    videoUrl: string;
  } | null>(null);

  return (
    <section id="video-gallery" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Video Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videoProjects.map((video) => (
            <div
              key={video.id}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-5.197-3.028A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.028a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-3xl w-full aspect-video">
            <DialogHeader>
              <DialogTitle>{selectedVideo?.title}</DialogTitle>
            </DialogHeader>
            <div className="w-full aspect-video rounded overflow-hidden">
              {selectedVideo && (
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-contain rounded"
                  src={selectedVideo.videoUrl}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
