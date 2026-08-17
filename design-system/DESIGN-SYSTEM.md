# Design system K-Ré : registre de décisions

> Généré le 17/08/2026. Snapshot source : `92699ee168a8b046e57ba09d9c2f69cb547481db` (main).
> Couverture : code 100 % (35/35 fichiers), Figma en échantillon (3 nœuds + métadonnées des 2 pages).
> Mode : outillé (extraction scriptée, calculs ΔE2000 et contrastes exécutés, voir `audit/`).

Ce fichier est le registre des décisions du design system et de leurs justifications.
Ce n'est pas un catalogue : l'inventaire des valeurs vit dans `tokens.css`, les
correspondances dans `MIGRATION.md`, les composants dans `COMPONENTS.md`.

## Décisions actées

### D1. Langue des tokens : anglais court, documentation en français

Les noms de tokens (`surface`, `ink`, `line`, `heading`) sont en anglais : ils composent
des classes Tailwind (`bg-surface`, `text-ink`) où l'anglais est l'idiome, et restent
courts. Toute la documentation, les commentaires et les messages de commit restent en
français, conformément aux conventions du dépôt.

### D2. Deux couches de tokens, un seul niveau d'alias

Couche primitive descriptive (`color.black`, `color.gray-700`, `font.family.amalfi`) et
couche sémantique par rôle d'usage (`surface`, `ink-muted`, `font.display`). Les
composants ne consomment que la couche sémantique. Un token sémantique ne contient
jamais de couleur littérale, de dimension ni de numéro d'échelle dans son nom : le jour
où le noir devient un gris chaud, seule la valeur du primitif change. C'est la décision
la moins réversible de la première passe : elle se propage dans tous les fichiers
consommateurs.

### D3. L'espacement reste en utilitaires numériques px

Le canvas fixe 1080 x 1080 avec `--spacing: 1px` est le contrat géométrique du site :
`px-12` se lit « 12 pixels » et l'arithmétique du module 45 (45, 90, 180, 270...) reste
lisible. Une couche sémantique d'espacement masquerait ce calcul pour un gain nul.
En contrepartie, l'échelle est contrainte par une liste blanche : **2, 5, 6, 10, 12,
15, 16, 24, 30, 32** (16 et 32 ajoutés le 18/08/2026 à la fermeture d'O1), plus les
valeurs de composition documentées (2.5 et 4 dans `src/lib/constants.ts`, 195 pour le
retrait du hero, 448 pour la largeur des textes des pages système, module 45 pour les
tailles). Toute autre valeur numérique est une erreur à corriger ou une composition à
documenter.

### D4. Échelle typographique en px explicite, échelle rem par défaut bannie

La dette majeure relevée vient de la cohabitation de deux modèles mentaux : l'échelle
canvas en px et les réflexes de l'échelle Tailwind par défaut en rem (`px-8 py-3`
rendus 8px/3px, icônes `h-6` rendues 6px). Pour la typographie, la parade est une
échelle projet en px nommée par rôle (`text-caption` 14px à `text-giant` 120px,
valeurs relevées, migration iso-visuelle) : les classes `text-sm`, `text-base`,
`text-xl`... ne doivent plus apparaître dans les composants. La même règle d'unité
vaut pour les breakpoints : le namespace `--breakpoint-*` est homogène en px
(Tailwind ordonne les variantes en comparant l'unité avant la valeur, mélanger px et
rem inverserait l'ordre des variantes min-width empilées), d'où la redéclaration de
`lg` à 1024px, iso-valeur avec son défaut 64rem.

### D5. custom.css passe sous cascade layer

`src/styles/custom.css` vit aujourd'hui hors de tout layer : ses règles d'éléments
(`a { color: inherit }`, `button { background: none }`) écrasent les utilitaires
Tailwind quelle que soit la spécificité, ce qui impose déjà 5 suffixes `!`. Décision :
le contenu passe dans `@layer base`, les utilitaires reprennent la main, les `!`
disparaissent. La règle invalide `font-family: var(--font-baiti), 600` (custom.css:19)
est supprimée à cette occasion, ainsi que le code mort (`.animate-fadeIn`) et la
redéfinition globale de `.overflow-x-auto`.

### D6. Un style de focus unique et visible

Aucun style de focus n'existe dans le code et `button { outline: none }` supprime
l'indicateur du seul bouton du site (non-conformité WCAG 2.4.7 mesurée). Décision :
suppression de `outline: none`, et un style projet unique posé en base :
`outline: 2px solid currentColor; outline-offset: 2px` sur `:focus-visible`.
`currentColor` garantit le contraste sur fond blanc comme sur fond inversé.
La valeur exacte est ajustable, l'existence du style ne l'est pas.

### D7. Mono-thème

Le site est une composition graphique en noir et blanc : pas de thème sombre, pas de
`prefers-color-scheme`. Les tokens `surface` / `surface-inverse` suffisent à décrire
les inversions locales (hovers, pages système).

### D8. Icônes en currentColor

Les icônes sociales héritent déjà de la couleur du texte (`fill="currentcolor"`), ce
qui permet leurs couleurs de survol. Les icônes menu et menu-close embarquent au
contraire fond blanc et traits noirs en dur : toute nouvelle icône doit être dessinée
en `currentColor`, sans fond intégré. La refonte des deux icônes menu est liée à la
décision ouverte O2 (taille de rendu).

### D9. Source de vérité des tokens : le bloc @theme unique

Arbitrage rendu par l'owner le 18/08/2026 : `tokens.css` (bloc `@theme` Tailwind v4)
est l'unique source de vérité ; le fichier DTCG parallèle `tokens.json` a été supprimé.
Motif : le fichier consommé par le build ne peut pas diverger de lui-même, et aucun
outil de la chaîne DTCG n'était branché pour justifier la double maintenance. La
provenance des valeurs (relevés, contrastes mesurés, correspondance des variables
Figma) vit en commentaires de `tokens.css`. Si un outillage DTCG ou une synchro Figma
Variables devient nécessaire, un `tokens.json` sera régénéré depuis le CSS à ce
moment-là (voir GOVERNANCE.md).

### D10. Les compositions typographiques restent hors système

Les interlignages de composition du header et du hero (30 %, 70 %, 202 %) et le
retrait `px-195` sont des réglages d'œuvre graphique, pas des tokens réutilisables.
Ils restent en valeurs arbitraires localisées, documentés, et seront revalidés
face à la maquette (écarts relevés : Figma utilise 0.5, 0.7 et 64 %).

## Décisions ouvertes (avec déclencheur de fermeture)

| Id  | Sujet                                                                                                                                                                        | Options en présence                                                             | Déclencheur de fermeture                                                                                                                                                                                                                                                                                                                                                                                 |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O1  | Espacements des pages système (`px-8 py-3` rendus 8/3px, `mb-8` 8px, `p-4` 4px...)                                                                                           | Conversion x4 (intention probable) ou maquette dédiée                           | **Fermée le 18/08/2026** : conversion x4 validée par l'owner et appliquée au lot 3                                                                                                                                                                                                                                                                                                                       |
| O2  | Icônes menu rendues 6x6px dans un bouton de 90px                                                                                                                             | Plein bouton (~90px, cohérent avec le dessin SVG 88-90) ou taille intermédiaire | **Fermée le 18/08/2026** : rendu plein bouton appliqué au lot 3, vérifié sous 1024px                                                                                                                                                                                                                                                                                                                     |
| O3  | Tailles du logo et de la baseline header (code 48/60/36px, Figma 50/60/35px, leadings divergents)                                                                            | Aligner sur Figma ou entériner le code                                          | Revalidation du header en maquette (nœuds I140:599, 148:461)                                                                                                                                                                                                                                                                                                                                             |
| O4  | Texte de lecture projet : 18px code contre 20px Figma (175:832)                                                                                                              | Aligner sur Figma                                                               | Validation de la page projet en maquette                                                                                                                                                                                                                                                                                                                                                                 |
| O5  | Footer : 15px et © Amalfi 20px en Figma, 16px hérité dans le code ; icônes 34px code contre 36px Figma                                                                      | Aligner sur Figma                                                               | Validation du footer en maquette                                                                                                                                                                                                                                                                                                                                                                         |
| O6  | Bordure et rayon du tooltip (`line-muted` 1,48:1 non conforme 1.4.11, rounded-lg 8px hors système)                                                                           | Remplacer par le composant InfoCard de la maquette (34:417)                     | **Fermée le 18/08/2026** : l'info_card de la maquette s'est révélée être une annotation interne du fichier Figma (couleurs #279fd2/#d8594d, polices Inconsolata/Imprima étrangères à l'identité), pas un composant produit. Tooltip corrigé dans le système au lot 5 : bordure line (21:1), rounded-ui, padding 12, accès clavier (focus + Escape, role tooltip) ; token line-muted retiré faute d'usage |
| O7  | Breakpoint 899px absorbé par lg (1024px)                                                                                                                                     | Absorption (recommandée : la bascule menu est déjà à 1024)                      | **Fermée le 18/08/2026** : absorption validée et appliquée au lot 4, bande 900-1024 contrôlée                                                                                                                                                                                                                                                                                                            |
| O8  | État « page courante » de la navigation                                                                                                                                      | Implémenter les variantes \*-active de Figma (85:760) via aria-current          | Décision produit sur la nav (routes /missions et /contact encore vides)                                                                                                                                                                                                                                                                                                                                  |
| O9  | Micro-espacement 2px contre module 5px Figma (nav projet, galerie)                                                                                                           | Aligner sur 5 ou conserver 2                                                    | Validation de la page projet en maquette                                                                                                                                                                                                                                                                                                                                                                 |
| O10 | `pr-24` contre 22.5px Figma (description projet)                                                                                                                             | Aligner ou entériner                                                            | Validation de la page projet en maquette                                                                                                                                                                                                                                                                                                                                                                 |
| O11 | Composition de ProjectNavigation : le code rend deux liens pleine largeur avec flèches texte, la maquette deux boutons 180x45 centrés avec flèches image 24px (nœud 175:959) | Aligner sur la maquette ou entériner le code                                    | Validation de la page projet en maquette                                                                                                                                                                                                                                                                                                                                                                 |

Chaque décision ouverte a un déclencheur concret : aucun report sans condition.

## Do / Don't

**Do**

- Consommer uniquement les tokens sémantiques : `bg-surface`, `text-ink`, `border-line`, `font-body`, `text-nav`.
- Écrire les espacements en px de la liste blanche ; documenter toute valeur de composition.
- Donner un état `focus-visible` et un état vide à tout nouveau composant interactif ou piloté par données.
- Dessiner toute nouvelle icône en `currentColor`, sans fond intégré.
- Modifier `tokens.css` (source unique) avec la ligne de correspondance MIGRATION.md à jour, dans le même commit.

**Don't**

- Ne jamais utiliser `text-sm`, `text-base`, `text-xl`, `max-w-md`, `rounded-sm`... : tout utilitaire dont la valeur vient de l'échelle rem par défaut est interdit (source de la dette n° 1). `leading-none`, doublon natif de `leading-flush`, est interdit au même titre.
- Ne jamais écrire `bg-black`, `text-white`, `bg-kre-black` ni un hex dans un composant : passer par la couche sémantique.
- Ne pas ajouter de `!` pour contrer custom.css : si un `!` semble nécessaire, c'est la cascade qu'il faut corriger (D5).
- Ne pas introduire de nouvelle valeur d'espacement, de taille de texte ou de couleur sans passer par la règle d'ajout de GOVERNANCE.md.
- Ne pas poser de classes flex (`gap-*`, `items-*`, `justify-*`) sur un élément qui n'est pas flex ou grid : trois occurrences inertes relevées dans Hero.tsx.
