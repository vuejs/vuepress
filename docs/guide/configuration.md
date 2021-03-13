# Configuration

## Config File

Without any configuration, the VuePress site is pretty minimal. To customize your site, let’s first create a `.vuepress` directory inside your docs directory. This is where all VuePress-specific files will be placed. Your project structure is probably like this:

```
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
```

The essential file for configuring a VuePress site is `.vuepress/config.js`, which should export a JavaScript object. If you are using TypeScript, you can use `.vuepress/config.ts` instead to get better types hint for VuePress Config.

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  lang: 'en-US',
  title: 'Hello, VuePress!',
  description: 'This is my first VuePress site',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: 'Hello VuePress',
  description: 'Just playing around',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
})
```

  </CodeGroupItem>
</CodeGroup>

::: tip
We will refer the config object as **VuePress Config**.
:::

## Config Scopes

You may have noticed that there is a `themeConfig` option in VuePress Config.

Options outside `themeConfig` are **Site Config**, while options inside `themeConfig` are **Theme Config**.

### Site Config

Site config means that, no matter what theme you are using, these configurations are always valid.

As we know, every site should have its own `lang`, `title`, `description`, etc. Thus, VuePress has built-in support for those options.

::: tip
Check out the [Config Reference](../reference/config.md) for a full list of site config.
:::

### Theme Config

Theme config will be processed by VuePress theme, so it depends on the theme you are using.

If you don't specify the `theme` option of VuePress Config, the default theme will be used.

::: tip
Check out the [Default Theme > Config Reference](../reference/default-theme/config.md) for theme config of default theme.
:::
