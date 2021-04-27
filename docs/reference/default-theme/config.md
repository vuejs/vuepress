# Config

<NpmBadge package="@vuepress/theme-default" />

Reference of default theme config, which can be set via [themeConfig](../config.md#themeconfig).

## Basic Config

### locales

- Type: `{ [path: string]: Partial<DefaultThemeLocaleData> }`

- Default: `{}`

- Details:

  Specify locales for i18n support.

  All the options inside the [Locale Config](#locale-config) section can be used in locales.

  This option will only take effect in default theme, so don't confuse with `locales` in [Site Config](../config.md#locales). 

- Also see:
  - [Guide > I18n](../../guide/i18n.md)

## Locale Config

Config of this section can be used as normal config, and can also be used in the [locales](#locales) option.

### home

- Type: `string`

- Default: `/`

- Details:

  Specify the path of the homepage.

  This will be used for:

  - the logo link of the navbar
  - the _back to home_ link of the 404 page

### navbar

- Type: `false | (NavbarItem | NavbarGroup | string)[]`

- Default: `[]`

- Details:

  Configuration of navbar.

  Set to `false` to disable navbar.

  To configure the navbar items, you can set it to a _navbar array_, each item of which could be a `NavbarItem` object, a `NavbarGroup` object, or a string:

  - A `NavbarItem` object should have a `text` field and a `link` field.
  - A `NavbarGroup` object should have a `text` field and a `children` field. The `children` field should be a _navbar array_, too.
  - A string should be the path to the target page file. It will be converted to a `NavbarItem` object, using the page title as `text`, and the page route path as `link`.

- Example 1:

```js
module.exports = {
  themeConfig: {
    navbar: [
      // NavbarItem
      {
        text: 'Foo',
        link: '/foo/',
      },
      // NavbarGroup
      {
        text: 'Group',
        children: ['/group/foo.md', '/group/bar.md'],
      },
      // string - page file path
      '/bar/README.md',
    ],
  },
}
```

- Example 2:

```js
module.exports = {
  themeConfig: {
    navbar: [
      // nested group - max depth is 2
      {
        text: 'Group',
        children: [
          {
            text: 'SubGroup',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
        ],
      },
    ],
  },
}
```

### logo

- Type: `string`

- Details:

  Specify the url of logo image.

  The logo image will be displayed at the left end of the navbar.

- Example:

```js
module.exports = {
  themeConfig: {
    // public file path
    logo: '/hero.png',
    // url
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```

- Also see:
  - [Guide > Assets > Public Files](../../guide/assets.md#public-files)

### repo

- Type: `string`

- Details:

  Specify the repository url of your project.

  This will be used as the link of the _repository link_, which will be displayed as the last item of the navbar.

```js
module.exports = {
  themeConfig: {
    // If you set it in the form of `organization/repository`
    // we will take it as a GitHub repo
    repo: 'vuejs/vuepress',
    // Use url directly if you are not using GitHub
    repo: 'https://gitlab.com/foo/bar',
  },
}
```

### repoLabel

- Type: `string`

- Details:

  Specify the repository label of your project.

  This will be used as the text of the _repository link_, which will be displayed as the last item of the navbar.

  If you don't set this option explicitly, it will be automatically inferred from the [repo](#repo) option.

### selectLanguageText

- Type: `string`

- Details:

  Specify the text of the _select language menu_.

  The _select language menu_ will appear next to the repository button in the navbar when you set multiple [locales](../config.md#locales) in your site config.

### selectLanguageAriaLabel

- Type: `string`

- Details:

  Specify the `aria-label` attribute of the _select language menu_.

  This is mainly for a11y purpose.

### selectLanguageName

- Type: `string`

- Details:

  Specify the name of the language of a locale.

  This option will **only take effect inside** the [locales](#locales) of your theme config. It will be used as the language name of the locale, which will be displayed in the _select language menu_.

- Example:

```js
module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectLanguageName: 'English',
      },
      '/zh/': {
        selectLanguageName: '简体中文',
      },
    },
  },
}
```

### sidebar

- Type: `false | 'auto' | SidebarConfigArray | SidebarConfigObject`

- Default: `'auto'`

- Details:

  Configuration of sidebar.

  You can override this global option via [sidebar](./frontmatter.md#sidebar) frontmatter in your pages.

  Set to `false` to disable sidebar.

  If you set it to `'auto'`, the sidebar will be automatically generated from the page headers.

  To configure the sidebar items manually, you can set this option to a _sidebar array_, each item of which could be a `SidebarItem` object, a `SidebarGroup` object, or a string:

  - A `SidebarItem` object should have a `text` field, a `link` field, and a `children` field. The `children` field should be an array of `SidebarItem` or string.
  - A `SidebarGroup` object should set `isGroup` field to `true`, and should have a `text` field and a `children` field. The `children` field should be an array of `SidebarItem` or string.
  - A string should be the path to the target page file. It will be converted to a `SidebarItem` object, whose `text` is the page title, `link` is the page route path, and `children` is automatically generated from the page headers.

  If you want to set different sidebar for different sub paths, you can set this option to a _sidebar object_:

  - The key should be the path prefix.
  - The value should be a _sidebar array_.

- Example 1:

```js
module.exports = {
  themeConfig: {
    // sidebar array
    // all pages will use the same sidebar
    sidebar: [
      // SidebarItem
      {
        text: 'Foo',
        link: '/foo/',
        children: [
          // SidebarItem
          {
            text: 'github',
            link: 'https://github.com',
            children: [],
          },
          // string - page file path
          '/foo/bar.md',
        ],
      },
      // SidebarGroup
      {
        isGroup: true,
        text: 'Group',
        children: ['/group/foo.md', '/group/bar.md'],
      },
      // string - page file path
      '/bar/README.md',
    ],
  },
}
```

- Example 2:

```js
module.exports = {
  themeConfig: {
    // sidebar object
    // pages under different sub paths will use different sidebar
    sidebar: {
      '/guide/': [
        {
          isGroup: true,
          text: 'Guide',
          children: ['/guide/README.md', '/guide/getting-started.md'],
        },
      ],
      '/reference/': [
        {
          isGroup: true,
          text: 'Reference',
          children: ['/reference/cli.md', '/reference/config.md'],
        },
      ],
    },
  },
}
```

### sidebarDepth

- Type: `number`

- Default: `2`

- Details:

  Set the maximum depth of the sidebar children which are automatically generated from the page headers.

  - Set to `0` to disable all levels of headers.
  - Set to `1` to include `<h2>` headers.
  - Set to `2` to include `<h2>` and `<h3>` headers.
  - ...

  The max value depends on which levels of headers you have extracted via [markdown.extractHeaders.level](../config.md#markdown-extractheaders).

  The default value of `markdown.extractHeaders.level` is `[2, 3]`, so the default max value of `sidebarDepth` is `2`.

  You can override this global option via [sidebarDepth](./frontmatter.md#sidebardepth) frontmatter in your pages.

### editLink

- Type: `boolean`

- Default: `true`

- Details:

  Enable the _edit this page_ link or not.

  You can override this global option via [editLink](./frontmatter.md#editlink) frontmatter in your pages.

### editLinkText

- Type: `string`

- Default: `'Edit this page'`

- Details:

  Specify the text of the _edit this page_ link.

### editLinkPattern

- Type: `string`

- Details:

  Specify the pattern of the _edit this page_ link.

  This will be used for generating the _edit this page_ link.

  If you don't set this option, the pattern will be inferred from the [docsRepo](#docsrepo) option. But if your documentation repository is not hosted on a common platform, for example, GitHub, GitLab, Bitbucket, etc., you have to set this option explicitly to make the _edit this page_ link work.

- Usage:

  |  Pattern  |         Description                                                                                 |
  |-----------|-----------------------------------------------------------------------------------------------------|
  | `:repo`   | The docs repo url, i.e. [docsRepo](#docsrepo)                                                       |
  | `:branch` | The docs repo branch, i.e. [docsBranch](#docsbranch)                                                |
  | `:path`   | The path of the page source file, i.e. [docsDir](#docsdir) joins the relative path of the page file |

- Example:

```js
module.exports = {
  themeConfig: {
    docsRepo: 'https://gitlab.com/owner/name',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/-/edit/:branch/:path',
  },
}
```

  The generated link will look like `'https://gitlab.com/owner/name/-/edit/master/docs/path/to/file.md'`.

### docsRepo

- Type: `string`

- Details:

  Specify the repository url of your documentation source files.

  This will be used for generating the _edit this page_ link.

  If you don't set this option, it will use the [repo](#repo) option by default. But if your documentation source files are in a different repository, you will need to set this option.

### docsBranch

- Type: `string`

- Default: `'main'`

- Details:

  Specify the repository branch of your documentation source files.

  This will be used for generating the _edit this page_ link.

### docsDir

- Type: `string`

- Default: `''`

- Details:

  Specify the directory of your documentation source files in the repository.

  This will be used for generating the _edit this page_ link.

### lastUpdated

- Type: `boolean`

- Default: `true`

- Details:

  Enable the _last updated timestamp_ or not.

  You can override this global option via [lastUpdated](./frontmatter.md#lastupdated) frontmatter in your pages.

  Notice that if you set `themeConfig.lastUpdated` to `false`, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.

### lastUpdatedText

- Type: `string`

- Default: `'Last Updated'`

- Details:

  Specify the text of the _last updated timestamp_ label.

### contributors

- Type: `boolean`

- Default: `true`

- Details:

  Enable the _contributors list_ or not.

  You can override this global option via [contributors](./frontmatter.md#contributors) frontmatter in your pages.

  Notice that if you set `themeConfig.contributors` to `false`, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.

### contributorsText

- Type: `string`

- Default: `'Contributors'`

- Details:

  Specify the text of the _contributors list_ label.

### tip

- Type: `string`

- Default: `'TIP'`

- Details:

  Specify the default title of the tip [custom containers](./markdown.md#custom-containers).

### warning

- Type: `string`

- Default: `'WARNING'`

- Details:

  Specify the default title of the warning [custom containers](./markdown.md#custom-containers).

### danger

- Type: `string`

- Default: `'WARNING'`

- Details:

  Specify the default title of the danger [custom containers](./markdown.md#custom-containers).

### notFound

- Type: `string[]`

- Default: `['Not Found']`

- Details:

  Specify the messages of the 404 page.

  The message will be randomly picked from the array when users enter the 404 page.

### backToHome

- Type: `string`

- Default: `'Back to home'`

- Details:

  Specify the text of the _back to home_ link in the 404 page.

### openInNewWindow

- Type: `string`

- Default: `'open in new window'`

- Details:

  Specify the `sr-only` text of the [OutboundLink](../components.md#outboundlink).

  This is mainly for a11y purpose.

## Plugins

### themePlugins

- Details:

  Configure the plugins that used by default theme.

  Default theme is using some plugins by default. You can disable a plugin if you really do not want to use it. Make sure you understand what the plugin is for before disabling it.

#### themePlugins.activeHeaderLinks

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-active-header-links](../plugin/active-header-links.md) or not.

#### themePlugins.backToTop

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-back-to-top](../plugin/back-to-top.md) or not.

#### themePlugins.container

- Type: `Record<ContainerType, boolean>`

- Details:

  Enable custom containers that powered by [@vuepress/plugin-container](../plugin/container.md) or not.

  `ContainerType` type is:

  - `tip`
  - `warning`
  - `danger`
  - `details`
  - `codeGroup`
  - `codeGroupItem`

- Also see:
  - [Default Theme > Markdown > Custom Containers](./markdown.md#custom-containers)

#### themePlugins.git

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-git](../plugin/git.md) or not.

#### themePlugins.mediumZoom

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-medium-zoom](../plugin/medium-zoom.md) or not.

#### themePlugins.nprogress

- Type: `boolean`

- Default: `true`

- Details:

  Enable [@vuepress/plugin-nprogress](../plugin/nprogress.md) or not.
