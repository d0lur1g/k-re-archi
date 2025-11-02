// src/lib/slug.ts

/**
 * Génère un slug URL-friendly à partir d'un titre
 * @param title Le titre du projet
 * @param location Localisation optionnelle
 * @param category Catégorie optionnelle
 * @param year Année optionnelle
 * @returns Le slug généré
 */
export function generateSlug(
  title: string,
  location?: string,
  category?: string,
  year?: number
): string {
  // Normaliser le titre
  let slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "");

  // Enrichir avec localisation
  if (location) {
    const locationSlug = location
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
      .replace(/^-+|-+$/g, "");

    slug = `${slug}-${locationSlug}`;
  }

  // Enrichir avec catégorie
  if (category) {
    const categorySlug = category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
      .replace(/^-+|-+$/g, "");

    slug = `${slug}-${categorySlug}`;
  }

  // Enrichir avec l'année
  if (year) {
    slug = `${slug}-${year}`;
  }

  return slug;
}
