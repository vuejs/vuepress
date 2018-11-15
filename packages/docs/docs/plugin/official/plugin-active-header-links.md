---
title: active-header-links
metaTitle: Active-Header-Links Plugin | VuePress
---

# [@vuepress/plugin-active-header-links](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-active-header-links)

> A plugin of automatically update header links when page scrolls

## Install

```bash
yarn add -D @vuepress/plugin-active-header-links
# OR npm install -D @vuepress/plugin-active-header-links
```

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/active-header-links']
}
```

### Passing Options
```javascript
module.exports = {
  plugins: ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor',
    headerTopOffset: 120
  }]
}
```

## Options

### sidebarLinkSelector

- Type: `string`
- Default: `.sidebar-link`

### headerAnchorSelector

- Type: `string`
- Default: `.header-anchor`

### headerTopOffset
The number of pixels that you want the header to be from the top of the page before updating the url hash switch to that header.

- Type: `integer`
- Default: `90`

