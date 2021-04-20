# pwa-popup

<NpmBadge package="@vuepress/plugin-pwa-popup" />

Provide a popup component for users to activate the new PWA service worker manually.

This plugin must be used together with [pwa plugin](./pwa.md), and the `skipWaiting` option must not be set to `true`.

When the new service worker is ready, a popup will appear in the right bottom of the page to ask users to activate the waiting service worker.

## Options

### locales

- Type: `Record<string, { message: string, buttonText: string }>`

- Details:

  The messages of the popup in different locales.

  If this option is not specified, it will fallback to default messages.

- Example:

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

- Also see:
  - [Guide > I18n](../../guide/i18n.md)

## Styles

You can customize the style of the popup via CSS variables:

```css
:root {
  --pwa-popup-color: #3eaf7c;
}
```
