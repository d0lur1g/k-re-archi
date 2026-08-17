import Link from "next/link";
import type { ReactNode } from "react";

interface ActionInverseProps {
  href: string;
  /** Mise en page propre au point d'usage (dimensions, alignement). */
  className?: string;
  children: ReactNode;
}

// Lien dont le survol inverse surface et encre : motif récurrent du site
// (liens du footer, navigation entre projets). Le comportement d'inversion
// vit ici, la géométrie reste au point d'usage.
export default function ActionInverse({ href, className = "", children }: ActionInverseProps) {
  return (
    <Link
      href={href}
      className={`hover:bg-surface-inverse hover:text-ink-inverse transition-colors duration-300 ease-in-out ${className}`}
    >
      {children}
    </Link>
  );
}
