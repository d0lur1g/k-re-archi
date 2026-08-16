/*
  Contrôle du format des messages de commit, appliqué par le hook .husky/commit-msg.

  La base conventionnelle est conservée pour le type et la portée — feat, fix, docs,
  style, refactor, test, chore, entre autres — car c'est ce que décrit CONTRIBUTING.MD.
  Deux règles sont assouplies pour ne pas contrarier l'usage en place :
  - subject-case est désactivée, la majuscule initiale étant naturelle en français ;
  - les limites de longueur passent en avertissement, ce qui signale les messages
    trop longs sans jamais bloquer un commit.
*/
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "header-max-length": [1, "always", 120],
    "body-max-line-length": [1, "always", 100],
  },
};
