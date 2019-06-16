---
en: e70514906016a1ff031879c30d5728e04baa55e2
lang: ru-RU
sidebar: auto
---

# Часто задаваемые вопросы

## Почему `palette.styl` и `index.styl` не могут быть объединены в один API?

`palette.styl` отвечает за глобальные настройки цвета. Во время компиляции цветовые константы темы должны быть сначала разрешены препроцессором, а затем применены к глобальному контексту. 

Работа `index.styl` заключается в переопределении стилей приложения по умолчанию. Согласно принципу приоритета CSS, более поздний стиль имеет более высокий приоритет, поэтому он должен быть сгенерирован в конце файла CSS. 

Простая диаграмма, описывающая порядок компиляции stylus следующим образом:

@flowstart
stage1=>operation: palette.styl
stage2=>operation: стили приложения по умолчанию
stage3=>operation: index.styl

stage1->stage2->stage3
@flowend

<br>

## В чем различия между `clientDynamicModules` и `gainAppFiles`?

Давайте сначала оглянемся назад, и `clientDynamicModules`, и `enhanceAppFiles` могут генерировать модули с динамическим кодом JavaScript во время компиляции.

Разница заключается в том, что файлы, сгенерированные при помощи `enhanceAppFiles`, будут загружены и применены автоматически при инициализации приложения на стороне клиента. В то время как файлы, сгенерированные `clientDynamicModules`, должны быть импортированы как `@dynamic/xxx` самими пользователями.

```js
module.exports = (options, ctx) => ({
  // Импорт по входному файлу автоматически.
  enhanceAppFiles: {
    name: 'constans-a',
    content: `...`
  },

  // Необходимо использовать: import '@dynamic/constans-b'
  clientDynamicModules() {
    return {
      name: 'constans-b',
      content: `...`
    }
  }
})
```

## Когда мне нужно использовать `enhanceAppFiles`?

1. Я хочу выполнить некоторый код на стороне клиента автоматически.
2. У меня нет необходимости повторного использования этого модуля.

**Пример:**

- [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-register-components/index.js#L24): Автоматическая регистрация компонентов на стороне клиента.
- [@vuepress/plugin-pagination](https://github.com/vuejs/vuepress/blob/master/packages/@vuepress/plugin-pagination/index.js#L14): Автоматически вставляемые плагины Vue для расширения API клиента.

## Когда мне нужно использовать `clientDynamicModules`?

1. Я хочу создать динамический модуль, который должен быть вызван в определенное время.
2. Я хочу использовать этот модуль в разных модулях.

**Пример:**

- [@vuepress/plugin-blog](https://github.com/ulivz/vuepress-plugin-blog/blob/master/src/index.ts#L167): Использование метаданных времени компиляции для генерации некоторых динамических модулей, связанных с блогами, и их инициализации на стороне клиента с помощью `EganceAppFiles`.

