#!/bin/bash

echo "Création des fichiers README.md explicatifs dans chaque dossier..."

declare -A descriptions

descriptions=(
  ["src/components"]="Composants UI réutilisables du projet."
  ["src/components/Common"]="Composants communs à plusieurs modules."
  ["src/components/Button"]="Composant bouton réutilisable avec styles et logique."
  ["src/components/Header"]="Composants pour l’en-tête et la navigation."
  ["src/pages"]="Pages du site web, point d’entrée de chaque route."
  ["src/layouts"]="Layouts partagés entre différentes pages."
  ["src/services"]="Logique métier et appels API en backend ou frontend."
  ["src/hooks"]="Hooks personnalisés React pour la logique réutilisable."
  ["src/contexts"]="Contexts React pour le state global."
  ["src/utils"]="Fonctions utilitaires générales."
  ["src/styles"]="Styles globaux, thèmes, variables CSS."
  ["src/assets/images"]="Images et illustrations utilisées dans le site."
  ["src/assets/fonts"]="Fonts personnalisées du projet."
  ["tests"]="Tests unitaires, d’intégration et fonctionnels."
  ["scripts"]="Scripts divers liés au build et maintenance."
  ["public"]="Fichiers statiques accessibles publiquement."
)

for dir in "${!descriptions[@]}"; do
  if [ -d "$dir" ]; then
    echo "# ${dir}" > "$dir/README.md"
    echo "${descriptions[$dir]}" >> "$dir/README.md"
    echo "Créé $dir/README.md"
  else
    echo "Dossier $dir inexistant, ignoré."
  fi
done

echo "Tous les fichiers README.md ont été créés."