# Writing a theme

To write a theme, create a `.vuepress/theme` directory in your docs root, and then create a `Layout.vue` file:

::: vue
.
└─ .vuepress
   └─ `theme`
       └─ Layout.vue
:::

From there it’s the same as developing a normal Vue application. It’s entirely up to you how to organize your theme.

## Content Outlet

The compiled content of the current `.md` file being rendered will be available as a special `<Content/>` global component. You will need to render it somewhere in your layout to display the content of the page. The simplest theme can be a single `Layout.vue` component with the following content:

``` html
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

**Also see:**

- [Markdown Slot](../guide/markdown-slot.md)

## Directory Structure

One `Layout.vue` might not be enough, and you might also want to define more layout components in the theme for using on different pages. You may also want to customize the [palette](../config/README.md#palette-styl), and even apply some plugins.

So it’s time to reorganize your theme, an agreed theme directory structure is as follows:

::: vue
theme
├── `global-components`
│   └── xxx.vue
├── `components`
│   └── xxx.vue
├── `layouts`
│   ├── Layout.vue _(**Mandatory**)_
│   └── 404.vue
├── `styles`
│   ├── index.styl
│   └── palette.styl
├── `templates`
│   ├── dev.html
│   └── ssr.html
├── `index.js`
├── `enhanceApp.js`
└── package.json
:::

- `theme/global-components`: Components under this directory will be automatically registered as global components. For details, please check out [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-register-components).
- `theme/components`: Your components.
- `theme/layouts`: Layout components of the theme, where `Layout.vue` is required.
- `theme/styles`: Global style and palette.
- `theme/templates`: Edit default template.
- `theme/index.js`: Entry file of theme configuration.
- `theme/enhanceApp.js`: Theme level enhancements.

::: warning Note
When you publish your theme as an npm package, if you don’t have any theme configuration, that means you don’t have `theme/index.js`, you’ll need to set the `"main"` field  to `layouts/Layout.vue` in `package.json`, only in this way VuePress can properly resolve the theme.
```json
{
  ...
  "main": "layouts/Layout.vue",
  ...
}
```

:::

## Layout Component

Suppose your theme layouts folder is as follows:

::: vue
theme
└── `layouts`
    ├── Layout.vue
    ├── AnotherLayout.vue
    └── 404.vue
:::

Then, all the pages will use `Layout.vue` as layout component by default, while the routes not matching will use `404.vue`.

To switch the layout of some pages to `AnotherLayout.vue`, all you have to do is update the frontmatter of this page:

```markdown
---
layout: AnotherLayout
---
````

::: tip
Each layout component may render distinct pages. To apply some global UI (for example global header), consider using [globalLayout](./option-api.md#globallayout)。
:::

## Apply plugins

You can apply some plugins to the theme via `theme/index.js`.

```js
module.exports = {
  plugins: [
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }]
  ]
}
```

## Site and Page Metadata

The `Layout` component will be invoked once for every `.md` file in `docs`, and the metadata for the entire site and that specific page will be exposed respectively as `this.$site` and `this.$page` properties which are injected into every component in the app.

This is the value of `$site` of this website:

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

`title`, `description` and `base` are copied from respective fields in `.vuepress/config.js`. `pages` contains an array of metadata objects for each page, including its path, page title (explicitly specified in [YAML frontmatter](../guide/markdown.md#front-matter) or inferred from the first header on the page), and any YAML frontmatter data in that file.

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

Don’t forget that `this.$route` and `this.$router` are also available as part of Vue Router’s API.

::: tip
  `lastUpdated` is the UNIX timestamp of this file’s last git commit, for more details, check out [Last Updated](../theme/default-theme-config.md#last-updated).
:::

## Content Excerpt

If a Markdown file contains a `<!-- more -->` comment, any content above the comment will be extracted and exposed as `$page.excerpt`. If you are building custom theme for blogging, this data can be used to render a post list with excerpts.

## App Level Enhancements

Themes can enhance the Vue app that VuePress uses by exposing an `enhanceApp.js` file at the root of the theme. The file should `export default` a hook function which will receive an object containing some app-level values. You can use this hook to install more Vue plugins, register global components, or add router hooks:

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
