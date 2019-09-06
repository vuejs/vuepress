---
sidebar: auto
---

# 从 VuePress 0.x 迁移

## 站点配置

### ga <Badge text="替换"/>

GA 已经被分离为一个单独的插件 [@vuepress/plugin-google-analytics](../plugin/official/plugin-google-analytics.md)。

::: upgrade

1. 安装 `@vuepress/plugin-google-analytics`:

```bash
yarn add -D @vuepress/plugin-google-analytics@next
# OR npm install -D @vuepress/plugin-google-analytics@next
```

2. 更新 `vuepress/config.js`:

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

### markdown.config <Badge text="重命名"/>

使用 `extendMarkdown`：

::: upgrade
更新 `vuepress/config.js`:
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

### serviceWorker <Badge text="替换"/>

Service Worker 相关的功能已经被分离为一个单独的插件 [@vuepress/plugin-pwa](../plugin/official/plugin-pwa.md)。

::: upgrade
参考: [@vuepress/plugin-pwa > 从 0.x 迁移](../plugin/official/plugin-pwa.md#从-0-x-迁移)
:::

## 默认主题配置

### `.vuepress/override.styl` <Badge text="替换"/>

使用 `.vuepress/styles/palette.styl` 代替。

::: upgrade
参考: [Config > palette.styl](../config/README.md#palette-styl)
:::

### `.vuepress/style.styl` <Badge text="替换"/>

使用 `.vuepress/styles/index.styl` 代替。

::: upgrade
参考: [Config > index.styl](../config/README.md#index-styl)
:::
