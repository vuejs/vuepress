---
prev: ./getting-started
next: ./assets
sidebarDepth: 2
---

# Site Configurations

## Config File

Without any configuration, the page is pretty minimal, and the user has no way to navigate around the site. To customize your site, let's first create a `.vuepress` directory inside your docs directory. This is where all VuePress-specific files will be placed in.

The essential file for configuring a VuePress site is `.vuepress/config.js`, which should export a JavaScript object:

``` js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```

If you've got the dev server running, you should see the page now has a header with the title and a search box. VuePress comes with built-in headers-based search - it automatically builds a simple search index from the title, `h2` and `h3` headers from all the pages.

Consult the [Config Reference](../config/) for a full list of options.

## Theme Configuration

::: tip NOTE
Configurations below are applicable to the default theme only. If you are using a custom theme, the theme config options may be different.
:::

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

### Sidebar

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

You can omit the `.md` extension, and paths ending with `/` are inferred as `*/README.md`. The text for the link is automatically inferred (either from the first header in the page or explicit title in YAML frontmatter). If you wish to explicitly specify the link text, use an Array in form of `[link, text]`.

### Nested Header Links

The sidebar automatically displays links for headers in the current active page, nested under the link for the page itself. You can customize this behavior using `themeConfig.sidebarDepth`. The default depth is `1`, which extracts the `h2` headers. Setting it to `0` disables the header links, and the max value is `2` which extracts both `h2` and `h3` headers.

A page can also override this value in using YAML frontmatter:

``` md
---
sidebarDepth: 2
---
```

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

### Multi Category Sidebars

If you wish to display different sidebars for different group of pages, you will first need to organize your pages into directories:

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

Then, with the following sidebar config:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      // sidebar for pages under /foo/
      '/foo/': [
        '',
        'one',
        'two'
      ],
      // sidebar for pages under /bar/
      '/bar/': [
        '',
        'three',
        'four'
      ]
    }
  }
}
```

### Homepage

### GitHub Repo and Edit Links

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'vuejs/vuepress',
    // if your docs are not at the root of the repo
    docsDir: 'docs',
    // optional, defaults to master
    docsBranch: 'master'
  }
}
```

### Simple CSS Override

If you wish to apply simple overrides to the styling of the default theme, you can create an `.vuepress/override.styl` file. This is a [Stylus](http://stylus-lang.com/) file but you can use normal CSS syntax as well.

There are a few color variables you can tweak:

``` stylus
// showing default values
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```
