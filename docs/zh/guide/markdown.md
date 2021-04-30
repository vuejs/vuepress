# Markdown

在阅读本章节之前，请确保你已经对 Markdown 有所了解。如果你还不了解 Markdown ，请先学习一些 [Markdown 教程](https://commonmark.org/help/)。

## 语法扩展

VuePress 会使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 [语法扩展](https://github.com/markdown-it/markdown-it#syntax-extensions) 。

本章节将会介绍 VuePress 内置支持的 Markdown 语法扩展。

你也可以通过 [markdown](../reference/config.md#markdown) 和 [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) 来配置这些内置扩展、加载更多 markdown-it 插件、实现你自己的扩展等。

### 内置

由 markdown-it 内置支持：

- [表格](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [删除线](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

### 标题锚点

你可能已经注意到，当你把鼠标放在各个章节的标题上时，会显示出一个 `#` 锚点。点击这个 `#` 锚点，可以直接跳转到对应章节。

::: tip
标题锚点扩展由 [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) 支持。

配置参考： [markdown.anchor](../reference/config.md#markdown-anchor)
:::

### 链接

在你使用 Markdown 的 [链接语法](https://spec.commonmark.org/0.29/#link-reference-definitions) 时， VuePress 会为你进行一些转换。

以我们文档的源文件为例：

```bash
└─ docs
   └─ zh
      ├─ guide
      │  ├─ getting-started.md
      │  ├─ markdown.md    # <- 我们在这里
      │  └─ README.md
      ├─ reference
      │  └─ config.md
      └─ README.md
```

**原始 Markdown**

```md
<!-- 相对路径 -->
[首页](../README.md)  
[配置参考](../reference/config.md)  
[快速上手](./getting-started.md)  
<!-- 绝对路径 -->
[指南](/zh/guide/README.md)  
[配置参考 > markdown.links](/zh/reference/config.md#links)  
<!-- URL -->
[GitHub](https://github.com) 
```

**转换为**

```vue
<template>
  <RouterLink to="/zh/">首页</RouterLink>
  <RouterLink to="/zh/reference/config.html">配置参考</RouterLink>
  <RouterLink to="/zh/guide/getting-started.html">快速上手</RouterLink>
  <RouterLink to="/zh/guide/">指南</RouterLink>
  <RouterLink to="/zh/reference/config.html#links">配置参考 &gt; markdown.links</RouterLink>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub<OutboundLink/></a>
</template>
```

**渲染为**

[首页](../README.md)  
[配置参考](../reference/config.md)  
[快速上手](./getting-started.md)  
[指南](/zh/guide/README.md)  
[配置参考 > markdown.links](/zh/reference/config.md#links)  
[GitHub](https://github.com) 

**解释**

- 内部链接会被转换为 `<RouterLink>` 以便进行 SPA 导航。
- 指向 `.md` 文件的内部链接会被转换为目标页面的 [路由路径](./page.md#路由)，并且支持绝对路径和相对路径。
- 外部链接会被添加 `target="_blank" rel="noopener noreferrer"` 属性和一个 <OutboundLink /> 标记。

**建议**

对于内部链接，尽可能使用相对路径而不是绝对路径。

- 相对路径是指向目标文件的有效链接，在你的编辑器或者代码仓库中浏览源文件时也可以正确跳转。
- 相对路径在不同 locales 下都是一致的，这样在翻译你的内容时就不需要修改 locale 路径了。
- 在使用绝对路径时，如果你站点的 [base](../reference/config.md#base) 不是 `"/"`，你需要手动添加 `base` 或者使用 [base helper](./assets.md#base-helper) 。

::: tip
链接扩展是由我们的内置插件支持的。

配置参考： [markdown.links](../reference/config.md#markdown-links)

参考: [內置组件 > OutboundLink](../reference/components.md#outboundlink)
:::

### Emoji :tada:

你可以在你的 Markdown 内容中输入 `:EMOJICODE:` 来添加 Emoji 表情。

前往 [emoji-cheat-sheet.com](https://emoji-cheat-sheet.com/) 来查看所有可用的 Emoji 表情和对应代码。

**输入**

```md
VuePress 2 已经发布 :tada: ！
```

**输出**

VuePress 2 已经发布 :tada: ！

::: tip
Emoji 扩展由 [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji) 支持。

配置参考： [markdown.emoji](../reference/config.md#markdown-emoji)
:::

### 目录

如果你想要把当前页面的目录添加到 Markdown 内容中，你可以使用 `[[toc]]` 语法。

**输入**

```md
[[toc]]
```

**输出**

[[toc]]

目录中的标题将会链接到对应的 [标题锚点](#标题锚点)，因此如果你禁用了标题锚点，可能会影响目录的功能。

::: tip
目录扩展是由我们的内置插件支持的，该扩展 Fork 并修改自  [markdown-it-toc-done-right](https://github.com/nagaozen/markdown-it-toc-done-right)。


配置参考： [markdown.toc](../reference/config.md#markdown-toc)
:::

### 代码块

下列代码块扩展是在 Node 端进行 Markdown 解析的时候实现的。这意味着代码块并不会在客户端被处理。

#### 行高亮

你可以在代码块添加行数范围标记，来为对应代码行进行高亮：

**输入**

````md
```ts{1,6-8}
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: '你好， VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```
````

**输出**

```ts{1,6-8}
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: '你好， VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```

行数范围标记的例子：

- 行数范围： `{5-8}`
- 多个单行： `{4,7,9}`
- 组合： `{4,7-13,16,23-27,40}`

::: tip
行高亮扩展是由我们的内置插件支持的，该扩展 Fork 并修改自  [markdown-it-highlight-lines](https://github.com/egoist/markdown-it-highlight-lines)。

配置参考： [markdown.code.highlightLines](../reference/config.md#markdown-code-highlightlines)
:::

#### 行号

你肯定已经注意到在代码块的最左侧会展示行号。这个功能是默认启用的，你可以通过配置来禁用它。

你可以在代码块添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖配置项中的设置。

**输入**

````md
```ts
// 行号默认是启用的
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// 行号被禁用
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
````

**输出**

```ts
// 行号默认是启用的
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// 行号被禁用
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

::: tip
行号扩展是由我们的内置插件支持的。

配置参考： [markdown.code.lineNumbers](../reference/config.md#markdown-code-linenumbers)
:::

#### 添加 v-pre

由于 [模板语法可以在 Markdown 中使用](#模板语法)，它也同样可以在代码块中生效。

为了避免你的代码块被 Vue 编译， VuePress 默认会在你的代码块添加 [v-pre](https://v3.vuejs.org/api/directives.html#v-pre) 指令。这一默认行为可以在配置中关闭。


你可以在代码块添加 `:v-pre` / `:no-v-pre` 标记来覆盖配置项中的设置。

::: warning
模板语法的字符有可能会被语法高亮器解析，比如 "Mustache" 语法（即双花括号）。因此，就像下面的例子一样，在某些语言中 `:no-v-pre` 可能并不能生效。

如果你无论如何都想在这种语言中使用 Vue 语法，你可以尝试禁用默认的语法高亮，然后在客户端实现你的自定义代码高亮。
:::

**输入**

````md
```md
<!-- 默认情况下，这里会被保持原样 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- 这里会被 Vue 编译 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```js:no-v-pre
// 由于 JS 代码高亮，这里不会被正确编译
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```
````

**输出**

```md
<!-- 默认情况下，这里会被保持原样 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- 这里会被 Vue 编译 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

<!--
在 JS 代码块上使用 :no-v-pre 的话，会在使用 shiki 时遇到一些潜在的问题，所以这里
我们实际上没有使用 :no-v-pre ，只是作为一个错误用法的示例。
-->

```js
// 由于 JS 代码高亮，这里不会被正确编译
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```

::: tip
v-pre 扩展是由我们的内置插件支持的。

配置参考： [markdown.code.vPre](../reference/config.md#markdown-vpre)
:::

### 导入代码块

你可以使用下面的语法，从文件中导入代码块：

```md
<!-- 最简单的语法 -->
@[code](../foo.js)
```

如果你只想导入这个文件的一部分：

```md
<!-- 仅导入第 1 行至第 10 行 -->
@[code{1-10}](../foo.js)
```

代码语言会根据文件扩展名进行推断，但我们建议你显式指定：

```md
<!-- 指定代码语言 -->
@[code js](../foo.js)
```

实际上，`[]` 内的第二部分会被作为代码块标记来处理，因此在上面 [代码块](#代码块) 章节中提到的语法在这里都可以支持：

```md
<!-- 行高亮 -->
@[code js{2,4-5}](../foo.js)
```

下面是一个复杂的例子：

- 导入 `'../foo.js'` 文件的第 3 行至第 10 行
- 指定语言为 `'js'`
- 对导入代码的第 3 行进行高亮，即 `'../foo.js'` 文件的第 5 行
- 禁用行号

```md
@[code{3-10} js{3}:no-line-numbers](../foo.js)
```

需要注意的是，路径别名在导入代码语法中不会生效。你可以通过下面的配置来自行处理路径别名：

```js
module.exports = {
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@src/, path.resolve(__dirname, 'path/to/src')),
    },
  },
}
```

```md
<!-- 会被解析至 'path/to/src/foo.js' -->
@[code](@src/foo.js)
```

::: tip
导入代码扩展是由我们的内置插件支持的。

配置参考： [markdown.importCode](../reference/config.md#markdown-importcode)
:::

## 在 Markdown 中使用 Vue

这一章节会介绍 Vue 在 Markdown 中一些基本用法。

可以前往 [Cookbook > Markdown 和 Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md) 来了解更多内容。

### 模板语法

我们知道：

- Markdown 中允许使用 HTML。
- Vue 模板语法是和 HTML 兼容的。

这意味着， Markdown 中允许直接使用 [Vue 模板语法](https://v3.vuejs.org/guide/template-syntax.html)。

**输入**

```md
一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>
```

**输出**

一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>

### 组件

你可以在 Markdown 中直接使用 Vue 组件。

**输入**

```md
这是默认主题内置的 `<Badge />` 组件 <Badge text="演示" />
```

**输出**

这是默认主题内置的 `<Badge />` 组件 <Badge text="演示" />

::: tip
前往 [内置组件](../reference/components.md) 查看所有内置组件。

前往 [默认主题 > 内置组件](../reference/default-theme/components.md) 查看默认主题中的所有内置组件。
:::
