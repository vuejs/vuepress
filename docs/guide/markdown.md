---
meta:
- name: keywords
  content: static docs generator vue
---

# Markdown Extensions

## Header Anchors

Headers automatically get anchor links applied. Rendering of anchors can be configured using the [`markdown.anchor`](../config/#markdownanchor) option.

## Links

- Inbound links ending in `.md` or `.html` are converted to `<router-link>` for SPA navigation.

  - [Home](/)
  - [Configuring Markdown](../config/#markdown)

- Outbound links automatically gets `target="_blank"`:

  - [vuejs.org](https://vuejs.org)
  - [VuePress on GitHub](https://github.com/vuejs/vuepress)

## YAML Front Matter

[YAML front matter](https://jekyllrb.com/docs/frontmatter/) is supported out of the box:

``` yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

The data will be available to the rest of the page, plus all custom and theming components as `$page`.

`title` and `lang` will be automatically set on the current page. In addition you can specify extra meta tags to be injected:

``` yaml
---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---
```

## GitHub-Style Tables

**Input**

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

**Output**

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Emoji

**Input**

```
:tada: :100:
```

**Output**

:tada: :100:

## Table of Contents

**Input**

```
[[toc]]
```

**Output**

[[toc]]

Rendering of TOC can be configured using the [`markdown.toc`](../config/#markdowntoc) option.

## Custom Containers

**Input**

```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
```

**Output**

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous thing
:::

You can also customize the title of the block:

```
::: danger STOP
Danger zone, do not proceed
:::
```

::: danger STOP
Danger zone, do not proceed
:::

## Line Highlighting in Code Blocks

**Input**

````
``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Advanced Configuration

VuePress uses [markdown-it](https://github.com/markdown-it/markdown-it) as the markdown renderer. A lot of the extensions above are implemented via custom plugins. You can further customize the `markdown-it` instance using the `markdown` option in `.vuepress/config.js`:

``` js
module.exports = {
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
    config: md => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```
