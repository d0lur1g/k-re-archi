# Gouvernance du design system K-Ré

> Généré le 17/08/2026. Snapshot source : `92699ee168a8b046e57ba09d9c2f69cb547481db` (main).
> Couverture : code 100 %, Figma en échantillon. Mode : outillé.

## Rôles

| Rôle                                                         | Titulaire                                                       |
| ------------------------------------------------------------ | --------------------------------------------------------------- |
| Owner du design system (code, tokens, arbitrages techniques) | Ludovic Girard                                                  |
| Décisionnaire design (maquettes Figma, valeurs visuelles)    | Delphine DanielczyK, via le fichier Figma « K-Ré - Archi »      |
| Actions GitHub (push, PR, merge)                             | Ludovic Girard (aucun outillage GitHub automatisé sur ce poste) |

## Règle d'ajout d'un token

Un token entre dans le système si, et seulement si :

1. Sa valeur est **relevée** dans une maquette validée ou déjà présente dans le code
   avec un rôle identifiable ; aucune valeur inventée.
2. Le besoin est **récurrent** (2 usages ou plus) ou structurant (contrat du canvas).
   Un réglage unique est une valeur de composition : documentée dans MIGRATION.md,
   pas tokenisée.
3. Le nom sémantique décrit un **rôle d'usage**, jamais une couleur, une dimension ni
   un numéro d'échelle (voir D2, DESIGN-SYSTEM.md).
4. L'ajout se fait dans **tokens.css** (source de vérité unique), avec la ligne de
   correspondance ajoutée à MIGRATION.md et, si le token remplace des valeurs
   existantes, leurs occurrences migrées ou listées.

Suppression ou changement de valeur : même circuit, plus une vérification visuelle des
vues listées dans MIGRATION.md et une mise à jour de la ligne de base.

## Règle d'ajout d'un composant

Un composant entre dans COMPONENTS.md si :

1. Il existe dans la page Design System de Figma (71:248) ou répond à un besoin présent
   dans 2 vues ou plus.
2. Il consomme exclusivement la couche sémantique des tokens.
3. Il livre au minimum les états : default, hover (si interactif), focus-visible (si
   interactif, style D6), vide (si piloté par données). Tout état non applicable est
   justifié en une ligne dans sa fiche.
4. Sa fiche COMPONENTS.md (anatomie, variantes, états, statut, mapping contenu) fait
   partie de la PR.

## Outillage des tokens : arbitrage rendu

**Décision de l'owner du 18/08/2026 : méthode unique, le bloc `@theme` de
`tokens.css` est la seule source de vérité.** Motif : c'est le fichier que le build
consomme réellement, une divergence y est impossible par construction, et aucun outil
de la chaîne DTCG n'est branché ; maintenir un `tokens.json` parallèle sans script de
contrôle créait un risque de divergence silencieuse. Le fichier `tokens.json` a été
supprimé ; sa provenance (relevés, contrastes, correspondance Figma) est repliée dans
les commentaires de `tokens.css` et dans MIGRATION.md.

Si un outillage DTCG (Style Dictionary ou équivalent) ou une synchronisation Figma
Variables devient nécessaire, régénérer un `tokens.json` depuis `tokens.css` fera
partie de ce chantier-là. Relevé Figma du 18/08/2026 pour mémoire : 2 variables
définies, `Primary` #000000 et `Secondary` #ffffff (page Design System, nœud 67:379),
nommage à aligner sur les rôles d'usage en revue design.

## Canal de contact et traçabilité

- Toute évolution passe par une branche dédiée (`feature/`, `fix/`, `chore/`) et une
  PR vers `main` sur `d0lur1g/k-re-archi`, en commits conventionnels rédigés en
  français (voir CONTRIBUTING.MD).
- Les décisions de design system se tracent dans DESIGN-SYSTEM.md (registre D*, O*) ;
  une décision ouverte ne se ferme que par son déclencheur, acté dans la PR qui la
  ferme.
- Les échanges design passent par les commentaires du fichier Figma « K-Ré - Archi ».
