# 全局计算属性

在 VuePress 中，内置了一些核心的[计算属性](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)，以供[默认主题](../theme/default-theme-config.md) 或自定义主题使用。

## $site

这是你现在看到的这个网站的 `$site` 的值：

``` json
{
  "title": "VuePress",
  "description": "Vue 驱动的静态网站生成器",
  "base": "/",
  "pages": [
    {
      "lastUpdated": 1524027677000,
      "path": "/",
      "title": "VuePress",
      "frontmatter": {}
    },
    ...
  ]
}
```

## $page

这是你现在看到的这个页面的 `$page` 的值：

``` json
{
  "title": "Global Computed",
  "frontmatter": {
    "sidebar": "auto"
  },
  "regularPath": "/zh/miscellaneous/global-computed.html",
  "key": "v-bc9a3e3f9692d",
  "path": "/zh/miscellaneous/global-computed.html",
  "headers": [
    {
      "level": 2,
      "title": "$site",
      "slug": "site"
    },
    {
      "level": 2,
      "title": "$page",
      "slug": "page"
    },
    ...
  ]
}
```

## $frontmatter

[$page](#page).frontmatter 的引用。

## $lang

当前页面的语言，默认值为 `en-US`。

**参考:**

- [多语言支持](i18n.md)

## $localePath

当前页面的 locale 路径前缀，默认值为 `/`，当前页面为 `/zh/`。

**参考:**

- [多语言支持](i18n.md)

## $title

用于当前页面的 `<title>` 标签的值。

## $description

用于当前页面的 `<meta name="description" content="...">` 的 `content` 值。

## $themeConfig

即 `siteConfig.themeConfig`。
