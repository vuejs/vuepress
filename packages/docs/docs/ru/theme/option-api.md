---
en: 04235a02cb82c0778288bd131f9bde076f18823a
lang: ru-RU
metaTitle: Configuration | Theme
---

# Настройка темы

Как и в случае с плагинами, файл конфигурации темы `themeEntry` должен экспортировать `plain JavaScript object` (`#1`). Если плагин должен принимать параметры, это может быть функция, которая экспортирует простой объект (`#2`). Функция будет вызываться с `siteConfig.themeConfig` в качестве первого аргумента вместе с [ctx](../plugin/context-api.md), который предоставит некоторые метаданные во время сборки.

``` js
// #1
module.exports = {
   // ...
}
```

``` js
// #2
module.exports = (themeConfig, ctx) => {
   return {
      // ...
   }
}
```


::: tip
1. Вы должны увидеть разницу между `themeEntry` и `themeConfig`, первое - это конфигурация для самой темы, которая предоставляется VuePress, второе – конфигурация пользователя для темы, которая реализуется используемой в данный момент темой, например, [Конфигурация темы по умолчанию](./default-theme-config.md).

2. В дополнение к параметрам, перечисленным в этом разделе, `themeEntry` также поддерживает все [Опции API](../plugin/option-api.md) и [Жизненный цикл](../plugin/life-cycle.md) плагинов.
:::

## plugins

- Тип: `Array|Object`
- По умолчанию: undefined

**Смотрите также:**

- [Плагины > Использование плагинов](../plugin/using-a-plugin.md).

---

::: warning
Возможно, вам не нужно использовать параметры, помеченные <Badge text="Danger Zone" vertical="middle"/>, если вы не знаете, что делаете!
:::

## devTemplate <Badge text="Danger Zone"/>

- Тип: `String`
- По умолчанию: undefined

Путь к шаблону HTML, используемый в режиме `dev`, шаблон по умолчанию смотрите [здесь](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html)

## ssrTemplate <Badge text="Danger Zone"/>

- Тип: `String`
- По умолчанию: undefined

Путь к шаблону HTML, используемый в режиме `build`, шаблон по умолчанию смотрите [здесь](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.ssr.html)

**Смотрите также:**

- [Руководство по Vue SSR > template](https://ssr.vuejs.org/api/#template).

## extend <Badge text="Danger Zone"/>

- Тип: `String`
- По умолчанию: undefined

```js
module.exports = {
  extend: '@vuepress/theme-default'
}
```

VuePress предоставляет возможность наследовать одну тему от другой. VuePress будет следовать концепции `override` и автоматически поможет вам расставить приоритеты для различных тематических атрибутов, например, стили и компоновка компонентов.

**Смотрите также:**

- [Наследование Темы](./inheritance.md)
- [Концепции дизайна VuePress 1.x](../miscellaneous/design-concepts.md)

## globalLayout <Badge text="Danger Zone"/>

- Тип: `String`
- По умолчанию: undefined

```js
// themePath/index.js
module.exports = {
  globalLayout: '/path/to/your/global/vue/sfc'
}
```

Компонент глобального макета - это компонент, отвечающий за глобальную стратегию макета. [Глобальный макет по умолчанию](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/app/components/GlobalLayout.vue) поможет вам визуализировать различные макеты в соответствии с [$frontmatter.layout](../guide/frontmatter.md#layout), поэтому в большинстве случаев вам не нужно настраивать эту опцию.

Например, если вы хотите установить глобальный верхний и нижний колонтитулы для вашей темы, вы можете сделать так:
  
```vue
<!-- themePath/layouts/GlobalLayout.vue -->
<template>
  <div id="global-layout">
    <header><h1>Шапка</h1></header>
    <component :is="layout"/>
    <footer><h1>Подвал</h1></footer>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // Вы также можете проверить, существует ли макет первым, как это делает глобальный макет по умолчанию.
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
```
