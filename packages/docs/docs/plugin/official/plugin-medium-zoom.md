---
title: medium-zoom
metaTitle: Medium-Zoom Plugin | VuePress
---

# [@vuepress/plugin-medium-zoom](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-medium-zoom)

> [medium-zoom](https://github.com/francoischalifour/medium-zoom) plugin

## Install

```bash
yarn add -D @vuepress/plugin-medium-zoom
# OR npm install -D @vuepress/plugin-medium-zoom
```

## Usage

**Simple**:

```javascript
module.exports = {
  plugins: ['@vuepress/medium-zoom']
}
```

**With options**:

```javascript
module.exports = {
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }
  }
}
```

## Options

### selector

- Type: `string`
- Default: `.theme-default-content :not(a) > img`

Note that `.theme-default-content` is the class name of [`<Content />`](../../guide/using-vue.md#content) component in default theme.

### options

- Type: `object`
- Default: `undefined`

[Options](https://github.com/francoischalifour/medium-zoom#options) for [medium-zoom](https://github.com/francoischalifour/medium-zoom).
