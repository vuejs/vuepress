# Markdown 插槽

VuePress 实现了一套针对 Markdown 的内容分发 API。通过这个特性，你可以将你的文档分割成多个片段，以便于在布局组件中灵活组合。

## 为什么需要 Markdown 插槽

首先，我们回顾一下布局组件和 Markdown 文件之间的关系：

<diagram-markdown-slot-relationship/>

Markdown 文件是元数据（页面内容、配置等）的提供者，而布局组件负责消费他们。我们可以通过 frontmatter 来定义一些普通数据类型的元数据，但对于 Markdown / HTML 这种涉及到编译前后差异的复杂元数据，frontmatter 却无能能力。

Markdown 插槽便解决了这一类问题。

## 具名插槽

你可以通过下述的语法来定义一个具名 Markdown 插槽：

``` md
::: slot name

:::
```

在布局组件中利用 `Content` 组件来使用该插槽：

``` vue
<Content slot-key="name"/>
```

::: tip 提示
这里我们使用的是 `slot-key` 而不是 `slot`，这是因为在 Vue 中，`slot` 是一个保留的 `prop` 名。
:::

## 插槽的默认内容

默认情况下，一个 Markdown 文件中的普通内容将会成为 Markdown 插槽的默认内容，你可以直接使用 `Content` 组件来访问它：

``` vue
<Content/>
```

## 例子

假设你的布局组件如下：

``` vue
<template>
  <div class="container">
    <header>
      <Content slot-key="header"/>
    </header>
    <main>
      <Content/>
    </main>
    <footer>
      <Content slot-key="footer"/>
    </footer>
  </div>
</template>
```

如果一个页面的 `markdown` 的内容是这样：

```md
::: slot header
# Here might be a page title
:::

- A Paragraph
- Another Paragraph

::: slot footer
Here's some contact info
:::
```

那么这一页最终被渲染出的 HTML 将会是：

```html
<div class="container">
  <header>
    <div class="content header">
      <h1>Here might be a page title</h1>
    </div>
  </header>
  <main>
    <div class="content default">
      <ul>
        <li>A Paragraph</li>
        <li>Another Paragraph</li>
      </ul>
    </div>
  </main>
  <footer>
    <div class="content footer">
      <p>Here's some contact info</p>
    </div>
  </footer>
</div>
```

请注意：

1. 和 Vue 本身提供的 slot 机制不太相同，每个 Content 分发的内容都会被一个 div 所包裹，其 class 是 content 和 slot 的名字。
2. 请确保所定义的 slot 的唯一性。
