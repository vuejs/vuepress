---
en: b844515fbf8f932c848245949fe8b621c40f54da
lang: ru-RU
---

# Расширения Markdown

## Якори заголовков

Для заголовков автоматически создаются ссылки с якорями. Рендеринг якорей можно настроить с помощью опции [`markdown.anchor`](../config/README.md#markdown-anchor).

## Ссылки

### Внутренние ссылки

Внутренние ссылки преобразуются в `<router-link>` для навигации SPA. Кроме того, каждый `README.md` или `index.md`, содержащийся в каждом подкаталоге, будет автоматически преобразован в `index.html` с соответствующим URL `/`.

Учитывая следующую структуру каталогов:

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

И если вы находитесь в `foo/one.md`:

```md
[Главная](/) <!-- Отправит пользователя в корень README.md -->
[foo](/foo/) <!-- Отправит пользователя в index.html каталога foo -->
[foo heading](./#heading) <!-- Отправит пользователя к заголовку в файле foo README -->
[bar - three](../bar/three.md) <!-- Вы можете добавить .md (рекомендуется) -->
[bar - four](../bar/four.html) <!-- Или вы можете добавить .html -->
```

### Перенаправление для URL <Badge text="1.0.0-alpha.37"/>

VuePress поддерживает перенаправление на чистые ссылки. Если ссылка `/foo` не найдена, VuePress будет искать существующий `/foo/` или `/foo.html`. И наоборот, когда один из `/foo/` или `/foo.html` не найден, VuePress также попытается использовать другой. С помощью этой функции мы можем настроить URL вашего сайта с помощью официального плагина [vuepress-plugin-clean-urls](https://vuepress.github.io/plugins/clean-urls/).

::: tip
Независимо от того, используются ли постоянные и чистые ссылки, ваш относительный путь должен определяться текущей файловой структурой. В приведенном выше примере, даже если вы установили путь к `/foo/one.md` в качестве `/foo/one/`, вы все равно должны получить доступ к `/foo/two.md` через `./two.md`.
:::

### Внешние ссылки

Внешние ссылки автоматически получают атририбуты `target="_blank" rel="noopener noreferrer"`:

- [vuejs.org](https://vuejs.org)
- [VuePress на GitHub](https://github.com/vuejs/vuepress)

Вы можете настроить атрибуты, добавленные к внешним ссылкам, установив [config.markdown.externalLinks](../config/README.md#markdown-externallinks).

## Front Matter

[YAML front matter](https://jekyllrb.com/docs/frontmatter/) поддерживается из коробки:

``` yaml
---
title: Заголовок
lang: ru-RU
---
```

Эти данные будут доступны для остальной части страницы, а также для всех пользовательских компонентов и компонентов темы.

Для получения более подробной информации посетите страницу [Front Matter](./frontmatter.md).

## Таблицы в стиле GitHub

**Входные данные**

```
| Таблицы       | Очень         | Классные |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

**Вывод**

| Таблицы       | Очень         | Классные |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Emoji :tada:

**Входные данные**

```
:tada: :100:
```

**Вывод**

:tada: :100:

Список всех доступных emoji можно найти [здесь](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

## Оглавление

**Входные данные**

```
[[toc]]
```

**Вывод**

[[toc]]

Рендеринг оглавления можно настроить с помощью опции [`markdown.toc`](../config/README.md#markdown-toc).

## Пользовательские контейнеры <Badge text="default theme"/>

**Входные данные**

```
::: tip
Это совет
:::

::: warning
Это предупреждение
:::

::: danger
Это опасное предупреждение
:::
```

**Вывод**

::: tip
Это совет
:::

::: warning
Это предупреждение
:::

::: danger
Это опасное предупреждение
:::

Вы также можете настроить заголовок блока:

```
::: danger СТОП
Опасная зона, не продолжать
:::
```

::: danger СТОП
Опасная зона, не продолжать
:::

**Смотрите также:**

- [vuepress-plugin-container](https://vuepress.github.io/plugins/container/)

## Подсветка синтаксиса в блоках кода

VuePress использует [Prism](https://prismjs.com/) для выделения синтаксиса языка в блоках кода Markdown, используя цветной текст. Prism поддерживает широкий спектр языков программирования. Все, что вам нужно сделать, это добавить корректный псевдоним языка к начальным обратным кавычкам для блока кода:

**Входные данные**

````
``` js
export default {
  name: 'MyComponent',
  // ...
}
```
````

**Вывод**

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

**Входные данные**

````
``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
````

**Вывод**

``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

Проверьте [список доступных языков](https://prismjs.com/#languages-list) на веб-сайте Prism.

## Подсветка строк в блоках кода

**Входные данные**

````
``` js{4}
export default {
  data () {
    return {
      msg: 'Подсветка!'
    }
  }
}
```
````

**Вывод**

``` js{4}
export default {
  data () {
    return {
      msg: 'Подсветка!'
    }
  }
}
```

## Номера строк

Вы можете включить номера строк для каждого кодового блока через настройку:

``` js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}  
```

<!-- TODO Поддержка нумерации строк для конкретного блока -->

- Пример:

<picture>
  <source srcset="/line-numbers-desktop.png" media="(min-width: 719px)">
  <img src="/line-numbers-desktop.png" class="line-numbers-desktop-snap" alt="Image">
</picture>

<picture>
  <source srcset="/line-numbers-mobile.gif" media="(max-width: 719px)">
  <img src="/line-numbers-mobile.gif" class="line-numbers-mobile-snap" alt="Image">
</picture>

<style>
  @media screen and (min-width:  719px) {
    .line-numbers-mobile-snap {
       display: none;
    }
  }
  @media screen and (max-width:  719px) {
    .line-numbers-desktop-snap {
       display: none;
    }
    .line-numbers-mobile-snap {
      max-width: none!important;
      margin: 0 -1.5rem;
      width: 100vw;
    }
  }
</style>

## Импорт фрагментов кода <Badge text="beta" type="warn"/>

Вы можете импортировать фрагменты кода из существующих файлов с помощью следующего синтаксиса:

``` md
<<< @/filepath
```

Также поддерживает [подсветку строк](#подсветка-строк-в-блоках-кода):

``` md
<<< @/filepath{highlightLines} 
```

**Входные данные**

``` md
<<< @/../@vuepress/markdown/__tests__/fragments/snippet.js{2}
```

**Вывод**

<<< @/../@vuepress/markdown/__tests__/fragments/snippet.js{2}

::: tip
  Поскольку импорт фрагментов кода будет выполнен до компиляции webpack, вы не можете использовать псевдоним пути в webpack. Значением по умолчанию `@` является `process.cwd()`.
:::


## Расширенная конфигурация

VuePress использует [markdown-it](https://github.com/markdown-it/markdown-it) в качестве средства визуализации Markdown. Многие из вышеперечисленных расширений реализованы с помощью пользовательских плагинов. Вы можете дополнительно настроить экземпляр `markdown-it`, используя опцию `markdown` в `.vuepress/config.js`:

``` js
module.exports = {
  markdown: {
    // опции для markdown-it-anchor
    anchor: { permalink: false },
    // опции для markdown-it-toc
    toc: { includeLevel: [1, 2] },
    extendMarkdown: md => {
      // используйте больше плагинов markdown-it!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```
