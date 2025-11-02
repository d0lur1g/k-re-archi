// src/components/sections/projects/ProjectHeader.tsx
"use client";

import { useState } from "react";
import { Project } from "@/types/project";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const { title, description, category, year, location, budget, surface_area } = project;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="flex h-180 items-center bg-white">
      {/* Description à gauche - 720px */}
      <div className="font-baiti h-full w-720 content-around border-b pr-24 pb-12 pl-12 text-justify">
        <h1 className="mb-4 text-5xl">{title}</h1>
        <div className="relative">
          <p
            className="line-clamp-6 text-[18px] leading-[100%]"
            onMouseEnter={(e) => {
              // Vérifier si le texte est tronqué
              const element = e.currentTarget;
              if (element.scrollHeight > element.clientHeight) {
                setShowTooltip(true);
              }
            }}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {description}
          </p>
          {/* Tooltip au survol */}
          {showTooltip && description && (
            <div className="absolute z-50 mt-2 w-full rounded-lg border border-neutral-300 bg-white p-4">
              <p className="text-[18px] leading-[100%] text-neutral-700">{description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Métadonnées à droite */}
      <div className="flex w-full flex-1 flex-col">
        <div className="flex flex-row justify-between pr-12">
          {category && (
            <div>
              <p className="font-baiti text-3xl">{category.name}</p>
            </div>
          )}

          {category && (
            <div>
              <p className="font-baiti inline-block h-full content-end-safe text-xl">{budget}</p>
            </div>
          )}
        </div>

        <div className="font-baiti flex w-full flex-row justify-between border-t-3 pr-12 text-xl">
          {year && (
            <div>
              <p className="">{year}</p>
            </div>
          )}

          {location && (
            <div>
              <p className="">{location}</p>
            </div>
          )}

          {surface_area && (
            <div>
              <p className="">{surface_area}m²</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
