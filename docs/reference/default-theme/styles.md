# Styles

<NpmBadge package="@vuepress/theme-default" />

Default theme uses [SASS](https://sass-lang.com/) as the CSS pre-processor.

Users can custom style variables via [palette file](#palette-file), and add extra styles via [style file](#style-file).

## Palette File

You can create a `.vuepress/styles/palette.scss` file to override predefined variables of default theme:

```scss
// colors
$accentColor: #3eaf7c !default;
$textColor: #2c3e50 !default;
$borderColor: #eaecef !default;
$arrowBgColor: #ccc !default;
$tipColor: #42b983 !default;
$warningColor: #e7c000 !default;
$dangerColor: #cc0000 !default;

// code colors
$codeBgColor: #282c34 !default;
$highlightLineBgColor: rgba(0, 0, 0, 66%) !default;
$lineNumbersColor: rgba(255, 255, 255, 0.3) !default;

// badge component colors
$badgeTipColor: $tipColor !default;
$badgeWarningColor: $warningColor !default;
$badgeDangerColor: $dangerColor !default;

// layout
$navbarHeight: 3.6rem !default;
$sidebarWidth: 20rem !default;
$contentWidth: 740px !default;
$homePageWidth: 960px !default;

// responsive breakpoints
$MQNarrow: 959px !default;
$MQMobile: 719px !default;
$MQMobileNarrow: 419px !default;

// code
$lineNumbersWrapperWidth: 3.5rem !default;
$codeLang: 'c' 'cpp' 'cs' 'css' 'dart' 'docker' 'fs' 'go' 'html' 'java' 'js'
  'json' 'kt' 'less' 'makefile' 'md' 'php' 'py' 'rb' 'rs' 'sass' 'scss' 'sh'
  'styl' 'ts' 'toml' 'vue' 'yml' !default;
```

## Style File

You can override default styles or add extra styles in `.vuepress/styles/index.scss` file. For example:

```scss
:root {
  scroll-behavior: smooth;
}
```
