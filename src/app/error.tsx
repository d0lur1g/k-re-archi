"use client";

import { useEffect } from "react";
import BoutonSysteme from "@/components/ui/BoutonSysteme";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log dans un service de monitoring
    console.error("Error:", error);
  }, [error]);

  return (
    <section className="bg-surface-inverse text-ink-inverse flex h-full flex-col items-center justify-center px-16">
      <h1 className="font-display text-display mb-16">Erreur</h1>
      <h2 className="font-body text-subtitle mb-2">{"Une erreur s'est produite"}</h2>
      <p className="font-body text-caption mb-32 max-w-448 text-center opacity-60">
        {error.message || "Quelque chose s'est mal passé."}
      </p>
      <BoutonSysteme onClick={reset}>Réessayer</BoutonSysteme>
    </section>
  );
}
