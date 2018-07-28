---
sidebar: auto
---

# Default Theme Config

<Bit/>

::: tip
All options listed on this page apply to the default theme only. If you are using a custom theme, the options may be different.
:::

## Homepage

The default theme provides a homepage layout (which is used on [the homepage of this very website](../README.md)). To use it, specify `home: true` plus some other metadata in your root `README.md`'s [YAML front matter](../guide/markdown.md#front-matter). This is the actual data used on this site:

``` yaml
---
home: true
heroImage: /hero.png
actionText: Get Started →
actionLink: /guide/
features:
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
  details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
  details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

Any additional content after the `YAML front matter` will be parsed as normal markdown and rendered after the features section.

If you want to use a completely custom homepage layout, you can also use a [Custom Layout](#custom-layout-for-specific-pages).

## Navbar

The Navbar may contain your page title, [Search Box](#search-box), [Navbar Links](#navbar-links), [Languages](../guide/i18n.md) and [Repository Link](#git-repo-and-edit-links), all of them depends on your configuration.

### Navbar Links

You can add links to the navbar via `themeConfig.nav`:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

These links can also be dropdown menus if you provide an array of `items` instead of a `link`:

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      }
    ]
  }
}
```

In addition, you can have sub groups inside a dropdown by having nested items:

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```

### Disable the Navbar

To disable the navbar globally, use `themeConfig.navbar`:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
```

You can disable the navbar for a specific page via `YAML front matter`:

``` yaml
---
navbar: false
---
```

## Sidebar

To enable the sidebar, use `themeConfig.sidebar`. The basic configuration expects an Array of links:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
```

You can omit the `.md` extension, and paths ending with `/` are inferred as `*/README.md`. The text for the link is automatically inferred (either from the first header in the page or explicit title in `YAML front matter`). If you wish to explicitly specify the link text, use an Array in form of `[link, text]`.

### Nested Header Links

The sidebar automatically displays links for headers in the current active page, nested under the link for the page itself. You can customize this behavior using `themeConfig.sidebarDepth`. The default depth is `1`, which extracts the `h2` headers. Setting it to `0` disables the header links, and the max value is `2` which extracts both `h2` and `h3` headers.

A page can also override this value in using `YAML front matter`:

``` md
---
sidebarDepth: 2
---
```

### Displaying Header Links of All Pages <Badge text="0.11.0+"/>

The sidebar only displays links for headers in the current active page. You can display all header links for every page with `themeConfig.displayAllHeaders: true`:

``` js
module.exports = {
  themeConfig: {
    displayAllHeaders: true // Default: false
  }
}
```

### Active Header Links

By default, the nested header links and the hash in the URL are updated as the user scrolls to view the different sections of the page. This behavior can be disabled with the following theme config:

``` js
module.exports = {
  themeConfig: {
    activeHeaderLinks: false, // Default: true
  }
}
```

::: tip
  It is worth mentioning that when you disable this option, the corresponding script of this functionality will not be loaded. This is a small point in our performance optimization.
:::

### Sidebar Groups

You can divide sidebar links into multiple groups by using objects:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
```

Sidebar groups are collapsable by default. You can force a group to be always open with `collapsable: false`.

### Multiple Sidebars

If you wish to display different sidebars for different sections of content, first organize your pages into directories for each desired section:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

Then, update your configuration to define your sidebar for each section.

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  }
}
```

::: warning
Make sure to define the fallback configuration last.

VuePress checks each sidebar config from top to bottom. If the fallback configuration was first, VuePress would incorrectly match `/foo/` or `/bar/four.html` because they both start with `/`.
:::

### Auto Sidebar for Single Pages

If you wish to automatically generate a sidebar that contains only the header links for the current page, you can use `YAML front matter` on that page:

``` yaml
---
sidebar: auto
---
```

You can also enable it in all pages by using config:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
```

In [multi-language](../guide/i18n.md) mode, you can also apply it to a specific locale:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
     '/': {
       sidebar: 'auto'
     }
  }
}
```

### Disabling the Sidebar

You can disable the sidebar on a specific page with `YAML front matter`:

``` yaml
---
sidebar: false
---
```

## Search Box

### Built-in Search

You can disable the built-in search box with `themeConfig.search: false`, and customize how many suggestions to be shown with `themeConfig.searchMaxSuggestions`:

``` js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

::: tip
Built-in Search only builds index from the title, `h2` and `h3` headers, if you need full text search, you can use [Algolia Search](#algolia-search).
:::

### Algolia Search

The `themeConfig.algolia` option allows you to use [Algolia DocSearch](https://community.algolia.com/docsearch/) to replace the simple built-in search. To enable it, you need to provide at least `apiKey` and `indexName`:

``` js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
```

::: warning Note
Unlike the [built-in search](#built-in-search) engine which works out of the box, [Algolia DocSearch](https://community.algolia.com/docsearch/) requires you to submit your site to them for indexing before it starts working. 
:::

For more options, refer to [Algolia DocSearch's documentation](https://github.com/algolia/docsearch#docsearch-options).

## Last Updated

The `themeConfig.lastUpdated` option allows you to get the UNIX timestamp(ms) of each file's last `git` commit, and it will also display at the bottom of each page with a appropriate format:

``` js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

Note that it's `off` by default. If given `string`, it will be displayed as a prefix (default value: `Last Updated`).

::: warning
  Since `lastUpdated` is based on `git`, you can only use it in a `git` repository. As well, since the timestamp used comes from the git commit, it will display only after a first commit for a given page, and update only on subsequent commits of that page.
:::

## Service Worker

The `themeConfig.serviceWorker` option allows you to configure about service worker.

::: tip
Please do not confuse this option with [Config > serviceWorker](../config/README.md#serviceworker), [Config > serviceWorker](../config/README.md#serviceworker) is **site-level**, while this option is **theme-level**.
:::

### Popup UI to refresh contents <Badge text="0.13.0+"/>

The `themeConfig.serviceWorker.updatePopup` option enables the popup to refresh contents. The popup will be shown when the site is updated (i.e. service worker is updated). It provides `refresh` button to allow users to refresh contents immediately.

::: tip NOTE
If without the `refresh` button, the new service worker will be active after all [clients](https://developer.mozilla.org/en-US/docs/Web/API/Clients) are closed. This means that visitors cannot see new contents until they close all tabs of your site. But the `refresh` button activates the new service worker immediately.
:::

``` js
module.exports = {
  themeConfig: {
    serviceWorker: {
      updatePopup: true // Boolean | Object, default to undefined.
      // If set to true, the default text config will be: 
      // updatePopup: { 
      //    message: "New content is available.", 
      //    buttonText: "Refresh" 
      // }
    }
  }
}
```

## Prev / Next Links

Prev and next links are automatically inferred based on the sidebar order of the active page. You can also explicitly overwrite or disable them using `YAML front matter`:

``` yaml
---
prev: ./some-other-page
next: false
---
```

## Git Repo and Edit Links

Providing `themeConfig.repo` auto generates a GitHub link in the navbar and "Edit this page" links at the bottom of each page.

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'vuejs/vuepress',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'vuejs/vuepress',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!'
  }
}
```

You can also hide the edit link on a specific page via `YAML front matter`:

``` yaml
---
editLink: false
---
```

## Simple CSS Override

If you wish to apply simple overrides to the styling of the default theme, you can create an `.vuepress/override.styl` file. This is a [Stylus](http://stylus-lang.com/) file but you can use normal CSS syntax as well.

There are a few color variables you can tweak:

``` stylus
// showing default values
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```

### Existing issues <Badge text="< 0.12.0" type='error'/>

In order to override the default variables mentioned above, `override.styl` will be imported at the end of the `config.styl` in default theme, and this file will be used by multiple files, so once you wrote styles here, your style would be duplicated by multiple times. See [#637](https://github.com/vuejs/vuepress/issues/637).

### Migrate your styles to `style.styl` <Badge text="0.12.0+"/>

In fact, The `stylus constants override` should be completed before all Stylus files are compiled; and the `user's additional CSS styles` should be generated at the end of the final style file. Therefore, these two duties should not be completed by the same stylus file.

Start from `0.12.0`, we split `override.styl` into two APIs: `override.styl` and `style.styl`. If you wrote styles at `override.styl` in the past, e.g.

``` stylus
// .vuepress/override.styl
$textColor = red // stylus constants override.

#my-style {} // your extra styles.
```

You'll need to separate the style part to `style.styl`:

``` stylus
// .vuepress/override.styl, SHOULD ONLY contain "stylus constants override".
$textColor = red
```

``` stylus
// .vuepress/style.styl, your extra styles.
#my-style {}
```

## Custom Page Class

Sometimes, you may need to add a unique class for a specific page so that you can target content on that page only in custom CSS. You can add a class to the theme container div with `pageClass` in `YAML front matter`:

``` yaml
---
pageClass: custom-page-class
---
```

Then you can write CSS targeting that page only:

``` css
/* .vuepress/override.styl */

.theme-container.custom-page-class {
  /* page-specific rules */
}
```

## Custom Layout for Specific Pages

By default the content of each `*.md` file is rendered in a `<div class="page">` container, along with the sidebar, auto-generated edit links and prev/next links. If you wish to use a completely custom component in place of the page (while only keeping the navbar), you can again specify the component to use using `YAML front matter`:

``` yaml
---
layout: SpecialLayout
---
```

This will render `.vuepress/components/SpecialLayout.vue` for the given page.

## Ejecting

You can copy the default theme source code into `.vuepress/theme` to fully customize the theme using the `vuepress eject [targetDir]` command. Note, however, once you eject, you are on your own and won't be receiving future updates or bug fixes to the default theme even if you upgrade VuePress.
