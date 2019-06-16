---
en: d7ce45f51ec6407df5057988d4313f2f3d468cad
lang: ru-RU
title: register-components
metaTitle: Плагин Регистрация компонентов | VuePress
---

# [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-register-components)

> Плагин регистрации компонентов для vuepress

## Установка

```bash
yarn add -D @vuepress/plugin-register-components@next
# ИЛИ npm install -D @vuepress/plugin-register-components@next
```

## Использование

```javascript
module.exports = {
  plugins: ['@vuepress/register-components']
}
```

## Опции

### componentsDir

- Тип: `Array | String`
- По умолчанию: `[]`

Все компоненты в этом каталоге будут зарегистрированы как глобальные компоненты, именование компонентов будет соответствовать компонентам, найденным в [.vuepress/components](https://vuepress.vuejs.org/guide/using-vue.html#using-components).

``` js
module.exports = {
  plugins: [
    [ 
      'register-components', 
      {
        componentsDir: somepath
      }
    ]
  ] 
}
```

### components

- Тип: `{ name: string, path: string }`
- По умолчанию: `[]`

Зарегистрируйте глобальные компоненты по явному имени и пути.

``` js
module.exports = {
  plugins: [
    [ 
      'register-components', 
      {
        components: [
          {
            name: 'V-Card',
            path: 'path/to/card.vue'
          }
        ]
      }
    ]
  ]
}
```

### getComponentName

- Тип: `(file: string) => string`
- По умолчанию: `file => file.replace(/\/|\\/g, '-')`

Настройте имена компонентов для файлов в `componentsDir`.
