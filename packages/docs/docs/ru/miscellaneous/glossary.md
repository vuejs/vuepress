---
en: 86baf096df24d15ba6732fc7d2d90cf96a93d0e2
lang: ru-RU
sidebar: auto
---

# Словарь

Вы можете столкнуться с некоторыми незнакомыми понятиями в документации. В этом разделе перечислены общие термины в документации для легкого доступа, изучения и разработки плагинов/тем.

## layout

- Доступ: `$page.frontmatter.layout`

Имя компонента макета, используемого текущей страницей.

## frontmatter

- Доступ: `$page.frontmatter`

Конфигурация, обернутая `---` в файле `markdown` текущей страницы, который обычно используется для некоторой конфигурации на уровне страницы. Для получения более подробной информации смотрите [Front Matter](../guide/frontmatter.md).

## permalink

- Доступ: `$page.frontmatter.permalink`

Постоянные ссылки. Для получения более подробной информации, пожалуйста, перейдите по ссылке [Постоянные ссылки](../guide/permalinks.md).

## regularPath

- Доступ: `$page.regularPath`

Текущая страница основана на URL, сгенерированном структурой каталогов.

::: tip
При динамическом создании маршрутов в течение периода сборки, URL страницы (`$page.path`) будет сначала использовать `$page.frontmatter.permalink`, а если он не существует, он будет понижен до `$page.regularPath`.
:::

## headers

- Доступ: `$page.headers`

Заголовки, которые определены одним или несколькими `#` в `markdown`.

## siteConfig

- Доступ: `$site | Context.siteConfig`

`.vuepress/config.js`, например, `site configuration`。

## themeConfig

- Доступ: `$themeConfig | Context.themeConfig`

Значение `themeConfig` в `.vuepress/config.js`, т.е. конфигурация темы пользователя.

## themePath

- Доступ: `Context.themeAPI.theme.path`

Корневой путь (абсолютный путь) текущей используемой темы.

## themeEntry

- Доступ: `Context.themeAPI.theme.entry`

Файл конфигурации темы - `themePath/index.js`.

## parentThemePath

- Доступ: `Context.themeAPI.parentTheme.path`

Если текущая тема является производной, то `parentThemePath` ссылается на абсолютный путь родительской темы.

## parentThemeEntry

- Доступ: `Context.themeAPI.parentTheme.entry`

Если текущая тема является производной темой, `parentThemePath` ссылается на конфигурацию темы родительской темы.

