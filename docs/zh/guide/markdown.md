---
meta:
- name: keywords
  content: static docs generator vue
---

# Markdown 拓展

## Header Anchors

所有的标题将会自动地应用 anchor 链接，anchor 的渲染可以通过 [`markdown.anchor`](../config/#markdownanchor) 来配置。

## 链接

- 内部的、并以 `.md` or `.html` 结尾的链接，将会被转换成 `<router-link>` 用于 SPA 导航。

  - [首页](/zh/)
  - [Markdown 的配置](../config/#markdown)

- 外部的链接将会被自动地设置为  `target="_blank"`:

  - [vuejs.org](https://vuejs.org)
  - [VuePress on GitHub](https://github.com/vuejs/vuepress)

## YAML Front Matter

VuePress 提供了对 [YAML front matter](https://jekyllrb.com/docs/frontmatter/) 开箱即用的支持:

``` yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

这些数据可以在当前页的正文中使用，在任意的自定义或主题组件中，它可以通过 `$page` 来访问。

`title` 和 `lang` 的 meta 将会被自动地注入到当前的页面中，当然你也可以指定一些额外需要注入的 meta：

``` yaml
---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---
```

## GitHub 风格的表格

**Input**

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

**Output**

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Emoji

**Input**

```
:tada: :100:
```

**Output**

:tada: :100:

## 目录

**Input**

```
[[toc]]
```

**Output**

[[toc]]

目录（Table of Contents）的渲染可以通过  [`markdown.toc`](../config/#markdowntoc) 选项来配置。

## 自定义容器

**Input**

```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
```

**Output**

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous thing
:::

你也可以自定义块中的标题：

```
::: danger STOP
Danger zone, do not proceed
:::
```

::: danger STOP
Danger zone, do not proceed
:::

## 代码块中的行高亮

**Input**

````
``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 进阶配置

VuePress 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来渲染 Markdown，上述大多数的拓展也都是通过自定义的插件实现的。想要进一步的话，你可以通过 `.vuepress/config.js` 的 `markdown` 选项，来对当前的 `markdown-it` 实例做一些自定义的配置：

``` js
module.exports = {
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    config: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```
