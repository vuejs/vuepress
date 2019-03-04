---
title: nprogress
metaTitle: Nprogress 插件 | VuePress
---

# [@vuepress/plugin-nprogress](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-nprogress)

> Nprogress plugin

## 安装

```bash
yarn add -D @vuepress/plugin-nprogress@next
# 或者 npm install -D @vuepress/plugin-nprogress@next
```

## 使用

```javascript
module.exports = {
  plugins: ['@vuepress/nprogress']
}
```

## 自定义颜色

在你的 __site__ 或 __theme__ 的 `palette.styl` 文件中设置 `$nprogressColor` 来改变进度条的颜色（默认使用 `$accentColor`）。

```stylus
// .vuepress/styles/palette.styl
// 或者
// .vuepress/theme/styles/palette.styl

$nprogressColor = red
```

**参考：**

- [配置 > Styling](../../api/config.md#styling)
