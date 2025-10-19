# CONTRIBUTING.md - Guide de contribution pour K-Ré - Architecture

Bienvenue dans le dépôt de K-Ré - Architecture ! Merci de votre intérêt à contribuer à ce projet. Ce guide a pour but de vous aider à contribuer de manière fluide, efficace et professionnelle.

## Notre philosophie

Chez K-Ré, nous valorisons un code propre, lisible et bien documenté. Chaque contribution, qu’elle soit une correction de bug, une amélioration ou une nouvelle fonctionnalité, doit respecter nos standards pour garantir la qualité et la cohérence du projet.

## Comment contribuer ?

### 1. Configurer votre environnement Git

- Cloner le dépôt
- Configurer votre identité Git :

  ```bash
  git config --global user.name "Votre Nom"
  git config --global user.email "votre.email@k-re-architecture.com"
  ```

### 2. Créez une branche dédiée

Créez une branche spécifique pour votre travail à partir de la branche principale stable `main` :

```bash
git checkout -b feature/nom-fonctionnalité
```

Pour corriger un bug, utilisez la convention :

```bash
git checkout -b fix/nom-correction
```

### 3. Commits clairs et atomiques

Faites des commits précis et focalisés sur un seul sujet. Utilisez le format suivant pour vos messages de commit :

[type] : bref résumé (max 50 caractères)

Description détaillée (optionnel) expliquant le contexte,
ce qui a été fait et les impacts éventuels.

Types recommandés :

- ***feat*** : nouvelle fonctionnalité
- ***fix*** : correction de bug
- ***docs*** : documentation
- ***style*** : mise en forme, sans impact fonctionnel
- ***refactor*** : refactorisation du code sans ajout ni correction de bug
- ***test*** : ajout/modification/correction de tests
- ***chore*** : tâches diverses (build, déploiement, outils, scripts, etc.)

```bash
git commit -m "feat: ajout du formulaire de contact avec validation"
```

### 4. Poussez votre branche et ouvrez une Pull Request (PR)

Poussez votre branche sur le dépôt distant :

```bash
git push origin feature/nom-fonctionnalité
```

Créez ensuite une Pull Request via la plateforme Git que nous utilisons (GitHub, GitLab, etc.). Utilisez ce modèle pour décrire la PR :

```bash

# Titre
[feat/fix/docs] - Description concise

# Description
Ce que cette PR accomplit et pourquoi elle est nécessaire.

# Instructions pour tester
Étapes claires pour valider les changements.

# Checklist avant revue
- [ ] Code fonctionnel et compilable
- [ ] Tests ajoutés ou mis à jour
- [ ] Respect des standards de code
- [ ] Validation fonctionnelle réalisée

# Liens pertinents
- Ticket ou issue associée (#numéro)
```

### 5. Revue et fusion

Une fois la PR soumise, elle sera revue par un collègue. Après approbation elle sera fusionnée dans `main`. N’oubliez pas de supprimer votre branche pour garder le dépôt propre.

### 6. Mettre à jour votre branche locale

Avant de commencer une nouvelle tâche, synchronisez la branche principale :

```bash
git checkout main
git pull origin main
```

## Fichiers ignorés

Un fichier `.gitignore` est configuré pour exclure les fichiers temporaires, locaux ou binaires inutiles au projet (ex : `.env`, dossiers `node_modules`, logs).

## Nettoyage des fichiers suivis dans Git

Lorsque le fichier .gitignore est mis à jour pour exclure de nouveaux fichiers ou dossiers, Git continue de suivre les fichiers déjà présents dans l’historique, même si ceux-ci devraient être ignorés désormais. Pour nettoyer efficacement le dépôt et enlever ces fichiers du suivi Git sans les supprimer localement, utilisez la commande suivante :

```bash
git rm -r --cached .
git add .
git commit -m "Nettoyage : retirer du suivi les fichiers désormais ignorés par .gitignore"
```

Cette procédure force Git à réévaluer tous les fichiers à partir de la nouvelle configuration .gitignore, en supprimant du suivi tous les fichiers qui doivent être ignorés. Il s’agit d’une étape importante pour maintenir un dépôt propre et éviter de versionner des fichiers temporaires, secrets ou générés automatiquement. Attention, cette opération modifie la liste des fichiers suivis, donc assurez-vous de bien communiquer avec votre équipe avant de l’exécuter.

## Conseils et bonnes pratiques

- Synchronisez-vous fréquemment avec la branche principale pour limiter les conflits.
- Evitez les gros commits non descriptifs.
- Soyez réactifs aux commentaires liés aux revues pour améliorer la qualité collective.
- Respectez les conventions de nommage et structuration de fichiers.
- N’hésitez pas à demander de l’aide ou des clarifications.

Nous vous remercions pour vos contributions qui font avancer K-Ré - Architecture !

***

Ce guide peut évoluer selon nos besoins, toute suggestion est la bienvenue.

***

Ceci est un guide clair, professionnel et accessible pour faciliter la collaboration Git chez K-Ré - Architecture, structuré pour garantir rigueur et simplicité dans l’usage quotidien.

[1](https://gist.github.com/PurpleBooth/b24679402957c63ec426)
[2](https://github.com/nayafia/contributing-template)
[3](https://github.com/mntnr/awesome-contributing)
[4](https://github.com/topics/contributing-template)
[5](https://contribute.cncf.io/maintainers/templates/contributing/)
[6](https://mozillascience.github.io/working-open-workshop/contributing/)
[7](https://www.reddit.com/r/opensource/comments/hx3nxh/i_created_a_contributingmd_generator_and_need/)
[8](https://contributing.md/example/)
[9](https://www.thegooddocsproject.dev/template/contributing-guide)
[10](https://gist.github.com/JulienRAVIA/1cc6589cbf880d380a5bb574baa38811)