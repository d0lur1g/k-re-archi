# Composants K-Ré : anatomie, états, statuts

> Généré le 17/08/2026. Snapshot source : `92699ee168a8b046e57ba09d9c2f69cb547481db` (main).
> Couverture : code 100 % (35/35 fichiers), Figma en échantillon (pages 1:2 et 71:248).
> Mode : outillé. La matrice d'états complète issue de l'audit est dans `audit/inventaire-phase1.json` et MIGRATION.md.

Statuts : **stable** (conforme à son rôle actuel), **à refactoriser** (dette identifiée),
**à créer** (existe en maquette ou en besoin, pas dans le code).

## Vue d'ensemble

| Composant         | Fichier                                                | Statut                 | Dette principale                                                                |
| ----------------- | ------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------- |
| Header            | src/components/layouts/Header.tsx                      | à refactoriser         | Recette de lien dupliquée x3, pas d'état page courante, icônes 6px              |
| MenuResponsive    | src/components/layouts/MenuResponsive.tsx              | à refactoriser         | Recette dupliquée x3, pas de focus trap ni role dialog                          |
| Footer            | src/components/layouts/Footer.tsx                      | à refactoriser (léger) | Tailles Figma non appliquées (O5), logo Ordre sans nom accessible               |
| Hero              | src/components/sections/homepage/Hero.tsx              | stable                 | Classes flex inertes à purger (lignes 14, 18, 42), font-medium isolé (ligne 20) |
| Presentation      | src/components/sections/homepage/Presentation.tsx      | stable                 | Contenu lorem à injecter (phase contenu)                                        |
| Gallery           | src/components/sections/homepage/Gallery.tsx           | à refactoriser (léger) | Alt générique, pas de lien vers /projects malgré le rôle d'appel                |
| ProjectsGrid      | src/components/sections/projects/ProjectsGrid.tsx      | à refactoriser         | Zone de scroll non focusable, état vide muet                                    |
| ProjectCard       | src/components/sections/projects/ProjectCard.tsx       | à refactoriser         | Overlay titre invisible au clavier, état vide muet                              |
| ProjectGallery    | src/components/sections/projects/ProjectGallery.tsx    | à refactoriser         | Zone de scroll non focusable, état vide muet                                    |
| ProjectHeader     | src/components/sections/projects/ProjectHeader.tsx     | à refactoriser         | Tooltip maison souris seule, budget conditionné par category                    |
| ProjectNavigation | src/components/sections/projects/ProjectNavigation.tsx | à refactoriser         | Écart maquette O11 (boutons 180x45 centrés, flèches image), nav sans aria-label |
| RootLayout        | src/app/layout.tsx                                     | stable                 | p-4 du body (4px) à trancher en O1, pas de skip link                            |
| Error             | src/app/error.tsx                                      | à refactoriser (léger) | Espacements O1, bouton sans focus visible                                       |
| GlobalError       | src/app/global-error.tsx                               | à refactoriser (léger) | Notations black/white hors tokens, pas de hover, espacements O1                 |
| Loading           | src/app/loading.tsx                                    | stable                 | role="status" manquant                                                          |
| NotFound          | src/app/not-found.tsx                                  | à refactoriser (léger) | Espacements O1                                                                  |
| NavLink           | n'existe pas                                           | à créer                | Factorise 6 recettes identiques (Header x3, MenuResponsive x3)                  |
| ActionInverse     | n'existe pas                                           | à créer                | Factorise le motif hover inversé (Footer x2, ProjectNavigation x2)              |
| BoutonSysteme     | n'existe pas                                           | à créer                | Factorise les 3 recettes des pages système                                      |
| InfoCard          | n'existe pas (Figma 34:417, 48:245)                    | à créer                | Remplace le tooltip maison ; variantes Info et Warning                          |
| PageContact       | n'existe pas (Figma 183:658)                           | à créer (hors passe 1) | Page absente du code, traitée à son chantier roadmap                            |

## Fiches

### Header

Anatomie : logo (cellule 180x180, lettrine K Amalfi + « -Ré » Baiti), baseline agence
(360px, 3 lignes à majuscules), nav desktop (3 liens 180x90), bouton menu mobile (90x90).
Variantes : aucune prop ; bascule mobile sous `lg`, canvas sous `canvas`.
États : default et hover présents ; focus-visible absent (le bouton menu n'a aucun
indicateur, voir D6) ; page courante absente (Figma définit projects/missions/contact
actifs, nœud 85:760, décision O8).
Contenu : liens codés en dur ; /missions et /contact pointent vers des routes vides.

### MenuResponsive

Anatomie : voile plein écran sous le header (dvh), 3 NavLink empilés (max-w-540).
Props : `closeMenu`. États : default, hover ; fermeture Escape gérée ; manquent
focus trap, `role="dialog"`, `aria-modal`, retour du focus au bouton à la fermeture.

### Footer

Anatomie : logo Ordre des architectes (cellule 180px), 2 liens (FAQ, mentions légales),
copyright (360px), 4 icônes sociales (34px, currentColor).
États : default, hover (inversion sur les liens, couleur de marque + scale 1.1 sur les
icônes via custom.css). Manque : nom accessible du logo Ordre (SVG sans title).
Contenu : `socials` et `footerLinks` en dur dans le module ; copyright avec année figée 2025.

### Hero, Presentation, Gallery (accueil)

Sections statiques sans prop ni élément interactif. Hero : h1 sr-only, image priority.
Presentation : h2 sr-only, lettrines Amalfi, textes lorem à remplacer par les champs
réels (voir mapping plus bas). Gallery : image unique, alt générique « Projet
architecture » à préciser, lien d'appel vers /projects à décider.

### ProjectsGrid et ProjectCard

Grid : scroll horizontal molette (useHorizontalScroll), 2 rangées par parité d'index.
Props : `projects: Project[]`. Card : 360x360, grille interne selon `layout`
(1-single, 2-horizontal, 2-vertical, 2x2, calculée par lib/layout.ts), grayscale au
repos, overlay titre + lieu au survol.
États manquants : vide (grille et carte rendent des blocs muets), focus (overlay
jamais révélé au clavier : ajouter group-focus-within, et tabIndex sur la zone de
scroll). Loading et error délégués aux conventions Next au niveau route.

### ProjectGallery, ProjectHeader, ProjectNavigation (page projet)

Gallery : scroll horizontal, ratio 4/3 inline, cas 1 image géré, vide muet.
Header : h1 titre, description line-clamp-6 avec tooltip maison (souris seule, sans
role tooltip ni aria-describedby : remplacé par InfoCard en O6) ; métadonnées
category/budget/year/location/surface_area optionnelles ; incohérence : budget affiché
seulement si category est présent.
Navigation : liens précédent/suivant pleine largeur avec inversion au hover ; écart
maquette O11 (Figma : 2 boutons 180x45 centrés, flèches image 24px, nœud 175:959) ;
micro-espacement 2px face au module 5px : O9 ; nav sans aria-label, flèches texte
non masquées aux lecteurs d'écran.

### Pages système (Error, GlobalError, Loading, NotFound)

Recette commune : plein écran inversé (surface-inverse), titre display Amalfi, texte
atténué par opacité, action unique. Trois implémentations divergentes du bouton à
unifier dans BoutonSysteme. GlobalError utilise black/white littéraux : à migrer vers
les tokens (réserve : global-error remplace le layout racine, vérifier que le CSS du
@theme est bien chargé dans ce scénario avant migration).

### À créer

**NavLink** : lien de navigation 180x90 (ou pleine largeur mobile), body nav,
hover font-display + border-b-3 + meta, focus-visible D6, état actif O8.
Consommé par Header et MenuResponsive : remplace 6 chaînes className.

**ActionInverse** : lien ou bouton dont le hover inverse surface et encre
(hover:bg-surface-inverse hover:text-ink-inverse). Consommé par Footer et
ProjectNavigation. Le `!` actuel disparaît avec D5.

**BoutonSysteme** : action des pages système, surface claire sur fond inversé,
rounded-ui, espacements tranchés en O1, focus-visible D6.

**InfoCard** (Figma 34:417, 48:245) : variantes Info et Warning ; remplace le tooltip
de ProjectHeader avec un vrai contrat clavier (focus, aria-describedby) ; ferme O6.

## Mapping vers les champs de contenu

| Champ (src/types/project.ts)     | Composants consommateurs                                      | Notes                                                                  |
| -------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| title                            | ProjectCard (overlay), ProjectHeader (h1), metadata de page   |                                                                        |
| description                      | ProjectHeader (line-clamp + tooltip), metadata                | Optionnel : repli géré                                                 |
| category.name                    | ProjectHeader                                                 | Conditionne aussi l'affichage du budget (bug à corriger)               |
| year, location, surface_area     | ProjectHeader (ligne méta), ProjectCard (location en overlay) | Optionnels : repli géré                                                |
| budget                           | ProjectHeader                                                 | Affiché seulement si category existe                                   |
| images[].url, alt, display_order | ProjectCard (4 max, tri display_order), ProjectGallery        | Alt fournis par la donnée : obligatoires à la saisie                   |
| slug                             | ProjectCard (lien), ProjectNavigation (précédent/suivant)     |                                                                        |
| Textes de Presentation (accueil) | Presentation                                                  | Aujourd'hui lorem en dur : champ de contenu à créer à la phase contenu |

Règle d'accès : tout passe par `src/lib/projects.ts` (point d'entrée unique, destiné à
devenir asynchrone) ; aucun composant n'importe `src/data` directement.
