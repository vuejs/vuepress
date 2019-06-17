---
en: 05f7af47e606693c7458f16a2706d83448d98c53
lang: ru-RU
sidebar: auto
---

# Миграция с 0.x

## Настройка сайта

### ga <Badge text="replaced"/>

GA был отделен в отдельный плагин [@vuepress/plugin-google-analytics](../plugin/official/plugin-google-analytics.md).

::: upgrade

1. Установите `@vuepress/plugin-google-analytics`:

```bash
yarn add -D @vuepress/plugin-google-analytics@next
# ИЛИ npm install -D @vuepress/plugin-google-analytics@next
```

2. Обновите `vuepress/config.js`:

```diff
module.exports = {
-  ga: 'UA-12345678-9'
+  plugins: [
+    ['@vuepress/google-analytics', {
+      ga: 'UA-12345678-9'
+    }]
+ ]
}
```
:::

### markdown.config <Badge text="renamed"/>

Использование `extendMarkdown`：。

::: upgrade
Обновите `vuepress/config.js`:
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

Функции, связанные с Service Worker, были отделены в отдельный плагин [@vuepress/plugin-pwa](../plugin/official/plugin-pwa.md).

::: upgrade
Смотрите [@vuepress/plugin-pwa > Миграция с 0.x](../plugin/official/plugin-pwa.md#миграция-с-0-x)
:::

## Настройка темы по умолчанию

### `.vuepress/override.styl` <Badge text="replaced"/>

Заменен на `.vuepress/styles/palette.styl`.

::: upgrade
Смотрите [Настройка > palette.styl](../config/README.md#palette-styl)
:::

### `.vuepress/style.styl` <Badge text="replaced"/>

Заменен на `.vuepress/styles/index.styl`.

::: upgrade
See: [Настройка > index.styl](../config/README.md#index-styl)
:::
