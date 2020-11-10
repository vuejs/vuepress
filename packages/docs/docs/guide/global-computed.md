# Global Computed

In VuePress, some core [computed properties](https://vuejs.org/v2/guide/computed.html#Computed-Properties) can be used by the [default theme](../theme/default-theme-config.md) or custom themes. Or in Markdown pages [using vue](./using-vue.md#access-to-site-page-data).

## $site

This is the `$site` value of the site you’re currently reading:

``` json
{
  "title": "VuePress",
  "description": "Vue-powered static site generator",
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

This is the `$page` value of the page you’re currently reading:

``` json
{
  "title": "Global Computed",
  "frontmatter": {},
  "regularPath": "/guide/global-computed.html",
  "key": "v-d4cbeb69eff3d",
  "path": "/guide/global-computed.html",
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

## $frontmatter

Reference of [$page](#page).frontmatter.

## $lang

The language of the current page. Default: `en-US`.

For more information, see [Internationalization](../guide/i18n.md).

## $localePath

The locale path prefix for the current page. Default: `/`.

For more information, see [Internationalization](../guide/i18n.md).

## $title

Value of the `<title>` label used for the current page.

## $description

The `content` value of the `<meta name= "description" content= "...">` for the current page.

## $themeConfig

Refers to `siteConfig.themeConfig`.
