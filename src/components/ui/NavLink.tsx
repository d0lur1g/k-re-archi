import Link from "next/link";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  /** desktop : cellule 180x90 du header ; mobile : rangée du menu plein écran */
  variant?: "desktop" | "mobile";
}

// Lien de navigation principal : repos en Baiti, survol en Amalfi avec accent 3px.
// Factorise les 6 recettes identiques relevées dans Header et MenuResponsive
// (design-system/COMPONENTS.md).
const VARIANTES = {
  desktop:
    "font-body hover:font-display border-line text-nav hover:text-meta max-canvas:text-subtitle flex h-90 w-180 items-center justify-center border-b border-solid transition-all duration-300 ease-in-out hover:border-b-3 max-canvas:w-full max-canvas:p-5 max-canvas:hover:items-end max-lg:hidden",
  mobile:
    "font-body hover:font-display border-line text-ink text-tagline hover:text-meta flex h-90 items-center justify-center border-b border-solid transition-all duration-300 ease-in-out",
} as const;

export default function NavLink({ href, children, onClick, variant = "desktop" }: NavLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={VARIANTES[variant]}>
      {children}
    </Link>
  );
}
