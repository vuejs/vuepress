---
title: active-header-links
metaTitle: Active-Header-Links 插件 | VuePress
---

# [@vuepress/plugin-active-header-links](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-active-header-linksd)

> 页面滚动时自动更新标题链接的插件
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

