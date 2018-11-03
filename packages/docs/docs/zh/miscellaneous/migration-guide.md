---
sidebar: auto
---

# 从 VuePress 1.x 迁移

## config.js

### ga <Badge text="替换"/>

使用 [@vuepress/google-analytics](../plugin/official.md#vuepress-google-analytics) 代替。

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

### markdown.config <Badge text="替换"/>

使用 `extendMarkdown` 代替。

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
