# active-header-links

> [@vuepress/plugin-active-header-links](https://www.npmjs.com/package/@vuepress/plugin-active-header-links)

该插件会监听页面滚动事件。当页面滚动至某个 _标题锚点_ 后，如果存在对应的 _标题链接_ ，那么该插件会将路由 Hash 更改为该 _标题锚点_ 。

该插件主要用于开发主题，并且已经集成到默认主题中。大部分情况下你不需要直接使用它。

## 配置项

### headerLinkSelector

- 类型： `string`

- 默认值： `'.sidebar-link'`

- 详情：

  _标题链接_ 的选择器。

  如果一个 _标题锚点_ 没有对应的 _标题链接_ ，那么及时滚动到这个 _标题锚点_ ，该插件也不会更改路由 Hash 。

### headerAnchorSelector

- 类型： `string`

- 默认值： `'.header-anchor'`

- 详情：

  _标题锚点_ 的选择器。

  你通常不需要设置该选项，除非你通过 [markdown.anchor](../config.md#markdown-anchor) 修改了 [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor#readme) 的 `permalinkClass` 选项。

- 参考：
  - [指南 > Markdown > 语法扩展 > 标题锚点](../../guide/markdown.md#标题锚点)

### delay

- 类型： `number`

- 默认值： `200`

- 详情：

  滚动事件监听器的 Debounce 延迟。

### offset

- 类型： `number`

- 默认值： `5`

- 详情：

  即便直接点击 _标题锚点_ 的链接， `scrollTop` 也可能不会完全等于 _标题锚点_ 的 `offsetTop` ，所以我们添加一个 Offset 偏移量来避免这个误差。
