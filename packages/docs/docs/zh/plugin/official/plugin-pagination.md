---
title: pagination
metaTitle: Pagination 插件 | VuePress
---

# [@vuepress/plugin-pagination](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-pagination)

> 分页器插件

## 安装

```bash
yarn add -D @vuepress/plugin-pagination@next
# OR npm install -D @vuepress/plugin-pagination@next
```

## 使用

```javascript
module.exports = {
  plugins: ['@vuepress/pagination'] 
}
```

## 选项

### postsFilter

- 类型: `function`
- 默认值:

```js
(({ type }) => type === 'post')`
```

### postsSorter

- 类型: `function`
- 默认值:

```js
((prev, next) => {
  const prevTime = new Date(prev.frontmatter.date).getTime()
  const nextTime = new Date(next.frontmatter.date).getTime()
  return prevTime - nextTime > 0 ? -1 : 1
})
```
