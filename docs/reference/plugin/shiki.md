# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

This plugin will enable syntax highlighting for markdown code fence with [Shiki](https://shiki.matsu.io/).

::: tip
[Shiki](https://shiki.matsu.io/) is the syntax highlighter being used by VSCode. It has higher fidelity, but it is slower than [Prism.js](https://prismjs.com/).

You could consider disabling this plugin in `dev` mode to get better development experience.
:::

## Options

### theme

- Type: `IThemeRegistration`

- Default: `'nord'`

- Details:

  Theme of shiki.

  This option will be forwarded to `getHighlighter()` method of shiki. 

- Also see:
  - [shiki > themes](https://github.com/shikijs/shiki/blob/master/docs/themes.md)

### langs

- Type: `(Lang | ILanguageRegistration)[]`

- Default: `[]`

- Details:

  Languages of shiki.

  This option will be forwarded to `getHighlighter()` method of shiki. 

  If no languages are provided, shiki will load all available languages automatically.

- Also see:
  - [shiki > languages](https://github.com/shikijs/shiki/blob/master/docs/languages.md)
