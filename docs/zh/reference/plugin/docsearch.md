# docsearch

> [@vuepress/plugin-docsearch](https://www.npmjs.com/package/@vuepress/plugin-docsearch)

将 [Algolia DocSearch](https://docsearch.algolia.com/) 集成到 VuePress 中，为你的文档网站提供搜索功能。

::: tip
当你正确配置该插件后，默认主题会把 DocSearch 按钮添加到导航栏。

该插件不一定能在其他主题中直接使用，因此你应参考主题本身的文档来获取更多信息。
:::

## 获取搜索索引

你需要 [提交你的网站 URL](https://docsearch.algolia.com/apply/) 来加入 DocSearch 项目。当你的索引成功创建后， DocSearch 团队会将 [apiKey](#apikey) 和 [indexName](#indexname) 发送到你的邮箱。接下来，你就可以配置该插件，在 VuePress 中启用 DocSearch 了。

或者，你也可以 [运行你自己的爬虫](https://docsearch.algolia.com/docs/run-your-own/) 来创建索引，然后使用你自己的 [appId](#appId), [apiKey](#apikey) 和 [indexName](#indexname) 来配置该插件。

::: details 点击查看爬虫配置示例
```json{19-23,25-27}
{
  "index_name": "your_index_name",
  "start_urls": [
    "https://your.domain.name/"
  ],
  "stop_urls": [],
  "selectors": {
    "lvl0": {
      "selector": "p.sidebar-heading.active",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": ".theme-default-content h1",
    "lvl2": ".theme-default-content h2",
    "lvl3": ".theme-default-content h3",
    "lvl4": ".theme-default-content h4",
    "lvl5": ".theme-default-content h5",
    "text": ".theme-default-content p, .theme-default-content li",
    "lang": {
      "selector": "/html/@lang",
      "type": "xpath",
      "global": true
    }
  },
  "custom_settings": {
    "attributesForFaceting": ["lang"]
  }
}
```

上述 `selectors` 是用于默认主题的配置，你可以根据你使用的主题来修改它们。

注意 `selectors.lang` 和 `custom_settings.attributesForFaceting` 字段，它们是**必须**的，否则该插件将无法正常工作。
:::

## 配置项

### apiKey

- 类型： `string`

- 是否必需： `true`

- 详情：

  从 DocSearch 团队收到的 `apiKey` ，或者由你自己生成。

- 参考：
  - [DocSearch > Options > apiKey](https://autocomplete-experimental.netlify.app/docs/docsearch-js#apikey)

### indexName

- 类型： `string`

- 是否必需： `true`

- 详情：

  从 DocSearch 团队收到的 `indexName` ，或者由你自己生成。

- 参考：
  - [DocSearch > Options > indexName](https://autocomplete-experimental.netlify.app/docs/docsearch-js#indexname)

### appId

- 类型： `string`

- 详情：

  只有在你 [运行你自己的 DocSearch 爬虫](https://docsearch.algolia.com/docs/run-your-own/) 时，才需要配置该选项。用于设置你的 Application ID 。

- 参考：
  - [DocSearch > Options > appId](https://autocomplete-experimental.netlify.app/docs/docsearch-js#appid)

### searchParameters

- 类型： `Record<string, any>`

- 详情：

  Algolia API 的 API 参数。

- 参考：
  - [DocSearch > Options > searchParameters](https://autocomplete-experimental.netlify.app/docs/docsearch-js#searchparameters)
  - [Algolia > API Parameters](https://www.algolia.com/doc/api-reference/api-parameters/)

### placeholder

- 类型： `string`

- 默认值： `'Search docs'`

- 详情：

  搜索输入框的 placeholder 属性。

- 参考：
  - [DocSearch > Options > placeholder](https://autocomplete-experimental.netlify.app/docs/docsearch-js#placeholder)

### disableUserPersonalization

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否禁用所有的个性化功能：最近的搜索、收藏的搜索结果等。

- 参考：
  - [DocSearch > Options > disableUserPersonalization](https://autocomplete-experimental.netlify.app/docs/docsearch-js#disableuserpersonalization)

### initialQuery

- 类型： `string`

- 详情：

  打开弹窗时的初始请求。

- 参考：
  - [DocSearch > Options > initialQuery](https://autocomplete-experimental.netlify.app/docs/docsearch-js#initialquery)

### locales

- 类型： `Record<string, DocsearchPluginOptions>`

- 详情：

  在不同 locales 下对该插件进行不同的配置。

  该插件的所有其他选项都可以在 locale 中进行配置。

- 示例：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/docsearch',
      {
        apiKey: '<API_KEY>',
        indexName: '<INDEX_NAME>',
        locales: {
          '/': {
            placeholder: 'Search Documentation',
          },
          '/zh/': {
            placeholder: '搜索文档',
          },
        },
      },
    ],
  ],
}
```

- 参考：
  - [指南 > 多语言支持](../../guide/i18n.md)

## 样式

你可以通过 [@docsearch/css](https://autocomplete-experimental.netlify.app/docs/docsearch-css) 提供的 CSS 变量来自定义样式：

```css
:root {
  --docsearch-primary-color: rgb(84, 104, 255);
  --docsearch-text-color: rgb(28, 30, 33);
  --docsearch-spacing: 12px;
  --docsearch-icon-stroke-width: 1.4;
  --docsearch-highlight-color: var(--docsearch-primary-color);
  --docsearch-muted-color: rgb(150, 159, 175);
  --docsearch-container-background: rgba(101, 108, 133, 0.8);
  --docsearch-logo-color: rgba(84, 104, 255);

  /* modal */
  --docsearch-modal-width: 560px;
  --docsearch-modal-height: 600px;
  --docsearch-modal-background: rgb(245, 246, 247);
  --docsearch-modal-shadow: inset 1px 1px 0 0 rgba(255, 255, 255, 0.5),
    0 3px 8px 0 rgba(85, 90, 100, 1);

  /* searchbox */
  --docsearch-searchbox-height: 56px;
  --docsearch-searchbox-background: rgb(235, 237, 240);
  --docsearch-searchbox-focus-background: #fff;
  --docsearch-searchbox-shadow: inset 0 0 0 2px var(--docsearch-primary-color);

  /* hit */
  --docsearch-hit-height: 56px;
  --docsearch-hit-color: rgb(68, 73, 80);
  --docsearch-hit-active-color: #fff;
  --docsearch-hit-background: #fff;
  --docsearch-hit-shadow: 0 1px 3px 0 rgb(212, 217, 225);

  /* key */
  --docsearch-key-gradient: linear-gradient(
    -225deg,
    rgb(213, 219, 228) 0%,
    rgb(248, 248, 248) 100%
  );
  --docsearch-key-shadow: inset 0 -2px 0 0 rgb(205, 205, 230),
    inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4);

  /* footer */
  --docsearch-footer-height: 44px;
  --docsearch-footer-background: #fff;
  --docsearch-footer-shadow: 0 -1px 0 0 rgb(224, 227, 232),
    0 -3px 6px 0 rgba(69, 98, 155, 0.12);
}
```

## 组件

### Docsearch

- 详情：

  该插件会全局注册一个 `<Docsearch />` 组件，你可以不传入任何 Props 来使用它。

  将该组件放置在你想要显示 docsearch 按钮的地方。例如，默认主题将这个组件放在了导航栏的末尾。

::: tip
该组件主要用于主题开发。在大多数情况下你不需要直接使用该组件。
:::
