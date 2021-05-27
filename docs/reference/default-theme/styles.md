# Styles

<NpmBadge package="@vuepress/theme-default" />

Default theme uses [SASS](https://sass-lang.com/) as the CSS pre-processor.

Users can custom style variables via [palette file](#palette-file), and add extra styles via [style file](#style-file).

## Palette File

The path of palette file is `.vuepress/styles/palette.scss`.

You can make use of it to override predefined SASS variables of default theme.

::: details Click to expand SASS variables
@[code{3-} scss](@vuepress/theme-default/src/client/styles/_variables.scss)
:::

## Style File

The path of style file is `.vuepress/styles/index.scss`.

You can add extra styles here, or override default styles:

```scss
:root {
  scroll-behavior: smooth;
}
```

You can also make use of it to override predefined CSS variables of default theme.

::: details Click to expand CSS variables
@[code scss](@vuepress/theme-default/src/client/styles/vars.scss)
:::

::: details Click to expand dark mode CSS variables
@[code scss](@vuepress/theme-default/src/client/styles/vars-dark.scss)
:::
