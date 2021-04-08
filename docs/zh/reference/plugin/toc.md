# toc

> [@vuepress/plugin-toc](https://www.npmjs.com/package/@vuepress/plugin-toc)

该插件会提供一个目录 (table-of-contents, TOC) 组件。

## 与 Markdown 目录语法的区别

与 [Markdown 目录语法](../../guide/markdown.md#目录) 类似，该插件提供的目录组件可以直接在你的 Markdown 内容中使用：

```md
<!-- Markdown 目录语法 -->
[[toc]]

<!-- Vue 目录组件 -->
<Toc />
```

在 Build 模式中，它们都可以被正确地预渲染。然而，它们之间存在一些区别。

Markdown 语法 `[[toc]]` 仅能在 Markdown 文件中使用。它是由 markdown-it 解析的，生成的目录是静态内容。

组件 `<Toc/>` 既可以用在 Markdown 文件中，也可以用在 Vue 文件中。它是由 Vue 加载的，生成的目录是一个 Vue 组件。

该插件可以和 [@vuepress/plugin-active-header-links](./active-header-links.md) 协同工作，你只需要将 [headerLinkSelector](./active-header-links.md#headerlinkselector) 与该插件的 `linkClass` 匹配即可。当页面滚动至某个标题锚点后，对应的链接就会被加上 `linkActiveClass` 类名。

因此，该插件对于主题开发者来说更为有用。

## 配置项

### componentName

- 类型： `string`

- 默认值： `Toc`

- 详情：

  指定目录组件的名称。

### defaultPropsOptions

- 类型： `Partial<TocPropsOptions>`

- 默认值： `{}`

- 详情：

  覆盖组件 [options](#options) Prop 的默认值。

## 组件 Props

目录组件可以通过 Props 来进行自定义。

```vue
<template>
  <Toc :headers="headers" :options="options" />
</template>
```

### headers

- 类型： `PageHeader[]`

```ts
interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}
```

- 详情：

  指定要渲染的标题数组。

  如果该 Prop 没有被设置，默认会使用当前页面的标题。

### options

- 类型： `Partial<TocPropsOptions>`

```ts
interface TocPropsOptions {
  containerTag: string
  containerClass: string
  listClass: string
  itemClass: string
  linkTag: 'a' | 'RouterLink'
  linkClass: string
  linkActiveClass: string
  linkChildrenActiveClass: string
}
```

- 默认值：

  下列默认值可以用过 [defaultPropsOptions](#defaultpropsoptions) 来覆盖：

```ts
const defaultOptions = {
  containerTag: 'nav',
  containerClass: 'vuepress-toc',
  listClass: 'vuepress-toc-list',
  itemClass: 'vuepress-toc-item',
  linkTag: 'RouterLink',
  linkClass: 'vuepress-toc-link',
  linkActiveClass: 'active',
  linkChildrenActiveClass: 'active',
}
```

- 详情：

  自定义目录组件。

  如果 `containerTag` 设置为空字符串 `''` ，那么最外层的 `<nav>` Container 会被完全移除。

- 示例：

  使用默认 options 的目录组件的渲染结果类似以下结构：

```vue
<template>
  <!-- container -->
  <nav class="vuepress-toc">
    <!-- list -->
    <ul class="vuepress-toc-list">
      <!-- item -->
      <li class="vuepress-toc-item">
        <!-- link -->
        <RouterLink class="vuepress-toc-link" to="#foo">Foo</RouterLink>
      </li>
      <!-- item with children -->
      <li class="vuepress-toc-item">
        <!-- link (children active) -->
        <RouterLink class="vuepress-toc-link active" to="#bar">Bar</RouterLink>
        <!-- list (children) -->
        <ul class="vuepress-toc-list">
          <!-- item -->
          <li class="vuepress-toc-item">
            <!-- link (active) -->
            <RouterLink class="vuepress-toc-link active" to="#bar-child">Bar Child</RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
```
