# 样式

<NpmBadge package="@vuepress/theme-default" />

默认主题使用 [SASS](https://sass-lang.com/) 作为 CSS 预处理器。

用户可以通过 [palette 文件](#palette-文件) 来自定义样式变量，还可以通过 [style 文件](#style-文件) 来添加额外的样式。

## Palette 文件

你可以创建一个 `.vuepress/styles/palette.scss` 文件来覆盖默认主题的预定义变量：

@[code{3-} scss](@vuepress/theme-default/src/client/styles/_variables.scss)

## Style 文件

你可以在 `.vuepress/styles/index.scss` 文件中覆盖默认样式或者添加额外样式。例如：

```scss
:root {
  scroll-behavior: smooth;
}
```
