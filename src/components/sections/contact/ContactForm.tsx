"use client";

import type { FormEvent } from "react";

/**
 * Formulaire de contact de la maquette (Figma `contact-form`, node 193:939).
 *
 * L'envoi réel n'est pas branché : il suppose un service d'expédition et une
 * protection anti-spam, prévus en Phase 5 de docs/ROADMAP.md. La soumission est
 * donc neutralisée plutôt que de recharger la page avec les champs en query string.
 *
 * Le focus des champs est pris en charge par le :focus-visible global (décision D6) :
 * aucun style de focus local, aucun outline: none.
 */

const champsIdentite = [
  { nom: "fullname", libelle: "Nom & Prénom", type: "text", autoComplete: "name", requis: true },
  { nom: "email", libelle: "E-mail", type: "email", autoComplete: "email", requis: true },
  { nom: "phone", libelle: "Téléphone", type: "tel", autoComplete: "tel", requis: true },
  { nom: "city", libelle: "Ville", type: "text", autoComplete: "address-level2", requis: false },
] as const;

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // TODO Phase 5 : brancher l'envoi (service d'expédition + anti-spam).
    event.preventDefault();
  }

  return (
    <form className="flex w-full flex-col items-center" onSubmit={handleSubmit} noValidate>
      <div className="flex h-154 w-full items-center gap-10 px-180">
        <div className="flex h-full flex-1 flex-col gap-10">
          {champsIdentite.map((champ) => (
            <div key={champ.nom} className="border-line flex flex-1 items-center border-b">
              <label className="sr-only" htmlFor={`contact-${champ.nom}`}>
                {champ.libelle}
                {champ.requis && " (obligatoire)"}
              </label>
              <input
                id={`contact-${champ.nom}`}
                name={champ.nom}
                type={champ.type}
                autoComplete={champ.autoComplete}
                required={champ.requis}
                placeholder={`${champ.libelle}${champ.requis ? "*" : ""}`}
                className="font-body text-meta text-ink placeholder:text-ink/40 h-full w-full p-5"
              />
            </div>
          ))}
        </div>

        <div className="flex h-full flex-1 items-center">
          <label className="sr-only" htmlFor="contact-message">
            Votre projet (obligatoire)
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            placeholder="Racontez moi votre projet...*"
            className="font-body text-meta text-ink placeholder:text-ink/40 border-line h-full w-full resize-none border-b px-5"
          />
        </div>
      </div>

      {/* Hauteur laissée libre : dans la maquette le bloc mesure 82,5 px alors que son
          contenu en demande un peu plus ; une hauteur figée comprimerait le bouton. */}
      <div className="flex w-full flex-col items-end gap-5 px-180 pt-22.5">
        <p className="font-body text-caption text-ink">*Champs obligatoires</p>
        {/* Bordure surface : invisible sur fond clair, elle prépare l'inversion (Figma 193:955).
            Les resets de custom.css vivent dans @layer base : les utilitaires priment sans !. */}
        <button
          type="submit"
          className="bg-surface-inverse text-ink-inverse font-body text-meta border-surface flex h-45 w-180 shrink-0 items-center justify-center border border-solid"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
