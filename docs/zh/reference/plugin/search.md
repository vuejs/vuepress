# search

<NpmBadge package="@vuepress/plugin-search" />

为你的文档网站提供本地搜索能力。

::: tip
当你正确配置该插件后，默认主题会把搜索框添加到导航栏。

该插件不一定能在其他主题中直接使用，因此你应参考主题本身的文档来获取更多信息。
:::

## 本地搜索索引

该插件会根据你的页面，在本地生成搜索索引，然后在用户访问站点时加载搜索索引文件。换句话说，这是一个轻量级的内置搜索能力，不会进行任何外部请求。

然而，当你的站点包含大量页面时，搜索索引文件也会变得非常大，它可能会拖慢你的页面加载速度。在这种情况下，我们建议你使用更成熟的解决方案 - [docsearch](./docsearch.md) 。

## 配置项

### locales

- 类型： `Record<string, { placeholder: string }>`

- 详情：

  搜索框在不同 locales 下的文字。

  如果没有指定该配置项，它会降级使用默认文字。

- 示例：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ],
}
```

- 参考：
  - [指南 > 多语言支持](../../guide/i18n.md)

### hotKeys

- 类型： `string[]`

- 默认值： `['s', '/']`

- 详情：

  指定热键的 [event.key](http://keycode.info/) 。

  当按下热键时，搜索框会被聚焦。

  将该配置项设为空数组可以金庸热键功能。

### maxSuggestions

- 类型： `number`

- 默认值： `5`

- 详情：

  指定搜索结果的最大条数。

### isSearchable

- 类型： `(page: Page) => boolean`

- 默认值： `() => true`

- 详情：

  一个函数，用于判断一个页面是否应该被包含在搜索索引中。

  - 返回 `true` 来包含该页面。
  - 返回 `false` 来排除该页面。

- 示例：

```js

module.exports = {
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        // 排除首页
        isSearchable: (page) => page.path !== '/',
      },
    ],
  ],
}
```

### getExtraFields

- 类型： `(page: Page) => string[]`

- 默认值： `() => []`

- 详情：

  一个函数，用于在页面的搜索索引中添加额外字段。

  默认情况下，该插件会将页面标题和小标题作为搜索索引。该配置项可以帮助你添加更多的可搜索字段。

- 示例：

```js

module.exports = {
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        // 允许搜索 Frontmatter 中的 `tags`
        getExtraFields: (page) => page.frontmatter.tags ?? [],
      },
    ],
  ],
}
```

## 样式

你可以通过 CSS 变量来自定义搜索框的样式：

```css
:root {
  --search-accent-color: #3eaf7c;
  --search-text-color: #2c3e50;
  --search-border-color: #eaecef;

  --search-item-text-color: #5d81a5;
  --search-item-focus-bg-color: #f3f4f5;

  --search-input-width: 8rem;
  --search-result-width: 20rem;
}
```

## 组件

### SearchBox

- 详情：

  该插件会全局注册一个 `<SearchBox />` 组件，你可以不传入任何 Props 来使用它。

  将该组件放置在你想要显示搜索框的地方。例如，默认主题将这个组件放在了导航栏的末尾。

::: tip
该组件主要用于主题开发。在大多数情况下你不需要直接使用该组件。
:::
