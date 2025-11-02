"use client";

import { useRef, useEffect } from "react";

export function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      // Vérifier si on survole l'élément
      if (!element.contains(e.target as Node)) return;

      // Empêcher le scroll vertical par défaut
      e.preventDefault();

      // Transformer le scroll vertical (deltaY) en scroll horizontal
      element.scrollLeft += e.deltaY;
    };

    // Ajouter l'écouteur avec passive: false pour pouvoir utiliser preventDefault
    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return scrollRef;
}
