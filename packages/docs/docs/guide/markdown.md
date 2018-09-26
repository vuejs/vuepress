# Markdown Extensions

## Header Anchors

Headers automatically get anchor links applied. Rendering of anchors can be configured using the [`markdown.anchor`](../config/README.md#markdown-anchor) option.

## Links

### Internal Links

Inbound links ending in `.md` or `.html` are converted to `<router-link>` for SPA navigation.

Each sub-directory in your static site should contain a `README.md`. It will automatically be converted to `index.html`.

::: tip
When writing the relative path to a directory's `index.html`, don't forget to close it off with a `/`, otherwise you will get a 404. For example, use `/config/` instead of `/config`.
:::

If you want to link to another markdown file within a directory, remember to:

1.  Append it with either `.html` or `.md`
2.  Make sure the case matches since the path is case-sensitive

#### Example

Given the following directory structure:

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

```md
[Home](/) <!-- Sends the user to the root README.md -->
[foo](/foo/) <!-- Sends the user to index.html of directory foo -->
[foo heading anchor](/foo/#heading) <!-- Anchors user to a heading in the foo README file -->
[foo - one](/foo/one.html) <!-- You can append .html -->
[foo - two](/foo/two.md) <!-- Or you can append .md -->
```

### External Links

Outbound links automatically gets `target="_blank" rel="noopener noreferrer"`:

- [vuejs.org](https://vuejs.org)
- [VuePress on GitHub](https://github.com/vuejs/vuepress)

You can customize the attributes added to external links by setting [config.markdown.externalLinks](../config/README.md#markdown-externallinks).

## Front Matter

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

### Alternative Front Matter Formats

In addition, VuePress also supports JSON or [TOML](https://github.com/toml-lang/toml) front matter.

JSON front matter needs to start and end in curly braces:

```
---
{
  "title": "Blogging Like a Hacker",
  "lang": "en-US"
}
---
```

TOML front matter needs to be explicitly marked as TOML:

```
---toml
title = "Blogging Like a Hacker"
lang = "en-US"
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

## Emoji :tada:

**Input**

```
:tada: :100:
```

**Output**

:tada: :100:

A list of all emojis available can be found [here](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

## Table of Contents

**Input**

```
[[toc]]
```

**Output**

[[toc]]

Rendering of TOC can be configured using the [`markdown.toc`](../config/README.md#markdown-toc) option.

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
This is a dangerous warning
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

## Line Numbers

You can enable line numbers for each code blocks via config:

``` js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}  
```

<!-- TODO Support line numbers for specific fence block -->

- Demo:

<picture>
  <source srcset="/line-numbers-desktop.png" media="(min-width: 719px)">
  <img class="line-numbers-desktop-snap" alt="Image">
</picture>

<picture>
  <source srcset="/line-numbers-mobile.gif" media="(max-width: 719px)">
  <img class="line-numbers-mobile-snap" alt="Image">
</picture>

<style>
  @media screen and (min-width:  719px) {
    .line-numbers-mobile-snap {
       display: none;
    }
  }
  @media screen and (max-width:  719px) {
    .line-numbers-desktop-snap {
       display: none;
    }
    .line-numbers-mobile-snap {
      max-width: none!important;
      margin: 0 -1.5rem;
      width: 100vw;
    }
  }
</style>

## Import Code Snippets <Badge text="beta" type="warn"/> <Badge text="0.10.1+" type="tip"/>

You can import code snippets from existing files via following syntax:

``` md
<<< @/filepath
```

It also supports [line highlighting](#line-highlighting-in-code-blocks):

``` md
<<< @/filepath{highlightLines} 
```

**Input**

``` md
<<< @/test/markdown/fragments/snippet.js{2}
```

**Output**

<<< @/test/markdown/fragments/snippet.js{2}

::: tip
  Since the import of the code snippets will be executed before webpack compilation, you can't use the path alias in webpack. The default value of `@` is `process.cwd()`.
:::


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
