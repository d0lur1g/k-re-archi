import Image from "next/image";
import portrait from "@/assets/images/images/delphine-danielczyk.jpg";

/**
 * Bloc d'identité de la page contact (Figma `contact-content`, node 193:959) :
 * portrait au ratio 360/540 et coordonnées alignées à droite sur 540 px.
 *
 * Rôles typographiques : le nom est composé en text-nav (30 px, valeur exacte de la
 * maquette) alors que l'accueil utilise text-name (40 px) pour le même nom — écart
 * consigné dans la feuille de route, à arbitrer. Le téléphone (Figma 15 px) passe
 * en text-body (16 px), la maquette n'ayant pas de rôle à 15 px (cf. tokens.css).
 *
 * Le téléphone et l'e-mail sont rendus cliquables. La maquette les montre en texte
 * simple, mais le reset de custom.css fait hériter la couleur des liens : le rendu
 * reste identique.
 */
export default function ContactIdentity() {
  return (
    <section className="flex h-270 w-full items-start justify-center">
      <div className="bg-placeholder relative flex aspect-[360/540] h-full items-center justify-center overflow-hidden">
        <Image
          src={portrait}
          alt="Delphine DanielczyK, architecte"
          className="h-full w-full object-cover"
          sizes="180px"
        />
      </div>

      <address className="flex h-full w-540 flex-col items-end justify-center not-italic">
        <div className="flex h-60 w-full flex-col justify-center px-5 pt-5">
          <p className="font-display text-nav leading-flush w-full">Delphine DanielczyK</p>
        </div>

        <div className="border-line flex h-22.5 w-full items-center border-b-3">
          <p className="font-body text-meta leading-flush flex-1 tracking-[0.76px]">
            Architecte DE HMONP &amp; Architecte d&rsquo;intérieur diplômée
          </p>
        </div>

        <div className="flex w-full items-center">
          <p className="font-body text-meta leading-flush whitespace-nowrap">
            Gironde Dordogne Charente-Maritime Landes Lot-et-Garonne
          </p>
        </div>

        <div className="flex w-full items-center justify-end p-5">
          <a href="tel:+33664338361" className="font-display text-body whitespace-nowrap">
            06 64 33 83 61
          </a>
        </div>

        <div className="flex w-full items-center justify-end p-5">
          <p className="font-body text-meta text-right">33100 BORDEAUX</p>
        </div>

        <div className="flex w-full items-center justify-end p-5">
          <a href="mailto:contact@k-re.fr" className="font-body text-meta text-right">
            contact@k-re.fr
          </a>
        </div>
      </address>
    </section>
  );
}
