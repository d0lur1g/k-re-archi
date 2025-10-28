"use client";

import { useEffect } from "react";
import Header from "@/components/layouts/Header";

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
    <>
      <Header />
      <main className="bg-kre-black text-kre-white flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="font-amalfi mb-4 text-6xl">Erreur</h1>
        <h2 className="font-baiti mb-2 text-2xl">{"Une erreur s'est produite"}</h2>
        <p className="font-baiti mb-8 max-w-md text-center text-sm opacity-60">
          {error.message || "Quelque chose s'est mal passé."}
        </p>
        <button
          onClick={reset}
          className="bg-kre-white text-kre-black font-baiti rounded-sm px-8 py-3 transition-opacity hover:opacity-90"
        >
          Réessayer
        </button>
      </main>
    </>
  );
}
