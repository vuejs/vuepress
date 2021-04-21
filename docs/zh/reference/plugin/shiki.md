# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

该插件使用 [Shiki](https://shiki.matsu.io/) 来为 Markdown 代码块启用代码高亮。

::: tip
[Shiki](https://shiki.matsu.io/) 是 VSCode 正在使用的代码高亮器。它具有更高的保真度，但比 [Prism.js](https://prismjs.com/) 要慢一些，特别是在有大量代码块需要处理的时候。

你可以考虑在 `dev` 模式下禁用该插件来获取更好的开发体验。
:::

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
