#!/usr/bin/env node
/*
  Génère docs/STRUCTURE.md à partir des fichiers suivis par Git.

  Choix volontaires :
  - la source est `git ls-files`, donc node_modules, .next et tout fichier ignoré
    sont exclus par construction ;
  - aucun chemin absolu ni horodatage n'est écrit, pour que le fichier ne change
    que si l'arborescence change réellement ;
  - les dossiers ne contenant que des médias sont repliés en une ligne, sinon la
    vue d'architecture se noie dans les photos de projets.

  Usage : npm run structure
*/

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT = "docs/STRUCTURE.md";
const MEDIA_EXTENSIONS = new Set([
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
  ".woff",
  ".woff2",
]);

const trackedFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

/** Construit un arbre { dirs: Map, files: string[] } depuis une liste de chemins. */
function buildTree(paths) {
  const root = { dirs: new Map(), files: [] };

  for (const path of paths) {
    const segments = path.split("/");
    let node = root;

    for (const segment of segments.slice(0, -1)) {
      if (!node.dirs.has(segment)) {
        node.dirs.set(segment, { dirs: new Map(), files: [] });
      }
      node = node.dirs.get(segment);
    }

    node.files.push(segments[segments.length - 1]);
  }

  return root;
}

const isMedia = (name) => MEDIA_EXTENSIONS.has(name.slice(name.lastIndexOf(".")).toLowerCase());

const countFiles = (node) =>
  node.files.length + [...node.dirs.values()].reduce((total, dir) => total + countFiles(dir), 0);

// Seuls les dossiers feuilles sont repliés : replier un sous-arbre entier masquerait
// des conventions utiles, comme public/images/projects/<slug>/.
const holdsOnlyMedia = (node) =>
  node.dirs.size === 0 && node.files.length > 0 && node.files.every(isMedia);

function render(node, prefix = "") {
  const directories = [...node.dirs.entries()].sort(([a], [b]) => a.localeCompare(b, "fr"));
  const files = [...node.files].sort((a, b) => a.localeCompare(b, "fr"));

  const entries = [
    ...directories.map(([name, child]) => ({ name, child })),
    ...files.map((name) => ({ name, child: null })),
  ];

  return entries.flatMap((entry, index) => {
    const isLast = index === entries.length - 1;
    const branch = isLast ? "└── " : "├── ";

    if (!entry.child) {
      return [`${prefix}${branch}${entry.name}`];
    }

    if (holdsOnlyMedia(entry.child)) {
      const total = countFiles(entry.child);
      return [`${prefix}${branch}${entry.name}/ … ${total} fichier${total > 1 ? "s" : ""}`];
    }

    return [
      `${prefix}${branch}${entry.name}/`,
      ...render(entry.child, `${prefix}${isLast ? "    " : "│   "}`),
    ];
  });
}

const tree = ["k-re-archi/", ...render(buildTree(trackedFiles))].join("\n");

const document = `# Structure du projet

Vue d'ensemble de l'arborescence, limitée aux fichiers suivis par Git. Les dossiers ne contenant
que des médias sont repliés avec leur nombre de fichiers.

**Fichier généré — ne pas éditer à la main.** Le régénérer après tout ajout ou déplacement de
fichier :

\`\`\`bash
npm run structure
\`\`\`

Le rôle de chaque dossier est décrit dans [CLAUDE.md](../CLAUDE.md#architecture).

\`\`\`text
${tree}
\`\`\`
`;

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, document, "utf8");

console.log(`${OUTPUT} généré — ${trackedFiles.length} fichiers suivis.`);
