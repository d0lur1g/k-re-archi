// src/lib/layout.ts

import { ImageLayout, Project, ProjectImage, DisplayedProject } from "@/types/project";

/**
 * Détermine le layout à afficher basé sur le nombre d'images
 */
export function determineLayout(imageCount: number): ImageLayout {
  switch (imageCount) {
    case 1:
      return "1-single";
    case 2:
      return "2-horizontal";
    case 3:
      return "2-horizontal";
    case 4:
      return "2x2";
    default:
      return imageCount > 2 ? "2x2" : imageCount === 2 ? "2-horizontal" : "1-single";
  }
}

/**
 * Récupère les images à afficher selon le nombre maximal
 */
export function getDisplayImages(images: ProjectImage[]): ProjectImage[] {
  // La copie est indispensable : sort() trie en place et muterait le tableau du
  // module de données, partagé entre toutes les requêtes côté serveur.
  return [...images].sort((a, b) => a.display_order - b.display_order).slice(0, 4);
}

/**
 * Crée un objet DisplayedProject avec layout et images à afficher
 */
export function createDisplayedProject(project: Project): DisplayedProject {
  const displayImages = getDisplayImages(project.images);
  const layout = determineLayout(displayImages.length);

  return {
    ...project,
    displayImages,
    layout,
  };
}
