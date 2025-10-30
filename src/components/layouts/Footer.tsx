import Link from "next/link";
import type { FC, SVGProps } from "react";

// ✅ Import des SVG comme composants
import FacebookIcon from "@/assets/images/socials/facebook.svg";
import InstagramIcon from "@/assets/images/socials/instagram.svg";
import PinterestIcon from "@/assets/images/socials/pinterest.svg";
import LinkedinIcon from "@/assets/images/socials/linkedin.svg";
import LogoOrderArchitects from "@/assets/images/logo-order-architects.svg";

type IconComponent = FC<SVGProps<SVGSVGElement>>;

interface Social {
  name: string;
  url: string;
  alt: string;
  icon: IconComponent;
}

const socials: Social[] = [
  { name: "facebook", url: "https://facebook.com", alt: "Facebook", icon: FacebookIcon },
  { name: "instagram", url: "https://instagram.com", alt: "Instagram", icon: InstagramIcon },
  { name: "pinterest", url: "https://fr.pinterest.com", alt: "Pinterest", icon: PinterestIcon },
  { name: "linkedin", url: "https://linkedin.com", alt: "LinkedIn", icon: LinkedinIcon },
];

const footerLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/legal-notice", label: "Mentions Légales" },
];

export default function Footer() {
  return (
    <>
      <footer className="flex h-45 content-between items-center">
        <div className="flex h-full w-180 items-center justify-center">
          <LogoOrderArchitects className="h-auto w-full" />
        </div>
        <div className="font-baiti mb-4 flex h-full">
          <nav className="flex h-full content-center">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex h-full w-180 items-center justify-around text-black transition-colors duration-300 ease-in-out hover:bg-black hover:text-white!"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex h-full w-360 items-center justify-around">
            &copy; 2025 - Ludovic Girard
          </div>
        </div>

        {/* Logos sociaux avec changement de couleur */}
        <nav className="flex w-180 justify-around" aria-label="Réseaux sociaux">
          {socials.map(({ name, url, alt, icon: SocialIcon }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link social-${name}`}
              aria-label={alt}
            >
              <SocialIcon className="h-34 w-34" />
            </Link>
          ))}
        </nav>
      </footer>
    </>
  );
}
