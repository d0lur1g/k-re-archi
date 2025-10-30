"use client";

import { Project, DisplayedProject } from "@/types/project";
import { createDisplayedProject } from "@/lib/layout";
import { PROJECT_CARD } from "@/lib/constants";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  // Utiliser le hook
  const scrollRef = useHorizontalScroll();

  // Calculer les projets affichables AVANT le render
  const displayedProjects: DisplayedProject[] = projects.map(createDisplayedProject);

  // Diviser les projets en deux lignes (2 rows)
  const topRow = displayedProjects.filter((_, index) => index % 2 === 0);
  const bottomRow = displayedProjects.filter((_, index) => index % 2 === 1);

  // Calculer la hauteur totale nécessaire pour les colonnes
  //const fixedHeight = 2 * PROJECT_CARD.BASE_SIZE + 16; // 360 + 360 + 16 gap = 736px

  return (
    <>
      {/* Zone de scroll horizontal */}
      {/* Zone de scroll horizontal */}
      <section
        ref={scrollRef}
        className="scrollbar-hide flex h-855 w-full items-center overflow-x-auto overflow-y-hidden"
      >
        {/* Wrapper avec colonnes pour le scroll horizontal */}
        <div className="flex px-12" style={{ minWidth: "min-content" }}>
          {/* Créer des colonnes : appaire les projets */}
          {topRow.map((project, index) => (
            <div key={`column-${index}`} className="flex flex-col">
              {/* Projet du haut */}
              <ProjectCard project={project} />
              {/* Projet du bas (s'il existe) */}
              {bottomRow[index] && <ProjectCard project={bottomRow[index]} />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
