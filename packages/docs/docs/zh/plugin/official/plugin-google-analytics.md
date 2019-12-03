---
title: google-analytics
metaTitle: Google Analytics 插件 | VuePress
---

# [@vuepress/plugin-google-analytics](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-google-analytics)

> Google analytics 插件

## 安装

```bash
yarn add -D @vuepress/plugin-google-analytics
# OR npm install -D @vuepress/plugin-google-analytics
```

::: warning
如果你的项目正在使用 Google analytics 插件，推荐使用 [Yarn](https://yarnpkg.com/en/) 而不是 npm 来安装所有依赖。因为在这种情形下，npm 会生成错误的依赖树。
:::

## 使用

```javascript
module.exports = {
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]
  ]
}
```

::: tip 提示
请留意 [GDPR (2018年欧盟数据保护规则改革)](https://ec.europa.eu/commission/priorities/justice-and-fundamental-rights/data-protection/2018-reform-eu-data-protection-rules_en), 在合适或者需要的情况下，考虑将 Google Analytics 设置为[匿名化的 IP](https://support.google.com/analytics/answer/2763052?hl=zh-Hans)。
:::

## 选项

### ga

- 类型: `string`
- 默认值: `undefined`

提供 Google Analytics ID 以启用集成。
