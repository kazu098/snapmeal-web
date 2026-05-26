import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.resolve('public/blog');
const tmpDir = path.resolve('/tmp/snapmeal-competitive-assets');

const assets = {
  pecco: {
    url: 'https://pecco.app/images/img_step02.png',
    file: path.join(tmpDir, 'pecco-step.png'),
  },
  menew: {
    url: 'https://menew.jp/images/service_image02.png',
    file: path.join(tmpDir, 'menew-service.png'),
  },
  snapmeal: {
    file: path.resolve('public/screenshots/ja/02-upload.png'),
  },
};

const variants = [
  {
    slug: 'pecco-alternative-fridge-photo',
    title: 'peccoで献立が決まらない人へ',
    subtitle: '冷蔵庫写真から、今ある食材で候補を出す比較',
    accent: '#16a34a',
  },
  {
    slug: 'menew-alternative-family-dinner',
    title: 'me:newと献立AIの違い',
    subtitle: '1週間計画型と、その日の冷蔵庫起点を比べる',
    accent: '#2563eb',
  },
  {
    slug: 'meal-app-comparison-fridge-first',
    title: '献立アプリを冷蔵庫起点で選ぶ',
    subtitle: 'レシピ検索・週次計画・写真AIの向き不向き',
    accent: '#f97316',
  },
  {
    slug: 'chatgpt-meal-planning-photo-input',
    title: 'ChatGPT献立と写真AIの違い',
    subtitle: '入力の手間を減らして夕飯候補まで進める',
    accent: '#7c3aed',
  },
  {
    slug: 'ai-meal-planning-app-family',
    title: '家族向けAI献立アプリの選び方',
    subtitle: '好み・冷蔵庫・買い物前の判断をまとめる',
    accent: '#0f766e',
  },
];

async function download({ url, file }) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(file, buffer);
}

const escape = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

async function phonePanel({ file, label, x, y, width = 280, height = 520, tint = '#f8fafc' }) {
  const imageBuffer = await sharp(file)
    .resize(width - 34, height - 74, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="42" fill="#111827" opacity="0.08"/>
      <rect x="${x + 8}" y="${y - 10}" width="${width}" height="${height}" rx="42" fill="#ffffff" stroke="#e5e7eb" stroke-width="8"/>
      <rect x="${x + 56}" y="${y + 12}" width="${width - 112}" height="18" rx="9" fill="#e5e7eb"/>
      <rect x="${x + 25}" y="${y + 46}" width="${width - 50}" height="${height - 84}" rx="26" fill="${tint}"/>
      <image href="${image}" x="${x + 25}" y="${y + 46}" width="${width - 50}" height="${height - 84}" preserveAspectRatio="xMidYMin slice"/>
      <rect x="${x + 25}" y="${y + 46}" width="${width - 50}" height="${height - 84}" rx="26" fill="none" stroke="#e5e7eb" stroke-width="2"/>
      <text x="${x + width / 2}" y="${y + height + 42}" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#111827">${escape(label)}</text>
    </g>
  `;
}

async function buildSvg(variant) {
  const pecco = await phonePanel({ file: assets.pecco.file, label: 'pecco', x: 180, y: 220, tint: '#fff7ed' });
  const menew = await phonePanel({ file: assets.menew.file, label: 'me:new', x: 660, y: 220, tint: '#eff6ff' });
  const snapmeal = await phonePanel({ file: assets.snapmeal.file, label: 'Snapmeal', x: 1140, y: 220, tint: '#ecfdf5' });

  return `
    <svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#f8fafc"/>
          <stop offset="1" stop-color="#ecfdf5"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)"/>
      <circle cx="1420" cy="125" r="180" fill="${variant.accent}" opacity="0.13"/>
      <circle cx="160" cy="760" r="220" fill="${variant.accent}" opacity="0.10"/>
      <text x="800" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="52" font-weight="900" fill="#111827">${escape(variant.title)}</text>
      <text x="800" y="148" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#64748b">${escape(variant.subtitle)}</text>
      ${pecco}
      ${menew}
      ${snapmeal}
      <rect x="255" y="812" width="1090" height="46" rx="23" fill="#ffffff" opacity="0.8" stroke="#d1fae5"/>
      <text x="800" y="843" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#475569">Public service screenshots arranged for comparison. Snapmeal screenshot uses this site's app preview.</text>
    </svg>
  `;
}

await fs.mkdir(tmpDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });
await download(assets.pecco);
await download(assets.menew);

for (const variant of variants) {
  const svg = await buildSvg(variant);
  const thumbnail = path.join(outDir, `${variant.slug}-thumbnail-1600x900.png`);
  const card = path.join(outDir, `${variant.slug}-card-640x360.webp`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(thumbnail);
  await sharp(thumbnail).resize(640, 360, { fit: 'cover' }).webp({ quality: 78, effort: 6 }).toFile(card);
}
