// src/components/sections/projects/ProjectGallery.tsx

"use client";

import Image from "next/image";
import { ProjectImage } from "@/types/project";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const scrollRef = useHorizontalScroll();
  const isSingleImage = images.length === 1;

  return (
    <section
      ref={scrollRef}
      className="scrollbar-hide h-630 overflow-x-auto overflow-y-hidden scroll-smooth bg-white py-12"
    >
      <div
        className={`flex h-full gap-6 px-12 ${
          isSingleImage ? "items-center justify-center" : "items-center"
        }`}
        style={{ minWidth: isSingleImage ? "100%" : "min-content" }}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="relative h-full shrink overflow-hidden bg-neutral-100"
            style={{ width: "auto", aspectRatio: "4/3" }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 800px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
