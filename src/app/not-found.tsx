import Link from "next/link";
import Header from "@/components/layouts/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-kre-black text-kre-white flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="font-amalfi text-[120px] leading-none">404</h1>
        <h2 className="font-baiti mt-4 mb-2 text-3xl">Page introuvable</h2>
        <p className="font-baiti mb-8 max-w-md text-center text-base opacity-80">
          {"La page que vous recherchez n'existe pas ou a été déplacée."}
        </p>
        <Link
          href="/"
          className="bg-kre-white text-kre-black font-baiti rounded-sm px-8 py-3 transition-opacity hover:opacity-90"
        >
          {"Retour à l'accueil"}
        </Link>
      </main>
    </>
  );
}
