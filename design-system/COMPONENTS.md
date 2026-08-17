# Composants K-Ré : anatomie, états, statuts

> Généré le 17/08/2026. Snapshot source : `92699ee168a8b046e57ba09d9c2f69cb547481db` (main).
> Couverture : code 100 % (35/35 fichiers), Figma en échantillon (pages 1:2 et 71:248).
> Mode : outillé. La matrice d'états complète issue de l'audit est dans `audit/inventaire-phase1.json` et MIGRATION.md.

Statuts : **stable** (conforme à son rôle actuel), **à refactoriser** (dette identifiée),
**à créer** (existe en maquette ou en besoin, pas dans le code).

## Vue d'ensemble

| Composant         | Fichier                                                | Statut                      | Dette principale                                                                                                        |
| ----------------- | ------------------------------------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Header            | src/components/layouts/Header.tsx                      | stable (18/08/2026)         | Liens factorisés en NavLink, icônes plein bouton (O2) ; reste l'état page courante (O8)                                 |
| MenuResponsive    | src/components/layouts/MenuResponsive.tsx              | à refactoriser              | Liens factorisés en NavLink (18/08/2026) ; reste focus trap et role dialog                                              |
| Footer            | src/components/layouts/Footer.tsx                      | à refactoriser (léger)      | Liens factorisés en ActionInverse (18/08/2026) ; restent O5 et le nom accessible du logo Ordre                          |
| Hero              | src/components/sections/homepage/Hero.tsx              | stable                      | Classes inertes purgées et font-medium retiré (18/08/2026)                                                              |
| Presentation      | src/components/sections/homepage/Presentation.tsx      | stable                      | Contenu lorem à injecter (phase contenu)                                                                                |
| Gallery           | src/components/sections/homepage/Gallery.tsx           | à refactoriser (léger)      | Alt générique, pas de lien vers /projects malgré le rôle d'appel                                                        |
| ProjectsGrid      | src/components/sections/projects/ProjectsGrid.tsx      | à refactoriser              | Zone de scroll non focusable, état vide muet                                                                            |
| ProjectCard       | src/components/sections/projects/ProjectCard.tsx       | à refactoriser              | Overlay titre invisible au clavier, état vide muet                                                                      |
| ProjectGallery    | src/components/sections/projects/ProjectGallery.tsx    | à refactoriser              | Zone de scroll non focusable, état vide muet                                                                            |
| ProjectHeader     | src/components/sections/projects/ProjectHeader.tsx     | à refactoriser (léger)      | Tooltip corrigé au clavier (O6, 18/08/2026) ; reste budget conditionné par category                                     |
| ProjectNavigation | src/components/sections/projects/ProjectNavigation.tsx | à refactoriser (léger)      | ActionInverse + aria-label + flèches masquées (18/08/2026) ; reste l'écart maquette O11                                 |
| RootLayout        | src/app/layout.tsx                                     | stable                      | Cadre p-16 appliqué (O1 fermée) ; reste le skip link                                                                    |
| Error             | src/app/error.tsx                                      | stable (18/08/2026)         | Espacements corrigés (O1), BoutonSysteme, focus D6                                                                      |
| GlobalError       | src/app/global-error.tsx                               | stable (18/08/2026)         | Tokens, espacements (O1) et BoutonSysteme appliqués ; vérifier le chargement CSS hors layout racine avant mise en ligne |
| Loading           | src/app/loading.tsx                                    | stable                      | role="status" manquant                                                                                                  |
| NotFound          | src/app/not-found.tsx                                  | stable (18/08/2026)         | Espacements corrigés (O1), BoutonSysteme                                                                                |
| NavLink           | src/components/ui/NavLink.tsx                          | stable (créé le 18/08/2026) | Variantes desktop et mobile ; remplace 6 recettes identiques                                                            |
| ActionInverse     | src/components/ui/ActionInverse.tsx                    | stable (créé le 18/08/2026) | Inversion surface/encre au survol ; géométrie au point d'usage                                                          |
| BoutonSysteme     | src/components/ui/BoutonSysteme.tsx                    | stable (créé le 18/08/2026) | Lien ou bouton selon les props ; recette unique des pages système                                                       |
| InfoCard          | abandonné (18/08/2026)                                 | hors produit                | L'info_card Figma (34:417, 48:245) est une annotation interne de maquette ; le tooltip est corrigé dans ProjectHeader   |
| PageContact       | n'existe pas (Figma 183:658)                           | à créer (hors passe 1)      | Page absente du code, traitée à son chantier roadmap                                                                    |

## Fiches

### Header

Anatomie : logo (cellule 180x180, lettrine K Amalfi + « -Ré » Baiti), baseline agence
(360px, 3 lignes à majuscules), nav desktop (3 liens 180x90), bouton menu mobile (90x90).
Variantes : aucune prop ; bascule mobile sous `lg`, canvas sous `canvas`.
États : default et hover présents ; focus-visible couvert par le style global D6
(depuis le lot 0) ; page courante absente (Figma définit projects/missions/contact
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
role tooltip ni aria-describedby : corrigé au lot 5, fermeture d'O6) ; métadonnées
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

**InfoCard** : abandonné le 18/08/2026. L'extraction du nœud Figma 34:417 a montré que
l'info_card est une annotation interne de maquette (couleurs et polices hors identité).
Le tooltip de ProjectHeader a été corrigé dans le système à la place (bordure line,
rounded-ui, focus clavier et Escape, role tooltip) : O6 fermée.

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
