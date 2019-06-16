---
en: 0e532c11d45f1b7363d8d413eac96d1cc392e76d
lang: ru-RU
title: pwa
metaTitle: Плагин PWA | VuePress
---

# [@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa)

> Плагин PWA

## Установка

```bash
yarn add -D @vuepress/plugin-pwa@next
# ИЛИ npm install -D @vuepress/plugin-pwa@next
```

## Использование

```javascript
module.exports = {
  plugins: ['@vuepress/pwa']
}
```

## Опции

### serviceWorker

- Тип: `boolean`
- По умолчанию: `true`

Если установлено значение `true`, VuePress автоматически создает и регистрирует [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/), который кэширует содержимое для автономного использования (включено только в производстве).

Существует модуль с псевдонимом `@sw-event`, который также будет генерировать следующие события:

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip ПРИМЕЧАНИЯ PWA
Опция `serviceWorker` обрабатывает только service worker. Чтобы сделать ваш сайт полностью совместимым с PWA, вам потребуется предоставить Web App Manifest и значки в `.vuepress/public`. Для получения дополнительной информации смотрите [Документы MDN о манифесте веб-приложения](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Кроме того, включите это, только если вы можете развернуть свой сайт с SSL, так как service worker может быть зарегистрирован только по URL-адресам HTTPs.
:::

### generateSWConfig

- Тип: `object`
- По умолчанию: `{}`

[Настройка generateSW](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config) из workbox-build.


### updatePopup

- Тип: `boolean|object`
- По умолчанию: `undefined`

Определение типа `popupConfig` следующее:

```typescript
interface normalPopupConfig {
  message: string; // по умолчанию 'New content is available.'
  buttonText: string; // по умолчанию 'Refresh'
}

interface localedPopupConfig {
  [localePath: string]: normalPopupConfig
}

type popupConfig = normalPopupConfig | localedPopupConfig
```

Эта опция позволяет всплывающему окну обновлять содержимое. Всплывающее окно будет отображаться при обновлении сайта (т.е. при обновлении service worker). Он предоставляет кнопку `refresh`, чтобы позволить пользователям немедленно обновить содержимое.

> Если без кнопки `refresh`, новый service worker будет активен после того, как все [клиенты](https://developer.mozilla.org/en-US/docs/Web/API/Clients) закрыты. Это означает, что посетители не смогут видеть новое содержимое, пока они не закроют все вкладки вашего сайта. Но кнопка `refresh` немедленно активирует новый service worker.

### popupComponent

- Тип: `string`
- По умолчанию: `undefined`

Пользовательский компонент для замены всплывающего компонента по умолчанию.

**Смотрите также:**

- [Настройте всплывающий интерфейс SW-Update](#настройте-пользовательский-интерфейс-всплывающего-окна-sw-update)

## Миграция с 0.x

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

Для пользователей i18n:

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
    '/ru/': {
-     serviceWorker: {
-       updatePopup: {
-         message: "Доступен новый контент",
-         buttonText: "Обновить"
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
+        '/ru/': {
+          message: "Доступен новый контент",
+          buttonText: "Обновить"
+        }
+      }
+    }
+  }
```

Стоит отметить, что плагин PWA имеет встроенную версию i18n, поэтому, если вы хотите использовать i18n по умолчанию, вы можете сократить вышеуказанную конфигурацию следующим образом:

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

Не стесняйтесь отправлять PR для улучшения конфигурации по умолчанию [i18n](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-pwa/lib/i18n.js).

## Настройте пользовательский интерфейс всплывающего окна SW-Update

Стандартный всплывающий компонент sw-update обеспечивает слот по умолчанию, который дает вам возможность полностью контролировать внешний вид всплывающего окна.

Во-первых, вам нужно создать глобальный компонент (например, `MySWUpdatePopup`) в `.vuepress/components`. Простой компонент, созданный на основе компонента по умолчанию, выглядит следующим образом:

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

Затем обновите конфигурацию вашего плагина:

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

**Смотрите также:**

- [VuePress > Использование компонентов](../../guide/using-vue.md#использование-компонентов)
- [Vue > Scoped Slots](https://cn.vuejs.org/v2/guide/components-slots.html#scoped-slots)
