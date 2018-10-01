# @vuepress/plugin-pagination

> pagination plugin for vuepress

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/pagination'] 
}
```

## postsFilter

- Type: `function`
- Default:

```js
(({ type }) => type === 'post')`
```

## postsSorter

- Type: `function`
- Default:

```js
((prev, next) => {
  const prevTime = new Date(prev.frontmatter.date).getTime()
  const nextTime = new Date(next.frontmatter.date).getTime()
  return prevTime - nextTime > 0 ? -1 : 1
})
```
