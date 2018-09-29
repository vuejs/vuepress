# @vuepress/plugin-sitemap

> Sitemap plugin for vuepress

## Usage

1. Enable this plugin:

```js
// .vuepress/config.js or themedir/index.js

module.exports = {
  plugins: [
    [
      "@vuepress/sitemap",
      {
        hostname: "https://yours.net.id",
        outFile: 'sitemap.xml'
      }
    ]
  ]
};
```

## Options

All the options of https://npm.im/sitemap plus `outFile` (relative target file name)
