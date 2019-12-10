# 默认主题配置

::: tip
本页所列的选项仅对默认主题生效。如果你在使用一个自定义主题，选项可能会有不同。
:::

## 首页

默认的主题提供了一个首页（Homepage）的布局 (用于 [这个网站的主页](../README.md))。想要使用它，需要在你的根级 `README.md` 的 [YAML front matter](../guide/markdown.md#front-matter) 指定 `home: true`。以下是一个如何使用的例子：

``` yaml
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
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

你可以将相应的内容设置为 `null` 来禁用标题和副标题。

任何 `YAML front matter` 之后额外的内容将会以普通的 markdown 被渲染，并插入到 `features` 的后面。

## 导航栏

导航栏可能包含你的页面标题、[搜索框](#搜索框)、 [导航栏链接](#导航栏链接)、[多语言切换](../guide/i18n.md)、[仓库链接](#git-仓库和编辑链接)，它们均取决于你的配置。

### 导航栏 Logo

你可以通过 `themeConfig.logo` 增加导航栏 Logo ，Logo 可以被放置在[公共文件目录](../guide/assets.md#public-files)：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png',
  }
}
```

### 导航栏链接

你可以通过 `themeConfig.nav` 增加一些导航栏链接:

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
外部链接 `<a>` 标签的特性将默认包含`target="_blank" rel="noopener noreferrer"`，你可以提供 `target` 与 `rel`，它们将被作为特性被增加到 `<a>` 标签上：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'External', link: 'https://google.com', target:'_self', rel:'' },
      { text: 'Guide', link: '/guide/', target:'_blank' }
    ]
  }
}
```

当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将显示为一个 `下拉列表` ：

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
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

### 禁用导航栏

你可以使用 `themeConfig.navbar` 来禁用所有页面的导航栏：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
```

你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏：

``` yaml
---
navbar: false
---
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

默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `themeConfig.sidebarDepth` 来修改它的行为。默认的深度是 `1`，它将提取到 `h2` 的标题，设置成 `0` 将会禁用标题（headers）链接，同时，最大的深度为 `2`，它将同时提取 `h2` 和 `h3` 标题。

也可以使用 `YAML front matter` 来为某个页面重写此值：

``` md
---
sidebarDepth: 2
---
```

### 显示所有页面的标题链接

默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 `themeConfig.displayAllHeaders` 设置为 `true` 来显示所有页面的标题链接：

``` js
module.exports = {
  themeConfig: {
    displayAllHeaders: true // 默认值：false
  }
}
```

### 活动的标题链接

默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新，这个行为可以通过以下的配置来禁用：

``` js
module.exports = {
  themeConfig: {
    activeHeaderLinks: false, // 默认值：true
  }
}
```

::: tip
值得一提的是，当你禁用此选项时，此功能的相应脚本将不会被加载，这是我们性能优化的一个小点。
:::


### 侧边栏分组

你可以通过使用**对象**来将侧边栏划分成多个组：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',   // 必要的
        path: '/foo/',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
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

一个侧边栏的子组配置同时支持 [sidebarDepth](#nested-header-links) 字段用于重写默认显示的侧边栏深度(`1`)。

::: tip
  嵌套的侧边栏分组 <Badge text="beta"/> 也是支持的，但嵌套深度应小于 3，否则在控制台会收到警告。
:::

### 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构：

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
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
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  }
}
```

::: warning
确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。
:::

### 自动生成侧栏

如果你希望自动生成一个仅仅包含了当前页面标题（headers）链接的侧边栏，你可以通过 `YAML front matter` 来实现：

``` yaml
---
sidebar: auto
---
```

你也可以通过配置来在所有页面中启用它：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
```

在 [多语言](../guide/i18n.md) 模式下, 你也可以将其应用到某一特定的语言下：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
     '/zh/': {
       sidebar: 'auto'
     }
  }
}
```

### 禁用侧边栏

你可以通过 `YAML front matter` 来禁用指定页面的侧边栏：

``` yaml
---
sidebar: false
---
```

## 搜索框

### 内置搜索

你可以通过设置 `themeConfig.search: false` 来禁用默认的搜索框，或是通过 `themeConfig.searchMaxSuggestions` 来调整默认搜索框显示的搜索结果数量：

``` js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

你可以通过 `YAML front matter` 来对单独的页面禁用内置的搜索框：

```yaml
---
search: false
---
```

::: tip
内置搜索只会为页面的标题、`h2` 和 `h3` 构建搜索索引，如果你需要全文搜索，你可以使用 [Algolia 搜索](#Algolia-搜索)。
:::

### Algolia 搜索

你可以通过 `themeConfig.algolia` 选项来用 [Algolia 搜索](https://community.algolia.com/docsearch/) 替换内置的搜索框。要启用 Algolia 搜索，你需要至少提供 `apiKey` 和 `indexName`：

```js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
```

::: warning 注意
不同于开箱即用的 [内置搜索](#内置搜索)，[Algolia 搜索](https://community.algolia.com/docsearch/) 需要你在使用之前将你的网站提交给它们用于创建索引。
:::

更多选项请参考 [Algolia DocSearch 的文档](https://github.com/algolia/docsearch#docsearch-options)。

## 最后更新时间

你可以通过 `themeConfig.lastUpdated` 选项来获取每个文件最后一次 `git` 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部：

``` js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

请注意，`themeConfig.lastUpdated` 默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：`Last Updated`）。

::: warning 使用须知
  由于 `lastUpdated` 是基于 `git` 的, 所以你只能在一个基于 `git` 的项目中启用它。此外，由于使用的时间戳来自 git commit，因此它将仅在给定页的第一次提交之后显示，并且仅在该页面后续提交更改时更新。
:::

**拓展阅读:**

- [@vuepress/plugin-last-updated](../plugin/official/plugin-last-updated.md)

## 上 / 下一篇链接

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。

你可以通过 `themeConfig.nextLinks` 和 `themeConfig.prevLinks` 来全局禁用它们：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: false,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: false
  }
}
```

你也可以使用 `YAML front matter` 来明确地重写或者禁用它们：

``` yaml
---
prev: ./some-other-page
next: false
---
```

## Git 仓库和编辑链接

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 `"Edit this page"` 链接。

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'vuejs/vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  }
}
```

你可以通过 `YAML front matter` 来禁用指定页面的编辑链接：

``` yaml
---
editLink: false
---
```

## 页面滚动 <Badge text="1.2.0+" />

你可以通过 `themeConfig.smoothScroll` 选项来启用页面滚动效果。

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    smoothScroll: true
  }
}
```

## 自定义页面类

有时候你可能需要为特定页面添加一个 CSS 类名，以方便针对该页面添加一些专门的 CSS。这种情况下你可以在该页面的 YAML front matter 中声明一个 `pageClass`：

``` yaml
---
pageClass: custom-page-class
---
```

然后你就可以写专门针对该页面的 CSS 了：

``` css
/* .vuepress/override.styl */

.theme-container.custom-page-class {
  /* 特定页面的 CSS */
}
```

## 特定页面的自定义布局

默认情况下，每个 `*.md` 文件将会被渲染在一个 `<div class="page">` 容器中，同时还有侧边栏、自动生成的编辑链接，以及上 / 下一篇文章的链接。如果你想要使用一个完全自定义的组件来代替当前的页面（而只保留导航栏），你可以再次使用 `YAML front matter` 来指定这个组件。

``` yaml
---
layout: SpecialLayout
---
```

这将会为当前的页面渲染 `.vuepress/components/SpecialLayout.vue` 布局。
