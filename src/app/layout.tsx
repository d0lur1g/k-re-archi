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
      <body>
        <div id="root">
          <div className="bg-kre-white container flex max-h-1080 w-full max-w-1080 flex-col content-center justify-center">
            <Header />
            <main className="flex h-270 flex-col bg-white">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
