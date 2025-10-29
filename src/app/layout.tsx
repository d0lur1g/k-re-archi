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
    <html lang="fr" className={`${amalfi.variable} ${baiti.variable}`}>
      <body className="bg-black p-4">
        {/* ✅ Wrapper flex pour centrer SANS overflow hidden */}
        <div className="flex min-h-[calc(100vh-2rem)] items-start justify-center">
          {/* ✅ items-start + padding auto pour centrer uniquement si place disponible */}
          <div className="my-auto w-full max-w-1080 bg-white">
            {/* ✅ my-auto fait le centrage vertical dans le flex parent */}
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
