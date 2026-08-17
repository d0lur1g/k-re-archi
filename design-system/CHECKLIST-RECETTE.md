# Checklist de recette K-Ré

> Généré le 17/08/2026. Snapshot source : `92699ee168a8b046e57ba09d9c2f69cb547481db` (main).
> Couverture : code 100 %, Figma en échantillon. Mode : outillé.
> Le site n'est pas déployé : les budgets de performance sont des cibles à mesurer au
> premier déploiement, la ligne de base réelle reste à établir.

## Accessibilité (WCAG 2.2, critères retenus)

Critères retenus au regard des non-conformités et risques mesurés dans l'audit ;
chaque point se vérifie sur les 5 vues (accueil, /projects, page projet, 404, erreur).

| Critère                      | Point de contrôle                                                                                                                                                   | État au snapshot                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 1.4.3 Contraste du texte     | Toute paire texte/fond à 4,5:1 minimum (3:1 grand texte). Paires mesurées : 7,37:1 à 21:1, conformes                                                                | Conforme                                 |
| 1.4.11 Contraste non textuel | Frontières de composants et icônes porteuses de sens à 3:1. Bordure du tooltip mesurée à 1,48:1                                                                     | **Non conforme** (fermé par O6/InfoCard) |
| 2.4.7 Focus visible          | Tout élément interactif montre son focus clavier. `outline: none` supprime celui du bouton menu                                                                     | **Non conforme** (fermé par D6, lot 0)   |
| 2.4.13 Apparence du focus    | Le style D6 (2px, currentColor, offset 2px) respecte l'aire et le contraste requis                                                                                  | À vérifier après lot 0                   |
| 2.1.1 Clavier                | Overlay des cartes projet révélé au focus, zones de scroll horizontal atteignables (tabIndex), menu mobile pilotable (Escape géré, focus trap manquant)             | Partiel                                  |
| 1.1.1 Contenus non textuels  | Alt descriptifs (celui de Gallery.tsx est générique), nom accessible du logo Ordre, flèches décoratives masquées                                                    | Partiel                                  |
| 1.3.1 Info et relations      | Hiérarchie h1/h2 sans saut (conforme au snapshot), nav distinguées par aria-label, tooltip relié par aria-describedby                                               | Partiel                                  |
| 4.1.2 Nom, rôle, valeur      | aria-expanded du menu (présent), role dialog du menu mobile (manquant), role status du chargement (manquant)                                                        | Partiel                                  |
| 2.5.8 Taille de cible        | Cibles de 24px minimum : bouton menu 90px, liens nav 180x90, liens footer 45px de haut : conformes                                                                  | Conforme                                 |
| Texte sur image              | Overlay des cartes : contraste indéterminé (dégradé 70 % vers transparent). Vérifier sur les photos réelles à l'injection du contenu, renforcer l'overlay si besoin | À mesurer                                |

## Performance (budget au 75e percentile mobile)

Format : seuil de référence Core Web Vitals / cible projet / écart justifié.

| Métrique     | Seuil de référence | Cible projet              | Justification de l'écart et leviers                                                                                                                                                                                                                                                               |
| ------------ | ------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LCP          | 2,5 s              | 2,0 s                     | Cible plus agressive, atteignable car : pages statiques générées (generateStaticParams), image hero en import statique avec priority, polices locales woff2 en display swap. Leviers restants : convertir les 28 JPG en AVIF/WebP via next/image (formats), dimensionner sizes sur le canvas 1080 |
| INP          | 200 ms             | 200 ms                    | Référence conservée : très peu de JavaScript client (menu, scroll molette, tooltip). Aucun levier supplémentaire requis                                                                                                                                                                           |
| CLS          | 0,1                | 0,05                      | Cible plus agressive, atteignable car : canvas fixe 1080x1080, dimensions d'images connues (imports statiques ou fill dans conteneurs dimensionnés), polices en swap avec fallback métrique à vérifier                                                                                            |
| Poids images | s.o.               | 200 Ko par image affichée | 18 JPG servis tels quels aujourd'hui dans public/images : passer par next/image, vérifier la qualité par défaut                                                                                                                                                                                   |

Mesure : Lighthouse en mobile émulé à chaque PR de lot, puis données terrain (CrUX ou
équivalent) après mise en ligne. Aucune mesure n'existe au snapshot : la première
mesure déployée devient la ligne de base.

## Responsive

| Plage          | Comportement attendu                                                        | Points de contrôle                                   |
| -------------- | --------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1080px et plus | Canvas fixe 1080x1080 centré sur fond inversé                               | Aucun débordement, footer à 45px                     |
| 1024 à 1080px  | Sous le canvas (max-canvas:) : largeurs fluides, nav desktop encore visible | Header 90px, baseline lisible                        |
| 900 à 1024px   | Menu burger (max-lg:), overlay dvh                                          | Bande sensible après O7 : centrage et menu cohérents |
| Moins de 900px | Layout en bloc (règle custom.css absorbée par lg après O7)                  | Vérifier après lot 4                                 |
| 375px (mobile) | Colonne unique, cibles tactiles 24px minimum                                | Menu, cartes, galeries scrollables au doigt          |

## Navigateurs

Chrome, Edge, Firefox, Safari : deux dernières versions majeures ; Safari iOS et
Chrome Android en mobile. Points sensibles relevés : unités dvh (menu mobile,
layout), scrollbar-hide (implémentations propriétaires), comportement wheel de
useHorizontalScroll (passif désactivé), object-cover sur les galeries.

## Rejouer les mesures

- Inventaire : `node design-system/audit/scan.mjs .` depuis la racine du dépôt.
- Contrastes et ΔE2000 : `node design-system/audit/diag.mjs`.
- Focus : `rg "focus:|focus-visible:" src` (au moins le style global D6 attendu après lot 0).
