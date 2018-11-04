---
title: pwa
---

# @vuepress/plugin-pwa

> PWA plugin

## Install

```bash
yarn add -D @vuepress/plugin-pwa
# OR npm install -D @vuepress/plugin-pwa
```

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/pwa']
}
```

## Options

### serviceWorker

- Type: `boolean`
- Default: `true`

If set to `true`, VuePress will automatically generate and register a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) that caches the content for offline use (only enabled in production).

### updatePopup

- Type: `boolean|object`
- Default: `undefined`

The definition of type `popupConfig` is as follows:

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

This option enables the popup to refresh contents. The popup will be shown when the site is updated (i.e. service worker is updated). It provides `refresh` button to allow users to refresh contents immediately.

> If without the `refresh` button, the new service worker will be active after all [clients](https://developer.mozilla.org/en-US/docs/Web/API/Clients) are closed. This means that visitors cannot see new contents until they close all tabs of your site. But the `refresh` button activates the new service worker immediately.

### popupComponent

- Type: `string`
- Default: `undefined`

A custom component to replace the default popup component.

**Also see:**

- [Customize the SW-Update Popup UI](#customize-the-ui-of-sw-update-popup)

## Migration from 0.x

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

For i18n user:

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

It's worth mentioning that the PWA plugin has above i18n built in, so if you want to use the default i18n directly, you can abbreviate the above configuration as:

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

Feel free to submit PRs to improve the default [i18n configuration](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-pwa/lib/i18n.js).

## Customize the UI of SW-Update Popup

The default sw-update popup component provides a default slot which gives you the ability to fully control the appearence of the popup.

First, you need to create a global component (e.g. `MySWUpdatePopup`) at `.vuepress/components`. A simple component created based on the default component is as follows:

```vue
<template>
  <SWUpdatePopup>
    <div
      slot-scope="{ enabled, reload, message, buttonText }"
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

Then, update your plugin config:

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

**Also see:**

- [VuePress > Using Components](../../guide/using-vue.md#using-components)
- [Vue > Scoped Slots](https://cn.vuejs.org/v2/guide/components-slots.html#scoped-slots)
