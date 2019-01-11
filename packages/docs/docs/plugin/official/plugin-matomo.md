---
title: matomo
metaTitle: Matomo Plugin | VuePress
---

# [@vuepress/plugin-matomo](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-matomo)


> Matomo plugin

## Install

```bash
yarn add -D @vuepress/plugin-matomo
# OR npm install -D @vuepress/plugin-matomo
```

## Usage

```javascript
module.exports = {
  plugins: [
    '@vuepress/matomo',
    {
      'trackerUrl': '', // Replace with tracking domain, i.e. https://your.domain.com/
      'siteId': 1, // Replace with relevant site ID for tracking
      'enableLinkTracking': true // optional, defaults to true
    }
  ]
}
```

## Options

### trackerUrl

- Type: `string`
- Default: `undefined`

### siteId

- Type: `number`
- Default: `undefined`

### enableLinkTracking

- Type: `boolean`
- Default: true
