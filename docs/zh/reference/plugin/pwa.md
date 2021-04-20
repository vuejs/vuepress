# pwa

<NpmBadge package="@vuepress/plugin-pwa" />

使你的 VuePress 站点成为一个 [渐进式 Web 应用 (PWA)](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps).

该插件使用 [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build) 来生成 Service Worker 文件，并通过 [register-service-worker](https://github.com/yyx990803/register-service-worker) 来注册 Service Worker 。

## Web App Manifests

为了使你的网站符合 PWA 的要求，你需要创建一个 [Web app manifests](https://developer.mozilla.org/zh-CN/docs/Web/Manifest) 文件，并且为你的 PWA 设置图标、颜色等信息。

你需要将你的 Manifest 文件和图标放置在 [Public 目录](../../guide/assets.md#public-文件) 下。在下述的示例中，我们假设你正在使用默认的 Public 目录 `.vuepress/public` 。

1. 创建 Manifest 文件

通常是 `.vuepress/public/manifest.webmanifest` ：

```json
{
  "name": "VuePress",
  "short_name": "VuePress",
  "description": "Vue-powered Static Site Generator",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#fff",
  "theme_color": "#3eaf7c",
  "icons": [
    {
      "src": "/images/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-chrome-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    }
  ]
}
```

2. 生成 PWA 图标

为了提高你的 PWA 的可用性，你需要生成一些图标，并将它们放置在 Public 目录下。

确保图标的路径匹配 Manifest 文件中的 `icons` 字段：

- `.vuepress/public/images/icons/android-chrome-192x192.png`
- `.vuepress/public/images/icons/android-chrome-384x384.png`

::: tip
一些工具可以帮助你做这些事。比如 [Favicon Generator](https://realfavicongenerator.net/) 可以帮助你生成图片以及一个 Manifest 文件样例。
:::

3. 设置 Head 中的标签

你还需要通过 [head](../config.md#head) 配置项来设置一些标签，用来 [部署你的 Manifest 文件](https://developer.mozilla.org/en-US/docs/Web/Manifest#deploying_a_manifest_with_the_link_tag) 。

```js
module.exports = {
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // ...其他标签
  ]
}
```

## 配置项

该插件的配置项可以接收 workbox-build 中 [generateSW 方法](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW) 除了 `globDirectory` 和 `swDest` 以外的所有参数。

比如，你可以设置 `skipWaiting: true` ，这将在新的 Service Worker 就绪之后立即激活它：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/pwa',
      {
        skipWaiting: true,
      },
    ],
  ],
}
```

但是如果你不设置 `skipWaiting` 或设置为 `false` ，你就需要手动激活新的 Service Worker 。

- 对于用户，你可以配合我们提供的 [pwa-popup](./pwa-popup.md) 插件一起使用。
- 对于开发者，你可以使用该插件提供的 [Composition API](#composition-api) 来控制 Service Worker 的行为。

### serviceWorkerFilename

- 类型： `string`

- 默认值： `'service-worker.js'`

- 详情：

  生成的 Service Worker 文件路径，该路径是 [dest](../config.md#dest) 目录的相对路径。

  Service Worker 文件只会在 `build` 模式下生成。

## Composition API

### usePwaEvent

- 详情：

  返回该插件的 Event Emitter 。

  你可以为 [register-service-worker](https://github.com/yyx990803/register-service-worker) 提供的事件添加事件监听器。

- 示例：

```ts
import { usePwaEvent } from '@vuepress/plugin-pwa/lib/client'

export default {
  setup() {
    const event = usePwaEvent()
    event.on('ready', (registration) => {
      console.log('Service worker 已经生效。')
    })
  },
}
```

### useSkipWaiting

- 参数：

|  参数         | 类型                        | 描述                                       |
| ------------ | --------------------------- | ----------------------------------------- |
| registration | `ServiceWorkerRegistration` | 你想要激活的 Service Worker 的 Registration  |

- 详情：

  调用 [skipWaiting()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting) 来激活处于 Waiting 状态的 Service Worker 。

- 示例：

```ts
import {
  usePwaEvent,
  useSkipWaiting,
} from '@vuepress/plugin-pwa/lib/client'

export default {
  setup() {
    const event = usePwaEvent()
    event.on('updated', (registration) => {
      console.log('在 Waiting 状态的 Service Worker 已经就绪。')
      // 激活 Waiting 状态的 Service Worker
      useSkipWaiting(registration)
    })
  },
}
```
