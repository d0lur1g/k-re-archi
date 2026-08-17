import type { Metadata } from "next";
// Import des polices AVANT les CSS
import { amalfi, baiti } from "@/assets/fonts/fonts";
/*
Layout principal Next.js 16
ORDRE D'IMPORT CRITIQUE :
1. reset.css (base)
2. globals.css (Tailwind + variables)
3. custom.css (styles personnalisés)
*/

// ========================================
// IMPORTS CSS - ORDRE CRITIQUE
// ========================================
import "@/styles/global.css"; // Tailwind + @theme
import "@/styles/custom.css"; // Styles custom EN DERNIER

// ========================================
// IMPORTS COMPOSANTS
// ========================================
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

// ========================================
// MÉTADONNÉES SEO
// ========================================
export const metadata: Metadata = {
  title: "K-Ré - Architecture",
  description: "Site vitrine professionnel d'architecture et d'architecture d'intérieur.",
};

// ========================================
// LAYOUT PRINCIPAL
// ========================================
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${amalfi.variable} ${baiti.variable} scroll-smooth`}>
      {/* ✅ scroll-smooth pour une navigation fluide */}
      <body className="bg-surface-inverse p-16">
        <div className="flex min-h-[calc(100dvh-32px)] items-start justify-center">
          {/* ✅ dvh pour meilleure compatibilité mobile */}
          <div className="bg-surface my-auto w-full max-w-1080">
            <Header />
            <main className="flex h-855 flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
