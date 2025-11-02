// src/components/sections/projects/ProjectNavigation.tsx

"use client";

import Link from "next/link";

interface ProjectNavigationProps {
  previousSlug?: string;
  nextSlug?: string;
}

export default function ProjectNavigation({ previousSlug, nextSlug }: ProjectNavigationProps) {
  return (
    <nav className="font-baiti flex h-45 items-center justify-around bg-white px-12 text-2xl">
      {/* Projet précédent */}
      {previousSlug ? (
        <Link href={`/projects/${previousSlug}`} className="flex items-center gap-2">
          <span>←</span>
          <span>Projet précédent</span>
        </Link>
      ) : (
        <div />
      )}

      {/* Projet suivant */}
      {nextSlug ? (
        <Link
          href={`/projects/${nextSlug}`}
          className="flex items-center gap-2 text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <span>Projet suivant</span>
          <span>→</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
