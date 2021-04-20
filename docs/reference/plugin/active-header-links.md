# active-header-links

<NpmBadge package="@vuepress/plugin-active-header-links" />

This plugin will listen to page scroll event. When the page scrolls to a certain _header anchor_, this plugin will change the route hash to that _header anchor_ if there is a corresponding _header link_.

This plugin is mainly used to develop themes, and has been integrated into the default theme. You won't need to use it directly in most cases.

## Options

### headerLinkSelector

- Type: `string`

- Default: `'.sidebar-link'`

- Details:

  Selector of _header link_.

  If a _header anchor_ does not have a corresponding _header link_, this plugin won't change the route hash to that anchor when scrolling to it.

### headerAnchorSelector

- Type: `string`

- Default: `'.header-anchor'`

- Details:

  Selector of _header anchor_.

  You don't need to specify this option unless you have changed the `permalinkClass` option of [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor#readme) via [markdown.anchor](../config.md#markdown-anchor).

- Also see:
  - [Guide > Markdown > Syntax Extensions > Header Anchors](../../guide/markdown.md#header-anchors)

### delay

- Type: `number`

- Default: `200`

- Details:

  The delay of the debounced scroll event listener.

### offset

- Type: `number`

- Default: `5`

- Details:

  Even if you click the link of the _header anchor_ directly, the `scrollTop` might not be exactly equal to `offsetTop` of the _header anchor_, so we add an offset to avoid the error.
