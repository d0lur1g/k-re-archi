"use client";

import { useEffect } from "react";
import NavLink from "@/components/ui/NavLink";

interface MenuResponsiveProps {
  closeMenu: () => void;
}

export default function MenuResponsive({ closeMenu }: MenuResponsiveProps) {
  // Fermeture avec Escape
  useEffect(() => {
    function onEsc(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, [closeMenu]);

  // Le menu ne s'ouvre qu'en dessous de 1024 px, où le header mesure 90 px. On utilise dvh
  // et non vh, pour ne pas déborder sous la barre d'adresse des navigateurs mobiles.
  return (
    <div className="bg-surface fixed top-180 left-0 z-40 flex h-[calc(100dvh-180px)] w-full flex-col items-center justify-center max-lg:top-90 max-lg:h-[calc(100dvh-90px)]">
      {/* Navigation - Même style que les liens desktop avec bordures */}
      <nav className="flex w-full max-w-540 flex-col items-stretch">
        <NavLink variant="mobile" href="/projects" onClick={closeMenu}>
          Projets
        </NavLink>
        <NavLink variant="mobile" href="/missions" onClick={closeMenu}>
          Missions
        </NavLink>
        <NavLink variant="mobile" href="/contact" onClick={closeMenu}>
          Contact
        </NavLink>
      </nav>
    </div>
  );
}
