"use client";

import { useState } from "react";
import MenuResponsive from "./MenuResponsive";
import Image from "next/image";
import menuIcon from "../assets/images/icons/menu.svg";
import Link from "next/link";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <header className="h-180 flex max-2xl:w-full max-2xl:h-90">
      {/* LOGO */}
      <Link
        href="/"
        className="group w-180 h-180 flex justify-center items-end gap-2.5 border-solid border-r border-b border-kre-black pb-5 hover:bg-black transition-all duration-300 ease-in-out max-2xl:h-auto max-2xl:min-w-90 max-2xl:max-w-90"
      >
        <p className="text-h1 font-amalfi leading-[202%] text-black group-hover:text-white transition-colors duration-300 max-2xl:text-h5">
          K
        </p>
        <p className="text-h1 font-baiti leading-[100%] text-black group-hover:text-white transition-colors duration-300 max-2xl:text-h5">
          -Ré
        </p>
      </Link>

      {/* AGENCY TEXT */}
      <div className="w-360 h-180 pt-15 pr-5 pb-5 pl-15 border-solid border-b-3 border-kre-black flex items-start text-h3 font-baiti leading-[70%] max-2xl:w-full max-2xl:h-auto max-2xl:min-w-180 max-2xl:p-5 max-2xl:text-h5">
        <h1>
          <span className="text-h2 leading-[30%] max-2xl:text-h4">A</span>gence{" "}
          <br />
          <span className="text-h2 leading-[30%] max-2xl:text-h4">A</span>
          rchitecture & <br />
          <span className="text-h2 leading-[30%] max-2xl:text-h4">A</span>
          {`rchitecture d'intérieur`}
        </h1>
      </div>

      <nav className="flex items-end max-2xl:w-full max-lg:w-auto">
        <Link
          className="w-180 h-90 flex items-center justify-center border-solid border-b border-kre-black text-h4 font-baiti hover:border-b-3 hover:font-amalfi hover:text-h6 transition-all duration-300 ease-in max-2xl:w-full max-2xl:p-4 max-2xl:text-h5 max-2xl:hover:text-body max-2xl:hover:items-end max-lg:hidden"
          href="/projects"
        >
          Projets
        </Link>
        <Link
          className="w-180 h-90 flex items-center justify-center border-solid border-b border-kre-black text-h4 font-baiti hover:border-b-3 hover:font-amalfi hover:text-h6 transition-all duration-300 ease-in max-2xl:w-full max-2xl:p-4 max-2xl:text-h5 max-2xl:hover:text-body max-2xl:hover:items-end max-lg:hidden"
          href="/missions"
        >
          Missions
        </Link>
        <Link
          className="w-180 h-90 flex items-center justify-center border-solid border-b border-kre-black text-h4 font-baiti hover:border-b-3 hover:font-amalfi hover:text-h6 transition-all duration-300 ease-in max-2xl:w-full max-2xl:p-4 max-2xl:text-h5 max-2xl:hover:text-body max-2xl:hover:items-end max-lg:hidden"
          href="/contact"
        >
          Contact
        </Link>

        {/* Menu Responsive */}
        <button
          className="hidden w-90 h-90 items-center justify-center max-lg:flex max-lg:min-w-90 max-lg:min-h-90"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <Image src={menuIcon} alt="menu" />
        </button>
      </nav>

      {showMenu && <MenuResponsive closeMenu={() => setShowMenu(false)} />}
    </header>
  );
}
