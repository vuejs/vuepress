# 在 Markdown 中 使用 Vue

## 浏览器的 API 访问限制

当你在开发一个 VuePress 应用时，由于所有的页面在生成静态 HTML 时都需要通过 Node.js 服务端渲染，因此所有的 Vue 相关代码都应当遵循 [编写通用代码](https://ssr.vuejs.org/zh/universal.html) 的要求。简而言之，请确保只在 `beforeMount` 或者 `mounted` 访问浏览器 / DOM 的 API。

如果你正在使用，或者需要展示一个对于 SSR 不怎么友好的组件（比如包含了自定义指令），你可以将它们包裹在内置的 `<ClientOnly>` 组件中：

``` md
<ClientOnly>
  <NonSSRFriendlyComponent/>
</ClientOnly>
```

请注意，这并不能解决一些组件或库在**导入**时就试图访问浏览器 API 的问题 —— 如果需要使用这样的组件或库，你需要在合适的生命周期钩子中**动态导入**它们：

``` vue
<script>
export default {
  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      // use code
    })
  }
}
</script>
```

如果你的模块通过 `export default` 导出一个 Vue 组件，那么你可以动态注册它：

```vue
<template>
  <component v-if="dynamicComponent" :is="dynamicComponent"></component>
</template>
<script>
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },
  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      this.dynamicComponent = module.default
    })
  }
}
</script>
```

**参考:**

- [Vue.js > 动态组件](https://cn.vuejs.org/v2/guide/components.html#动态组件)

## 模板语法

### 插值

每一个 Markdown 文件将首先被编译成 HTML，接着作为一个 Vue 组件传入 `vue-loader`，这意味着你可以在文本中使用 Vue 风格的插值：

**Input**

``` md
{{ 1 + 1 }}
```

**Output**

<div class="language-text"><pre><code>{{ 1 + 1 }}</code></pre></div>

### 指令

同样地，也可以使用指令:

**Input**

``` md
<span v-for="i in 3">{{ i }} </span>
```

**Output**

<div class="language-text"><pre><code><span v-for="i in 3">{{ i }} </span></code></pre></div>

### 访问网站以及页面的数据

编译后的组件没有私有数据，但可以访问 [网站的元数据](../theme/writing-a-theme.md#网站和页面的元数据)，举例来说：

**Input**

``` md
{{ $page }}
```

**Output**

``` json
{
  "path": "/using-vue.html",
  "title": "Using Vue in Markdown",
  "frontmatter": {}
}
```

## Escaping

默认情况下，块级 (block) 的代码块将会被自动包裹在 `v-pre` 中。如果你想要在内联 (inline) 的代码块或者普通文本中显示原始的大括号，或者一些 Vue 特定的语法，你需要使用自定义容器 `v-pre` 来包裹：

**Input**

``` md
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

**Output**

::: v-pre
`{{ This will be displayed as-is }}`
:::

## 使用组件

所有在 `.vuepress/components` 中找到的 `*.vue` 文件将会自动地被注册为全局的异步组件，如：

```
.
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      ├─ OtherComponent.vue
      └─ Foo
         └─ Bar.vue
```

你可以直接使用这些组件在任意的 Markdown 文件中（组件名是通过文件名取到的）：

``` md
<demo-1/>
<OtherComponent/>
<Foo-Bar/>
```

<demo-1></demo-1>

<OtherComponent/>

<Foo-Bar/>

::: warning 重要！
请确保一个自定义组件的名字包含连接符或者是 PascalCase，否则，它将会被视为一个内联元素，并被包裹在一个 `<p>` 标签中，这将会导致 HTML 渲染紊乱，因为 HTML 标准规定， `<p>` 标签中不允许放置任何块级元素。
:::

### 在标题中使用组件

你可以在标题中使用 Vue 组件，但是请留意以下两种方式的不同：

| Markdown | 输出的 HTML | 解析后的标题 |
|--------|-------------|----------------|
| <pre v-pre><code> # text &lt;Tag/&gt; </code></pre> | `<h1>text <Tag/></h1>` | `text` |
| <pre v-pre><code> # text \`&lt;Tag/&gt;\` </code></pre> | `<h1>text <code>&lt;Tag/&gt;</code></h1>` | `text <Tag/>` |

被 `<code>` 包装的 HTML 将按原样显示，只有未被包装的 HTML 才会被 Vue 解析。

::: tip
输出的 HTML 由 [markdown-it](https://github.com/markdown-it/markdown-it) 完成。而解析后的标题由 VuePress 完成，用于[侧边栏](../theme/default-theme-config.md#侧边栏)以及文档的标题。
:::

## 使用预处理器

VuePress 对以下预处理器已经内置相关的 webpack 配置：`sass`、`scss`、`less`、`stylus` 和 `pug`。要使用它们你只需要在项目中安装对应的依赖即可。例如，要使用 `sass`，需要安装：

``` bash
yarn add -D sass-loader node-sass
```

然后你就可以在 Markdown 或是组件中使用如下代码：

``` vue
<style lang="sass">
  .title
    font-size: 20px
</style>
```

要在组件中使用 `<template lang="pug">`，则需要安装 `pug` 和 `pug-plain-loader`:

``` bash
yarn add -D pug pug-plain-loader
```

::: tip
需要指出的是，如果你是一个 `stylus` 用户，你并不需要在你的项目中安装 `stylus` 和 `stylus-loader`，因为 VuePress 已经内置了它们。

对于那些没有内置的预处理器，除了安装对应的依赖，你还需要 [拓展内部的 Webpack 配置](../config/README.md#configurewebpack)。
:::


## 脚本和样式提升

有时，你可以只想在当前页面应用一些 JavaScript 或者 CSS，在这种情况下，你可以直接在 Markdown 文件中使用原生的 `<script>` 或者 `<style>` 标签，它们将会从编译后的 HTML 文件中提取出来，并作为生成的 Vue 单文件组件的 `<script>` 和 `<style>` 标签。

<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  props: ['slot-key'],
  mounted () {
    document.querySelector(`.${this.$style.example}`)
      .textContent = '这个块是被内联的脚本渲染的，样式也采用了内联样式。'
  }
}
</script>

## 内置的组件

### OutboundLink <Badge text="stable"/>

(<OutboundLink/>) 用来表明当前是一个外部链接。在 VuePress 中这个组件会紧跟在每一个外部链接后面。

### ClientOnly <Badge text="stable"/>

参考 [浏览器的 API 访问限制](#浏览器的-api-访问限制)。

### Content

- **Props**:

  - `pageKey` - string, 要渲染的 [page](./global-computed.md#page) 的 hash key, 默认值是当前页面的 key.
  - `slotKey` - string, 页面的 [markdown slot](./markdown-slot.md) 的 key. 默认值是 [default slot](./markdown-slot.md#default-slot-content).

- **Usage**：

指定一个指定页面的特定 slot 用于渲染，当你使用 [自定义布局](../theme/default-theme-config.md#特定页面的自定义布局) 或者自定义主题时，这将非常有用。


``` vue
<Content/>
```

**参考:**

- [全局计算属性 > $page](./global-computed.md#page)
- [Markdown 插槽](./markdown-slot.md)
- [开发主题 > 获取渲染内容](../theme/writing-a-theme.md#获取渲染内容)


### Badge <Badge text="beta" type="warning"/> <Badge text="默认主题"/>

- **Props**:

  - `text` - string
  - `type` - string, 可选值： `"tip"|"warning"|"error"`，默认值是： `"tip"`
  - `vertical` - string, 可选值： `"top"|"middle"`，默认值是： `"top"`

- **Usage**:

你可以在标题中，使用这个组件来为某些 API 添加一些状态：

``` md
### Badge <Badge text="beta" type="warning"/> <Badge text="默认主题"/>
```

**参考:**

- [在标题中使用组件](#在标题中使用组件)
