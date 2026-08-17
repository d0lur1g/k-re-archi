"use client";

import { useEffect } from "react";

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
    <section className="bg-surface-inverse text-ink-inverse flex h-full flex-col items-center justify-center px-4">
      <h1 className="font-display text-display mb-4">Erreur</h1>
      <h2 className="font-body text-subtitle mb-2">{"Une erreur s'est produite"}</h2>
      <p className="font-body text-caption mb-8 max-w-md text-center opacity-60">
        {error.message || "Quelque chose s'est mal passé."}
      </p>
      <button
        onClick={reset}
        className="bg-surface text-ink font-body rounded-ui px-8 py-3 transition-opacity hover:opacity-90"
      >
        Réessayer
      </button>
    </section>
  );
}
