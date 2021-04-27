# Frontmatter

<NpmBadge package="@vuepress/theme-default" />

## 所有页面

本章节中的 Frontmatter 会在所有类型的页面中生效。

### navbar

- 类型： `boolean`

- 详情：

  是否在当前页面展示导航栏。

  如果你在主题配置中禁用了导航栏，那么该 Frontmatter 将不会生效。

- 参考：
  - [默认主题 > 配置 > navbar](./config.md#navbar)

### pageClass

- 类型： `string`

- 详情：

  为当前页面添加额外的类名。

- 示例：

```md
---
pageClass: custom-page-class
---
```

然后你可以在 `.vuepress/styles/index.scss` 文件中为这个页面添加自定义样式：

```scss
.theme-container.custom-page-class {
  /* 页面样式 */
}
```

- 参考：
  - [默认主题 > 样式 > Style 文件](./styles.md#style-文件)

## 首页

本章节中的 Frontmatter 只会在首页中生效。

### home

- 类型： `boolean`

- 详情：

  设定该页面是首页还是普通页面。

  如果你不设置该 Frontmatter 或将其设为 `false` ，则该页面会是一个 [普通页面](#普通页面)

- 示例：

  ```md
  ---
  home: true
  ---
  ```

### heroImage

- 类型： `string`

- 详情：

  首页图片的 URL 。

- 示例：

  ```md
  ---
  # Public 文件路径
  heroImage: /images/hero.png
  # URL
  heroImage: https://vuejs.org/images/logo.png
  ---
  ```

- 参考：
  - [指南 > 静态资源 > Public 文件](../../guide/assets.md#public-文件)

### heroAlt

- 类型： `string`

- 详情：

  首页图片的 `alt` 属性。

  如果不设置，则默认使用 [heroText](#heroText) 。

### heroText

- 类型： `string | null`

- 详情：

  首页的大标题。

  如果不设置，则默认使用站点 [title](../config.md#title) 。

  设置为 `null` 来禁用首页大标题。

### tagline

- 类型： `string | null`

- 详情：

  首页的标语。

  如果不设置，则默认使用站点 [description](../config.md#description) 。

  设置为 `null` 来禁用首页标语。

### actions

- 类型：

```ts
Array<{
  text: string
  link: string
  type?: 'primary' | 'secondary'
}>
```

- 详情：

  配置首页按钮。

- 示例：

```md
---
actions:
  - text: 快速上手
    link: /zh/guide/getting-started.html
    type: primary
  - text: 项目简介
    link: /guide/
    type: secondary
---
```

### features

- 类型：

```ts
Array<{
  title: string
  details: string
}>
```

- 详情：

  配置首页特性列表。

- 示例：

```md
---
features:
  - title: 简洁至上
    details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  - title: Vue 驱动
    details: 享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
  - title: 高性能
    details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
---
```

### footer

- 类型： `string`

- 详情：

  首页的页脚。

### footerHtml

- 类型： `boolean`

- 详情：

  是否允许页脚中使用 HTML 。

  如果设置为 `true` ，那么 [footer](#footer) 会被作为 HTML 代码处理。

## 普通页面

本章节中的 Frontmatter 只会在普通页面中生效。

### editLink

- 类型： `boolean`

- 详情：

  是否在本页面中启用 _编辑此页_ 链接。

- 参考：
  - [默认主题 > 配置 > editLink](./config.md#editlink)

### lastUpdated

- 类型： `boolean`

- 详情：

  是否在本页面中启用 _最近更新时间戳_ 。

- 参考：
  - [默认主题 > 配置 > lastUpdated](./config.md#lastupdated)

### contributors

- 类型： `boolean`

- 详情：

  是否在本页面中启用 _贡献者列表_ 。

- 参考：
  - [默认主题 > 配置 > contributors](./config.md#contributors)

### sidebar

- 类型： `false | 'auto' | SidebarConfigArray | SidebarConfigObject`

- 详情：

  配置本页面的侧边栏。

- 参考：
  - [默认主题 > 配置 > sidebar](./config.md#sidebar)

### sidebarDepth

- 类型： `number`

- 详情：

  配置本页面的侧边栏深度。

- 参考：
  - [默认主题 > 配置 > sidebarDepth](./config.md#sidebardepth)

### prev

- 类型： `NavLink | string`

- 详情：

  上一个页面的链接。

  如果你不设置该 Frontmatter ，该链接会自动根据侧边栏配置进行推断。

  为了手动配置上一页面的链接，你可以将其设置为一个 `NavLink` 对象或者一个字符串：

  - `NavLink` 对象应该有一个 `text` 字段和一个 `link` 字段。
  - 字符串应为目标页面文件的路径。它将会被转换为 `NavLink` 对象，将页面标题作为 `text` ，将页面路由路径作为 `link` 。

- 示例：

```md
---
# NavLink
prev:
  text: Get Started
  link: /guide/getting-started.html

# NavLink - 外部 URL
prev:
  text: GitHub
  link: https://github.com

# 字符串 - 页面文件路径
prev: /guide/getting-started.md

# 字符串 - 页面文件相对路径
prev: ../../guide/getting-started.md
---
```

### next

- 类型： `NavLink | string`

- 详情：

  下一个页面的链接。

  如果你不设置该 Frontmatter ，该链接会自动根据侧边栏配置进行推断。

  类型和 [prev](#prev) Frontmatter 相同。
