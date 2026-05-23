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
];

const buildSvg = ({ title, subtitle, primary, secondary, bg }) => `
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBg" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="${bg}" />
      <stop offset="1" stop-color="#ffffff" />
    </linearGradient>
    <style>
      .title { font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Noto Sans JP", sans-serif; font-weight: 800; }
      .text { font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Noto Sans JP", sans-serif; font-weight: 700; }
    </style>
  </defs>
  <rect width="1600" height="900" fill="url(#cardBg)" />
  <circle cx="1260" cy="190" r="170" fill="${primary}" opacity="0.12" />
  <circle cx="260" cy="690" r="210" fill="${secondary}" opacity="0.12" />
  <rect x="158" y="138" width="1284" height="624" rx="54" fill="#ffffff" opacity="0.9" />
  <rect x="210" y="194" width="500" height="500" rx="46" fill="#f8fafc" />
  <circle cx="460" cy="444" r="158" fill="#ffffff" stroke="#e5e7eb" stroke-width="18" />
  <path d="M420 535c115-42 166-135 156-266-104 32-176 115-156 266z" fill="${primary}" opacity="0.92" />
  <path d="M440 528c56-55 92-128 116-221" stroke="#ffffff" stroke-width="24" stroke-linecap="round" opacity="0.72" />
  <path d="M523 285c47 10 84 0 116-35-48-13-87 0-116 35z" fill="${secondary}" opacity="0.9" />
  <rect x="782" y="246" width="360" height="22" rx="11" fill="${primary}" opacity="0.28" />
  <text x="782" y="365" class="title" font-size="98" fill="#111827">${title}</text>
  <text x="782" y="447" class="text" font-size="42" fill="#4b5563">Hotcook recipe ideas</text>
  <text x="782" y="512" class="text" font-size="34" fill="#64748b">${subtitle} from what is in your fridge</text>
  <rect x="782" y="590" width="390" height="72" rx="36" fill="${secondary}" opacity="0.14" />
  <text x="824" y="638" class="text" font-size="30" fill="#0f766e">Snapmeal Blog</text>
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
