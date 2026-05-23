import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const blogDir = path.resolve('public/blog');

const images = [
  { slug: 'hotcook-carrot-recipes', scene: 'carrot', bg: '#fff7ed', primary: '#f97316', secondary: '#16a34a' },
  { slug: 'hotcook-egg-recipes', scene: 'egg', bg: '#fefce8', primary: '#facc15', secondary: '#0ea5e9' },
  { slug: 'hotcook-eggplant-recipes', scene: 'eggplant', bg: '#faf5ff', primary: '#7c3aed', secondary: '#22c55e' },
  { slug: 'hotcook-broccoli-recipes', scene: 'broccoli', bg: '#f0fdf4', primary: '#16a34a', secondary: '#0284c7' },
  { slug: 'hotcook-tuna-can-recipes', scene: 'tuna', bg: '#f8fafc', primary: '#64748b', secondary: '#f97316' },
  { slug: 'tofu-ground-meat-meal', scene: 'tofu-ground', bg: '#f0fdfa', primary: '#14b8a6', secondary: '#a16207' },
  { slug: 'chicken-breast-broccoli-meal', scene: 'chicken-broccoli', bg: '#f0fdf4', primary: '#22c55e', secondary: '#f59e0b' },
  { slug: 'salmon-mushroom-meal', scene: 'salmon-mushroom', bg: '#fff1f2', primary: '#fb7185', secondary: '#92400e' },
  { slug: 'mackerel-can-daikon-meal', scene: 'mackerel-daikon', bg: '#f0f9ff', primary: '#0ea5e9', secondary: '#64748b' },
  { slug: 'tomato-can-frozen-vegetables-meal', scene: 'tomato-frozen', bg: '#fef2f2', primary: '#ef4444', secondary: '#16a34a' },
  { slug: 'dinner-no-idea-fridge', scene: 'open-fridge', bg: '#eff6ff', primary: '#2563eb', secondary: '#f59e0b' },
  { slug: 'use-ingredients-order', scene: 'ingredient-order', bg: '#ecfdf5', primary: '#059669', secondary: '#f97316' },
  { slug: 'dinner-without-side-dishes', scene: 'one-plate', bg: '#fdf2f8', primary: '#db2777', secondary: '#14b8a6' },
  { slug: 'frozen-rice-dinner', scene: 'frozen-rice', bg: '#faf5ff', primary: '#7c3aed', secondary: '#38bdf8' },
  { slug: 'shopping-list-from-fridge', scene: 'shopping-list', bg: '#fff7ed', primary: '#ea580c', secondary: '#16a34a' },
];

const carrot = (x, y, s = 1) => `
  <path d="M${x} ${y + 130 * s}c${90 * s}-${40 * s} ${130 * s}-${118 * s} ${118 * s}-${210 * s}c-${88 * s} ${22 * s}-${150 * s} ${86 * s}-${118 * s} ${210 * s}z" fill="#f97316"/>
  <path d="M${x + 20 * s} ${y + 118 * s}c${42 * s}-${42 * s} ${68 * s}-${92 * s} ${82 * s}-${150 * s}" fill="none" stroke="#fed7aa" stroke-width="${16 * s}" stroke-linecap="round"/>
  <path d="M${x + 98 * s} ${y - 88 * s}c${42 * s} ${6 * s} ${76 * s}-${12 * s} ${104 * s}-${50 * s}c-${52 * s}-${14 * s}-${86 * s} ${0}-${104 * s} ${50 * s}z" fill="#16a34a"/>
  <path d="M${x + 80 * s} ${y - 76 * s}c-${18 * s}-${44 * s}-${52 * s}-${68 * s}-${102 * s}-${72 * s}c${18 * s} ${48 * s} ${52 * s} ${72 * s} ${102 * s} ${72 * s}z" fill="#22c55e"/>`;

const egg = (x, y, s = 1) => `
  <ellipse cx="${x}" cy="${y}" rx="${86 * s}" ry="${112 * s}" fill="#ffffff" stroke="#e5e7eb" stroke-width="${10 * s}"/>
  <circle cx="${x + 8 * s}" cy="${y + 28 * s}" r="${42 * s}" fill="#facc15"/>
  <ellipse cx="${x + 110 * s}" cy="${y + 72 * s}" rx="${76 * s}" ry="${48 * s}" fill="#fff7ed" stroke="#fed7aa" stroke-width="${8 * s}"/>`;

const broccoli = (x, y, s = 1) => `
  <rect x="${x - 22 * s}" y="${y + 40 * s}" width="${44 * s}" height="${120 * s}" rx="${18 * s}" fill="#86efac"/>
  <circle cx="${x - 66 * s}" cy="${y}" r="${60 * s}" fill="#16a34a"/>
  <circle cx="${x}" cy="${y - 36 * s}" r="${72 * s}" fill="#22c55e"/>
  <circle cx="${x + 72 * s}" cy="${y + 4 * s}" r="${62 * s}" fill="#15803d"/>
  <circle cx="${x - 4 * s}" cy="${y + 42 * s}" r="${68 * s}" fill="#16a34a"/>`;

const eggplant = (x, y, s = 1) => `
  <path d="M${x - 58 * s} ${y + 112 * s}c-${62 * s}-${112 * s}-${28 * s}-${220 * s} ${76 * s}-${248 * s}c${84 * s} ${64 * s} ${92 * s} ${186 * s} ${4 * s} ${270 * s}c-${30 * s} ${28 * s}-${60 * s} ${22 * s}-${80 * s}-${22 * s}z" fill="#7c3aed"/>
  <path d="M${x + 16 * s} ${y - 144 * s}c${42 * s}-${18 * s} ${82 * s}-${8 * s} ${120 * s} ${24 * s}c-${48 * s} ${16 * s}-${88 * s} ${8 * s}-${120 * s}-${24 * s}z" fill="#22c55e"/>
  <path d="M${x - 8 * s} ${y + 78 * s}c${62 * s}-${82 * s} ${66 * s}-${160 * s} ${20 * s}-${210 * s}" fill="none" stroke="#c4b5fd" stroke-width="${14 * s}" stroke-linecap="round" opacity="0.55"/>`;

const can = (x, y, s = 1, color = '#94a3b8') => `
  <ellipse cx="${x}" cy="${y}" rx="${82 * s}" ry="${34 * s}" fill="#e2e8f0" stroke="#64748b" stroke-width="${8 * s}"/>
  <rect x="${x - 82 * s}" y="${y}" width="${164 * s}" height="${142 * s}" fill="${color}" stroke="#64748b" stroke-width="${8 * s}"/>
  <ellipse cx="${x}" cy="${y + 142 * s}" rx="${82 * s}" ry="${34 * s}" fill="#cbd5e1" stroke="#64748b" stroke-width="${8 * s}"/>
  <rect x="${x - 52 * s}" y="${y + 42 * s}" width="${104 * s}" height="${54 * s}" rx="${18 * s}" fill="#ffffff" opacity="0.64"/>`;

const mushroom = (x, y, s = 1) => `
  <path d="M${x - 82 * s} ${y}c${18 * s}-${82 * s} ${148 * s}-${82 * s} ${166 * s} 0c-${28 * s} ${18 * s}-${138 * s} ${18 * s}-${166 * s} 0z" fill="#a16207"/>
  <rect x="${x - 26 * s}" y="${y}" width="${52 * s}" height="${106 * s}" rx="${24 * s}" fill="#fef3c7"/>`;

const tofu = (x, y, s = 1) => `
  <rect x="${x - 82 * s}" y="${y - 58 * s}" width="${164 * s}" height="${116 * s}" rx="${18 * s}" fill="#fff7ed" stroke="#fed7aa" stroke-width="${8 * s}"/>
  <path d="M${x - 36 * s} ${y - 58 * s}v${116 * s}M${x + 30 * s} ${y - 58 * s}v${116 * s}" stroke="#fed7aa" stroke-width="${6 * s}" opacity="0.75"/>`;

const riceBowl = (x, y, s = 1) => `
  <ellipse cx="${x}" cy="${y}" rx="${190 * s}" ry="${72 * s}" fill="#ffffff" stroke="#c4b5fd" stroke-width="${12 * s}"/>
  <path d="M${x - 190 * s} ${y}c${24 * s} ${120 * s} ${92 * s} ${188 * s} ${190 * s} ${188 * s}s${166 * s}-${68 * s} ${190 * s}-${188 * s}" fill="#ffffff" stroke="#c4b5fd" stroke-width="${12 * s}"/>
  <circle cx="${x - 52 * s}" cy="${y - 24 * s}" r="${24 * s}" fill="#e0f2fe"/>
  <circle cx="${x + 36 * s}" cy="${y - 36 * s}" r="${22 * s}" fill="#fef3c7"/>`;

const sceneSvg = ({ scene, primary, secondary }) => {
  switch (scene) {
    case 'carrot':
      return `<rect x="360" y="250" width="860" height="420" rx="52" fill="#fff7ed" stroke="#fed7aa" stroke-width="16"/>${carrot(560, 420, 1.2)}${carrot(760, 470, 0.95)}${carrot(940, 430, 1.05)}<circle cx="1130" cy="310" r="54" fill="#bbf7d0"/>`;
    case 'egg':
      return `<circle cx="790" cy="450" r="260" fill="#ffffff" stroke="#fde68a" stroke-width="18"/>${egg(660, 410, 1.1)}${egg(870, 440, 1)}<rect x="455" y="610" width="660" height="26" rx="13" fill="#0ea5e9" opacity="0.2"/>`;
    case 'eggplant':
      return `<rect x="390" y="230" width="820" height="440" rx="64" fill="#ffffff" opacity="0.82"/>${eggplant(690, 450, 1.15)}${eggplant(900, 470, 0.92)}${mushroom(1060, 490, 0.8)}`;
    case 'broccoli':
      return `<circle cx="800" cy="452" r="270" fill="#ffffff" stroke="#bbf7d0" stroke-width="18"/>${broccoli(640, 430, 1.05)}${broccoli(850, 410, 1.2)}${broccoli(1010, 485, 0.8)}`;
    case 'tuna':
      return `<rect x="380" y="250" width="840" height="410" rx="56" fill="#ffffff" opacity="0.86"/>${can(700, 360, 1.05, '#cbd5e1')}${carrot(930, 510, 0.72)}${broccoli(1050, 440, 0.72)}`;
    case 'tofu-ground':
      return `<circle cx="800" cy="450" r="265" fill="#ffffff" stroke="#ccfbf1" stroke-width="18"/>${tofu(655, 420, 1.05)}${tofu(840, 500, 0.88)}<circle cx="990" cy="410" r="76" fill="#a16207"/><circle cx="1040" cy="475" r="48" fill="#92400e"/>`;
    case 'chicken-broccoli':
      return `<rect x="360" y="250" width="880" height="420" rx="58" fill="#ffffff" opacity="0.86"/><path d="M530 485c90-128 258-144 366-42c-64 128-270 154-366 42z" fill="#fed7aa" stroke="#f59e0b" stroke-width="12"/>${broccoli(970, 430, 1.05)}${broccoli(1110, 505, 0.72)}`;
    case 'salmon-mushroom':
      return `<circle cx="760" cy="450" r="260" fill="#ffffff" stroke="#fecdd3" stroke-width="18"/><path d="M510 500c98-160 326-204 486-82c-86 156-320 206-486 82z" fill="#fb7185" stroke="#f43f5e" stroke-width="12"/><path d="M675 450c82-38 168-50 262-34" fill="none" stroke="#ffe4e6" stroke-width="18" stroke-linecap="round"/>${mushroom(1020, 480, 0.85)}${mushroom(1110, 540, 0.62)}`;
    case 'mackerel-daikon':
      return `<rect x="370" y="245" width="860" height="430" rx="58" fill="#ffffff" opacity="0.86"/>${can(610, 350, 1.04, '#93c5fd')}<ellipse cx="890" cy="470" rx="120" ry="76" fill="#f8fafc" stroke="#cbd5e1" stroke-width="12"/><ellipse cx="1030" cy="505" rx="126" ry="82" fill="#ffffff" stroke="#cbd5e1" stroke-width="12"/><circle cx="1010" cy="486" r="36" fill="#e2e8f0"/>`;
    case 'tomato-frozen':
      return `<rect x="390" y="245" width="820" height="430" rx="58" fill="#ffffff" opacity="0.86"/>${can(590, 350, 1, '#fca5a5')}<rect x="820" y="310" width="250" height="230" rx="36" fill="#dbeafe" stroke="#38bdf8" stroke-width="12"/><circle cx="885" cy="390" r="30" fill="#22c55e"/><circle cx="970" cy="440" r="34" fill="#f97316"/><circle cx="900" cy="490" r="24" fill="#ef4444"/>`;
    case 'open-fridge':
      return `<rect x="520" y="170" width="420" height="560" rx="42" fill="#ffffff" stroke="${primary}" stroke-width="18"/><rect x="940" y="210" width="190" height="475" rx="34" fill="#dbeafe" stroke="${primary}" stroke-width="14"/><line x1="560" y1="340" x2="910" y2="340" stroke="#bfdbfe" stroke-width="14"/><line x1="560" y1="520" x2="910" y2="520" stroke="#bfdbfe" stroke-width="14"/>${egg(655, 285, 0.55)}${carrot(760, 450, 0.54)}${broccoli(835, 610, 0.58)}${can(1040, 410, 0.54, '#fdba74')}`;
    case 'ingredient-order':
      return `<rect x="330" y="300" width="940" height="310" rx="62" fill="#ffffff" opacity="0.86"/>${broccoli(470, 438, 0.68)}<path d="M585 450h112" stroke="${primary}" stroke-width="22" stroke-linecap="round"/><path d="M690 420l50 30-50 30z" fill="${primary}"/>${egg(820, 435, 0.62)}<path d="M935 450h112" stroke="${secondary}" stroke-width="22" stroke-linecap="round"/><path d="M1040 420l50 30-50 30z" fill="${secondary}"/>${can(1160, 386, 0.58, '#cbd5e1')}`;
    case 'one-plate':
      return `<circle cx="800" cy="450" r="278" fill="#ffffff" stroke="#fbcfe8" stroke-width="18"/><path d="M590 520c110-140 274-146 416-32c-90 120-288 156-416 32z" fill="#f9a8d4"/><circle cx="690" cy="380" r="62" fill="#facc15"/>${broccoli(925, 410, 0.72)}${riceBowl(780, 545, 0.52)}`;
    case 'frozen-rice':
      return `<rect x="410" y="250" width="780" height="420" rx="62" fill="#ffffff" opacity="0.86"/>${riceBowl(760, 430, 1.05)}<path d="M1040 270l76 76-76 76-76-76z" fill="#bae6fd" stroke="#38bdf8" stroke-width="12"/><path d="M1110 475l58 58-58 58-58-58z" fill="#ddd6fe" stroke="#7c3aed" stroke-width="10"/>`;
    case 'shopping-list':
      return `<rect x="520" y="205" width="330" height="470" rx="34" fill="#ffffff" stroke="${primary}" stroke-width="16"/><circle cx="610" cy="330" r="22" fill="${secondary}"/><line x1="665" y1="330" x2="790" y2="330" stroke="#fed7aa" stroke-width="18" stroke-linecap="round"/><circle cx="610" cy="440" r="22" fill="${secondary}"/><line x1="665" y1="440" x2="790" y2="440" stroke="#fed7aa" stroke-width="18" stroke-linecap="round"/><path d="M920 420c0-76 62-138 138-138h88v292h-226z" fill="#bbf7d0" stroke="#16a34a" stroke-width="16"/><path d="M986 282c0-58 34-92 72-92s72 34 72 92" fill="none" stroke="#16a34a" stroke-width="16"/>${carrot(1010, 520, 0.5)}`;
    default:
      return `${carrot(640, 430, 0.9)}${broccoli(920, 450, 0.8)}${egg(780, 420, 0.7)}`;
  }
};

const buildSvg = ({ scene, primary, secondary, bg }) => `
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBg" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="${bg}" />
      <stop offset="1" stop-color="#ffffff" />
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#cardBg)" />
  <circle cx="1260" cy="164" r="190" fill="${primary}" opacity="0.12" />
  <circle cx="310" cy="720" r="250" fill="${secondary}" opacity="0.12" />
  <path d="M230 250c190-120 420-116 610-18c176 90 338 60 508-58" fill="none" stroke="#ffffff" stroke-width="62" stroke-linecap="round" opacity="0.52" />
  ${sceneSvg({ scene, primary, secondary })}
</svg>`;

for (const image of images) {
  const out = path.join(blogDir, `${image.slug}-thumbnail-1600x900.png`);
  await sharp(Buffer.from(buildSvg(image))).png({ compressionLevel: 9 }).toFile(out);
}

const thumbnailFiles = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith('-thumbnail-1600x900.png'));

for (const file of thumbnailFiles) {
  const src = path.join(blogDir, file);
  const out = path.join(blogDir, file.replace('-thumbnail-1600x900.png', '-card-640x360.webp'));

  await sharp(src)
    .resize(640, 360, { fit: 'cover' })
    .webp({ quality: 72, effort: 6 })
    .toFile(out);
}
