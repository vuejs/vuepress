# Markdown Extensions

## Links

- Inbound links ending in `.md` or `.html` are converted to `<router-link>` for SPA navigation.

  - [Home](/)
  - [Setup](./setup.md#quickstart)

- Outbound links automatically gets `target="_blank"`: [vuejs.org](https://vuejs.org)

## Header Anchors

Headers automatically get anchor links applied.

## YAML Front Matter

[YAML front matter](https://jekyllrb.com/docs/frontmatter/) is supported out of the box:

```
---
title: Blogging Like a Hacker
lang: en-US
---
```

The data will be available to the rest of the page, plus all custom and theming components as `$page`.

`title` and `lang` will be automatically set on the current page. In addition you can specify extra meta tags to be injected:

```
---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---
```

## Table of Contents

**Input**

``` markdown
[[toc]]
```

**Output**

[[toc]]

## Custom Containers

**Input**

``` markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous thing
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

## Line Highlighting in Code Blocks

**Input**

```` markdown
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

## Emoji

**Input**

``` markdown
:tada: :100:
```

**Output**

:tada: :100:

## Advanced Configuration

VuePress uses [markdown-it]() as the markdown renderer. A lot of the extensions above are implemented via custom plugins. You can further customize the `markdown-it` instance using the `markdown` option in `.vuepress/config.js`:

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
