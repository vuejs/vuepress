---
sidebar: auto
---

# Migration from 0.x

## Site Config

### ga <Badge text="replaced"/>

GA has been separated into a standalone plugin [@vuepress/google-analytics](../plugin/official/plugin-google-analytics.md).

::: upgrade

1. Install `@vuepress/google-analytics`:

```bash
yarn add @vuepress/google-analytics -D
```

2. Update `vuepress/config.js`:

```diff
module.exports = {
-  markdown: {
-    config(md) { /* ... */ }
-  },
+  extendMarkdown(md) { /* ... */ }
}
```
:::

### markdown.config <Badge text="renamed"/>

Using `extendMarkdown`：。

::: upgrade
Update `vuepress/config.js`:
```diff
// vuepress/config.js
module.exports = {
-  markdown: {
-    config(md) { /* ... */ }
-  },
+  extendMarkdown(md) { /* ... */ }
}
```
:::

### serviceWorker <Badge text="replaced"/>

Service Worker related features have been separated into a standalone plugin [@vuepress/plugin-pwa](../plugin/official/plugin-pwa.md).

::: upgrade
See: [@vuepress/plugin-pwa > Migration from 0.x](../plugin/official/plugin-pwa.md#migration-from-0-x)
:::

## Default Theme Config

### `.vuepress/override.styl` <Badge text="replaced"/>

Replaced by `.vuepress/styles/palette.styl`.

::: upgrade
See: [Config > palette.styl](../config/README.md#palette-styl)
:::

### `.vuepress/style.styl` <Badge text="replaced"/>

Replaced by `.vuepress/styles/index.styl` 代替.

::: upgrade
See: [Config > index.styl](../config/README.md#index-styl)
:::
