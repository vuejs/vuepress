# register-components

<NpmBadge package="@vuepress/plugin-register-components" />

根据组件文件或目录自动注册 Vue 组件。

## 配置项

### components

- 类型： `Record<string, string>`

- 默认值： `{}`

- 详情：

  一个定义了组件名称和其对应文件路径的对象。

  键会被用作组件名称，值是组件文件的绝对路径。

  如果该配置项中的组件名称和 [componentsDir](#componentsdir) 配置项发生冲突，那么该配置项会有更高的优先级。

- 示例：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/register-components',
      {
        components: {
          FooBar: path.resolve(__dirname, './components/FooBar.vue'),
        },
      },
    ],
  ],
}
```

### componentsDir

- 类型： `string | null`

- 默认值： `null`

- 详情：

  组件目录的绝对路径。

  该目录下匹配 [componentsPatterns](#componentspatterns) 的文件会被自动注册为 Vue 组件。

- 示例：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],
}
```

组件目录：

```bash
components
├─ FooBar.vue
└─ Baz.vue
```

组件会像这样被注册：

```js
import { defineAsyncComponent } from 'vue'

app.component(
  'FooBar',
  defineAsyncComponent(() => import('/path/to/components/FooBar.vue'))
)

app.component(
  'Baz',
  defineAsyncComponent(() => import('/path/to/components/Baz.vue'))
)
```

### componentsPatterns

- 类型： `string[]`

- 默认值： `['**/*.vue']`

- 详情：

  使用 [globby](https://github.com/sindresorhus/globby) 来匹配组件文件的 Patterns 。

  该 Patterns 是相对于 [componentsDir](#componentsdir) 目录的。

### getComponentName

- 类型： `(filename: string) => string`

- 默认值： `(filename) => path.trimExt(filename.replace(/\/|\\/g, '-'))`

- 详情：

  用于从文件名获取对应组件名称的函数。
  
  它只会对 [componentsDir](#componentsdir) 目录下匹配了 [componentsPatterns](#componentspatterns) 的文件生效。

  注意，这里的 `filename` 是相对于 [componentsPatterns](#componentspatterns) 目录的文件路径。
