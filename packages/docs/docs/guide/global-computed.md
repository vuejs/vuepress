# Global Computed

In VuePress, some core [computed](https://vuejs.org/v2/guide/computed.html#Computed-Properties) properties are built-in for use by [default theme](../theme/default-theme-config.md) or custom themes.

## $site

This is the `$site` value of the site you see now:

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

This is the `$page` value of the page you see now:

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

The language of the current page, the default value is `en-US`.

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

That is `siteConfig.themeConfig`。
