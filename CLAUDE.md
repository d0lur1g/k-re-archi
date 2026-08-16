# K-Ré Architecture

Site vitrine de l'agence d'architecture et d'architecture d'intérieur **K-Ré** (Delphine DanielczyK).
Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4.

**Phase actuelle : maquette.** Les projets affichés sont fictifs. Le contenu réel (textes, photos)
sera injecté ensuite. La feuille de route et les décisions actées sont dans
[docs/ROADMAP.md](docs/ROADMAP.md) — la lire avant d'entamer un chantier.

## Commandes

```bash
npm install       # dépendances (npm ci en CI)
npm run dev       # serveur de développement (Turbopack) sur :3000
npm run build     # build de production
npm run lint      # ESLint
npm run format    # Prettier (écriture) — format:check pour la vérification
npm run type-check# tsc --noEmit
```

## Architecture

| Dossier                   | Rôle                                                            |
| ------------------------- | --------------------------------------------------------------- |
| `src/app`                 | Routes App Router, pages d'erreur, layout racine                |
| `src/components/layouts`  | Header, Footer, menu responsive — présents sur toutes les pages |
| `src/components/sections` | Blocs de page, rangés par route (`homepage/`, `projects/`)      |
| `src/data`                | Données de la maquette                                          |
| `src/lib`                 | Accès aux données, calculs de layout, constantes                |
| `src/types`               | Types métier partagés                                           |
| `src/hooks`               | Hooks React réutilisables                                       |
| `src/assets`              | Polices et images importées par le bundler                      |
| `public/images`           | Images servies telles quelles (photos de projets)               |

Alias d'import : `@/*` → `src/*`.

**Règle d'accès aux données :** aucun composant ni page n'importe `src/data` directement.
Tout passe par `src/lib/projects.ts`, qui est le point d'entrée unique et destiné à devenir
asynchrone pour permettre une bascule ultérieure vers une source externe sans toucher aux vues.

## Système de mise en page (contrainte structurante)

Le design repose sur un **canvas fixe de 1080 × 1080 px**, centré sur fond noir, découpé
verticalement :

```
header 180  +  main 855  +  footer 45  =  1080
```

Chaque page doit tenir dans le budget de 855 px du `<main>` :

- accueil : Hero 270 + Présentation 180 + Gallery 405
- page projet : ProjectHeader 180 + ProjectGallery 630 + ProjectNavigation 45

Tailwind v4 est configuré avec `--spacing: 1px` dans `src/styles/global.css`. Les classes
numériques valent donc des pixels : `h-855` = 855 px, `w-540` = 540 px, `px-12` = 12 px.
Le breakpoint `2xl` est redéfini à 1080 px (`max-2xl:` = sous le canvas).

## Styles

- `src/styles/global.css` : `@import "tailwindcss"` + bloc `@theme` (polices, spacing, breakpoint).
- `src/styles/custom.css` : chargé **après**, peut écraser Tailwind (reset, scrollbar, réseaux sociaux).
- Une classe utilitaire dont le token n'existe pas dans `@theme` n'est **pas** générée et échoue
  en silence. Vérifier que la couleur ou la taille utilisée est bien déclarée.

## Polices

`src/assets/fonts/fonts.ts` expose `amalfi` (titres, accents) et `baiti` (texte courant), chargées
en local via `next/font/local`. Elles sont importées **avant** les CSS dans `src/app/layout.tsx`.
Utilisation : classes `font-amalfi` / `font-baiti`.

## SVG

Les `.svg` sont importés comme composants React (SVGR, configuré dans `next.config.ts` côté
Turbopack, typé par `src/svg.d.ts`) :

```tsx
import MenuIcon from "@/assets/images/icons/menu.svg";
<MenuIcon className="h-6 w-6" />;
```

## Conventions Git

Voir [CONTRIBUTING.MD](CONTRIBUTING.MD). En résumé : branche dédiée (`feature/`, `fix/`, `chore/`),
commits conventionnels rédigés en français (`feat(projet): …`), PR vers `main`.
Husky + lint-staged formatent et lintent les fichiers à chaque commit.
