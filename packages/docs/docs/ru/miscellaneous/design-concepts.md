---
en: b79de5ff8220e74858a84d60892de19867a538a6
lang: ru-RU
sidebar: auto
---

# Концепции дизайна VuePress 1.x

Концепции дизайна VuePress 1.x в основном отражены в следующих аспектах:

1. Плагины.
2. Соглашение по конфигурации.
3. Разумное управление приоритетами.

## Плагины

VuePress 1.0 был полностью переписан, и наиболее важным является введение [API Плагинов](../plugin/README.md). Так в чем же преимущества плагинов?

### Разделение

С помощью плагинов мы можем реализовать многие основные функции, и вы можете увидеть множество встроенных плагинов [здесь](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core/lib/node/internal-plugins), которые охватывают многие основные функции VuePress, которые раньше смешивались во всех частях базы кода, но теперь они понятны с первого взгляда.

### Управление конфигурацией

В прошлом, когда мы сталкивались с некоторыми менее распространенными требованиями, у нас были некоторые сомнения: если мы хотим не поддерживать его, сценарии использования VuePress были ограничены; но если мы хотели поддержать его, нам пришлось записать его в базовый код и настроить для него отдельный API-интерфейс конфигурации. Для сопровождающих, помимо того, что они не способствуют долгосрочному обслуживанию, это иногда заставляет нас чувствовать себя истощенными. Мы должны думать о некоторых лучших решениях. Да, это плагин.

### `.vuepress/config.js` также плагин

Да, ваш файл конфигурации также является плагином, поэтому вы можете напрямую использовать API плагинов, не создавая для него новый плагин и не импортируя его в конфигурацию.

::: tip
Опции, поддерживаемые `.vuepress/config.js`, на самом деле основаны на опциях плагина и добавляют некоторые специфические опции.
:::


### `theme/index.js` также плагин

Корневой файл конфигурации темы также является плагином.

::: tip
Как и в `.vuepress/config.js`, параметры, поддерживаемые в `theme/config.js`, основаны на параметрах плагина и добавляют некоторые конкретные параметры. Используя график, чтобы выразить их связь:

<svg viewBox="0 0 2806 912" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 51 (57462) - http://www.bohemiancoding.com/sketch -->
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect id="Rectangle-3" fill-opacity="0" fill="#FFFFFF" x="0" y="0" width="2806" height="912"></rect>
        <circle id="Oval" stroke="#979797" fill="#EC5975" cx="1212.5" cy="455.5" r="355.5"></circle>
        <circle id="Oval" stroke="#979797" fill="#937AC4" cx="1592.5" cy="455.5" r="355.5"></circle>
        <path d="M1402.5,155.000018 C1501.96722,218.018606 1568,329.058303 1568,455.520781 C1568,581.983259 1501.96722,693.022956 1402.5,756.041544 C1303.03279,693.022977 1237,581.983271 1237,455.520781 C1237,329.058291 1303.03279,218.018585 1402.50003,155 Z" id="Combined-Shape" stroke="#FFFFFF" stroke-width="10" fill="#00BD8C"></path>
        <text id=".vuepress/-config.js" font-family="ArialMT, Arial" font-size="60" font-weight="normal" fill="#FFFFFF">
            <tspan x="901.101562" y="436">.vuepress/</tspan>
            <tspan x="929.446289" y="503">config.js</tspan>
        </text>
        <text id="Plugin-API" font-family="ArialMT, Arial" font-size="72" font-weight="normal" fill="#FFFFFF">
            <tspan x="1302.42773" y="436">Plugin</tspan>
            <tspan x="1344.47461" y="516">API</tspan>
        </text>
        <text id="theme/-index.js" font-family="ArialMT, Arial" font-size="60" font-weight="normal" fill="#FFFFFF">
            <tspan x="1662.78613" y="436">theme/</tspan>
            <tspan x="1652.78125" y="503">index.js</tspan>
        </text>
    </g>
</svg>
:::

### Применение плагинов в плагине

В VuePress у вас есть возможность применить некоторые плагины в плагине:

```js
// vuepress-plugin-xxx
module.exports = {
  plugins: [
    'a', 'b', 'c'
  ]
}
```

## Соглашение по конфигурации.

VuePress 1.0 начинает вводить некоторые соглашения, чтобы уменьшить чрезмерную нагрузку на конфигурацию пользователя, наиболее интуитивным проявлением этого являются соглашения для [структуры каталогов документов](../guide/directory-structure.md) и [структуры каталогов тем](../theme/writing-a-theme.md#структура-каталогов).

В будущем мы можем объединить отзывы сообщества, чтобы ввести больше соглашений. Давайте подождем и посмотрим.

## Разумное управление приоритетами.

Старшие пользователи обнаружили, что как разработчики тем, так и обычные пользователи имеют возможность настраивать глобальные  `palettes`, `styles`, `templates` и `plugins`, так как они работают вместе?

### Приоритет загрузки

Для `templates/*` следует определенному приоритету загрузки. Взяв в качестве примера `templates/ssr.html`:

@flowstart
cond1=>condition: Пользовательский ssr.html
существует?
cond2=>condition: ssr.html в теме
существует?
stage1=>operation: Использование ssr.html пользователя
stage2=>operation: Использование ssr.html темы
stage3=>operation: Использование ssr.html по умолчанию

cond1(no, right)->cond2(no)->stage3
cond1(yes, bottom)->stage1
cond2(yes, bottom)->stage2
@flowend

::: warning Заметка
При настройке `templates/ssr.html` или `templates/dev.html` лучше всего изменить его на основе [файлов шаблонов по умолчанию](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/app/index.dev.html), иначе это может вызвать сбой сборки.
:::

### Переопределение

Для `palette.styl`, `index.styl` и `plugins` следуйте принципам переопределения:

#### palette.styl

Пользовательский `styles/palette.styl` имеет более высокий приоритет, чем `styles/palette.styl` темы, поэтому тема может определить свою собственную палитру, а пользователь может настроить ее, например:

```stylus
// theme/styles/palette.styl
$accentColor = #0f0
```

```stylus
// .vuepress/styles/palette.styl
$accentColor = #f00
```

Таким образом, окончательное значение `$accentColor` равно `#f00`.

#### index.styl

И пользовательский файл `styles/index.styl` и файл `styles/index.styl` темы генерируются в окончательный файл `CSS`, но стиль пользователя генерируется позже и поэтому имеет более высокий приоритет, например:

```stylus
// theme/styles/index.styl
.content
  font-size 14px
```

```stylus
// .vuepress/styles/index.styl
.content
  font-size 15px
```

Окончательный сгенерированный CSS выглядит следующим образом:

```css
/* theme/styles/index.styl */
.content {
  font-size: 14px;
}

/* theme/styles/index.styl */
.content {
  font-size: 15px;
}
```

#### plugins

Поскольку по умолчанию все плагины с одинаковым именем могут применяться ТОЛЬКО один раз, пользователи могут переопределить параметры по умолчанию для плагинов в теме, например:

```js
// theme/index.js
module.exports = {
  plugins: [
    'vuepress-plugin-xxx',
    { name: 'foo' }
  ]
}
```

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    'vuepress-plugin-xxx',
    { name: 'bar' }
  ] 
}
```

Тогда окончательным значением опции `name` будет `bar`.


## Другое

С целью развязки мы смогли разделить VuePress на следующие две библиотеки, введя monorepo:

- [@vuepress/core](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/core)：Включает базовую реализацию `dev`, `build` и `API Плагинов`;
- [@vuepress/theme-default](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/theme-default)：Тема по умолчанию, которую вы видите сейчас.

Конечно, для большинства пользователей вам не нужно заботиться об этих трех библиотеках, пакет [vuepress](https://www.npmjs.com/search?Q=vuepress) уже собрал их вместе, поэтому вы можете использовать VuePress как `0.x`.


