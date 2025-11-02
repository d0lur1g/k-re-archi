// src/components/sections/projects/ProjectNavigation.tsx

"use client";

import Link from "next/link";

interface ProjectNavigationProps {
  previousSlug?: string;
  nextSlug?: string;
}

export default function ProjectNavigation({ previousSlug, nextSlug }: ProjectNavigationProps) {
  return (
    <nav className="font-baiti flex h-45 items-center bg-white text-2xl">
      {previousSlug ? (
        <Link
          href={`/projects/${previousSlug}`}
          className="flex h-full w-full items-center justify-center gap-2 px-12 transition-colors duration-300 ease-in-out hover:bg-black hover:text-white!"
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
          className="flex h-full w-full items-center justify-center gap-2 px-12 transition-colors duration-300 ease-in-out hover:bg-black hover:text-white!"
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
