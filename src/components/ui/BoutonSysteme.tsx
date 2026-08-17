import Link from "next/link";
import type { ReactNode } from "react";

interface BoutonSystemeProps {
  /** Fourni : rend un lien. Absent : rend un bouton (onClick requis). */
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}

// Action unique des pages système (erreur, 404) : carte claire sur fond inversé.
// Unifie les trois recettes divergentes relevées dans l'audit du design system.
const CLASSES =
  "bg-surface text-ink font-body rounded-ui px-32 py-12 transition-opacity hover:opacity-90";

export default function BoutonSysteme({ href, onClick, children }: BoutonSystemeProps) {
  if (href) {
    return (
      <Link href={href} className={CLASSES}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={CLASSES}>
      {children}
    </button>
  );
}
