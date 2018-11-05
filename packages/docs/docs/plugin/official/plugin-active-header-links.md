---
title: active-header-links
---

# @vuepress/plugin-active-header-links

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

## Options

### sidebarLinkSelector

- Type: `string`
- Default: `.sidebar-link`

### headerAnchorSelector

- Type: `string`
- Default: `.header-anchor'`

