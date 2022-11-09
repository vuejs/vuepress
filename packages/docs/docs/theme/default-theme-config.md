# Default Theme Config

<Bit/>

::: tip
All options listed on this page apply to the default theme only. If you are using a custom theme, the options may be different.
:::

## Homepage

The default theme provides a homepage layout (used on [the homepage of this site](../README.md)). To use it, specify `home: true` plus some other metadata in your root `README.md`'s [YAML frontmatter](../guide/markdown.md#front-matter). This is an example of how it works:

``` yaml
---
home: true
heroImage: /hero.png
heroText: Hero Title
tagline: Hero subtitle
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

You can disable `title` and `subtitle` by setting the corresponding field to `null`.

Any extra content after the `YAML front matter` will be parsed as normal Markdown and rendered after the features section.

To use a fully custom homepage layout, you can also use a [Custom Layout](#custom-layout-for-specific-pages).

## Rich-text footer

Note that you can also set `footer` with [Markdown Slot Syntax](../guide/markdown-slot.md) to support rich text:

```md
---
home: true
---

::: slot footer
MIT Licensed | Copyright © 2018-present [Evan You](https://github.com/yyx990803)
:::
```

## Navbar

The Navbar may contain your page title, [Search Box](#search-box), [Navbar Links](#navbar-links), [Languages](../guide/i18n.md) and [Repository Link](#git-repo-and-edit-links), they all depend on your configuration.

### Navbar Logo

You can add a logo to the navbar via `themeConfig.logo`. Logo can be placed in [public folder](../guide/assets.md#public-files).

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png',
  }
}
```

### Navbar Links

You can add links to the navbar via `themeConfig.nav`:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' }
    ]
  }
}
```

Outbound links automatically get `target="_blank" rel="noopener noreferrer"`. You can offer `target` and `rel` to customize the attributes. Setting `rel: false` as will disable the `rel` attribute for a link:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'External', link: 'https://google.com', target:'_self', rel:false },
      { text: 'Guide', link: '/guide/', target:'_blank' }
    ]
  }
}
```

These links can also be dropdown menus if you provide an array of `items` instead of a `link`:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ]
  }
}
```

You can also have sub groups inside a dropdown by having nested items:

```js
// .vuepress/config.js
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

You can omit the `.md` extension, and paths ending with `/` are inferred as `*/README.md`. The text for the link is automatically inferred (either from the first header in the page or explicit title in `YAML front matter`). To explicitly specify the link text, use an array in form of `[link, text]`.

### Nested Header Links

The sidebar automatically displays links for headers in the current active page, nested under the link for the page itself. You can customize this behavior using `themeConfig.sidebarDepth`. The default depth is `1`, which extracts the `h2` headers. Setting it to `0` disables the header links, and the max value is `2` which extracts both `h2` and `h3` headers.

A page can also override this value via `YAML front matter`:

``` md
---
sidebarDepth: 2
---
```

### Displaying Header Links of All Pages

The sidebar only displays links for headers in the current active page. You can display all header links for every page with `themeConfig.displayAllHeaders: true`:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    displayAllHeaders: true // Default: false
  }
}
```

### Active Header Links

By default, the nested header links and the hash in the URL are updated as the user scrolls to view the different sections of the page. This behavior can be disabled with the following theme config:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    activeHeaderLinks: false, // Default: true
  }
}
```

::: tip
  It’s worth mentioning that when you disable this option, the corresponding script of this functionality will not be loaded. This is a small point in our performance optimization.
:::

### Sidebar Groups

You can divide sidebar links into several groups by using objects:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',   // required
        path: '/foo/',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ],
        initialOpenGroupIndex: -1 // optional, defaults to 0, defines the index of initially opened subgroup
      }
    ]
  }
}
```

Sidebar groups are collapsable by default. You can force a group to be always open with `collapsable: false`.

A sidebar group config also supports [sidebarDepth](#nested-header-links) field to override the default sidebar depth (`1`).

::: tip
   Nested sidebar group is also supported.
   By default the first subgroup is opened initially.
   You can change this using the `initialOpenGroupIndex`: Specify an index to open another subgroup or use `-1` for no open group.
:::

### Multiple Sidebars

To display different sidebars for different sections of content, first organize your pages into directories for each desired section:

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

      '/baz/': 'auto', /* automatically generate single-page sidebars */

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

To automatically generate a sidebar that contains only the header links for the current page, you can use `YAML front matter` on that page:

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

You can disable the built-in search box with `themeConfig.search: false`, and customize how many suggestions will be shown with `themeConfig.searchMaxSuggestions`:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

You can improve the search result by [setting `tags` in frontmatter](../guide/frontmatter.md#tags):

```yaml
---
tags:
  - configuration
  - theme
  - indexing
---
```

You can also disable the built-in search box for individual pages by [setting `search` in frontmatter](../guide/frontmatter.md#search):

```yaml
---
search: false
---
```

::: tip
Built-in Search only builds index from the title, `h2` and `h3` headers and `tags`.
If you need full text search, you can use [Algolia Search](#algolia-search).
:::

### Algolia Search

The `themeConfig.algolia` option allows you to use [Algolia DocSearch](https://docsearch.algolia.com/) to replace the simple built-in search. To enable it, you need to provide at least `apiKey` and `indexName`:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
      // If Algolia did not provided you any `appId`, use `BH4D9OD16A` or remove this option
      appId: '<APP_ID>',
    }
  }
}
```

::: warning Note
Unlike the [built-in search](#built-in-search) engine which works out of the box, [Algolia DocSearch](https://docsearch.algolia.com/) requires you to submit your site to them for indexing before it starts working.
:::

For more options, check out [Algolia DocSearch’s documentation](https://github.com/algolia/docsearch#docsearch-options).

### Search Placeholder

You can define a placeholder for the search box by adding the `searchPlaceholder` attribute:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    searchPlaceholder: 'Search...'
  }
}
```

## Last Updated

The `themeConfig.lastUpdated` option allows you to get the UNIX timestamp(ms) of each file’s last `git` commit, and it will also display at the bottom of each page in an appropriate format:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

Note that it’s `off` by default. If given a `string`, it will be displayed as a prefix (default value: `Last Updated`).

::: warning
  Since `lastUpdated` is based on `git`, you can only use it in a `git` repository. Also, since the timestamp used comes from the git commit, it will display only after a first commit for a given page, and update only on ensuing commits of that page.
:::


**Also see:**

- [@vuepress/plugin-last-updated](../plugin/official/plugin-last-updated.md)

## Prev / Next Links

Prev and next links are automatically inferred based on the sidebar order of the active page.

You can disable them globally with `themeConfig.nextLinks` and `themeConfig.prevLinks`:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // default value is true. Set it to false to hide next page links on all pages
    nextLinks: false,
    // default value is true. Set it to false to hide prev page links on all pages
    prevLinks: false
  }
}
```

You can also explicitly overwrite or disable them for individual pages with `YAML front matter`:

``` yaml
---
prev: ./some-other-page
next: false
---
```

## Git repository and Edit Links

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

You can overwrite the following properties on specific pages via `YAML front matter`:

``` yaml
---
editLink: false # Will overwrite 'editLinks' from themeConfig
prev: true # Will overwrite 'prevLinks' property from themeConfig
next: ./my-next-page # Will overwrite 'nextLinks' property from themeConfig
---
```

## Smooth Scrolling <Badge text="1.2.0+" />

The `themeConfig.smoothScroll` option allows you to enable smooth scrolling.

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    smoothScroll: true
  }
}
```

## Custom Page Class

Sometimes, you may need to add a unique class for a specific page so that you can target content on that page only in custom CSS. You can add a class to the theme container div with `pageClass` in `YAML front matter`:

``` yaml
---
pageClass: custom-page-class
---
```

Then you can write CSS targeting that page only in `.vuepress/styles/index.styl`.

``` css

.theme-container.custom-page-class {
  /* page-specific rules */
}
```

::: tip Note
These styles are written in [index.styl](/config/#index-styl), a file that allows you to conveniently add extra styles or override existing ones for the default theme.
:::

## Custom Layout for Specific Pages

By default the content of each `*.md` file is rendered in a `<div class="page">` container, along with the sidebar, auto-generated edit links and prev/next links. To use a fully custom component in place of the page, you can again specify the component to use using `YAML front matter`:

``` yaml
---
layout: SpecialLayout
---
```

This will render `.vuepress/components/SpecialLayout.vue` for the given page.

## Code Groups and Code Blocks <Badge text="1.6.0+" />
The default theme comes with custom components `<code-group />` and `<code-block>` that can help you to better group
separate code paths that have the same result.

**Example**

Yarn and npm installation instructions

**Input**
````md
<code-group>
<code-block title="YARN">
```bash
yarn create vuepress-site [optionalDirectoryName]
```
</code-block>

<code-block title="NPM">
```bash
npx create-vuepress-site [optionalDirectoryName]
```
</code-block>
</code-group>
````

**Output**

<code-group>
<code-block title="YARN">
```bash
yarn create vuepress-site [optionalDirectoryName]
```
</code-block>

<code-block title="NPM">
```bash
npx create-vuepress-site [optionalDirectoryName]
```
</code-block>
</code-group>

::: tip
Each `<code-block />` must have a line break after it to render properly
:::

### Default Code Block

By default, `<code-group />` will use the first `<code-block />` as the active initial code block.

To manually set the active `<code-block />`, just add the `active` prop to the `<code-block />`:

**Input**
````md
<code-group>
<code-block title="YARN">
```bash
yarn create vuepress-site [optionalDirectoryName]
```
</code-block>

<code-block title="NPM" active>
```bash
npx create-vuepress-site [optionalDirectoryName]
```
</code-block>
</code-group>
````

**Output**

<code-group>
<code-block title="YARN">
```bash
yarn create vuepress-site [optionalDirectoryName]
```
</code-block>

<code-block title="NPM" active>
```bash
npx create-vuepress-site [optionalDirectoryName]
```
</code-block>
</code-group>

## Ejecting

You can copy the default theme source code into `.vuepress/theme` to fully customize the theme using the `vuepress eject [targetDir]` command. If you didn’t install VuePress globally, run `./node_modules/.bin/vuepress eject`.

::: warning
Once you eject, you are on your own and **won’t** be receiving future updates or bugfixes to the default theme even if you upgrade VuePress.
:::
