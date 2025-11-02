// src/lib/projects.ts

import { projectsData } from "@/data/projects";
import { Project } from "@/types/project";

/**
 * Récupère un projet par son slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug);
}

/**
 * Récupère tous les projets
 */
export function getAllProjects(): Project[] {
  return projectsData;
}

/**
 * Récupère les slugs du projet précédent et suivant
 */
export function getAdjacentProjects(currentSlug: string): {
  previous?: string;
  next?: string;
} {
  const currentIndex = projectsData.findIndex((project) => project.slug === currentSlug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previous: currentIndex > 0 ? projectsData[currentIndex - 1].slug : undefined,
    next: currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1].slug : undefined,
  };
}

/**
 * Génère les paramètres statiques pour Next.js
 */
export function getAllProjectSlugs() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}
