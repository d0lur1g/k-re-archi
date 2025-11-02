// src/app/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectHeader from "@/components/sections/projects/ProjectHeader";
import ProjectGallery from "@/components/sections/projects/ProjectGallery";
import ProjectNavigation from "@/components/sections/projects/ProjectNavigation";
import { getProjectBySlug, getAdjacentProjects, getAllProjectSlugs } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Générer les métadonnées dynamiques
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ Ajout de await
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projet non trouvé - K-Ré Architecture",
    };
  }

  return {
    title: `${project.title} - K-Ré Architecture`,
    description: project.description,
  };
}

// Générer les routes statiques
export async function generateStaticParams() {
  return getAllProjectSlugs();
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params; // ✅ Ajout de await
  const project = getProjectBySlug(slug);

  // 404 si le projet n'existe pas
  if (!project) {
    notFound();
  }

  // Récupérer les projets précédent/suivant
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <>
      {/* Bloc 1 : Informations du projet - 180px */}
      <ProjectHeader project={project} />

      {/* Bloc 2 : Galerie d'images - 630px */}
      <ProjectGallery images={project.images} />

      {/* Bloc 3 : Navigation entre projets - 45px */}
      <ProjectNavigation previousSlug={previous} nextSlug={next} />
    </>
  );
}
