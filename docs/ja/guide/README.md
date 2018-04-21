# はじめに

VuePressは2つの部分から成り立っています: Vue駆動のテーマシステムを持つ最小限の静的サイトジェネレータと、技術資料を書くために最適なデフォルトテーマです。これらはVueのサブプロジェクトのドキュメントを作成する必要性のために製作されました。

VuePressによって生成されるページは、ローディングパフォーマンスとSEO対策のため、それぞれ事前描画された静的HTMLを持ちます。一回ページがロードされれば、Vueはその静的コンテンツをSingle-Page Application(SPA)に変えてしまいます。ユーザーが別のページへ向かうと、追加のページがオンデマンドで取得されます。

## どう動くのか

実のところ、VuePressで製作されたサイトは[Vue](http://vuejs.org/)・[Vue Router](https://github.com/vuejs/vue-router)・[webpack](http://webpack.js.org/)で構成されたSPAです。もしもあなたがVueを使ったことがあるなら、VuePressで執筆したりカスタムテーマを開発するとき、似た開発体験を得ることができることに気が付くでしょう(カスタムテーマをデバッグする時にもVue DevToolsが使えます！)。

ビルドを通じ、VuePressは対応するHTMLを擬似的に描画・ルーティングするサーバーレンダリングバージョンを作ります。このアプローチは[Nuxt](https://nuxtjs.org/)の`nuxt generate`コマンドや[Gatsby](https://www.gatsbyjs.org/)などの他のプロジェクトにインスパイアされたものです。

それぞれのMarkdownファイルは[markdown-it](https://github.com/markdown-it/markdown-it)によってHTMLにコンパイルされ、Vueコンポーネントのテンプレートとして処理されます。VueをMarkdownから直接使用することができるので、動的コンテンツを埋め込むことができます。

## 機能

- 技術資料のために最適化された[ビルトインのMarkdown拡張](./markdown.md)
- [Markdownファイル内からVueを利用する](./using-vue.md)
- [Vue駆動カスタムテーマシステム](./custom-themes.md)
- 自動でService Worker生成
- Google Analytics対応
- 多言語サポート
- デフォルトテーマ
  - レスポンシブ
  - ホームページ(任意)
  - すぐに使えるシンプルなヘッダ検索ボックス
  - カスタマイズできるnavbarとsidebar
  - GitHubへのページ編集リンクを自動で生成

## Todo

VuePressは未だ発展中のプロジェクトです。計画されているものの未だ現在サポートされていない機能があります:

- Algolia DocSearch対応
- ブログ機能

貢献をお願いします！

## なぜVuePressなのか

### Nuxt

Nuxtでは、VuePressがやろうとすることの全てが可能です。しかし、Nuxtはアプリケーションを作るためにデザインされているものです。VuePressはコンテンツを中心とする静的サイトに主眼を置いており、技術資料のための機能をすぐに提供できます。

### Docsify / Docute

これらはVue駆動の素晴らしいプロジェクトです。しかしながらこれらは完全にruntime-drivenであり、SEOフレンドリーではありません。もしもあなたがSEOのことを考慮する必要がなかったり、余計な依存関係を増やして混乱したくなければ、これらは良い選択肢でしょう。

### Hexo

Vue.jsのドキュメントはHexoで提供されており、とても良く機能しています - 実は。私たちのサイトをHexoから離れるのは長い道程が必要でしょう。最も大きな問題はHexoのテーマシステムが非常に静的な上、文字列ベースになっていることです。私たちは本当にVueをレイアウトとインタラクティビティの両面で活用したいのです。また、HexoのMarkdownはそこまで設定が柔軟ではありません。
