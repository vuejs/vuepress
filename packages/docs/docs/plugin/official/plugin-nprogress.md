---
title: nprogress
metaTitle: Nprogress Plugin | VuePress
---

# [@vuepress/plugin-nprogress](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-nprogress)

> Nprogress plugin

## Install

```bash
yarn add -D @vuepress/plugin-nprogress
# OR npm install -D @vuepress/plugin-nprogress
```

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/nprogress']
}
```

## Custom color

Set `$nprogressColor` in your __site__ or __theme__ `palette.styl` file to change the color of the progress bar (default is `$accentColor`).

```stylus
// .vuepress/styles/palette.styl
// or
// .vuepress/theme/styles/palette.styl

$nprogressColor = red
```

**Also see:**

- [Config Reference > Styling](../../config/#styling)
