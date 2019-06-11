---
title: medium-zoom
metaTitle: Medium-Zoom Plugin | VuePress
---

# [@vuepress/plugin-medium-zoom](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-medium-zoom)

> [medium-zoom](https://github.com/francoischalifour/medium-zoom) plugin

## Install

```bash
yarn add -D @vuepress/plugin-medium-zoom@next
# OR npm install -D @vuepress/plugin-medium-zoom@next
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

      // medium-zoom options here (https://github.com/francoischalifour/medium-zoom#options)
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
- Default: `.content img`

### options

Other `medium-zoom` options. [See documentation](https://github.com/francoischalifour/medium-zoom#options).
