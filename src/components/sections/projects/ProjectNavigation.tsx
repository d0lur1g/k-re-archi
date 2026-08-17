// src/components/sections/projects/ProjectNavigation.tsx

import Link from "next/link";

interface ProjectNavigationProps {
  previousSlug?: string;
  nextSlug?: string;
}

export default function ProjectNavigation({ previousSlug, nextSlug }: ProjectNavigationProps) {
  return (
    <nav className="font-baiti bg-surface flex h-45 items-center text-2xl">
      {previousSlug ? (
        <Link
          href={`/projects/${previousSlug}`}
          className="hover:bg-surface-inverse hover:text-ink-inverse flex h-full w-full items-center justify-center gap-2 px-12 transition-colors duration-300 ease-in-out"
        >
          <span className="block -translate-y-2">←</span>
          <span className="block -translate-y-2">Projet précédent</span>
        </Link>
      ) : (
        <div className="w-full" />
      )}

      {nextSlug ? (
        <Link
          href={`/projects/${nextSlug}`}
          className="hover:bg-surface-inverse hover:text-ink-inverse flex h-full w-full items-center justify-center gap-2 px-12 transition-colors duration-300 ease-in-out"
        >
          <span className="block -translate-y-2">Projet suivant</span>
          <span className="block -translate-y-2">→</span>
        </Link>
      ) : (
        <div className="w-full" />
      )}
    </nav>
  );
}
