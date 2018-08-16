# @vuepress/plugin-pwa

> PWA plugin for vuepress

## Options

### serviceWorker

- Type: `boolean`
- Default: `true`

If set to `true`, VuePress will automatically generate and register a service worker that caches the content for offline use (only enabled in production).

### updatePopup

- Type: `boolean|popupConfig`
- Default: `undefined`

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

## Migration from 0.x.x

Now that we have plugin API, all features' options that are in plugin's areas will become plugin options.

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
    