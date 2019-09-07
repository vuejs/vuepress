---
title: public-files
metaTitle: public files plugin | VuePress
---

# [@vuepress/plugin-public-files](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-public-files)

> public files plugin

## Installation

```bash
yarn add -D @vuepress/plugin-public-files
# OR npm install -D @vuepress/plugin-public-files
```

## Usage

### Default Usage

```js
module.exports = {
  plugins: [
    // includes all files in `sourceDir`
    // ignore dotfiles and markdown
    "@vuepress/public-files"
  ]
};
```

### An Array of Patterns

```js
module.exports = {
  plugins: [
    [
      "@vuepress/public-files",
      [
        ".vuepress/another-public",
        ".vuepress/one-more-public",
        ".vuepress/public-file.txt"
      ]
    ]
  ]
};
```

### object style of pattern

See: [https://github.com/webpack-contrib/copy-webpack-plugin#patterns](https://github.com/webpack-contrib/copy-webpack-plugin#patterns)

```js
module.exports = {
  plugins: [
    [
      "@vuepress/public-files",
      {
        from: "_assets", // resolved based on sourceDir
        to: "assets", // resolved based on outDir
        ignore: [
          /* glob patterns to be ignored */
        ]
      }
    ]
  ]
};
```

::: tip
In fact we support specifying a list of strings or objects.
:::

### Use Multiple Times

```js
module.exports = {
  plugins: [
    [
      "@vuepress/public-files",
      [".vuepress/another-public", ".vuepress/one-more-public"]
    ],
    [
      "@vuepress/public-files",
      {
        from: "_assets",
        to: "assets",
        ignore: [
          /* globs */
        ]
      }
    ]
  ]
};
```
