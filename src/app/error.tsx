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
    <section className="bg-kre-black text-kre-white flex h-full flex-col items-center justify-center px-4">
      <h1 className="font-amalfi mb-4 text-6xl">Erreur</h1>
      <h2 className="font-baiti mb-2 text-2xl">{"Une erreur s'est produite"}</h2>
      <p className="font-baiti mb-8 max-w-md text-center text-sm opacity-60">
        {error.message || "Quelque chose s'est mal passé."}
      </p>
      {/* bg-kre-white! : custom.css n'étant pas dans un cascade layer, sa règle
          « button { background: none } » l'emporterait sur l'utilitaire sans le ! */}
      <button
        onClick={reset}
        className="bg-kre-white! text-kre-black font-baiti rounded-sm px-8 py-3 transition-opacity hover:opacity-90"
      >
        Réessayer
      </button>
    </section>
  );
}
