# 样式

默认主题使用 [SASS](https://sass-lang.com/) 作为 CSS 预处理器。

用户可以通过 [palette 文件](#palette-文件) 来自定义样式变量，还可以通过 [style 文件](#style-文件) 来添加额外的样式。

## Palette 文件

你可以创建一个 `.vuepress/styles/palette.scss` 文件来覆盖默认主题的预定义变量：

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

## Style 文件

你可以在 `.vuepress/styles/index.scss` 文件中覆盖默认样式或者添加额外样式。例如：

```scss
:root {
  scroll-behavior: smooth;
}
```
