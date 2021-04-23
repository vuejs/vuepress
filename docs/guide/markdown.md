# Markdown

Make sure you have known Markdown well before reading this section. If not, please learn some [Markdown tutorials](https://commonmark.org/help/) first.

## Syntax Extensions

The Markdown content in VuePress will be parsed by [markdown-it](https://github.com/markdown-it/markdown-it), which supports [syntax extensions](https://github.com/markdown-it/markdown-it#syntax-extensions) via markdown-it plugins.

This section will introduce built-in Markdown syntax extensions of VuePress.

You can also configure those built-in extensions, load more markdown-it plugins and implement your own extensions via [markdown](../reference/config.md#markdown) option and [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) option.

### Embedded

Embedded by markdown-it:

- [Tables](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [Strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

### Header Anchors

You might have noticed that, a `#` anchor is displayed when you hover the mouse on the headers of each section. By clicking the `#` anchor, you can jump to the section directly.

::: tip
This header anchors extension is supported by [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor).

Config reference: [markdown.anchor](../reference/config.md#markdown-anchor)
:::

### Links

When using Markdown [link syntax](https://spec.commonmark.org/0.29/#link-reference-definitions), VuePress will implement some conversions for you.

Take our documentation source files as an example:

```bash
└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  ├─ markdown.md    # <- Here we are
   │  └─ README.md
   ├─ reference
   │  └─ config.md
   └─ README.md
```

**Raw Markdown**

```md
<!-- relative path -->
[Home](../README.md)  
[Config Reference](../reference/config.md)  
[Getting Started](./getting-started.md)  
<!-- absolute path -->
[Guide](/guide/README.md)  
[Config Reference > markdown.links](/reference/config.md#links)  
<!-- URL -->
[GitHub](https://github.com)  
```

**Converted to**

```vue
<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/reference/config.html">Config Reference</RouterLink>
  <RouterLink to="/guide/getting-started.html">Getting Started</RouterLink>
  <RouterLink to="/guide/">Guide</RouterLink>
  <RouterLink to="/reference/config.html#links">Config Reference &gt; markdown.links</RouterLink>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub<OutboundLink/></a>
</template>
```

**Rendered as**

[Home](../README.md)  
[Config Reference](../reference/config.md)  
[Getting Started](./getting-started.md)  
[Guide](/guide/README.md)  
[Config Reference > markdown.links](/reference/config.md#links)  
[GitHub](https://github.com)  

**Explanation**

- Internal links will be converted to `<RouterLink>` for SPA navigation.
- Internal links to `.md` files will be converted to the [page route path](./page.md#routing), and both absolute path and relative path are supported.
- External links will get `target="_blank" rel="noopener noreferrer"` attrs and a <OutboundLink /> indicator.

**Suggestion**

Try to use relative paths instead of absolute paths for internal links.

- Relative paths are a valid links to the target files, and they can navigate correctly when browsing the source files in your editor or repository.
- Relative paths are consistent in different locales, so you don't need to change the locale path when translating your content.
- When using absolute paths, if the [base](../reference/config.md#base) of your site is not `"/"`, you will need to prepend the `base` manually or use [base helper](./assets.md#base-helper).

::: tip
This links extension is supported by our built-in plugin.

Config reference: [markdown.links](../reference/config.md#markdown-links)

Also see: [Built-in Components > OutboundLink](../reference/components.md#outboundlink)
:::

### Emoji :tada:

You can add emoji to your Markdown content by typing `:EMOJICODE:`.

For a full list of available emoji and codes, check out [emoji-cheat-sheet.com](https://emoji-cheat-sheet.com/).

**Input**

```md
VuePress 2 is out :tada: !
```

**Output**

VuePress 2 is out :tada: !

::: tip
This emoji extension is supported by [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji).

Config reference: [markdown.emoji](../reference/config.md#markdown-emoji)
:::

### Table of Contents

If you want to put the table of contents (TOC) of your current page inside your Markdown content, you can use the `[[toc]]` syntax.

**Input**

```md
[[toc]]
```

**Output**

[[toc]]

The headers in TOC will link to the corresponding [header anchors](#header-anchors), so TOC won't work well if you disable header anchors.

::: tip
This toc extension is supported by our built-in plugin, which is forked and modified from [markdown-it-toc-done-right](https://github.com/nagaozen/markdown-it-toc-done-right).

Config reference: [markdown.toc](../reference/config.md#markdown-toc)
:::

### Code Blocks

Following code blocks extensions are implemented during markdown parsing in Node side. That means, the code blocks won't be processed in client side.

#### Line Highlighting

You can highlight specified lines of your code blocks by adding line ranges mark in your fenced code blocks:

**Input**

````md
```ts{1,6-8}
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: 'Hello, VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```
````

**Output**

```ts{1,6-8}
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: 'Hello, VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```

Examples for line ranges mark:

- Line ranges: `{5-8}`
- Multiple single lines: `{4,7,9}`
- Combined: `{4,7-13,16,23-27,40}`

::: tip
This line highlighting extension is supported by our built-in plugin, which is forked and modified from [markdown-it-highlight-lines](https://github.com/egoist/markdown-it-highlight-lines).

Config reference: [markdown.code.highlightLines](../reference/config.md#markdown-code-highlightlines)
:::

#### Line Numbers

You must have noticed that the number of lines is displayed on the left side of code blocks. This is enabled by default and you can disable it in config.

You can add `:line-numbers` / `:no-line-numbers` mark in your fenced code blocks to override the value set in config.

**Input**

````md
```ts
// line-numbers is enabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// line-numbers is disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
````

**Output**

```ts
// line-numbers is enabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// line-numbers is disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

::: tip
This line numbers extension is supported by our built-in plugin.

Config reference: [markdown.code.lineNumbers](../reference/config.md#markdown-code-linenumbers)
:::

#### Wrap with v-pre

As [template syntax is allowed in Markdown](#template-syntax), it would also work in code blocks, too.

To avoid your code blocks being compiled by Vue, VuePress will add [v-pre](https://v3.vuejs.org/api/directives.html#v-pre) directive to your code blocks by default, which can be disabled in config.

You can add `:v-pre` / `:no-v-pre` mark in your fenced code blocks to override the value set in config.

::: warning
The template syntax characters, for example, the "Mustache" syntax (double curly braces) might be parsed by the syntax highlighter. Thus, as the following example, `:no-v-pre` might not work well in some languages.

If you want to make Vue syntax work in those languages anyway, try to disable the default syntax highlighting and implement your own syntax highlighting in client side.
:::

**Input**

````md
```md
<!-- This will be kept as is by default -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- This will be compiled by Vue -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```js:no-v-pre
// This won't be compiled correctly because of js syntax highlighting
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```
````

**Output**

```md
<!-- This will be kept as is -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- This will be compiled by Vue -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

<!--
using :no-v-pre on JS code blocks has potential issue with shiki, so we are
not actually using :no-v-pre here, just as an example of incorrect usage
-->

```js
// This won't be compiled correctly because of js syntax highlighting
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```

::: tip
This v-pre extension is supported by our built-in plugin.

Config reference: [markdown.code.vPre](../reference/config.md#markdown-vpre)
:::

## Using Vue in Markdown

This section will introduce some basic usage of Vue in Markdown.

Check out [Cookbook > Markdown and Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md) for more details.

### Template Syntax

As we know:

- HTML is allowed in Markdown.
- Vue template syntax is compatible with HTML.

That means, [Vue template syntax](https://v3.vuejs.org/guide/template-syntax.html) is allowed in Markdown.

**Input**

```md
One plus one equals: {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>
```

**Output**

One plus one equals: {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>

### Components

You can use Vue components directly in Markdown.

**Input**

```md
This is default theme built-in `<Badge />` component <Badge text="demo" />
```

**Output**

This is default theme built-in `<Badge />` component <Badge text="demo" />

::: tip
Check out the [Built-in Components](../reference/components.md) for a full list of built-in components.

Check out the [Default Theme > Built-in Components](../reference/default-theme/components.md) for a full list of default theme built-in components.
:::
