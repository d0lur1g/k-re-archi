# Structure du projet

Vue d'ensemble de l'arborescence, limitée aux fichiers suivis par Git. Les dossiers ne contenant
que des médias sont repliés avec leur nombre de fichiers.

**Fichier généré — ne pas éditer à la main.** Le régénérer après tout ajout ou déplacement de
fichier :

```bash
npm run structure
```

Le rôle de chaque dossier est décrit dans [CLAUDE.md](../CLAUDE.md#architecture).

```text
k-re-archi/
├── .claude/
│   └── launch.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── .husky/
│   ├── commit-msg
│   └── pre-commit
├── .vscode/
│   └── settings.json
├── docs/
│   ├── ROADMAP.md
│   └── STRUCTURE.md
├── public/
│   ├── images/
│   │   └── projects/
│   │       ├── bureau/ … 4 fichiers
│   │       ├── haussmannien/ … 2 fichiers
│   │       ├── minimaliste/ … 1 fichier
│   │       ├── villa-contemporaine/ … 5 fichiers
│   │       ├── bureau.jpg
│   │       ├── clay-banks-6V-ytvmYMtI-unsplash.jpg
│   │       ├── clay-banks-98h8i2twi2U-unsplash.jpg
│   │       ├── jardin.jpg
│   │       ├── patio.jpg
│   │       └── piscine.jpg
│   └── favicon.ico
├── scripts/
│   ├── create-readmes.sh
│   ├── generate-structure.mjs
│   └── README.md
├── src/
│   ├── app/
│   │   ├── projects/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── amalfi-coast/ … 1 fichier
│   │   │   ├── microsoft-yi-baiti/ … 1 fichier
│   │   │   └── fonts.ts
│   │   └── images/
│   │       ├── icons/ … 2 fichiers
│   │       ├── images/ … 10 fichiers
│   │       ├── socials/ … 4 fichiers
│   │       └── logo-order-architects.svg
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MenuResponsive.tsx
│   │   └── sections/
│   │       ├── homepage/
│   │       │   ├── Gallery.tsx
│   │       │   ├── Hero.tsx
│   │       │   └── Presentation.tsx
│   │       └── projects/
│   │           ├── ProjectCard.tsx
│   │           ├── ProjectGallery.tsx
│   │           ├── ProjectHeader.tsx
│   │           ├── ProjectNavigation.tsx
│   │           └── ProjectsGrid.tsx
│   ├── data/
│   │   └── projects.ts
│   ├── hooks/
│   │   └── useHorizontalScroll.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── layout.ts
│   │   ├── projects.ts
│   │   └── slug.ts
│   ├── styles/
│   │   ├── custom.css
│   │   └── global.css
│   ├── types/
│   │   └── project.ts
│   └── svg.d.ts
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── CLAUDE.md
├── commitlint.config.mjs
├── CONTRIBUTING.MD
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```
