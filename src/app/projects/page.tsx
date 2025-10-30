import { Metadata } from "next";
import ProjectsGrid from "@/components/sections/projects/ProjectsGrid";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projets - K-Ré Architecture",
  description: "Découvrez nos réalisations en architecture et architecture d'intérieur",
};

export default function ProjectsPage() {
  return <ProjectsGrid projects={projectsData} />;
}
