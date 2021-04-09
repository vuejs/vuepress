# shiki

> [@vuepress/plugin-shiki](https://www.npmjs.com/package/@vuepress/plugin-shiki)

该插件使用 [Shiki](https://shiki.matsu.io/) 来为 Markdown 代码块启用代码高亮。

## 配置项

### theme

- 类型： `IThemeRegistration`

- 默认值： `'nord'`

- 详情：

  Shiki 的主题。

  该配置项会被传递到 Shiki 的 `getHighlighter()` 方法中。

- 参考：
  - [shiki > themes](https://github.com/shikijs/shiki/blob/master/docs/themes.md)

### langs

- 类型： `(Lang | ILanguageRegistration)[]`

- 默认值： `[]`

- 详情：

  Shiki 的语言。

  该配置项会被传递到 Shiki 的 `getHighlighter()` 方法中。

  如果没有传入语言， Shiki 会自动加载所有可用的语言。

- 参考：
  - [shiki > languages](https://github.com/shikijs/shiki/blob/master/docs/languages.md)
