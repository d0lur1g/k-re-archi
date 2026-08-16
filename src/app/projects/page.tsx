import { Metadata } from "next";
import ProjectsGrid from "@/components/sections/projects/ProjectsGrid";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projets - K-Ré Architecture",
  description: "Découvrez nos réalisations en architecture et architecture d'intérieur",
};

export default function ProjectsPage() {
  return (
    <>
      {/* La grille se passe de titre visible ; il reste nécessaire pour la navigation
          au clavier et les lecteurs d'écran. */}
      <h1 className="sr-only">Projets</h1>
      <ProjectsGrid projects={projectsData} />
    </>
  );
}
