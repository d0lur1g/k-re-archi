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
npm run type-check# next typegen puis tsc --noEmit
npm run structure # régénère docs/STRUCTURE.md depuis les fichiers suivis par Git
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

Tailwind v4 est configuré avec `--spacing: 1px` dans `design-system/tokens.css`. Les classes
numériques valent donc des pixels : `h-855` = 855 px, `w-540` = 540 px, `px-12` = 12 px.
Le breakpoint `2xl` est redéfini à 1080 px (`max-2xl:` = sous le canvas).

## Styles

- `src/styles/global.css` : `@import "tailwindcss"` + `@import "../../design-system/tokens.css"`
  (le bloc `@theme` de `design-system/tokens.css` est la source de vérité unique des tokens).
  Les composants consomment la couche sémantique : `bg-surface`, `text-ink`, `border-line`,
  jamais `bg-black`, `text-white` ni un hex.
- `src/styles/custom.css` : chargé **après**, peut écraser Tailwind (reset, scrollbar, réseaux sociaux).
- Une classe utilitaire dont le token n'existe pas dans `@theme` n'est **pas** générée et échoue
  en silence. Vérifier que la couleur ou la taille utilisée est bien déclarée.
- `custom.css` vit dans les cascade layers Tailwind (`@layer base` pour les resets,
  `@layer components` pour scrollbar et réseaux sociaux) : les utilitaires l'emportent
  toujours, le suffixe `!` est interdit (décision D5, voir
  [design-system/DESIGN-SYSTEM.md](design-system/DESIGN-SYSTEM.md)).
- L'indicateur de focus clavier du site est défini une seule fois dans `custom.css`
  (`:focus-visible`, décision D6) : ne pas poser d'`outline: none` ni de style de focus local.

## Polices

`src/assets/fonts/fonts.ts` expose `amalfi` (titres, accents) et `baiti` (texte courant), chargées
en local via `next/font/local`. Elles sont importées **avant** les CSS dans `src/app/layout.tsx`.
Utilisation : classes sémantiques `font-display` (Amalfi, accents) / `font-body` (Baiti, texte
courant). Les tailles passent par l'échelle de rôle du design system (`text-caption` 14px à
`text-giant` 120px, voir `design-system/tokens.css`) : l'échelle rem par défaut de Tailwind
(`text-sm`, `text-xl`...) est interdite (décision D4).

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

Le hook `commit-msg` valide le message avec commitlint (`commitlint.config.mjs`) : le type
conventionnel est exigé, la majuscule initiale du sujet est acceptée, et les dépassements de
longueur ne produisent qu'un avertissement sans bloquer le commit.
