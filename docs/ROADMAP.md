# Feuille de route — K-Ré Architecture

Plan d'exécution du site vitrine. Ce document est la ligne directrice du projet : il fixe l'ordre
des chantiers, ce qui est considéré comme terminé, et garde la trace des décisions prises.

_Dernière mise à jour : 16 août 2026._

## 1. Contexte

Le site est une **maquette fonctionnelle** : la structure, la navigation et le design sont réels,
les contenus ne le sont pas encore (projets fictifs, lorem ipsum). L'objectif de cette séquence de
travail est d'amener la maquette à un état **complet, cohérent et présentable à la cliente**, puis
de préparer l'injection du contenu réel — par le développeur dans un premier temps, par l'agence
elle-même si le besoin d'autonomie se confirme.

État au démarrage du plan :

- 3 routes existent (`/`, `/projects`, `/projects/[slug]`) ; 4 routes liées dans la navigation
  n'existent pas et renvoient un 404 (`/missions`, `/contact`, `/faq`, `/legal-notice`) ;
- le responsive s'arrête au header et au menu mobile ;
- quelques classes utilitaires sont inopérantes faute de tokens déclarés ;
- aucune intégration continue, aucun déploiement.

## 2. Principes de travail

1. **Le gabarit prime.** Toute page respecte le budget vertical de 855 px du `<main>` sur desktop.
   Une page qui ne rentre pas se re-découpe, elle ne déborde pas.
2. **Une phase = une branche = une PR.** Nommage selon `CONTRIBUTING.MD`.
3. **La CI doit rester verte.** Lint, format, types et build conditionnent la fusion.
4. **Les données passent par un port unique** (`src/lib/projects.ts`) pour que la source puisse
   changer sans toucher aux vues.
5. **Pas de contenu inventé sur les sujets juridiques.** Les mentions légales comportent des
   champs à compléter, jamais de valeurs plausibles fabriquées.

## 3. Phases

L'ordre est volontaire : on assainit le socle avant d'ajouter des pages, on ajoute toutes les pages
avant de traiter le responsive (sinon le responsive se refait deux fois), et la couche de données
arrive en dernier car elle est orthogonale au rendu.

---

### Phase 0 — Fondations · `chore/fondations-plan-ci`

**Objectif :** disposer d'une mémoire projet écrite et d'un filet de sécurité automatique.

- [x] `CLAUDE.md` — contexte, architecture, contraintes de gabarit, pièges connus.
- [x] `docs/ROADMAP.md` — ce document.
- [x] `.github/workflows/ci.yml` — lint, format, types et build sur chaque PR et sur `main`.
- [x] Remplacer le `README.md` de `create-next-app` par une présentation réelle du projet.
- [x] Remplacer `structure.txt` (généré, périmé depuis le 28/10/2025, chemins machine et
      caractères cassés) par `docs/STRUCTURE.md`, régénéré par `npm run structure` à partir des
      seuls fichiers suivis par Git.
- [x] Historique orphelin `feature/header-responsive-menu` (ancien dépôt, **aucun ancêtre commun**
      avec `main`) traité : son seul contenu absent de `main` — commitlint et
      `.vscode/settings.json` — a été repris, et l'historique est conservé sous le tag
      `archive/header-responsive-menu`. La branche n'existait déjà plus côté GitHub.
- [ ] Ménage des branches restantes : les branches locales `feature/footer`, `feature/header`,
      `feature/homepage-gallery`, `feature/projects`, `feature/projects-project` sont fusionnées et
      peuvent être supprimées, en local comme sur GitHub pour les deux dernières.

**Terminé quand :** la CI s'exécute et passe sur une PR ouverte vers `main`.

---

### Phase 1 — Correctifs qualité · `fix/dette-technique`

**Objectif :** supprimer la dette visible avant d'ajouter de la surface.

| #   | Sujet                      | Détail                                                                                                                                                                                                                                                                       |
| --- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Tokens de couleur absents  | `bg-kre-black` / `text-kre-white` sont utilisés dans `error.tsx`, `loading.tsx`, `not-found.tsx` mais ne sont déclarés nulle part : les pages d'erreur s'affichent sans leur habillage. Déclarer `--color-kre-black` / `--color-kre-white` dans le `@theme` de `global.css`. |
| 2   | Classes mortes             | `text-body` (`Header.tsx`) et `text-600` (`Hero.tsx`) ne correspondent à aucun token — à supprimer ou à remplacer par l'intention réelle (à confirmer visuellement).                                                                                                         |
| 3   | Gabarit des pages d'erreur | `min-h-screen` dans `error.tsx` / `loading.tsx` / `not-found.tsx` alors que ces vues s'insèrent dans un `<main>` de 855 px : aligner sur le gabarit.                                                                                                                         |
| 4   | Mutation de données        | `getDisplayImages` (`src/lib/layout.ts`) trie `images` en place et mute donc le tableau partagé du module, mis en cache côté serveur. Copier avant tri.                                                                                                                      |
| 5   | Code mort                  | Import `PROJECT_CARD` inutilisé et calcul commenté dans `ProjectsGrid.tsx` — seul avertissement de lint restant. Une fois corrigé, passer la CI en `eslint . --max-warnings=0` pour qu'aucun avertissement ne s'installe.                                                    |
| 6   | Hiérarchie de titres       | Le `<h1>` du `Header` est présent sur toutes les pages et entre en concurrence avec le `<h1>` de `ProjectHeader` : un seul `h1` par page.                                                                                                                                    |
| 7   | Menu mobile                | `MenuResponsive` fixe une hauteur `calc(100vh - 180px)` alors qu'il démarre à `top-90` sous 1024 px, et `100vh` est instable sur mobile : passer en `dvh` et aligner le décalage.                                                                                            |
| 8   | Frontière client/serveur   | `ProjectCard` est marqué `"use client"` sans état ni effet ; il peut redevenir un composant serveur.                                                                                                                                                                         |

**Terminé quand :** lint, format, types et build sont verts, et les trois pages d'erreur
s'affichent dans le gabarit avec leur habillage noir et blanc.

**État : terminé le 17/08/2026.** Trois défauts non prévus sont apparus en cours de route et ont
été corrigés dans la foulée :

- `error.tsx` et `not-found.tsx` imbriquaient un second `<main>` dans celui du layout ;
- déclarer les tokens de marque a rendu visible un contraste blanc sur blanc sur les boutons des
  pages d'erreur : `custom.css` n'étant dans aucun cascade layer, ses règles d'élément battent les
  utilitaires Tailwind. Contourné par le suffixe `!`, voir la Phase 3 pour le traitement de fond ;
- la page d'accueil et la liste de projets n'avaient aucun `h1` une fois celui du `Header`
  ramené à un `<p>` : un titre réservé aux lecteurs d'écran a été ajouté à chacune.

---

### Phase 2 — Pages institutionnelles · `feature/pages-institutionnelles`

**Objectif :** plus aucun lien mort dans la navigation. Contenu en **placeholder structuré** :
la mise en page est définitive, les textes sont des marqueurs explicites à remplacer.

- `/missions` — l'offre de l'agence, découpée dans le budget 855 px.
- `/contact` — coordonnées, adresse, lien `mailto:`. Le formulaire avec envoi réel est hors
  périmètre (il suppose un service d'envoi et une protection anti-spam) : voir Phase 5.
- `/faq` — questions/réponses, structure repliable ou liste simple selon le volume.
- `/legal-notice` — trame légale avec emplacements à compléter : raison sociale, SIRET, numéro
  d'inscription à l'Ordre des architectes, assurance RCP, directeur de publication, hébergeur,
  traitement des données personnelles.

Chaque page exporte ses propres `metadata` (titre + description), comme `projects/page.tsx`.
Si un motif de mise en page se répète, le factoriser dans `src/components/layouts`.

**Terminé quand :** tous les liens du `Header`, du `MenuResponsive` et du `Footer` mènent à une
page réelle, et chaque page respecte le gabarit vertical.

---

### Phase 3 — Responsive complet · `feature/responsive`

**Objectif :** étendre au reste du site le traitement déjà appliqué au header.

Stratégie à trois paliers :

- **≥ 1080 px** : canvas fixe actuel, inchangé.
- **768 – 1079 px** : largeurs fluides ; les blocs à largeur fixe (`w-540`, `w-720`, `w-360`,
  `px-195`) deviennent des fractions ou des `clamp()`.
- **< 768 px** : empilement vertical, le budget 855 px devient une hauteur minimale et non une
  hauteur fixe.

Points spécifiques :

- grille projets : le scroll horizontal (`useHorizontalScroll`) capture la molette ; le désactiver
  sous le palier mobile au profit d'un défilement vertical naturel, et respecter
  `prefers-reduced-motion` ;
- galerie projet : même traitement ;
- `custom.css` : déplacer ses règles de reset dans `@layer base` pour qu'elles cessent de battre
  les utilitaires Tailwind. C'est le traitement de fond du contournement par `!` introduit en
  Phase 1 ; le faire ici, où les styles sont de toute façon repris, plutôt qu'isolément — la portée
  touche tous les liens et boutons du site ;
- vérification aux largeurs 360, 768, 1024 et 1440 px.

**Terminé quand :** aucun débordement horizontal ni texte tronqué aux quatre largeurs de contrôle,
sur l'accueil, la liste de projets, une page projet et les pages institutionnelles.

---

### Phase 4 — Couche de données · `feature/data-layer`

**Objectif :** préparer l'injection du contenu réel sans réécrire les vues.

Forme retenue (voir journal des décisions) : **un fichier TypeScript par projet, derrière un port
asynchrone**.

- `src/data/projects/<slug>.ts` — un projet par fichier, agrégés par un `index.ts`.
- `src/lib/projects.ts` — point d'entrée unique, fonctions **asynchrones** dès maintenant, pour
  qu'un passage à une source distante ne change qu'une implémentation.
- Corriger la fuite d'abstraction : `src/app/projects/page.tsx` importe aujourd'hui `projectsData`
  en direct.
- Validation au chargement : slugs uniques et non vides, au moins une image par projet,
  `display_order` cohérents, chemins d'images pointant vers `public/images/projects/<slug>/`.
  Un contenu malformé doit faire échouer le build, pas produire une page cassée.
- `src/lib/slug.ts` (`generateSlug`) n'est utilisé nulle part : soit l'employer pour contrôler la
  cohérence entre titre et slug, soit le supprimer.
- Documenter la procédure « ajouter un projet » (fichier + dossier d'images + validation).

**Terminé quand :** ajouter un projet ne demande qu'un fichier et un dossier d'images, aucune page
n'importe `src/data`, et un projet volontairement invalide fait échouer le build.

---

### Phase 5 — Mise en ligne (différée)

Volontairement hors périmètre pour l'instant : on n'automatise le déploiement que lorsque le
contenu réel justifie une URL publique. À reprendre à ce moment-là :

- hébergement (Vercel pour un support natif de Next.js, ou export statique si l'hébergeur est
  imposé — tout le site est déjà généré statiquement) ;
- formulaire de contact avec envoi réel et protection anti-spam ;
- bannière cookies / mesure d'audience si un outil d'analytique est ajouté ;
- édition autonome du contenu par l'agence (CMS) si le besoin se confirme.

## 4. Maintenance des dépendances · `chore/maj-dependances`

Chantier transverse, hors séquence des phases : à traiter sur sa propre branche, jamais glissé
dans une PR fonctionnelle.

État au 16/08/2026, `npm audit` sur le lockfile courant : **14 vulnérabilités (1 critique,
10 hautes, 2 modérées, 1 faible)**. Toutes sont transitives et cantonnées à l'outillage de build —
`@babel/core`, `brace-expansion`, `flatted`, `ajv`, `svgo` (via SVGR), `yaml` — plus `sharp`,
utilisé par `next/image` à la compilation. Aucune n'est atteignable à l'exécution : le site est
entièrement généré statiquement. L'alerte affichée par GitHub annonce un chiffre plus élevé (76)
car elle compte par alerte et couvre l'historique du dépôt.

Traitement :

- `npm audit fix` corrige la majorité sans sortir des versions déclarées — sans risque, à faire en
  premier ;
- `sharp` ne se résout qu'avec `npm audit fix --force`, qui fait passer Next de 16.0.0 à 16.3.1.
  Cette montée de version mérite sa propre branche, avec build et vérification visuelle des pages
  avant fusion ;
- committer le `package-lock.json` mis à jour et vérifier que la CI reste verte.

## 5. Journal des décisions

| Date       | Décision                                                                                                          | Motif                                                                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 16/08/2026 | **CI sans CD.** GitHub Actions vérifie lint, format, types et build ; aucun déploiement automatique.              | La qualité doit être verrouillée tout de suite ; l'hébergement attendra du contenu réel.                                                                                                   |
| 16/08/2026 | **Données en TypeScript, un fichier par projet, derrière un port asynchrone.**                                    | Coût nul en phase maquette, diffs Git lisibles, et bascule ultérieure vers une source externe sans toucher aux composants. Un CMS serait prématuré tant que la maquette n'est pas validée. |
| 16/08/2026 | **Pages institutionnelles en placeholder structuré.**                                                             | La structure peut être validée par la cliente avant que les textes existent ; l'insertion du contenu réel ne modifiera pas la mise en page.                                                |
| 16/08/2026 | **Responsive traité après les pages manquantes.**                                                                 | Éviter de refaire l'adaptation deux fois.                                                                                                                                                  |
| 16/08/2026 | **Vulnérabilités des dépendances traitées comme un chantier de maintenance isolé.**                               | Aucune n'est atteignable à l'exécution ; la seule correction risquée est une montée de version de Next, qui doit être testable seule et non noyée dans une PR fonctionnelle.               |
| 17/08/2026 | **commitlint repris de l'historique orphelin, avec `subject-case` désactivée et les longueurs en avertissement.** | Le format conventionnel décrit dans CONTRIBUTING.MD devient vérifiable automatiquement, sans rejeter la façon d'écrire en place (majuscule initiale, en-têtes longs).                      |
| 17/08/2026 | **Historique orphelin conservé sous le tag `archive/header-responsive-menu` plutôt qu'en branche.**               | La trace reste récupérable sans encombrer la liste des branches ni suggérer une fusion impossible.                                                                                         |

## 6. Points ouverts

- Hébergement cible (Vercel ou hébergeur imposé) — conditionne la Phase 5.
- Autonomie d'édition de la cliente : si elle est requise, prévoir un CMS après validation de la maquette.
- Données légales réelles (SIRET, Ordre des architectes, assurance, hébergeur) — à fournir par l'agence.
- Formulaire de contact : simple `mailto:` ou envoi applicatif.
- Photos et textes réels des projets ; les visuels actuels sont des images libres de droits de démonstration.
- Suppression des branches fusionnées restantes, en local et sur GitHub.
