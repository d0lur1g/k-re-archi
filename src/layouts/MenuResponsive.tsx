import { useEffect } from "react";
import closeIcon from "../assets/images/icons/menu-close.svg";
import Image from "next/image";
import Link from "next/link";

interface MenuResponsiveProps {
  closeMenu: () => void;
}

export default function MenuResponsive({ closeMenu }: MenuResponsiveProps) {
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
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <button
        aria-label="Close menu"
        onClick={closeMenu}
        className="absolute top-5 right-5"
      >
        <Image src={closeIcon} alt="close menu" />
      </button>

      <nav className="flex flex-col items-center text-black text-lg">
        <Link className="nav__btn h-90" href="/projects" onClick={closeMenu}>
          Projets
        </Link>
        <Link className="nav__btn h-90" href="/missions" onClick={closeMenu}>
          Missions
        </Link>
        <Link className="nav__btn h-90" href="/contact" onClick={closeMenu}>
          Contact
        </Link>
        <Link className="nav__btn h-90" href="/faq" onClick={closeMenu}>
          FAQ
        </Link>
        <Link
          className="nav__btn h-90"
          href="/legal-notice"
          onClick={closeMenu}
        >
          Mentions Légales
        </Link>
      </nav>
    </div>
  );
}
