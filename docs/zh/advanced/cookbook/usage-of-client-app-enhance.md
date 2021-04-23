# Client App Enhance 的使用方法

Plugin API 提供的 [clientAppEnhanceFiles](../../reference/plugin-api.md#clientappenhancefiles) Hook 允许你设置 Client App Enhance 文件的路径。你可以在你的插件或者主题中使用它：

```ts
const pluginOrTheme = {
  clientAppEnhanceFiles: path.resolve(__dirname, './path/to/clientAppEnhance.ts'),
}
```

然后，创建 `clientAppEnhance.ts` 文件。你可以使用 [defineClientAppEnhance](../../reference/client-api.md#defineclientappenhance) Helper 来获取类型提示。注意这个函数既可以是同步的，也可以是异步的。

```ts
import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // ...
})
```

- `app` 是由 [createApp](https://v3.cn.vuejs.org/api/application-api.html) 创建的 Vue 应用实例。
- `router` 是由 [createRouter](https://next.router.vuejs.org/zh/api/index.html#createrouter) 创建的路由实例。
- `siteData` 是一个根据用户配置生成的对象，包含 [base](../../reference/config.md#base), [lang](../../reference/config.md#lang), [title](../../reference/config.md#title), [description](../../reference/config.md#description), [head](../../reference/config.md#head) 和 [locales](../../reference/config.md#locales)。

Client App Enhance 会在客户端应用创建后被调用，它可以为 Vue 应用添加任意功能。

::: tip
为了方便用户配置使用， `.vuepress/clientAppEnhance.{js,ts}` 文件会被隐式地用作 Client App Enhance 文件，除非你在配置文件中显式设置了 `clientAppEnhanceFiles` 。
:::

## 注册 Vue 组件

你可以通过 [component](https://v3.cn.vuejs.org/api/application-api.html#component) 方法来注册 Vue 全局组件：

```ts
import { defineClientAppEnhance } from '@vuepress/client'
import MyComponent from './MyComponent.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('MyComponent', MyComponent)
})
```

## 使用不支持 SSR 的功能

VuePress 会在构建过程中生成一个 SSR 应用，用以对页面进行预渲染。一般而言，如果一段代码在客户端应用 Mount 之前就使用了浏览器或 DOM API ，我们就认为其对 SSR 不友好，即不支持 SSR 。

我们已经提供了一个 [ClientOnly](../../reference/components.md#clientonly) 组件来包裹不支持 SSR 的内容。

在 Client App Enhance 文件中，你可以使用 [`__SSR__`](../../reference/client-api.md#ssr) 标记来处理这种情况。

```ts
import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(async ({ app, router, siteData }) => {
  if (!__SSR__) {
    const nonSsrFriendlyModule = await import('non-ssr-friendly-module')
    // ...
  }
})
```

## 使用 Router 方法

你可以使用 vue-router 提供的 [Router 方法](https://next.router.vuejs.org/zh/api/index.html#router-方法) 。例如，添加导航钩子：

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
我们不推荐使用 `addRoute` 方法来添加动态路由，因为这些路由记录 **不会** 在构建模式中被预渲染出来。

当然，如果你了解了这种用法的缺点，你还是可以这样使用。
:::
