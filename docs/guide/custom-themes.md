# Custom Themes

::: tip
Theme components are subject to the same [browser API access restrictions](./using-vue.md#browser-api-access-restrictions).
:::

VuePress uses Vue single file components for custom themes. To use a custom layout, create a `.vuepress/theme` directory in your docs root, and then create a `Layout.vue` file:

```
.
└─ .vuepress
   └─ theme
      └─ Layout.vue
```

From there it's the same as developing a normal Vue application. It is entirely up to you how to organize your theme.

## Site and Page Metadata

The `Layout` component will be invoked once for every `.md` file in `docs`, and the metadata for the entire site and that specific page will be exposed respectively as `this.$site` and `this.$page` properties which are injected into every component in the app.

This is the value of `$site` of this very website:

``` json
{
  "title": "VuePress",
  "description": "Vue-powered Static Site Generator",
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

`title`, `description` and `base` are copied from respective fields in `.vuepress/config.js`. `pages` contains an array of metadata objects for each page, including its path, page title (explicitly specified in [YAML front matter](./markdown.md#front-matter) or inferred from the first header on the page), and any YAML front matter data in that file.

This is the `$page` object for this page you are looking at:

``` json
{
  "lastUpdated": 1524847549000,
  "path": "/guide/custom-themes.html",
  "title": "Custom Themes",
  "headers": [/* ... */],
  "frontmatter": {}
}
```

If the user provided `themeConfig` in `.vuepress/config.js`, it will also be available as `$site.themeConfig`. You can use this to allow users to customize behavior of your theme - for example, specifying categories and page order. You can then use these data together with `$site.pages` to dynamically construct navigation links.

Finally, don't forget that `this.$route` and `this.$router` are also available as part of Vue Router's API.

::: tip
  `lastUpdated` is the UNIX timestamp of this file's last git commit, for more details, refer to [Last Updated](../default-theme-config/README.md#last-updated).

:::

## Content Excerpt

If a markdown file contains a `<!-- more -->` comment, any content above the comment will be extracted and exposed as `$page.excerpt`. If you are building custom theme for blogging, this data can be used to render a post list with excerpts.

## Content Outlet

The compiled content of the current `.md` file being rendered will be available as a special `<Content/>` global component. You will need to render it somewhere in your layout in order to display the content of the page. The simplest theme can be just a single `Layout.vue` component with the following content:

``` html
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

## App Level Enhancements

Themes can enhance the Vue app that VuePress uses by exposing an `enhanceApp.js` file at the root of the theme. The file should `export default` a hook function which will receive an object containing some app level values. You can use this hook to install additional Vue plugins, register global components, or add additional router hooks:

``` js
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app
}
```

## Using Theme from a Dependency

Themes can be published on npm in raw Vue SFC format as `vuepress-theme-xxx`.

To use a theme from an npm dependency, provide a `theme` option in `.vuepress/config.js`:

``` js
module.exports = {
  theme: 'awesome'
}
```

VuePress will attempt to locate and use `node_modules/vuepress-theme-awesome/Layout.vue`.

## Customizing the Default Theme

The `vuepress eject [targetDir]` command will copy the default theme source code into `.vuepress/theme` to allow complete customization. Note, however, once you eject, you are on your own and won't be receiving future updates or bug fixes to the default theme even if you upgrade VuePress.
