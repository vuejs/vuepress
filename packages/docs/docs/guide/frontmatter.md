# Frontmatter

Any Markdown file that contains a YAML frontmatter block will be processed by [gray-matter](https://github.com/jonschlinkert/gray-matter). The frontmatter must be at the top of the Markdown file, and must take the form of valid YAML set between triple-dashed lines. Example:

```markdown
---
title: Blogging with VuePress
lang: en-US
---
```

Between the triple-dashed lines, you can set [predefined variables](#predefined-variables), or even create custom ones of your own. These variables can be used via the <code>[$frontmatter](./global-computed.md#frontmatter)</code> variable.

Here’s an example of how you could use it in your Markdown file:

```markdown
---
title: Blogging with VuePress
lang: en-US
---

# {{ $frontmatter.title }}

My blog post is written in {{ $frontmatter.lang }}.
```

## Alternative frontmatter Formats

VuePress also supports JSON and [TOML](https://github.com/toml-lang/toml) frontmatter syntax.

JSON frontmatter needs to start and end in curly braces:

```
---
{
  "title": "Blogging Like a Hacker",
  "lang": "en-US"
}
---
```

TOML frontmatter needs to be explicitly marked as TOML:

```
---toml
title = "Blogging Like a Hacker"
lang = "en-US"
---
```


## Predefined Variables

### title

- Type: `string`
- Default: `h1_title || siteConfig.title`

Title of the current page.

### lang

- Type: `string`
- Default: `en-US`

Language of the current page.

### description

- Type: `string`
- Default: `siteConfig.description`

Description of the current page.

### layout

- Type: `string`
- Default: `Layout`

Set the layout component of the current page.

### permalink

- Type: `string`
- Default: `siteConfig.permalink`

See [Permalinks](./permalinks.md) for details.

### metaTitle

- Type: `string`
- Default: <code>\`${page.title} | ${siteConfig.title}\`</code>

Override the default meta title.

### meta

- Type: `array`
- Default: `undefined`

Specify extra meta tags to be injected:

``` yaml
---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---
```

### canonicalUrl <Badge text="1.7.1+" />

- Type: `string`
- Default: `undefined`

Set the canonical URL for the current page.

## Predefined Variables Powered By Default Theme

### navbar

- Type: `boolean`
- Default: `undefined`

See [Default Theme Config > Disable the Navbar](../theme/default-theme-config.md#disable-the-navbar) for details.

### sidebar

- Type: `boolean|'auto'`
- Default: `undefined`

See [Default Theme Config > Sidebar](../theme/default-theme-config.md#sidebar) for details.

### prev

- Type: `boolean|string`
- Default: `undefined`

See [Default Theme Config > Prev / Next Links](../theme/default-theme-config.md#prev-next-links) for details.

### next

- Type: `boolean|string`
- Default: `undefined`

See [Default Theme Config > Prev / Next Links](../theme/default-theme-config.md#prev-next-links) for details.

### search

- Type: `boolean`
- Default: `undefined`

See [Default Theme Config > Built-in Search](../theme/default-theme-config.html#built-in-search) for details.

### tags

- Type: `array`
- Default: `undefined`

See [Default Theme Config > Built-in Search](../theme/default-theme-config.html#built-in-search). For details.
