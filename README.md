<p align="center">
  <a href="https://vuepress.vuejs.org/" target="_blank">
    <img width="280" src="https://raw.githubusercontent.com/vuejs/vuepress/master/packages/docs/docs/.vuepress/public/hero.png" alt="logo">
  </a>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/vuepress?minimal=true"><img src="https://img.shields.io/npm/dm/vuepress.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vuepress"><img src="https://img.shields.io/npm/v/vuepress.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vuepress"><img src="https://badgen.net/npm/v/vuepress/next" alt="npm next version"></a>
  <a href="https://www.npmjs.com/package/vuepress"><img src="https://img.shields.io/npm/l/vuepress.svg" alt="License"></a>
  <a href="https://discordapp.com/invite/HBherRA"><img src="https://img.shields.io/badge/Discord-join%20chat-738bd7.svg" alt="vuepress channel on Discord"></a>
</p>

> This is the branch for `VuePress Next`.

## Status: alpha

Certain combinations of plugins may not work properly, and things may change or break until we reach `beta` phase. Do not use in production yet unless you are adventurous.

For 0.x, it's moved to [0.x branch](https://github.com/vuejs/vuepress/tree/0.x) and still maintained, the website was switching to https://v0.vuepress.vuejs.org.

> Note that we are working hard to improve the documentation and contributions welcome if you keep up with the latest changes.

# VuePress

> Minimalistic docs generator with Vue component based layout system

https://vuepress.vuejs.org/

## Install

```bash
yarn add vuepress -D       # Install 0.x.x.
yarn add vuepress@next -D  # Install next.
```

## Features

**Built-in markdown extensions**

* [Table of Contents](https://vuepress.vuejs.org/guide/markdown.html#table-of-contents)
* [Custom Containers](https://vuepress.vuejs.org/guide/markdown.html#custom-containers)
* [Line Highlighting](https://vuepress.vuejs.org/guide/markdown.html#line-highlighting-in-code-blocks)
* [Line Numbers](https://vuepress.vuejs.org/guide/markdown.html#line-numbers)
* [Import Code Snippets](https://vuepress.vuejs.org/guide/markdown.html#import-code-snippets)

**Using Vue in Markdown**

* [Templating](https://vuepress.vuejs.org/guide/using-vue.html#templating)
* [Using Components](https://vuepress.vuejs.org/guide/using-vue.html#using-components)

**Vue-powered custom theme system**

* [Metadata](https://vuepress.vuejs.org/theme/writing-a-theme.html#site-and-page-metadata)
* [Content Excerpt](https://vuepress.vuejs.org/theme/writing-a-theme.html#content-excerpt)

**Default theme**

* Responsive layout
* [Optional Homepage](https://vuepress.vuejs.org/theme/default-theme-config.html#homepage)
* [Simple out-of-the-box header-based search](https://vuepress.vuejs.org/theme/default-theme-config.html#built-in-search)
* [Algolia Search](https://vuepress.vuejs.org/theme/default-theme-config.html#algolia-search)
* Customizable [navbar](https://vuepress.vuejs.org/theme/default-theme-config.html#navbar) and [sidebar](https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar)
* [Auto-generated GitHub link and page edit links](https://vuepress.vuejs.org/theme/default-theme-config.html#git-repo-and-edit-links)
* [PWA: Popup UI to refresh contents](https://vuepress.vuejs.org/theme/default-theme-config.html#popup-ui-to-refresh-contents)
* [Last Updated](https://vuepress.vuejs.org/theme/default-theme-config.html#last-updated)

**Miscellaneous**

* [Multi-Language Support](https://vuepress.vuejs.org/guide/i18n.html)
* [Service Worker](https://vuepress.vuejs.org/config/#serviceworker)
* [Google Analytics](https://vuepress.vuejs.org/config/#ga)

## Showcase

Check out [Awesome Vuepress](https://github.com/ulivz/awesome-vuepress) to find awesome things related to VuePress.

## Development

> Please make sure your version of Node.js is greater than 8.

``` bash
yarn
yarn dev  # serves VuePress' own docs with itself
yarn test # make sure your code change pass the test
```

If you intend to make `"substantial"` changes to VuePress or its documentation, please checkout [VuePress RFCs](./rfcs/README.md).

## License

[MIT](https://github.com/vuejs/vuepress/blob/master/LICENSE)
