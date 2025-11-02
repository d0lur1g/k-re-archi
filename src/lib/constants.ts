// Dimensions en pixels
export const PROJECT_CARD = {
  BASE_SIZE: 360, // Taille du carré avec 1 image
  PADDING: 2.5, // Padding interne
  GAP: 4, // Gap entre les images dans une grille
} as const;

// Calcul des sous-carrés pour les layouts
export const LAYOUT_SIZES = {
  "1-single": {
    size: PROJECT_CARD.BASE_SIZE,
    image_count: 1,
    grid: "1 column",
  },
  "2-horizontal": {
    size: PROJECT_CARD.BASE_SIZE,
    image_count: 2,
    grid: "1 column, 2 rows",
  },
  "2-vertical": {
    size: PROJECT_CARD.BASE_SIZE,
    image_count: 2,
    grid: "2 columns, 1 row",
  },
  "2x2": {
    size: PROJECT_CARD.BASE_SIZE,
    image_count: 4,
    grid: "2 columns, 2 rows",
  },
} as const;

// Catégories prédéfinies (référentiel)
export const CATEGORIES = [
  { id: "residential", name: "Résidentiel", slug: "residential" },
  { id: "commercial", name: "Commercial", slug: "commercial" },
  { id: "renovation", name: "Rénovation", slug: "renovation" },
  { id: "interior", name: "Architecture d'intérieur", slug: "interior" },
  { id: "construction", name: "Construction", slug: "construction" },
  { id: "rehabilitation", name: "Réhabilitation", slug: "rehabilitation" },
] as const;
