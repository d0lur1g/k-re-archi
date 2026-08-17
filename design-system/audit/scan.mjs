// scan.mjs : extraction brute du design system k-re-archi
// Usage : node scan.mjs <repoRoot>  (sortie JSON sur stdout)
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.argv[2] || process.cwd();
const ELIGIBLE_EXT = /\.(css|scss|sass|less|js|jsx|ts|tsx|vue|svelte|astro|html|mjs)$/;

const allTracked = execSync("git ls-files", { cwd: ROOT, encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean);
const files = allTracked.filter(
  (f) => ELIGIBLE_EXT.test(f) && !f.includes("node_modules") && !/\.min\./.test(f),
);
const svgFiles = allTracked.filter((f) => f.endsWith(".svg"));

function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

function scanRegex(content, file, regex, out) {
  let m;
  const re = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : regex.flags + "g");
  while ((m = re.exec(content)) !== null) {
    out.push({ match: m[0].trim(), file, line: lineOf(content, m.index) });
  }
}

const cssScans = {
  hex: /#[0-9a-fA-F]{3,8}\b/g,
  funcColors: /(?:rgba?|hsla?|oklch|oklab|color-mix)\([^)]*\)/g,
  typography: /(?:font-family|font-size|font-weight|line-height|letter-spacing)\s*:[^;}]+/g,
  spacing: /(?:margin|padding|gap|row-gap|column-gap)[a-z-]*\s*:[^;}]+/g,
  borders: /(?:border-radius|border-width|box-shadow|opacity|z-index)\s*:[^;}]+/g,
  media: /@media[^{]+/g,
  animation: /(?:transition|animation|transition-duration|transition-timing-function)\s*:[^;}]+/g,
  varUsage: /var\(--[a-zA-Z0-9-]+/g,
  hexDecl: /:\s*#[0-9a-fA-F]{3,8}\b/g,
  arbitraryBrackets: /\[[^\]\s]+\]/g,
};

const cssResults = {};
for (const k of Object.keys(cssScans)) cssResults[k] = [];

const fileContents = {};
for (const f of files) {
  const content = readFileSync(join(ROOT, f), "utf8");
  fileContents[f] = content;
  for (const [k, re] of Object.entries(cssScans)) {
    if (k === "arbitraryBrackets" && !/\.(tsx|jsx|html|vue|svelte|astro)$/.test(f)) continue;
    scanRegex(content, f, re, cssResults[k]);
  }
}

// ---- Extraction des classes Tailwind depuis les littéraux de chaîne ----
const VARIANT = /^(hover|focus|focus-visible|active|disabled|group-hover|group-focus|max-2xl|max-lg|max-md|max-sm|max-xl|2xl|xl|lg|md|sm|dark|first|last|odd|even)$/;

const CATEGORIES = [
  ["fontFamily", /^font-(amalfi|baiti)!?$/],
  ["fontWeight", /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)!?$/],
  ["fontSize", /^text-(xs|sm|base|lg|xl|[2-9]xl)!?$/],
  ["fontSizeArbitrary", /^text-\[\d+(?:\.\d+)?(px|rem|em)\]!?$/],
  ["textAlign", /^text-(left|center|right|justify)!?$/],
  ["textColor", /^text-(black|white|kre-black|kre-white|transparent|current|inherit|neutral-\d{2,3})(\/\d{1,3})?!?$/],
  ["bgColor", /^bg-(black|white|kre-black|kre-white|transparent|neutral-\d{2,3})(\/\d{1,3})?!?$/],
  ["gradient", /^(bg-linear-to-(t|b|l|r|tl|tr|bl|br)|from-[a-z0-9/-]+|via-[a-z0-9/-]+|to-[a-z0-9/-]+)!?$/],
  ["borderColor", /^border-(black|white|kre-black|kre-white|neutral-\d{2,3})!?$/],
  ["borderWidth", /^border(-[trblxye])?(-\d+)?!?$/],
  ["borderStyle", /^border-(solid|dashed|dotted|none)!?$/],
  ["radius", /^rounded(-(xs|sm|md|lg|xl|2xl|3xl|full|none))?!?$/],
  ["shadow", /^shadow(-(2xs|xs|sm|md|lg|xl|2xl|none))?!?$/],
  ["opacity", /^opacity-\d{1,3}!?$/],
  ["leading", /^leading-(none|tight|snug|normal|relaxed|loose|\d+|\[[^\]]+\])!?$/],
  ["tracking", /^tracking-[a-z-]+!?$/],
  ["spacing", /^-?(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?|auto|\[[^\]]+\])!?$/],
  ["inset", /^-?(top|right|bottom|left|inset|inset-x|inset-y)-(\d+(?:\.\d+)?|auto|full|\[[^\]]+\])!?$/],
  ["translate", /^-?translate-(x|y)-(\d+(?:\.\d+)?|\[[^\]]+\])!?$/],
  ["sizing", /^(w|h|min-w|max-w|min-h|max-h|size)-(\d+(?:\.\d+)?|full|auto|screen|min|max|fit|px|md|\[[^\]]+\])!?$/],
  ["zIndex", /^-?z-(\d+|auto)!?$/],
  ["transition", /^(transition(-[a-z]+)?|duration-\d+|ease-[a-z-]+|delay-\d+)!?$/],
  ["animation", /^animate-[a-zA-Z-]+!?$/],
  ["filters", /^(grayscale|invert|blur|brightness|contrast|saturate|sepia)(-\d+)?!?$/],
];

const LAYOUT_PREFIX = /^(flex|grid|items|justify|content|self|place|block|hidden|inline|inline-block|absolute|relative|fixed|sticky|static|overflow|object|shrink|grow|basis|order|col|row|sr-only|not-sr-only|line-clamp|whitespace|break|select|cursor|pointer-events|list|underline|no-underline|uppercase|lowercase|capitalize|normal-case|truncate|scroll|snap|touch|will-change|isolate|container|aspect|group|peer|scrollbar-hide|social-link|social-[a-z]+|antialiased|visible|invisible|collapse)/;

function splitVariants(token) {
  const parts = [];
  let depth = 0;
  let cur = "";
  for (const ch of token) {
    if (ch === "[") depth++;
    if (ch === "]") depth--;
    if (ch === ":" && depth === 0) {
      parts.push(cur);
      cur = "";
    } else cur += ch;
  }
  parts.push(cur);
  return { variants: parts.slice(0, -1), base: parts[parts.length - 1] };
}

const twTokens = {}; // category -> token(full, avec variantes) -> [{file,line}]
const variantCount = {}; // variant -> count
const unrecognized = {};

function recordToken(rawToken, file, line) {
  if (!rawToken || rawToken.length < 2) return;
  const { variants, base } = splitVariants(rawToken);
  for (const v of variants) {
    if (!VARIANT.test(v)) return; // pas une classe tailwind (ex: URL, texte)
  }
  let matchedCat = null;
  for (const [cat, re] of CATEGORIES) {
    if (re.test(base)) {
      matchedCat = cat;
      break;
    }
  }
  if (!matchedCat) {
    if (LAYOUT_PREFIX.test(base)) matchedCat = "layoutDivers";
    else if (/^(leading|text|bg|border|w|h|p|m|gap)-\[/.test(base)) matchedCat = "arbitraryAutre";
    else {
      if (variants.length > 0) {
        unrecognized[rawToken] = (unrecognized[rawToken] || 0) + 1;
      }
      return;
    }
  }
  for (const v of variants) variantCount[v] = (variantCount[v] || 0) + 1;
  twTokens[matchedCat] = twTokens[matchedCat] || {};
  twTokens[matchedCat][rawToken] = twTokens[matchedCat][rawToken] || [];
  twTokens[matchedCat][rawToken].push({ file, line });
}

for (const f of files) {
  if (!/\.(tsx|jsx|ts|html|vue|svelte|astro)$/.test(f)) continue;
  const content = fileContents[f];
  // 1. littéraux de gabarit, expressions ${...} neutralisées
  const templates = [];
  let cleaned = content.replace(/`([^`]*)`/gs, (m0, inner, offset) => {
    const innerClean = inner.replace(/\$\{[^}]*\}/g, " ");
    templates.push({ text: innerClean, offset });
    return " ".repeat(m0.length);
  });
  for (const t of templates) {
    const line = lineOf(content, t.offset);
    for (const tok of t.text.split(/\s+/)) recordToken(tok.trim(), f, line);
  }
  // 2. chaînes simples et doubles restantes
  let m;
  const strRe = /(["'])((?:\\.|(?!\1).)*)\1/g;
  while ((m = strRe.exec(cleaned)) !== null) {
    const line = lineOf(content, m.index);
    for (const tok of m[2].split(/\s+/)) recordToken(tok.trim(), f, line);
  }
}

// ---- SVG : couleurs des icônes ----
const svgColors = [];
for (const f of svgFiles) {
  const content = readFileSync(join(ROOT, f), "utf8");
  scanRegex(content, f, /(?:fill|stroke|stop-color|style)="[^"]*"/g, svgColors);
}

// ---- Thème Tailwind par défaut (traçabilité des équivalences) ----
let twTheme = null;
const themePath = join(ROOT, "node_modules", "tailwindcss", "theme.css");
if (existsSync(themePath)) {
  const theme = readFileSync(themePath, "utf8");
  const wanted = [
    "--color-neutral-100",
    "--color-neutral-200",
    "--color-neutral-300",
    "--color-neutral-700",
    "--color-black",
    "--color-white",
    "--text-xs",
    "--text-sm",
    "--text-base",
    "--text-lg",
    "--text-xl",
    "--text-2xl",
    "--text-3xl",
    "--text-4xl",
    "--text-5xl",
    "--text-6xl",
    "--container-md",
    "--radius-sm",
    "--radius-lg",
    "--shadow-lg",
    "--ease-in",
    "--ease-in-out",
  ];
  twTheme = {};
  for (const w of wanted) {
    const re = new RegExp(w.replace(/[-]/g, "\\-") + "\\s*:\\s*([^;]+);");
    const mm = theme.match(re);
    if (mm) twTheme[w] = mm[1].trim();
  }
}

// ---- Agrégation : compteur par valeur ----
function aggregate(list) {
  const agg = {};
  for (const { match, file, line } of list) {
    const key = match.toLowerCase();
    agg[key] = agg[key] || { count: 0, locations: [] };
    agg[key].count++;
    agg[key].locations.push(`${file}:${line}`);
  }
  return agg;
}

const perFileVar = {};
const perFileHexDecl = {};
for (const { file } of cssResults.varUsage) perFileVar[file] = (perFileVar[file] || 0) + 1;
for (const { file } of cssResults.hexDecl) perFileHexDecl[file] = (perFileHexDecl[file] || 0) + 1;

const out = {
  meta: {
    snapshot: execSync("git rev-parse HEAD", { cwd: ROOT, encoding: "utf8" }).trim(),
    date: "2026-08-17",
    filesEligible: files.length,
    filesScanned: files.length,
    svgFilesScanned: svgFiles.length,
    files,
  },
  cssDeclarations: {
    hex: aggregate(cssResults.hex),
    funcColors: aggregate(cssResults.funcColors),
    typography: aggregate(cssResults.typography),
    spacing: aggregate(cssResults.spacing),
    borders: aggregate(cssResults.borders),
    media: aggregate(cssResults.media),
    animation: aggregate(cssResults.animation),
  },
  tokenization: {
    varUsageTotal: cssResults.varUsage.length,
    varUsagePerFile: perFileVar,
    hexDeclTotal: cssResults.hexDecl.length,
    hexDeclPerFile: perFileHexDecl,
    varUsageDetail: aggregate(cssResults.varUsage),
  },
  arbitraryBrackets: aggregate(cssResults.arbitraryBrackets),
  tailwind: Object.fromEntries(
    Object.entries(twTokens).map(([cat, tokens]) => [
      cat,
      Object.fromEntries(
        Object.entries(tokens).map(([tok, locs]) => [
          tok,
          { count: locs.length, locations: locs.map((l) => `${l.file}:${l.line}`) },
        ]),
      ),
    ]),
  ),
  variants: variantCount,
  unrecognized,
  svgColors: aggregate(svgColors),
  tailwindDefaultTheme: twTheme,
};

console.log(JSON.stringify(out, null, 1));
