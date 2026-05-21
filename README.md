# snapmeal-web

Snapmeal のランディングページ（Astro + Tailwind CSS）。

## 技術スタック

- [Astro](https://astro.build/) v4
- [Tailwind CSS](https://tailwindcss.com/) v3

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

ブラウザで http://localhost:4321 を開く。ファイル変更はホットリロードで即時反映される。

## ビルド

```bash
npm run build
```

`dist/` ディレクトリに静的ファイルが出力される。

## ビルド結果のプレビュー

```bash
npm run build && npm run preview
```

本番ビルドの成果物をローカルで確認する。

## ディレクトリ構成

```
src/
  pages/      # ルーティング（.astro ファイル）
  components/ # 再利用コンポーネント
  layouts/    # レイアウト
  content/    # コンテンツコレクション
public/       # 静的アセット（画像など）
dist/         # ビルド出力（git 管理外）
```
