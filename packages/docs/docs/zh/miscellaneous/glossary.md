---
sidebar: auto
---

# 术语

你可能会在文档中碰到一些陌生的概念，本节列出了文档中常见的术语，方便查阅、学习、插件/主题开发之用。

## frontmatter

> Access: `$page.frontmatter`

当前页面的 `markdown` 文件中包裹在 `---` 中的配置，一般用于做一些页面级别的配置。

::: tip
VuePress 的动态布局系统等特性是基于 `frontmatter` 实现的，你可以使用插件 API [extendPageData](../plugin/option-api.md#extendpagedata) 在构建期间动态修改 frontmatter 的值。
:::

## permalink

> Access: `$page.frontmatter.permalink`

永久链接，参考 [permalinks](../guide/permalinks.md) 了解更多。

## regularPath

> Access: `$page.regularPath`

当前页面基于目录结构生成的 URL。

::: tip
在构建期动态生成路由时，一个页面的 URL (`$page.path`) 将优先使用 `$page.frontmatter.permalink`，若不存在则降级到 `$page.regularPath`。
:::

## headers

> Access: `$page.headers`

即 `markdown` 中那些以一个或多个 `#` 定义的标题。

## siteConfig

> Access: `$site | Context.siteConfig`

即 `.vuepress/config.js`，译为`站点配置`。

## themeConfig

> Access: `$site | Context.themeConfig`

即 `.vuepress/config.js` 中 `themeConfig` 的值，译为`用户的主题配置`。

## themePath

> Access: `Context.themePath`

当前使用的主题的根路径（绝对路径）。

## themeEntryFile

> Access: `Context.themeEntryFile`

主题的配置文件 (`themePath/index.js`)。

## layout

> Access: `$page.frontmatter.layout`

当前页面所使用的布局组件名。
