# pwa

<NpmBadge package="@vuepress/plugin-pwa" />

Make your VuePress site a [Progressive Web Application (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).

This plugin uses [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build) to generate service worker file, and uses [register-service-worker](https://github.com/yyx990803/register-service-worker) to register service worker.

## Web App Manifests

To make your website fully compliant with PWA, you need to create a [Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest) file and set the icons, colors, etc. for your PWA.

You need to put your manifest file and icons into the [public files directory](../../guide/assets.md#public-files). In the following example, we assume that you are using the default public directory `.vuepress/public`.

1. Create manifest file

Typically `.vuepress/public/manifest.webmanifest`:

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

2. Generate PWA icons

To make your PWA more accessible, you need to generate some icons, and put them inside the public directory.

Make sure the path of icons matches the `icons` field in your manifest file:

- `.vuepress/public/images/icons/android-chrome-192x192.png`
- `.vuepress/public/images/icons/android-chrome-384x384.png`

::: tip
Some tools can help to do that. For example, [Favicon Generator](https://realfavicongenerator.net/) would help you to generate icons together with a sample manifest file.
:::

3. Set tags in head

You also need to set some tags via [head](../config.md#head) option to [deploy the manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest#deploying_a_manifest_with_the_link_tag):

```js
module.exports = {
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // ...other tags
  ]
}
```

## Options

This plugin accepts all parameters of workbox-build's [generateSW method](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW) in its options, except `globDirectory` and `swDest`.

For example, you can set `skipWaiting: true` to auto activate the new service worker once it is ready:

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

But if you omit `skipWaiting` or set it to `false`, you have to activate the new service worker manually:

- For users, you can use our [pwa-popup](./pwa-popup.md) plugin together.
- For developers, you can use our [composition API](#composition-api) to take control of the service worker behavior.

### serviceWorkerFilename

- Type: `string`

- Default: `'service-worker.js'`

- Details:

  File path of the generated service worker file, which is relative to the [dest](../config.md#dest) directory.

  The service worker file will only be generated in `build` mode.

## Composition API

### usePwaEvent

- Details:

  Returns the event emitter of this plugin.
  
  You can add listener function to events that provided by [register-service-worker](https://github.com/yyx990803/register-service-worker).

- Example:

```ts
import { usePwaEvent } from '@vuepress/plugin-pwa/lib/client'

export default {
  setup() {
    const event = usePwaEvent()
    event.on('ready', (registration) => {
      console.log('Service worker is active.')
    })
  },
}
```

### useSkipWaiting

- Parameters:

|  Parameter   | Type                        | Description                                              |
| ------------ | --------------------------- | -------------------------------------------------------- |
| registration | `ServiceWorkerRegistration` | The registration of the service worker you want activate |

- Details:

  Call [skipWaiting()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting) to activate the waiting service worker.

- Example:

```ts
import {
  usePwaEvent,
  useSkipWaiting,
} from '@vuepress/plugin-pwa/lib/client'

export default {
  setup() {
    const event = usePwaEvent()
    event.on('updated', (registration) => {
      console.log('The waiting service worker is available.')
      // activate the waiting service worker
      useSkipWaiting(registration)
    })
  },
}
```
