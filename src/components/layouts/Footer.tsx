import Image from "next/image";
import Link from "next/link";

import logoOrderArchitects from "@/assets/images/logo-order-architects.svg";
import { socialLogos } from "@/assets/images/socials";

const socials = [
  { name: "facebook", url: "https://facebook.com", alt: "Facebook" },
  { name: "instagram", url: "https://instagram.com", alt: "Instagram" },
  { name: "pinterest", url: "https://fr.pinterest.com", alt: "Pinterest" },
  { name: "linkedin", url: "https://linkedin.com", alt: "LinkedIn" },
] as const;

export default function Footer() {
  return (
    <>
      <footer className="flex h-45 content-between items-center">
        <div className="h-full w-180 content-center">
          <Image
            src={logoOrderArchitects}
            alt="Logo - Ordre des Architectes"
            width={180}
            height={45}
            priority
          />
        </div>
        <div className="font-baiti flex h-full pb-4">
          <nav className="flex h-full content-center">
            <Link href="html/faq.html" className="flex h-full w-180 items-center justify-around">
              FAQ
            </Link>
            <Link
              href="html/legal-notice.html"
              className="flex h-full w-180 items-center justify-around"
            >
              Mentions Légales
            </Link>
          </nav>
          <div className="flex h-full w-360 items-center justify-around">
            &copy; 2025 - Ludovic Girard
          </div>
        </div>
        <nav className="flex h-full w-180 justify-around p-5" aria-label="Réseaux sociaux">
          {socials.map((social) => (
            <Link
              key={social.name}
              className={`${social.name}`}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={socialLogos[social.name as keyof typeof socialLogos]}
                alt={social.alt}
                width={34}
                height={34}
              />
            </Link>
          ))}
        </nav>
      </footer>
    </>
  );
}
