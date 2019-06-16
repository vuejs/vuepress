---
en: 1cf5607013d20bcd04fd92737eab2e5e79710b5a
lang: ru-RU
---

# Глобальные вычисления

В VuePress некоторые свойства ядра [computed](https://vuejs.org/v2/guide/computed.html#Computed-Properties) встроены для использования в [тему по умолчанию](../theme/default-theme-config.md) или пользовательские темы.

## $site

Значение `$site` сайта, который вы видите сейчас:

``` json
{
  "title": "VuePress",
  "description": "Статический генератор сайтов на Vue",
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

Это значение `$page` страницы, которую вы видите сейчас:

``` json
{
  "title": "Глобальные вычисления",
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

## $frontmatter

Ссылка на [$page](#page) frontmatter.

## $lang

Язык текущей страницы, значение по умолчанию: `en-US`.

**Смотрите также:**

- [Интернационализация](../guide/i18n.md)

## $localePath

Префикс пути локали для текущей страницы, значением по умолчанию является `/`.

**Смотрите также:**

- [Интернационализация](../guide/i18n.md)

## $title

Значение метки `<title>`, используемой для текущей страницы.

## $description

Значение `content` `<meta name= "description" content= "...">` для текущей страницы.

## $themeConfig

например, `siteConfig.themeConfig`.
