---
en: 6721464184af289875ee11a20bb44c26deb845d1
---

# Расширения Markdown

## Якори заголовков

Для заголовков автоматически создаются ссылки с якорями. Рендеринг якорей можно настроить с помощью опции [`markdown.anchor`](../config/README.md#markdown-anchor).

## Ссылки

### Внутренние ссылки

Входящие ссылки, оканчивающиеся на `.md` или `.html`, преобразуются в `<router-link>` для навигации SPA.

Каждый подкаталог на вашем статическом сайте должен содержать `README.md`. Он будет автоматически преобразован в `index.html`.

::: tip Совет
При записи относительного пути к каталогу `index.html` не забудьте закрыть его с помощью `/`, в противном случае вы получите 404. Например, используйте `/config/` вместо `/config`.
:::

Если вы хотите сделать ссылку на другой файл Markdown в каталоге, не забудьте:

1.  Добавьте его с помощью `.html` или `.md`
2.  Убедитесь, что регистр совпадает, так как путь чувствителен к регистру

#### Пример

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

```md
[Главная](/) <!-- Отправит пользователя в корень README.md -->
[пример](/foo/) <!-- Отправит пользователя в index.html каталога foo -->
[пример якорь заголовка](/foo/#heading) <!-- Отправит пользователя к заголовку в файле foo README -->
[пример - один](/foo/one.html) <!-- Вы можете добавить .html -->
[пример - два](/foo/two.md) <!-- Или вы можете добавить .md -->
```

### Внешние ссылки

К внешним ссылкам автоматически добавляются атрибуты `target="_blank" rel="noopener noreferrer"`:

- [vuejs.org](https://vuejs.org)
- [VuePress на GitHub](https://github.com/vuejs/vuepress)

Вы можете настроить атрибуты, добавленные к внешним ссылкам, установив [config.markdown.externalLinks](../config/README.md#markdown-externallinks).

## Front Matter

[YAML front matter](https://jekyllrb.com/docs/frontmatter/) поддерживается сразу после установки в самом начале файла Markdown:

``` yaml
---
title: Ведение блога, словно хакер
lang: ru-RU
---
```

Эти данные будут доступны для остальной части страницы, а также для всех пользовательских компонентов и компонентов темы.

`title` и `lang` будут автоматически установлены на текущей странице. Кроме того, вы можете указать дополнительные метатеги:

``` yaml
---
meta:
  - name: описание
    content: привет
  - name: ключевое слово
    content: супер пупер SEO
---
```

### Альтернативные форматы Front Matter

Кроме того, VuePress также поддерживает JSON или [TOML](https://github.com/toml-lang/toml) front matter.

JSON должен начинаться и заканчиваться фигурными скобками:

```
---
{
  "title": "Ведение блога, словно хакер",
  "lang": "ru-RU"
}
---
```

TOML front matter должнен быть явно помечен, как TOML:

```
---toml
title = "Ведение блога, словно хакер"
lang = "ru-RU"
---
```

## Таблицы в стиле GitHub

**Входные данные**

```
| Таблицы       | Выводятся     | Классно|
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

**Вывод**

| Таблицы       | Выводятся     | Классно|
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

## Пользовательские контейнеры

**Входные данные**

```
::: tip
Это совет
:::

::: warning
Это предупреждение
:::

::: danger
Это важное предупреждение
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
Это важное предупреждение
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

Вы можете включить номера строк для каждого кодового блока через конфигурацию:

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
  <img class="line-numbers-desktop-snap" alt="Image">
</picture>

<picture>
  <source srcset="/line-numbers-mobile.gif" media="(max-width: 719px)">
  <img class="line-numbers-mobile-snap" alt="Image">
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

## Импорт фрагментов кода <Badge text="beta" type="warn"/> <Badge text="0.10.1+" type="tip"/>

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
<<< @/test/markdown/fragments/snippet.js{2}
```

**Вывод**

<<< @/test/markdown/fragments/snippet.js{2}

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
    config: md => {
      // используйте больше плагинов markdown-it!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```
