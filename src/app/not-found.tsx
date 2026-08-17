import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-surface-inverse text-ink-inverse flex h-full flex-col items-center justify-center px-4">
      <h1 className="font-display text-giant leading-flush">404</h1>
      <h2 className="font-body text-nav mt-4 mb-2">Page introuvable</h2>
      <p className="font-body text-body mb-8 max-w-md text-center opacity-80">
        {"La page que vous recherchez n'existe pas ou a été déplacée."}
      </p>
      <Link
        href="/"
        className="bg-surface text-ink font-body rounded-ui px-8 py-3 transition-opacity hover:opacity-90"
      >
        {"Retour à l'accueil"}
      </Link>
    </section>
  );
}
