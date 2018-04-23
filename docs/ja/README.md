---
home: true
heroImage: /hero.png
actionText: はじめに →
actionLink: /ja/guide/
features:
- title: シンプリシティー・ファースト
  details: Markdownを中心としたプロジェクト構造で、最小限のセットアップだけで執筆に専念できます。
- title: Vue.js駆動
  details: Vue + webpackの開発体験を享受しましょう。VueコンポーネントをMarkdown内で使ったり、カスタムテーマをVueで開発できたりします。
- title: 高性能
  details: VuePressはそれぞれのページを静的HTMLファイルに変換し、一回のみのロードで表示できるSPAとして実行します。
footer: MIT Licensed | Copyright © 2018-present Evan You
---

### 1・2・3で、ほら！

``` bash
# インストール
yarn global add vuepress # OR npm install -g vuepress

# Markdownファイルを作成
echo '# Hello VuePress' > README.md

# 書きはじめる
vuepress dev

# ビルド
vuepress build
```

::: warning 注意
Node.jsのバージョンは8以上が必要です。
:::
