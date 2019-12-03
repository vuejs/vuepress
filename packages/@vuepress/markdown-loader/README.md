# @vuepress/markdown-loader

> markdown-loader for VuePress

## Usage

```js
const rule = config.module
    .rule('markdown')
      .test(/\.md$/)

rule
  .use('vue-loader')
    .loader('vue-loader')
    .options({ /* ... */ })

rule
  .use('markdown-loader')
    .loader(require.resolve('@vuepress/markdown-loader'))
    .options({
       markdown: /* instance created by @vuepress/markdown */,
       sourceDir: /* root source directory of your docs */,
    })
```
