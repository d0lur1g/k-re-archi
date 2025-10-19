import React from "react";

const HomePage = () => (
  <div className="min-h-screen flex flex-col">
    {/* Header - sera intégré plus tard */}
    <header>{/* TODO : Header */}</header>

    {/* Section catchphrase/slogan */}
    <section className="catchphrase py-8 text-center">
      {/* TODO : Catchphrase, logo, baseline K-Ré */}
    </section>

    {/* Section valeurs ou R-slogan */}
    <section className="valeurs flex flex-col items-center py-6">
      {/* TODO : Liste RÉinventer, RÉaliser... */}
    </section>

    {/* Section Présentation */}
    <section className="presentation container mx-auto py-8 flex flex-col md:flex-row gap-8">
      {/* TODO : Texte présentation, signature, portrait */}
    </section>

    {/* Section Visuels / croquis / réalisations */}
    <section className="visuels container mx-auto py-8">
      {/* TODO : Image(s) croquis, architecture */}
    </section>

    {/* Footer */}
    <footer className="mt-auto py-4 border-t text-center text-gray-500 text-sm">
      {/* TODO : Footer, réseaux sociaux, mentions légales */}
    </footer>
  </div>
);

export default HomePage;
