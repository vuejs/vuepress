---
title: pagination
---

# @vuepress/plugin-pagination

> pagination plugin

## Install

```bash
yarn add -D @vuepress/plugin-pagination
# OR npm install -D @vuepress/plugin-pagination
```

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/pagination'] 
}
```

## Options

### postsFilter

- Type: `function`
- Default:

```js
(({ type }) => type === 'post')`
```

### postsSorter

- Type: `function`
- Default:

```js
((prev, next) => {
  const prevTime = new Date(prev.frontmatter.date).getTime()
  const nextTime = new Date(next.frontmatter.date).getTime()
  return prevTime - nextTime > 0 ? -1 : 1
})
```
