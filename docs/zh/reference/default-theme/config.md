# 配置

<NpmBadge package="@vuepress/theme-default" />

默认主题配置的参考文档，可以通过 [themeConfig](../config.md#themeconfig) 来设置这些配置。

## 基础配置

### locales

- 类型： `{ [path: string]: Partial<DefaultThemeLocaleData> }`

- 默认值： `{}`

- 详情：

  多语言支持的各个语言 locales 。

  所有在 [Locale 配置](#locale-配置) 章节内的配置项都可以在 locales 中使用。

  该配置项仅能在默认主题内生效，注意不要和 [站点配置](../config.md#locales) 中的 `locales` 混淆。

- 参考：
  - [指南 > 多语言支持](../../guide/i18n.md)

## Locale 配置

该章节内的配置项可以作为一般配置使用，也可以使用在 [locales](#locales) 内。

### home

- 类型： `string`

- 默认值： `/`

- 详情：

  首页的路径。

  它将被用于：

  - 导航栏中 Logo 的链接
  - 404 页面的 _返回首页_ 链接

### navbar

- 类型： `false | (NavbarItem | NavbarGroup | string)[]`

- 默认值： `[]`

- 详情：

  导航栏配置。

  设置为 `false` 可以禁用导航栏。

  为了配置导航栏元素，你可以将其设置为 _导航栏数组_ ，其中的每个元素是 `NavbarItem` 对象、 `NavbarGroup` 对象、或者字符串：

  - `NavbarItem` 对象应该有一个 `text` 字段和一个 `link` 字段。
  - `NavbarGroup` 对象应该有一个 `text` 字段和一个 `children` 字段。 `children` 字段同样是一个 _导航栏数组_ 。
  - 字符串应为目标页面文件的路径。它将会被转换为 `NavbarItem` 对象，将页面标题作为 `text` ，将页面路由路径作为 `link` 。

- 示例 1：

```js
module.exports = {
  themeConfig: {
    navbar: [
      // NavbarItem
      {
        text: 'Foo',
        link: '/foo/',
      },
      // NavbarGroup
      {
        text: 'Group',
        children: ['/group/foo.md', '/group/bar.md'],
      },
      // 字符串 - 页面文件路径
      '/bar/README.md',
    ],
  },
}
```

- 示例 2：

```js
module.exports = {
  themeConfig: {
    navbar: [
      // 嵌套 Group - 最大深度为 2
      {
        text: 'Group',
        children: [
          {
            text: 'SubGroup',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
        ],
      },
    ],
  },
}
```

### logo

- 类型： `string`

- 详情：

  Logo 图片的 URL。

  Logo 图片将会显示在导航栏的左端。

- 示例：

```js
module.exports = {
  themeConfig: {
    // Public 文件路径
    logo: '/images/hero.png',
    // URL
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```

- 参考：
  - [指南 > 静态资源 > Public 文件](../../guide/assets.md#public-文件)

### repo

- 类型： `string`

- 详情：

  项目仓库的 URL。

  它将被用作 _仓库链接_ 的链接。_仓库链接_ 将会显示为导航栏的最后一个元素。

```js
module.exports = {
  themeConfig: {
    // 如果你按照 `organization/repository` 的格式设置它
    // 我们会将它作为一个 GitHub 仓库
    repo: 'vuejs/vuepress',
    // 如果你使用的不是 GitHub ，可以直接使用 URL
    repo: 'https://gitlab.com/foo/bar',
  },
}
```

### repoLabel

- 类型： `string`

- 详情：

  项目仓库的标签。

  它将被用作 _仓库链接_ 的文字。_仓库链接_ 将会显示为导航栏的最后一个元素。

  如果你不明确指定该配置项，它将会根据 [repo](#repo) 配置项自动推断。

### selectLanguageText

- 类型： `string`

- 详情：

  _选择语言菜单_ 的文字。

  如果你在站点配置中设置了多个 [locales](../config.md#locales) ，那么 _选择语言菜单_ 就会显示在导航栏中仓库按钮的旁边。

### selectLanguageAriaLabel

- 类型： `string`

- 详情：

  _选择语言菜单_ 的 `aria-label` 属性。

  它主要是为了站点的可访问性 (a11y) 。

### selectLanguageName

- 类型： `string`

- 详情：

  Locale 的语言名称。

  该配置项 **仅能在主题配置的 [locales](#locales) 的内部生效** 。它将被用作 locale 的语言名称，展示在 _选择语言菜单_ 内。

- 示例：

```js
module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectLanguageName: 'English',
      },
      '/zh/': {
        selectLanguageName: '简体中文',
      },
    },
  },
}
```

### sidebar

- 类型： `false | 'auto' | SidebarConfigArray | SidebarConfigObject`

- 默认值： `'auto'`

- 详情：

  侧边栏配置。

  你可以通过页面的 [sidebar](./frontmatter.md#sidebar) frontmatter 来覆盖这个全局配置。

  设置为 `false` 可以禁用侧边栏。

  如果你设置为 `'auto'`，侧边栏会根据页面标题自动生成。

  为了手动配置侧边栏元素，你可以将其设置为 _侧边栏数组_ ，其中的每个元素是 `SidebarItem` 对象、 `SidebarGroup` 对象、或者字符串：

  - `SidebarItem` 对象应该有一个 `text` 字段、一个 `link` 字段和一个 `children` 字段。 `children` 字段是一个由 `SidebarItem` 或者字符串组成的数组。
  - `SidebarGroup` 对象应将 `isGroup` 字段设为 `true` ，并且应该有一个 `text` 字段和一个`children` 字段。 `children` 字段是一个由 `SidebarItem` 或者字符串组成的数组。
  - 字符串应为目标页面文件的路径。它将会被转换为 `SidebarItem` 对象，将页面标题作为 `text` ，将页面路由路径作为 `link` ，并根据页面标题自动生成 `children` 。

  如果你想在不同子路径中使用不同的侧边栏，你可以将该配置项设置为 _侧边栏对象_ ：

  - Key 为路径前缀。
  - Value 为 _侧边栏数组_ 。

- 示例 1：

```js
module.exports = {
  themeConfig: {
    // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    sidebar: [
      // SidebarItem
      {
        text: 'Foo',
        link: '/foo/',
        children: [
          // SidebarItem
          {
            text: 'github',
            link: 'https://github.com',
            children: [],
          },
          // 字符串 - 页面文件路径
          '/foo/bar.md',
        ],
      },
      // SidebarGroup
      {
        isGroup: true,
        text: 'Group',
        children: ['/group/foo.md', '/group/bar.md'],
      },
      // 字符串 - 页面文件路径
      '/bar/README.md',
    ],
  },
}
```

- 示例 2：

```js
module.exports = {
  themeConfig: {
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: {
      '/guide/': [
        {
          isGroup: true,
          text: 'Guide',
          children: ['/guide/README.md', '/guide/getting-started.md'],
        },
      ],
      '/reference/': [
        {
          isGroup: true,
          text: 'Reference',
          children: ['/reference/cli.md', '/reference/config.md'],
        },
      ],
    },
  },
}
```

### sidebarDepth

- 类型： `number`

- 默认值： `2`

- 详情：

  设置根据页面标题自动生成的侧边栏的最大深度。

  - 设为 `0` 来禁用所有级别的页面标题。
  - 设为 `1` 来包含 `<h2>` 标题。
  - 设为 `2` 来包含 `<h2>` 和 `<h3>` 标题。
  - ...

  最大值取决于你通过 [markdown.extractHeaders.level](../config.md#markdown-extractheaders) 提取了哪些级别的标题。

  由于 `markdown.extractHeaders.level` 的默认值是 `[2, 3]` ，因此 `sidebarDepth` 的默认最大值是 `2` 。

  你可以通过页面的 [sidebarDepth](./frontmatter.md#sidebardepth) frontmatter 来覆盖这个全局配置。

### editLink

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 _编辑此页_ 链接。

  你可以通过页面的 [editLink](./frontmatter.md#editlink) frontmatter 来覆盖这个全局配置。

### editLinkText

- 类型： `string`

- 默认值： `'Edit this page'`

- 详情：

  _编辑此页_ 链接的文字。

### editLinkPattern

- 类型： `string`

- 详情：

  _编辑此页_ 链接的 Pattern 。

  它将会用于生成 _编辑此页_ 的链接。

  如果你不设置该选项，则会根据 [docsRepo](#docsrepo) 配置项来推断 Pattern 。但是如果你的文档仓库没有托管在常用的平台上，比如 GitHub 、 GitLab 、 Bitbucket 等，那么你必须设置该选项才能使 _编辑此页_ 链接正常工作。

- 用法：

  |  Pattern  |         描述                                                   |
  |-----------|----------------------------------------------------------------|
  | `:repo`   | 文档仓库 URL ，即 [docsRepo](#docsrepo)                         |
  | `:branch` | 文档仓库分支 ，即 [docsBranch](#docsbranch)                     |
  | `:path`   | 页面源文件的路径，即 [docsDir](#docsdir) 拼接上页面文件的相对路径 |

- 示例：

```js
module.exports = {
  themeConfig: {
    docsRepo: 'https://gitlab.com/owner/name',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/-/edit/:branch/:path',
  },
}
```

  则会生成类似于 `'https://gitlab.com/owner/name/-/edit/master/docs/path/to/file.md'` 的链接。

### docsRepo

- 类型： `string`

- 详情：

  文档源文件的仓库 URL 。

  它将会用于生成 _编辑此页_ 的链接。

  如果你不设置该选项，则默认会使用 [repo](#repo) 配置项。但是如果你的文档源文件是在一个不同的仓库内，你就需要设置该配置项了。

### docsBranch

- 类型： `string`

- 默认值： `'main'`

- 详情：

  文档源文件的仓库分支。

  它将会用于生成 _编辑此页_ 的链接。

### docsDir

- 类型： `string`

- 默认值： `''`

- 详情：

  文档源文件存放在仓库中的目录名。

  它将会用于生成 _编辑此页_ 的链接。

### lastUpdated

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 _最近更新时间戳_ 。

  你可以通过页面的 [lastUpdated](./frontmatter.md#lastupdated) frontmatter 来覆盖这个全局配置。

  要注意的是，如果你将 `themeConfig.lastUpdated` 设为了 `false` ，那么这个功能会被完全禁用，并且无法在 locales 或页面 frontmatter 中启用。

### lastUpdatedText

- 类型： `string`

- 默认值： `'Last Updated'`

- 详情：

  _最近更新时间戳_ 标签的文字。

### contributors

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 _贡献者列表_ 。

  你可以通过页面的 [contributors](./frontmatter.md#contributors) frontmatter 来覆盖这个全局配置。

  要注意的是，如果你将 `themeConfig.contributors` 设为了 `false` ，那么这个功能会被完全禁用，并且无法在 locales 或页面 frontmatter 中启用。

### contributorsText

- 类型： `string`

- 默认值： `'Contributors'`

- 详情：

  _贡献者列表_ 标签的文字。

### tip

- 类型： `string`

- 默认值： `'TIP'`

- 详情：

  Tip [自定义容器](./markdown.md#自定义容器) 的默认标题。

### warning

- 类型： `string`

- 默认值： `'WARNING'`

- 详情：

  Warning [自定义容器](./markdown.md#自定义容器) 的默认标题。

### danger

- 类型： `string`

- 默认值： `'WARNING'`

- 详情：

  Danger [自定义容器](./markdown.md#自定义容器) 的默认标题。

### notFound

- 类型： `string[]`

- 默认值： `['Not Found']`

- 详情：

  404 页面的提示信息。

  当用户进入 404 页面时，会从数组中随机选取一条信息进行展示。

### backToHome

- 类型： `string`

- 默认值： `'Back to home'`

- 详情：

  404 页面中 _返回首页_ 链接的文字。

### openInNewWindow

- 类型： `string`

- 默认值： `'open in new window'`

- 详情：

  [OutboundLink](../components.md#outboundlink) 链接内的 `sr-only` 文字。

  它主要是为了站点的可访问性 (a11y) 。

## 插件

### themePlugins

- 详情：

  设置默认主题使用的插件。

  默认主题使用了一些插件，如果你确实不需要该插件，你可以选择禁用它。在禁用插件之前，请确保你已了解它的用途。

#### themePlugins.activeHeaderLinks

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-active-header-links](../plugin/active-header-links.md) 。

#### themePlugins.backToTop

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-back-to-top](../plugin/back-to-top.md) 。

#### themePlugins.container

- 类型： `Record<ContainerType, boolean>`

- 详情：

  是否启用由 [@vuepress/plugin-container](../plugin/container.md) 支持的自定义容器。

  `ContainerType` 类型为：

  - `tip`
  - `warning`
  - `danger`
  - `details`
  - `codeGroup`
  - `codeGroupItem`

- 参考：
  - [默认主题 > Markdown > 自定义容器](./markdown.md#自定义容器)

#### themePlugins.git

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-git](../plugin/git.md) 。

#### themePlugins.mediumZoom

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-medium-zoom](../plugin/medium-zoom.md) 。

#### themePlugins.nprogress

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 [@vuepress/plugin-nprogress](../plugin/nprogress.md) 。
