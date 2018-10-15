---
sidebar: auto
---

# Global Computed

In VuePress, some core [computed](https://vuejs.org/v2/guide/computed.html#Computed-Properties) properties are built in for use by [default theme](../theme/default-theme-config.md) or custom themes.

## $site

This is the `$site` value of the website you see now:

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

This is the `$page` value of the page you see now:

``` json
{
  "title": "Global Computed",
  "frontmatter": {},
  "regularPath": "/miscellaneous/global-computed.html",
  "key": "v-d4cbeb69eff3d",
  "path": "/miscellaneous/global-computed.html",
  "headers": [
    {
      "level": 2,
      "title": "$site",
      "slug": "site"
    },
    {
      "level": 2,
      "title": "$page",
      "slug": "$page"
    },
    ...
  ]
}
```

## $lang

The language of the current page. default value is `en-US`.

**Also see:**

- [Internationalization](../guide/i18n.md)

## $localePath

The locale path prefix for the current page, the default value is `/`.

**Also see:**

- [Internationalization](../guide/i18n.md)

## $title

Value of the `<title>` label used for the current page.

## $description

The `content` value of the `<meta name= "description" content= "...">` for the current page.

## $themeConfig

i.e. `siteConfig.themeConfig`。
