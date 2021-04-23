# Usage of Client App Enhance

The [clientAppEnhanceFiles](../../reference/plugin-api.md#clientappenhancefiles) hook of Plugin API allows you to set the path to the client app enhance files. You can use it in your plugin or theme:

```ts
const pluginOrTheme = {
  clientAppEnhanceFiles: path.resolve(__dirname, './path/to/clientAppEnhance.ts'),
}
```

Then create a `clientAppEnhance.ts` file. You can make use of the [defineClientAppEnhance](../../reference/client-api.md#defineclientappenhance) helper to get the types hint. Notice that the function can be either synchronous or asynchronous.

```ts
import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // ...
})
```

- The `app` is the Vue application instance that created by [createApp](https://v3.vuejs.org/api/application-api.html).
- The `router` is the Vue Router instance that created by [createRouter](https://next.router.vuejs.org/api/#createrouter).
- The `siteData` is an object that generated from user config, including [base](../../reference/config.md#base), [lang](../../reference/config.md#lang), [title](../../reference/config.md#title), [description](../../reference/config.md#description), [head](../../reference/config.md#head) and [locales](../../reference/config.md#locales).

The client app enhance will be invoked after the client app is created. It's possible to implement any enhancements to the Vue application.

::: tip
For ease of use in user config, the `.vuepress/clientAppEnhance.{js,ts}` file will be used as the client app enhance file implicitly, unless you set `clientAppEnhanceFiles` explicitly in the config file.
:::

## Register Vue Components

You can register global Vue components via the [component](https://v3.vuejs.org/api/application-api.html#component) method:

```ts
import { defineClientAppEnhance } from '@vuepress/client'
import MyComponent from './MyComponent.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('MyComponent', MyComponent)
})
```

## Use Non-SSR-Friendly Features

VuePress will generate a SSR application to pre-render pages during build. Generally speaking, if a code snippet is using Browser / DOM APIs before client app is mounted, we call it non-SSR-friendly.

We already provides a [ClientOnly](../../reference/components.md#clientonly) component to wrap non-SSR-friendly content.

In client app enhance files, you can make use of the [`__SSR__`](../../reference/client-api.md#ssr) flag for that purpose.

```ts
import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(async ({ app, router, siteData }) => {
  if (!__SSR__) {
    const nonSsrFriendlyModule = await import('non-ssr-friendly-module')
    // ...
  }
})
```

## Use Router Methods

You can make use of the [Router Methods](https://next.router.vuejs.org/api/#router-methods) that provided by vue-router. For example, add navigation guard:

```ts
import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  router.beforeEach((to) => {
    console.log('before navigation')
  })

  router.afterEach((to) => {
    console.log('after navigation')
  })
})
```

::: warning
It not recommended to use `addRoute` method to add dynamic routes here, because those routes will **NOT** be pre-rendered in build mode.

But you can still do that if you understand the drawback.
:::
