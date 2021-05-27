# 样式

<NpmBadge package="@vuepress/theme-default" />

默认主题使用 [SASS](https://sass-lang.com/) 作为 CSS 预处理器。

用户可以通过 [palette 文件](#palette-文件) 来自定义样式变量，还可以通过 [style 文件](#style-文件) 来添加额外的样式。

## Palette 文件

Palette 文件的路径是 `.vuepress/styles/palette.scss` 。

你可以利用它来覆盖默认主题的预定义 SASS 变量。

::: details 点击查看 SASS 变量
@[code{3-} scss](@vuepress/theme-default/src/client/styles/_variables.scss)
:::

## Style 文件

Style 文件的路径是 `.vuepress/styles/index.scss` 。

你可以在这里添加额外的样式，或者覆盖默认样式：

```scss
:root {
  scroll-behavior: smooth;
}
```

你也可以利用它来覆盖默认主题的预定义 CSS 变量。

::: details 点击查看 CSS 变量
@[code scss](@vuepress/theme-default/src/client/styles/vars.scss)
:::

::: details 点击查看暗黑模式 CSS 变量
@[code scss](@vuepress/theme-default/src/client/styles/vars-dark.scss)
:::
