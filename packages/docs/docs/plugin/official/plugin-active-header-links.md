---
title: active-header-links
metaTitle: A plugin of automatically activating sidebar links when page scrolls | VuePress
---

# [@vuepress/plugin-active-header-links](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-active-header-links)

> A plugin of automatically activating sidebar links when page scrolls

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
    headerAnchorSelector: '.header-anchor'
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
