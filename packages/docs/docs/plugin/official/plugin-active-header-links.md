---
title: active-header-links
metaTitle: A plugin of automatically activating sidebar links when page scrolls | VuePress
---

# [@vuepress/plugin-active-header-links](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-active-header-links)

> A plugin of automatically activating sidebar links when page scrolls

## Install

```bash
yarn add -D @vuepress/plugin-active-header-links@next
# OR npm install -D @vuepress/plugin-active-header-links@next
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

