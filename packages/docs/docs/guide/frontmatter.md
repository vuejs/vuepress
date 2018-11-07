# Front Matter

Any markdown file that contains a YAML front matter block will be processed by [gray-matter](https://github.com/jonschlinkert/gray-matter). The front matter must be the first thing in the markdown file and must take the form of valid YAML set between triple-dashed lines. Here is a basic example:

```markdown
---
title: Blogging Like a Hacker
lang: en-US
---
```

Between these triple-dashed lines, you can set predefined variables (see [below](#predefined-variables) for a reference), or even create custom ones of your own. These variables will then be available to you to access using <code>[$frontmatter](./global-computed.md#frontmatter)</code> at the rest of the page, plus all custom and theming components.

::: tip
Front matter variables are **optional** in VuePress.
:::

## Alternative Front Matter Formats

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


## Predefined Variables

### title

- Type: `string`
- Default: `h1_title || siteConfig.title`

Title of current page.

### lang

- Type: `string`
- Default: `en-US`

Language of current page.

### description

- Type: `string`
- Default: `siteConfig.description`

Description of current page.

### layout

- Type: `string`
- Default: `Layout`

Set the layout component of the current page.

### permalink

- Type: `string`
- Default: `siteConfig.permalink`

Refer to: [Permalinks](./permalinks.md).

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

## Predefined Variables Powered By Default Theme

### navbar

- Type: `boolean`
- Default: `undefined`

See: [Default Theme Config > Disable the Navbar](../theme/default-theme-config.md#disable-the-navbar).

### sidebar

- Type: `boolean|'auto'`
- Default: `undefined`

See: [Default Theme Config > Sidebar](../theme/default-theme-config.md#sidebar).
