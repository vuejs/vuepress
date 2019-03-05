---
title: active-header-links
metaTitle: 页面滚动时自动激活侧边栏链接的插件 | VuePress
---

# [@vuepress/plugin-active-header-links](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-active-header-links)

> 页面滚动时自动激活侧边栏链接的插件

## 安装

```bash
yarn add -D @vuepress/plugin-active-header-links@next
# OR npm install -D @vuepress/plugin-active-header-links@next
```

## 使用

```javascript
module.exports = {
  plugins: ['@vuepress/active-header-links']
}
```

## 选项

### sidebarLinkSelector

- 类型: `string`
- 默认值: `.sidebar-link`

### headerAnchorSelector

- 类型: `string`
- 默认值: `.header-anchor`
