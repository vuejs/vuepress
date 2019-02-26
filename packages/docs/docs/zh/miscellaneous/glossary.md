---
sidebar: auto
---

# 术语

你可能会在文档中碰到一些陌生的概念，本节列出了文档中常见的术语，方便查阅、学习、插件/主题开发之用。

## layout

- Access: `$page.frontmatter.layout`

当前页面所使用的布局组件名。

## frontmatter

- Access: `$page.frontmatter`

当前页面的 `markdown` 文件中包裹在 `---` 中的配置，一般用于做一些页面级别的配置，参考 [Front Matter](../guide/frontmatter.md) 一节了解更多。

## permalink

- Access: `$page.frontmatter.permalink`

永久链接，参考 [Permalinks](../guide/permalinks.md) 一节了解更多。

## regularPath

- Access: `$page.regularPath`

当前页面基于目录结构生成的 URL。

## path

- Access: `$page.path`

当前页面的实际 URL。在构建期生成路由时，一个页面的 URL 将优先使用 `permalink`，若不存在则降级到 `regularPath`。

## headers

- Access: `$page.headers`

即 `markdown` 中那些以一个或多个 `#` 定义的标题。

## siteConfig

- Access: `$site | Context.siteConfig`

即 `.vuepress/config.js`，译为 `站点配置`。

## themeConfig

- Access: `$themeConfig | Context.themeConfig`

即 `.vuepress/config.js` 中 `themeConfig` 的值，是用户对当前所使用的主题的配置。

## themePath

- Access: `Context.themeAPI.theme.path`

当前使用的主题的所在的绝对路径。

## themeEntry

- Access: `Context.themeAPI.theme.entry`

主题的配置文件 `themePath/index.js`。

## parentThemePath

- Access: `Context.themeAPI.parentTheme.path`

如果当前使用的主题是一个派生主题，那么 `parentThemePath` 就是指父主题的所在绝对路径。

## parentThemeEntry

- Access: `Context.themeAPI.parentTheme.entry`

如果当前使用的主题是一个派生主题，那么 `parentThemePath` 就是指父主题的主题的配置文件 `parentThemePath/index.js`。

