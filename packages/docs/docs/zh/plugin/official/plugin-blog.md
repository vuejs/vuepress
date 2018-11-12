---
title: blog
---

# @vuepress/plugin-blog

> 博客插件

## 安装

```bash
yarn add -D @vuepress/plugin-blog
# OR npm install -D @vuepress/plugin-blog
```

## 使用

```javascript
module.exports = {
  plugins: ['@vuepress/blog'] 
}
```

## 选项

### postsDir

- 类型: `string`
- 默认值: `_posts`

### categoryIndexPageUrl

- 类型: `string`
- 默认值: `/category/`

### tagIndexPageUrl

- 类型: `string`
- 默认值: `/tag/`

### permalink

- 类型: `string`
- 默认值: `/:year/:month/:day/:slug`

为博客文章设置永久链接。详情参考 [Permalinks](/zh/guide/permalinks.html#模板变量)。
