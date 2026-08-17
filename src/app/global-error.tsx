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
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <h1 className="text-heading mb-4">Erreur critique</h1>
          <p className="mb-4 max-w-md text-center opacity-80">
            {error.message || "Le site a rencontré une erreur critique."}
          </p>
          <button onClick={reset} className="bg-surface text-ink rounded-ui px-6 py-2">
            Recharger la page
          </button>
        </div>
      </body>
    </html>
  );
}
