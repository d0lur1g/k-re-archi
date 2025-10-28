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
      <body className="bg-black text-white">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-5xl">Erreur critique</h1>
          <p className="mb-4 max-w-md text-center opacity-80">
            {error.message || "Le site a rencontré une erreur critique."}
          </p>
          <button onClick={reset} className="rounded bg-white px-6 py-2 text-black">
            Recharger la page
          </button>
        </div>
      </body>
    </html>
  );
}
