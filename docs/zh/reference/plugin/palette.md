# palette

> [@vuepress/plugin-palette](https://www.npmjs.com/package/@vuepress/plugin-palette)

为你的主题提供调色板功能。

该插件主要用于开发主题，并且已经集成到默认主题中。大部分情况下你不需要直接使用它。

对于主题作者，该插件可以帮助你提供用户自定义样式的能力。

## 调色板和样式

该插件会提供一个 `@vuepress/plugin-palette/palette` （调色板文件）和一个 `@vuepress/plugin-palette/style` （样式文件），用于在你的主题样式中引入。

调色板文件用于定义样式变量，因此它一般会在你主题样式的开头引入。举例来说，用户可以在调色板中定义 [CSS 变量](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 、 [SASS 变量](https://sass-lang.com/documentation/variables) 、 [LESS 变量](http://lesscss.org/features/#variables-feature) 或 [Stylus 变量](https://stylus-lang.com/docs/variables.html) ，然后你可以在你的主题样式中使用这些变量。

样式文件用于覆盖默认样式或添加额外样式，因此它一般会在你主题样式的末尾引入。

## 使用

在你的主题中使用该插件，假设你使用 SASS 作为 CSS 预处理器：

```ts
export default {
  // ...
  plugins: [
    [
      '@vuepress/plugin-palette',
      { preset: 'sass' },
    ],
  ],
}
```

在你主题的 `Layout.vue` 中引入调色板和样式：

```vue
<template>
  <h1 class="palette-title">你好，调色板！</h1>
</template>

<style lang="scss">
/* 从调色板中引入变量 */
@import '@vuepress/plugin-palette/palette';

/* 设置变量的默认值 */
$color: red !default;

/* 在你的样式中使用变量 */
.palette-title {
  color: $color;
}
</style>

<style lang="scss" src="@vuepress/plugin-palette/style"></style>
```

然后，用户就可以在 `.vuepress/styles/palette.scss` 中自定义变量：

```scss
$color: green;
```

并在 `.vuepress/styles/index.scss` 中添加额外样式：

```scss
:root {
  scroll-behavior: smooth;
}
```

## 配置项

### preset

- 类型： `'css' | 'sass' | 'less' | 'stylus'`

- 默认值： `'css'`

- 详情：

  设置其他选项的预设。

  如果你没有对该插件进行进阶定制化的需要，建议只设置该配置项并忽略其他选项。

### userPaletteFile

- 类型： `string`

- 默认值：
  - css: `'.vuepress/styles/palette.css'`
  - sass: `'.vuepress/styles/palette.scss'`
  - less: `'.vuepress/styles/palette.less'`
  - stylus: `'.vuepress/styles/palette.styl'`

- 详情：

  用户调色板文件的路径，是针对源文件目录的相对路径。

  默认值依赖于 [preset](#preset) 配置项。

  该文件用于用户定义样式变量，建议保持默认值作为约定的文件路径。

### tempPaletteFile

- 类型： `string`

- 默认值：
  - css: `'styles/palette.css'`
  - sass: `'styles/palette.scss'`
  - less: `'styles/palette.less'`
  - stylus: `'styles/palette.styl'`

- 详情：

  生成的调色板临时文件的路径，是针对临时文件文件目录的相对路径。

  默认值依赖于 [preset](#preset) 配置项。

  你应该使用 `'@vuepress/plugin-palette/palette'` 别名来引入调色板文件，因此在绝大多数情况下你不需要修改该配置项。

### userStyleFile

- 类型： `string`

- 默认值：
  - css: `'.vuepress/styles/index.css'`
  - sass: `'.vuepress/styles/index.scss'`
  - less: `'.vuepress/styles/index.less'`
  - stylus: `'.vuepress/styles/index.styl'`

- 详情：

  用户样式文件的路径，是针对源文件目录的相对路径。

  默认值依赖于 [preset](#preset) 配置项。

  该文件用于用户覆盖默认样式和添加额外样式，建议保持默认值作为约定的文件路径。

### tempStyleFile

- 类型： `string`

- 默认值：
  - css: `'styles/index.css'`
  - sass: `'styles/index.scss'`
  - less: `'styles/index.less'`
  - stylus: `'styles/index.styl'`

- 详情：

  生成的样式临时文件的路径，是针对临时文件文件目录的相对路径。

  默认值依赖于 [preset](#preset) 配置项。

  你应该使用 `'@vuepress/plugin-palette/style'` 别名来引入样式文件，因此在绝大多数情况下你不需要修改该配置项。

### importCode

- 类型： `(filePath: string) => string`

- 默认值：
  - css: `` (filePath) => `@import '${filePath}';\n` ``
  - sass: `` (filePath) => `@forward '${filePath}';\n` ``
  - less: `` (filePath) => `@import '${filePath}';\n` ``
  - stylus: `` (filePath) => `@require '${filePath}';\n` ``

- 详情：

  用于生成引入代码的函数。

  默认值依赖于 [preset](#preset) 配置项。

  该配置项用于生成 [tempPaletteFile](#temppalettefile) 和 [tempStyleFile](#tempstylefile) ，在绝大多数情况下你不需要修改该配置项。
