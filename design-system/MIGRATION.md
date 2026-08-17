# Migration vers les tokens K-Ré

> Généré le 17/08/2026. Snapshot source : `92699ee168a8b046e57ba09d9c2f69cb547481db` (main).
> Couverture : code 100 % (35/35 fichiers), Figma en échantillon. Mode : outillé.
> Les comptages d'occurrences proviennent de `audit/inventaire-phase1.json` (recomptés
> et confirmés par contre-vérification indépendante).

Principe directeur : la migration de première passe est **iso-visuelle**. Chaque token
reprend la valeur effective relevée : remplacer une classe par son token ne bouge aucun
pixel. Les seuls lots qui changent le rendu sont les lots décisionnels (0 et 3),
explicitement signalés, qui corrigent des erreurs mesurées.

## Table de correspondance (bidirectionnelle)

Lecture aller : chaque valeur relevée en phase 1 a une destination ou une mention
« conservée hors système ». Lecture retour : chaque token liste tout ce qu'il remplace.

### Couleurs

| Existant (notation, occurrences)                                                              | Destination                                                                                                                                              | Sens retour (le token remplace)                                                     |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `bg-white` (7), `bg-kre-white` (2 dont 1 `!`)                                                 | `bg-surface`                                                                                                                                             | surface = bg-white, bg-kre-white, bg-kre-white!                                     |
| `bg-black` (2), `hover:bg-black` (5), `bg-kre-black` (3)                                      | `bg-surface-inverse` (+ variante hover)                                                                                                                  | surface-inverse = bg-black, hover:bg-black, bg-kre-black                            |
| `text-black` (7), `text-kre-black` (2 dont 1 `!`)                                             | `text-ink`                                                                                                                                               | ink = text-black, text-kre-black, text-kre-black!                                   |
| `text-white` (2), `hover:text-white!` (3), `group-hover:text-white` (2), `text-kre-white` (3) | `text-ink-inverse` (+ variantes)                                                                                                                         | ink-inverse = text-white, hover:text-white!, group-hover:text-white, text-kre-white |
| `text-neutral-700` (1)                                                                        | `text-ink-muted`                                                                                                                                         | ink-muted = text-neutral-700                                                        |
| `border-black` (9)                                                                            | `border-line`                                                                                                                                            | line = border-black                                                                 |
| `border-neutral-300` (1)                                                                      | `border-line-muted` (valeur à réévaluer, O6)                                                                                                             | line-muted = border-neutral-300                                                     |
| `bg-neutral-100` (2)                                                                          | `bg-placeholder`                                                                                                                                         | placeholder = bg-neutral-100 et bg-neutral-200                                      |
| `bg-neutral-200` (1)                                                                          | `bg-placeholder` (fusion décisionnelle, ΔE2000 3,39, même rôle)                                                                                          | voir ci-dessus                                                                      |
| `from-black/70` (1)                                                                           | `from-overlay/70`                                                                                                                                        | overlay = black de l'overlay                                                        |
| `to-transparent` (1)                                                                          | conservé hors système (mot-clé CSS)                                                                                                                      | s.o.                                                                                |
| `bg-linear-to-t` (1)                                                                          | conservé hors système (utilitaire de direction, pas une valeur ; la recette complète de l'overlay devient bg-linear-to-t from-overlay/70 to-transparent) | s.o.                                                                                |
| Hex custom.css:88-101 (4)                                                                     | `text-social-facebook/-instagram/-pinterest/-linkedin` via classes utilitaires ou custom.css tokenisé                                                    | social-\* = #1877f2, #e4405f, #e60023, #0a66c2                                      |
| `--color-kre-black`, `--color-kre-white` (définitions)                                        | dépréciés puis supprimés en fin de lot 1                                                                                                                 | s.o.                                                                                |
| SVG `fill="currentcolor"` (4)                                                                 | conservé hors système (mécanisme d'héritage voulu, D8)                                                                                                   | s.o.                                                                                |
| SVG menu : `fill="white"`, `stroke="black"` en dur                                            | à redessiner en currentColor (D8, lié à O2)                                                                                                              | s.o.                                                                                |
| SVG logo Ordre : `fill:#000000` (6), `stroke:#000000` (1)                                     | conservé hors système (œuvre fixe tierce)                                                                                                                | s.o.                                                                                |
| `#d1d1d1` (logo-order-architects.svg:11)                                                      | conservé hors système (métadonnée Inkscape non rendue)                                                                                                   | s.o.                                                                                |

### Typographie

| Existant (occurrences)                                         | Destination                                                        | Sens retour                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| `font-amalfi` (11), `hover:font-amalfi` (6)                    | `font-display` (+ variante hover)                                  | display = font-amalfi                      |
| `font-baiti` (33)                                              | `font-body`                                                        | body = font-baiti                          |
| `text-sm` (1)                                                  | `text-caption` (14px)                                              | caption = text-sm                          |
| `text-base` (1)                                                | `text-body` (16px)                                                 | body = text-base                           |
| `text-[18px]` (4)                                              | `text-reading` (18px, écart Figma O4)                              | reading = text-[18px]                      |
| `text-xl` (2), `hover:text-xl` (6), `text-[20px]` (2)          | `text-meta` (20px)                                                 | meta = text-xl, hover:text-xl, text-[20px] |
| `text-2xl` (5), `max-2xl:text-2xl` (6)                         | `text-subtitle` (24px, variante max-canvas)                        | subtitle = text-2xl                        |
| `text-3xl` (10), `max-2xl:text-3xl` (3)                        | `text-nav` (30px)                                                  | nav = text-3xl                             |
| `text-4xl` (4)                                                 | `text-tagline` (36px, écart Figma O3)                              | tagline = text-4xl                         |
| `text-[40px]` (2)                                              | `text-name` (40px)                                                 | name = text-[40px]                         |
| `text-5xl` (6)                                                 | `text-heading` (48px, écarts Figma O3)                             | heading = text-5xl                         |
| `text-6xl` (7)                                                 | `text-display` (60px)                                              | display = text-6xl                         |
| `text-[120px]` (1)                                             | `text-giant` (120px)                                               | giant = text-[120px]                       |
| `font-medium` (1, Hero.tsx:20)                                 | supprimé (occurrence isolée et involontaire : 1 ligne sur 5)       | s.o.                                       |
| `leading-none` (1), `leading-[100%]` (4)                       | `leading-flush`                                                    | flush = leading-none, leading-[100%]       |
| `leading-[30%]` (8), `leading-[70%]` (1), `leading-[202%]` (1) | conservés hors système (compositions header, D10, revalidation O3) | s.o.                                       |
| `font-family: var(--font-baiti), 600` (custom.css:19)          | supprimé au lot 0 (déclaration invalide)                           | s.o.                                       |

### Espacement (liste blanche D3 : 2, 5, 6, 10, 12, 15, 24, 30)

| Existant (occurrences)                                                        | Destination                                                                         | Justification                                                         |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 2 : `py-2` (2), `gap-2` (2), `mt-2` (1), `mb-2` (2)                           | conservé (rapprochement vers 5 : O9)                                                | micro-espacement relevé                                               |
| `gap-2.5` (1, Header.tsx:20)                                                  | `gap-10`                                                                            | Figma gap-[10px] sur le logo (nœud 140:599) : erreur d'échelle avérée |
| 2.5 et 4 (constants.ts PADDING, GAP)                                          | conservés hors système (grille interne des cartes)                                  | valeurs de composition documentées                                    |
| 3 : `py-3` (2)                                                                | 12 si conversion x4 validée (O1)                                                    | recette bouton de l'échelle rem, rendue 3px                           |
| 4 : `p-4` (2), `px-4` (3), `mb-4` (5), `mt-4` (1)                             | 16 si O1 validée (pages système et body)                                            | même erreur d'échelle                                                 |
| 4 : `max-2xl:p-4` (3, liens nav mobiles)                                      | 5 (fusion de rôle avec max-2xl:p-5)                                                 | même rôle, écart 1px                                                  |
| 5 : `pr-5`, `pb-5`, `max-2xl:p-5` (3)                                         | conservé                                                                            | aligné module Figma                                                   |
| 6 : `px-6` (2), `gap-6` (1)                                                   | conservé (px-6 de global-error : O1)                                                | aligné Figma px-[6px]                                                 |
| 8 : `px-8` (2), `mb-8` (2)                                                    | 32 si O1 validée                                                                    | erreur d'échelle (32px voulus)                                        |
| 10 : `gap-10` (3), `pb-10` (1), `pr-10` (1)                                   | conservé                                                                            | compositions header/hero                                              |
| 12 : `px-12` (5), `pr-12` (2), `p-12`, `py-12`, `pb-12`, `pl-12`, `pt-12` (5) | conservé                                                                            | padding standard de bloc                                              |
| 15 : `pt-15`, `pl-15`, `py-15` (3)                                            | conservé                                                                            | aligné Figma 15px                                                     |
| 24 : `pr-24` (1)                                                              | conservé (écart Figma 22.5 : O10)                                                   |                                                                       |
| 30 : `py-30` (1)                                                              | conservé                                                                            |                                                                       |
| 195 : `px-195` (1)                                                            | conservé hors système (composition hero, aligné Figma)                              |                                                                       |
| `my-auto` (1)                                                                 | conservé hors système (centrage, pas une longueur)                                  |                                                                       |
| `max-w-md` (3, pages système)                                                 | `max-w-448` si O1 validée (valeur explicite en px, iso-valeur : md = 28rem = 448px) | échapper à l'échelle rem                                              |

O1 validée le 18/08/2026 : les valeurs 16 et 32 entrent dans la liste blanche (D3 et
commentaire de tokens.css mis à jour au lot 3).

### Tailles hors module (rappel, catégorie dimensionnelle)

| Existant                                                         | Destination                                                       |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| `h-6 w-6` (icônes menu, rendues 6px)                             | O2 : plein bouton recommandé (h-full w-full dans le bouton 90x90) |
| `h-34 w-34` (icônes sociales)                                    | conservé, écart Figma 36px : O5                                   |
| `h-108`, `h-72` (Presentation)                                   | conservés hors système (composition, somme = 180)                 |
| Module 45 (45, 90, 180, 270, 360, 405, 540, 630, 720, 855, 1080) | conservé : contrat géométrique du canvas (D3)                     |

### Rayons, breakpoints, mouvement

| Existant                                             | Destination                                                                                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rounded` (1), `rounded-sm` (2), même valeur 4px     | `rounded-ui`                                                                                                                                                              |
| `rounded-lg` (1, tooltip, 8px)                       | conservé hors système jusqu'à InfoCard (O6)                                                                                                                               |
| `max-2xl:` (28) et `--breakpoint-2xl`                | `max-canvas:` et `--breakpoint-canvas` (renommage iso-valeur 1080px)                                                                                                      |
| `max-lg:` (9)                                        | conservé (token lg, redéclaré à 1024px dans tokens.css : iso-valeur avec son défaut 64rem, homogénéise l'unité du namespace breakpoint dont dépend l'ordre des variantes) |
| `@media (max-width: 899px)` (custom.css:103)         | absorbé par lg 1024px si O7 validée                                                                                                                                       |
| `(max-width: 1200px)` (sizes, ProjectGallery.tsx:39) | 1080px (aligné canvas)                                                                                                                                                    |
| `duration-300` (15), `duration-500` (1)              | conservés (300 standard, 500 révélation d'image)                                                                                                                          |
| `0.3s ease-in-out` en CSS (custom.css:78,123)        | 300ms ease-in-out, harmonisé au lot 0                                                                                                                                     |
| `ease-in` (6) contre `ease-in-out` (4)               | unifié sur ease-in-out (décisionnel léger, lot 5)                                                                                                                         |
| `.animate-fadeIn` + keyframes (custom.css:113-124)   | supprimé (code mort avéré)                                                                                                                                                |
| `animate-pulse` (1)                                  | conservé                                                                                                                                                                  |

## Ordre de passage

Chaque lot est un commit dédié sur branche, avec son point de vérification visuelle.
Vérification type : `npm run dev`, puis contrôle des 5 vues (accueil, /projects,
/projects/villa-contemporaine, /404, page d'erreur simulée) à 1440px, 1000px et 375px.

| Lot | Contenu                                                                                                                                                                                                                                      | Type                                      | Occurrences                      | Vérification visuelle                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | Assainir custom.css : @layer base (D5), suppression ligne 19 invalide, code mort fadeIn, override .overflow-x-auto remplacé par une classe dédiée, retrait des 5 `!` devenus inutiles, retrait de `outline: none` + style focus-visible (D6) | Décisionnel léger, rendu quasi iso        | 1 fichier CSS + 5 `!` dans 4 tsx | Hovers footer et nav projet (le `!` sautait la cascade), focus clavier sur tout le parcours, scroll doux conservé                      |
| 1   | Couleurs : nouveau @theme (tokens.css), remplacement des 54 occurrences de classes couleur + 4 hex custom.css par les tokens sémantiques, suppression des kre-\*                                                                             | Mécanique                                 | 58 sur 14 fichiers               | Diff visuel attendu : zéro (valeurs identiques). Contrôler les pages système et global-error (chargement du @theme hors layout racine) |
| 2   | Typographie et rayons : remplacement des text-_/font-_/leading-\* par les tokens de rôle, rounded et rounded-sm vers rounded-ui                                                                                                              | Mécanique                                 | 103 sur 13 fichiers              | Zéro diff attendu (échelle iso-valeur)                                                                                                 |
| 3   | Espacements erronés : pages système x4 (O1), icônes menu (O2), gap logo 2.5 vers 10, fusion p-4/p-5 nav mobile                                                                                                                               | Décisionnel, rendu modifié volontairement | ~28 sur 6 fichiers               | Avant/après des 4 pages système, header mobile sous 1024px                                                                             |
| 4   | Breakpoints : max-2xl vers max-canvas, 899 vers lg (O7), 1200 vers 1080 dans sizes                                                                                                                                                           | Mécanique après O7                        | 30 sur 5 fichiers                | Bande 900-1024 (centrage, menu), redimensionnement continu 1440 vers 360                                                               |
| 5   | Factorisation : NavLink, ActionInverse, BoutonSysteme, InfoCard ; unification ease-in-out ; purge des classes inertes de Hero                                                                                                                | Mécanique après création des composants   | 12 chaînes + 4 fichiers          | Hovers de toute la nav, tooltip projet au clavier                                                                                      |

Réversibilité : chaque lot est un commit isolé, revert git propre. Les lots 1, 2 et 4
sont des renommages iso-valeur (risque de régression quasi nul, vérifiable au diff de
build CSS). Les lots 0, 3 et 5 changent le rendu ou la cascade : captures avant/après
obligatoires.

## Ligne de base (à recalculer après chaque lot)

| Indicateur                            | Valeur au 17/08/2026 (92699ee)                                                 | Procédure de recalcul                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Couleurs uniques / notations du noir  | 10 / 7                                                                         | `node design-system/audit/scan.mjs .` puis normalisation section couleurs |
| Tokenisation des couleurs             | 18,5 % (10/54)                                                                 | occurrences kre-\* ou sémantiques / occurrences classes couleur du scan   |
| Tailles de texte uniques / hors token | 11 / 9 arbitraires                                                             | scan.mjs, sections fontSize et fontSizeArbitrary                          |
| Espacements uniques                   | 13 (57 occurrences)                                                            | scan.mjs, section spacing                                                 |
| Classes focus                         | 0                                                                              | `rg "focus:\|focus-visible:" src`                                         |
| Recettes dupliquées                   | 3 groupes, 12 occurrences                                                      | comparaison des className listés dans COMPONENTS.md                       |
| Non-conformités WCAG mesurées         | 2 (1.4.11 tooltip, 2.4.7 bouton menu) + 1 paire indéterminée (texte sur image) | `node design-system/audit/diag.mjs` + inspection custom.css               |
| Valeurs suspectes d'échelle rem       | ~28 occurrences sur 6 fichiers                                                 | scan.mjs, valeurs hors liste blanche et hors compositions documentées     |

Cibles de fin de migration : notations du noir = 1, tokenisation couleurs = 100 %,
classes focus au moins 1 style global, recettes dupliquées = 0, non-conformités = 0.
