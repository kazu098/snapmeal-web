import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const blogDir = path.resolve('public/blog');

const newImages = [
  {
    slug: 'hotcook-carrot-recipes',
    title: 'にんじん',
    subtitle: 'root vegetables',
    primary: '#f59e0b',
    secondary: '#10b981',
    bg: '#fff7ed',
  },
  {
    slug: 'hotcook-egg-recipes',
    title: '卵',
    subtitle: 'soft set meals',
    primary: '#fbbf24',
    secondary: '#0ea5e9',
    bg: '#fefce8',
  },
  {
    slug: 'hotcook-eggplant-recipes',
    title: 'なす',
    subtitle: 'summer simmer',
    primary: '#7c3aed',
    secondary: '#22c55e',
    bg: '#faf5ff',
  },
  {
    slug: 'hotcook-broccoli-recipes',
    title: 'ブロッコリー',
    subtitle: 'green sides',
    primary: '#16a34a',
    secondary: '#0284c7',
    bg: '#f0fdf4',
  },
  {
    slug: 'hotcook-tuna-can-recipes',
    title: 'ツナ缶',
    subtitle: 'pantry dinner',
    primary: '#64748b',
    secondary: '#f97316',
    bg: '#f8fafc',
  },
  {
    slug: 'tofu-ground-meat-meal',
    title: '豆腐×ひき肉',
    subtitle: 'soft protein',
    primary: '#14b8a6',
    secondary: '#a16207',
    bg: '#f0fdfa',
  },
  {
    slug: 'chicken-breast-broccoli-meal',
    title: '鶏むね×ブロッコリー',
    subtitle: 'lean dinner',
    primary: '#22c55e',
    secondary: '#0f766e',
    bg: '#f0fdf4',
  },
  {
    slug: 'salmon-mushroom-meal',
    title: '鮭×きのこ',
    subtitle: 'umami steam',
    primary: '#fb7185',
    secondary: '#92400e',
    bg: '#fff1f2',
  },
  {
    slug: 'mackerel-can-daikon-meal',
    title: 'さば缶×大根',
    subtitle: 'pantry simmer',
    primary: '#0ea5e9',
    secondary: '#64748b',
    bg: '#f0f9ff',
  },
  {
    slug: 'tomato-can-frozen-vegetables-meal',
    title: 'トマト缶×冷凍野菜',
    subtitle: 'no shopping stew',
    primary: '#ef4444',
    secondary: '#16a34a',
    bg: '#fef2f2',
  },
  {
    slug: 'dinner-no-idea-fridge',
    primary: '#2563eb',
    secondary: '#f59e0b',
    bg: '#eff6ff',
    motif: 'fridge',
  },
  {
    slug: 'use-ingredients-order',
    primary: '#059669',
    secondary: '#f97316',
    bg: '#ecfdf5',
    motif: 'steps',
  },
  {
    slug: 'dinner-without-side-dishes',
    primary: '#db2777',
    secondary: '#14b8a6',
    bg: '#fdf2f8',
    motif: 'plate',
  },
  {
    slug: 'frozen-rice-dinner',
    primary: '#7c3aed',
    secondary: '#38bdf8',
    bg: '#faf5ff',
    motif: 'rice',
  },
  {
    slug: 'shopping-list-from-fridge',
    primary: '#ea580c',
    secondary: '#16a34a',
    bg: '#fff7ed',
    motif: 'memo',
  },
];

const motifSvg = ({ primary, secondary, motif }) => {
  if (motif === 'fridge') {
    return `
      <rect x="660" y="210" width="280" height="430" rx="34" fill="#ffffff" stroke="${primary}" stroke-width="18" />
      <line x1="660" y1="360" x2="940" y2="360" stroke="${primary}" stroke-width="14" opacity="0.35" />
      <circle cx="735" cy="430" r="28" fill="${secondary}" opacity="0.8" />
      <rect x="790" y="415" width="96" height="34" rx="17" fill="${primary}" opacity="0.16" />
      <circle cx="806" cy="520" r="34" fill="${primary}" opacity="0.18" />
      <rect x="850" y="500" width="54" height="70" rx="16" fill="${secondary}" opacity="0.42" />`;
  }

  if (motif === 'steps') {
    return `
      <path d="M520 590c110-230 305-230 560-150" fill="none" stroke="${primary}" stroke-width="26" stroke-linecap="round" opacity="0.82" />
      <circle cx="560" cy="590" r="58" fill="#ffffff" stroke="${primary}" stroke-width="16" />
      <circle cx="800" cy="454" r="58" fill="#ffffff" stroke="${secondary}" stroke-width="16" />
      <circle cx="1060" cy="440" r="58" fill="#ffffff" stroke="${primary}" stroke-width="16" />
      <path d="M765 282c54 16 88 0 122-46-58-15-98 2-122 46z" fill="${secondary}" opacity="0.75" />`;
  }

  if (motif === 'plate') {
    return `
      <circle cx="800" cy="450" r="220" fill="#ffffff" stroke="${primary}" stroke-width="18" />
      <circle cx="800" cy="450" r="132" fill="${primary}" opacity="0.08" />
      <circle cx="730" cy="410" r="50" fill="${secondary}" opacity="0.72" />
      <rect x="785" y="480" width="150" height="54" rx="27" fill="${primary}" opacity="0.68" />
      <path d="M655 510c80-58 160-72 250-34" fill="none" stroke="${secondary}" stroke-width="24" stroke-linecap="round" opacity="0.62" />`;
  }

  if (motif === 'rice') {
    return `
      <path d="M610 470c18 125 90 200 190 200s172-75 190-200z" fill="#ffffff" stroke="${primary}" stroke-width="18" />
      <ellipse cx="800" cy="470" rx="198" ry="78" fill="#ffffff" stroke="${primary}" stroke-width="18" />
      <circle cx="735" cy="430" r="18" fill="${secondary}" opacity="0.62" />
      <circle cx="805" cy="412" r="20" fill="${primary}" opacity="0.26" />
      <circle cx="880" cy="438" r="17" fill="${secondary}" opacity="0.58" />
      <path d="M1010 274l64 64-64 64-64-64z" fill="${secondary}" opacity="0.35" />`;
  }

  if (motif === 'memo') {
    return `
      <rect x="650" y="220" width="300" height="430" rx="30" fill="#ffffff" stroke="${primary}" stroke-width="18" />
      <line x1="710" y1="335" x2="890" y2="335" stroke="${primary}" stroke-width="18" stroke-linecap="round" opacity="0.38" />
      <line x1="710" y1="430" x2="870" y2="430" stroke="${secondary}" stroke-width="18" stroke-linecap="round" opacity="0.62" />
      <line x1="710" y1="525" x2="900" y2="525" stroke="${primary}" stroke-width="18" stroke-linecap="round" opacity="0.28" />
      <circle cx="1025" cy="575" r="72" fill="${secondary}" opacity="0.55" />`;
  }

  return `
    <circle cx="800" cy="450" r="180" fill="#ffffff" stroke="${primary}" stroke-width="18" />
    <path d="M720 540c115-42 166-135 156-266-104 32-176 115-156 266z" fill="${primary}" opacity="0.9" />
    <path d="M823 290c47 10 84 0 116-35-48-13-87 0-116 35z" fill="${secondary}" opacity="0.85" />`;
};

const buildSvg = ({ primary, secondary, bg, motif }) => `
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBg" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="${bg}" />
      <stop offset="1" stop-color="#ffffff" />
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#cardBg)" />
  <circle cx="1240" cy="176" r="170" fill="${primary}" opacity="0.13" />
  <circle cx="344" cy="710" r="230" fill="${secondary}" opacity="0.13" />
  <path d="M260 242c160-110 390-114 560-24 188 100 342 78 506-42" fill="none" stroke="#ffffff" stroke-width="54" stroke-linecap="round" opacity="0.56" />
  <rect x="420" y="150" width="760" height="600" rx="72" fill="#ffffff" opacity="0.74" />
  ${motifSvg({ primary, secondary, motif })}
</svg>`;

for (const image of newImages) {
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
