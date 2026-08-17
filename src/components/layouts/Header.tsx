"use client";

import { useState } from "react";
import MenuResponsive from "./MenuResponsive";
import MenuIcon from "@/assets/images/icons/menu.svg";
import CloseIcon from "@/assets/images/icons/menu-close.svg";
import Link from "next/link";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <header className="flex h-180 max-2xl:h-90 max-2xl:w-full">
        {/* LOGO */}
        <Link
          href="/"
          className="group border-line hover:bg-surface-inverse flex h-180 w-180 items-end justify-center gap-2.5 border-r border-b border-solid pb-10 transition-all duration-300 ease-in-out max-2xl:h-auto max-2xl:max-w-90 max-2xl:min-w-90"
        >
          <p className="font-amalfi text-ink group-hover:text-ink-inverse pr-10 text-5xl leading-[202%] transition-colors duration-300 max-2xl:text-2xl">
            K
          </p>
          <p className="font-baiti text-ink group-hover:text-ink-inverse text-6xl transition-colors duration-300 max-2xl:text-2xl">
            -Ré
          </p>
        </Link>

        {/* AGENCY TEXT */}
        <div className="font-baiti border-line flex h-180 w-360 items-start border-b-3 border-solid pt-15 pr-5 pb-5 pl-15 text-4xl leading-[70%] max-2xl:h-auto max-2xl:w-full max-2xl:min-w-180 max-2xl:p-5 max-2xl:text-2xl">
          {/* Baseline de marque, présente sur toutes les pages : ce n'est pas le titre
              de la page courante, d'où le <p> et non un <h1>. */}
          <p>
            <span className="text-5xl leading-[30%] max-2xl:text-3xl">A</span>
            gence <br />
            <span className="text-5xl leading-[30%] max-2xl:text-3xl">A</span>
            rchitecture & <br />
            <span className="text-5xl leading-[30%] max-2xl:text-3xl">A</span>
            rchitecture d&apos;intérieur
          </p>
        </div>

        <nav className="flex items-end max-2xl:w-full max-lg:w-auto">
          {/* Navigation Desktop - Cachée sur mobile */}
          <Link
            className="font-baiti hover:font-amalfi border-line flex h-90 w-180 items-center justify-center border-b border-solid text-3xl transition-all duration-300 ease-in hover:border-b-3 hover:text-xl max-2xl:w-full max-2xl:p-4 max-2xl:text-2xl max-2xl:hover:items-end max-lg:hidden"
            href="/projects"
          >
            Projets
          </Link>
          <Link
            className="font-baiti hover:font-amalfi border-line flex h-90 w-180 items-center justify-center border-b border-solid text-3xl transition-all duration-300 ease-in hover:border-b-3 hover:text-xl max-2xl:w-full max-2xl:p-4 max-2xl:text-2xl max-2xl:hover:items-end max-lg:hidden"
            href="/missions"
          >
            Missions
          </Link>
          <Link
            className="font-baiti hover:font-amalfi border-line flex h-90 w-180 items-center justify-center border-b border-solid text-3xl transition-all duration-300 ease-in hover:border-b-3 hover:text-xl max-2xl:w-full max-2xl:p-4 max-2xl:text-2xl max-2xl:hover:items-end max-lg:hidden"
            href="/contact"
          >
            Contact
          </Link>

          {/* Bouton Menu/Close - Visible uniquement sur mobile */}
          <button
            className="border-line hover:bg-surface-inverse hidden h-90 w-90 items-center justify-center border-b border-solid transition-all duration-300 hover:invert max-lg:flex max-lg:min-h-90 max-lg:min-w-90"
            onClick={toggleMenu}
            aria-label={showMenu ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={showMenu}
          >
            {showMenu ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Menu Responsive - Remplace le contenu principal */}
      {showMenu && <MenuResponsive closeMenu={() => setShowMenu(false)} />}
    </>
  );
}
