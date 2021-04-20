# pwa-popup

<NpmBadge package="@vuepress/plugin-pwa-popup" />

提供一个弹窗组件，允许用户手动刷新 PWA Service Worker 。

该插件必须和 [pwa 插件](./pwa.md) 一起使用，并且 `skipWaiting` 配置项不能设置为 `true` 。

当新的 Service Worker 就绪时，会在页面右下角出现一个弹窗，询问用户是否需要激活处于 Waiting 状态的 Service Worker 。

## 配置项

### locales

- 类型： `Record<string, { message: string, buttonText: string }>`

- 详情：

  弹窗在不同 locales 下的信息。

  如果没有指定该配置项，它会降级使用默认信息。

- 示例：

```js
module.exports = {
  plugins: [
    ['@vuepress/plugin-pwa'],
    [
      '@vuepress/plugin-pwa-popup',
      {
        locales: {
          '/': {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
          '/zh/': {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
        },
      },
    ],
  ],
}
```

- 参考：
  - [指南 > 多语言支持](../../guide/i18n.md)

## 样式

你可以通过 CSS 变量来自定义弹窗的样式：

```css
:root {
  --pwa-popup-color: #3eaf7c;
}
```
