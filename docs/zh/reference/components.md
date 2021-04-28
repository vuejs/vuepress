# 内置组件

<NpmBadge package="@vuepress/client" />

## ClientOnly

- 使用：

```md
<ClientOnly>
  <NonSsrFriendlyComponent />
</ClientOnly>
```

- 详情：

  该组件和它的子元素只会在客户端被渲染。也就是说，它不会在构建 (SSR) 过程中被渲染到 HTML 内。

  如果一个组件在 `setup()` 中直接使用 浏览器 / DOM API ，它会导致构建过程报错，因为这些 API 在 Node.js 的环境中是无法使用的。在这种情况下，你可以选择一种方式：

  - 修改这个组件，只在  `onBeforeMount()` 或 `onMounted()` Hook 中使用 浏览器 / DOM API 。
  - 使用 `<ClientOnly>` 包裹这个组件。

## Content

- Props:
  - pageKey
    - 类型： `string`
    - 是否必须： `false`

- 使用：

```md
<Content page-key="v-xxxxxx" />
```

- 详情：

  该组件会渲染页面的 Markdown 内容。

  页面 Key 是页面路由的 [name](https://next.router.vuejs.org/zh/api/#name-2) 。如果没有传入 `pageKey` Prop ，它会渲染当前路由下的页面。

  该组件主要是为了开发主题时使用。在绝大多数情况下你不会用到它。

## OutboundLink

- 使用：

```md
<OutboundLink />
```

- 详情：

  该组件会渲染一个标识外部 URL 链接的图标。

  该组件主要是为了开发主题时使用。在绝大多数情况下你不会用到它。
