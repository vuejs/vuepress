# Styles

<NpmBadge package="@vuepress/theme-default" />

Default theme uses [SASS](https://sass-lang.com/) as the CSS pre-processor.

Users can custom style variables via [palette file](#palette-file), and add extra styles via [style file](#style-file).

## Palette File

You can create a `.vuepress/styles/palette.scss` file to override predefined variables of default theme:

@[code{3-} scss](@vuepress/theme-default/src/client/styles/_variables.scss)

## Style File

You can override default styles or add extra styles in `.vuepress/styles/index.scss` file. For example:

```scss
:root {
  scroll-behavior: smooth;
}
```
