export type ImageLayout = "1-single" | "2-horizontal" | "2-vertical" | "2x2";

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  display_order: number;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category?: ProjectCategory;
  year?: number;
  location?: string;
  surface_area?: number;
  images: ProjectImage[]; // Toutes les images du projet
  created_at?: string;
  updated_at?: string;
}

/**
 * Version "rendue" d'un projet avec layout et images à afficher
 */
export interface DisplayedProject extends Project {
  displayImages: ProjectImage[];
  layout: ImageLayout;
}
