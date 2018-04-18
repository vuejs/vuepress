---
sidebar: auto
---

# 默认主题

::: tip
所有列在这一页的选项仅对默认的主题生效。如果你在使用一个自定义主题，选项可能会有不同。
:::

## 首页

默认的主题提供了一个首页（Homepage）的布局 (用于 [这个网站的主页](/zh/))。想要使用它，需要在你的根级 `README.md` 的 [YAML front matter](../guide/markdown.md#yaml-front-matter) 指定 `home: true`。以下是这个网站实际使用的数据：

``` yaml
---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

任何 `YAML front matter` 之后额外的内容将会以普通的 markdown 被渲染，并插入到 `features` 的后面。

## 导航栏

你可以通过 `themeConfig.nav` 增加一些导航链接:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将会显示以 `下拉列表` 的方式显示：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

此外，你还可以通过嵌套的 `items` 来在 `下拉列表` 中设置分组：

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```

## 侧边栏

想要使 侧边栏（Sidebar）生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
```

你可以省略 `.md` 拓展名，同时以 `/` 结尾的路径将会被视为 `*/README.md`，这个链接的文字将会被自动获取到（无论你是声明为页面的第一个 header，还是明确地在 `YAML front matter` 中指定页面的标题）。如果你想要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组。

### 嵌套的标题链接

默认情况下，侧边栏会自动地显示由当前页面标的题（headers）组成的的链接，并按照页面本身的结构进行嵌套，你可以通过 `themeConfig.sidebarDepth` 来修改它的行为。默认的深度是 `1`，它将提取到 `h2` 的标题，设置成 `0` 将会禁用标题（headers）链接，同时，最大的深度为 `2`，它将同时提取 `h2` 和 `h3` 标题。

也可以使用 `YAML front matter` 来为某个页面重写此值：

``` md
---
sidebarDepth: 2
---
```

### 侧边栏分组

你可以通过使用**对象**来将侧边栏划分成多个组：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
```

侧边栏的每个子组默认是可折叠的，你可以设置 `collapsable: false` 来让一个组永远都是展开状态。

### 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构：

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

接着，遵循以下的侧边栏配置：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      // sidebar for pages under /foo/
      '/foo/': [
        '',
        'one',
        'two'
      ],
      // sidebar for pages under /bar/
      '/bar/': [
        '',
        'three',
        'four'
      ]
    }
  }
}
```

### 自动生成侧栏

如果你希望自动生成一个仅仅包含了当前页面标题（headers）链接的侧边栏，你可以通过 `YAML front matter` 来实现：

``` yaml
---
sidebar: auto
---
```

### 禁用侧边栏

你可以通过 `YAML front matter` 来禁用指定页面的侧边栏：

``` yaml
---
sidebar: false
---
```

## 上 / 下一篇链接

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。你也可以使用 `YAML front matter` 来明确地重写或者禁用它：

``` yaml
---
prev: ./some-other-page
next: false
---
```

## Github 和编辑链接

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 `"Edit this page"` 链接。

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'vuejs/vuepress',
    // 当你的文档不是仓库的根目录时需要设置
    docsDir: 'docs',
    // 可选的, 默认是  master
    docsBranch: 'master',
    // 默认是 true, 设置为 false 来禁用
    editLinks: true
  }
}
```

## 简单的 CSS 覆盖

如果你只是希望应用一些简单的 overrides 到默认主题的样式上，你可以创建一个 `.vuepress/override.styl` 文件，这是一个 [Stylus](http://stylus-lang.com/) 文件，但是你仍然可以使用普通的 CSS 语法。

这里有一些你可以调整的颜色变量：

``` stylus
// showing default values
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```

## 特定页面的自定义布局

默认情况下，每个 `*.md` 文件将会被渲染在一个 `<div class="page">` 容器中，同时还有侧边栏、自动生成的编辑链接，以及上 / 下一篇文章的链接。如果你想要使用一个完全自定义的组件来代替当前的页面（而只保留导航栏），你可以再次使用 `YAML front matter` 来指定这个组件。

``` yaml
---
layout: SpecialLayout
---
```

这将会为当前的页面渲染 `.vuepress/components/SpecialLayout/vue` 布局。
