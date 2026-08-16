# K-Ré — Architecture

Site vitrine de l'agence **K-Ré**, architecture et architecture d'intérieur.

Le site présente l'agence et ses réalisations : une page d'accueil, une galerie de projets
parcourue horizontalement, et une fiche par projet. Il est actuellement en **phase de maquette** —
la structure et le design sont réels, les contenus affichés sont fictifs.

## Stack

| Brique     | Version                    |
| ---------- | -------------------------- |
| Next.js    | 16 (App Router, Turbopack) |
| React      | 19                         |
| TypeScript | 5, mode strict             |
| Tailwind   | v4 (configuration en CSS)  |
| Qualité    | ESLint, Prettier, Husky    |

## Démarrage

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande               | Effet                                        |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Serveur de développement                     |
| `npm run build`        | Build de production                          |
| `npm run start`        | Sert le build de production                  |
| `npm run lint`         | ESLint                                       |
| `npm run format`       | Prettier en écriture                         |
| `npm run format:check` | Prettier en vérification (utilisé par la CI) |
| `npm run type-check`   | Vérification TypeScript sans émission        |
| `npm run structure`    | Régénère `docs/STRUCTURE.md`                 |

## Organisation

```
src/app          routes App Router (/, /projects, /projects/[slug]) et pages d'erreur
src/components   layouts (header, footer, menu) et sections rangées par page
src/data         données de la maquette
src/lib          accès aux données, calculs de mise en page, constantes
src/styles       Tailwind (global.css) puis styles personnalisés (custom.css)
src/assets       polices et images passant par le bundler
public/images    photos de projets servies statiquement
```

L'arborescence complète est dans [docs/STRUCTURE.md](docs/STRUCTURE.md), régénérée par
`npm run structure`.

Le design repose sur un canvas fixe de 1080 × 1080 px découpé en header 180 / contenu 855 /
footer 45. Cette contrainte et ses conséquences sont détaillées dans [CLAUDE.md](CLAUDE.md).

## Documentation

- [CLAUDE.md](CLAUDE.md) — repères techniques, conventions et pièges du projet.
- [docs/ROADMAP.md](docs/ROADMAP.md) — feuille de route, décisions actées, points ouverts.
- [docs/STRUCTURE.md](docs/STRUCTURE.md) — arborescence générée des fichiers suivis.
- [CONTRIBUTING.MD](CONTRIBUTING.MD) — conventions de branches, de commits et de PR.

## Intégration continue

Chaque PR vers `main` déclenche lint, vérification de formatage, contrôle des types et build
(`.github/workflows/ci.yml`). Aucun déploiement automatique n'est en place à ce stade.
