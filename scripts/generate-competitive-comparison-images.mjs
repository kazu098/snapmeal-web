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

const focusedVariants = [
  {
    slug: 'pecco-alternative-fridge-photo',
    fileSuffix: 'contextual-1600x900',
    title: 'pecco型と冷蔵庫写真型の違い',
    subtitle: 'おすすめを見る前に、今日ある食材から候補を絞る',
    accent: '#16a34a',
    panels: [
      { type: 'phone', asset: 'pecco', label: 'pecco', note: 'おすすめ・好みから探す' },
      { type: 'arrow', label: '入口の違い' },
      { type: 'phone', asset: 'snapmeal', label: 'Snapmeal', note: '冷蔵庫写真から始める' },
    ],
    footer: 'peccoの公開画像とSnapmealの画面を並べ、献立決定の入口だけを比較。',
  },
  {
    slug: 'menew-alternative-family-dinner',
    fileSuffix: 'contextual-1600x900',
    title: 'me:new型と当日冷蔵庫型の違い',
    subtitle: '週次計画が崩れた日は、今日の食材から決め直す',
    accent: '#2563eb',
    panels: [
      { type: 'phone', asset: 'menew', label: 'me:new', note: '1週間の計画を整える' },
      { type: 'arrow', label: '使うタイミング' },
      { type: 'phone', asset: 'snapmeal', label: 'Snapmeal', note: '当日の冷蔵庫から候補を出す' },
    ],
    footer: 'me:newの公開画像とSnapmealの画面を並べ、計画型と当日判断型の違いを比較。',
  },
  {
    slug: 'chatgpt-meal-planning-photo-input',
    fileSuffix: 'contextual-1600x900',
    title: 'ChatGPT献立と写真入力の違い',
    subtitle: '文章で条件を書くか、冷蔵庫写真から確認して進むか',
    accent: '#7c3aed',
    panels: [
      {
        type: 'text',
        label: 'ChatGPT',
        note: '食材・家族条件・調理器具を文章で入力',
        lines: ['卵、キャベツ、豚こまがあります', '子どもも食べやすく', '冷蔵庫にある食材だけで'],
      },
      { type: 'arrow', label: '入力の手間' },
      { type: 'phone', asset: 'snapmeal', label: 'Snapmeal', note: '冷蔵庫写真から食材確認へ' },
    ],
    footer: 'ChatGPTは自由な相談、Snapmealは冷蔵庫写真からの候補出しに寄せた使い方。',
  },
  {
    slug: 'ai-meal-planning-app-family',
    fileSuffix: 'contextual-1600x900',
    title: '家族向けAI献立で見るべき制約',
    subtitle: '子どもの好み、冷蔵庫、疲れ具合を分けて考える',
    accent: '#0f766e',
    panels: [
      {
        type: 'text',
        label: '家族の制約',
        note: 'AI献立で先に伝えたいこと',
        lines: ['子どもが食べやすい味', '買い物なしで作りたい', '疲れた日は工程少なめ'],
      },
      { type: 'arrow', label: '今日の条件' },
      { type: 'phone', asset: 'snapmeal', label: 'Snapmeal', note: '冷蔵庫写真と食材確認から候補へ' },
    ],
    footer: '家族向けでは、レシピ数より今日の制約を整理して候補を絞ることが重要。',
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

function textPanel({ panel, x, y, width = 420, height = 520, accent = '#16a34a' }) {
  const lines = panel.lines
    .map((line, index) => {
      const cy = y + 190 + index * 74;
      return `
        <g>
          <rect x="${x + 42}" y="${cy - 36}" width="${width - 84}" height="52" rx="26" fill="#f8fafc" stroke="#e2e8f0"/>
          <text x="${x + 70}" y="${cy - 2}" font-family="Arial, sans-serif" font-size="23" font-weight="700" fill="#334155">${escape(line)}</text>
        </g>
      `;
    })
    .join('');

  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="36" fill="#111827" opacity="0.08"/>
      <rect x="${x + 8}" y="${y - 10}" width="${width}" height="${height}" rx="36" fill="#ffffff" stroke="#e5e7eb" stroke-width="4"/>
      <circle cx="${x + 74}" cy="${y + 82}" r="34" fill="${accent}" opacity="0.16"/>
      <text x="${x + 122}" y="${y + 78}" font-family="Arial, sans-serif" font-size="34" font-weight="900" fill="#111827">${escape(panel.label)}</text>
      <text x="${x + 122}" y="${y + 114}" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#64748b">${escape(panel.note)}</text>
      ${lines}
    </g>
  `;
}

function arrowPanel({ panel, x, y, width = 260, height = 520, accent = '#16a34a' }) {
  return `
    <g>
      <rect x="${x + 42}" y="${y + 215}" width="${width - 84}" height="70" rx="35" fill="${accent}" opacity="0.13"/>
      <path d="M${x + 74} ${y + 250} H${x + width - 96}" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
      <path d="M${x + width - 118} ${y + 222} L${x + width - 76} ${y + 250} L${x + width - 118} ${y + 278}" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="${x + width / 2}" y="${y + 340}" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="900" fill="#334155">${escape(panel.label)}</text>
    </g>
  `;
}

async function buildFocusedSvg(variant) {
  const panelX = [180, 670, 1000];
  const renderedPanels = [];

  for (const [index, panel] of variant.panels.entries()) {
    const x = panelX[index];
    if (panel.type === 'phone') {
      renderedPanels.push(
        await phonePanel({
          file: assets[panel.asset].file,
          label: panel.label,
          x,
          y: 238,
          width: 360,
          height: 500,
          tint: panel.asset === 'snapmeal' ? '#ecfdf5' : '#f8fafc',
        }),
      );
      renderedPanels.push(`
        <text x="${x + 180}" y="818" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="800" fill="#475569">${escape(panel.note)}</text>
      `);
    } else if (panel.type === 'text') {
      renderedPanels.push(textPanel({ panel, x, y: 238, accent: variant.accent }));
    } else {
      renderedPanels.push(arrowPanel({ panel, x, y: 238, accent: variant.accent }));
    }
  }

  return `
    <svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="focusedBg" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#ffffff"/>
          <stop offset="1" stop-color="#f1f5f9"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#focusedBg)"/>
      <rect x="60" y="58" width="1480" height="784" rx="48" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
      <circle cx="1390" cy="142" r="160" fill="${variant.accent}" opacity="0.12"/>
      <text x="800" y="116" text-anchor="middle" font-family="Arial, sans-serif" font-size="50" font-weight="900" fill="#111827">${escape(variant.title)}</text>
      <text x="800" y="172" text-anchor="middle" font-family="Arial, sans-serif" font-size="27" font-weight="700" fill="#64748b">${escape(variant.subtitle)}</text>
      ${renderedPanels.join('')}
      <text x="800" y="862" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#64748b">${escape(variant.footer)}</text>
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

for (const variant of focusedVariants) {
  const svg = await buildFocusedSvg(variant);
  const image = path.join(outDir, `${variant.slug}-${variant.fileSuffix}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(image);
}
