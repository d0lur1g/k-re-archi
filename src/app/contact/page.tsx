import type { Metadata } from "next";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactIdentity from "@/components/sections/contact/ContactIdentity";

export const metadata: Metadata = {
  title: "Contact - K-Ré Architecture",
  description:
    "Contacter Delphine DanielczyK, architecte DE HMONP et architecte d'intérieur à Bordeaux.",
};

/**
 * Page contact, d'après la maquette Figma `contact` (node 193:921, la plus récente
 * des trois variantes du fichier).
 *
 * Le gabarit reprend le budget de 855 px du <main> : les quatre blocs sont répartis
 * par justify-between dans un cadre à 45 px de marge verticale, comme dans la
 * maquette, plutôt qu'en hauteurs figées.
 *
 * Rôles typographiques de la punchline : capitales Figma 50 px → text-heading,
 * texte 35 px → text-tagline — les mêmes correspondances que la baseline du header.
 */
export default function ContactPage() {
  return (
    <div className="flex h-full flex-col items-center justify-between py-45">
      <section className="flex h-180 w-full items-center px-180">
        <div className="border-line flex h-full w-full flex-col justify-end border-b p-5">
          <h1 className="font-body text-tagline leading-flush">
            <span className="text-heading">U</span>ne envie, un projet, un rêve{" "}
            <span className="text-heading">? C</span>ontactez-moi :
          </h1>
        </div>
      </section>

      <ContactForm />

      {/* Double filet de la maquette : trait épais à gauche, fin à droite. */}
      <div className="flex w-full items-start justify-between px-180" aria-hidden>
        <div className="border-line h-10 flex-1 border-b-3" />
        <div className="border-line h-10 flex-1 border-b" />
      </div>

      <ContactIdentity />
    </div>
  );
}
