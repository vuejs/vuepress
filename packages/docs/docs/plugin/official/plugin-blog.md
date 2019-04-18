---
title: blog
metaTitle: Blog Plugin | VuePress
---

# [@vuepress/plugin-blog](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-blog)

> Blog plugin

## Install

```bash
yarn add -D @vuepress/plugin-blog@next
# OR npm install -D @vuepress/plugin-blog@next
```

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/blog'] 
}
```

## Options

### postsDir

- Type: `string`
- Default: `_posts`

### categoryIndexPageUrl

- Type: `string`
- Default: `/category/`

### tagIndexPageUrl

- Type: `string`
- Default: `/tag/`

### permalink

- Type: `string`
- Default: `/:year/:month/:day/:slug`

Configures the permalink generated for blog posts. See [Permalinks](/guide/permalinks.html#template-variables) for a list of valid variables.
