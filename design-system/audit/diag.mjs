// diag.mjs : Delta E2000 + contrastes WCAG sur les couleurs relevees en phase 1
// Toutes les valeurs proviennent de scan-output.json et du theme Tailwind v4.

// --- oklch (achromatique) -> sRGB ---
function oklchGrayToHex(L) {
  // chroma 0 : l_ = m_ = s_ = L ; lineaire = L^3
  const lin = Math.pow(L, 3);
  const srgb = lin <= 0.0031308 ? 12.92 * lin : 1.055 * Math.pow(lin, 1 / 2.4) - 0.055;
  const v = Math.round(srgb * 255);
  return "#" + [v, v, v].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

// --- sRGB -> Lab (D65) ---
function rgbToLab([r, g, b]) {
  const f = (v) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const [R, G, B] = [f(r), f(g), f(b)];
  let X = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047;
  let Y = R * 0.2126729 + G * 0.7151522 + B * 0.072175;
  let Z = (R * 0.0193339 + G * 0.119192 + B * 0.9503041) / 1.08883;
  const g2 = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [g2(X), g2(Y), g2(Z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

// --- CIEDE2000 ---
function deltaE2000(lab1, lab2) {
  const [L1, a1, b1] = lab1,
    [L2, a2, b2] = lab2;
  const rad = Math.PI / 180,
    deg = 180 / Math.PI;
  const C1 = Math.hypot(a1, b1),
    C2 = Math.hypot(a2, b2);
  const Cbar = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Math.pow(Cbar, 7) / (Math.pow(Cbar, 7) + Math.pow(25, 7))));
  const a1p = a1 * (1 + G),
    a2p = a2 * (1 + G);
  const C1p = Math.hypot(a1p, b1),
    C2p = Math.hypot(a2p, b2);
  const h1p = C1p === 0 ? 0 : (Math.atan2(b1, a1p) * deg + 360) % 360;
  const h2p = C2p === 0 ? 0 : (Math.atan2(b2, a2p) * deg + 360) % 360;
  const dLp = L2 - L1,
    dCp = C2p - C1p;
  let dhp = 0;
  if (C1p * C2p !== 0) {
    dhp = h2p - h1p;
    if (dhp > 180) dhp -= 360;
    else if (dhp < -180) dhp += 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * rad);
  const Lbarp = (L1 + L2) / 2,
    Cbarp = (C1p + C2p) / 2;
  let hbarp = h1p + h2p;
  if (C1p * C2p !== 0) {
    if (Math.abs(h1p - h2p) > 180)
      hbarp = h1p + h2p < 360 ? (h1p + h2p + 360) / 2 : (h1p + h2p - 360) / 2;
    else hbarp = (h1p + h2p) / 2;
  }
  const T =
    1 -
    0.17 * Math.cos((hbarp - 30) * rad) +
    0.24 * Math.cos(2 * hbarp * rad) +
    0.32 * Math.cos((3 * hbarp + 6) * rad) -
    0.2 * Math.cos((4 * hbarp - 63) * rad);
  const dTheta = 30 * Math.exp(-Math.pow((hbarp - 275) / 25, 2));
  const RC = 2 * Math.sqrt(Math.pow(Cbarp, 7) / (Math.pow(Cbarp, 7) + Math.pow(25, 7)));
  const SL = 1 + (0.015 * Math.pow(Lbarp - 50, 2)) / Math.sqrt(20 + Math.pow(Lbarp - 50, 2));
  const SC = 1 + 0.045 * Cbarp;
  const SH = 1 + 0.015 * Cbarp * T;
  const RT = -Math.sin(2 * dTheta * rad) * RC;
  return Math.sqrt(
    Math.pow(dLp / SL, 2) +
      Math.pow(dCp / SC, 2) +
      Math.pow(dHp / SH, 2) +
      RT * (dCp / SC) * (dHp / SH)
  );
}

// --- Contraste WCAG ---
function luminance([r, g, b]) {
  const f = (v) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const [R, G, B] = [f(r), f(g), f(b)];
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function contrast(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1)),
    l2 = luminance(hexToRgb(hex2));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function blend(fgHex, alpha, bgHex) {
  const f = hexToRgb(fgHex),
    b = hexToRgb(bgHex);
  const m = f.map((v, i) => Math.round(v * alpha + b[i] * (1 - alpha)));
  return "#" + m.map((x) => x.toString(16).padStart(2, "0")).join("");
}

// --- Conversion des neutres Tailwind v4 (oklch releve dans node_modules/tailwindcss/theme.css) ---
console.log("== CONVERSIONS OKLCH -> HEX (Tailwind v4 theme.css) ==");
const neutrals = {
  "neutral-100": 0.97,
  "neutral-200": 0.922,
  "neutral-300": 0.87,
  "neutral-700": 0.371,
};
const hexOf = {};
for (const [name, L] of Object.entries(neutrals)) {
  hexOf[name] = oklchGrayToHex(L);
  console.log(name, "oklch(" + L * 100 + "% 0 0) ->", hexOf[name]);
}

// --- Palette unique relevee (phase 1) ---
const palette = [
  ["noir", "#000000"],
  ["blanc", "#ffffff"],
  ["facebook", "#1877f2"],
  ["instagram", "#e4405f"],
  ["pinterest", "#e60023"],
  ["linkedin", "#0a66c2"],
  ["neutral-100", hexOf["neutral-100"]],
  ["neutral-200", hexOf["neutral-200"]],
  ["neutral-300", hexOf["neutral-300"]],
  ["neutral-700", hexOf["neutral-700"]],
];

console.log("\n== DELTA E2000 (paires < 10 seulement) ==");
for (let i = 0; i < palette.length; i++) {
  for (let k = i + 1; k < palette.length; k++) {
    const dE = deltaE2000(rgbToLab(hexToRgb(palette[i][1])), rgbToLab(hexToRgb(palette[k][1])));
    if (dE < 10) console.log(palette[i][0], "vs", palette[k][0], "=", dE.toFixed(2));
  }
}

console.log("\n== CONTRASTES WCAG 2.2 (paires observees) ==");
const pairs = [
  ["texte noir / fond blanc (site entier)", "#000000", "#ffffff"],
  ["texte blanc / fond noir (hovers, pages erreur)", "#ffffff", "#000000"],
  [
    "texte neutral-700 / fond blanc (tooltip ProjectHeader.tsx:37)",
    hexOf["neutral-700"],
    "#ffffff",
  ],
  [
    "texte blanc opacity-60 / fond noir (error.tsx:21)",
    blend("#ffffff", 0.6, "#000000"),
    "#000000",
  ],
  [
    "texte blanc opacity-80 / fond noir (not-found.tsx:8, global-error.tsx:15)",
    blend("#ffffff", 0.8, "#000000"),
    "#000000",
  ],
  [
    "texte noir opacity-90 / fond blanc (hover boutons erreur)",
    blend("#000000", 0.9, "#ffffff"),
    "#ffffff",
  ],
  ["bordure noire / fond blanc (non textuel)", "#000000", "#ffffff"],
  ["icone facebook hover / fond blanc (non textuel)", "#1877f2", "#ffffff"],
  ["icone instagram hover / fond blanc (non textuel)", "#e4405f", "#ffffff"],
  ["icone pinterest hover / fond blanc (non textuel)", "#e60023", "#ffffff"],
  ["icone linkedin hover / fond blanc (non textuel)", "#0a66c2", "#ffffff"],
  ["bordure neutral-300 / fond blanc (tooltip, non textuel)", hexOf["neutral-300"], "#ffffff"],
];
for (const [label, fg, bg] of pairs) {
  console.log(contrast(fg, bg).toFixed(2) + ":1", "|", label, "|", fg, "sur", bg);
}
