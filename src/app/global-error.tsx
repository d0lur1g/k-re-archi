"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="bg-surface-inverse text-ink-inverse">
        <div className="flex min-h-screen flex-col items-center justify-center px-16">
          <h1 className="text-heading mb-16">Erreur critique</h1>
          <p className="mb-16 max-w-448 text-center opacity-80">
            {error.message || "Le site a rencontré une erreur critique."}
          </p>
          {/* Même recette que le bouton des autres pages système (factorisation au lot 5) */}
          <button onClick={reset} className="bg-surface text-ink rounded-ui px-32 py-12">
            Recharger la page
          </button>
        </div>
      </body>
    </html>
  );
}
