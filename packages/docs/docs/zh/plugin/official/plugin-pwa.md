---
title: pwa
metaTitle: PWA 插件 | VuePress
---

# [@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-pwa)

> PWA 插件

## 安装

```bash
yarn add -D @vuepress/plugin-pwa
# OR npm install -D @vuepress/plugin-pwa
```

## 使用

```javascript
module.exports = {
  plugins: ['@vuepress/pwa']
}
```

::: tip
为了让你的网站完全地兼容 PWA，你需要:

- 在 `.vuepress/public` 提供 Manifest 和 icons
- 在 `.vuepress/config.js` 添加正確的 [head links](/config/#head)(参见下面例子).

更多细节，请参见 [MDN docs about the Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).
:::

这是一个在VuePress中完全地兼容 PWA 的例子：

```javascript
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
  }],
}
```

## 选项

### serviceWorker

- 类型: `boolean`
- 默认值: `true`

如果设置为 `true`，VuePress 将自动生成并注册一个 [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/)，用于缓存页面的内容以供离线使用（仅会在生产环境中启用）。

有一个别名化的模块 `@sw-event` 模块将会 emit 以下事件：

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip
只有在你能够使用 SSL 部署您的站点时才能启用此功能，因为 service worker 只能在 HTTPs 的 URL 下注册。
:::

### generateSWConfig

- 类型: `object`
- 默认值: `{}`

workbox-build 的 [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)。


### updatePopup

- 类型: `boolean|popupConfig`
- 默认值: `undefined`

类型 `popupConfig` 的定义如下：

```typescript
interface normalPopupConfig {
  message: string; // defaults to 'New content is available.'
  buttonText: string; // defaults to 'Refresh'
}

interface localedPopupConfig {
  [localePath: string]: normalPopupConfig
}

type popupConfig = normalPopupConfig | localedPopupConfig
```

本选项开启了一个用于刷新内容的弹窗。这个弹窗将会在站点有内容更新时显示出来，并提供了一个 `refresh` 按钮，允许用户立即刷新内容。

> 如果没有“刷新”按钮，则只有在所有的 [Clients](https://developer.mozilla.org/en-US/docs/Web/API/Clients) 被关闭后，新的 Service Worker 才会处于活动状态。这意味着用户在关闭你网站的所有标签之前无法看到新内容。但是 `refresh` 按钮会立即激活新的 Service Worker。

### popupComponent

- 类型: `string`
- 默认值: `undefined`

用于替换默认弹出组件的自定义组件。

**参考:**

- [自定义 SW-Update Popup](#自定义-sw-update-popup-的-ui)

## 从 0.x 迁移

### Service Worker

``` diff
module.exports = {
- serviceWorker: true,
+ plugins: ['@vuepress/pwa']
}
```

### SW-Update Popup

``` diff
module.exports = {
  themeConfig: {
-   serviceWorker: {
-     updatePopup: {
-        message: "New content is available.",
-        buttonText: "Refresh"
-     }
-   }
  },
+  plugins: {
+   '@vuepress/pwa': {
+      serviceWorker: true,
+      updatePopup: {
+        message: "New content is available.",
+        buttonText: "Refresh"
+      }
+    }
+ }
}
```

如果你在 [i18n](../../guide/i18n.md) 模式下:

``` diff
module.exports = {
  themeConfig: {
    '/': {
-     serviceWorker: {
-       updatePopup: {
-         message: "New content is available.",
-         buttonText: "Refresh"
-       }
-     }
    },
    '/zh/': {
-     serviceWorker: {
-       updatePopup: {
-         message: "发现新内容可用",
-         buttonText: "刷新"
-       }
-     }
    }
  },
+  plugins: {
+    '@vuepress/pwa': {
+      serviceWorker: true,
+      updatePopup: {
+        '/': {
+          message: "New content is available.",
+          buttonText: "Refresh"
+        },
+        '/zh/': {
+          message: "发现新内容可用",
+          buttonText: "刷新"
+        }
+      }
+    }
+  }
```

值得一提的是本插件已经内置了上述的 i18n 配置，所以如果你想直接使用默认的 i18n，你可以将上面的配置缩写为：

```js
module.exports = {
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    }
  }
}
```

欢迎提交 PR 以增加默认的 [i18n 配置](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-pwa/lib/i18n.js).

## 自定义 SW-Update Popup 的 UI

默认的 SW-Update Popup 组件提供了一个默认插槽，使您能够完全控制弹窗的外观。

首先，您需要在 `.vuepress/components` 中创建一个全局组件（例如`MySWUpdatePopup`)。 一个基于默认组件创建的简单组件如下：

```vue
<template>
  <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
    <div
      v-if="enabled"
      class="my-sw-update-popup">
      {{ message }}<br>
      <button @click="reload">{{ buttonText }}</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
  components: { SWUpdatePopup }
}
</script>

<style>
.my-sw-update-popup {
  text-align: right;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 20px;
  padding: 10px;
  border: 5px solid #3eaf7c;
}

.my-sw-update-popup button {
  border: 1px solid #fefefe;
}
</style>
```

接着，更新你的插件配置：

``` diff
module.exports = {
   plugins: {
    '@vuepress/pwa': {
       serviceWorker: true,
+      popupComponent: 'MySWUpdatePopup',
       updatePopup: true
     }
  }
}
```

**参考:**

- [VuePress > 使用组件](../../guide/using-vue.md#使用组件)
- [Vue > 作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#作用域插槽)
