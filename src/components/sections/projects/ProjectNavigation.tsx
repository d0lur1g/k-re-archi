// src/components/sections/projects/ProjectNavigation.tsx

import ActionInverse from "@/components/ui/ActionInverse";

interface ProjectNavigationProps {
  previousSlug?: string;
  nextSlug?: string;
}

export default function ProjectNavigation({ previousSlug, nextSlug }: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Navigation entre projets"
      className="font-body bg-surface text-subtitle flex h-45 items-center"
    >
      {previousSlug ? (
        <ActionInverse
          href={`/projects/${previousSlug}`}
          className="flex h-full w-full items-center justify-center gap-2 px-12"
        >
          <span aria-hidden="true" className="block -translate-y-2">
            ←
          </span>
          <span className="block -translate-y-2">Projet précédent</span>
        </ActionInverse>
      ) : (
        <div className="w-full" />
      )}

      {nextSlug ? (
        <ActionInverse
          href={`/projects/${nextSlug}`}
          className="flex h-full w-full items-center justify-center gap-2 px-12"
        >
          <span className="block -translate-y-2">Projet suivant</span>
          <span aria-hidden="true" className="block -translate-y-2">
            →
          </span>
        </ActionInverse>
      ) : (
        <div className="w-full" />
      )}
    </nav>
  );
}
