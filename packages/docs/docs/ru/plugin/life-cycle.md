---
en: f566ad6ebfb4c6e9749875f81c3ba7dbd473f2de
lang: ru-RU
---

# Жизненный цикл

## ready

- Тип: `AsyncFunction`
- Доступность：`dev|build`

```js
module.exports = {
  async ready() {
    // ...
  }
}
```

::: tip
Хук `ready` выполняется после инициализации приложения и перед выполнением некоторых конкретных функциональных API. Функциональные API включают в себя:

- [clientDynamicModules](./option-api.md#clientdynamicmodules)
- [enhanceAppFiles](./option-api.md#enhanceappfiles)

:::

## updated

- Тип: `Function`
- Доступность：`dev`

```js
module.exports = {
  updated() {
    // ...
  }
}
```

## generated

- Тип: `AsyncFunction`
- Доступность：`build`

Вызывается при завершении (производственной) сборки с массивом сгенерированных путей HTML страницы.

``` js
module.exports = {
  async generated (pagePaths) {
    // ...
  }
}
```
