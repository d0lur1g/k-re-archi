"use client";

import { useEffect } from "react";
import Link from "next/link";

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

  return (
    <div
      className="fixed top-180 left-0 z-40 flex w-full flex-col items-center justify-center bg-white max-lg:top-90"
      style={{ height: "calc(100vh - 180px)" }}
    >
      {/* Navigation - Même style que les liens desktop avec bordures */}
      <nav className="flex w-full max-w-540 flex-col items-stretch">
        <Link
          className="font-baiti hover:font-amalfi flex h-90 items-center justify-center border-b border-solid border-black text-4xl text-black transition-all duration-300 ease-in hover:text-xl"
          href="/projects"
          onClick={closeMenu}
        >
          Projets
        </Link>
        <Link
          className="font-baiti hover:font-amalfi flex h-90 items-center justify-center border-b border-solid border-black text-4xl text-black transition-all duration-300 ease-in hover:text-xl"
          href="/missions"
          onClick={closeMenu}
        >
          Missions
        </Link>
        <Link
          className="font-baiti hover:font-amalfi flex h-90 items-center justify-center border-b border-solid border-black text-4xl text-black transition-all duration-300 ease-in hover:text-xl"
          href="/contact"
          onClick={closeMenu}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
