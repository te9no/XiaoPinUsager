# Seeed XIAO nRF Pin Mapper

Seeed XIAO nRF52840 / nRF52840 Sense のピン配置をカスタマイズして出力できる Vite + React 製の Web アプリです。ピン番号 (P0.xx)、Arduino 番号 (D0 など)、端子名に加えて、ユーザーが入力した別名を SVG に反映できます。Netlify にデプロイすれば、そのままブラウザ上で動作します。

## 機能

- ピン情報を色分けしてボード周囲にプロット
- 別名 (エイリアス) を入力すると即時に SVG へ反映
- SVG としてダウンロード (PNG は今後追加予定)
- XIAO nRF52840 と XIAO nRF52840 Plus をトグルで切り替え
- ピンカテゴリの凡例、別名入力テーブル付き

## セットアップ

```bash
npm install
npm run dev
```

`npm run dev` でローカルサーバーが起動します (既定は <http://localhost:5173>)。  
`npm run build` で `dist/` に本番向けビルドが生成されます。

## Netlify での公開

1. Netlify ダッシュボードで新しいサイトを作成し、このリポジトリを接続します。
2. ビルドコマンドに `npm run build`、公開ディレクトリに `dist` を設定します。
3. デプロイ後、任意の alias を入力して SVG をダウンロードまたはそのまま共有できます。

## 今後の拡張アイデア

- SVG をベースに PNG へも書き出す (例: canvas へ描画して `toDataURL` を取得)
- ピンの表示/非表示や色替え機能
- ボード画像の差し替え (Sense 版など)
