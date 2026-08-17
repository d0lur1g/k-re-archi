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
    <section className="bg-surface flex h-180 items-center">
      {/* Description à gauche - 720px */}
      <div className="font-body h-full w-720 content-around border-b pr-24 pb-12 pl-12 text-justify">
        <h1 className="text-heading mb-4">{title}</h1>
        <div className="relative">
          {/* La troncature est purement visuelle (line-clamp), les lecteurs d'écran
              lisent le texte entier : le tooltip sert aux utilisateurs voyants,
              souris ou clavier (tabIndex + focus), Escape pour fermer. */}
          <p
            className="text-reading leading-flush line-clamp-6"
            tabIndex={0}
            onMouseEnter={(e) => {
              // Vérifier si le texte est tronqué
              const element = e.currentTarget;
              if (element.scrollHeight > element.clientHeight) {
                setShowTooltip(true);
              }
            }}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={(e) => {
              const element = e.currentTarget;
              if (element.scrollHeight > element.clientHeight) {
                setShowTooltip(true);
              }
            }}
            onBlur={() => setShowTooltip(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowTooltip(false);
            }}
          >
            {description}
          </p>
          {/* Bordure line (21:1) et non line-muted (1,48:1, non conforme WCAG 1.4.11
              en frontière seule) : décision O6 */}
          {showTooltip && description && (
            <div
              role="tooltip"
              className="border-line bg-surface rounded-ui absolute z-50 mt-2 w-full border p-12"
            >
              <p className="text-ink-muted text-reading leading-flush">{description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Métadonnées à droite */}
      <div className="flex w-full flex-1 flex-col">
        <div className="flex flex-row justify-between pr-12">
          {category && (
            <div>
              <p className="font-body text-nav">{category.name}</p>
            </div>
          )}

          {category && (
            <div>
              <p className="font-body text-meta inline-block h-full content-end-safe">{budget}</p>
            </div>
          )}
        </div>

        <div className="font-body text-meta flex w-full flex-row justify-between border-t-3 pr-12">
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
